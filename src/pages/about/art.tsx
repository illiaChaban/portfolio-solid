import {
  Component,
  createEffect,
  JSX,
  lazy,
  on,
  onMount,
  Suspense,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Transition } from 'solid-transition-group'
import { Button } from '../../components'
import { BlobSpinner } from '../../components/blob-spinner'
import { useAtom, useRef } from '../../hooks'
import { styled } from '../../theme'
import { flow, media, scope } from '../../utils'
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
    <Wrapper>
      <Container>
        <ImgWrapper id="img" ref={imgContainerRef}>
          <SuspenceWithSpinner>
            <Dynamic component={art$().Image} />
          </SuspenceWithSpinner>
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

const SuspenceWithSpinner = (p: { children?: JSX.Element }) => {
  const getElOpacity = flow(getComputedStyle, ({ opacity }) =>
    Number(opacity || '1'),
  )
  return (
    <Transition
      onEnter={(el, done) => {
        console.log('enter', getElOpacity(el))
        el.animate([{ opacity: 0 }, { opacity: getElOpacity(el) }], {
          duration: 200,
        }).finished.then(done)
      }}
      onExit={(el, done) => {
        console.log('exit', getElOpacity(el))

        const isSpinner = el.tagName === 'DIV'
        el.animate([{ opacity: getElOpacity(el) }, { opacity: 0 }], {
          duration: isSpinner ? 400 : 200,
        }).finished.then(done)
      }}
    >
      <Suspense fallback={<BlobSpinner />}>{p.children}</Suspense>
    </Transition>
  )
}

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
