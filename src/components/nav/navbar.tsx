import { For, JSX } from 'solid-js'
import { useAtom } from '../../hooks/use-atom'
import { useBreakpoint } from '../../theme'
import { bindEventWithCleanup } from '../../utils'
import { debounce } from '../../utils/lodash'
import { calcClipPath, NAV_HEIGHT, NAV_LENGTH } from './clip-path'
import { NavIcon } from './nav-icon'
import { tw } from '../../utils/tw'

const MenuContainer = tw.div`
  text-text-subtle1
  w-[theme(misc.navOffset)]
  fixed top-0 h-full
  z-[theme(zIndex.navbar)]
  flex justify-center items-center
  max-md:w-full max-md:h-[theme(misc.navOffset)] 
  max-md:bottom-0
  max-md:min-h-0 max-md:b-0 max-md:top-auto max-md:border-r-0
`

export const Navbar = () => {
  const index$ = useAtom<number>()

  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <Bar index={index$()} />

      <NavContainer style={{ '--nav-size': `${NAV_LENGTH}px` }}>
        <For
          each={[
            NavIcon.Home,
            NavIcon.About,
            NavIcon.Skills,
            NavIcon.Projects,
            NavIcon.Contact,
          ]}
        >
          {(Icon, i) => <Icon onActivate={() => index$(i)} />}
        </For>
      </NavContainer>
    </MenuContainer>
  )
}

const NavContainer = tw.div`
  flex justify-around items-center 
  text-center w-[--nav-size]
  md:h-[--nav-size] md:w-full md:flex-col
  [-webkit-tap-highlight-color:rgba(0,0,0,0)]
`

const Bar = (p: { index: number | undefined }) => {
  const clipPath$ = useClipPath()

  const isDesktop$ = useBreakpoint('md')

  const sharedStyles = (): JSX.CSSProperties => {
    const { path, fullLength } = clipPath$()
    const isDesktop = isDesktop$()
    return {
      'clip-path': `path('${path}')`,
      translate: `${isDesktop ? '0' : ''} ${60 * ((p.index ?? 0) - 2)}px`,
      [isDesktop ? 'height' : 'width']: `${fullLength}px`,
    }
  }

  const Shared = tw.div`
    w-full h-[--nav-height]
    absolute 
    [transition:translate_0.2s_ease-out]
  `

  const BackdropBorder = tw(Shared)`
    bottom-[1.5px] md:bottom-auto md:left-[1.5px] 
    bg-[#7ff6ff40]
  `
  const Backdrop = tw(Shared)`
    bottom-0 md:bottom-auto md:left-0
    bg-[#000000c4] md:bg-[#000000d6]
    backdrop-blur-[2px]]
  `

  return (
    <div
      style={{ '--nav-height': `${NAV_HEIGHT}px` }}
      /* adjust for border because overflow-x otherwise cuts the top for some reason */
      class={tw`
          [--size:calc(100%+2px)]
          h-[--size] w-full
          md:h-full md:w-[--size]
          absolute overflow-x-hidden 
          flex justify-center items-center
        `}
    >
      {/* Using another DIV to create border instead of 
        "filter: drop-shadow(0px -1px 3px var(--color-highlight));" on the parent 
        because of the animation bug on mobile (visible only on an actual phone)
        */}
      <BackdropBorder style={sharedStyles()} />
      <Backdrop style={sharedStyles()} />
    </div>
  )
}

const useClipPath = () => {
  const isDesktop$ = useBreakpoint('md')
  const calcWindowLength = () =>
    (isDesktop$() ? window.innerHeight : window.innerWidth) || 10000

  const windowLength = useAtom(calcWindowLength())

  bindEventWithCleanup(
    window,
    'resize',
    debounce(100)(() => windowLength(calcWindowLength())),
  )

  return () => calcClipPath(isDesktop$() ? 'down' : 'right', windowLength())
}
