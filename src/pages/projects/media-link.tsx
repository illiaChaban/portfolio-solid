import { Component } from 'solid-js'
import { tw } from '../../utils/tw'

export const MediaLink = (p: {
  Icon: Component<{ class?: string }>
  label: string
  href: string
}) => {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener"
      aria-label={p.label}
      class="group relative [&_*]:[transition:opacity_.2s_ease-out]"
    >
      <p.Icon class="desktopHover:group-hover:opacity-0" />
      <div
        class={tw`
          absolute center opacity-0
          text-xs uppercase font-mono font-bold
          desktopHover:group-hover:opacity-100
        `}
      >
        {p.label}
      </div>
    </a>
  )
}
