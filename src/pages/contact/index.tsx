import { useBoundingRect } from '../../hooks'
import { css, styled, useTheme, withSharedStyles } from '../../theme'
import { cx, media } from '../../utils'
import { Art } from './art'
import { ContactInfo } from './contact-info'

const showArtBreakpoint = 780

const Contact = () => {
  const { colors, breakpoints } = useTheme()
  const contactInfoRect$ = useBoundingRect()

  return (
    <div
      class={css`
        display: flex;
        flex-grow: 1;
        overflow: hidden;
      `}
    >
      <Container>
        <div
          class={css`
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${colors.text.primary};
            flex-direction: column;
            padding-left: 25px;
            ${media(breakpoints.down(showArtBreakpoint))} {
              padding-left: 8px;
              padding-right: 8px;
            }
          `}
        >
          <ContactInfo ref={contactInfoRect$.track} />
        </div>
        <Art
          style={`
            width: ${contactInfoRect$()?.width ?? 0}px;
            height: ${contactInfoRect$()?.height ?? 0}px;
          `}
          class={css`
            /* aligning for content padding */
            margin: 0 25px;
            ${media(breakpoints.down(showArtBreakpoint))} {
              display: none;
            }
          `}
        />
      </Container>
    </div>
  )
}

const Container = withSharedStyles(s => cx(s.flex1, s.tags.body))(styled('div')`
  display: flex;
  justify-content: space-around;
`)

export default Contact
