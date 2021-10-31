import { createGlobalStyles } from "solid-styled-components";
import InkImg from '../contexts/page-transition/ink-11.png' // 11, 14

export const GlobalStyles = createGlobalStyles`
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

  @media (max-width: 320px) {
    html {
      font-size: 14px;
    }
  }

  body {
    --menu-offset: 60px;

    --color-main: #f2f1c6;
    --color-subtle: grey;
    --color-subtle-text: #73aeb9;
    --color-highlight: #FF6138;
    
    /* --body-background-color: rgb(50,56,91);
    --body-background-color: rgb(44,49,53); */
    --body-background-color: #252627;



    margin: 0;
    color: var(--color-main);
    font-family: 'Saira', Helvetica, Courier, sans-serif;


    background: var(--body-background-color);
    background-size: cover;
    background-position: center;
    position: relative;
  }


  .c-highlight {
    color: var(--color-highlight);
  }

  .c-main {
    color: var(--color-main);
  }

  .c-subtle {
    color: var(--color-subtle);
  }

  .hide {
    display: none !important;
  }

  .invisible {
    visibility: hidden !important;
  }


  .font-bigger1 { font-size: 1.15em; }
  .font-bigger2 { font-size: 1.3em; }
  .font-bigger3 { font-size: 1.45em; }

  .overflow-hidden {
    overflow: hidden;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation: fadeIn .6s;
  }
  .fadeIn2 {
    animation: fadeIn2 .6s;
  }

  a {
    text-decoration: none;
    color: var(--color-highlight);
  }

  /* a:hover {
    color: var(--color-main);
  } */

  .hover-underline {
    display: inline-block;
    position: relative;
  }
  .hover-underline::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    height: 1px;
    width: 0;
    background: currentColor;
    transition: width .5s;
  }
  .hover-underline:hover::after {
    width: 100%;
  }

  .pointer {
    cursor: pointer;
  }

  .border-round {
    border-radius: 50%;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-direction: column
  }

  .flex-align-center {
    align-items: center;
  }

  .flex-justify-center {
    justify-content: center;
  }

  .flex-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .padding-15 {
    padding: 15px;
  }

  .h1-tags,
  .body-tags,
  .div-tags,
  .div-tags-end
  {
    position: relative;
  }

  .content .div-tags-end {
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

  /* COLOR EXPERIMENTS */
  body.modern-theme {
    --color-subtle: #7f838a;
    --color-main: #fdfbeb;
    // --color-highlight: #49eeff;
    --color-highlight: #7fffff;

    --body-background-color: #112d44; 
    
    background: -moz-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: -webkit-linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
    background: linear-gradient(110deg, rgb(18, 3, 41) 0%,var(--body-background-color) 25%,var(--body-background-color) 42%, rgba(10,4,23,1) 100%);
  }


  @media (max-width: 960px) {
    body.modern-theme {
      --body-background-color: #122438; 
      /* fixing white background on home page on mobile after squirrel jump animation */
      background: var(--body-background-color);
    }
  }


  .h1-tags .doodle {
    color: var(--color-subtle);
    opacity: .4;
  }

  h1:focus-visible {
    outline: none;
  }
`
