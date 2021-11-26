import { Accessor, createEffect, createMemo, createRoot, createSignal, from, observable, on, onCleanup, onMount, Setter, untrack } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { css, keyframes, styled } from "solid-styled-components";
import { Transition } from "solid-transition-group";
import { log, warn } from "../../utils/log";
import { breakpoints, cx } from "../../utils/styles";
import { Ref, useRef } from "../../hooks/use-ref";
import { bindEventWithCleanup } from "../../utils/events";
import { pipe, pipeWith } from "pipe-ts";
import {InkImage, ClipPath, framesNum as inkFramesNum} from './ink'
import { call, tap } from "../../utils/lodash";
import { Cleanup, Unsubscribe } from "../../types";
import { Cleanups } from "../../utils/cleanups";
import { TransitionContainer } from './transition-container'
import { withActions } from "../../utils/withActions";
import { useAtom } from "../../hooks/use-atom";
import { assert, assertLog } from "../../utils/assert";


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

export const Mask = (p: {children: JSX.Element, onDone?: () => void, onFilled?: () => void}) => {

  const maskId = getMaskId()

  // get parent dimensions
  const parentDimensions$ = call(() => {
    const containerRef = useRef()
    const parentRef = useRef()
    onMount(() => {
      const parent = containerRef.current.parentElement
      assertLog(parent, "Parent not found")
      parentRef.current = parent
    })
    const parentDimensions$ = useContentWidth(parentRef)
    return Object.assign(
      parentDimensions$, 
      {calculate: (currEl: Element) => {
        containerRef.current = currEl 
      }}
    )
  })

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
    // if (!animationCount()) return;

    if (step$() === totalAdditionalSteps) {
      prevCleanups?.execute()
      step$.reset()
      return;
    }

    const fadeInText = (): Cleanup => {
      const textAnimation = chldrenContainerRef.current.animate([
        {opacity: 0.2},
        {opacity: 0.8, offset: 0.75},
        {opacity: 1}
      ], {
        duration: 1300,
        fill: 'forwards'
      })

      return () => textAnimation.cancel()
    }

    const fadeOutInk = (): Cleanup => {
      // fade out ink
      const inkAnimation = inkRef.current.animate([
        {opacity: 0},
      ], {
        duration: 300,
        fill: 'forwards',
      })

      return () => inkAnimation.cancel()
    }

    const animateInk = (onDone: () => void): Cleanup => 
      animateSteps({
        onStep: step$.increment,
        onDone, 
        steps: totalAdditionalSteps, 
        time: 1000, 
      })

    const cleanups = new Cleanups()
    cleanups.add(fadeInText()) 
    cleanups.add(
      animateInk(() => {
        p.onFilled?.()
        cleanups.add(fadeOutInk()) 
        setTimeout(() => p.onDone?.(), 300)
      })
    )

    return cleanups

  }))


  return (
    <div test-id={"transition-mask" + maskId}
      ref={parentDimensions$.calculate}
      className={cx(
        css({
          position: 'fixed',
          top: 0,
          right: 0,
          width: parentDimensions$().contentWidth + 'px',
          minHeight: '100vh',
          height: '100%',
          overflow: 'hidden',
          // adjust for navbar on desktop
          [breakpoints.up('md')]: {
            marginLeft: 'var(--menu-offset)',
          }
        }),
      )}
    >
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
        `}
      >
        {p.children}
      </div>

        {/* <ControlsContainer>
          <button onClick={() => location.replace('/')}>Navigate Home</button>
          <button onClick={startAnimation}>{step() === lastStep ? 'Reset' : 'Animate'}</button>
          <div style={{width: '20px', textAlign: 'center', display: 'inline-block'}}>{step()}</div>
          <button onClick={incrementStep}>Increment</button>
          <button onClick={decrementStep}>Decrement</button>
        </ControlsContainer> */}

        <svg width="0" height="0">
          <defs>
            <clipPath id={maskId} clipPathUnits="objectBoundingBox">
              <ClipPath step={step$()} />
            </clipPath>
          </defs>
        </svg>
    </div>
  )
}

type ContentRect = {contentWidth: number, paddingLeft: number}
const useContentWidth = (element: Ref<Element>): Accessor<ContentRect> => {

  const computeContentDimensions = (el: Element | undefined | null): ContentRect => {
    // It might need to be updated to be more flexible if we add elements on the right
    // Padding left is for the nav, which has a different placement on diff breakpoints
    if (!el) return {contentWidth: 0, paddingLeft: 0};
    const {paddingLeft} = getComputedStyle(el)
    const contentWidth = el.clientWidth - parseFloat(paddingLeft)
    return {contentWidth, paddingLeft: parseFloat(paddingLeft)}
  }

  const dimensions$ = withActions(
    createSignal<ContentRect>(computeContentDimensions(element.current)),
    (set) => ({update: () => pipeWith(element.current, computeContentDimensions, set)})
  )

  bindEventWithCleanup(window, 'resize', dimensions$.update)
  onMount(dimensions$.update)

  return dimensions$
}

// const ControlsContainer = styled('div')`
//   position: fixed;
//   top: 20px;
//   right: 20px;
//   z-index: 1000;
//   opacity: 1;
// `



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
      