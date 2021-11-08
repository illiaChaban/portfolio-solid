import { createEffect, onMount } from "solid-js"
import { isFunction, isObject, mapValues, tap } from "./lodash"

/** Log accessor or object of accessors. Will invoke all functions */
const logAccessors = (...args: any[]): void => {
  const execAccessor = (val: unknown) => isFunction(val) ? val() : val

  const mappedArgs = args.map(arg => 
    isObject(arg) 
      ? mapValues(arg, execAccessor)
      : execAccessor(arg)
  )
  console.log(...mappedArgs)
} 

/** Log object of values or accessors. Will invoke all functions in the object */
export const createLogAccessors = (...args: any[]) => {
  createEffect(() => logAccessors(...args))
}

const tapLog = (...args: any[]) => tap((arg) => console.log(...args, arg))

const onMountLog = (msg: string) => onMount(() => console.log(msg))

const pipeTap = <T extends any[], TReturn>(fn: (...args: T) => TReturn, ...logs: any[]) => {
  return (...args: T): TReturn => {
    console.log(...logs, args)
    return fn(...args)
  }
}

export const log = Object.assign(
  (...args: any[]) => console.log(...args), {
    accessors: createLogAccessors, 
    tap: tapLog, 
    onMount: onMountLog,
    pipe: pipeTap,
  })
