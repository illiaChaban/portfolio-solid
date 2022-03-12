/* eslint-disable @typescript-eslint/ban-types */
import { JSXElement } from 'solid-js'

export type Unsubscribe = () => void
export type Cleanup = Unsubscribe
export type Key = string | number | symbol
export type Falsy = '' | 0 | null | undefined | false
export type AnyObj = Record<string, unknown>
export type EmptyObj = Record<string, never>
export type Dictionary<T> = Record<string, T>
export type AnyFunc = (...args: any[]) => any
export type SimpleComponent<T extends AnyObj = EmptyObj> = (
  props: T,
) => JSXElement
/** Stands for Functional Component from React*/
export type FC<T extends AnyObj = EmptyObj> = SimpleComponent<T>
export type OmitSafe<T extends {}, TKeys extends keyof T> = Omit<T, TKeys>

export type WithOverrides<T extends {}, Y extends {}> = Omit<T, keyof Y> & Y
export type PartialBut<T, K extends keyof T> = Partial<Omit<Text, K>> &
  Pick<T, K>
