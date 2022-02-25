import { flow } from '..'

const min = (min: number) => (v: number) => Math.max(min, v)
const max = (max: number) => (v: number) => Math.min(max, v)
export const minMax = (minNum: number, maxNum: number) =>
  flow(min(minNum), max(maxNum))
