import { Unsubscribe } from "../types"

export const bindEvent = (
  el: Element, 
  eventName: string, 
  callback: (e: unknown) => void,
  options?: AddEventListenerOptions,
): Unsubscribe => {
  el.addEventListener(eventName, callback, options)
  return () => el.removeEventListener(eventName, callback, options)
}

export const waitForEvent = (
  el: Element, 
  eventName: string
): Promise<unknown> => {
  return new Promise((res) => {
    bindEvent(el, eventName, res, { once: true })
  })
}