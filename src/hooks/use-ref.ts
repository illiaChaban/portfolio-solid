export type RefSetter<T = Element> = (el: T) => void
export type Ref<T = Element> = RefSetter<T> & { current: T }

/** Workaround for type issues when passing ref variable */
export const useRef = <T extends Element>(el?: T): Ref<T> => {
  const fn = function (el: T): void {
    fn.current = el
  } as Ref<T>
  el && fn(el)
  return fn
}
