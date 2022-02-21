import { onCleanup } from 'solid-js'
import { Unsubscribe } from '../types'

interface BindEvent<TReturn> {
  <TEvent = unknown>(
    el: Element | Window | Document,
    eventName: string,
    callback: (e: TEvent) => void,
    options?: AddEventListenerOptions,
  ): TReturn
}
export const bindEvent: BindEvent<Unsubscribe> = (
  el,
  eventName,
  callback,
  options?,
) => {
  el.addEventListener(eventName, callback as any, options)
  return () => el.removeEventListener(eventName, callback as any, options)
}

export const bindEventWithCleanup: BindEvent<void> = (...args) => {
  const unsubscribe = bindEvent(...args)
  onCleanup(unsubscribe)
}

export const waitForEvent = (
  el: Element | Window,
  eventName: string,
): Promise<unknown> => {
  return new Promise(res => {
    bindEvent(el, eventName, res, { once: true })
  })
}
