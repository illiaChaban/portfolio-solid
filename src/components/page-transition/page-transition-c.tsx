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
import {InkImage} from './image'
import {Path2, Path3, Path4, Path5, Path6, Path7, Path8, Path9, Path10, Path11,
  Path12, Path13, Path14, Path15, Path16, Path17, Path18, Path19, Path20, Path21, Path22, Path23, Path24
} from '../../contexts/page-transition/clips-svg_/clips'

const framesNum = 25

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
  const incrementStep = () => setStep(v => (v + 1) % (framesNum - 1))


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
    const time = 1000
    const interval = time / framesNum
    const currentStep = step() + 1
    let stepsLeft = framesNum - currentStep

    const id = setInterval(() => {
      if (!stepsLeft) {
        cancel()
        return
      }
      stepsLeft--
      incrementStep()

    }, interval)
    // setClipPath(0)
    // // TODO: Update with request animation frame or css animation
    // const id = setInterval(() => {
    //   let val = clipPath() + 1
    //   if (val >= 100) {
    //     // reset
    //     // setClipPath(0)
    //     cancel()
    //     p.afterTransition?.()
    //     return
    //   }
    //   setClipPath(val)
    // }, 5)

    function cancel() {
      clearInterval(id)
    }

    onCleanup(cancel)

    return cancel
  }

  // onCleanup(animate())

  // const firstPolygon = createMemo(on(clipPath, () => {
  //   return `0% 100%, 40% 100%, 36% 83%, 26% 76%, 13% 71%, 0% 70%`
  //   // return `0% 100%, 40% ${clipPath()}%, 36% 83%, 26% 76%, 13% 71%, 0% ${Math.max(clipPath(), 70)}%`

  // }))

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
        // css({
        //   // clipPath: `url(${MaskImg})`,
        //   // maskType: 'luminance',
        //   // clipPath: `circle(${clipPath()}% at ${
        //   //   parentDimensions().paddingLeft + parentDimensions().contentWidth / 2
        //   // }px 50%) circle`,
        //   // clipPath: `polygon(0 0, 64% 1%, ${clipPath()}% ${100 - clipPath()}%, 100% 100%, 0 100%, 0 67%)`,
        //   clipPath: 'url(#clip)'
        //   // clipPath: `polygon(${firstPolygon()}, 0% 35%, 15% 30%, 25% 24%, 33% 11%, 34% 0%, 1% 1%, 100% 0%, 62% 0%, 63% 19%, 75% 23%, 91% 24%, 100% 25%, 99% 50%, 67% 51%, 64% 39%, 53% 32%, 39% 35%, 33% 53%, 44% 66%, 57% 66%, 67% 51%, 99% 50%, 100% 99%, 90% 89%, 72% 85%, 57% 94%, 57% 100%, 100% 100%, 100% 0%, 0% 0%);`
        // })
      )}
    >
      <InkImage step={step()} />

      <div 
        className={cx(
          css`
            width: 100%;
            height: 100%;
          `, 
          css({clipPath: 'url(#clip)'})
        )}
        style={{opacity: .5 / framesNum * step()}}
      >
        {p.children}
      </div>



        <ControlsContainer>
          <button onClick={() => location.replace('/')}>Navigate Home</button>
          <button onClick={animate}>Animate</button>
          <div style={{width: '20px', textAlign: 'center', display: 'inline-block'}}>{step()}</div>
          <button onClick={incrementStep}>Increment</button>
          <button onClick={() => setStep(v => (v - 1))}>Decrement</button>
        </ControlsContainer>

        {/* <MaskSvg clipId="clip" /> */}

        <svg width="0" height="0">
          <defs>
            <clipPath id="clip" clipPathUnits="objectBoundingBox">
              {{
                1: <Path2 />,
                2: <Path3 />,
                3: <Path4 />,
                4: <Path5 />,
                5: <Path6 />,
                6: <Path7 />,
                7: <Path8 />,
                8: <Path9 />,
                9: <Path10 />,
                10: <Path11 />,
                11: <Path12 />,
                12: <Path13 />,
                13: <Path14 />,
                14: <Path15 />,
                15: <Path16 />,
                16: <Path17 />,
                17: <Path18 />,
                18: <Path19 />,
                19: <Path20 />,
                20: <Path21 />,
                21: <Path22 />,
                22: <Path23 />,
                23: <Path24 />,
              }[step()]}
              {/* <polygon points="0,1 0.5,0.5 1,1"/>
              <path d="M0,0 l0.5,0.5 v-0.5 z"/> */}
              {/* <Path7 /> */}
              {/* <polygon points="400,50 400,320, 140,300"/>
              <polygon points="450,10 500,200 600,100" />
              <polygon points="150,10 100,200 300,100" /> */}
            </clipPath>
          </defs>
        </svg>
    </div>
// clip-path: polygon(0% 100%, 44% 100%, 43% 75%, 0% 62%, 0% 26%, 22% 24%, 35% 0%, 100% 0%, 100% 42%, 65% 43%, 63% 24%, 38% 26%, 34% 49%, 55% 61%, 65% 43%, 100% 42%, 100% 0, 0 0);
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


// const ResetContainer = styled('div')({
//   position: 'fixed',
//   top: '20px',
//   right: '20px',
//   zIndex: 1000,
//   opacity: 1,
// })

const ControlsContainer = styled('div')`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 1;
`




      {/* <div className={css({
          position: 'absolute',
          // left: '50%',
          // top: '50%',
          // transform: `translateY(-50%) translateX(-18%)`,
          height: '100vh',
          width: '100vw',
          // width: `${25 * 100}%`,
          // background: `url(${InkImg}) no-repeat 0 0`,
          mask: `url(${MaskImg})`,
          backgroundSize: '100% 100%',
          // backgroundBlendMode: 'overlay',
          // backgroundColor: 'white',
          // opacity: 1,
          // mixBlendMode: 'screen'

        })}>

                <div className={css({
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: '100%',
        height: '100%',
        background: 'red',
        // objectFit: 'cover',

      })}>

      </div>
        </div> */}
      {/* <div className={css({
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translateY(-50%) translateX(-18%)`,
        height: '100%',
        width: `${25 * 100}%`,
        // background: `url(${InkImg}) no-repeat 0 0`,
        backgroundSize: '100% 100%',
        opacity: 1,
        // mixBlendMode: 'screen'
      })}>
        <div className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'red',
        })} />
      </div> */}