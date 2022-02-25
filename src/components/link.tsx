import { ComponentProps } from 'solid-js'
import { delayNavigationOnMobile } from '../directives'
import { use } from '../hooks'
import { styled, StyledProps } from '../theme'

const padding = '4px'

const LinkBase = styled('a')`
  display: inline-block;
  position: relative;
  transition: 0.3s;
  color: ${({ color, theme }: StyledProps<{ color?: 'primary' | 'text' }>) =>
    color === 'text' ? theme.colors.text.primary : theme.colors.primary};

  &:hover {
    color: ${p => p.theme.colors.accent.black};
    transform: scale(1.1);
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    height: 50%;
    transition: 0.3s;
    z-index: -1;
    background-color: ${p => p.theme.colors.primary};
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

export const Link = (p: ComponentProps<typeof LinkBase>) => (
  <LinkBase {...p} ref={use(delayNavigationOnMobile(200))} />
)
