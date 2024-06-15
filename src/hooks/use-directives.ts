import { Nil } from '@illlia/ts-utils'

/**
 * Helper method to use directives with Typescript,
 * otherwise it has a bunch of different issues
 * like compiler not understanding that the method is used
 * inside JSX and 'tree shaking' it away or having to
 * extend global solidJs JSX types for each directive
 *
 *
 * @example
 * <div ref={use(directive1, getDirective2(accessor)) />}
 */
export const use =
  <T extends HTMLElement>(
    ...directives: Array<((node: T) => void) | T | Nil>
  ) =>
  (node: T) => {
    directives.forEach(directive => {
      // Solid wraps refs into a function by default
      const d = directive as any as (node: HTMLElement) => void
      d?.(node)
    })
  }
