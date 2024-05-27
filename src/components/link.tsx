import { Link as LinkBase, LinkProps } from '@solidjs/router'
import { ComponentProps } from 'solid-js'
import { delayNavigationOnTouch } from '../directives'
import { use } from '../hooks'
import { OmitSafe, Page } from '../types'
import cssStyles from './link.module.css'
import { tw } from '../utils/tw'

type StyleProps = { $color?: 'primary' | 'text' }

const StyledLink = tw('a')<StyleProps>`
  ${cssStyles.externalLink} 
  ${p => (p.$color === 'text' ? 'text-text-primary' : 'text-highlight')}
`

export const ExternalLink = (
  p: OmitSafe<ComponentProps<'a'>, 'target' | 'rel'> & StyleProps,
) => {
  return (
    <StyledLink
      {...p}
      target="_blank"
      rel="external"
      ref={use(delayNavigationOnTouch(350))}
    />
  )
}

export type PageLinkBaseProps = Omit<LinkProps, 'target' | 'href'> & {
  page: Page
}
export const PageLinkBase = (p: PageLinkBaseProps) => {
  return <LinkBase {...p} href={p.page === 'home' ? '/' : `/${p.page}`} />
}

export const PageLink = (p: PageLinkBaseProps & StyleProps) => {
  // @ts-expect-error "as" type issues
  return <StyledLink as={PageLinkBase} {...p} />
}
