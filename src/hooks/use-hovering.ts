import { Accessor, onCleanup } from 'solid-js'
import { useAtom } from '.'
import { Unsubscribe } from '../types'
import { bindEvent } from '../utils'

export const useHovering = (): [
  Accessor<boolean>,
  (el: HTMLElement) => void,
] => {
  const hovering$ = useAtom(false)

  const unsubscribers: Unsubscribe[] = []

  const register = (el: HTMLElement) => {
    unsubscribers.push(
      bindEvent(el, 'mouseenter', () => hovering$(true)),
      bindEvent(el, 'mouseleave', () => hovering$(false)),
    )
  }

  onCleanup(() => unsubscribers.forEach(cb => cb()))

  return [() => hovering$(), register]
}
