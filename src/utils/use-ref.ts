export type Ref<T> = ((el: T) => void) & { current: T }

/** Workaround for type issues when passing ref variable */
export const useRef = <T extends Element>(): Ref<T> => {
  const fn = function(el: T): void {
    fn.current = el
  } as Ref<T>
  return fn
}
