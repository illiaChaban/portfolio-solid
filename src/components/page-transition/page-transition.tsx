import { Accessor, createEffect, createMemo, createRoot, createSignal, from, observable, on, onCleanup, onMount, Setter, untrack } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { css, keyframes, styled } from "solid-styled-components";
import { log, warn } from "../../utils/log";
import { breakpoints, cx } from "../../utils/styles";
import { Ref, useRef } from "../../hooks/use-ref";
import { bindEventWithCleanup } from "../../utils/events";
import { pipe, pipeWith } from "pipe-ts";
import {InkImage, ClipPath, framesNum as inkFramesNum} from './ink-masks'
import { call, tap } from "../../utils/lodash";
import { Cleanup, Unsubscribe } from "../../types";
import { Cleanups } from "../../utils/cleanups";
import { TransitionContainer } from './transition-container'
import { withActions } from "../../utils/with-actions";
import { useAtom } from "../../hooks/use-atom";
import { assert, assertLog } from "../../utils/assert";
import { use } from "../../hooks/use-directives";
import { devId } from "../../directives/dev-id";
import { useComputedStyles } from "../../hooks/use-computed-styles";


export const PageTransition = (p: {children: JSX.Element}) => {
  // TODO
  // Lazy load this transition due to clips and image size
  // Try to reduce image size
  // Use simple transition as a backup
  // Show a banner "advanced transition loaded/loading" when it's ready 
  // + "try to navigate to a different page"
  return (
    <TransitionContainer>
      {p.children}
    </TransitionContainer>
  )
}

const getMaskId = call(() => {
  let id = 0
  return () => (++id).toString()
})

export const Mask = (p: {children: JSX.Element, onDone?: () => void, onFilled?: () => void, debug?: boolean}) => {

  const maskId = getMaskId()

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
  const [animationCount, startAnimation] = call(() => {
    const [animationCount, setAnimationCount] = createSignal(0)
    return [animationCount, () => setAnimationCount(v => v+1)]
  })

  // Last additional step represents fully filled screen
  const totalStepsNum = inkFramesNum + 1
  // The first step doesn't count, because it already starts at the first step
  const totalAdditionalSteps = totalStepsNum - 1

  const step$ = withActions(createSignal(0), (setStep) => {
    const updateRange = (step: number) => (step + totalStepsNum) % (totalStepsNum)
    const increment = () => setStep(v => pipeWith(v+1, updateRange))
    const decrement = () => setStep(v => pipeWith(v-1, updateRange))
    const reset = () => setStep(0)
    return {increment, decrement, reset}
  })

  createEffect(on(animationCount, (_, _2, prevCleanups: Cleanups | void): Cleanups | void => {
    if (p.debug && !animationCount()) return;

    if (step$() === totalAdditionalSteps) {
      prevCleanups?.execute()
      step$.reset()
      return;
    }

    const backgroundInTime = 800
    const backgroundOutTime = 300

    const fadeInPage = (): Cleanup => {
      const textAnimation = chldrenContainerRef.current.animate([
        {opacity: 0.2},
        {opacity: 0.8, offset: 0.75},
        {opacity: 1}
      ], {
        duration: backgroundInTime + backgroundOutTime,
        fill: 'forwards'
      })

      return () => textAnimation.cancel()
    }

    const fadeOutInkBackground = (onDone?: () => void): Cleanup => {
      // fade out ink
      const inkAnimation = inkRef.current.animate([
        {opacity: 0},
      ], {
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
        time: backgroundInTime - backgroundInTime / totalAdditionalSteps * step$(), 
      })

    const cleanups = new Cleanups()
    cleanups.add(fadeInPage()) 
    cleanups.add(
      animateInk(() => {
        p.onFilled?.()
        const cancel = fadeOutInkBackground(p.onDone)
        cleanups.add(cancel) 
      })
    )

    return cleanups
  }))


  return (
    <div
      ref={use(
        devId("transition-mask-" + maskId), 
        // parentDimensions$.calculate,
      )}
      className={cx(
        css({
          position: 'fixed',
          top: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          overflow: 'hidden',
          boxSizing: 'border-box',
          // For mobile view, show the whole thing
          paddingLeft: 'inherit',
          display: 'flex',
        }),
      )}
    >
      <div className={css`
        flex-grow: 1;
        overflow: hidden;
        position: relative;
      `}>

        <InkImage 
          ref={inkRef}
          step={step$()} 
        />

        <div 
          ref={chldrenContainerRef}
          className={css`
            width: 100%;
            height: 100%;
            clip-path: url(#${maskId});
            /* Copying styles from #content */
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            /* We want background image & clip take the whole height, 
            but the page itself should account for padding-bottom that comes from the navbar */
            ${breakpoints.down('md')} {
              padding-bottom: var(--menu-offset);
            }
          `}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id={maskId} clipPathUnits="objectBoundingBox">
                <ClipPath step={step$()} />
              </clipPath>
            </defs>
          </svg>

          {p.children}
        </div>

        {p.debug && (
          <ControlsContainer>
            <button onClick={() => location.replace('/')}>Navigate Home</button>
            <button onClick={startAnimation}>{step$() === totalAdditionalSteps ? 'Reset' : 'Animate'}</button>
            <div style={{width: '20px', textAlign: 'center', display: 'inline-block'}}>{step$()}</div>
            <button onClick={step$.increment}>Increment</button>
            <button onClick={step$.decrement}>Decrement</button>
          </ControlsContainer>
        )}
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
//     // It might need to be updated to be more flexible if we add elements on the right
//     // Padding left is for the nav, which has a different placement on diff breakpoints
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



// const max = (max: number) => (v: number) => Math.min(max, v)
// const min = (min: number) => (v: number) => Math.max(min, v)
// const range = (minNum: number, maxNum: number) => pipe(min(minNum), max(maxNum))


const animateSteps = (
  {
    steps, 
    time, 
    onDone,
    onStep,
  } : {steps: number, time: number, onDone?: () => void, onStep: () => void}
): Cleanup => {
  const interval = call(() => {
    const totalIntervals = steps - 1
    return time / totalIntervals
  }) 

  const {nextStep, cancel} = call(() => {
    let currentAnimationId: number
    const nextStep = () => {
      currentAnimationId = requestAnimationFrame(step)
    }
    const cancel = () => currentAnimationId && cancelAnimationFrame(currentAnimationId)
    return {nextStep, cancel}
  })

  let startTimestamp: number
  let stepsLeft = steps

  function step(timestamp: number) {

    const intervalElapsed = call(() => {
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
    };
    
    stepsLeft && nextStep()
  }

  nextStep()

  return cancel
}
      