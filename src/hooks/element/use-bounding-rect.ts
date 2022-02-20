import { Accessor, createSignal, onMount } from 'solid-js'
import { pipe } from '../../utils'
import { bindEventWithCleanup } from '../../utils/events'
import { debounce } from '../../utils/lodash'
import { withActions } from '../../utils/with-actions'
import { Ref } from '../use-ref'

export const useBoundingRect = (
  element: Ref<Element>,
): Accessor<DOMRect | undefined> => {
  const styles$ = withActions(createSignal<DOMRect>(), set => ({
    update: () => pipe(element.current.getBoundingClientRect(), set),
  }))

  bindEventWithCleanup(window, 'resize', debounce(100, styles$.update))
  onMount(styles$.update)

  return () => styles$()
}
