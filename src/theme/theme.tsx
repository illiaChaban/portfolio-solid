import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { ThemeProvider as ThemeProviderBase, useTheme as useThemeBase } from 'solid-styled-components'
import { GlobalStyles } from "./global-styles";

const theme = {
  colors: {
    primary: 'red'
  }
}

export const ThemeProvider: Component = (p): JSX.Element => {
  return (
    <ThemeProviderBase theme={theme}>
      <GlobalStyles />
      {p.children}
    </ThemeProviderBase>
  )
}

export const useTheme: () => typeof theme = useThemeBase as any