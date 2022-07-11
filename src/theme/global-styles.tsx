import { createGlobalStyles } from './type-overrides'

const tagStyles = `
  .h1-tags,
  .body-tags,
  .div-tags,
  .div-tags-end
  {
    position: relative;
  }

  .div-tags-end {
    padding-bottom: 25px;
  }

  .body-tags {
    padding: 45px 0;
  }

  .h1-tags::after,
  .h1-tags::before,
  .body-tags::after,
  .body-tags::before,
  .div-tags::after,
  .div-tags::before,
  .div-tags-end::after
  {
    color: var(--color-subtle);
    position: absolute;
    left: 0;
    font-family: 'League Script', 'Courier New', 'Inconsolata', cursive;
    font-weight: 900;
    font-size: .8rem;
    text-transform: none;
  }

  .body-tags::before {
    content: '<body>';
    top: 20px;
  }
  .body-tags::after {
    content: '</body>';
    bottom: 20px;
  }
  .body-tags::before,
  .body-tags::after
  {
    left: 2%;
  }

  .h1-tags::before {
    content: "<h1>";
    bottom: 100%;
  }
  .h1-tags::after {
    content: "</h1>";
    top: calc( 100% + .4rem);
  }

  .div-tags::before {
    content: '<div>';
    /* bottom: 100%; */
    top: 0;
  }
  .div-tags::after,
  .div-tags-end::after {
    content: '</div>';
    /* top: calc( 100% + .5rem ); */
    bottom: 0px;
  }

`

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
  }

  @media (max-width: 960px) {
    body {
      --body-background-color: #122438; 
      /* fixing white background on home page on mobile after squirrel jump animation */
      background: var(--body-background-color);
    }
  }

  .flex-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

  ${tagStyles}
`

export const sharedStyles = {
  tags: {
    body: 'body-tags',
    div: 'div-tags',
    divEnd: 'div-tags-end',
    h1: 'h1-tags',
  },
  flex1: 'flex-1',
}
