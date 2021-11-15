import { children, Component, createEffect, createSignal, For, JSXElement, on } from "solid-js"
import { log } from "../../utils/log"
import { Mask } from './page-transition-c'



export const TransitionContainer = (p: {children: JSXElement}): JSXElement => {
  const propsChildren = children(() => p.children)
  let id = 0
  const [elements, setElements] = createSignal<{el: JSXElement, id: number}[]>([
    {el: p.children, id: ++id}
  ])
  createEffect(on(propsChildren, (child, prevChild) => {
    console.log('children changed', {child, prevChild})
    const isFirst = !prevChild
    if (isFirst) return;


    const currChildId = elements()[elements().length - 1]?.id


    const transitionedChild = (
      <TransitionPage 
        onFinish={() => {
          if (!currChildId) return;
          setElements(v => v.filter(child => child.id !== currChildId))
        }}
      >{child}</TransitionPage>
    )

    setElements(prev => [...prev, {el: transitionedChild, id: ++id}])

    // console.log('children updates')
  }))

  // log.accessors({elements})
  // log.accessors({propsChildren})

  // createEffect(on(children, (children, prevChildren) => {

  //   const added = prevChildren && prevChildren.length < children.length
  //   if (!added || children.length < 2) return;

  //   const secondToLast = children[children.length - 2]
  //   setTimeout(() => {
  //     (secondToLast as Element).animate([
  //       {opacity: 0}
  //     ], { duration: 1000 }).finished.then(() => {
  //       setChildren(children => children.filter(v => v !== secondToLast))
  //     })
  //   }, 500)
    
  // }))

  // return (<>{children()}</>)
  return (
    <For each={elements()}>
      {({el}) => el}
    </For>
  )
}

const TransitionPage = (p: {children: JSXElement, onFinish: () => void}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  return transitioned() 
    ? <>{p.children}</> 
    : <Mask afterTransition={() => setTransitioned(true)} >{p.children}</Mask>
}