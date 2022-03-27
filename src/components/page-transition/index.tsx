import { lazy, Suspense } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { Transition } from 'solid-transition-group'
import { useBreakpoint } from '../../theme'
import { Load } from '../../utils'
import InkImg from './assets/ink.png'

export const PageTransition = (p: { children: JSX.Element }) => {
  const isBig$ = useBreakpoint('sm')

  // Mask transition doesn't look good on smaller size devices
  // due to both dimensions of the ink mask and low performance
  // TODO: test on tablet
  return (
    <>
      {isBig$() ? (
        <MaskTransitionAsync>{p.children}</MaskTransitionAsync>
      ) : (
        // TODO:
        <FadeInTransition>{p.children}</FadeInTransition>
      )}
    </>
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
