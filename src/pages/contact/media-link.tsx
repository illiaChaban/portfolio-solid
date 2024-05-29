import {
  ComponentProps,
  createEffect,
  For,
  JSX,
  JSXElement,
  splitProps,
} from 'solid-js'
import { delayNavigationOnTouch } from '../../directives'
import { use, useHovering, useRef } from '../../hooks'
import { OmitSafe } from '../../types'
import { range } from '../../utils'
import { tw } from '../../utils/tw'

const tilesNum = 5

export const MediaLink = (
  p: OmitSafe<ComponentProps<typeof LinkBase>, 'target' | 'rel' | 'ref'>,
) => {
  const [props, linkProps] = splitProps(p, ['children'])

  const [hovering$, registerHovering] = useHovering()

  return (
    <LinkBase
      {...linkProps}
      target="_blank"
      rel="noopener"
      ref={use(delayNavigationOnTouch(400), registerHovering)}
    >
      <TileWrapper>
        <For each={range(tilesNum)}>
          {i => {
            const isLast = tilesNum - 1 === i
            return (
              <Tile
                hovering={hovering$()}
                index={i}
                class={tw`
                  size-full
                  border border-solid rounded-md
                  box-border 
                  [transition:all_0.4s]
                  ${
                    isLast
                      ? 'flex justify-center items-center relative overflow-hidden'
                      : 'absolute top-0 left-0'
                  }
                `}
                style={{
                  transform: `translate(${i * 5}px, -${i * 5}px) scale(0.6)`,
                  opacity: `${(1 / tilesNum) * (i + 1)}`,
                }}
              >
                {isLast && props.children}
              </Tile>
            )
          }}
        </For>
      </TileWrapper>
    </LinkBase>
  )
}

const LinkBase = tw('a')`
  relative block size-[5.25rem]
  text-text-primary font-mono text-5xl no-underline 
  [-webkit-tap-highlight-color:transparent]
`

const TileWrapper = tw('div')`
  size-full
  [transform:rotate(-35deg)_skew(20deg)_translate(-10px,10px)]
`

const Tile = (p: {
  children?: JSXElement
  hovering: boolean
  index: number
  style?: JSX.CSSProperties
  class?: string
}) => {
  const ref = useRef<HTMLSpanElement>()

  createEffect(() => {
    if (p.hovering) {
      ref.current.animate(
        {
          backgroundColor: 'var(--tw-colors-highlight)',
          color: 'var(--tw-background)',
          scale: 1.08,
        },
        {
          duration: 150,
          delay: (tilesNum - 1 - p.index) * 35,
          fill: 'forwards',
        },
      )
    } else {
      ref.current.animate(
        {
          backgroundColor: 'transparent',
          color: 'var(--tw-colors-text-primary)',
          scale: 1,
        },
        {
          duration: 150,
          delay: p.index * 35,
          fill: 'forwards',
        },
      )
    }
  })

  return (
    <span ref={ref} class={p.class} style={p.style}>
      {p.children}
    </span>
  )
}
