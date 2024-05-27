import { Component, createEffect, lazy, on, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Button } from '../../../components'
import { SpinnerSuspence } from '../../../components/spinner-suspence'
import { useAtom, useRef } from '../../../hooks'
import { scope } from '../../../utils'
import { tw } from '../../../utils/tw'
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

const Container = tw('div')`
  min-h-[400px] w-[400px] max-w-[100vw]
  relative bottom-[5%]
  max-sm_md:min-w-[auto] max-sm_md:p-2.5
`

const ImgWrapper = tw('div')`
  w-full h-[400px] max-sm_md:h-[320px]
  relative
  [&>svg]:opacity-50
  [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-sm_md:max-h-full
  [&>svg]:absolute [&>svg]:bottom-0
`

// TODO: replace with text-sm & py-4 ?
const Quote = tw('div')`
  text-text-primary
  font-mono 
  [font-size:0.9rem] [line-height:1.2rem]
  relative
  min-h-[4rem]
  py-[15px]
  flex flex-col
`

const Quotation = tw('div')`
  before:text-text-subtle1 after:text-text-subtle1
  before:content-['<<_'] after:content-['_>>']
`

const Author = tw('div')`text-highlight opacity-80`

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
