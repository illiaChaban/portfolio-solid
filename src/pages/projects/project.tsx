import { createEffect, JSX, on } from 'solid-js'
import { Icon } from '../../components'
import { useBool, useRef } from '../../hooks'
import { css, styled, useTheme, withClass } from '../../theme'
import anime, { AnimeInstance } from 'animejs'
import { cx } from '../../utils'

const showClass = 'show'

export const Project = (p: { front: JSX.Element; back: JSX.Element }) => {
  const showBack$ = useBool()
  const theme = useTheme()

  const polygonRef = useRef()

  const openingSvgPoints = '94,90 0,100 100,100 100,0'
  let openSvg: AnimeInstance
  let closeSvg: AnimeInstance

  const animateTo = (points: string) =>
    anime({
      easing: 'easeOutQuad',
      duration: 600,
      loop: false,
      targets: polygonRef.current,
      points: [{ value: points }],
    })

  createEffect(
    on(showBack$, show => {
      if (show) {
        closeSvg?.pause()
        openSvg = animateTo('0,0 0,100 100,100 100,0')
      } else {
        openSvg?.pause()
        closeSvg = animateTo(openingSvgPoints)
      }
    }),
  )

  return (
    <Container
      onMouseEnter={showBack$.on}
      onMouseLeave={showBack$.off}
      class={cx(showBack$() && showClass)}
    >
      <Shadow />

      <Content>
        <ToggleBtn onTouchEnd={showBack$.toggle}>
          {showBack$() ? 'Close' : 'Open'} <IconArrow name="arrowRight" />
        </ToggleBtn>

        <Front>{p.front}</Front>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class={css`
            display: block;
            width: 100%;
            height: 100%;
          `}
        >
          <polygon
            ref={polygonRef}
            points={openingSvgPoints}
            fill={theme.colors.primary}
          ></polygon>
        </svg>

        <Back>{p.back}</Back>
      </Content>
    </Container>
  )
}

const Container = withClass('project')(styled('section')`
  position: relative;
  width: 14rem;
  height: 19rem;
  min-height: 330px;
  margin: 20px;
  background: ${({ theme }) => theme.colors.background};
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
