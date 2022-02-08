import { Accessor } from 'solid-js'
import { useTheme } from '.'
import { useMediaQuery } from '../hooks/use-media-query'
import { isNumber } from '../utils/lodash'

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
  up: (val: Breakpoint) => `(min-width: ${getBreakpoint(val)}px)`,
  down: (val: Breakpoint) => `(max-width: ${getBreakpoint(val)}px)`,
}

export const useBreakpoint = (
  breakpoint: Breakpoint,
  direction: 'up' | 'down' = 'up',
): Accessor<boolean> =>
  useMediaQuery(useTheme().breakpoints[direction](breakpoint))
