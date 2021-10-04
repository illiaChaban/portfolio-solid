import { Component } from "solid-js";
import { Router, Routes, Route, NavLink } from "solid-app-router";
import Home from './pages/home'
import About from './pages/about'
import Skills from './pages/skills'
import Projects from './pages/projects'
import Contact from './pages/contact'

import {Button} from './components/button'
import { ThemeProvider } from "./theme/theme";
import { NavIcon } from "./components/nav-icon";
import { css } from "solid-styled-components";
import { makeStyles } from "./utils/styles/make-styles";
import { breakpoints } from "./utils/styles/breakpoints";


const styles = makeStyles({
  menu: {
    background: '#181818', /* #2f2f2f */
    color: 'var(--color-subtle)',
    width: 'var(--menu-offset)',
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 3,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.modern-theme &': {
      background: 'rgba(0,0,0,.4)',
      borderRight: '1px solid var(--color-subtle)',
    },

    [breakpoints.down('md')]: {
      width: '100%',
      height: 'var(--menu-offset)',
      minHeight: 0,
      bottom: 0,
      top: 'auto',

      '.modern-theme &': {
        background: 'rgba(0,0,0,.8)',
        borderRight: 'none',
        borderTop: '1px solid var(--color-subtle)',
      }
    }
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

    textAlign: 'center',
    height: '210px',
    width: '100%',

    [breakpoints.down('md')]: {
      flexDirection: 'row',
      minWidth: '250px',
      width: '42%',
      overflow: 'hidden',
      textAlign: 'center',
      height: '60px',
    }
  }
 

  // #nav {

  // }

  // #content {
  //   box-sizing: border-box;
  //   width: 100%;
  //   height: 100%;
  //   position: relative;
  //   padding-left: var(--menu-offset);

  //   min-height: 100vh;

  //   display: flex;
  //   flex-direction: column;
  // }

  // @media (max-width: 960px) {


  //   #content
  //   {
  //     padding-left: 0;
  //     padding-bottom: var(--menu-offset);
  //   }

  // }

})

const App: Component = () => {


  {/* <Particles /> */}
  return (
    <main>
      <Router>

        <div id='menu' class={styles.menu}>
          <nav id='nav' class={styles.nav}>
            <NavIcon.Home/>
            <NavIcon.About/>
            <NavIcon.Skills/>
            <NavIcon.Projects/>
            <NavIcon.Contact/>
          </nav>
        </div>

        <div id="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/skills" element={<Skills/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </div>

      </Router>
    </main>


  );
};
{/* <div class={styles.App}>
      <h1>App</h1>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div> */}

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
