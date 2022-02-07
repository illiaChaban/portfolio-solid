import { JSXElement } from "solid-js"

export type Unsubscribe = () => void
export type Cleanup = Unsubscribe
export type Key = string | number | symbol
export type Falsy = '' | 0 | null | undefined | false
export type SimpleComponent<T extends {} = {}> = (props: T) => JSXElement
/** Stands for Functional Component from React*/
export type FC<T extends {} = {}> = SimpleComponent<T>