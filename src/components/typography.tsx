import { ComponentProps } from 'solid-js'
import { textScramble } from '../directives'
import { RefSetter, use } from '../hooks'
import { css, styled, useTheme } from '../theme'
import { WithOverrides } from '../types'

export const HeadingBase = styled('h1')`
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
  return (
    <HeadingBase
      {...p}
      ref={use(
        textScramble({
          delay: 1000,
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
