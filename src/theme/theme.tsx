import { ParentComponent } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
// eslint-disable-next-line no-restricted-imports
import { ThemeProvider as ThemeProviderBase } from 'solid-styled-components'
import { breakpoints } from './breakpoints'
import { GlobalStyles, sharedStyles } from './global-styles'

const theme = {
  colors: {
    primary: 'var(--color-highlight)',
    text: {
      primary: 'var(--color-main)',
      subtle1: 'var(--color-subtle)',
      subtle2: 'var(--color-subtle-text)',
    },
    gray: {
      light: '#afadad',
    },
    background: 'var(--body-background-color)',
    accent: {
      black: 'black',
    },
  },
  breakpoints,
  // FIXME: remove if possible
  misc: {
    navOffset: 'var(--menu-offset)',
  },
  sharedStyles,
  zIndex: {
    navbar: 3,
    pageTranstion: 2,
  },
}

export type Theme = typeof theme

export const ThemeProvider: ParentComponent = (p): JSX.Element => {
  return (
    <ThemeProviderBase theme={theme}>
      <GlobalStyles />
      {p.children}
    </ThemeProviderBase>
  )
}
