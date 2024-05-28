import { JSX, splitProps } from 'solid-js'
import { tw } from '../utils/tw'

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
  appStore: 'fab fa-app-store-ios',
  googlePlay: 'fab fa-google-play',
  plant: 'fas fa-seedling',
  youtube: 'fab fa-youtube',
  palette: 'fas fa-palette',
  lightbulb: 'far fa-lightbulb',
  runner: 'fas fa-running',
}

export type IconName = keyof typeof icons
type Props = { name: IconName } & JSX.IntrinsicElements['i']

export const Icon = (p: Props) => {
  const [p1, others] = splitProps(p, ['class', 'name'])
  return <i class={tw`${p1.class} ${icons[p1.name]}`} {...others} />
}
