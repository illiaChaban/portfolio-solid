import { NavLink, useLocation } from '@solidjs/router'
import { createRenderEffect, on } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { css, makeStyles } from '../../theme'
import { cx, hoverMedia, media } from '../../utils/styles'
import { Icon } from '../icon'

const useStyles = makeStyles()({
  container: ({ breakpoints }) => css`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    z-index: 1;
    transition: transform 0.2s;
    /* transition on the phone doesn't seem smooth with 0.2s */
    ${media(breakpoints.down('sm'))} {
      transition: transform 0.3s;
    }
  `,
  activeContainer: ({ breakpoints }) => css`
    ${media(breakpoints.down('md'))} {
      transform: translateY(-20px);
    }
    ${media(breakpoints.up('md'))} {
      transform: translateX(27px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  link: css`
    color: inherit;
    text-decoration: none;
    position: relative;
    display: inline-block;
    font-size: 22px;
    height: 51px;
    line-height: 51px;
    width: 100%;
    font-family: 'Inconsolata', monospace;
  `,
  active: ({ colors, breakpoints }) => css`
    ${media(breakpoints.down('md'))} {
      position: relative;
      color: ${colors.primary};

      &::before {
        content: var(--hover-text);
        color: ${colors.primary};
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        font-size: 10px;
        text-transform: uppercase;
        transform: translateY(34px);
      }
    }

    ${media(breakpoints.up('md'))} {
      background-color: ${colors.primary};
      color: ${colors.background};
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  iconToTextOnHover: ({ colors, breakpoints }) => css`
    position: relative;

    ${media(hoverMedia, breakpoints.up('md'))} {
      i {
        &::after {
          content: var(--hover-text, 'navigate');
          font-size: 0.7rem;
          letter-spacing: 0.1px;
          position: absolute;
          display: block;

          top: 50%;
          left: 50%;

          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);

          opacity: 0;
          color: ${colors.primary};
          text-transform: uppercase;
          font-family: 'Inconsolata', monospace;
          font-weight: 100;
        }

        &::before,
        &::after {
          -webkit-transition: opacity 0.2s ease-out;
          transition: opacity 0.2s ease-out;
        }
      }

      &:hover i {
        &::before {
          opacity: 0;
        }
        &::after {
          opacity: 1;
        }
      }
    }
  `,
})

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

  const styles = useStyles()

  return (
    <div
      class={cx(styles.container(), isActivated$() && styles.activeContainer())}
    >
      <NavLink
        href={p.href}
        end={p.end}
        class={cx(
          styles.link(),
          !isActivated$() && styles.iconToTextOnHover(),
          isActivated$() && styles.active(),
        )}
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
      <Icon
        name="laptop"
        class={css`
          font-size: 0.9em;
        `}
      />
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" onActivate={p.onActivate}>
      <Icon name="envelope" />
    </NavIconBase>
  ),
}
