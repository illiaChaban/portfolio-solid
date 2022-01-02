import { Accessor, onCleanup } from "solid-js"
import { Breakpoint, breakpoints } from "../utils/styles"
import { useAtom } from "./use-atom"

export const useMediaQuery = (
  breakpoint: Breakpoint, 
  direction: 'up' | 'down' = 'up',
): Accessor<boolean> => {
  const query = breakpoints[direction](breakpoint, false)

  const media = window.matchMedia(query)

  const matches$ = useAtom<boolean>(media.matches)

  const callback = (e: MediaQueryListEvent) => matches$(e.matches)
  media.addEventListener('change', callback)
  onCleanup(() => media.removeEventListener('change', callback))

  return () => matches$()
}

