import anime, { AnimeInstance } from 'animejs'
import { createEffect, JSX, on } from 'solid-js'
import { Icon } from '../../components'
import { useBool, useRef } from '../../hooks'
import { styled } from '../../theme'
import { getUniqueId } from '../../utils'
import { tw } from '../../utils/tw'

export const Project = (p: { front: JSX.Element; back: JSX.Element }) => {
  const showBack$ = useBool()

  const polygonRef = useRef()
  const displacementRef = useRef()

  let openSvg: AnimeInstance
  let closeSvg: AnimeInstance

  const startAnimationValues = {
    points: '93,86 45,100 100,100 100,50',
    scale: '7',
  }

  const animateToStart = () =>
    anime
      .timeline({ loop: false })
      .add({
        easing: 'easeOutQuad',
        duration: 600,
        targets: polygonRef.current,
        points: [{ value: startAnimationValues.points }],
      })
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

  const filterId = getUniqueId('displacementFilter')

  return (
    <Container onMouseEnter={showBack$.on} onMouseLeave={showBack$.off}>
      <Shadow />

      <Content>
        <ToggleBtn onTouchEnd={showBack$.toggle}>
          {showBack$() ? 'Close' : 'Open'} <IconArrow name="arrowRight" />
        </ToggleBtn>

        <Front visible={!showBack$()}>{p.front}</Front>
        {/* <Front $visible={!showBack$()}>{p.front}</Front> */}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class="block size-full"
        >
          <filter id={filterId}>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.05"
              numOctaves="2"
              result="turbulence"
              style={{ transform: 'scale(1)' }}
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale={startAnimationValues.scale}
              xChannelSelector="R"
              yChannelSelector="G"
              ref={displacementRef}
            />
          </filter>
          <polygon
            ref={polygonRef}
            points={startAnimationValues.points}
            class="fill-highlight"
            style={{ filter: `url(#${filterId})`, transform: 'scale(1)' }}
          />
        </svg>

        <Back visible={showBack$()}>{p.back}</Back>
      </Content>
    </Container>
  )
}

const Container = tw('section')`
  relative 
  w-[14rem] min-w-[14rem] min-h-[19rem] h-[19rem]
  m-5 [font-size:0.8rem]
  bg-background
  [background:radial-gradient(circle_at_50%_0%,#0a1515,theme(colors.background)_80%)]
`

const Shadow = tw('div')`
  size-full absolute top-0 left-0 [box-shadow:0_5px_55px_black] z-[-1]
`

const Content = tw('div')`
  size-full overflow-hidden relative 
  rounded-md border border-solid border-highlight
`

const ToggleBtn = tw('button')`
  bg-[transparent] border-none 
  absolute bottom-0 right-0 z-[2]
  text-accent-black
  font-serif [font-size:0.8rem]
  py-[5px] px-[10px]
  [transition:color_0.2s]
  focus:outline-none
`

const IconArrow = tw(Icon)`transition-none relative top-0.5`

const Front = tw('div')<{ visible: boolean }>`
  absolute inset-0
  p-[15px] box-border
  [&>p:first-child]:mt-0
  [&>*:last-child]:mt-0
  ${p =>
    p.visible
      ? tw`
        [transform:translateY(0)] 
        opacity-100 
        [transition:transform_0.6s_0.1s,opacity_0.6s_0.1s]
        pointer-events-none 
      `
      : tw`
        [transform:translateY(-50%)] 
        opacity-0 
        [transition:opacity_0.6s,transform_0s_0.6s]
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

  transition:
    transform 0.5s,
    opacity 0.2s;

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
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;

        transition: transform 0.5s, opacity 0.5s, -webkit-transform 0.5s;

        transition-delay: 0.2s;
      `
      : `
        pointer-events: none;
      `}
`
