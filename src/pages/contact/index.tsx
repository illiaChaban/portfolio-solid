import { useBoundingRect } from '../../hooks'
import { css, useTheme } from '../../theme'
import { cx, media } from '../../utils'
import { Art } from './art'
import { ContactInfo } from './contact-info'

const showArtBreakpoint = 780

const Contact = () => {
  const { sharedStyles, colors, breakpoints } = useTheme()
  const contactInfoRect$ = useBoundingRect()

  return (
    <div
      class={css`
        display: flex;
        flex-grow: 1;
        overflow: hidden;
      `}
    >
      <div
        class={cx(
          'flex-1',
          sharedStyles.tags.body,
          css`
            display: flex;
            justify-content: space-around;
          `,
        )}
      >
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
      </div>
    </div>
  )
}

export default Contact
