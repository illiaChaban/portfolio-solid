import { createMemo } from 'solid-js'
import { useAtom } from '../../hooks/use-atom'
import { tw } from '../../utils/tw'

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
    <div
      class={tw`
        fixed top-0 left-0
        bg-accent-black
        rounded-[16px]
        size-[50px]
        flex justify-center items-center 
        z-[5000]
      `}
    >
      FPS: {fps$()}
      <br />
      Min fps: {minFps$()}
    </div>
  )
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
