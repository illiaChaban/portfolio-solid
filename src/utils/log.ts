import { createEffect, onMount } from "solid-js"
import { isFunction, isObject, mapValues, tap } from "./lodash"

type Logger = (...data: any[]) => void

/** Log accessor or object of accessors. Will invoke all functions */
const logAccessors = (logger: Logger) => (...args: any[]): void => {
  const execAccessor = (val: unknown) => isFunction(val) ? val() : val

  const mappedArgs = args.map(arg => 
    isObject(arg) 
      ? mapValues(arg, execAccessor)
      : execAccessor(arg)
  )
  logger(...mappedArgs)
} 

/** Log object of values or accessors. Will invoke all functions in the object */
export const createLogAccessors = (logger: Logger) => (...args: any[]) => {
  createEffect(() => logAccessors(logger)(...args))
}

const tapLog = (logger: Logger) => (...args: any[]) => tap((arg) => logger(...args, arg))

const onMountLog = (logger: Logger) => (msg: string) => onMount(() => logger(msg))

const pipeTap = (logger: Logger) => <T extends any[], TReturn>(fn: (...args: T) => TReturn, ...logs: any[]) => {
  return (...args: T): TReturn => {
    logger(...logs, args)
    return fn(...args)
  }
}

export const log = Object.assign(
  (...args: any[]) => console.log(...args), {
    accessors: createLogAccessors(console.log), 
    tap: tapLog(console.log), 
    onMount: onMountLog(console.log),
    pipe: pipeTap(console.log),
  })

export const warn = Object.assign(
  (...args: any[]) => console.warn(...args), {
    accessors: createLogAccessors(console.warn), 
    tap: tapLog(console.warn), 
    onMount: onMountLog(console.warn),
    pipe: pipeTap(console.warn),
  })
