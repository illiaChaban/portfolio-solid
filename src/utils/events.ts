import { onCleanup } from "solid-js"
import { Unsubscribe } from "../types"

interface BindEvent<TReturn> {
  (
    el: Element | Window, 
    eventName: string, 
    callback: (e: unknown) => void,
    options?: AddEventListenerOptions,
  ): TReturn
}
export const bindEvent: BindEvent<Unsubscribe> = (
  el, 
  eventName, 
  callback,
  options?,
) => {
  el.addEventListener(eventName, callback, options)
  return () => el.removeEventListener(eventName, callback, options)
}

export const bindEventAndCleanup: BindEvent<void> = (...args) => {
  const unsubscribe = bindEvent(...args)
  onCleanup(unsubscribe)
} 

export const waitForEvent = (
  el: Element | Window, 
  eventName: string
): Promise<unknown> => {
  return new Promise((res) => {
    bindEvent(el, eventName, res, { once: true })
  })
}