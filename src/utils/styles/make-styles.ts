import { css, CSSAttribute } from "solid-styled-components";
import { mapValues } from "../lodash";

type Style = CSSAttribute | string
type Styles = Record<string, Style>
type OutputStyles<T extends Styles> = {
  [K in keyof T]: string
}

export const makeStyles = <
  T extends Styles, 
>(
  styles: T, 
): OutputStyles<T> => {
  return mapValues(styles, (v) => css(v))
}
