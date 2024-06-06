import { ComponentProps, useContext } from 'solid-js'
import { textScramble } from '../directives'
import { RefSetter, use } from '../hooks'
import { WithOverrides } from '../types'
import { tw } from '../utils/tw'
import { PageTransitionContext } from './page-transition'

const HeadingBase = tw.h1`
  text-highlight relative
  [font-family:Courier] text-[3.15rem] leading-tight
`

export const Heading = (
  p: WithOverrides<
    ComponentProps<typeof HeadingBase>,
    {
      ref?: RefSetter<HTMLHeadingElement>
    }
  >,
) => {
  const { maskTransitionEnabled$ } = useContext(PageTransitionContext)

  return (
    <HeadingBase
      {...p}
      class={tw`tags-h1 ${p.class}`}
      ref={use(
        textScramble({
          delay: maskTransitionEnabled$() ? 1000 : 400,
          doodleStyle: tw`text-text-subtle1 opacity-40`,
        }),
        p.ref,
      )}
    />
  )
}
