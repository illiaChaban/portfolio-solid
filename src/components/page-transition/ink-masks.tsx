import InkImg from './assets/ink.png'
import { createMemo } from 'solid-js'

import masksJson from './assets/masks-minified.json'
import { Ref } from '../../hooks/use-ref'
import { use } from '../../hooks/use-directives'
import { devId } from '../../directives/dev-id'
import { last } from '../../utils'
import { tw } from '../../utils/tw'

export const framesNum = 25

export const InkImage = (p: {
  step: number
  class?: string
  ref?: Ref<Element>
}) => {
  const frameInPercent = 100 / framesNum

  const position$ = createMemo(() => p.step * frameInPercent)
  const inRange$ = createMemo(() => position$() >= 0 && position$() < 100)

  return (
    <div
      ref={use(p.ref, devId('ink-mask'))}
      classList={{
        [p.class ?? '']: true,
        ['absolute']: true,
        [tw`left-0 h-full ![background-size:100%_100%]`]: inRange$(),
        [tw`inset-0 bg-[#0c1126]`]: !inRange$(),
      }}
      style={
        inRange$()
          ? {
              background: `url(${InkImg}) no-repeat 0 0`,
              transform: `translateX(-${position$()}%)`,
              width: `${framesNum * 100}%`,
            }
          : undefined
      }
    />
  )
}

export const ClipPath = (p: { step: number }) => {
  return <path d={masksJson[p.step] ?? last(masksJson)} />
}
