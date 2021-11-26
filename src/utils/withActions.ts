import { Accessor, Setter } from "solid-js";

/**
 * A utility to define custom actions and avoid exposing the setter
 * 
 * @example
 * const value = withActions(createSignal(0), (set) => ({ 
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
export const withActions = <T, TActions extends Record<string, Function>>(
  [get, set]: [Accessor<T>, Setter<T>],
  mapSet: (set: Setter<T>) => TActions
): Accessor<T> & TActions => {
  return Object.assign(get, mapSet(set))
}