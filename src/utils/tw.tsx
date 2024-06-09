import { createStyleFn } from '@illlia/css-styled/solid'
import { JSX, splitProps } from 'solid-js'

/**
 * Easily propagate JS variables to css
 * @example
  const NavContainer = withStyle(
    { '--nav-size': `${NAV_LENGTH}px` },
    tw.div`
      flex justify-around items-center 
      text-center w-[--nav-size]
      md:h-[--nav-size] md:w-full md:flex-col
      [-webkit-tap-highlight-color:rgba(0,0,0,0)]
    `,
  )
 */
export const withStyle =
  <
    // eslint-disable-next-line @typescript-eslint/ban-types
    ExtraProps = {},
  >(
    styleObj: Record<
      string,
      string | number | ((p: ExtraProps) => string | number)
    >,
  ) =>
  <BaseProps extends { style?: JSX.CSSProperties | string }>(
    Component: (p: BaseProps) => JSX.Element,
  ) => {
    const WithStyle = (
      p: EnforceStyleAsObj<BaseProps> & ExtraProps,
    ): JSX.Element => {
      const [p1, others] = splitProps(p, ['style'])
      const style = () => {
        const mapped = {} as any
        Object.keys(styleObj).forEach(k => {
          const v = styleObj[k]
          mapped[k] = typeof v === 'function' ? v(p) : v
        })
        return Object.assign(mapped, p1.style)
      }

      return <Component style={style()} {...(others as any)} />
    }
    return WithStyle
  }

type EnforceStyleAsObj<T> = Omit<T, 'style'> & { style?: JSX.CSSProperties }

export const tw = createStyleFn()
