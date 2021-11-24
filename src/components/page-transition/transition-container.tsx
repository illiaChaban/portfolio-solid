import { children, Component, createComputed, createEffect, createMemo, createRoot, createSignal, For, getOwner, JSXElement, on, onCleanup, onMount, untrack } from "solid-js"
import { call, last } from "../../utils/lodash"
import { log, warn } from "../../utils/log"
import { Mask } from './page-transition-c'

export const TransitionContainer = (p: {children: JSXElement}): JSXElement => {
  const propsChildren = children(() => p.children)
  const getNextId = call(() => {
    let id = 0
    return () => ++id
  })

  type Child = {el: JSXElement, id: number, dispose?: () => void }
  const [elements, {add: addElement, remove: removeElement}] = call(() => {
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
    return [elements, {remove, add}]

  })


  createComputed(on(propsChildren, (child, prevChild) => {

    const isFirst = !prevChild
    if (isFirst) return;


    const currChildId = last(elements())?.id


    child = untrack(() => child)
    const [transitionedChild, dispose] = 
      // untrack(() => 
      createRoot((dispose) => {

        return [(
          <TransitionPage 
            onFilled={() => {
              console.log('on filled', {currChildId})
              if (!currChildId) return;
              removeElement(currChildId)
            }}
          >{child}</TransitionPage>
        ), dispose]
      })

    warn.accessors({transitionedChild})

    addElement(transitionedChild, dispose)
  }))

  warn.accessors({elements})

  return (
    <For each={elements()}>
      {(child) => child.el}
    </For>
  )
}

const TransitionPage = (p: {children: JSXElement, onFilled: () => void}): JSXElement => {
  log.onCleanup('cleanup transition page')
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

  warn.onMount('mount transition page')
  warn.onCleanup('Cleanup transition page')
  // onMount(() => console.warn('mount transition page'))
  // onCleanup(() => console.warn('Cleanup transition page'))

  return resolved
  warn.accessors({resolved})
  return <div>{transitioned() 
    ? p.children
    : (
      <Mask 
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)} 
      >{p.children}</Mask>
    )}</div>
}


