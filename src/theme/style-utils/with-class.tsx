import { FC } from '../../types'
import { cx, scope } from '../../utils'

const getUniqueClassName = scope(() => {
  const counts: Record<string, number> = {}
  return (className: string) => {
    counts[className] = (counts[className] ?? 0) + 1
    const count = counts[className]
    return count === 1 ? className : `${className}-${count}`
  }
})

// TODO: using "className" instead of "class" because solid-styled-components
// doesn't currently support "class"
/**
 * Helper method to style dependent child elements.
 * This will create a new unique className from the one provided
 *
 * @example
 * const Wrapper = withClass('wrapper')(styled('a')`display: flex;`)
 * const Child = styled('span')`
 *  background: white;
 *  .${Wrapper.class}:hover & {
 *    background: blue;
 *  }
 * `
 */
export const withClass =
  (className: string) =>
  <T extends { className?: string; class?: string }>(
    Component: FC<T>,
  ): FC<T> & { class: string } => {
    const uniqueClassName = getUniqueClassName(className)
    const Wrapped = (props: T) => {
      return (
        <Component
          {...props}
          className={cx(uniqueClassName, props.className, props.class)}
        />
      )
    }
    return Object.assign(Wrapped, { class: uniqueClassName })
  }
