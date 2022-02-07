import { pipe } from "pipe-ts"

const max = (max: number) => (v: number) => Math.min(max, v)
const min = (min: number) => (v: number) => Math.max(min, v)
export const range = (minNum: number, maxNum: number) => pipe(min(minNum), max(maxNum))
