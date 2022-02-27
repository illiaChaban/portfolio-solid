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

  bindEventWithCleanup(window, 'resize', debounce(100, update))
  onMount(update)

  return rect$
}
