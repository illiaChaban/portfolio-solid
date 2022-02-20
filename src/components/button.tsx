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
    --mouse-pos-x: 0px;
    --mouse-pos-y: 0px;
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

    &:focus {
      box-shadow: 0 0 20px 1px var(--btn-color);
    }

    &:hover {
      color: ${colors.background};
    }

    & .${backgroundStyle} {
      background: radial-gradient(
        circle at var(--mouse-pos-x) var(--mouse-pos-y),
        var(--btn-color) 0%,
        rgba(0, 0, 0, 0) 70%
      );
      opacity: 0.4;
    }
    &:hover .${backgroundStyle} {
      /* font-weight: 900;  */ /* changes btn width on firefox */
      background: radial-gradient(
        circle at var(--mouse-pos-x) var(--mouse-pos-y),
        var(--btn-color) calc(100% * var(--gradient-scale)),
        rgba(0, 0, 0, 0) 100%
      );
      opacity: 1;
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
      track: throttle(
        20,
        (e: MouseEvent) => set({ x: e.clientX, y: e.clientY }),
        // set({ x: e.offsetX, y: e.offsetY }),
      ),
    }),
  )

  const ref = useRef()
  const boundingRect$ = useBoundingRect(ref)
  const gradientPosition$ = () => {
    const rect = boundingRect$()
    if (!rect) return { x: 0, y: 0 }
    const { x, y } = mousePosition$()
    const { left, right, top, bottom, width, height } = rect
    const yBuffer = 100
    const xBuffer = 150
    return {
      x:
        x > right + xBuffer
          ? width + xBuffer
          : x < left - xBuffer
          ? -xBuffer
          : x - left,
      y:
        y < top - yBuffer
          ? -yBuffer
          : y > bottom + yBuffer
          ? height + yBuffer
          : y - top,
    }
  }

  log.accessors({ boundingRect$ })

  // const isInRect$ = () => {
  //   const rect = boundingRect$()
  //   if (rect) {
  //     const { x, y } = mousePosition$()
  //     const { left, right, top, bottom } = rect
  //     const inside = x >= left && x <= right && y >= top && y <= bottom
  //     console.log({ x, y, left, right, top, bottom, inside })
  //     return inside
  //   }
  //   return false
  // }

  // log.accessors({ isInRect$ })

  const Component = has(p, 'href')
    ? (props: LinkProps) => <Link {...props} />
    : (props: JSX.DOMAttributes<HTMLButtonElement>) => <button {...props} />

  const styles = useStyles()

  const hovering$ = useAtom(false)

  // const mousePositionOutside$ = withActions(
  //   createSignal<MousePosition>({ x: 0, y: 0 }),
  //   set => ({
  //     track: throttle(10, (e: MouseEvent) =>
  //       set({ x: e.offsetX, y: e.offsetY }),
  //     ),
  //   }),
  // )
  bindEventWithCleanup(window, 'mousemove', mousePosition$.track)
  // document.addEventListener('mousemove', mousePosition$.track)
  // onCleanup

  // const gradientScale$ = useAtom(0.5)

  // createEffect(
  //   on(hovering$, hovering => {
  //     if (hovering) {
  //       gradientScale$(0)
  //       const id = setInterval(() => {
  //         const scale = gradientScale$()
  //         if (scale >= 0.5) {
  //           clearInterval(id)
  //           gradientScale$(0.5)
  //           return
  //         }
  //         const newScale = scale + 0.005
  //         gradientScale$(newScale)
  //       }, 5)
  //       onCleanup(() => clearInterval(id))
  //     }
  //   }),
  // )
  // log.accessors({ boundingRect$ })
  // log.accessors({ hovering$ })
  // log.accessors({ gradientPosition$ })
  createEffect(() => console.log(gradientPosition$().x, gradientPosition$().y))
  // log.accessors({ mousePosition$ })
  // log.accessors({ gradientScale$ })

  return (
    <>
      <Component
        ref={ref}
        class={styles.btn()}
        // onMouseMove={mousePosition$.track}
        onClick={p.onClick as any}
        href={(p as any).href}
        onMouseOver={() => hovering$(true)}
        onMouseOut={() => hovering$(false)}
        style={`
        --mouse-pos-x: ${gradientPosition$().x}px; 
        --mouse-pos-y: ${gradientPosition$().y}px;
      `}
      >
        <div class={backgroundStyle} />
        {p.children}
      </Component>
      {/* <DebugCursor /> */}
    </>
  )
}

const DebugCursor = () => {
  const mouse$ = useAtom<MouseEvent>()

  bindEventWithCleanup(document, 'mousemove', (e: MouseEvent) => {
    // const { x, y, clientX, clientY, pageX, pageY, offsetX, offsetY } = e
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

          // return JSON.stringify({
          //   x,
          //   y,
          //   clientX,
          //   clientY,
          //   pageX,
          //   pageY,
          //   offsetX,
          //   offsetY,
          // })
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

// const linear = (time, ) => {
//   requ
// }
