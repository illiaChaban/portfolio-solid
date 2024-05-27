import { For, JSX } from 'solid-js'
import { range } from '../../utils'
import { tw } from '../../utils/tw'
import styles from './art.module.css'

// TODO: fix animation restarting after page transition
const linesNum = 15
export const Art = (p: { class?: string; style?: JSX.CSSProperties }) => {
  return (
    <div class={tw`tags-div self-center relative ${p.class}`} style={p.style}>
      <div
        class={tw`
          w-[72%] h-[95%]
          mr-5 ml-auto mb-5px
          relative left-[150px]
          flex justify-center items-center
          [transform-style:preserve-3d]
          [transform:perspective(500px)_translate(-150px,-25px)_rotateX(60deg)]
        `}
      >
        <For each={range(linesNum)}>
          {i => {
            const borders = [tw`border-highlight`, tw`border-text-primary`]
            const diagonalToContainerRatio = (100 / linesNum) * (i + 1)
            const distanceBetweenCircles = i / 10
            const idx = i % borders.length
            const border = borders[idx]
            return (
              <Wave
                class={border}
                // FIXME: workaround for animation reset after page transition
                style={{
                  width: `${diagonalToContainerRatio}%`,
                  height: `${diagonalToContainerRatio}%`,
                  'animation-delay': `${distanceBetweenCircles + 1.05}s`,
                }}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}

const Wave = tw('div')`
  absolute box-border 
  border-2 border-solid rounded-[50%]
  [transform:translateZ(-100px)] 
  ${styles.wave}
`
