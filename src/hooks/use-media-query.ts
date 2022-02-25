import { Accessor, onCleanup } from 'solid-js'
import { useAtom } from './use-atom'

export const useMediaQuery = (...queries: string[]): Accessor<boolean> => {
  console.log('use media query')
  const query = queries.join(' and ')

  const media = window.matchMedia(query)

  const matches$ = useAtom<boolean>(media.matches)

  const callback = (e: MediaQueryListEvent) => matches$(e.matches)
  media.addEventListener('change', callback)
  onCleanup(() => media.removeEventListener('change', callback))

  return () => matches$()
}
