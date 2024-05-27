import {
  ComponentProps,
  createEffect,
  For,
  JSXElement,
  splitProps,
} from 'solid-js'
import { delayNavigationOnTouch } from '../../directives'
import { use, useHovering, useRef } from '../../hooks'
import { css, styled, useTheme, withUniqueClass } from '../../theme'
import { OmitSafe } from '../../types'
import { range } from '../../utils'

const tilesNum = 5

export const MediaLink = withUniqueClass('media-link')((
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
          {i => (
            <Tile hovering={hovering$()} index={i}>
              {tilesNum - 1 === i && props.children}
            </Tile>
          )}
        </For>
      </TileWrapper>
    </LinkBase>
  )
})

const LinkBase = styled('a')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Inconsolata', 'Saira', monospace;
  -webkit-tap-highlight-color: transparent;
  display: block;
  width: 5.25rem;
  height: 5.25rem;
  position: relative;
  font-size: 3rem;
  text-decoration: none;
`

const TileWrapper = styled('div')`
  width: 100%;
  height: 100%;
  transform: rotate(-35deg) skew(20deg) translate(-10px, 10px);
`

const useTileStyles = () => {
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
          transform: translate(${i * 5}px, -${i * 5}px) scale(0.6);
          opacity: ${(1 / tilesNum) * (i + 1)};
          .${MediaLink.class}:hover & {
            transform: translate(${i * 5}px, -${i * 5}px) scale(0.65);
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
