import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'

const time = 250

export const FadeInTransition = (p: { children: JSX.Element }) => {
  return <>{p.children}</>
  // TODO: fixme
  // return (
  //   <Transition
  //     onEnter={(el, done) => {
  //       // Animating fade in on enter results in weird white background
  //       setTimeout(done, time)
  //     }}
  //     onExit={(el, done) => {
  //       window.scroll(0, 0)
  //       el.animate(
  //         { opacity: ['1', '0'] },
  //         {
  //           duration: time,
  //           easing: 'ease-out',
  //           fill: 'forwards',
  //         },
  //       ).finished.then(done)
  //     }}
  //   >
  //     {p.children}
  //   </Transition>
  // )
}
