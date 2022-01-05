import { createComputed, createEffect, createMemo } from "solid-js"
import { css } from "solid-styled-components"
import { useAtom } from "../../hooks/use-atom"

export const Fps = () => {
  const fps$ = useAtom<number>()

  // setInterval(() => {
  //   getFps().then(fps$)
  // }, 50)

  trackFps(fps$)

  const minFps$ = createMemo((prev?: number) => {
    return Math.min(fps$() ?? Infinity, prev ?? Infinity)
  })

  return (
    <div class={css`
      position: fixed;
      top: 0;
      left: 0;
      background: black;
      border-radius: 16px;
      min-height: 50px;
      min-width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5000;
    `}>

      FPS: {fps$()}<br/>
      Min fps: {minFps$()}
    </div>
  )
}

const getFps = async () => {
  return new Promise((res) => {
    requestAnimationFrame(time => {
      requestAnimationFrame(time2 => {
        const diff = time2 - time
        res(1000 / diff)
      })
    })
  })
}

const trackFps = (onCalc: (time: number) => void, time?: number) => {
  requestAnimationFrame(time2 => {
    if (time) {
      const diff = time2 - time
      onCalc(1000 / diff)
    }
    trackFps(onCalc, time2)
  })
}