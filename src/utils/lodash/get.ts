import { assert } from '..'
import { AnyObj, Path, PathValue } from '../../types'

/** Will throw if the value is not preset */
export const get =
  <T extends AnyObj | any[], TPath extends Path<T>>(path: TPath) =>
  (obj: T): PathValue<T, TPath> => {
    const keys = path.split('.')
    return keys.reduce((value, key) => {
      assert(
        key in value,
        `Was not able to access ${path} in ${JSON.stringify(obj)}`,
      )
      return (value as any)[key]
    }, obj) as any
  }

export const at = get
