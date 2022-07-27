import { createContext, Show } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { useBreakpoint } from '../../theme'
import { FadeInTransition } from './fade-transition'
import { MaskTransitionContainer } from './mask-transition-container'

export const PageTransitionContext = createContext({
  maskTransitionEnabled$: (): boolean => false,
})

export const PageTransition = (p: { children: JSX.Element }) => {
  // const isBig$ = useBreakpoint('sm')
  const isBig$ = () => true

  // Mask transition doesn't look good on smaller size devices
  // due to both dimensions of the ink mask and low performance
  // TODO: test on tablet
  return (
    <PageTransitionContext.Provider value={{ maskTransitionEnabled$: isBig$ }}>
      <Show
        when={isBig$()}
        fallback={<FadeInTransition>{p.children}</FadeInTransition>}
      >
        <MaskTransitionContainer>{p.children}</MaskTransitionContainer>
      </Show>
    </PageTransitionContext.Provider>
  )
}
