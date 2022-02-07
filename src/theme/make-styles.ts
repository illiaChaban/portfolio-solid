import { Theme, useTheme } from '.'
import { AnyObj } from '../types'
import { isFunction, mapValues } from '../utils/lodash'

type Style<TProps extends AnyObj | undefined> =
  | string
  | ((theme: Theme, props: TProps) => string)

type UseStyles<TKeys extends string, TProps> = TProps extends undefined
  ? () => Record<TKeys, () => string>
  : (props: TProps) => Record<TKeys, () => string>

/**
 * A helper to create styles that might depend on theme or props
 *
 * @warning not tested
 *
 * @example
 * const useStyles = makeStyles<Props>()({
 *  hello: (theme, props) => css`
 *    color: ${theme.color};
 *    display: ${props.show ? 'black' : 'none'};
 *  `,
 *  other: css({ border: '1px solid blue'}),
 *  other2: css`...`,
 * })
 *
 * const Component = (props: Props) => {
 *  const styles = useStyles(props)
 *  const [show, setShow] = createSignal(true)
 *  return (
 *    <div classList={{
 *      [styles.hello()]: show(),
 *      [styles.other()]: true,
 *      [styles.other2()]: true,
 *    }} />
 *  )
 * }
 */
export const makeStyles =
  <
    // Required params (TKeys) cannot follow optional params (TParams)
    // So we need an extra function to properly infer the keys
    TProps extends AnyObj | undefined = undefined,
  >() =>
  <TKeys extends string>(
    styles: Record<TKeys, Style<TProps>>,
  ): UseStyles<TKeys, TProps> => {
    return (props =>
      mapValues(
        styles,
        style => () =>
          isFunction(style)
            ? style(useTheme(), props as TProps)
            : (style as string),
      )) as UseStyles<TKeys, TProps>
  }
