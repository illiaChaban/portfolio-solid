import { pipeWith } from "pipe-ts"
import { css, styled } from "solid-styled-components"
import { devId } from "../../directives/dev-id"
import { useAtom } from "../../hooks/use-atom"
import { use } from "../../hooks/use-directives"
import { assert } from "../../utils/assert"
import { call, extractFloat, mapValues, range } from "../../utils/lodash"
import { log } from "../../utils/log"
import { breakpoints, cx, makeStyles } from "../../utils/styles"
import { Curve, curveToString, getCircleCurveMultiplier, mirrorCurve, oneLine, square, toRadians } from "./path-utils"
import { NavIcon } from "./nav-icon"
import { useMediaQuery } from "../../hooks/use-media-query"
import { useRef } from "../../hooks/use-ref"
import { useComputedStyles } from "../../hooks/use-computed-styles"
import { Accessor, batch, createComputed, createMemo, on, Setter } from "solid-js"
import { animateSteps } from "../page-transition/page-transition"

const MenuContainer = styled('div')({
  // background: '#181818', /* #2f2f2f */
  color: 'var(--color-subtle)',
  // color: 'black',
  width: 'var(--menu-offset)',
  height: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 3,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // borderRight: '1px solid var(--color-subtle)',

  [breakpoints.down('md')]: {
    width: '100%',
    height: 'var(--menu-offset)',
    minHeight: 0,
    bottom: 0,
    top: 'auto',

    borderRight: 'none',
    // borderTop: '1px solid var(--color-subtle)',
  }
})

const NavContainer = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',

  textAlign: 'center',
  height: '210px',
  width: '100%',

  [breakpoints.down('md')]: {
    flexDirection: 'row',
    minWidth: '250px',
    width: '42%',
    overflow: 'hidden',
    textAlign: 'center',
    height: '60px',

    '&:after': {

    }, 
  }
})

const NavContainerNew = styled('nav')`
  height: 50px;
  position: relative;
` 
// const styles = makeStyles({
//   nav: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',

//     textAlign: 'center',
//     height: '210px',
//     width: '100%',

//     [breakpoints.down('md')]: {
//       flexDirection: 'row',
//       minWidth: '250px',
//       width: '42%',
//       overflow: 'hidden',
//       textAlign: 'center',
//       height: '60px',

//       '&:after': {

//       }, 
//     }
//   },
// })

export const Navbar = () => {
  const isDesktop$ = useMediaQuery('md')

  const navWidth = 300
  const circleWidth = 60
  const radius = circleWidth / 2

  const index$ = useAtom<number>()
  const animationDuration$ = useAnimationDuration(index$)
  // const animatedIndex$ = useAtom<number>()
  // createComputed(on(index$, (i) => {
  //   if (i === undefined) return;
  //   // if (animatedIndex$() === undefined) return animatedIndex$(i);
  //   // animate2(animatedIndex$ as Accessor<number>, i, 150, animatedIndex$)

  //   const animatedI = animatedIndex$()
  //   if (animatedI === undefined) return animatedIndex$(i);

  //   const change = Math.abs(animatedI - i)
  //   // animate(animatedI, i, Math.min(change * 50, 150), animatedIndex$)
  //   // animate3(animatedI, i, Math.min(change * 50, 150), animatedIndex$)

  //   animatedIndex$(i)
  // }))

  const precurveSize = 8
  const startPoint$ = () => -(precurveSize) + (index$ () ?? 0) * circleWidth

  const angle = 90
  const curveMultiplier = pipeWith(angle, toRadians, getCircleCurveMultiplier)

  const curves = call(() => {
    const pre: Curve = [
      Math.round(precurveSize/2+1),.5,
      precurveSize-1, precurveSize - Math.round(precurveSize/2),
      precurveSize,precurveSize,
    ]
    const preMid: Curve = [
      3.5,radius * curveMultiplier-7,
      radius * (1 - curveMultiplier)-2.5,radius - precurveSize + .5,
      radius,radius - precurveSize + .5,
    ]
    const postMid = mirrorCurve(preMid)
    const post = mirrorCurve(pre)

    return mapValues({pre, preMid, postMid, post}, curveToString)
  })

  const backdropRef = useRef()
  const backdropWidth$ = call(() => {
    const styles$ = useComputedStyles(backdropRef)
    return () => extractFloat(styles$()?.width) ?? 0
  })
  const backdropPadding$ = () => {
    const width = backdropWidth$()
    if (!width) return 0;
    const padding = (width - navWidth) / 2
    return padding;
  }

  const clipPath$ = () => oneLine(`clip-path: path('
    M0,0
    h${backdropPadding$()}
    h${startPoint$()}
    ${curves.pre}
    ${curves.preMid}

    ${curves.postMid}
    ${curves.post}
    h${navWidth - startPoint$() - circleWidth - precurveSize * 2}
    h${backdropPadding$()}
    v60 
    h-${backdropWidth$()}
    z
  ');`)


  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <NavContainerNew 
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        
          textAlign: 'center',
          width: '100%',
          height: '100%',
          // width: `${width}px`,

          
        })}
      >

        <div class={css`
          width: 100%;
          height: 100%;
          position: absolute;
          filter: drop-shadow(0px -1px 3px var(--color-highlight));
        `}>

          <div
            ref={backdropRef}
            className={cx(
              css`
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
                /* background: #7fffff9e; */
                backdrop-filter: blur(2px);
                height: 100%;
                width: 100%;
                /* width: ${navWidth}px; */
                /* background: var(--color-highlight); */
                background: #262323;
              `, 
              css`transition: clip-path ${animationDuration$() / 1000}s ease-out;`
            )}
              // v 2
              // ${square(3)}
              // v -2

            style={clipPath$()}
          />
          {/* <div 
            class={css`
              border-top-left-radius: 16px;
              border-top-right-radius: 16px;
              background: #262323;
              height: calc(100% - 1px);
              position: absolute;
              bottom: 0;
              width: 100%;
            `}
            style={clipPath$()}
          /> */}
        </div>
        <div class={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          
            textAlign: 'center',
            width: `${navWidth}px`,
            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
          })}>
          {[
            NavIcon.Home,
            NavIcon.About,
            NavIcon.Skills,
            NavIcon.Projects,
            NavIcon.Contact,
          ].map((Icon, i) => <Icon onActivate={() => index$(i)} />)}
        </div>
      </NavContainerNew>
    </MenuContainer>

  )
}

const useAnimationDuration = (index$: Accessor<number | undefined>) => {
  const animationDuration$ = useAtom<number>(0)
  createComputed((prevI?: number) => {
    const i = index$()
    if (i === undefined || prevI === undefined) {
      animationDuration$(0)
    } else {
      const change = Math.abs(i - prevI)
      animationDuration$(Math.min(change * 50, 150)) 
    }
    animationDuration$(
      i === undefined || prevI === undefined
        ? 0
        : call(() => {
          const change = Math.abs(i - prevI)
          return range(80, 150)(change * 50) 
        })
    )
    return i
  })
  return animationDuration$
}

// const animate = (
//   from: number,
//   to: number,
//   time: number,
//   callback: (newValue: number) => void,
// ) => {
//   let startTimestamp: number

//   const {nextStep, cancel} = call(() => {
//     let currentAnimationId: number
//     const nextStep = () => {
//       currentAnimationId = requestAnimationFrame(step)
//     }
//     const cancel = () => currentAnimationId && cancelAnimationFrame(currentAnimationId)
//     return {nextStep, cancel}
//   })


//   function step(timestamp: number) {
//     const valueChange = to - from
//     const multiplier = startTimestamp
//       ? (timestamp - startTimestamp) / time
//       : (startTimestamp = timestamp, 1000 / 60 / time)
//     const value = from + valueChange * Math.min(multiplier, 1)
//     // console.log({value, valueChange, multiplier, timestamp, startTimestamp, time, from ,to})
//     value === to
//       ? callback(to)
//       : (callback(value), nextStep())
//   }

//   nextStep()

//   return cancel
// }

// // const animate2 = (
// //   currValue: Accessor<number>,
// //   to: number,
// //   time: number,
// //   updateValue: (newValue: number) => void,
// //   currentTime?: number,
// // ) => {
// //   const maxFps = 1000 / 60

// //   // log('animate2', {currValue: currValue(), to, time})
// //   if (
// //     currValue() === to
// //     || time <= maxFps
// //   ) return updateValue()
  

// //   requestAnimationFrame((timestamp) => {
// //     const value = currValue()
// //     const timeChange = currentTime 
// //       ? timestamp - currentTime 
// //       : maxFps
// //     if 
// //     const totalValueChange = to - value
// //     const valueChange = totalValueChange * timeChange / time
// //     console.log({now: performance.now(),value, timeChange, totalValueChange, valueChange, currentTime, timestamp})
// //     updateValue(value + valueChange)
// //     animate2(
// //       currValue,
// //       to,
// //       time - timeChange,
// //       updateValue,
// //       timestamp,
// //     )
      
// //   })

// //   // return cancel
// // }

// const animate3 = (from: number, to: number, time: number, update: Setter<number>) => {
//   const maxFps = 1000/60
//   const steps = Math.round(time / maxFps)
//   const stepChange = (to - from) / steps

//   animateSteps({steps, time, onStep: () => update(v => v+stepChange)})

//   // setInterval(() => {

//   // }, maxFps)
// }

// // const 
