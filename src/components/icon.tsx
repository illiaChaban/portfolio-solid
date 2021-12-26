import { JSX, splitProps } from "solid-js"
import { cx } from "../utils/styles"

const icons = {
  home: 'fas fa-home',
  user: 'fas fa-user-circle',
  cog: 'fas fa-cog',
  laptop: 'fas fa-laptop-code',
  envelope: 'fas fa-envelope',
}

type Props = {name: keyof typeof icons} 
  & JSX.IntrinsicElements['i']

export const Icon = (p: Props) => {
  const [p1, others] = splitProps(p, ['class', 'name'])
  return (
    <i 
      class={cx(p1.class, icons[p1.name])}
      {...others}
    />
  )
}