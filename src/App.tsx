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
import { Navbar } from "./components/nav/navbar";

const styles = makeStyles({
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

        <Navbar />

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
      <App />
    </Router>
  </ThemeProvider>
);
