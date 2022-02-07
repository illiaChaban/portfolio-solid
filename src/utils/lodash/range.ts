import { flow } from '..'

const max = (max: number) => (v: number) => Math.min(max, v)
const min = (min: number) => (v: number) => Math.max(min, v)
export const range = (minNum: number, maxNum: number) =>
  flow(min(minNum), max(maxNum))
