import { Link, LinkProps } from 'solid-app-router'
import { createRoot, createSignal, JSX } from 'solid-js'
import { use, useBoundingRect, useRef } from '../hooks'
import { css, keyframes, makeStyles, styled } from '../theme'
import { bindEventWithCleanup, throttle, withActions } from '../utils'
import { has, minMax } from '../utils/lodash'

const useStyles = makeStyles()({
  btn: ({ colors }) => css`
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

    &:hover {
      color: ${colors.background};
      /* font-weight: 900;  */ /* changes btn width on firefox */
    }
  `,
})

type ButtonProps = {
  children: JSX.Element
} & (
  | {
      onClick?: JSX.DOMAttributes<HTMLButtonElement>['onClick']
    }
  | {
      href: LinkProps['href']
      onClick?: LinkProps['onClick']
    }
)
export const Button = (p: ButtonProps): JSX.Element => {
  const mousePosition$ = withActions(
    createSignal<Point>({ x: 0, y: 0 }),
    set => ({
      track: throttle(10, (e: MouseEvent) =>
        set({ x: e.clientX, y: e.clientY }),
      ),
    }),
  )

  const boundingRect$ = useBoundingRect()
  const gradient$ = (): Record<
    'x' | 'y' | 'opacity' | 'from' | 'to',
    number
  > => {
    const rect = boundingRect$()
    if (!rect) return { x: 0, y: 0, opacity: 0, from: 0, to: 0 }
    const { x, y } = mousePosition$()
    const { left, right, top, bottom, width, height } = rect
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
    }
  }

  const Component = has(p, 'href')
    ? (props: LinkProps) => <Link {...props} />
    : (props: JSX.DOMAttributes<HTMLButtonElement>) => <button {...props} />

  const styles = useStyles()

  bindEventWithCleanup(window, 'mousemove', mousePosition$.track)

  return (
    <>
      <Component
        ref={use(boundingRect$.track, ripple)}
        class={styles.btn()}
        onClick={p.onClick as any}
        href={(p as any).href}
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
  const boundingRect$ = useBoundingRect()
  boundingRect$.track(button)

  bindEventWithCleanup(button, 'click', (e: MouseEvent) => {
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    const rect = boundingRect$()!

    const duration = 600

    const [rippleEl, dispose] = createRoot(dispose => [
      <Ripple
        style={`
          width: ${diameter}px;
          height: ${diameter}px;
          left: ${e.clientX - (rect.left + radius)}px;
          top: ${e.clientY - (rect.top + radius)}px;
          animation-duration: ${duration}ms;
        `}
      />,
      dispose,
    ])

    button.append(rippleEl as HTMLElement)
    setTimeout(() => {
      dispose()
      ;(rippleEl as HTMLElement).remove()
    }, duration)
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
