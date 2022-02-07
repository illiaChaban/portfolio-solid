import { Component } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { ThemeProvider as ThemeProviderBase} from 'solid-styled-components'
import { breakpoints } from './breakpoints'
import { GlobalStyles } from './global-styles'

export type Theme = {
  colors: {
    primary: string,
    text: {
      primary: string,
      subtle1: string,
      subtle2: string,
    },
    background: string,
  },
  breakpoints: typeof breakpoints,
  misc: {
    // TODO: remove if possible
    navOffset: string
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
      },
      background: 'var(--body-background-color)',
    },
    breakpoints,
    misc: {
      navOffset: 'var(--menu-offset)'
    }
  }
  
  return (
    <ThemeProviderBase theme={theme}>
      <GlobalStyles />
      {p.children}
    </ThemeProviderBase>
  )
}
