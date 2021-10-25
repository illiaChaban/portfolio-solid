import { Unsubscribe } from "../types"

export const bindEvent = (
  el: Element, 
  eventName: string, 
  callback: (e: unknown) => void
): Unsubscribe => {
  el.addEventListener(eventName, callback)
  return () => el.removeEventListener(eventName, callback)
}

export const bindEventOnce = (
  el: Element, 
  eventName: string, 
  callback: (e: unknown) => void
): void => {
  let unsubscriber: Unsubscribe
  const updatedCallback = (e: unknown) => {
    callback(e)
    unsubscriber?.()
  }
  unsubscriber = bindEvent(el, eventName, updatedCallback)
}

export const waitForEvent = (
  el: Element, 
  eventName: string
): Promise<unknown> => {
  return new Promise((res) => bindEventOnce(el, eventName, res))
}