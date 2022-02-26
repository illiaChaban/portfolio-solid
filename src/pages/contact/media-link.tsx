import {
  ComponentProps,
  createEffect,
  For,
  JSXElement,
  splitProps,
} from 'solid-js'
import { delayNavigationOnMobile } from '../../directives'
import { use, useHovering, useRef } from '../../hooks'
import { css, styled, useTheme, withClass } from '../../theme'
import { OmitSafe } from '../../types'
import { range } from '../../utils'

const tilesNum = 5

export const MediaLink = withClass('media-link')(
  (p: OmitSafe<ComponentProps<typeof LinkBase>, 'target' | 'rel' | 'ref'>) => {
    const [props, linkProps] = splitProps(p, ['children'])

    const [hovering$, registerHovering] = useHovering()

    return (
      <LinkBase
        {...linkProps}
        target="_blank"
        rel="noopener"
        ref={use(delayNavigationOnMobile(200), registerHovering)}
      >
        <TileWrapper>
          <For each={range(tilesNum)}>
            {i => (
              <Tile hovering={hovering$()} index={i}>
                {tilesNum - 1 === i && props.children}
              </Tile>
            )}
          </For>
        </TileWrapper>
      </LinkBase>
    )
  },
)

const LinkBase = styled('a')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Inconsolata', 'Saira', monospace;
  -webkit-tap-highlight-color: transparent;
`

const TileWrapper = styled('div')`
  position: relative;
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  transform: rotate(-35deg) skew(20deg);
`

const useTileStyles = () => {
  // const theme = useTheme()

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid currentColor;

    border-radius: 5px;
    box-sizing: border-box;
    transition: all 0.4s;

    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    ${range(tilesNum)
      .map(
        i => `
        &:nth-child(${i + 1}) {
          transform: translate(${i * 5}px, -${i * 5}px);
          opacity: ${(1 / tilesNum) * (i + 1)};
          .${MediaLink.class}:hover & {
            transform: translate(${i * 5}px, -${i * 5}px) scale(1.05);
          }
        }
      `,
      )
      .join(' ')}
  `
}

const Tile = (p: {
  children?: JSXElement
  hovering: boolean
  index: number
}) => {
  const styles = useTileStyles()
  const ref = useRef<HTMLSpanElement>()

  const theme = useTheme()

  createEffect(() => {
    if (p.hovering) {
      ref.current.animate(
        {
          backgroundColor: theme.colors.primary,
          color: theme.colors.background,
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
          color: theme.colors.text.primary,
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
    <span ref={ref} class={styles}>
      {p.children}
    </span>
  )
}
