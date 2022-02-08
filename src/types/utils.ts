import { JSXElement } from 'solid-js'

export type Unsubscribe = () => void
export type Cleanup = Unsubscribe
export type Key = string | number | symbol
export type Falsy = '' | 0 | null | undefined | false
export type AnyObj = Record<string, unknown>
export type EmptyObj = Record<string, never>
export type AnyFunc = (...args: any[]) => any
export type SimpleComponent<T extends AnyObj = EmptyObj> = (
  props: T,
) => JSXElement
/** Stands for Functional Component from React*/
export type FC<T extends AnyObj = EmptyObj> = SimpleComponent<T>
// eslint-disable-next-line @typescript-eslint/ban-types
export type OmitSafe<T extends {}, TKeys extends keyof T> = Omit<T, TKeys>
