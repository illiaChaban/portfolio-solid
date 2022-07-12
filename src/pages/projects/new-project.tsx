import anime, { AnimeInstance } from 'animejs'
import { createEffect, JSX, on } from 'solid-js'
import { Icon } from '../../components'
import { useBool, useRef } from '../../hooks'
import { styled, useTheme, withUniqueClass } from '../../theme'
import { cx, getUniqueId } from '../../utils'

const showClass = 'show'

type AnimationValues = {
  points: string
  baseFrequency: string
  scale: string
}

export const NewProject = (p: { front: JSX.Element; back: JSX.Element }) => {
  const showBack$ = useBool()
  const theme = useTheme()

  const polygonRef = useRef()
  const turbulenceRef = useRef()
  const displacementRef = useRef()

  const animationValues = {
    start: {
      points:
        '64 68.64002826986787 8.574 99.99999809502238 63.44597386751702 67.67998300759965 64 3.9999980950223812 64.55402613248297 67.67998300759965 119.426 99.99999809502238',
      baseFrequency: '0.049999976187779765',
      scale: '14.999993332578335',
    },
    end: {
      points:
        '64 127.80331951798807 8.574 96.01325340175282 8.755810165245258 32.1182203436352 64 0.013253401752825411 119.24418983475474 32.1182203436352 119.426 96.01325340175282 ',
      baseFrequency: '0.00016566752191031486',
      scale: '1.046386906134888',
    },
  }
  let openSvg: AnimeInstance
  let closeSvg: AnimeInstance

  const animateTo = (values: AnimationValues) =>
    anime
      .timeline({ loop: false })
      .add({
        easing: 'easeOutQuad',
        duration: 600,
        targets: polygonRef.current,
        points: [{ value: values.points }],
      })
      .add(
        {
          easing: 'easeOutQuad',
          duration: 600,
          targets: turbulenceRef.current,
          baseFrequency: values.baseFrequency,
        },
        '-=600',
      )
      .add(
        {
          easing: 'easeOutQuad',
          duration: 600,
          targets: displacementRef.current,
          scale: values.scale,
        },
        '-=600',
      )

  createEffect(
    on(showBack$, show => {
      if (show) {
        closeSvg?.pause()
        openSvg = animateTo(animationValues.end)
      } else {
        openSvg?.pause()
        closeSvg = animateTo(animationValues.start)
      }
    }),
  )

  const filterId = getUniqueId('displacementFilter')

  return (
    <Container
      onMouseEnter={showBack$.on}
      onMouseLeave={showBack$.off}
      class={cx(showBack$() && showClass)}
    >
      {/* <Shadow /> */}

      <Content>
        {/* <ToggleBtn onTouchEnd={showBack$.toggle}>
          {showBack$() ? 'Close' : 'Open'} <IconArrow name="arrowRight" />
        </ToggleBtn> */}

        <Front>{p.front}</Front>

        <svg viewBox="0 0 128 128" preserveAspectRatio="none">
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency="0.049999976187779765"
              numOctaves="2"
              result="turbulence"
              style="transform: scale(1);"
            ></feTurbulence>
            <feDisplacementMap
              ref={displacementRef}
              in2="turbulence"
              in="SourceGraphic"
              scale="14.999993332578335"
              xChannelSelector="R"
              yChannelSelector="G"
            ></feDisplacementMap>
          </filter>
          <polygon
            ref={polygonRef}
            points="64 68.64002826986787 8.574 99.99999809502238 63.44597386751702 67.67998300759965 64 3.9999980950223812 64.55402613248297 67.67998300759965 119.426 99.99999809502238 "
            // points="0 0 220 0 220 326 0 326"
            style={`filter: url(#${filterId}); transform: scale(1);`}
            fill="currentColor"
          ></polygon>
        </svg>
        {/* <svg width="128" height="128" viewBox="0 0 128 128">
            <filter id="displacementFilter2">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.00016566752191031486"
                numOctaves="2"
                result="turbulence"
                style="transform: scale(1);"
              ></feTurbulence>
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="1.046386906134888"
                xChannelSelector="R"
                yChannelSelector="G"
              ></feDisplacementMap>
            </filter>
            <polygon
              points="64 127.80331951798807 8.574 96.01325340175282 8.755810165245258 32.1182203436352 64 0.013253401752825411 119.24418983475474 32.1182203436352 119.426 96.01325340175282 "
              style={'filter: url(#displacementFilter2); transform: scale(1);'}
              fill="currentColor"
            ></polygon>
          </svg> */}

        {/* <Back>{p.back}</Back> */}
      </Content>
    </Container>
  )
}

const Container = withUniqueClass('project')(styled('section')`
  position: relative;
  width: 14rem;
  height: 19rem;
  min-height: 330px;
  margin: 20px;
  background: ${({ theme }) => theme.colors.background};
  background: radial-gradient(
    circle at 50% 0%,
    #0a1515,
    ${({ theme }) => theme.colors.background} 80%
  );

  font-size: 0.8rem;
`)

const Shadow = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 5px 55px black;
  z-index: -1;
`

const Content = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  position: relative;
`

const ToggleBtn = styled('button')`
  background: transparent;
  border: none;
  position: absolute;
  font-size: 0.8rem;
  font-family: 'Saira', Courier, monospace;
  color: black;
  bottom: 0px;
  right: 0px;
  color: black;
  z-index: 2;
  padding: 5px 10px;
  transition: color 0.2s;

  &:focus {
    outline: none;
  }
`

const IconArrow = styled(Icon)`
  transition: all 0s linear;
  position: relative;
  top: 2px;
`

const Front = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 15px;
  box-sizing: border-box;
  z-index: 1;

  transition: transform 0.6s, opacity 0.6s;
  transition-delay: 0.3s;

  .${Container.class}.${showClass} & {
    transform: translateY(-50%);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s, transform 0s 0.6s;
  }

  > p:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-top: 0;
  }
`

const Back = styled('div')`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 10px;

  position: absolute;
  top: 0;
  left: 0;

  -webkit-transform: translateX(50%);
  transform: translateX(50%);

  opacity: 0;
  color: black;

  transition: transform 0.5s, opacity 0.2s;

  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-top: 0;
  }

  & a {
    color: black;
  }

  .${Container.class}.${showClass} & {
    z-index: 1;

    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;

    transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;

    transition-delay: 0.2s;
  }
`
