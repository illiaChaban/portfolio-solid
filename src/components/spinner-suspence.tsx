import { JSX, Suspense } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { css } from '../theme'
import { bindEvent } from '../utils'
import { BlobSpinner } from './blob-spinner'

export const SpinnerSuspence = (p: { children?: JSX.Element }) => {
  const spinnerId = 'spinner'
  const isSpinner = (el: Element) => el.getAttribute('data-id') === spinnerId

  const hideCss = css`
    opacity: 0 !important;
  `
  const transitionCss = css`
    transition: opacity 200ms;
  `

  return (
    <Transition
      onBeforeEnter={el => {
        el.classList.add(hideCss, transitionCss)
      }}
      onEnter={(el, done) => {
        el.classList.remove(hideCss)
        const cleanup = bindEvent(el, 'transitionend', () => {
          done()
          el.classList.remove(transitionCss)
          cleanup()
        })
      }}
      onExit={(el, done) => {
        el.animate(
          { opacity: 0 },
          {
            duration: isSpinner(el) ? 400 : 200,
          },
        ).finished.then(done)
      }}
    >
      <Suspense fallback={<BlobSpinner data-id={spinnerId} />}>
        {p.children}
      </Suspense>
    </Transition>
  )
}
