import { children, createComputed, createRoot, createSignal, For, JSXElement, on, onCleanup, onMount, untrack } from "solid-js"
import { call, last } from "../../utils/lodash"
import { withActions } from "../../utils/with-actions"
import { Mask } from './page-transition'

const DEBUG = false

export const TransitionContainer = (p: {children: JSXElement}): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = call(() => {
    let id = 0
    return () => ++id
  })


  type Child = {el: JSXElement, id: number, dispose?: () => void }
  const elements$ = withActions(
    DEBUG
      ? createSignal<Child[]>([
        {el: (
          <TransitionPage 
            onFilled={() => {}}
            debug={DEBUG}
          >{propsChildren()}</TransitionPage>
        ), id: getNextId()}
      ])
      : createSignal<Child[]>([
        {el: propsChildren(), id: getNextId()}
      ]), 
    (set) => ({
      remove: (id: number) => 
        set(v => {
          const el = v.find(child => child.id === id)
          el?.dispose?.()
          return v.filter(child => child.id !== id)
        }),
      add: (el: JSXElement, dispose: () => void) => 
        set(prev => [...prev, {el, id: getNextId(), dispose}]),
    })
  )

  createComputed(on(propsChildren, (child, prevChild) => {

    const isFirst = !prevChild
    if (isFirst) return;

    const currChildId = last(elements$())?.id

    // If create root is not used, the transition page is disposed
    // when the child is disposed -- on the next page transition, which breaks
    // page reactivities --> which breaks animation
    const [transitionedChild, dispose] = createRoot((dispose) => {
      return [(
        <TransitionPage 
          onFilled={() => {
            if (!currChildId) return;
            elements$.remove(currChildId)
          }}
          debug={DEBUG}
        >{child}</TransitionPage>
      ), dispose]
    })

    elements$.add(transitionedChild, dispose)
  }))

  return (
    <For each={elements$()}>
      {(child) => child.el}
    </For>
  )
}

const TransitionPage = (p: {children: JSXElement, onFilled: () => void, debug?: boolean}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  // wrapping in children as a workaround for a bug inside Solid.js
  // https://github.com/solidjs/solid/issues/731
  const resolved =  children(() => transitioned() 
    ? p.children
    : (
      <Mask 
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)} 
        debug={p.debug}
      >{p.children}</Mask>
    )
  )
  return resolved
}


