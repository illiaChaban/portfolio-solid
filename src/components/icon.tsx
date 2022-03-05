import { JSX, splitProps } from 'solid-js'
import { cx } from '../utils/styles'

const icons = {
  home: 'fas fa-home',
  user: 'fas fa-user-circle',
  cog: 'fas fa-cog',
  laptop: 'fas fa-laptop-code',
  envelope: 'fas fa-envelope',
  linkedIn: 'fab fa-linkedin-in',
  github: 'fab fa-github',
  codepen: 'fab fa-codepen',
  pdf: 'fas fa-file-pdf',
  mapMarker: 'fas fa-map-marker-alt',
  arrowRight: 'fas fa-angle-right',
  building: 'fas fa-building',
  globe: 'fas fa-globe',
}

export type IconName = keyof typeof icons
type Props = { name: IconName } & JSX.IntrinsicElements['i']

export const Icon = (p: Props) => {
  const [p1, others] = splitProps(p, ['class', 'className', 'name'])
  return <i class={cx(p1.class, p1.className, icons[p1.name])} {...others} />
}
