import { FC } from '../../types'
import { cx, getUniqueId } from '../../utils'
import { Theme } from '../theme'
import { useTheme } from '../type-overrides'

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
export const withUniqueClass =
  (className: string) =>
  <T extends { className?: string; class?: string }>(
    Component: FC<T>,
  ): FC<T> & { class: string } => {
    const uniqueClassName = getUniqueId(className)
    const Wrapped = (props: T) => {
      return (
        <Component
          {...props}
          class={cx(uniqueClassName, props.className, props.class)}
        />
      )
    }
    return Object.assign(Wrapped, { class: uniqueClassName })
  }

export const withSharedStyles =
  (getter: (styles: Theme['sharedStyles']) => string) =>
  <T extends { class?: string }>(Component: FC<T>): FC<T> => {
    const Wrapped = (props: T) => {
      const theme = useTheme()
      const className = getter(theme.sharedStyles)
      return <Component {...props} class={cx(className, props.class)} />
    }
    return Wrapped
  }
