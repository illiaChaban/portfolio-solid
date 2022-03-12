import { Component, onMount } from 'solid-js'
import { loadScript } from '../utils/load-script'

export const GTag: Component = p => {
  onMount(async () => {
    const id = 'UA-178460557-1'

    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)

    const w = window as any
    w.dataLayer = w.dataLayer || []
    const dataLayer = w.dataLayer

    function gtag(...args: any[]) {
      dataLayer.push(args)
    }
    function gtagEvent(eventName: any, config: any) {
      gtag('event', eventName, config)
    }
    function gtagSetPath() {
      gtagEvent('page_view', {
        page_path: location.pathname,
      })
    }

    gtag('js', new Date())
    gtag('config', id)
    gtagSetPath()
  })
  return null
}
