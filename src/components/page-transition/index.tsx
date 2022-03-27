import { createContext, lazy, Show, Suspense } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { Transition } from 'solid-transition-group'
import { useBreakpoint } from '../../theme'
import { Load } from '../../utils'
import InkImg from './assets/ink.png'

export const PageTransitionContext = createContext({
  maskTransitionEnabled$: (): boolean => false,
})

export const PageTransition = (p: { children: JSX.Element }) => {
  const isBig$ = useBreakpoint('sm')

  // Mask transition doesn't look good on smaller size devices
  // due to both dimensions of the ink mask and low performance
  // TODO: test on tablet
  return (
    <PageTransitionContext.Provider value={{ maskTransitionEnabled$: isBig$ }}>
      {
        <Show
          when={isBig$()}
          fallback={<FadeInTransition>{p.children}</FadeInTransition>}
        >
          {<MaskTransitionAsync>{p.children}</MaskTransitionAsync>}
        </Show>
      }
    </PageTransitionContext.Provider>
  )
}

const FadeInTransition = (p: { children: JSX.Element }) => {
  return (
    <Transition
      onEnter={(el, done) => {
        el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 250,
          easing: 'ease-out',
        }).finished.then(done)
      }}
      onExit={(el, done) => {
        window.scroll(0, 0)
        done()
      }}
    >
      {p.children}
    </Transition>
  )
}

const MaskTransitionAsync = (p: { children: JSX.Element }) => {
  let cachedImage

  const TransitionContainer = lazy(async () => {
    const [Component, image] = await Promise.all([
      import('./transition-container'),
      Load.image(InkImg),
    ])
    // caching ink image, otherwise the first transition might be
    // transparent until the image loads
    cachedImage = image
    return Component
  })
  return (
    <Suspense fallback={<FadeInTransition>{p.children}</FadeInTransition>}>
      <TransitionContainer>{p.children}</TransitionContainer>
    </Suspense>
  )
}
