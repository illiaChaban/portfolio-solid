import { Accessor, createMemo, For, onMount } from 'solid-js'
import { useComputedStyles } from '../../hooks'
import { useAtom } from '../../hooks/use-atom'
import { Ref, useRef } from '../../hooks/use-ref'
import { css, styled, useBreakpoint, useTheme } from '../../theme'
import { flow, pipe } from '../../utils'
import { extractFloat, iif, scope } from '../../utils/lodash'
import { cx, media } from '../../utils/styles'
import { NavIcon } from './nav-icon'
import {
  Curve,
  curveToString,
  getCircleCurveMultiplier,
  mirrorCurve,
  oneLine,
  rotateCurve90Deg,
  toRadians,
} from './path-utils'

const MenuContainer = styled('div')(({ theme }) => ({
  color: 'var(--color-subtle)',
  width: theme.misc.navOffset,
  height: '100%',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.navbar,

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
  },
}))

const navLength = 300

export const Navbar = () => {
  const index$ = useAtom<number>()

  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <Bar index={index$()} />

      <NavContainer>
        <For
          each={[
            NavIcon.Home,
            NavIcon.About,
            NavIcon.Skills,
            NavIcon.Projects,
            NavIcon.Contact,
          ]}
        >
          {(Icon, i) => <Icon onActivate={() => index$(i)} />}
        </For>
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
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${p => media(p.theme.breakpoints.up('md'))} {
    height: ${navLength}px;
    width: 100%;
    flex-direction: column;
  }
`

const useStyles = () => {
  const theme = useTheme()
  return {
    backdropBorder: css`
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #7ff6ff40;
      ${media(theme.breakpoints.down('md'))} {
        top: -1.5px;
      }
      ${media(theme.breakpoints.up('md'))} {
        right: -1.5px;
      }
    `,
    backdrop: css`
      height: 100%;
      width: 100%;
      background: #000000d6;
      ${media(theme.breakpoints.down('md'))} {
        background: #000000c4;
        backdrop-filter: blur(2px);
      }
    `,
  }
}

const Bar = (p: { index: number | undefined }) => {
  const styles = useStyles()

  const backdropRef = useRef()
  const clipPath$ = useClipPath(backdropRef, () => p.index)

  const backdropTransitionStyles$ = scope(() => {
    const afterMounted$ = useAtom(false)
    // wait for initial clip-path to be applied
    onMount(() => setTimeout(() => afterMounted$(true), 0))
    return () =>
      p.index &&
      afterMounted$() &&
      css`
        transition: clip-path ${0.2}s ease-out;
      `
  })

  return (
    <div
      class={css`
        width: 100%;
        height: 100%;
        position: absolute;
      `}
    >
      {/* Using another DIV to create border instead of 
      "filter: drop-shadow(0px -1px 3px var(--color-highlight));" on the parent 
      because of the animation bug on mobile (visible only on an actual phone)
      */}
      <div
        class={cx(styles.backdropBorder, backdropTransitionStyles$())}
        style={`clip-path: path('${clipPath$()}');`}
      />
      <div
        ref={backdropRef}
        class={cx(styles.backdrop, backdropTransitionStyles$())}
        style={`clip-path: path('${clipPath$()}');`}
      />
    </div>
  )
}

type Direction = 'down' | 'right'
const useClipPath = (elRef: Ref, index$: Accessor<number | undefined>) => {
  const circleWidth = 60
  const radius = circleWidth / 2

  const precurveSize = 8
  const startPoint$ = () => -precurveSize + (index$() ?? 0) * circleWidth

  const angle = 90
  const curveMultiplier = pipe(angle, toRadians, getCircleCurveMultiplier)

  const curve = (direction: Direction) => {
    const pre: Curve = [
      Math.round(precurveSize / 2 + 1),
      0.5,
      precurveSize - 1,
      precurveSize - Math.round(precurveSize / 2),
      precurveSize,
      precurveSize,
    ]
    const preMid: Curve = [
      3.5,
      radius * curveMultiplier - 7,
      radius * (1 - curveMultiplier) - 2.5,
      radius - precurveSize + 0.5,
      radius,
      radius - precurveSize + 0.5,
    ]
    const postMid = mirrorCurve(preMid)
    const post = mirrorCurve(pre)

    return [pre, preMid, postMid, post]
      .map(flow(iif(direction === 'down', rotateCurve90Deg), curveToString))
      .join(' ')
  }

  const backdropDimensions$ = scope(() => {
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
    const length =
      backdropDimensions$()[direction === 'right' ? 'width' : 'height']
    const line = direction === 'right' ? 'h' : 'v'
    return oneLine(`
      ${line}${getBackdropPadding(length)}
      ${line}${startPoint$()}
      ${curve(direction)}
      ${line}${navLength - startPoint$() - circleWidth - precurveSize * 2}
      ${line}${getBackdropPadding(length)}
    `).replace('--', '')
  }

  const clipPath$ = createMemo(() =>
    isDesktop$()
      ? oneLine(`
        M0,0
        h${backdropDimensions$().width} 
        ${top$('down')}
        h-${backdropDimensions$().width} 
        z
      `)
      : oneLine(`
        M0,0
        ${top$('right')}
        v${backdropDimensions$().height} 
        h-${backdropDimensions$().width}
        z
      `),
  )

  return clipPath$
}
