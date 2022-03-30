import {
  children,
  createComputed,
  createRoot,
  createSignal,
  For,
  JSXElement,
  lazy,
  on,
} from 'solid-js'
import { Load } from '../../utils'
import { last, scope } from '../../utils/lodash'
import { withActions } from '../../utils/with-actions'
import InkImg from './assets/ink.png'
import { FadeInTransition } from './fade-transition'

const DEBUG = false

// TODO/FIXME: try to use page owner in transition and see if it would
// fix effects bug, where it's disposed too quickly before the page is
// is actually animated off the screen (because Router disposed of it)
export const MaskTransitionContainer = (p: {
  children: JSXElement
}): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = scope(() => {
    let id = 0
    return () => ++id
  })

  let cachedImage

  const MaskTransition = lazy(async () => {
    const [Component, image] = await Promise.all([
      import('./mask-transition'),
      Load.image(InkImg),
      import('./assets/masks.json'),
    ])
    // caching ink image, otherwise the first transition might be
    // transparent until the image loads
    cachedImage = image
    return Component
  })

  let loadedMaskTransition = false
  MaskTransition.preload().then(() => (loadedMaskTransition = true))

  type Child = { el: JSXElement; id: number; dispose?: () => void }
  const elements$ = withActions(
    DEBUG
      ? createSignal<Child[]>([
          {
            el: (
              <MaskTransition onFilled={() => {}} debug={DEBUG}>
                {propsChildren()}
              </MaskTransition>
            ),
            id: getNextId(),
          },
        ])
      : createSignal<Child[]>([{ el: propsChildren(), id: getNextId() }]),
    set => ({
      remove: (id: number) =>
        set(v => {
          const el = v.find(child => child.id === id)
          el?.dispose?.()
          return v.filter(child => child.id !== id)
        }),
      add: (el: JSXElement, dispose: () => void) =>
        set(prev => [...prev, { el, id: getNextId(), dispose }]),
      reset: (el: JSXElement) => set(() => [{ el, id: getNextId() }]),
    }),
  )

  createComputed(
    on(propsChildren, (child, prevChild) => {
      const isFirst = !prevChild
      if (isFirst) return

      if (!loadedMaskTransition) {
        elements$.reset(<FadeInTransition>{child}</FadeInTransition>)
        return
      }

      const currChildId = last(elements$())?.id

      // If create root is not used, the transition page is disposed
      // when the child is disposed -- on the next page transition, which breaks
      // page reactivities --> which breaks animation
      const [transitionedChild, dispose] = createRoot(dispose => {
        return [
          <MaskTransition
            onFilled={() => {
              if (!currChildId) return
              elements$.remove(currChildId)
            }}
            debug={DEBUG}
          >
            {child}
          </MaskTransition>,
          dispose,
        ]
      })

      elements$.add(transitionedChild, dispose)
    }),
  )

  return <For each={elements$()}>{child => child.el}</For>
}
