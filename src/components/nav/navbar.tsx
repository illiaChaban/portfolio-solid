import { pipe, pipeWith } from "pipe-ts"
import { css, styled } from "solid-styled-components"
import { devId } from "../../directives/dev-id"
import { useAtom } from "../../hooks/use-atom"
import { use } from "../../hooks/use-directives"
import { assert } from "../../utils/assert"
import { call, extractFloat, iif, mapValues, range } from "../../utils/lodash"
import { log } from "../../utils/log"
import { cx, media } from "../../utils/styles"
import { Curve, curveToString, getCircleCurveMultiplier, mirrorCurve, oneLine, rotateCurve90Deg, square, toRadians } from "./path-utils"
import { NavIcon } from "./nav-icon"
import { Ref, useRef } from "../../hooks/use-ref"
import { useComputedStyles } from "../../hooks/use-computed-styles"
import { Accessor, batch, createComputed, createMemo, on, Setter } from "solid-js"
import { Theme, useBreakpoint } from "../../theme"

const MenuContainer = styled('div')((props) => {
  const theme = props.theme as Theme
  return {
    color: 'var(--color-subtle)',
    width: theme.misc.navOffset,
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 3,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [media(theme.breakpoints.down('md'))]: {
      width: '100%',
      height: theme.misc.navOffset,
      minHeight: 0,
      bottom: 0,
      top: 'auto',

      borderRight: 'none',
    }
  }
})

// FIXME: compiling + diff browser
// FIXME: reduce the number of containers
// TODO: test transparent bar
// TODO: desktop 

const navLength = 300

export const Navbar = () => {
  const index$ = useAtom<number>()

  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
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
    </MenuContainer>

  )
}

const NavContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  text-align: center;
  width: ${navLength}px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  ${({theme}) => media((theme as Theme).breakpoints.up('md'))} {
    height: ${navLength}px;
    width: 100%;
    flex-direction: column;
  }
`

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

type Direction = 'down' | 'right'
const useClipPath = (elRef: Ref, index$: Accessor<number | undefined>) => {
  const circleWidth = 60
  const radius = circleWidth / 2

  const precurveSize = 8
  const startPoint$ = () => -(precurveSize) + (index$() ?? 0) * circleWidth

  const angle = 90
  const curveMultiplier = pipeWith(angle, toRadians, getCircleCurveMultiplier)

  const curve = (direction: Direction) => {
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

    return [pre, preMid, postMid, post]
      .map(pipe(
        iif(direction === 'down', rotateCurve90Deg), 
        curveToString
      ))
      .join(' ')
  }

  const backdropDimensions$ = call(() => {
    const styles$ = useComputedStyles(elRef)
    return () => ({
      width: extractFloat(styles$()?.width) ?? 0,
      height: extractFloat(styles$()?.height) ?? 0,
    })
  })
  const getBackdropPadding = (length: number) => {
    return length && (length - navLength) / 2
  }

  const isDesktop$ = useBreakpoint('md')

  const top$ = (direction: Direction) => {
    const length = backdropDimensions$()[direction === 'right' ? 'width' : 'height']
    const line = direction === 'right' ? 'h' : 'v'
    // return `v${backdropDimensions$().height}`
    return oneLine(`
      ${line}${getBackdropPadding(length)}
      ${line}${startPoint$()}
      ${curve(direction)}
      ${line}${navLength - startPoint$() - circleWidth - precurveSize * 2}
      ${line}${getBackdropPadding(length)}
    `).replace('--', '')

  }

  const clipPath$ = () => isDesktop$()
    ? oneLine(`clip-path: path('
      M0,0
      h${backdropDimensions$().width} 
      ${log.wrapFn(top$)('down')}
      h-${backdropDimensions$().width} 
      z
    ');`)
    : oneLine(`clip-path: path('
      M0,0
      ${top$('right')}
      v${backdropDimensions$().height} 
      h-${backdropDimensions$().width}
      z
    ');`)

  return clipPath$
}