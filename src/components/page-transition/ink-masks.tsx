import InkImg from './assets/ink.png'
import { createMemo } from 'solid-js'

import masksJson from './assets/masks.json'
import { cx } from '../../utils/styles'
import { Ref } from '../../hooks/use-ref'
import { use } from '../../hooks/use-directives'
import { devId } from '../../directives/dev-id'
import { css, makeStyles } from '../../theme'
import { last } from '../../utils'

export const framesNum = 25

const useStyles = makeStyles()({
  outOfRange: css({
    background: '#0c1126',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }),
  inRange: css({
    left: 0,
    height: '100%',
    width: `${framesNum * 100}%`,
    background: `url(${InkImg}) no-repeat 0 0`,
    backgroundSize: '100% 100%',
  }),
})

export const InkImage = (p: {
  step: number
  class?: string
  ref?: Ref<Element>
}) => {
  const frameInPercent = 100 / framesNum

  const position$ = createMemo(() => p.step * frameInPercent)
  const inRange$ = createMemo(() => position$() >= 0 && position$() < 100)

  const styles = useStyles()
  return (
    <div
      ref={use(p.ref, devId('ink-mask'))}
      class={cx(
        p.class,
        css({ position: 'absolute' }),
        inRange$() && styles.inRange(),
        !inRange$() && styles.outOfRange(),
      )}
      style={inRange$() ? `transform: translateX(-${position$()}%)` : ''}
    />
  )
}

export const ClipPath = (p: { step: number }) => {
  return <path d={masksJson[p.step] ?? last(masksJson)} />
}
