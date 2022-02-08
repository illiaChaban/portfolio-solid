import { Component } from 'solid-js'
import {
  Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'solid-app-router'
import Home from './pages/home'
import About from './pages/about'
import Skills from './pages/skills'
import Projects from './pages/projects'
import Contact from './pages/contact'
import NotFound from './pages/not-found'

import { ThemeProvider } from './theme/theme'
import { NavIcon } from './components/nav/nav-icon'
import { isProduction } from './constants/env'
import { GTag } from './components/g-tag'
import { Particles } from './components/particles'
import { PageTransition } from './components/page-transition'
import { Navbar } from './components/nav/navbar'
import { css, makeStyles } from './theme'
import { media } from './utils/styles'
import { withProviders } from './hocs'

const useStyles = makeStyles()({
  content: ({ breakpoints, misc }) =>
    css({
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      position: 'relative',
      paddingLeft: misc.navOffset,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',

      [media(breakpoints.down('md'))]: {
        paddingLeft: 0,
        paddingBottom: misc.navOffset,
      },
    }),
})

export const App: Component = withProviders(
  ThemeProvider,
  isProduction && GTag,
  Router,
)(() => {
  const styles = useStyles()
  return (
    <div>
      <Particles />
      <main>
        <Navbar />

        <div class={styles.content()}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*all" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </div>
      </main>
    </div>
  )
})
