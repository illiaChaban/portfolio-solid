/* eslint-disable @typescript-eslint/ban-types */
import { JSX } from 'solid-js'
// eslint-disable-next-line no-restricted-imports
import {
  useTheme as useThemeBase,
  styled as styledBase,
  CSSAttribute,
} from 'solid-styled-components'
import { AnyObj } from '../types'
import { Theme } from './theme'

export const useTheme: () => Theme = useThemeBase as any

export const styled: {
  <T extends keyof JSX.IntrinsicElements>(
    tag: T | ((props: JSX.IntrinsicElements[T]) => JSX.Element),
  ): CustomTagged<JSX.IntrinsicElements[T]>

  <T>(component: (props: T) => JSX.Element): CustomTagged<T>
} =  // Fix for solid-styled-component not supporting 'class' prop
  (tag: any) =>
  (...args: any[]) => {
    const Component = styledBase(tag)(...args)
    return (props: any) => (
      // eslint-disable-next-line solid/no-react-specific-props
      <Component {...props} className={props.class ?? props.className} />
    )
  }

type StyledComponent<TOriginalProps extends {}, TExtraProps extends {} = {}> = (
  props: TExtraProps & TOriginalProps,
) => JSX.Element

export type StyledProps<T extends AnyObj> = { theme: Theme } & T

type CustomTagged<TOriginalProps extends {}> = {
  <TExtraProps extends {} = {}>(
    styles: TemplateStringsArray,
    ...args: ReadonlyArray<
      | string
      | number
      | ((
          props: StyledProps<TOriginalProps & TExtraProps>,
        ) => string | number | CSSAttribute | undefined)
    >
  ): StyledComponent<TOriginalProps, TExtraProps>

  (styles: CSSAttribute): StyledComponent<TOriginalProps>

  <TExtraProps extends {}>(
    getStyles: (
      props: StyledProps<TExtraProps & TOriginalProps>,
    ) => CSSAttribute,
  ): StyledComponent<TOriginalProps, TExtraProps>
}

// eslint-disable-next-line no-restricted-imports
export {
  css,
  keyframes,
  extractCss,
  glob,
  setup,
  createGlobalStyles,
} from 'solid-styled-components'
