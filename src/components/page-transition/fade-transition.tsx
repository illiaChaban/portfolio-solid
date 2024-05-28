import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { tw } from '../../utils/tw'

export const FadeInTransition = (p: { children: JSX.Element }) => {
  return (
    <Transition
      onBeforeEnter={el => {
        el.classList.add(
          ...tw`opacity-100 animate-[fadeIn_250ms_ease-out]`.split(' '),
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
