import { Icon, Link } from '../../components'
import { css, useTheme } from '../../theme'
import { cx } from '../../utils'
import { MediaLink } from './media-link'

const Contact = () => {
  const { sharedStyles } = useTheme()
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
            color: var(--color-main);
            flex-direction: column;
            padding-left: 25px;
          `}
        >
          <div class="div-tags">
            <h3 class="scramble-text">Hello</h3>

            <div>
              <h2>
                <Link
                  href="mailto:illia.chaban.8@gmail.com"
                  target="_blank"
                  color="text"
                >
                  <i class="fas fa-envelope"></i>
                  illia.chaban.8@gmail.com
                </Link>
              </h2>
              <h2>
                <Link
                  href="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1Q1eJ4p3lnqyGA5hYGV61Woh0eHEu0M6OcytNqIVpr0g/export?format=pdf"
                  target="_blank"
                  color="text"
                >
                  <i class="fas fa-file-pdf"></i>
                  Resume
                </Link>
              </h2>

              <h2>
                <i class="fas fa-map-marker-alt"></i>
                Atlanta, GA
              </h2>
            </div>
            <div
              class={css`
                display: flex;
                justify-content: space-between;
                font-size: 2rem;
                padding-top: 15px;
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

        <div id="contact-art" class="div-tags">
          <div class="loading-wave"></div>
        </div>
      </div>
    </div>
  )
}

export default Contact
