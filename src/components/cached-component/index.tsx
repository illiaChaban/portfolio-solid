import { children, createContext, JSX, useContext, createRoot } from 'solid-js'
import { type ResolvedJSXElement } from 'solid-js/types/reactive/signal'

type TContext = {
  getFromCache: (key: string, Component: () => JSX.Element) => JSX.Element
}
const CachedComponentsContext = createContext<TContext>({
  getFromCache: () => [],
})

export const CachedComponentsProvider = (p: { children?: JSX.Element }) => {
  const cachedComponents: Record<string, JSX.Element> = {}
  const getFromCache: TContext['getFromCache'] = (key, Component) => {
    if (!(key in cachedComponents)) {
      createRoot(() => {
        cachedComponents[key] = <Component />
        // cachedComponents[key] = jsx.toArray()
      })
    }
    return cachedComponents[key]
  }

  return (
    <CachedComponentsContext.Provider value={{ getFromCache }}>
      {p.children}
    </CachedComponentsContext.Provider>
  )
}

export const CachedComponent = (p: {
  Component: () => JSX.Element
  key: string
}) => {
  const { getFromCache } = useContext(CachedComponentsContext)

  const el = getFromCache(p.key, p.Component)

  return <>{el}</>
}
