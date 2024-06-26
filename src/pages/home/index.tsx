import anime from 'animejs'
import { For, onMount } from 'solid-js'
import { Button } from '../../components/button'
import { Ref, useBool, useRef } from '../../hooks'
import { Art } from './art'
import { Intro } from './intro'
import { tw } from '../../utils/tw'
import styles from './home.module.css'
import { homeIntroText } from './home-intro-text'

export default (p: { contentRef: Ref<HTMLElement> }) => {
  return (
    <div class="flex flex-grow">
      <IntroWrapper class="tags-body">
        <IntroContainer class="tags-div">
          <Intro />

          <Header />
          <Subheading>
            Full Stack | PWA | TypeScript | React | Tailwind | C#
          </Subheading>
          <Button page="about" class="mt-5 mb-[45px]">
            More About Me
          </Button>
        </IntroContainer>
      </IntroWrapper>
      <Art {...p} />
    </div>
  )
}

const IntroWrapper = tw.div`
  text-text-primary
  text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] 
  [font-family:'Special_Elite',cursive] font-black
  min-h-[400px]
  relative
  flex items-center flex-grow
  overflow-hidden z-[1]
`

const IntroContainer = tw.div`ml-[5%] max-[660px]:mt-[70px]`

const Header = () => {
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
      class={tw`
        text-text-primary text-left tracking-[2px] [line-height:1.2em] m-0 
        ${animatedShow$() && styles.animateTitle}
      `}
    >
      <WrapLetterInSpan>{homeIntroText[2]}</WrapLetterInSpan>
      <br />
      <WrapLetterInSpan>{homeIntroText[3]}</WrapLetterInSpan>
    </h1>
  )
}

const Subheading = tw.h3`
  text-lg text-text-subtle1 font-mono font-normal
  m-0 tracking-[-1px]
  text-nowrap text-ellipsis overflow-hidden
  [max-width:calc(100vw-32px)]
`

const WrapLetterInSpan = (p: { children: string }) => (
  <For each={p.children.split('')}>
    {c => (c === ' ' ? c : <span>{c}</span>)}
  </For>
)
