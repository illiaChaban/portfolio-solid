import { createEffect, onCleanup, onMount } from "solid-js"
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
const createLogAccessors = (logger: Logger) => (...args: any[]) => {
  createEffect(() => logAccessors(logger)(...args))
}

const tapLog = (logger: Logger) => <T>(...args: any[]) => tap<T>((arg) => logger(...args, arg))


const createHookLog = (hook: (cb: () => void) => void, logger: Logger) => (...msgs: any[]) => hook(() => logger(...msgs))

const wrapFn = (logger: Logger) => <T extends any[], TReturn>(fn: (...args: T) => TReturn, ...logs: any[]) => {
  return (...args: T): TReturn => {
    const returnValue = fn(...args)
    logger(...logs, {args, value: returnValue, fnName: fn.name})
    return returnValue
  }
}

const makeLoggerUtil = (logger: Logger) => Object.assign(
  (...args: any[]) => logger(...args), {
    /** Log object of values or accessors. Will invoke all functions in the object */
    accessors: createLogAccessors(logger), 
    /** Logs intermediate value with string message and passes through the value */
    tap: tapLog(logger), 
    /** Pipe function: 
     * @example
     * log.pipe(myFunction, "log message")
     * // logs --> "log message", {args, returnValue}
     */
    wrapFn: wrapFn(logger),
    onMount: createHookLog(onMount, logger),
    onCleanup: createHookLog(onCleanup, logger),
  })

export const log = makeLoggerUtil(console.log)
export const warn = makeLoggerUtil(console.warn)
