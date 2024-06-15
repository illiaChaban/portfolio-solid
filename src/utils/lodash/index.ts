import { AnyFunc, AnyObj } from '../../types'

import _debounce from 'lodash/debounce'
// eslint-disable-next-line no-restricted-imports
import type { DebouncedFunc, DebounceSettings } from 'lodash'

export * from './extract'
export * from './min-max'
export * from './get'

// Lodash like helper. Couldn't figure out why the dev env loads the whole lodash library

export const mapValues = <T extends AnyObj, TResult>(
  object: T,
  mapper: (val: T[keyof T], key: keyof T) => TResult,
): { [K in keyof T]: TResult } => {
  const newEntries = Object.entries(object).map(([key, value]) => [
    key,
    mapper(value as any, key as keyof T),
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

export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const pick = <T extends AnyObj, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Pick<T, TKeys> => {
  return keys.reduce((newObj, key) => {
    newObj[key] = obj[key]
    return newObj
  }, {} as Pick<T, TKeys>)
}

export const scope = <T>(callback: () => T): T => callback()

export const tap =
  <T>(cb: (arg: T) => unknown) =>
  (arg: T): T => {
    cb(arg)
    return arg
  }

interface Last {
  <T>(arr: Readonly<[T, ...T[]]>): T
  <T>(arr: Readonly<T[]>): T | undefined
}
export const last: Last = arr => {
  const lastIdx = arr.length - 1
  return arr[lastIdx]
}

type KeysOfUnion<T> = T extends AnyObj ? keyof T : never
export const has = <T extends AnyObj, TKey extends KeysOfUnion<T>>(
  obj: T,
  key: TKey,
): obj is T & Partial<Record<TKey, any>> => key in obj

type TimedFn<Targs extends any[]> = {
  (...args: Targs): void
  cancel: () => void
}
export const debounce =
  (time: number, options?: DebounceSettings) =>
  <Fn extends (...args: any[]) => any>(fn: Fn): DebouncedFunc<Fn> => {
    return _debounce(fn, time, options)
  }

/** Invokes the function on initial call and throttles every next call */
export const throttle = <TArgs extends any[]>(
  time: number,
  fn: (...args: TArgs) => unknown,
): TimedFn<TArgs> => {
  let timeoutId: NodeJS.Timeout | undefined
  let currArgs: TArgs
  let lastArgs: TArgs

  const wrappedFn = (args: TArgs) => {
    fn(...args)
    lastArgs = args
  }

  const throttled = (...args: TArgs) => {
    currArgs = args

    const wasScheduled = !!timeoutId
    if (wasScheduled) return

    const callAndSchedule = () => {
      const beenCalled = lastArgs === currArgs
      if (beenCalled) {
        timeoutId = undefined
        return
      }

      wrappedFn(currArgs)
      timeoutId = setTimeout(callAndSchedule, time)
    }
    callAndSchedule()
  }

  return Object.assign(throttled, {
    cancel: () => {
      clearTimeout(timeoutId)
      timeoutId = undefined
    },
  })
}

export const identity = <T>(value: T): T => value

export const iif =
  <T, R1, R2 = T>(
    condition: unknown,
    mapWhenTruthy: (value: T) => R1,
    mapWhenFalsy: (value: T) => R2 = identity as any,
  ) =>
  (value: T) =>
    condition ? mapWhenTruthy(value) : mapWhenFalsy(value)

export const range: {
  (to: number): number[]
  (from: number, to: number): number[]
} = (fromOrTo: number, maybeTo?: number) => {
  const from = defined(maybeTo) ? fromOrTo : 0
  const to = defined(maybeTo) ? maybeTo : fromOrTo
  return new Array(to - from).fill(0).map((_, i) => from + i)
}

const defined = <T>(val: T): val is Exclude<T, undefined> => {
  return val !== undefined
}
