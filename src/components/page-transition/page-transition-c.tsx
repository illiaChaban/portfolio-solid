import { Accessor, createEffect, createMemo, createRoot, createSignal, on, onCleanup, onMount, Setter, untrack } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { css, styled } from "solid-styled-components";
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
        // onEnter={(el, done) => {
        //   const parent = el.parentElement!

        //   const {dispose, maskedEl} = createRoot(dispose => {
        //     const maskedEl = <Mask afterTransition={afterTransition}>{el}</Mask>
        //     parent.appendChild(maskedEl as Element)
        //     return {dispose, maskedEl}
        //   }) 

        //   function afterTransition() {
        //     // parent.replaceChild(el, maskedEl as Element)
        //     // dispose()
        //     done()
        //   }
        // }}
        // onExit={(el, done) => {
        //   setTimeout(done, 600)
        // }}
      >
        <Mask>
          {p.children}
        </Mask>
      </Transition>
    </>
  )
}


const Mask = (p: {children: JSX.Element, afterTransition?: () => void}) => {
  const [step, setStep] = createSignal(0)

  const totalsteps = framesNum + 10
  const updateRange = (step: number) => (step + totalsteps) % (totalsteps)
  const incrementStep = () => setStep(v => pipeWith(v+1, updateRange))
  const decrementStep = () => setStep(v => pipeWith(v-1, updateRange))


  // console.log('mask constructor')
  // onMount(() => console.log('mount mask'))
  // onCleanup(() => console.log('unmount mask'))



  // const [clipPath, setClipPath] = createSignal<number>(0) 

  const containerRef = useRef()
  const parentRef = useParentRefSignal(containerRef)
  // const [parentWidth, setParentWidth] = createSignal<number>(0)

  const parentDimensions = useContentWidth(parentRef)

  // const navigate = useNavigate()
  
  // const [parentWidth, refParentWidth] = useHoistAccessor<number>(0)
  // log.useAccessors({parentWidth})

  // onMount(() => {
  //   refParentWidth(
  //     useContentWidth(() => containerRef.current.parentElement!), 
  //   )
  // })

  const animate = () => {
    if (step() + 1 === totalsteps) {
      setStep(0)
    }

    const time = 1000
    const interval = time / totalsteps
    const currentStep = step()
    let stepsLeft = totalsteps - currentStep


    const id = setInterval(() => {
      // stop in the end
      if (!(stepsLeft - 1)) {
        cancel()
        return
      }
      stepsLeft--
      incrementStep()

    }, interval)

    function cancel() {
      clearInterval(id)
    }

    return cancel
  }

  const textOpacity = createMemo(() => {
    const val = .5 / framesNum * step() + .2
    pipeWith(5, range(0, 1))
    return 1
  })

  return (
    <div id="transition-mask"
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
      <InkImage step={step()} />

      <div 
        className={css`
          width: 100%;
          height: 100%;
          clip-path: url(#clip);
        `}
        style={{opacity: textOpacity()}}
      >
        {p.children}
      </div>

        <ControlsContainer>
          <button onClick={() => location.replace('/')}>Navigate Home</button>
          <button onClick={animate}>Animate</button>
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
      