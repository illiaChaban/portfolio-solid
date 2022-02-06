import { Falsy } from "../types"

export type Truthy<T> = Exclude<T, Falsy>
export const isTruthy = <T>(value: T): value is Truthy<T> => !!value
