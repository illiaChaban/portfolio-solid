import { Component } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { ThemeProvider as ThemeProviderBase, useTheme as useThemeBase } from 'solid-styled-components'
import { GlobalStyles } from "./global-styles";

export type Theme = {
  colors: {
    primary: string,
    text: {
      primary: string,
      subtle1: string,
      subtle2: string,
    }
  },
}

export const ThemeProvider: Component = (p): JSX.Element => {
  const theme: Theme = {
    colors: {
      primary: 'var(--color-highlight)',
      text: {
        primary: 'var(--color-main)',
        subtle1: 'var(--color-subtle)',
        subtle2: 'var(--color-subtle-text)',
      }
    },
  }
  
  return (
    <ThemeProviderBase theme={theme}>
      <GlobalStyles />
      {p.children}
    </ThemeProviderBase>
  )
}

export const useTheme: () => Theme = useThemeBase as any