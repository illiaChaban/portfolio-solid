import { useNavigate as useNavigateBase, NavigateOptions } from "solid-app-router";
import { createContext, createMemo, useContext, JSX, createSignal, createEffect, on } from "solid-js";
import { returnAsserted } from "../../utils/assert";
import { PageTransition } from './page-transition'

type TPageTransitionContext = {
  navigate: (to: string, options?: Pick<NavigateOptions, 'replace'>) => void
  getPathname: () => string
}
type NavigateParams = Parameters<TPageTransitionContext['navigate']>

const PageTransitionContext = createContext<TPageTransitionContext>()

// TODO: deal with quick consecutive navigations
export const PageTransitionProvider = (p: {children?: JSX.Element}) => {
  const navigateBase = useNavigateBase()
  const [navParams, setNavParams] = createSignal<NavigateParams>([location.pathname])

  const navigate: TPageTransitionContext['navigate'] = (to, options) => {
    to = to.replace(location.origin, '')
    if (to === navParams()[0]) return;
    setNavParams([to, options])
  }

  const PageTransitionHandler = () => {
    const onTransitionIn = createMemo(on(navParams, () => {
      return () => navigateBase(...navParams())
    }))
    return <PageTransition onTransitionIn={onTransitionIn()} />
  }

  return (
    <PageTransitionContext.Provider 
      value={{
        navigate, 
        getPathname: () => navParams()[0],
      }}
    >
      <PageTransitionHandler />
      {p.children}
    </PageTransitionContext.Provider>
  )
}

export const usePageTransition = () => returnAsserted(
  useContext(PageTransitionContext), 
  "Page transition context was not provided"
)

