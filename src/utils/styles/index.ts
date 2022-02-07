import { default as classnames, Argument as ArgumentBase, Value, Mapping } from 'classnames'
type NewMapping = Record<string, Value>
// Make sure to disallow functions as parameter
type Argument = Exclude<ArgumentBase, Mapping> | NewMapping
export const cx = (...args: Argument[]): string => classnames(...args)

export * from './get-css-var'
export * from './media'