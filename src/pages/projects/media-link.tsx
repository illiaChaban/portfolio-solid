import { Icon, IconName } from '../../components'
import { css, useTheme } from '../../theme'
import { hoverMedia, media } from '../../utils'

export const MediaLink = (p: {
  icon: IconName
  label: string
  href: string
}) => {
  const styles = useStyles()
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener"
      aria-label={p.label}
      style={`--hover-text: '${p.label}'`}
      class={styles}
    >
      <Icon name={p.icon} />
    </a>
  )
}

const useStyles = () => {
  const theme = useTheme()
  return css`
    position: relative;
    ${media(hoverMedia)} {
      & i {
        &::after {
          content: var(--hover-text, 'navigate');
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 0.1px;
          position: absolute;
          display: block;

          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);

          opacity: 0;
          text-transform: uppercase;
          font-family: 'Inconsolata', monospace;
        }

        &::before,
        &::after {
          -webkit-transition: opacity 0.2s ease-out;
          transition: opacity 0.2s ease-out;
        }
      }

      &:hover i {
        &::before {
          opacity: 0;
        }
        &::after {
          opacity: 1;
        }
      }
    }
  `
}
