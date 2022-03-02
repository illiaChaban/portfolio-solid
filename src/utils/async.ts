import { lazy } from 'solid-js'

export const wait = (time: number): Promise<void> =>
  new Promise<void>(res => setTimeout(res, time))

export const lazyWait =
  (time: number): typeof lazy =>
  fn =>
    lazy(() => wait(time).then(fn))
