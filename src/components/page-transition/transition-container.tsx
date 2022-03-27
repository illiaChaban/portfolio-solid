import {
  children,
  createComputed,
  createRoot,
  createSignal,
  For,
  JSXElement,
  on,
} from 'solid-js'
import { last, scope } from '../../utils/lodash'
import { withActions } from '../../utils/with-actions'
import { Mask } from './mask'

const DEBUG = false

// FIXME: page scrolling up on transition start
// FIXME: delay text scramble animation and others to wait for transition
// FIXME: preload ink images & svg ? component?. With disabled cache the
// first page transition doesn't work. Use simple fade in/out until preloaded

// TODO:
// ! Allow scroll and navigation before background fades in
// Refactor?
// Mobile rotate images + clip?
// Lazy load this transition due to clips and image size
// Try to reduce image size
// Use simple transition as a backup
// Show a banner "advanced transition loaded/loading" when it's ready
// + "try to navigate to a different page"

// TODO/FIXME: try to use page owner in transition and see if it would
// fix effects bug, where it's disposed too quickly before the page is
// is actually animated off the screen (because Router disposed of it)
const TransitionContainer = (p: { children: JSXElement }): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = scope(() => {
    let id = 0
    return () => ++id
  })

  type Child = { el: JSXElement; id: number; dispose?: () => void }
  const elements$ = withActions(
    DEBUG
      ? createSignal<Child[]>([
          {
            el: (
              <TransitionPage onFilled={() => {}} debug={DEBUG}>
                {propsChildren()}
              </TransitionPage>
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
    }),
  )

  createComputed(
    on(propsChildren, (child, prevChild) => {
      const isFirst = !prevChild
      if (isFirst) return

      const currChildId = last(elements$())?.id

      // If create root is not used, the transition page is disposed
      // when the child is disposed -- on the next page transition, which breaks
      // page reactivities --> which breaks animation
      const [transitionedChild, dispose] = createRoot(dispose => {
        return [
          <TransitionPage
            onFilled={() => {
              if (!currChildId) return
              elements$.remove(currChildId)
            }}
            debug={DEBUG}
          >
            {child}
          </TransitionPage>,
          dispose,
        ]
      })

      elements$.add(transitionedChild, dispose)
    }),
  )

  return <For each={elements$()}>{child => child.el}</For>
}

const TransitionPage = (p: {
  children: JSXElement
  onFilled: () => void
  debug?: boolean
}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  // wrapping in children as a workaround for a bug inside Solid.js
  // https://github.com/solidjs/solid/issues/731
  const resolved = children(() =>
    transitioned() ? (
      p.children
    ) : (
      <Mask
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)}
        debug={p.debug}
      >
        {p.children}
      </Mask>
    ),
  )
  return resolved
}

export default TransitionContainer
