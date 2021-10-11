import { css, CSSAttribute } from "solid-styled-components";
import { mapValues } from "../lodash";

export { default as cx } from 'classnames'

export const makeStyles = <
  T extends Record<string, CSSAttribute | string>
>(styles: T): {
  [key in keyof T]: string
} => mapValues(styles, (v) => css(v))



