import { For, JSX } from 'solid-js'
import { useAtom } from '../../hooks/use-atom'
import { useBreakpoint } from '../../theme'
import { bindEventWithCleanup, range } from '../../utils'
import { debounce } from '../../utils/lodash'
import { calcClipPath, NAV_HEIGHT, NAV_LENGTH } from './clip-path'
import { NavIcon } from './nav-icon'
import { tw, withStyle } from '../../utils/tw'
import { _, compareNumbers, filter, isNil, sort } from '@illlia/ts-utils'

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
  const isDesktop$ = useBreakpoint('md')

  const currIndex$ = useAtom<number>()
  const activeStylesIndex$ = useAtom<number>()
  const transitionDuration$ = useAtom<number>(0)

  const icons = [
    NavIcon.Home,
    NavIcon.About,
    NavIcon.Skills,
    NavIcon.Projects,
    NavIcon.Contact,
  ]
  const refs = new Array<HTMLDivElement>(icons.length).fill(null as any)

  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <Bar index={currIndex$()} transitionDuration={transitionDuration$()} />

      <NavContainer style={{ '--nav-size': `${NAV_LENGTH}px` }}>
        <For each={icons}>
          {(Icon, i) => (
            <Icon
              isActive={activeStylesIndex$() === i()}
              ref={el => (refs[i()] = el)}
              onActivate={() => {
                const from = currIndex$()
                const to = i()
                currIndex$(to)

                if (isNil(from)) {
                  activeStylesIndex$(to)
                  return
                }
                const [min, max] = _([from, to], sort(compareNumbers()))
                const direction = from < to ? 'asc' : 'desc'
                const affected = _(
                  range(icons.length),
                  sort(compareNumbers(direction)),
                  filter(x => x >= min && x <= max && x !== from),
                )
                const duration =
                  (isDesktop$() ? 250 : 150) + 50 * affected.length
                transitionDuration$(duration)
                const speed = duration / affected.length
                affected.forEach((i, order) => {
                  if (i === to) {
                    activeStylesIndex$(-1)
                    setTimeout(
                      () => activeStylesIndex$(to),
                      order * speed * 0.8,
                    )
                    return
                  }
                  const el = refs[i]
                  const translate = (n: number) =>
                    isDesktop$() ? `translateX(${n}px)` : `translateY(${-n}px)`
                  el.animate(
                    [
                      {
                        opacity: 1,
                        offset: 0,
                      },
                      {
                        opacity: 0,
                        offset: 0.2,
                      },
                      {
                        opacity: 0,
                        transform: translate(-8),
                        offset: 0.7,
                      },
                      { opacity: 1, transform: translate(0), offset: 1 },
                    ],
                    {
                      duration: speed + 200,
                      delay: order * speed * 0.8,
                      easing: 'ease-out',
                    },
                  )
                })
              }}
            />
          )}
        </For>
      </NavContainer>
    </MenuContainer>
  )
}

const NavContainer = withStyle(
  { '--nav-size': `${NAV_LENGTH}px` },
  tw.div`
    flex justify-around items-center 
    text-center w-[--nav-size]
    md:h-[--nav-size] md:w-full md:flex-col
    [-webkit-tap-highlight-color:rgba(0,0,0,0)]
  `,
)

const Bar = (p: { index: number | undefined; transitionDuration: number }) => {
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

  const Shared = withStyle(
    {
      '--nav-height': `${NAV_HEIGHT}px`,
      '--transition-duration': () => `${p.transitionDuration}ms`,
    },
    tw.div`
      w-full h-[--nav-height]
      absolute 
      [transition:translate_var(--transition-duration)_ease-out]
    `,
  )

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
