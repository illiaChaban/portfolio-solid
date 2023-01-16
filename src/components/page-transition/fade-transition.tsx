import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { css, keyframes } from '../../theme'

const time = 250

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
      // onEnter={(el, done) => {
      //   // Animating fade in on enter results in weird white background
      //   setTimeout(done, time)
      //   el.animate(
      //     { opacity: [0, 1] },
      //     {
      //       duration: time,
      //       easing: 'ease-out',
      //       // fill: 'forwards',
      //     },
      //   ).finished.then(done)
      // }}
      onExit={(el, done) => {
        window.scroll(0, 0)
        done()
        // el.animate(
        //   { opacity: ['1', '0'] },
        //   {
        //     duration: time,
        //     easing: 'ease-out',
        //     fill: 'forwards',
        //   },
        // ).finished.then(done)
      }}
      appear
    >
      {p.children}
    </Transition>
  )
}
