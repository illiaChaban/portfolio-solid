import { styled, StyledProps } from '../theme'

const padding = '4px'
export const Link = styled('a')`
  /* display: inline-block;
  position: relative; */
  position: relative;
  transition: 0.3s;
  color: ${({ color, theme }: StyledProps<{ color?: 'primary' | 'text' }>) =>
    color === 'text' ? theme.colors.text.primary : theme.colors.primary};

  &:hover {
    color: ${p => p.theme.colors.accent.black};
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
  /* 
  &::after {
    top: 0;
    right: -${padding};
    left: calc(100% + ${padding});
  }
  &:hover::after {
    left: -${padding};
  }

  &::before {
    bottom: 0;
    left: -${padding};
    right: calc(100% + ${padding});
  }
  &:hover::before {
    right: -${padding};
  } */
  &::after,
  &::before {
    width: calc(100% + ${padding} * 2);
    transform: scaleX(0);
    /* border-radius: 4px; */
  }
  &::after {
    transform-origin: right;
    top: 0;
    right: calc(-${padding} * 1.65);
    /* right: -${padding}; */
  }
  &::before {
    transform-origin: left;
    bottom: 0;
    left: calc(-${padding} * 1.65);
    /* left: -${padding}; */

    /* background-color: ${p => p.theme.colors.text.primary}; */
  }
  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`
