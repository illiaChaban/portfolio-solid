import { children, Component, createComputed, createEffect, createMemo, createSignal, For, JSXElement, on } from "solid-js"
import { call, last } from "../../utils/lodash"
import { Mask } from './page-transition-c'

export const TransitionContainer = (p: {children: JSXElement}): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = call(() => {
    let id = 0
    return () => ++id
  })
  const [elements, setElements] = createSignal<{el: JSXElement, id: number}[]>([
    {el: propsChildren(), id: getNextId()}
  ])
  createComputed(on(propsChildren, (child, prevChild) => {

    const isFirst = !prevChild
    if (isFirst) return;


    const currChildId = last(elements())?.id


    const transitionedChild = (
      <TransitionPage 
        onFilled={() => {
          console.log('on filled', {currChildId})
          if (!currChildId) return;
          setElements(v => v.filter(child => child.id !== currChildId))
        }}
      >{child}</TransitionPage>
    )

    setElements(prev => [...prev, {el: transitionedChild, id: getNextId()}])
  }))

  return () => elements().map(v => v.el)
}

const TransitionPage = (p: {children: JSXElement, onFilled: () => void}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  // wrapping in children as a workaround for a bug inside Solid.js
  // https://github.com/solidjs/solid/issues/731
  return children(() => transitioned() 
    ? p.children
    : (
      <Mask 
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)} 
      >{p.children}</Mask>
    )
  )
}


