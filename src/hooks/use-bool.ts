import { createSignal } from 'solid-js'
import { withActions } from '../utils'

export const useBool = (value = false) => {
  return withActions(createSignal<boolean>(value), set => ({
    toggle: () => set(v => !v),
    on: () => set(true),
    off: () => set(false),
  }))
}
