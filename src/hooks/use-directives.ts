import { isArray } from '../utils/lodash'

type Directive<N extends HTMLElement, T> = (node: N, argument: T) => void
type SimpleDirective<N extends HTMLElement> = (node: N) => void
type DirectiveWithArg<N extends HTMLElement, T> = [Directive<N, T>, T]

/**
 * Helper method to use directives with Typescript,
 * otherwise it has a bunch of different issues
 * like compiler not understanding that the method is used
 * inside JSX and 'tree shaking' it away or having to
 * extend global solidJs JSX types for each directive
 *
 *
 * @example
 * <div ref={getUseDirectives(directive1, [directive2, accessor]) />}
 */
export const getUseDirectives =
  <T extends HTMLElement>(
    ...directives: (SimpleDirective<T> | DirectiveWithArg<T, any> | undefined)[]
  ) =>
  (node: T) => {
    directives.forEach(arg => {
      const [directive, argument] = isArray(arg) ? arg : [arg, undefined]

      directive?.(node, argument as any)
    })
  }

/**
 * Helper method to use directives with Typescript,
 * otherwise it has a bunch of different issues
 * like compiler not understanding that the method is used
 * inside JSX and 'tree shaking' it away or having to
 * extend global solidJs JSX types for each directive
 *
 * @example
 * <div ref={use(directive1, [directive2, accessor]) />}
 */
// Name alias as "use" to match the name of the special JSX attribute
export const use = getUseDirectives
