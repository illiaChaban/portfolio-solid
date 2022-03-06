import { JSX, Suspense } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { flow } from '../utils'
import { BlobSpinner } from './blob-spinner'

export const SpinnerSuspence = (p: { children?: JSX.Element }) => {
  const getElOpacity = flow(getComputedStyle, ({ opacity }) =>
    Number(opacity || '1'),
  )

  const spinnerId = 'spinner'
  const isSpinner = (el: Element) => el.getAttribute('data-id') === spinnerId

  return (
    <Transition
      onEnter={(el, done) => {
        el.animate([{ opacity: 0 }, { opacity: getElOpacity(el) }], {
          duration: 200,
        }).finished.then(done)
      }}
      onExit={(el, done) => {
        el.animate([{ opacity: getElOpacity(el) }, { opacity: 0 }], {
          duration: isSpinner(el) ? 400 : 200,
        }).finished.then(done)
      }}
    >
      <Suspense fallback={<BlobSpinner data-id={spinnerId} />}>
        {p.children}
      </Suspense>
    </Transition>
  )
}
