import { JSX } from "solid-js/jsx-runtime";
import { NavLink } from 'solid-app-router'
import { createEffect, createMemo, on } from "solid-js";
import { breakpoints, cx } from "../../utils/styles";
import { css } from "solid-styled-components";
import { useLocation } from "solid-app-router";
import { Icon } from "../icon";
import { useAtom } from "../../hooks/use-atom";
import { log } from "../../utils/log";

const styles = {
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
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  active: css`
    background: var(--navbar-highlight);
    color: black;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    /* border-top-left-radius: 16px;
    border-top-right-radius: 16px; */
    /* border-bottom-left-radius: 50%; */
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      left: calc(-50% - -7px);
      top: 0px;
      border-radius: 50%;
      box-shadow: 14px -12px 0 2px var(--navbar-highlight);
      z-index: -1;
    }
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      right: calc(-50% - -7px);
      /* background: yellow; */
      top: 0px;
      border-radius: 50%;
      box-shadow: -14px -12px 0 2px var(--navbar-highlight);
      z-index: -1;
    }
    /* color: var(--color-highlight, orange); */
  `,
  iconToTextOnHover: css`
    position: relative;

    @media (hover: hover) 
      and (pointer: fine) 
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
          color: var(--color-highlight);
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
}



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

  const location = useLocation()
  const isActivated = () => location.pathname === p.href

  createEffect(on(isActivated, (isActive) => {
    isActive && p.onActivate?.()
  }))

  return (
      <NavLink 
        href={p.href}
        end={p.end}
        className={cx(
          styles.link, 
          styles.iconToTextOnHover, 
          // isActivated() && styles.active
        )}
        activeClass={styles.active}
        style={`--hover-text: '${name()}'`}
        aria-label={`nav-menu--${name()}`}
      >
        {p.children}
      </NavLink>
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
      <Icon name="laptop" className={css`font-size: 20px;`}/>
    </NavIconBase>
  ),
  Contact: (p: Props) => (
    <NavIconBase href="/contact" onActivate={p.onActivate}>
      <Icon name="envelope"/>
    </NavIconBase>
  ),
}