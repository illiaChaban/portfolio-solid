import {
  children,
  createEffect,
  createSignal,
  JSXElement,
  on,
  Show,
} from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { devId } from '../../directives/dev-id'
import { use } from '../../hooks/use-directives'
import { useRef } from '../../hooks/use-ref'
import { css, styled, useTheme } from '../../theme'
import { Cleanup } from '../../types'
import { pipe } from '../../utils'
import { assertLog } from '../../utils/assert'
import { Cleanups } from '../../utils/cleanups'
import { scope } from '../../utils/lodash'
import { cx, media } from '../../utils/styles'
import { withActions } from '../../utils/with-actions'
import {
  ClipPath,
  framesNum as inkFramesNum,
  InkImage,
  useClipPath,
} from './ink-masks'

export default (p: {
  children: JSXElement
  onFilled: () => void
  debug?: boolean
}): JSXElement => {
  const [transitioned, setTransitioned] = createSignal(false)
  // wrapping in children as a workaround for a bug inside Solid.js
  // https://github.com/solidjs/solid/issues/731
  const resolved = children(() =>
    transitioned() ? (
      p.children
    ) : (
      <Mask
        onFilled={p.onFilled}
        onDone={() => setTransitioned(true)}
        debug={p.debug}
      >
        {p.children}
      </Mask>
    ),
  )
  return resolved
}

const getMaskId = scope(() => {
  let id = 0
  return () => (++id).toString()
})

const Mask = (p: {
  children: JSX.Element
  onDone?: () => void
  onFilled?: () => void
  debug?: boolean
}) => {
  const maskId = getMaskId()

  const theme = useTheme()

  // other refs
  const inkRef = useRef()
  const chldrenContainerRef = useRef()

  // describe animation
  const [animationCount, startAnimation] = scope(() => {
    const [animationCount, setAnimationCount] = createSignal(0)
    return [animationCount, () => setAnimationCount(v => v + 1)]
  })

  // Last additional step represents fully filled screen
  const totalStepsNum = inkFramesNum + 1
  // The first step doesn't count, because it already starts at the first step
  const totalAdditionalSteps = totalStepsNum - 1

  const step$ = withActions(createSignal(0), setStep => {
    const updateRange = (step: number) => (step + totalStepsNum) % totalStepsNum
    const increment = () => setStep(v => pipe(v + 1, updateRange))
    const decrement = () => setStep(v => pipe(v - 1, updateRange))
    const reset = () => setStep(0)
    return { increment, decrement, reset }
  })

  createEffect(
    on(
      animationCount,
      (_, _2, prevCleanups: Cleanups | void): Cleanups | void => {
        if (p.debug && !animationCount()) return

        if (step$() === totalAdditionalSteps) {
          prevCleanups?.execute()
          step$.reset()
          return
        }

        const backgroundInTime = 800
        const backgroundOutTime = 300

        const fadeInPage = (): Cleanup => {
          const textAnimation = chldrenContainerRef.current.animate(
            [{ opacity: 0.2 }, { opacity: 0.8, offset: 0.75 }, { opacity: 1 }],
            {
              duration: backgroundInTime + backgroundOutTime,
              fill: 'forwards',
            },
          )

          return () => textAnimation.cancel()
        }

        const fadeOutInkBackground = (onDone?: () => void): Cleanup => {
          // fade out ink
          const inkAnimation = inkRef.current.animate([{ opacity: 0 }], {
            duration: backgroundOutTime,
            fill: 'forwards',
          })

          inkAnimation.onfinish = () => onDone?.()

          return () => inkAnimation.cancel()
        }

        const animateInk = (onDone: () => void): Cleanup =>
          animateSteps({
            onStep: step$.increment,
            onDone,
            steps: totalAdditionalSteps - step$(),
            time:
              backgroundInTime -
              (backgroundInTime / totalAdditionalSteps) * step$(),
          })

        const cleanups = new Cleanups()
        // cleanups.add(fadeInPage())
        // cleanups.add(
        //   animateInk(() => {
        //     p.onFilled?.()
        //     const cancel = fadeOutInkBackground(p.onDone)
        //     cleanups.add(cancel)
        //   }),
        // )

        return cleanups
      },
    ),
  )

  const { clipppedPath, outerSvg } = useClipPath()

  return (
    <div
      ref={use(
        devId('transition-mask-' + maskId),
        // parentDimensions$.calculate,
      )}
      class={cx(
        css({
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          boxSizing: 'border-box',
          // For mobile view, show the whole thing
          paddingLeft: 'inherit',
          display: 'flex',
          zIndex: theme.zIndex.pageTranstion,
        }),
      )}
    >
      <div
        class={css`
          flex-grow: 1;
          overflow: hidden;
          position: relative;
        `}
      >
        {/* <InkImage ref={inkRef} step={step$()} /> */}

        <div
          ref={chldrenContainerRef}
          class={css`
            width: 100%;
            height: 100%;
            clip-path: url(#${maskId});
            /* Copying styles from #content */
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            /* We want background image & clip take the whole height, 
            but the page itself should account for padding-bottom 
            that comes from the navbar */
            ${media(theme.breakpoints.down('md'))} {
              padding-bottom: ${theme.misc.navOffset};
            }
          `}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id={maskId} clipPathUnits="objectBoundingBox">
                {/* <ClipPath step={step$()} /> */}
                {clipppedPath}
              </clipPath>
            </defs>
          </svg>
          {/* 
          <svg
            class={css`
              width: 100%;
              height: 100%;
              position: absolute;
            `}
            preserveAspectRatio="none"
            viewBox="0 0 1 1"
          >
            <ClipPath
              stroke={theme.colors.primary}
              stroke-width={0.01}
              fill="transparent"
            />
            {outerPath}
          </svg> */}

          {outerSvg}

          {p.children}
        </div>

        {
          <Show when={p.debug}>
            {
              <ControlsContainer>
                <button onClick={() => location.replace('/')}>
                  Navigate Home
                </button>
                <button onClick={startAnimation}>
                  {step$() === totalAdditionalSteps ? 'Reset' : 'Animate'}
                </button>
                <div
                  style={{
                    width: '20px',
                    textAlign: 'center',
                    display: 'inline-block',
                  }}
                >
                  {step$()}
                </div>
                <button onClick={step$.increment}>Increment</button>
                <button onClick={step$.decrement}>Decrement</button>
              </ControlsContainer>
            }
          </Show>
        }
      </div>
    </div>
  )
}

// type ContentRect = {contentWidth: number, paddingLeft: number}
// const useContentWidth = (element: Ref<Element>): Accessor<ContentRect> => {
//   const styles$ = useComputedStyles(element)

//   console.log('hi')

//   return () => {
//     console.log('here')
//     const styles = styles$()
//     // It might need to be updated to be more flexible
//     // if we add elements on the right. Padding left is for the nav,
//     // which has a different placement on diff breakpoints
//     if (!styles) return {contentWidth: 0, paddingLeft: 0};
//     const {paddingLeft} = styles
//     const contentWidth = element.current.clientWidth - parseFloat(paddingLeft)
//     return {contentWidth, paddingLeft: parseFloat(paddingLeft)}
//   }
// }

const ControlsContainer = styled('div')`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 1;
`

const animateSteps = ({
  steps,
  time,
  onDone,
  onStep,
}: {
  steps: number
  time: number
  onDone?: () => void
  onStep: () => void
}): Cleanup => {
  const interval = scope(() => {
    const totalIntervals = steps - 1
    return time / totalIntervals
  })

  const { nextStep, cancel } = scope(() => {
    let currentAnimationId: number
    const nextStep = () => {
      currentAnimationId = requestAnimationFrame(step)
    }
    const cancel = () =>
      currentAnimationId && cancelAnimationFrame(currentAnimationId)
    return { nextStep, cancel }
  })

  let startTimestamp: number
  let stepsLeft = steps

  function step(timestamp: number) {
    const intervalElapsed = scope(() => {
      const currentStepIdx = steps - stepsLeft
      if (!startTimestamp) {
        assertLog(currentStepIdx === 0)
        startTimestamp = timestamp
        return true
      }
      const diff = timestamp - startTimestamp
      return diff > interval * currentStepIdx
    })

    if (intervalElapsed) {
      stepsLeft--
      onStep()
      !stepsLeft && onDone?.()
    }

    stepsLeft && nextStep()
  }

  nextStep()

  return cancel
}
