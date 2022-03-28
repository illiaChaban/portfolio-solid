import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'

export const FadeInTransition = (p: { children: JSX.Element }) => {
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
      appear
    >
      {p.children}
    </Transition>
  )
}
