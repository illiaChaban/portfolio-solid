import { onCleanup } from "solid-js"

type Unsubscribe = () => void
export const bindEvent = (
  el: Element, 
  eventName: string, 
  cb: (e: unknown) => void
): Unsubscribe => {
  el.addEventListener(eventName, cb)
  return () => el.removeEventListener(eventName, cb)
}