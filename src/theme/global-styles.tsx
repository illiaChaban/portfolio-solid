// eslint-disable-next-line no-restricted-imports
import { createGlobalStyles } from 'solid-styled-components'

export const GlobalStyles = createGlobalStyles`

  h1:focus-visible {
    outline: none;
  }

  html, body {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  html {
    font-size: 16px;
  }

  @media (min-width: 1150px) {
    html {
      font-size: 17px;
    }
  }

  body {
    --menu-offset: 56px;

    --color-subtle-text: #73aeb9;
    --color-subtle: #7f838a;
    --color-main: #fdfbeb;
    --color-highlight: #7fffff;

    --body-background-color: #112d44; 
    
    background: -moz-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: -webkit-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);

    margin: 0;
    color: var(--color-main);
    font-family: 'Saira', Helvetica, Courier, sans-serif;

    background-size: cover;
    background-position: center;
    position: relative;
    overscroll-behavior: none;
  }

  @media (max-width: 960px) {
    body {
      --body-background-color: #122438; 
      /* fixing white background on home page on mobile after squirrel jump animation */
      background: var(--body-background-color);

      background: #141E30;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to left, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to left, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
  }

  .flex-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

`
