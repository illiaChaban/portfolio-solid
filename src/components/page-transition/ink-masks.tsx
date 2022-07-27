import InkImg from './assets/ink.png'
import { createMemo, JSX, onCleanup, onMount } from 'solid-js'

import masksJson from './assets/masks-minified.json'
import { cx } from '../../utils/styles'
import { Ref, useRef } from '../../hooks/use-ref'
import { use } from '../../hooks/use-directives'
import { devId } from '../../directives/dev-id'
import { css, makeStyles, styled, useTheme } from '../../theme'
import { getUniqueId, last } from '../../utils'
import anime from 'animejs'

export const framesNum = 25

const useStyles = makeStyles()({
  outOfRange: css({
    background: '#0c1126',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }),
  inRange: css({
    left: 0,
    height: '100%',
    width: `${framesNum * 100}%`,
    background: `url(${InkImg}) no-repeat 0 0`,
    backgroundSize: '100% 100%',
  }),
})

export const InkImage = (p: {
  step: number
  class?: string
  ref?: Ref<Element>
}) => {
  const frameInPercent = 100 / framesNum

  const position$ = createMemo(() => p.step * frameInPercent)
  const inRange$ = createMemo(() => position$() >= 0 && position$() < 100)

  const styles = useStyles()
  return (
    <div
      ref={use(p.ref, devId('ink-mask'))}
      class={cx(
        p.class,
        css({ position: 'absolute' }),
        inRange$() && styles.inRange(),
        !inRange$() && styles.outOfRange(),
      )}
      style={inRange$() ? `transform: translateX(-${position$()}%)` : ''}
    />
  )
}

// export const ClipPath = (p: { step: number }) => {
//   return <path d={masksJson[p.step] ?? last(masksJson)} />
// }

type ClipPathProps = {
  step?: number
} & JSX.PathSVGAttributes<SVGPathElement>

export const ClipPath = (p: ClipPathProps) => {
  const ref = useRef()

  onMount(() => {
    const a = anime({
      easing: 'easeOutQuad',
      duration: 800,
      targets: ref.current,
      d: [{ value: 'M 0,0 0,1 1,1 1,0 z' }],
    })

    // console.log('animating', a.began)

    onCleanup(() => a.pause())
  })

  return <path ref={ref} d={'M 0.8,0.8 0.5,1 1,1 1,0.5 z'} {...p} />
}

export const useClipPath = () => {
  const theme = useTheme()

  type ClipPathProps2 = {
    step?: number
    viewBoxSize?: number
    // radiusMultiplier?: number
  } & JSX.PathSVGAttributes<SVGPolygonElement>

  const ClipPath = (p: ClipPathProps2) => {
    const ref = useRef()

    const viewBoxSize = () => p.viewBoxSize ?? 1

    const otherPoints = [0, 1, 1, 1, 1, 0]
    const points$ = (start: [number, number]) =>
      [...start, ...otherPoints].map(x => x * viewBoxSize()).join(' ')

    // const radiusMultiplier = () => p.radiusMultiplier ?? 1

    onMount(() => {
      const a = anime({
        easing: 'easeOutQuad',
        duration: 1000,
        targets: ref.current,
        points: [{ value: points$([0, 0]) }],
      })

      onCleanup(() => a.pause())
    })

    return (
      // <circle
      //   ref={ref}
      //   cx={1 * viewBoxSize()}
      //   cy={1 * viewBoxSize()}
      //   r={radius(0)}
      //   {...p}
      // />
      <polygon points={points$([0.9, 0.9])} ref={ref} {...p} />
    )
  }

  const filterId = getUniqueId('outerPathFilter')

  return {
    clipppedPath: <ClipPath />,
    outerSvg: (
      <svg
        class={css`
          width: 100%;
          height: 100%;
          position: absolute;
          display: block;
        `}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <filter id={filterId}>
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="2"
            result="turbulence"
            style="transform: scale(1);"
          ></feTurbulence>
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale={'25'}
            xChannelSelector="R"
            yChannelSelector="G"
            // ref={displacementRef}
          ></feDisplacementMap>
        </filter>
        <ClipPath
          stroke={theme.colors.primary}
          viewBoxSize={100}
          stroke-width={2}
          fill="transparent"
          // fill="black"
          style={`filter: url(#${filterId});`}
        />
      </svg>
    ),
  }
}
