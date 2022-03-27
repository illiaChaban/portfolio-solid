import { ComponentProps, useContext } from 'solid-js'
import { textScramble } from '../directives'
import { RefSetter, use } from '../hooks'
import { css, styled, useTheme } from '../theme'
import { WithOverrides } from '../types'
import { cx } from '../utils'
import { PageTransitionContext } from './page-transition'

const HeadingBase = styled('h1')`
  font-family: Courier;
  font-size: 3rem;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
`

export const Heading = (
  p: WithOverrides<
    ComponentProps<typeof HeadingBase>,
    {
      ref?: RefSetter<HTMLHeadingElement>
    }
  >,
) => {
  const theme = useTheme()
  const { maskTransitionEnabled$ } = useContext(PageTransitionContext)

  return (
    <HeadingBase
      {...p}
      class={cx(theme.sharedStyles.tags.h1, p.class, p.className)}
      ref={use(
        textScramble({
          delay: maskTransitionEnabled$() ? 1000 : 400,
          doodleStyle: css`
            color: ${theme.colors.text.subtle1};
            opacity: 0.4;
          `,
        }),
        p.ref,
      )}
    />
  )
}
