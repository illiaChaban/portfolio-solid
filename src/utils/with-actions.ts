import { Accessor, Setter } from 'solid-js'
import { isArray } from '.'
import { Atom } from '../hooks'
import { AnyFunc } from '../types'

/**
 * A utility to define custom actions and avoid exposing the setter
 *
 * @example
 * const value = withActions(createSignal(0), (set) => ({
 *   increment: () => set(v => v+1),
 *   reset: () => set(0)
 * }))
 *
 * // OR
 *
 * const value = withActions(useAtom(0), (set) => ({
 *   increment: () => set(v => v+1),
 *   reset: () => set(0)
 * }))
 *
 * console.log(value()) // 0
 *
 * value.increment()
 * console.log(value()) // 1
 *
 * value.reset()
 * console.log(value()) // 0
 *
 */
export const withActions = <T, TActions extends Record<string, AnyFunc>>(
  reactive: [Accessor<T>, Setter<T>] | Atom<T>,
  mapSet: (set: Setter<T>) => TActions,
): Accessor<T> & TActions => {
  const [get, set] = isArray(reactive)
    ? reactive
    : [reactive, (val: any) => reactive(val ?? undefined)]
  return Object.assign(() => get(), mapSet(set))
}
