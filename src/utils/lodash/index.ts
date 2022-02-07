import { AnyFunc, AnyObj } from '../../types'

export * from './extract'
export * from './range'

// Lodash like helper. Couldn't figure out why the dev env loads the whole lodash library

export const mapValues = <T extends AnyObj, TResult>(
  object: T, 
  mapper: (val: T[keyof T], key: keyof T) => TResult
): {[K in keyof T]: TResult} => {
  const newEntries = Object.entries(object)
    .map(([key, value]) => [
      key, 
      mapper(value as any, key as keyof T)
    ])
  return Object.fromEntries(newEntries) as any
}

export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number'
}

export const isFunction = (val: unknown): val is AnyFunc => {
  return typeof val === 'function'
}

export const isArray = (val: unknown): val is any[] => {
  return Array.isArray(val)
}

export const isObject = (val: unknown): val is AnyObj => {
  return typeof val === 'object' && val !== null && !isArray(val)
}

export const pick = <T extends AnyObj, TKeys extends keyof T>(obj: T, keys: TKeys[]): Pick<T, TKeys> => {
  return keys.reduce((newObj, key) => {
    newObj[key] = obj[key]
    return newObj
  }, {} as Pick<T, TKeys>)
} 

export const call = <T>(callback: () => T): T => callback()

export const combine = <T>(...callbacks: ((arg: T) => unknown)[]) => (arg: T): void => {
  return callbacks.forEach(cb => cb(arg))
}

export const tap = <T>(cb: (arg: T) => unknown) => 
  (arg: T): T => {
    cb(arg)
    return arg
  }

interface Last {
  <T>(arr: Readonly<[T, ...T[]]>): T
  <T>(arr: Readonly<T[]>): T | undefined 
}
export const last: Last = (arr) => {
  const lastIdx = arr.length - 1
  return arr[lastIdx]
}

type KeysOfUnion<T> = T extends AnyObj ? keyof T: never;
export const has = <T extends AnyObj, TKey extends KeysOfUnion<T>>(
  obj: T, key: TKey
): obj is T & Partial<Record<TKey, any>> => key in obj


type Debounced<Targs extends any[]> = {
  (...args: Targs): void,
  cancel: () => void
} 
export const debounce = <Targs extends any[]>(
  time: number,
  fn: (...args: Targs) => unknown, 
): Debounced<Targs> => {
  let timeoutId: number
  const cancel = () => clearTimeout(timeoutId)
  const debounced = (...args: Targs) => {
    cancel()
    timeoutId = setTimeout(() => fn(...args), time)
  }

  return Object.assign(debounced, {cancel})
}

export const identity = <T>(value: T): T => value

export const iif = <T, R1, R2 = T>(
  condition: unknown, 
  mapWhenTruthy: (value: T) => R1,
  mapWhenFalsy: (value: T) => R2 = (identity as any)
) => (value: T) => 
    condition
      ? mapWhenTruthy(value)
      : mapWhenFalsy(value)
