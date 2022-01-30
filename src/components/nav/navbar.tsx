import { pipeWith } from "pipe-ts"
import { css, styled } from "solid-styled-components"
import { devId } from "../../directives/dev-id"
import { useAtom } from "../../hooks/use-atom"
import { use } from "../../hooks/use-directives"
import { assert } from "../../utils/assert"
import { call, extractFloat, mapValues, range } from "../../utils/lodash"
import { log } from "../../utils/log"
import { cx, media } from "../../utils/styles"
import { Curve, curveToString, getCircleCurveMultiplier, mirrorCurve, oneLine, square, toRadians } from "./path-utils"
import { NavIcon } from "./nav-icon"
import { Ref, useRef } from "../../hooks/use-ref"
import { useComputedStyles } from "../../hooks/use-computed-styles"
import { Accessor, batch, createComputed, createMemo, on, Setter } from "solid-js"
import { Theme, useBreakpoint } from "../../theme"

const MenuContainer = styled('div')((props) => {
  const theme = props.theme as Theme
  return {
    // background: '#181818', /* #2f2f2f */
    color: 'var(--color-subtle)',
    // color: 'black',
    width: theme.misc.navOffset,
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 3,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRight: '1px solid var(--color-subtle)',

    [media(theme.breakpoints.down('md'))]: {
      width: '100%',
      height: theme.misc.navOffset,
      minHeight: 0,
      bottom: 0,
      top: 'auto',

      borderRight: 'none',
      // borderTop: '1px solid var(--color-subtle)',
    }
  }
})

// FIXME: compiling + diff browser
// FIXME: reduce the number of containers
// TODO: test transparent bar
// TODO: desktop 

// const NavContainer = styled('nav')(({breakpoints}: Theme) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-around',
//   alignItems: 'center',

//   textAlign: 'center',
//   height: '210px',
//   width: '100%',

//   [media(breakpoints.down('md'))]: {
//     flexDirection: 'row',
//     minWidth: '250px',
//     width: '42%',
//     overflow: 'hidden',
//     textAlign: 'center',
//     height: '60px',

//     '&:after': {

//     }, 
//   }
// }))

const NavContainerNew = styled('nav')({
  // height: '50px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  textAlign: 'center',
  width: '100%',
  height: '100%',
})

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


const navWidth = 300



export const Navbar = () => {
  const isDesktop$ = useBreakpoint('md')


  const index$ = useAtom<number>()


  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <NavContainerNew >
        <Bar index={index$()}/>

        <NavContainer>
          {[
            NavIcon.Home,
            NavIcon.About,
            NavIcon.Skills,
            NavIcon.Projects,
            NavIcon.Contact,
          ].map((Icon, i) => <Icon onActivate={() => index$(i)} />)}
        </NavContainer>
      </NavContainerNew>
    </MenuContainer>

  )
}

const NavContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  textAlign: 'center',
  width: `${navWidth}px`,
  '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
})

const Bar = (p: {index: number | undefined}) => {
  const animationDuration$ = useAnimationDuration(() => p.index)

  const backdropRef = useRef()
  const clipPath$ = useClipPath(backdropRef, () => p.index)

  return (
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
            backdrop-filter: blur(2px);
            height: 100%;
            width: 100%;
            background: #262323;
          `, 
          css`transition: clip-path ${animationDuration$() / 1000}s ease-out;`
        )}
        style={clipPath$()}
      />
    </div>
  )
}

const useAnimationDuration = (index$: Accessor<number | undefined>) => {
  const animationDuration$ = useAtom<number>(0)
  createComputed(on(index$, (i, prevI) => {
    if (i === undefined || prevI === undefined) {
      return animationDuration$(0)
    }
    const change = Math.abs(i - prevI)
    animationDuration$(
      range(90, 175)(change * 50)
    )
  }))
  return animationDuration$
}

const useClipPath = (elRef: Ref, index$: Accessor<number | undefined>) => {
  const circleWidth = 60
  const radius = circleWidth / 2

  const precurveSize = 8
  const startPoint$ = () => -(precurveSize) + (index$() ?? 0) * circleWidth

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

  const backdropWidth$ = call(() => {
    const styles$ = useComputedStyles(elRef)
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

  return clipPath$
}