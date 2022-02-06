import { JSX } from "solid-js/jsx-runtime";
import { NavLink } from 'solid-app-router'
import { createEffect, createMemo, on } from "solid-js";
import { cx, desktopHover, media } from "../../utils/styles";
import { css } from "solid-styled-components";
import { useLocation } from "solid-app-router";
import { Icon } from "../icon";
import { useAtom } from "../../hooks/use-atom";
import { log } from "../../utils/log";
import { makeStyles, useBreakpoint } from "../../theme";

const useStyles = makeStyles()({
  container: css`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    z-index: 1;
    transition: transform .2s;
  `,
  activeContainer: ({breakpoints}) => css`
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
  active: ({colors, breakpoints}) => css`
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
  iconToTextOnHover: ({colors, breakpoints}) => css`
    position: relative;

    ${media(desktopHover, breakpoints.up('md'))}
    {
      i {
        &::after {
          content: var(--hover-text, 'navigate');
          font-size: 0.7rem;
          letter-spacing: 1px;
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
        &::after
        {
          -webkit-transition: opacity .2s ease-out;
          transition: opacity .2s ease-out;
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

  `
})



type IconBaseProps = {
  href: string, 
  end?: boolean,
  name?: string,
  children: JSX.Element,
  onActivate?: () => void,
  showNameOnHover?: boolean,
}
const NavIconBase = (p: IconBaseProps): JSX.Element => {

  const removeSlashes = (str: string) => str.replace('/', '');
  const name = () => p.name ?? removeSlashes(p.href)

  const location$ = useLocation()
  const isActivated$ = () => location$.pathname === p.href

  createEffect(on(isActivated$, (isActive) => {
    isActive && p.onActivate?.()
  }))

  const styles = useStyles()

  return (
    <div
      className={cx(
        styles.container(),
        isActivated$() && styles.activeContainer(),
      )}
    >
      <NavLink 
        href={p.href}
        end={p.end}
        className={cx(
          styles.link(), 
          !isActivated$() && styles.iconToTextOnHover(), 
          isActivated$() && styles.active(),
        )}
        style={`--hover-text: '${name()}'`}
        aria-label={`nav-menu--${name()}`}
      >
        {p.children}
      </NavLink>
    </div>
  )
}

type Props = Pick<IconBaseProps, 'onActivate' | 'showNameOnHover'>
export const NavIcon = {
  Home: (p: Props) => (
    <NavIconBase href="/" end name="home" onActivate={p.onActivate}>
      <Icon name="home" />
    </NavIconBase>
  ),
  About: (p: Props) => (
    <NavIconBase href="/about" onActivate={p.onActivate}>
      <Icon name="user"/>
    </NavIconBase>
  ),
  Skills: (p: Props) => (
    <NavIconBase href="/skills" onActivate={p.onActivate}>
      <Icon name="cog"/>
    </NavIconBase>
  ),
  Projects: (p: Props) => (
    <NavIconBase  href="/projects" onActivate={p.onActivate}>
      <Icon name="laptop" className={css`font-size: 0.9em;`}/>
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" onActivate={p.onActivate}>
      <Icon name="envelope"/>
    </NavIconBase>
  ),
}