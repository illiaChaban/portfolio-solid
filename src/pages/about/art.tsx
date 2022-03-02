import { createEffect, lazy, on, onMount, Suspense } from 'solid-js'
import { Button } from '../../components'
import { BlobSpinner } from '../../components/blob-spinner'
import { useAtom, useRef } from '../../hooks'
import { css, styled, useTheme } from '../../theme'
import { media, scope, wait, withActions } from '../../utils'
import { TextTyper } from './text-typer'

const lazyUtil = (fn: () => Promise<any>) =>
  lazy(() => wait(1000).then(() => fn()))
const AsyncSimpson = lazyUtil(() => import('./images/simpson'))

export const Art = () => {
  const { breakpoints, colors } = useTheme()

  const art$ = scope(() => {
    const artConfig = useArtConfig()
    const index$ = useAtom(0)
    return Object.assign(() => artConfig[index$()], {
      next: () => index$(v => (v + 1) % artConfig.length),
    })
  })

  const quotationRef = useRef<HTMLElement>()
  const authorRef = useRef<HTMLElement>()
  const imgContainerRef = useRef<HTMLElement>()

  onMount(() => {
    const quoteTyper = new TextTyper(quotationRef.current, 15, 70)
    const authorTyper = new TextTyper(authorRef.current, 20, 80)

    createEffect(
      on(art$, ({ quote, imgUrl, colors }) => {
        const [quotation, author] = quote
        quoteTyper.clearNow()
        authorTyper.clearNow().removeCursor()

        quoteTyper
          .addCursor()
          .type(quotation)
          .removeCursor()
          .chain(() => {
            authorTyper.addCursor().type(author)
          })
      }),
    )
  })

  // this.updateArt();
  // this.bindArtButton();

  return (
    <Wrapper>
      <Container>
        <ImgWrapper id="img" ref={imgContainerRef}>
          <Suspense fallback={<BlobSpinner />}>
            <AsyncSimpson />
          </Suspense>
        </ImgWrapper>
        <Quote>
          <Quotation>
            <span ref={quotationRef}></span>
          </Quotation>
          <Author ref={authorRef}></Author>
        </Quote>
        <Button onClick={art$.next}>More wisdom</Button>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

const Container = styled('div')`
  min-width: 400px;
  min-height: 400px;
  width: 400px;
  position: relative;
  bottom: 5%;

  ${({ theme }) => theme.breakpoints.down(780)} {
    min-width: auto;
    padding: 10px;
  }
`

const ImgWrapper = styled('div')`
  width: 100%;
  height: 400px;
  position: relative;

  & svg {
    opacity: 0.5;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
  }

  ${({ theme }) => media(theme.breakpoints.down(780))} {
    height: 320px;
    & svg {
      max-height: 100%;
    }
  }
`

const Quote = styled('div')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Inconsolata', sans-serif; /* 'Special Elite',  */
  font-size: 0.9rem;
  line-height: 1.2rem;
  /* color: var(--color-subtle); */
  position: relative;
  min-height: 4rem;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
`

const Quotation = styled('div')`
  &::before,
  &::after {
    color: ${({ theme }) => theme.colors.text.subtle1};
  }
  &::before {
    content: '<< ';
  }
  &::after {
    content: ' >>';
  }
`

const Author = styled('div')`
  color: var(--color-highlight);
  opacity: 0.8;
`

const useArtConfig = (): {
  imgUrl: string
  colors: string[]
  quote: [string, string]
}[] => {
  const { colors } = useTheme()

  const gray = '#afadad'
  return [
    {
      imgUrl: 'imgs/quotes/simpsons.svg',
      colors: [colors.text.primary, 'black', gray, colors.primary],

      // imgUrl: 'imgs/quotes/simpsons1.svg',
      // colors: ['black', colors.text.primary, gray],
      quote: ['Find what you love and follow it to glory.', '- The Simpsons'],
    },
    {
      imgUrl: 'imgs/quotes/todd.svg',
      colors: [
        'black',
        colors.text.primary,
        colors.text.subtle1,
        colors.primary,
      ],
      quote: [
        'I never know if I can handle anything! That’s what makes my life so exciting.',
        '- Todd from BoJack Horseman',
      ],
    },
    {
      imgUrl: 'imgs/quotes/feynman.svg',
      colors: [colors.text.primary, gray, 'black'],
      // quote: ["I'm smart enough to know that I'm dumb.", "- Richard Feynman"],
      quote: [
        'The first principle is that you must not fool yourself and you are the easiest person to fool.',
        '- Richard Feynman',
      ],
    },
    {
      imgUrl: 'imgs/quotes/gandhi1.svg',
      colors: ['black', colors.text.primary, gray],
      quote: [
        'A man is but the product of his thoughts. What he thinks, he becomes.',
        '- Mahatma Gandhi',
      ],
    },
    {
      imgUrl: 'imgs/quotes/lee7.svg',
      colors: ['black', colors.text.primary, gray],
      quote: [
        'Knowing is not enough, we must apply. Willing is not enough, we must do.',
        '- Bruce Lee',
      ],
    },
  ]
}
