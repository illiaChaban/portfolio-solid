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
import { OmitSafe, Page } from '../types'
import { bindEventWithCleanup, throttle, withActions } from '../utils'
import { has, minMax, pick } from '../utils/lodash'
import { tw } from '../utils/tw'
import styles from './button.module.css'

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

  return (
    <>
      <Component
        ref={use(rect$.track, ripple)}
        // using hover detected with JS, because CSS doesn't react to scroll
        // even when mouse is over the button
        class={tw`
          [--btn-color:theme(colors.highlight)]
          relative inline-block p-3
          rounded-md border border-solid border-[--btn-color]
          bg-transparent 
          font-serif font-normal uppercase no-underline text-2xl
          cursor-pointer outline-none
          overflow-hidden
          [transition:color_.4s]
          [box-shadow:0_0_10px_var(--btn-color)] 
          focus:[box-shadow:0_0_20px_1px_var(--btn-color)]
          ${
            gradient$().isHovering
              ? 'text-[--tw-background]'
              : 'text-[--btn-color]'
          }
          ${p.class}
        `}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={p.onClick as any}
      >
        <Backdrop
          style={{
            opacity: gradient$().opacity,
            background: `radial-gradient(
              circle at ${gradient$().x}px ${gradient$().y}px,
              var(--btn-color) calc(100% * ${gradient$().from}),
              rgba(0, 0, 0, 0) calc(100% * ${gradient$().to})
            )`,
          }}
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

const Backdrop = tw.div`absolute inset-0 z-[-1] pointer-events-none`

const ripple = (button: HTMLElement) => {
  const rect$ = useRect()
  rect$.track(button)

  bindEventWithCleanup(button, 'click', (e: MouseEvent) => {
    const rect = rect$()!

    const duration = 2000

    const distanceToClick = distanceToPoint({ x: e.pageX, y: e.pageY })

    const distanceToFurthestCorner = [
      { x: rect.left, y: rect.top },
      { x: rect.left, y: rect.bottom },
      { x: rect.right, y: rect.top },
      { x: rect.right, y: rect.bottom },
    ].reduce((distance, point) => {
      return Math.max(distance, distanceToClick(point))
    }, 0)

    const radius = distanceToFurthestCorner
    const diameter = radius * 2

    createRoot(dispose => {
      const els = children(() => (
        <Ripple
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            left: `${e.pageX - (rect.left + radius)}px`,
            top: `${e.pageY - (rect.top + radius)}px`,
            'animation-duration': `${duration}ms`,
          }}
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

const Ripple = tw.span`absolute rounded-circle ${styles.ripple}`

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
