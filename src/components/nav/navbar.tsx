import { For, JSX } from 'solid-js'
import { useAtom } from '../../hooks/use-atom'
import { css, styled, useBreakpoint, useTheme } from '../../theme'
import { bindEventWithCleanup } from '../../utils'
import { debounce } from '../../utils/lodash'
import { cx, media } from '../../utils/styles'
import { calcClipPath, NAV_HEIGHT, NAV_LENGTH } from './clip-path'
import { NavIcon } from './nav-icon'

const MenuContainer = styled('div')(({ theme }) => ({
  color: 'var(--color-subtle)',
  width: theme.misc.navOffset,
  height: '100%',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.navbar,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [media(theme.breakpoints.down('md'))]: {
    width: '100%',
    height: theme.misc.navOffset,
    minHeight: 0,
    bottom: 0,
    top: 'auto',

    borderRight: 'none',
  },
}))

export const Navbar = () => {
  const index$ = useAtom<number>()

  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <Bar index={index$()} />

      <NavContainer>
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

const NavContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  text-align: center;
  width: ${NAV_LENGTH}px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${p => media(p.theme.breakpoints.up('md'))} {
    height: ${NAV_LENGTH}px;
    width: 100%;
    flex-direction: column;
  }
`

const useStyles = () => {
  const theme = useTheme()

  return {
    shared: css`
      height: ${NAV_HEIGHT.toString()}px;
      width: 100%;
      position: absolute;
      transition: translate 0.2s ease-out;
      bottom: 1.5px;
      ${media(theme.breakpoints.up('md'))} {
        bottom: auto;
        left: 1.5px;
      }
    `,
    backdropBorder: css`
      background-color: #7ff6ff40;
    `,
    backdrop: css`
      bottom: 0;
      ${media(theme.breakpoints.up('md'))} {
        bottom: auto;
        left: 0;
      }

      background: #000000c4;
      backdrop-filter: blur(2px);
      ${media(theme.breakpoints.up('md'))} {
        background: #000000d6;
      }
    `,
  }
}

const Bar = (p: { index: number | undefined }) => {
  const theme = useTheme()
  const styles = useStyles()

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

  return (
    <div
      class={css`
        /* adjust for border because overflow-x otherwise cuts the top for some reason */
        height: calc(100% + 2px);
        width: 100%;
        ${media(theme.breakpoints.up('md'))} {
          height: 100%;
          width: calc(100% + 2px);
        }
        position: absolute;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {/* Using another DIV to create border instead of 
        "filter: drop-shadow(0px -1px 3px var(--color-highlight));" on the parent 
        because of the animation bug on mobile (visible only on an actual phone)
        */}
      <div
        class={cx(styles.shared, styles.backdropBorder)}
        style={sharedStyles()}
      />
      <div class={cx(styles.shared, styles.backdrop)} style={sharedStyles()} />
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
