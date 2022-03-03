import { Link as LinkBase, LinkProps } from 'solid-app-router'
import { ComponentProps } from 'solid-js'
import { delayNavigationOnTouch } from '../directives'
import { use } from '../hooks'
import { css, useTheme } from '../theme'
import { OmitSafe } from '../types'
import { cx } from '../utils'

type StyleProps = { color?: 'primary' | 'text' }
const useStyles = ({ color = 'primary' }: StyleProps) => {
  const { colors } = useTheme()
  const padding = '4px'

  const base = css`
    display: inline-block;
    position: relative;
    transition: 0.3s;
    text-decoration: none;

    &:hover {
      color: ${colors.accent.black};
      transform: scale(1.1);
    }
    &::after,
    &::before {
      content: '';
      position: absolute;
      height: 50%;
      transition: 0.3s;
      z-index: -1;
      background-color: ${colors.primary};
    }

    &::after,
    &::before {
      width: calc(100% + ${padding} * 2);
      transform: scaleX(0);
    }
    &::after {
      transform-origin: right;
      top: 0;
      right: calc(-${padding} * 1.65);
    }
    &::before {
      transform-origin: left;
      bottom: 0;
      left: calc(-${padding} * 1.65);
    }
    &:hover::after,
    &:hover::before {
      transform: scaleX(1);
    }
  `
  const dynamic = css`
    color: ${color === 'text' ? colors.text.primary : colors.primary};
  `
  return cx(base, dynamic)
}

export const ExternalLink = (
  p: OmitSafe<ComponentProps<'a'>, 'target' | 'className' | 'rel'> & StyleProps,
) => {
  const styles = useStyles(p)
  return (
    <a
      {...p}
      class={cx(styles, p.class)}
      target="_blank"
      rel="external"
      ref={use(delayNavigationOnTouch(250))}
    />
  )
}

type Page = 'home' | 'about' | 'skills' | 'projects' | 'contact'
export const PageLink = (
  p: Omit<LinkProps, 'target' | 'href' | 'className'> & {
    page: Page
  } & StyleProps,
) => {
  const styles = useStyles(p)
  return (
    <LinkBase
      {...p}
      class={cx(styles, p.class)}
      href={p.page === 'home' ? '/' : `/${p.page}`}
    />
  )
}
