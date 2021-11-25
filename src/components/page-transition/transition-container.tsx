import { children, createComputed, createRoot, createSignal, For, JSXElement, on, onCleanup, onMount, untrack } from "solid-js"
import { call, last } from "../../utils/lodash"
import { Mask } from './page-transition-c'

export const TransitionContainer = (p: {children: JSXElement}): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = call(() => {
    let id = 0
    return () => ++id
  })

  type Child = {el: JSXElement, id: number, dispose?: () => void }
  const elements = call(() => {
    const [elements, setElements] = createSignal<Child[]>([
      {el: propsChildren(), id: getNextId()}
    ])
    const remove = (id: number) => {
      setElements(v => {
        const el = v.find(child => child.id === id)
        el?.dispose?.()
        return v.filter(child => child.id !== id)
      })
    }
    const add = (el: JSXElement, dispose: () => void) => setElements(prev => [
      ...prev, 
      {el, id: getNextId(), dispose}
    ])
    return Object.assign(elements, {remove, add})
  })

  createComputed(on(propsChildren, (child, prevChild) => {

    const isFirst = !prevChild
    if (isFirst) return;

    const currChildId = last(elements())?.id

    // If create root is not used, the transition page is disposed
    // when the child is disposed -- on the next page transition, which breaks
    // page reactivities --> which breaks animation
    const [transitionedChild, dispose] = createRoot((dispose) => {
      return [(
        <TransitionPage 
          onFilled={() => {
            if (!currChildId) return;
            elements.remove(currChildId)
          }}
        >{child}</TransitionPage>
      ), dispose]
    })

    elements.add(transitionedChild, dispose)
  }))

  return (
    <For each={elements()}>
      {(child) => child.el}
    </For>
  )
}

const TransitionPage = (p: {children: JSXElement, onFilled: () => void}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  // wrapping in children as a workaround for a bug inside Solid.js
  // https://github.com/solidjs/solid/issues/731
  const resolved =  children(() => transitioned() 
    ? p.children
    : (
      <Mask 
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)} 
      >{p.children}</Mask>
    )
  )
  return resolved
}


