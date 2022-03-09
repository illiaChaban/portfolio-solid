import anime from 'animejs'
import { onMount, For } from 'solid-js'
import { Button } from '../../components/button'
import { textScramble } from '../../directives/text-scramble'
import { useBool, useRef } from '../../hooks'
import { use } from '../../hooks/use-directives'
import { css, keyframes, makeStyles, styled, useTheme } from '../../theme'
import { cx, media } from '../../utils/styles'
import { Intro } from './intro'

export default () => {
  const { sharedStyles } = useTheme()

  return (
    <>
      <IntroWrapper class={sharedStyles.tags.body}>
        <IntroContainer class={sharedStyles.tags.div}>
          <Intro />

          <Header />
          <Subheading ref={use(textScramble({ delay: 2000 }))}>
            Full Stack | TypeScript | React | Angular | C#
          </Subheading>
          <Button
            page="about"
            class={css`
              margin-top: 20px;
              margin-bottom: 45px;
            `}
          >
            More About Me
          </Button>
        </IntroContainer>
      </IntroWrapper>
    </>
    // <Art />
  )
}

const IntroWrapper = styled('div')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2rem;
  font-family: 'Special Elite', cursive;
  font-weight: 900;

  min-height: 400px;
  position: relative;

  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;

  ${({ theme }) => media(theme.breakpoints.down('md'))} {
    margin-left: 0;
  }
  ${({ theme }) => media(theme.breakpoints.down(480))} {
    font-size: 1.6rem;
  }
`

const IntroContainer = styled('div')`
  margin-left: 5%;
  ${({ theme }) => media(theme.breakpoints.down(660))} {
    margin-top: 70px;
  }
`

const Header = () => {
  const theme = useTheme()
  const ref = useRef()

  const animatedShow$ = useBool()

  onMount(() => {
    const $letters = ref.current.querySelectorAll('span')

    $letters.forEach(char => {
      char.style.opacity = '0'
    })
    anime
      .timeline({ loop: false })
      .add({
        targets: $letters,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 250,
        delay: anime.stagger(50, { start: 100 }),
      })
      .finished.then(animatedShow$.on)
  })
  return (
    <h1
      ref={ref}
      class={cx(
        css`
          color: ${theme.colors.text.primary};
          text-align: left;
          letter-spacing: 2px;
          line-height: 1.2em;
          margin: 0;
        `,
        animatedShow$() &&
          css`
            background: linear-gradient(
              to right,
              ${theme.colors.text.primary},
              ${theme.colors.text.primary} 60%,
              ${theme.colors.primary}
            );
            background-size: 200%;
            background-position: left;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: ${keyframes`
                to {
                  background-position: right;
                }
              `} linear 1.5s forwards;
          `,
      )}
    >
      <WrapLetterInSpan>I'm Illia,</WrapLetterInSpan>
      <br />
      <WrapLetterInSpan>web developer</WrapLetterInSpan>
    </h1>
  )
}

const Subheading = styled('h3')`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.subtle1};
  font-family: 'Inconsolata', monospace;
  font-weight: 100;
  margin: 0;
  letter-spacing: -1px;
`

const WrapLetterInSpan = (p: { children: string }) => (
  <For each={p.children.split('')}>
    {c => (c === ' ' ? c : <span>{c}</span>)}
  </For>
)
