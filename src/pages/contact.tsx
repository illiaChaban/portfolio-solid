import { Link } from '../components'
import { css, useTheme } from '../theme'

const Contact = () => {
  return (
    <div
      class={css`
        display: flex;
        flex-grow: 1;
      `}
    >
      <div class="flex flex-1 body-tags" id="contact">
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
            <div class="links flex">
              <a
                href="https://www.linkedin.com/in/illia-chaban/"
                target="_blank"
                rel="noopener"
                aria-label="my-linkedin"
              >
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                    <i class="fab fa-linkedin-in"></i>
                  </span>
                </div>
              </a>
              <a
                href="https://github.com/illiaChaban"
                target="_blank"
                rel="noopener"
                aria-label="my-github"
              >
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                    <i class="fab fa-github"></i>
                  </span>
                </div>
              </a>
              <a
                href="https://codepen.io/illia_chaban/"
                target="_blank"
                rel="noopener"
                aria-label="my-codepen"
              >
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                    <i class="fab fa-codepen"></i>
                  </span>
                </div>
              </a>
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
