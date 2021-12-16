import { JSX } from "solid-js/jsx-runtime";
import { NavLink } from 'solid-app-router'
import { createMemo } from "solid-js";
import { cx } from "../../utils/styles";
import { css } from "solid-styled-components";
import { useLocation } from "solid-app-router";

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
  `,
  active: css`
    color: var(--color-highlight, orange);
  `,
  iconToTextOnHover: css`
    position: relative;

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

  `
}

const NavIconBase = (p: {
  href: string, 
  end?: boolean,
  name?: string,
  iconName: string
  iconClassName?: string
}): JSX.Element => {

  const removeSlashes = (str: string) => str.replace('/', '');
  const name = () => p.name ?? removeSlashes(p.href)

  const location = useLocation()
  const isActivated = () => location.pathname === p.href
  
  return (
    <NavLink 
      href={p.href}
      end={p.end}
      className={cx(styles.link, styles.iconToTextOnHover, isActivated() && styles.active)}
      style={`--hover-text: '${name()}'`}
      aria-label={`nav-menu--${name()}`}
    >
      <i 
        class={p.iconName} 
        className={p.iconClassName}
      />
    </NavLink>
  )
}

export const NavIcon = {
  Home: () => (
    <NavIconBase href="/" end name="home" iconName="fas fa-home" />
  ),
  About: () => (
    <NavIconBase href="/about" iconName="fas fa-user-circle" />
  ),
  Skills: () => (
    <NavIconBase href="/skills" iconName="fas fa-cog" />
  ),
  Projects: () => (
    <NavIconBase 
      href="/projects" 
      iconName="fas fa-laptop-code" 
      iconClassName={css`font-size: 20px;`} 
    />
  ),
  Contact: () => (
    <NavIconBase href="/contact" iconName="fas fa-envelope" />
  ),
}