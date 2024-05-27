import { FC } from '../../types'
import { cx } from '../../utils'
import { Theme } from '../theme'
import { useTheme } from '../type-overrides'

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
