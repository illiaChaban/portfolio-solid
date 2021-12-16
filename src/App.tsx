import { Component } from "solid-js";
import { Router, Routes, Route, useLocation } from "solid-app-router";
import Home from './pages/home'
import About from './pages/about'
import Skills from './pages/skills'
import Projects from './pages/projects'
import Contact from './pages/contact'
import NotFound from "./pages/not-found";

import { ThemeProvider } from "./theme/theme";
import { NavIcon } from "./components/nav/nav-icon";
import { makeStyles } from "./utils/styles/make-styles";
import { breakpoints } from "./utils/styles/breakpoints";
import { isProduction } from "./constants/env";
import { GTag } from "./components/g-tag";
import { Particles } from "./components/particles";
import { PageTransition } from './components/page-transition'

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

      '&:after': {

      }, 
    }
  },
  content: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingLeft: 'var(--menu-offset)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingBottom: 'var(--menu-offset)',
    }
  }
})

const App: Component = () => {
  return (
    <div>
      <Particles />
      <main>

          <div 
            class={styles.menu}
          >
            <nav 
              class={styles.nav}
            >
              {/* TODO: navbar */}
              {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
              <NavIcon.Home/>
              <NavIcon.About/>
              <NavIcon.Skills/>
              <NavIcon.Projects/>
              <NavIcon.Contact/>
            </nav>
          </div>


          <div 
            // id="content" 
            className={styles.content}
          >
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/skills" element={<Skills/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/*all" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </div>

      </main>

    </div>
  );
};

export default () => (
  <ThemeProvider>
    {isProduction && <GTag/>}
    <Router>
      {/* <PageTransitionProvider> */}
        <App />
      {/* </PageTransitionProvider> */}
    </Router>
  </ThemeProvider>
);
