import { ComponentProps, For, JSXElement, splitProps } from 'solid-js'
import { delayNavigationOnMobile } from '../../directives'
import { use } from '../../hooks'
import { css, keyframes, styled, useTheme, withClass } from '../../theme'
import { OmitSafe } from '../../types'
import { range } from '../../utils'

const tilesNum = 5

export const MediaLink = withClass('media-link')(
  (p: OmitSafe<ComponentProps<typeof LinkBase>, 'target' | 'rel' | 'ref'>) => {
    const [props, linkProps] = splitProps(p, ['children'])

    return (
      <LinkBase
        {...linkProps}
        target="_blank"
        rel="noopener"
        ref={use(delayNavigationOnMobile(200))}
      >
        <TileWrapper>
          <For each={range(tilesNum - 1)}>{() => <Tile />}</For>
          <Tile>{props.children}</Tile>
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
  const theme = useTheme()

  const colorAnimationIn = keyframes`
    to {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.background};
    }
  `

  const colorAnimationOut = keyframes`
    to {
      background-color: transparent;
      color: ${theme.colors.text.primary};
    }
  `

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid currentColor;
    border-radius: 5px;
    box-sizing: border-box;
    transition: all 0.7s;

    animation-duration: 0.4s;
    animation-fill-mode: forwards;

    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    animation-name: ${colorAnimationOut};

    .${MediaLink.class}:hover & {
      animation-name: ${colorAnimationIn};
    }
    ${range(tilesNum)
      .map(
        i => `
        &:nth-child(${i + 1}) {
          transform: translate(${i * 5}px, -${i * 5}px);
          opacity: ${(1 / tilesNum) * (i + 1)};
          animation-delay: ${(tilesNum - 1 - i) * 0.05}s;
        }
      `,
      )
      .join(' ')}

    &:last-child {
      animation-name: none;
    }
  `
}

const Tile = (p: { children?: JSXElement }) => {
  const styles = useTileStyles()
  return <span class={styles}>{p.children}</span>
}

// const hovering = (node: HTMLElement) => {
//   node.addEventListener('mouseover')
// }
