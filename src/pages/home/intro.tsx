import anime from 'animejs'
import { onCleanup, onMount } from 'solid-js'
import { useRef } from '../../hooks'
import { keyframes, styled } from '../../theme'

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
        <Letters ref={letters}>Hi</Letters>
        <Bang ref={bang}>!</Bang>
      </LettersContainer>
      <CircleWhite ref={circleWhite} />
      <CircleDark ref={circleDark} />
      <Circle ref={circleDarkDashedContainer}>
        <CircleDarkDashed />
      </Circle>
    </Container>
  )
}

const Container = styled('h1')`
  font-weight: 900;
  width: 3em;
  height: 3em;
  position: relative;
  margin: 0;
  /* aligning HI to the rest of the header */
  transform: translate(-25px, 15px);
`

const LettersContainer = styled('span')`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  height: 1em;
  text-align: center;
`

const Letters = styled('span')`
  position: relative;
  z-index: 2;
  display: inline-block;
  line-height: 0.7em;
  top: -0.2em;
`

const Bang = styled(Letters)`
  top: auto;
  left: -0.06em;
`

const Circle = styled('span')`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
`

const CircleWhite = styled(Circle)`
  width: 3em;
  height: 3em;
  border: 2px dashed var(--color-main, white);
  border-radius: 2em;
`

const CircleDark = styled(Circle)`
  width: 2.2em;
  height: 2.2em;
  background-color: #316673;
  border-radius: 3em;
  z-index: 1;
`

const CircleDarkDashed = styled(Circle)`
  border-radius: 2.4em;
  background-color: transparent;
  border: 2px dashed var(--color-highlight);
  width: 2.3em;
  height: 2.3em;

  animation: ${keyframes`
      from {
        transform: rotateZ(0deg);
      }

      to {
        transform: rotateZ(360deg);
      }
    `} 8s linear infinite;
`
