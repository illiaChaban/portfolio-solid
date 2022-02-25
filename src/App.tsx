import { Route, Router, Routes } from 'solid-app-router'
import { Component } from 'solid-js'
import { GTag } from './components/g-tag'
import { Navbar } from './components/nav/navbar'
import { PageTransition } from './components/page-transition'
import { Particles } from './components/particles'
import { isProduction } from './constants/env'
import { withProviders } from './hocs'
import About from './pages/about'
import Contact from './pages/contact'
import Home from './pages/home'
import NotFound from './pages/not-found'
import Projects from './pages/projects'
import Skills from './pages/skills'
import { css, makeStyles } from './theme'
import { ThemeProvider } from './theme/theme'
import { media } from './utils/styles'

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
