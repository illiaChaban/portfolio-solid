import { Component, createEffect, lazy, on, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Button } from '../../../components'
import { SpinnerSuspence } from '../../../components/spinner-suspence'
import { useAtom, useRef } from '../../../hooks'
import { styled } from '../../../theme'
import { media, scope } from '../../../utils'
import { TextTyper } from './text-typer'

export const Art = () => {
  const art$ = scope(() => {
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
      on(art$, ({ quote }) => {
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

  return (
    <Container>
      <ImgWrapper id="img" ref={imgContainerRef}>
        <SpinnerSuspence>
          <Dynamic component={art$().Image} />
        </SpinnerSuspence>
      </ImgWrapper>
      <Quote>
        <Quotation>
          <span ref={quotationRef} />
        </Quotation>
        <Author ref={authorRef} />
      </Quote>
      <Button onClick={art$.next}>More wisdom</Button>
    </Container>
  )
}

const Container = styled('div')`
  min-height: 400px;
  width: 400px;
  max-width: 100vw;
  position: relative;
  bottom: 5%;

  ${({ theme }) => media(theme.breakpoints.down(780))} {
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

//TODO: test how much memory it takes to load these images in prod
// VS in dev VS vanilla JS
const artConfig: {
  Image: Component
  quote: [string, string]
}[] = [
  {
    Image: lazy(() => import('./images/simpson')),
    quote: ['Find what you love and follow it to glory.', '- The Simpsons'],
  },
  {
    Image: lazy(() => import('./images/todd')),
    quote: [
      'I never know if I can handle anything! That’s what makes my life so exciting.',
      '- Todd from BoJack Horseman',
    ],
  },
  {
    Image: lazy(() => import('./images/feynman')),
    quote: [
      'The first principle is that you must not fool yourself and you are the easiest person to fool.',
      '- Richard Feynman',
    ],
  },
  {
    Image: lazy(() => import('./images/gandhi')),
    quote: [
      'A man is but the product of his thoughts. What he thinks, he becomes.',
      '- Mahatma Gandhi',
    ],
  },
  {
    Image: lazy(() => import('./images/lee')),
    quote: [
      'Knowing is not enough, we must apply. Willing is not enough, we must do.',
      '- Bruce Lee',
    ],
  },
]
