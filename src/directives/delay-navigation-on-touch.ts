import { useMediaQuery } from '../hooks'
import { hoverMedia, bindEventWithCleanup } from '../utils'

export const delayNavigationOnTouch =
  (delay: number) => (node: HTMLAnchorElement) => {
    const hasHover$ = useMediaQuery(hoverMedia)

    bindEventWithCleanup(node, 'click', (e: MouseEvent) => {
      if (hasHover$()) return
      e.preventDefault()
      const href = node.href
      href &&
        setTimeout(() => {
          window.location.assign(href)
        }, delay)
    })
  }
