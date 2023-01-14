import { LinkProps } from '@solidjs/router'
import {
  Accessor,
  children,
  createMemo,
  createRoot,
  createSignal,
  JSX,
} from 'solid-js'
import { PageLinkBase, PageLinkBaseProps } from '.'
import { use, useRect } from '../hooks'
import { css, keyframes, styled, useTheme } from '../theme'
import { OmitSafe, Page } from '../types'
import {
  bindEvent,
  bindEventWithCleanup,
  cx,
  isTruthy,
  throttle,
  withActions,
} from '../utils'
import { has, minMax, pick } from '../utils/lodash'

const useStyles = () => {
  const { colors } = useTheme()
  return {
    btn: css`
      --btn-color: ${colors.primary};

      position: relative;

      box-shadow: 0 0 10px var(--btn-color);
      text-decoration: none;
      color: var(--btn-color);
      background: transparent;
      font-weight: 100;

      padding: 8px 12px;
      border-radius: 5px;
      border: 1px solid var(--btn-color);

      font-family: 'Saira', Helvetica, Arial, sans-serif;
      font-size: 1.5rem;

      display: inline-block;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      overflow: hidden;

      transition: color 0.4s;

      &:focus {
        box-shadow: 0 0 20px 1px var(--btn-color);
      }
    `,
    hover: css`
      color: ${colors.background};
    `,
  }
}

type ButtonProps = {
  children: JSX.Element
  class?: string
} & (
  | {
      onClick?: JSX.DOMAttributes<HTMLButtonElement>['onClick']
    }
  | {
      page: Page
      onClick?: LinkProps['onClick']
    }
)
export const Button = (p: ButtonProps): JSX.Element => {
  const mousePosition$ = useMousePosition()

  const rect$ = useRect()
  const gradient$ = createMemo(
    (): Record<'x' | 'y' | 'opacity' | 'from' | 'to', number> & {
      isHovering: boolean
    } => {
      const rect = rect$()
      if (!rect)
        return { x: 0, y: 0, opacity: 0, from: 0, to: 0, isHovering: false }
      const { x, y } = mousePosition$()
      const { left, right, top, bottom } = rect
      const width = right - left
      const height = bottom - top

      const buffer = 100

      const distanceToElement = distanceToRect({ x, y }, rect)

      const closeness =
        distanceToElement > buffer
          ? 0
          : distanceToElement === 0
          ? 1
          : (buffer - distanceToElement) / buffer

      return {
        x:
          x > right + buffer
            ? width + buffer
            : x < left - buffer
            ? -buffer
            : x - left,
        y:
          y < top - buffer
            ? -buffer
            : y > bottom + buffer
            ? height + buffer
            : y - top,
        opacity: closeness === 1 ? 1 : closeness * 0.5,
        from: closeness === 1 ? 0.5 : closeness * 0.1,
        to: closeness === 1 ? 1 : minMax(0.3, 0.7)(closeness),
        isHovering: closeness === 1,
      }
    },
  )

  const Component = has(p, 'page')
    ? (props: OmitSafe<PageLinkBaseProps, 'page'>) => (
        <PageLinkBase {...props} page={p.page} />
      )
    : (props: JSX.DOMAttributes<HTMLButtonElement>) => <button {...props} />

  const styles = useStyles()

  return (
    <>
      <Component
        ref={use(rect$.track, ripple)}
        class={cx(
          styles.btn,
          // using hover detected with JS, because CSS doesn't react to scroll
          // even when mouse is over the button
          gradient$().isHovering && styles.hover,
          p.class,
        )}
        onClick={p.onClick as any}
      >
        <Backdrop
          style={`
            opacity: ${gradient$().opacity};
            background: radial-gradient(
              circle at ${gradient$().x}px ${gradient$().y}px,
              var(--btn-color) calc(100% * ${gradient$().from}),
              rgba(0, 0, 0, 0) calc(100% * ${gradient$().to})
            );
          `}
        />
        {p.children}
      </Component>
    </>
  )
}

type MousePosition = Point & { scrollY: number }
const useMousePosition = (): Accessor<Point> => {
  const mousePosition$ = withActions(
    createSignal<MousePosition>({ x: 0, y: 0, scrollY: window.scrollY }),
    set => ({
      track: throttle(10, (e: MouseEvent) => {
        set({ x: e.pageX, y: e.pageY, scrollY: window.scrollY })
      }),
      trackScroll: throttle(10, () => {
        set(({ x, y, scrollY }) => {
          const scrollDiff = window.scrollY - scrollY
          return { x, y: y + scrollDiff, scrollY: window.scrollY }
        })
      }),
    }),
  )
  bindEventWithCleanup(window, 'mousemove', mousePosition$.track)

  bindEventWithCleanup(window, 'scroll', mousePosition$.trackScroll)
  return () => pick(mousePosition$(), ['x', 'y'])
}

const Backdrop = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;
`

const ripple = (button: HTMLElement) => {
  const rect$ = useRect()
  rect$.track(button)

  // Not using bindEventWithCleanup due to Solid bug where it's calling
  // on cleanup right away if there's a signal used in the className on the
  // element. Ref: https://github.com/solidjs/solid/issues/903
  bindEvent(button, 'click', (e: MouseEvent) => {
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    const rect = rect$()!

    const duration = 600

    createRoot(dispose => {
      const els = children(() => (
        <Ripple
          style={`
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${e.pageX - (rect.left + radius)}px;
            top: ${e.pageY - (rect.top + radius)}px;
            animation-duration: ${duration}ms;
          `}
        />
      ))
        .toArray()
        .filter(el => el instanceof HTMLElement) as HTMLElement[]

      button.append(...els)
      setTimeout(() => {
        dispose()
        els.forEach(el => el.remove())
      }, duration)
    })
  })
}

const Ripple = styled('span')`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ${keyframes`
    to {
      transform: scale(4);
      opacity: 0;
    }
  `} linear;
  background-color: rgba(0, 0, 0, 0.3);
`

type Point = { x: number; y: number }
const distanceToPoint =
  (point1: Point) =>
  (point2: Point): number => {
    const a = point1.x - point2.x
    const b = point1.y - point2.y
    return Math.sqrt(a ** 2 + b ** 2)
  }

type Rect = { top: number; bottom: number; left: number; right: number }
const distanceToRect = (point: Point, rect: Rect): number => {
  const { x, y } = point
  const { top, bottom, right, left } = rect
  type Position = {
    x: 'left' | 'inside' | 'right'
    y: 'top' | 'inside' | 'bottom'
  }
  const pos: Position = {
    x: x < left ? 'left' : x > right ? 'right' : 'inside',
    y: y < top ? 'top' : y > bottom ? 'bottom' : 'inside',
  }
  type StringPosition = `${Position['x']}${Position['y']}`

  const distanceTo = distanceToPoint(point)
  const positionToDistance: Record<StringPosition, () => number> = {
    insidetop: () => top - y,
    insidebottom: () => y - bottom,
    insideinside: () => 0,
    leftinside: () => left - x,
    lefttop: () => distanceTo({ x: left, y: top }),
    leftbottom: () => distanceTo({ x: left, y: bottom }),
    rightinside: () => x - right,
    righttop: () => distanceTo({ x: right, y: top }),
    rightbottom: () => distanceTo({ x: right, y: bottom }),
  }
  return positionToDistance[`${pos.x}${pos.y}`]()
}
