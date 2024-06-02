import anime, { AnimeInstance } from 'animejs'
import { createEffect, JSX, on } from 'solid-js'
import { IconArrowRight } from '../../components'
import { useBool, useRef } from '../../hooks'
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
          {showBack$() ? 'Close' : 'Open'}{' '}
          <IconArrowRight class="transition-none relative top-[2.75px]" />
        </ToggleBtn>

        <Front $visible={!showBack$()}>{p.front}</Front>
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

        <Back $visible={showBack$()}>{p.back}</Back>
      </Content>
    </Container>
  )
}

const Container = tw('section')`
  relative 
  w-[14rem] min-w-[240px] min-h-[330px] h-[19rem]
  m-5 
  bg-[--tw-background]
  [background:radial-gradient(circle_at_50%_0%,#0a1515,var(--tw-background)_80%)]
`

const Shadow = tw('div')`
  size-full absolute top-0 left-0 [box-shadow:0_5px_55px_black] z-[-1]
`

const Content = tw('div')`
  size-full overflow-hidden relative 
  rounded-md border border-solid border-highlight
  text-sm 
`

const ToggleBtn = tw('button')`
  bg-transparent border-none 
  absolute bottom-0 right-0 z-[2]
  text-accent-black
  font-serif text-[0.8rem]
  p-[5px] pl-[10px] pr-[3px]
  [transition:color_0.2s]
  focus:outline-none
`

const InfoContainerBase = tw('div')`
  absolute inset-0 box-border p-3
  [&>p]:m-0 [&>p+p]:mt-[1em]
`

const Front = tw(InfoContainerBase)<{ $visible: boolean }>`
  ${p =>
    p.$visible
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

const Back = tw(InfoContainerBase)<{ $visible: boolean }>`
  text-accent-black [&_a]:text-accent-black
  ${p =>
    p.$visible
      ? tw`
          [transform:translateX(0)] 
          opacity-100 
          [transition:transform_.5s_.2s,opacity_.5s_.2s]
        `
      : tw`
          [transform:translateX(50%)] 
          opacity-0 
          [transition:transform_.5s,opacity_.2s] 
          pointer-events-none
        `}
`
