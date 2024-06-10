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
  isActive: boolean
} & Pick<JSX.CustomAttributes<HTMLDivElement>, 'ref'>

const NavIconBase = (p: IconBaseProps): JSX.Element => {
  const removeSlashes = (str: string) => str.replace('/', '')
  const name = () => p.name ?? removeSlashes(p.href)

  const location$ = useLocation()
  const isCurrent$ = () => location$.pathname === p.href

  createRenderEffect(on(isCurrent$, isCurrent => isCurrent && p.onActivate?.()))

  return (
    <div
      ref={p.ref}
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
        `]: p.isActive,
      }}
    >
      <NavLink
        href={p.href}
        end={p.end}
        classList={{
          [tw`
            no-underline 
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
          `]: p.isActive,
          // make sure icon descriptions on hover don't mess up activation transition
          [tw`group text-opacity-75 text-text-subtle1`]: !p.isActive,
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

const NavIconText = tw.div`
  text-highlight uppercase font-mono tracking-[0.1px]
`

const StyledIcon = tw.i`md:desktopHover:group-hover:opacity-0`

type Props = Pick<IconBaseProps, 'onActivate' | 'ref' | 'isActive'>
export const NavIcon = {
  Home: (p: Props) => (
    <NavIconBase href="/" end name="home" {...p}>
      <StyledIcon as={IconHome} />
    </NavIconBase>
  ),
  About: (p: Props) => (
    <NavIconBase href="/about" {...p}>
      <StyledIcon as={IconUser} />
    </NavIconBase>
  ),
  Skills: (p: Props) => (
    <NavIconBase href="/skills" {...p}>
      <StyledIcon as={IconCog} />
    </NavIconBase>
  ),
  Projects: (p: Props) => (
    <NavIconBase href="/projects" {...p}>
      <StyledIcon as={IconLaptop} class="size-[1.05em]" />
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" {...p}>
      <StyledIcon as={IconEnvelope} />
    </NavIconBase>
  ),
}
