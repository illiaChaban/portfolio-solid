import anime, { AnimeInstance } from 'animejs'
import { createEffect, JSX, on } from 'solid-js'
import { Icon } from '../../components'
import { useBool, useRef } from '../../hooks'
import { css, styled, useTheme } from '../../theme'
import { getUniqueId } from '../../utils'

export const Project = (p: { front: JSX.Element; back: JSX.Element }) => {
  const showBack$ = useBool()
  const theme = useTheme()

  const polygonRef = useRef()
  const polygonRef2 = useRef()
  const displacementRef = useRef()

  let openSvg: AnimeInstance
  let closeSvg: AnimeInstance

  const startAnimationValues = {
    points: '93,88 45,100 100,100 100,60',
    scale: '7',
  }
  const startAnimationValues2 = {
    // points: '95,90 47,100 100,100 100,62',
    points: '93,88 45,100 100,100 100,60',

    scale: '7',
  }

  const animateToStart = () =>
    anime
      .timeline({ loop: false })
      .add({
        easing: 'easeOutQuad',
        duration: 600,
        targets: polygonRef2.current,
        points: [{ value: startAnimationValues2.points }],
      })
      .add(
        {
          easing: 'easeOutQuad',
          duration: 600,
          targets: polygonRef.current,
          points: [{ value: startAnimationValues.points }],
          delay: 50,
        },
        '-=600',
      )
      .add(
        {
          easing: 'linear',
          duration: 400,
          targets: displacementRef.current,
          scale: '15',
        },
        '-=600',
      )
      .add(
        {
          easing: 'easeOutQuad',
          duration: 200,
          targets: displacementRef.current,
          scale: startAnimationValues.scale,
        },
        '-=200',
      )

  const animateToEnd = () =>
    anime
      .timeline({ loop: false })
      .add({
        easing: 'easeOutQuad',
        duration: 600,
        targets: polygonRef.current,
        points: [{ value: '0,0 0,100 100,100 100,0' }],
      })
      .add(
        {
          easing: 'easeOutQuad',
          duration: 600,
          targets: polygonRef2.current,
          points: [{ value: '0,0 0,100 100,100 100,0' }],
          delay: 50,
        },
        '-=600',
      )
      .add(
        {
          easing: 'easeOutQuart',
          duration: 200,
          targets: displacementRef.current,
          scale: '25',
        },
        '-=600',
      )
      .add(
        {
          easing: 'easeInQuad',
          duration: 400,
          targets: displacementRef.current,
          scale: '0',
        },
        '-=400',
      )

  createEffect(
    on(
      showBack$,
      show => {
        if (show) {
          closeSvg?.pause()
          openSvg = animateToEnd()
        } else {
          openSvg?.pause()
          closeSvg = animateToStart()
        }
      },
      { defer: true },
    ),
  )

  // TODO: play with turbulence on window scroll

  const filterId = getUniqueId('displacementFilter')

  return (
    <Container onMouseEnter={showBack$.on} onMouseLeave={showBack$.off}>
      <Shadow />

      <Content>
        <ToggleBtn onTouchEnd={showBack$.toggle}>
          {showBack$() ? 'Close' : 'Open'} <IconArrow name="arrowRight" />
        </ToggleBtn>

        <Front visible={!showBack$()}>{p.front}</Front>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class={css`
            display: block;
            width: 100%;
            height: 100%;
          `}
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
              scale={startAnimationValues.scale}
              xChannelSelector="R"
              yChannelSelector="G"
              ref={displacementRef}
            ></feDisplacementMap>
          </filter>
          <polygon
            ref={polygonRef}
            points={startAnimationValues.points}
            fill={'#2e96b2'}
            style={`filter: url(#${filterId}); transform: scale(1);`}
          ></polygon>
          <polygon
            ref={polygonRef2}
            points={startAnimationValues2.points}
            fill={theme.colors.primary}
            style={`filter: url(#${filterId}); transform: scale(1);`}
          ></polygon>
        </svg>

        <Back visible={showBack$()}>{p.back}</Back>
      </Content>
    </Container>
  )
}

const Container = styled('section')`
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
`

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

/**
 * NOTE:
 * Separating components into Front & FrontBase makes sure
 * that opacity transitioning as expected. Looks like it's being
 * reset if a different class is applied
 */
const FrontBase = styled('div')`
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

  > p:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-top: 0;
  }
`
const Front = styled(FrontBase)`
  ${({ visible }: { visible: boolean }) =>
    visible
      ? ''
      : `
    transform: translateY(-50%);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s, transform 0s 0.6s;
  `}
`

const BackBase = styled('div')`
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
`
const Back = styled(BackBase)`
  ${({ visible }: { visible: boolean }) =>
    visible
      ? `
        z-index: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;

        transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;

        transition-delay: 0.2s;
      `
      : ''}
`
