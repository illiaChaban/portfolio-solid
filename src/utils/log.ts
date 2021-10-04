import { Dictionary, isFunction, mapValues } from "lodash"
import { createEffect } from "solid-js"

/** Log object of values or accessors. Will invoke all functions in the object */
export const logValues = <T extends {}>(obj: T, msg: string = ''): void => {
  console.log(
    msg,
    mapValues(obj, (v) => isFunction(v) ? v() : v)
  )
} 

/** Log object of values or accessors. Will invoke all functions in the object */
export const createLogValues = <T extends {}>(obj: T) => {
  createEffect(() => logValues(obj))
}