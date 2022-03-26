import { createEffect, createSignal, on, onMount, Show } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { devId } from '../../directives/dev-id'
import { use } from '../../hooks/use-directives'
import { useRef } from '../../hooks/use-ref'
import { css, keyframes, styled, useTheme } from '../../theme'
import { Cleanup } from '../../types'
import { pipe } from '../../utils'
import { assertLog } from '../../utils/assert'
import { Cleanups } from '../../utils/cleanups'
import { minMax, scope } from '../../utils/lodash'
import { cx, media } from '../../utils/styles'
import { withActions } from '../../utils/with-actions'
import { ClipPath, framesNum as inkFramesNum, InkImage } from './ink-masks'
import { TransitionContainer } from './transition-container'
import InkImgMask from './assets/ink-page-mask.png'
import InkImg from './assets/ink.png'
import anime from 'animejs'

const fillInTime = 1200

export const PageTransition = (p: { children: JSX.Element }) => {
  // FIXME: page scrolling up on transition start
  // FIXME: delay text scramble animation and others to wait for transition
  // FIXME: preload ink images & svg ? component?. With disabled cache the
  // first page transition doesn't work. Use simple fade in/out until preloaded

  // TODO:
  // ! Allow scroll and navigation before background fades in
  // Refactor?
  // Mobile rotate images + clip?
  // Lazy load this transition due to clips and image size
  // Try to reduce image size
  // Use simple transition as a backup
  // Show a banner "advanced transition loaded/loading" when it's ready
  // + "try to navigate to a different page"

  // TODO/FIXME: try to use page owner in transition and see if it would
  // fix effects bug, where it's disposed too quickly before the page is
  // is actually animated off the screen (because Router disposed of it)
  return (
    <>
      <TransitionContainer>{p.children}</TransitionContainer>
    </>
  )
}

export const Mask = (p: {
  children: JSX.Element
  onDone?: () => void
  onFilled?: () => void
  debug?: boolean
}) => {
  const theme = useTheme()

  // get parent dimensions
  // const parentDimensions$ = call(() => {
  //   const containerRef = useRef()
  //   const parentRef = useRef()
  //   onMount(() => {
  //     const parent = containerRef.current.parentElement
  //     assertLog(parent, "Parent not found")
  //     parentRef.current = parent
  //   })
  //   const parentDimensions$ = useContentWidth(parentRef)
  //   return Object.assign(
  //     parentDimensions$,
  //     {calculate: (currEl: Element) => {
  //       containerRef.current = currEl
  //     }}
  //   )
  // })

  // other refs
  const inkRef = useRef()
  const chldrenContainerRef = useRef()

  // describe animation
  // const [animationCount, startAnimation] = scope(() => {
  //   const [animationCount, setAnimationCount] = createSignal(0)
  //   return [animationCount, () => setAnimationCount(v => v + 1)]
  // })

  // Last additional step represents fully filled screen
  // const totalStepsNum = inkFramesNum + 1
  // The first step doesn't count, because it already starts at the first step
  // const totalAdditionalSteps = totalStepsNum - 1

  // const step$ = withActions(createSignal(0), setStep => {
  //   const updateRange = (step: number) => (step + totalStepsNum) % totalStepsNum
  //   const increment = () => setStep(v => pipe(v + 1, updateRange))
  //   const decrement = () => setStep(v => pipe(v - 1, updateRange))
  //   const reset = () => setStep(0)
  //   return { increment, decrement, reset }
  // })

  // createEffect(
  //   on(
  //     animationCount,
  //     (_, _2, prevCleanups: Cleanups | void): Cleanups | void => {
  //       if (p.debug && !animationCount()) return

  //       if (step$() === totalAdditionalSteps) {
  //         prevCleanups?.execute()
  //         step$.reset()
  //         return
  //       }

  //       const backgroundOutTime = 300

  //       const fadeInPage = (): Cleanup => {
  //         const textAnimation = chldrenContainerRef.current.animate(
  //           [{ opacity: 0.2 }, { opacity: 0.8, offset: 0.75 }, { opacity: 1 }],
  //           {
  //             duration: fillInTime + backgroundOutTime,
  //             fill: 'forwards',
  //           },
  //         )

  //         return () => textAnimation.cancel()
  //       }

  //       // const fadeOutInkBackground = (onDone?: () => void): Cleanup => {
  //       //   // fade out ink
  //       //   const inkAnimation = inkRef.current.animate([{ opacity: 0 }], {
  //       //     duration: backgroundOutTime,
  //       //     fill: 'forwards',
  //       //   })

  //       //   inkAnimation.onfinish = () => onDone?.()

  //       //   return () => inkAnimation.cancel()
  //       // }

  //       // const animateInk = (onDone: () => void): Cleanup => {
  //       // const time =
  //       //   backgroundInTime -
  //       //   (backgroundInTime / totalAdditionalSteps) * step$()

  //       // chldrenContainerRef.current
  //       //   .animate([{ 'mask-position': '0%' }, { 'mask-position': '100%' }], {
  //       //     duration: time,
  //       //     // iterationComposite: 'replace',
  //       //     easing: 'steps(24)',
  //       //   })
  //       //   .finished.then(a => {
  //       //     console.log('finished')
  //       //     a.commitStyles()
  //       //   })

  //       //   return animateSteps({
  //       //     onStep: step$.increment,
  //       //     onDone,
  //       //     steps: totalAdditionalSteps - step$(),
  //       //     // time,
  //       //     time: fillInTime,
  //       //   })
  //       // }

  //       const cleanups = new Cleanups()
  //       cleanups.add(fadeInPage())
  //       // cleanups.add(() => clearTimeout())
  //       setTimeout(() => p.onFilled?.(), fillInTime - 100)
  //       setTimeout(() => p.onDone?.(), fillInTime - 100)
  //       // cleanups.add(
  //       //   animateInk(() => {
  //       //     p.onFilled?.()
  //       //     // const cancel = fadeOutInkBackground(p.onDone)
  //       //     // cleanups.add(cancel)
  //       //   }),
  //       // )

  //       return cleanups
  //     },
  //   ),
  // )

  onMount(() => {
    const backgroundOutTime = 300

    const fadeInPage = (): Cleanup => {
      const textAnimation = chldrenContainerRef.current.animate(
        [{ opacity: 0.2 }, { opacity: 0.8, offset: 0.75 }, { opacity: 1 }],
        {
          duration: fillInTime + backgroundOutTime,
          fill: 'forwards',
        },
      )

      return () => textAnimation.cancel()
    }

    // inkRef.current.animate(
    //   [
    //     { transform: 'translateX(0%)' },
    //     { transform: 'translateX(-100%)', offset: 0.96 },
    //     { background: '#0c1126' },
    //   ],
    //   { duration: fillInTime, easing: 'steps(25)', fill: 'forwards' },
    // )

    // anime({
    //   targets: inkRef.current,
    //   keyframes: [
    //     // { transform: 'translateX(0%)' },
    //     // { transform: 'translateX(-100%)', offset: 0.96 },
    //     // { background: '#0c1126' },
    //     // { translateX: '0%' },
    //     // { traslateX: '100%' },

    //     { transform: 'translateX(0%)' },
    //     { transform: 'translateX(-100%)' },
    //     // { background: '#0c1126' },
    //   ],
    //   duration: fillInTime,
    //   easing: 'steps(25)',
    //   // fill
    // }).finished.then(() => console.log('done animating'))

    // anime({
    //   targets: inkRef.current,
    //   // transform: ['translateX(0%)', 'translateX(-100%)'],
    //   translateX: ['0%', '-100%'],
    //   duration: fillInTime,
    //   easing: 'steps(25)',
    //   // fill
    // })

    // anime({
    //   targets: chldrenContainerRef.current,
    //   // transform: ['translateX(0%)', 'translateX(-100%)'],
    //   '-webkit-mask-position': ['0% 0', '100% 0'],
    //   // 'mask-position': ['0% 0', '100% 0'],
    //   duration: fillInTime,
    //   easing: 'steps(24)',
    //   // fill
    // })

    // anime({
    //   targets: chldrenContainerRef.current,
    //   // transform: ['translateX(0%)', 'translateX(-100%)'],
    //   translateX: ['0%', '-100%'],

    //   // 'mask-position': ['0% 0', '100% 0'],
    //   duration: fillInTime,
    //   easing: 'steps(24)',
    //   // fill
    // })

    const cleanups = new Cleanups()
    cleanups.add(fadeInPage())
    // cleanups.add(() => clearTimeout())
    setTimeout(() => p.onFilled?.(), fillInTime - 550)
    setTimeout(() => p.onDone?.(), fillInTime - 550)
  })

  return (
    <div
      ref={use(
        devId('transition-mask'),
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
          ref={inkRef}
          class={css`
            position: absolute;
            left: 0;
            height: 100%;
            width: ${25 * 100}%;
            background: url(${InkImg}) no-repeat 0 0;
            background-size: 100% 100%;
            /* animation: ${keyframes`
              0% {
                transform: translateX(0%);
              }
              96% {
                transform: translateX(-100%);
              }
              100% {
                background: #0c1126;
              }
            `} ${fillInTime}ms steps(25) forwards; */
          `}
        />

        <div
          ref={chldrenContainerRef}
          class={css`
            width: 2500vw;
            height: 100%;
            -webkit-mask-image: url(${InkImgMask});
            mask-image: url(${InkImgMask});
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;

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
          // style={`-webkit-mask-position: ${minMax(0, 100)(position$())}% 0;`}
        >
          <div
            class={css`
              width: 100vw;
              min-height: 100%;
            `}
          >
            {p.children}
          </div>
        </div>

        {/* <Show when={p.debug}>
          <ControlsContainer>
            <button onClick={() => location.replace('/')}>Navigate Home</button>
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
        </Show> */}
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
