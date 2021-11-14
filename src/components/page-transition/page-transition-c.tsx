import { Accessor, createEffect, createMemo, createRoot, createSignal, from, observable, on, onCleanup, onMount, Setter, untrack } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { css, keyframes, styled } from "solid-styled-components";
import { Transition } from "solid-transition-group";
import { log } from "../../utils/log";
import { breakpoints, cx } from "../../utils/styles";
import { Ref, useRef } from "../../utils/use-ref";
import { bindEventAndCleanup } from "../../utils/events";
import { pipe, pipeWith } from "pipe-ts";
import { useNavigate } from "solid-app-router";
// import {MaskSvg} from '../contexts/page-transition/ink-mask'
import {MaskSvg} from '../../contexts/page-transition/mask-2'
import {InkImage, ClipPath, framesNum} from './ink'
import { call } from "../../utils/lodash";
import { Cleanup, Unsubscribe } from "../../types";
import { Cleanups } from "../../utils/cleanups";


type State = 'entering' | 'exiting' | 'stale'
export const PageTransitionC = (p: {children: JSX.Element}) => {
  const [state, setState] = createSignal<State>('stale')

  // const [animateCount, animate] = invoke(() => {
  //   const [count, setCount] = createSignal<number>(0)
  //   return [count, () => setCount(count => count + 1)]
  // })

  // createLogValues({animateCount})
  // const [onTransitionIn, setOntransitionIn] = createSignal(() => {})



  // console.log(<div></div>)
  // createLogValues({c: p.children})
  
  return (
    <>
      <Transition
        onEnter={(el, done) => {
          const parent = el.parentElement!

          const {dispose, maskedEl} = createRoot(dispose => {
            const maskedEl = <Mask afterTransition={afterTransition}>{el}</Mask>
            parent.appendChild(maskedEl as Element)
            return {dispose, maskedEl}
          }) 

          function afterTransition() {
            parent.replaceChild(el, maskedEl as Element)
            dispose()
            done()
          }
        }}
        onExit={(el, done) => {
          // time to animate ink
          setTimeout(done, 1000)
        }}
      >
        {/* <Mask> */}
          {p.children}
        {/* </Mask> */}
      </Transition>
    </>
  )
}


const Mask = (p: {children: JSX.Element, afterTransition?: () => void}) => {

  // get parent dimensions
  const containerRef = useRef()
  const parentRef = useParentRefSignal(containerRef)
  const parentDimensions = useContentWidth(parentRef)

  // other refs
  const inkRef = useRef()
  const chldrenContainerRef = useRef()

  // describe animation
  const [animationCount, startAnimation] = call(() => {
    const [animationCount, setAnimationCount] = createSignal(0)
    return [animationCount, () => setAnimationCount(v => v+1)]
  })

  const totalSteps = framesNum + 1
  const lastStep = totalSteps - 1

  const [step, setStep] = createSignal(0)
  const updateRange = (step: number) => (step + totalSteps) % (totalSteps)
  const incrementStep = () => setStep(v => pipeWith(v+1, updateRange))
  const decrementStep = () => setStep(v => pipeWith(v-1, updateRange))


  createEffect(on(animationCount, (_, _2, prevCleanups: Cleanups | void): Cleanups | void => {
    // if (!animationCount()) return;

    if (step() === lastStep) {
      prevCleanups?.execute()
      setStep(0)
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

    const animateInk = (onDone: () => void): Cleanup => {
  
      const interval = call(() => {
        const time = 1000
        return time / totalSteps
      }) 

      const id = setInterval(() => {
        if (lastStep === step()) {
          onDone()
          stop()
          return
        }
        incrementStep()
      }, interval)
  
      function stop() {
        clearInterval(id)
      }

      return stop
    }


    const cleanups = new Cleanups()
    cleanups.add(fadeInText()) 
    cleanups.add(
      animateInk(() => {
        cleanups.add(fadeOutInk()) 
        
        setTimeout(() => p.afterTransition?.(), 300)
      })
    )

    return cleanups

  }))


  return (
    <div test-id="transition-mask"
      ref={containerRef}
      className={cx(
        css({
          position: 'fixed',
          top: 0,
          right: 0,
          width: parentDimensions().contentWidth + 'px',
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
        step={step()} 
      />

      <div 
        ref={chldrenContainerRef}
        className={css`
          width: 100%;
          height: 100%;
          clip-path: url(#clip);
          /* Copying styles from #content */
          display: flex;
          flex-direction: column;
        `}
      >
        {p.children}
      </div>

        <ControlsContainer>
          <button onClick={() => location.replace('/')}>Navigate Home</button>
          <button onClick={startAnimation}>{step() === lastStep ? 'Reset' : 'Animate'}</button>
          <div style={{width: '20px', textAlign: 'center', display: 'inline-block'}}>{step()}</div>
          <button onClick={incrementStep}>Increment</button>
          <button onClick={decrementStep}>Decrement</button>
        </ControlsContainer>

        <svg width="0" height="0">
          <defs>
            <clipPath id="clip" clipPathUnits="objectBoundingBox">
              <ClipPath step={step()} />
            </clipPath>
          </defs>
        </svg>
    </div>
  )
}

type ContentRect = {contentWidth: number, paddingLeft: number}
const useContentWidth = (element: Accessor<Element | undefined | null>): Accessor<ContentRect> => {

  const computeContentDimensions = (el: Element | undefined | null): ContentRect => {
    // It might need to be updated to be more flexible if we add elements on the right
    // Padding left is for the nav, which has a different placement on diff breakpoints
    if (!el) return {contentWidth: 0, paddingLeft: 0};
    const {paddingLeft} = getComputedStyle(el)
    const contentWidth = el.clientWidth - parseFloat(paddingLeft)
    return {contentWidth, paddingLeft: parseFloat(paddingLeft)}
  }

  const [dimensions, setDimensions] = createSignal<ContentRect>(computeContentDimensions(element()))
  const updateDimensions = () => pipeWith(element(), computeContentDimensions, setDimensions)

  bindEventAndCleanup(window, 'resize', updateDimensions)
  createEffect(on(element, updateDimensions))

  return dimensions
}

const useParentRefSignal = (childRef: Ref<Element>): Accessor<Element | undefined> => {
  const [parentRef, setParentRef] = createSignal<Element>()
  onMount(() => setParentRef(childRef.current.parentElement ?? undefined))
  return parentRef
}

const ControlsContainer = styled('div')`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 1;
`

const max = (max: number) => (v: number) => Math.min(max, v)
const min = (min: number) => (v: number) => Math.max(min, v)
const range = (minNum: number, maxNum: number) => pipe(min(minNum), max(maxNum))
      