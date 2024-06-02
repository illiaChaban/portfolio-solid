import { NavLink, useLocation } from '@solidjs/router'
import { createRenderEffect, on } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { tw } from '../../utils/tw'
import { IconCog, IconEnvelope, IconHome, IconLaptop, IconUser } from '../icons'

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
            [&_*]:[transition:opacity_.2s_ease-out]
          `]: true,
          [tw`
            text-highlight
            md:bg-highlight md:size-[35px] md:rounded-circle 
            md:text-background
            md:flex md:justify-center md:items-center
          `]: isActivated$(),
          // make sure icon descriptions on hover don't mess up activation transition
          ['group']: !isActivated$(),
        }}
        aria-label={`nav-menu--${name()}`}
        noScroll
      >
        <NavIconText
          class={tw`
            md:hidden
            absolute left-0 bottom-0 w-full
            text-[10px] 
            [transform:translateY(34px)]
          `}
        >
          {name()}
        </NavIconText>
        {p.children}
        <NavIconText
          class={tw`
            hidden md:block
            absolute center opacity-0
            desktopHover:group-hover:opacity-100
            text-[0.7rem]
          `}
        >
          {name()}
        </NavIconText>
      </NavLink>
    </div>
  )
}

const NavIconText = tw('div')`
  text-highlight uppercase font-mono font-thin tracking-[0.1px]
`

const StyledIcon = tw('i')`md:desktopHover:group-hover:opacity-0`

type Props = Pick<IconBaseProps, 'onActivate'>
export const NavIcon = {
  Home: (p: Props) => (
    <NavIconBase href="/" end name="home" onActivate={p.onActivate}>
      <StyledIcon as={IconHome} />
    </NavIconBase>
  ),
  About: (p: Props) => (
    <NavIconBase href="/about" onActivate={p.onActivate}>
      <StyledIcon as={IconUser} />
    </NavIconBase>
  ),
  Skills: (p: Props) => (
    <NavIconBase href="/skills" onActivate={p.onActivate}>
      <StyledIcon as={IconCog} />
    </NavIconBase>
  ),
  Projects: (p: Props) => (
    <NavIconBase href="/projects" onActivate={p.onActivate}>
      <StyledIcon as={IconLaptop} class="size-[1.05em]" />
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" onActivate={p.onActivate}>
      <StyledIcon as={IconEnvelope} />
    </NavIconBase>
  ),
}
