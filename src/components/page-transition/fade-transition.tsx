import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { css, keyframes } from '../../theme'

export const FadeInTransition = (p: { children: JSX.Element }) => {
  return (
    <Transition
      onBeforeEnter={el => {
        el.classList.add(
          css`
            opacity: 1;
            animation: ${keyframes`
              from {
                opacity: 0;
              }
            `} 250ms ease-out;
          `,
        )
      }}
      onExit={(el, done) => {
        window.scroll(0, 0)
        done()
      }}
      appear
    >
      {p.children}
    </Transition>
  )
}
