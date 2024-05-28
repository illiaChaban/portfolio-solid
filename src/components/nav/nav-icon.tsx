import { NavLink, useLocation } from '@solidjs/router'
import { createRenderEffect, on } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { tw } from '../../utils/tw'
import { Icon } from '../icon'
import styles from './nav-icon.module.css'

type IconBaseProps = {
  href: string
  end?: boolean
  name?: string
  children: JSX.Element
  onActivate?: () => void
}
const NavIconBase = (p: IconBaseProps): JSX.Element => {
  const removeSlashes = (str: string) => str.replace('/', '')
  const name = () => p.name ?? removeSlashes(p.href)

  const location$ = useLocation()
  const isActivated$ = () => location$.pathname === p.href

  createRenderEffect(
    on(isActivated$, isActive => {
      isActive && p.onActivate?.()
    }),
  )

  return (
    <div
      classList={{
        [tw`
          rounded-circle
          size-[50px]
          z-[1]
          [transition:transform_0.3s] sm:[transition:transform_0.2s]
        `]: true,
        /* transition on the phone doesn't seem smooth with 0.2s */
        [tw`
          md:flex md:justify-center md:items-center 
          [transform:translateY(-20px)] md:[transform:translateX(27px)]
        `]: isActivated$(),
      }}
    >
      <NavLink
        href={p.href}
        end={p.end}
        classList={{
          [tw`
            text-[inherit] no-underline 
            relative inline-block 
            [font-size:22px] font-mono
            h-[51px] [line-height:51px] w-full
          `]: true,
          [styles.active]: isActivated$(),
          [styles.iconToTextOnHover]: !isActivated$(),
        }}
        style={`--hover-text: '${name()}'`}
        aria-label={`nav-menu--${name()}`}
        noScroll
      >
        {p.children}
      </NavLink>
    </div>
  )
}

type Props = Pick<IconBaseProps, 'onActivate'>
export const NavIcon = {
  Home: (p: Props) => (
    <NavIconBase href="/" end name="home" onActivate={p.onActivate}>
      <Icon name="home" />
    </NavIconBase>
  ),
  About: (p: Props) => (
    <NavIconBase href="/about" onActivate={p.onActivate}>
      <Icon name="user" />
    </NavIconBase>
  ),
  Skills: (p: Props) => (
    <NavIconBase href="/skills" onActivate={p.onActivate}>
      <Icon name="cog" />
    </NavIconBase>
  ),
  Projects: (p: Props) => (
    <NavIconBase href="/projects" onActivate={p.onActivate}>
      <Icon name="laptop" class="[font-size:0.9em]" />
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" onActivate={p.onActivate}>
      <Icon name="envelope" />
    </NavIconBase>
  ),
}
