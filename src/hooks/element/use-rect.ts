import { createSignal, onMount } from 'solid-js'
import { bindEventWithCleanup } from '../../utils/events'
import { debounce } from '../../utils/lodash'
import { withActions } from '../../utils/with-actions'

export const useBoundingRect = <T extends Element>() => {
  let element: T | undefined

  const rect$ = withActions(createSignal<DOMRect>(), set => ({
    track: (el: T) => {
      element = el
      set(el.getBoundingClientRect())
    },
  }))

  const update = () => element && rect$.track(element)

  onMount(update)
  bindEventWithCleanup(window, 'resize', debounce(100, update))

  return rect$
}

type Rect = Record<
  'top' | 'left' | 'right' | 'bottom' | 'width' | 'height',
  number
>
// type Rect = {top: number, left: number, right: number, bottom: number}
export const useRect = <T extends HTMLElement>() => {
  let element: T | undefined

  const rect$ = withActions(
    createSignal<Rect>({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    }),
    set => ({
      update: () => {
        if (!element) return
        const { top, left, right, bottom, width, height } =
          element.getBoundingClientRect()
        set({
          top: top + window.scrollY,
          bottom: bottom + window.scrollY,
          left: left + window.scrollX,
          right: right + window.scrollX,
          width,
          height,
        })
      },
    }),
  )

  onMount(rect$.update)
  bindEventWithCleanup(window, 'resize', debounce(100, rect$.update))
  bindEventWithCleanup(window, 'scroll', debounce(100, rect$.update))

  return Object.assign(() => rect$(), {
    track: (el: T) => {
      element = el
      rect$.update()
    },
  })
}
