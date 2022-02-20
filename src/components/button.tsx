import { Link, LinkProps } from 'solid-app-router'
import {
  createEffect,
  createMemo,
  createSignal,
  JSX,
  on,
  onCleanup,
} from 'solid-js'
import { useBoundingRect, useRef } from '../hooks'
import { useAtom } from '../hooks/use-atom'
import { css, makeStyles, styled } from '../theme'
import {
  bindEventWithCleanup,
  debounce,
  log,
  throttle,
  withActions,
} from '../utils'
import { has, scope } from '../utils/lodash'

const backgroundStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`

const useStyles = makeStyles()({
  btn: ({ colors }) => css`
    --gradient-pos-x: 0px;
    --gradient-pos-y: 0px;
    --btn-color: ${colors.primary};
    --gradient-scale: 0.5;

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

    transition: color 0.4s;

    &:focus {
      box-shadow: 0 0 20px 1px var(--btn-color);
    }

    &:hover {
      color: ${colors.background};
    }

    & .${backgroundStyle} {
      background: radial-gradient(
        circle at var(--gradient-pos-x) var(--gradient-pos-y),
        var(--btn-color) 0%,
        rgba(0, 0, 0, 0) 70%
      );
    }
    &:hover .${backgroundStyle} {
      /* font-weight: 900;  */ /* changes btn width on firefox */
      background: radial-gradient(
        circle at var(--gradient-pos-x) var(--gradient-pos-y),
        var(--btn-color) calc(100% * var(--gradient-scale)),
        rgba(0, 0, 0, 0) 100%
      );
    }

    /* background: radial-gradient(
      circle at 0 0,
      var(--btn-color) 0%,
      rgba(0, 0, 0, 0) 50%
    ); */
    /* animation: all 1s; */
  `,
})

type ButtonProps = {
  children: JSX.Element
} & (
  | {
      onClick: JSX.DOMAttributes<HTMLButtonElement>['onClick']
    }
  | {
      href: LinkProps['href']
      onClick?: LinkProps['onClick']
    }
)
export const Button = (p: ButtonProps): JSX.Element => {
  type MousePosition = { x: number; y: number }
  const mousePosition$ = withActions(
    createSignal<MousePosition>({ x: 0, y: 0 }),
    set => ({
      track: throttle(20, (e: MouseEvent) =>
        set({ x: e.clientX, y: e.clientY }),
      ),
    }),
  )

  const ref = useRef()
  const boundingRect$ = useBoundingRect(ref)
  const gradient$ = (): { x: number; y: number; opacity: number } => {
    const rect = boundingRect$()
    if (!rect) return { x: 0, y: 0, opacity: 0 }
    const { x, y } = mousePosition$()
    const { left, right, top, bottom, width, height } = rect
    const buffer = 100

    // type Position =
    //   | 'topLeft'
    //   | 'top'
    //   | 'topRight'
    //   | 'left'
    //   | 'inside'
    //   | 'right'
    //   | 'bottomLeft'
    //   | 'bottom'
    //   | 'bottomRight'

    const distanceToElement = distanceToRect({ x, y }, rect)

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
      opacity:
        distanceToElement > buffer
          ? 0
          : distanceToElement === 0
          ? 1
          : (buffer - distanceToElement) / buffer,
    }
  }

  log.accessors({ boundingRect$ })

  const Component = has(p, 'href')
    ? (props: LinkProps) => <Link {...props} />
    : (props: JSX.DOMAttributes<HTMLButtonElement>) => <button {...props} />

  const styles = useStyles()

  // const hovering$ = useAtom(false)

  bindEventWithCleanup(window, 'mousemove', mousePosition$.track)

  // log.accessors({ opacity: () => gradient$().opacity })

  // createEffect(() => console.log(gradientPosition$().x, gradientPosition$().y))

  return (
    <>
      <Component
        ref={ref}
        class={styles.btn()}
        // onMouseMove={mousePosition$.track}
        onClick={p.onClick as any}
        href={(p as any).href}
        // onMouseOver={() => hovering$(true)}
        // onMouseOut={() => hovering$(false)}
        style={`
          --gradient-pos-x: ${gradient$().x}px; 
          --gradient-pos-y: ${gradient$().y}px;
        `}
      >
        <div
          class={backgroundStyle}
          style={`
          opacity: ${gradient$().opacity};
        `}
        />
        {p.children}
      </Component>
    </>
  )
}

const DebugCursor = () => {
  const mouse$ = useAtom<MouseEvent>()

  bindEventWithCleanup(document, 'mousemove', (e: MouseEvent) => {
    mouse$(e)
  })

  return (
    <div
      class={css`
        display: block;
        position: fixed;
        top: var(--mouse-y);
        left: var(--mouse-x);
        background-color: red;
        width: 10px;
        height: 10px;
        font-size: 16px;
      `}
      style={`
        --mouse-x: ${mouse$()?.pageX ?? 0}px; 
        --mouse-y: ${mouse$()?.pageY ?? 0}px;
      `}
    >
      {scope(() => {
        const mouse = mouse$()
        if (mouse) {
          const { x, y, clientX, clientY, pageX, pageY, offsetX, offsetY } =
            mouse

          return [
            { x, y },
            { clientX, clientY },
            { pageX, pageY },
          ].map((x, i) => <p>{JSON.stringify(x)}</p>)
        }
      })}
    </div>
  )
}

type Point = { x: number; y: number }
const distanceToPoint =
  (point1: Point) =>
  (point2: Point): number => {
    const a = point1.x - point2.x
    const b = point1.y - point2.y
    // console.log({ a, b, a2: a ** 2, b2: b ** 2 })
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
