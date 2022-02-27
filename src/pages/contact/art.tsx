import { For } from 'solid-js'
import { css, keyframes, useTheme } from '../../theme'
import { cx, range } from '../../utils'

const waveAnimation = keyframes`
  0%, 100% {
    -webkit-transform: translateZ(-100px);
            transform: translateZ(-100px);
  }
  50% {
    -webkit-transform: translateZ(100px);
            transform: translateZ(100px);
  }
`

const linesNum = 15
export const Art = (p: { class?: string; style?: string }) => {
  const { sharedStyles, colors } = useTheme()
  return (
    <div
      class={cx(
        sharedStyles.tags.div,
        css`
          align-self: center;
          position: relative;
        `,
        p.class,
      )}
      style={p.style}
    >
      <div
        class={css`
          width: 90%;
          height: 95%;
          position: relative;
          transform-style: preserve-3d;
          transform: perspective(500px) translate(10px, -20px) rotateX(60deg);
          display: flex;
          justify-content: center;
          align-items: center;

          width: 72%;
          left: 150px;
          transform: perspective(500px) translate(-150px, -25px) rotateX(60deg);
          margin-right: 20px;
          margin-left: auto;
          margin-bottom: 5px;

          & > span {
            position: absolute;
            display: block;
            border: 2px solid orange;
            box-sizing: border-box;
            border-radius: 50%;
            transform: translateZ(-100px);
            -webkit-animation: ${waveAnimation} 3s ease-in-out infinite;
            animation: ${waveAnimation} 3s ease-in-out infinite;
          }
        `}
      >
        <For each={range(linesNum)}>
          {i => {
            const colorsArr = [colors.primary, colors.text.primary]
            const diagonalToContainerRatio = (100 / linesNum) * (i + 1)
            const distanceBetweenCircles = i / 10
            const colorIdx = i % colorsArr.length
            const color = colorsArr[colorIdx]
            return (
              <span
                style={`
                  width: ${diagonalToContainerRatio}%;
                  height: ${diagonalToContainerRatio}%;
                  animation-delay: ${distanceBetweenCircles}s;
                  border-color: ${color};
                `}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}
