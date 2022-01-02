import { isNumber } from "../lodash"

const _breakpoints = {
  xs: 320,
  sm: 600,
  md: 960,
  lg: 1200,
  xl: 1536,
}
export type Breakpoint = keyof typeof _breakpoints | number
const getBreakpoint = (val: Breakpoint): number => 
  isNumber(val) ? val : _breakpoints[val]

export const breakpoints = {
  up: (
    val: Breakpoint, 
    withMedia = true,
  ) => `${withMedia ? '@media ' : ''}(min-width: ${getBreakpoint(val)}px)`,
  down: (
    val: Breakpoint, 
    withMedia = true,
  ) => `${withMedia ? '@media ' : ''}(max-width: ${getBreakpoint(val)}px)`,
}