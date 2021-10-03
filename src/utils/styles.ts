import { css, CSSAttribute } from "solid-styled-components";
import { mapValues } from "./map-values";

export { default as cx } from 'classnames'

export const makeStyles = <
  T extends Record<string, CSSAttribute>
>(styles: T): {
  [key in keyof T]: string
} => mapValues(styles, (v) => css(v)) as any
