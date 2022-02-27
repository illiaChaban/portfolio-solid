import { Icon, Link } from '../../components'
import { textScramble } from '../../directives'
import { use } from '../../hooks'
import { css, styled, useTheme } from '../../theme'
import { cx } from '../../utils'
import { MediaLink } from './media-link'

const Contact = () => {
  const { sharedStyles, colors } = useTheme()

  return (
    <div
      class={css`
        display: flex;
        flex-grow: 1;
      `}
    >
      <div class={cx('flex flex-1', sharedStyles.tags.body)} id="contact">
        <div
          id="contact-info"
          class={css`
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${colors.text.primary};
            flex-direction: column;
            padding-left: 25px;
          `}
        >
          <div
            class={cx(
              sharedStyles.tags.div,
              css`
                padding: 35px 0 43px;
              `,
            )}
          >
            <IntroHeading />
            <div
              class={css`
                margin: 30px 0;
              `}
            >
              <LinkWrapper>
                <Link
                  href="mailto:illia.chaban.8@gmail.com"
                  target="_blank"
                  color="text"
                >
                  <Icon name="envelope" /> illia.chaban.8@gmail.com
                </Link>
              </LinkWrapper>
              <LinkWrapper>
                <Link
                  href="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1Q1eJ4p3lnqyGA5hYGV61Woh0eHEu0M6OcytNqIVpr0g/export?format=pdf"
                  target="_blank"
                  color="text"
                >
                  <Icon
                    name="pdf"
                    class={css`
                      position: relative;
                      top: -2px;
                    `}
                  />{' '}
                  Resume
                </Link>
              </LinkWrapper>

              <LinkWrapper>
                <Icon name="mapMarker" /> Atlanta, GA
              </LinkWrapper>
            </div>
            <div
              class={css`
                display: flex;
                justify-content: space-between;
                font-size: 2rem;
                padding-top: 30px;
                /* aligning for border 1px */
                padding-bottom: 2px;
                width: 100%;
              `}
            >
              <MediaLink
                href="https://www.linkedin.com/in/illia-chaban/"
                aria-label="my-linkedin"
              >
                <Icon name="linkedIn" />
              </MediaLink>
              <MediaLink
                href="https://github.com/illiaChaban"
                aria-label="my-github"
              >
                <Icon name="github" />
              </MediaLink>
              <MediaLink
                href="https://codepen.io/illia_chaban/"
                aria-label="my-codepen"
              >
                <Icon name="codepen" />
              </MediaLink>
            </div>
          </div>
        </div>

        <div id="contact-art" class={sharedStyles.tags.div}>
          <div class="loading-wave"></div>
        </div>
      </div>
    </div>
  )
}

const LinkWrapper = styled('h2')`
  margin-top: 0.85em;
  margin-bottom: 0.85em;
  font-family: 'Inconsolata', 'Saira', monospace;
  line-height: 130%;
`

const IntroHeading = () => {
  const theme = useTheme()
  return (
    <h3
      ref={use(
        textScramble({
          delay: 1000,
          // eslint-disable-next-line quotes
          phrases: ['Hello friend,', "Let's build something great!"],
          interval: 2000,
          doodleStyle: css`
            color: ${theme.colors.primary};
            opacity: 0.8;
          `,
        }),
      )}
      class={css`
        margin: 0;
        color: ${theme.colors.text.subtle1};
        font-size: 1.3rem;
        font-weight: 100;
        text-transform: uppercase;
        font-family: 'Inconsolata', monospace;
      `}
    >
      Hello friend,
    </h3>
  )
}

export default Contact
