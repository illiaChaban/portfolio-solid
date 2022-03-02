import { createSignal, Accessor, Setter } from 'solid-js'
import { AnyFunc } from '../types'

type SetWithCallback<T> = <U extends T>(callback: (prev: T) => U) => U
// Can't set a function as a value, because Solid assumes it's a callback setter
// eslint-disable-next-line @typescript-eslint/ban-types
type SetWithValue<T> = <U extends Exclude<T, Function>>(value: U) => U
/** Like Setter except argument is required */
type RequiredSetter<T> = SetWithCallback<T> & SetWithValue<T>

export type Atom<T> = Accessor<T> & RequiredSetter<T>

type UseAtom = {
  /**
   * Experimental. A utility for createSignal.
   * When invoked without arguments acts like an accessor.
   * With an argument acts like a setter.
   */
  <T>(): Atom<T | undefined>
  /**
   * Experimental. A utility for createSignal.
   * When invoked without arguments acts like an accessor.
   * With an argument acts like a setter.
   */
  <T>(defaulValue: T): Atom<T>
}
export const useAtom: UseAtom = <T>(defaultValue?: T) => {
  const [value, setValue] = createSignal(defaultValue)

  type SetterCallback<T> = <U extends T>(value: T) => U
  type ValueOrSetterCallback<T> = T extends AnyFunc
    ? SetterCallback<T>
    : T | SetterCallback<T>

  return (...args: [] | [ValueOrSetterCallback<T>]) =>
    args.length ? setValue(args[0] as any) : value()
}
