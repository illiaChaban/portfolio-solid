import anime from 'animejs'
import { onMount } from 'solid-js'
import { useRef } from '../../hooks'
import { tw } from '../../utils/tw'

export const Intro = () => {
  const circleWhite = useRef()
  const circleDarkDashedContainer = useRef()
  const circleDark = useRef()
  const letters = useRef()
  const bang = useRef()

  onMount(() => {
    const animation = anime
      .timeline({ loop: false })
      .add({
        targets: circleWhite.current,
        scale: [0, 3],
        opacity: [1, 0],
        easing: 'easeInOutExpo',
        rotateZ: 360,
        duration: 1100,
      })
      .add(
        {
          targets: circleDarkDashedContainer.current,
          scale: [0, 1],
          duration: 1100,
          easing: 'easeInOutExpo',
        },
        '-=1000',
      )
      .add(
        {
          targets: circleDark.current,
          scale: [0, 1],
          duration: 1100,
          easing: 'easeOutExpo',
        },
        '-=600',
      )
      .add(
        {
          targets: letters.current,
          scale: [0, 1],
          translateY: ['38%', '38%'], //centering letters
          duration: 1200,
        },
        '-=550',
      )
      .add(
        {
          targets: bang.current,
          scale: [0, 1],
          translateY: ['38%', '38%'], //centering letters
          opacity: [0, 1],
          rotateZ: [45, 15],
          duration: 1200,
        },
        '-=1000',
      )
  })
  return (
    <Container>
      <LettersContainer>
        <Letters ref={letters} class="top-[-0.2em]">
          Hi
        </Letters>
        <Letters ref={bang} class="left-[-0.06em]">
          !
        </Letters>
      </LettersContainer>
      <CircleWhite ref={circleWhite} />
      <CircleDark ref={circleDark} />
      <Circle ref={circleDarkDashedContainer}>
        <CircleDarkDashed />
      </Circle>
    </Container>
  )
}

const Container = tw('h1')`
  font-black 
  size-[3em] relative m-0 
  [transform:translate(-25px,15px)]
`

const LettersContainer = tw('span')`absolute inset-0 m-auto h-[1em] text-center`

const Letters = tw('span')`relative z-[2] inline-block [line-height:0.7em]`

const Circle = tw('span')`absolute inset-0 m-auto`

const CircleWhite = tw(Circle)`
  size-[3em]
  border-2 border-dashed border-text-primary rounded-[2em]
`

const CircleDark = tw(Circle)`
  size-[2.2em]
  bg-[#316673]
  rounded-[3em]
  z-[1]
`

const CircleDarkDashed = tw(Circle)`
  rounded-[2.4em]
  bg-transparent
  border-2 border-dashed border-highlight
  size-[2.3em]
  animate-spin
  [animation-duration:8s]
  [background-size:100%_100%]
`
