import { Component, JSXElement } from 'solid-js'
import { AnyObj, Falsy, FC } from '../types'
import { isTruthy } from '../utils'

export const withProviders =
  (...providers: (FC<{ children: JSXElement }> | Falsy)[]) =>
  <T extends AnyObj>(Component: FC<T>): FC<T> => {
    const trueProviders = providers.filter(isTruthy)
    return ([...trueProviders, Component] as Component[]).reduce(
      (Prev, Curr): Component => {
        return props => (
          <Prev>
            <Curr {...props} />
          </Prev>
        )
      },
    )
  }
