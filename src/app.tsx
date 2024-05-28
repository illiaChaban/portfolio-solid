import { Route, Router, Routes } from '@solidjs/router'
import { Component } from 'solid-js'
import { GTag } from './components/g-tag'
import { Navbar } from './components/nav/navbar'
import { PageTransition } from './components/page-transition'
import { Particles } from './components/particles'
import { isProduction } from './constants/env'
import { withProviders } from './hocs'
import { useRef } from './hooks'
import About from './pages/about'
import Contact from './pages/contact'
import Home from './pages/home'
import NotFound from './pages/not-found'
import Projects from './pages/projects'
import Skills from './pages/skills'
import { tw } from './utils/tw'

export const App: Component = withProviders(Router)(() => {
  const contentRef = useRef<HTMLElement>()

  return (
    <>
      {isProduction && <GTag />}
      <Particles />
      <main>
        <Navbar />

        <div
          class={tw`
            relative 
            flex flex-col 
            w-full h-full min-h-[100vh] 
            box-border 
            pb-[theme(misc.navOffset)] md:pb-0 md:pl-[theme(misc.navOffset)]
          `}
          ref={contentRef}
        >
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home {...{ contentRef }} />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*all" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </div>
      </main>
    </>
  )
})
