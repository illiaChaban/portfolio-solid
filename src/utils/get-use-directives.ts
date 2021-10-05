import { isArray } from "../utils/lodash"

type Accessor = () => any
type Directive = (node: Element, accessor: Accessor) => void

type SimpleDirectiveArg = (node: Element) => void
type DirectiveArg = [Directive, Accessor]

/** 
 * Helper method to use directives with Typescript,
 * otherwise it has a bunch of different issues
 * like compiler not understanding that the method is used
 * inside JSX and 'tree shaking' it away or having to 
 * extend global solidJs JSX types for each directive
 */
export const getUseDirectives = (
  ...directives: (SimpleDirectiveArg | DirectiveArg)[]
) => (node: Element) => {
  directives.forEach((arg) => {
    const [directive, accessor] = isArray(arg)
      ? arg
      : [arg, undefined]

    directive(node, accessor as any)
  })
}