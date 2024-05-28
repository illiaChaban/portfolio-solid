import { Icon, IconName } from '../../components'
import styles from './media-link.module.css'

export const MediaLink = (p: {
  icon: IconName
  label: string
  href: string
}) => {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener"
      aria-label={p.label}
      style={`--hover-text: '${p.label}'`}
      class={styles.mediaLink}
    >
      <Icon name={p.icon} />
    </a>
  )
}
