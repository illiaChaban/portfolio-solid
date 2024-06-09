import { createStyleFn } from '@illlia/css-styled/solid'

import { JSX, splitProps } from 'solid-js'

export const withStyle =
  <
    BaseProps extends { style?: JSX.CSSProperties | string },
    // eslint-disable-next-line @typescript-eslint/ban-types
    ExtraProps = {},
  >(
    styleObj: Record<
      string,
      | string
      | number
      | ((p: EnforceStyleAsObj<BaseProps> & ExtraProps) => string | number)
    >,
    Component: (p: BaseProps) => JSX.Element,
  ) =>
  (p: EnforceStyleAsObj<BaseProps> & ExtraProps): JSX.Element => {
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

type EnforceStyleAsObj<T> = Omit<T, 'style'> & { style?: JSX.CSSProperties }

export const tw = createStyleFn()
