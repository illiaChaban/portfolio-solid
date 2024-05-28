import { Accessor } from 'solid-js'
import { useMediaQuery } from '../hooks/use-media-query'
import { isNumber } from '../utils/lodash'
import { breakpoints as _breakpoints } from '../../tailwind.config.mjs'

export type Breakpoint = keyof typeof _breakpoints | number
const getBreakpoint = (val: Breakpoint): number =>
  isNumber(val) ? val : _breakpoints[val]

export const breakpoints = {
  up: (val: Breakpoint) => `(min-width: ${getBreakpoint(val)}px)`,
  down: (val: Breakpoint) => `(max-width: ${getBreakpoint(val) - 1}px)`,
}

export const useBreakpoint = (
  breakpoint: Breakpoint,
  direction: 'up' | 'down' = 'up',
): Accessor<boolean> => useMediaQuery(breakpoints[direction](breakpoint))
