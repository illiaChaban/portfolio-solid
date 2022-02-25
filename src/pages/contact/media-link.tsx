import {
  Accessor,
  ComponentProps,
  For,
  JSX,
  JSXElement,
  splitProps,
} from 'solid-js'
import {
  css,
  styled,
  keyframes,
  makeStyles,
  Theme,
  useTheme,
  withClass,
} from '../../theme'
import { use, useMediaQuery } from '../../hooks'
import { StyledProps } from '../../theme'
import { AnyObj, FC, OmitSafe } from '../../types'
import {
  range,
  cx,
  scope,
  isString,
  hoverMedia,
  log,
  negate,
  bindEventWithCleanup,
} from '../../utils'
import { useNavigate } from 'solid-app-router'
import { delayNavigationOnMobile } from '../../directives'

const styles = scope(() => {
  const tileStatic = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    /* transition-property: opacity, transform;
  transition-duration: 0.5s; */
    border: 1px solid currentColor;
    /* border-color: var(--color-main); */
    border-radius: 5px;
    box-sizing: border-box;
    transition: all 100ms;

    animation-duration: 1.3s;
    animation-iteration-count: infinite;
    /* animation-direction: linear; */

    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
  `

  const positionAnimation = (index: number) => keyframes`
    /* Can't use css vars in keyframes? */
    from, to {
      transform: ${`translate(${index * 5}px, -${index * 5}px)`};
    }
    50% {
      transform: ${`translate(${index * 5 + 3}px, -${index * 5 + 3}px)`};
    }
  `
  const colorAnimation = keyframes`
    /* Can't use css vars in keyframes? */
    from, to {
      /* same as main text color */
      /* color: currentColor;
      border-color: currentColor; */
      background-color: #7fffff;
    }
    50% {
      /* same as highlight color */
      /* color: #7fffff;
      border-color: #7fffff; */
      border-color: transparent;
      color: transparent;
      background-color: transparent;
    }
  `

  const tileDynamic = ({ index }: { index: number }) => css`
    transform: translate(${index * 5}px, -${index * 5}px);
    opacity: ${0.2 * (index + 1)};

    animation-delay: ${index * 0.1}s;
    /* animation-name: ${[colorAnimation, positionAnimation(index)].join(
      ', ',
    )}; */
    /* animation-name: ${colorAnimation}; */
    &:last-child {
      animation-name: none;
    }
  `

  return {
    tileStatic,
    tileDynamic,
    colorAnimation,
    positionAnimation,
  }
})

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
        <div>
          <For each={range(4)}>
            {i => (
              <Tile
                class={styles.tileDynamic({
                  index: i,
                })}
              />
            )}
          </For>
          <Tile
            // TODO: try to upgrade solid-styled-components OR open an issue
            // eslint-disable-next-line solid/no-react-specific-props
            class={cx(styles.tileDynamic({ index: 4 }))}
          >
            {props.children}
          </Tile>
        </div>
      </LinkBase>
    )
  },
)

const Tiles = (p: { children?: JSXElement }) => {}

const Tile = (p: { children?: JSXElement; class?: string }) => (
  <span class={cx(styles.tileStatic, p.class)}>{p.children}</span>
)

const LinkBase = styled('a')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'Inconsolata', 'Saira', monospace;
  transition: all 100ms;
  -webkit-tap-highlight-color: transparent;

  & > div {
    position: relative;
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    /* transition: transform 0.3s; */
    transform: rotate(-35deg) skew(20deg);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    /* & .${styles.tileStatic} {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background} !important;
    } */

    & .${styles.tileStatic} {
      animation-name: ${styles.colorAnimation};
      background-color: ${({ theme }) => theme.colors.primary};
      &:last-child {
        animation-name: none;
      }
    }
  }

  /* &:hover > div {
    transform: rotate(-35deg) skew(20deg);
  } */

  /* ****************** */
  /* PREVENTING FLICKERING ON HOVER BECAUSE OF ROTATING AND SKEW TRANSFORMATIONS*/
  /* & {
    display: block;
    position: relative;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    transition: all 0.3s;
  }
  &:hover::after {
    --transformed-box-diagonal-length: 164%;
    width: var(--transformed-box-diagonal-length);
    left: calc((100% - var(--transformed-box-diagonal-length)) / 2);
  } */
`

// const tileStatic = css`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   transition: 0.5s;
//   /* transition-property: opacity, transform;
// transition-duration: 0.5s; */
//   border: 1px solid currentColor;
//   /* border-color: var(--color-main); */
//   border-radius: 5px;
//   box-sizing: border-box;
//   transition: all 100ms;

//   animation-duration: 1.3s;
//   animation-iteration-count: infinite;
//   /* animation-direction: linear; */

//   &:last-child {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     overflow: hidden;
//   }
// `
// const Tile = withClasses(
//   (p: JSX.HTMLAttributes<HTMLSpanElement>) => <span {...p} />,
//   tileStatic,
// )
