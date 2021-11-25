export function assert(condition: unknown, msg?: string): asserts condition {
  if (condition) return;
  throw new Error(msg ?? 'Assertion failed')
}

/** 
 * Use sparingly as it doesn't actually enforce the value. 
 * Use only when avoiding error is better than throwing 
 * */
export function assertWarn(condition: unknown, msg?: string): asserts condition {
  if (condition) return;
  console.warn(msg ?? 'Assertion failed')
}

export function returnAsserted<T>(val: T | null | undefined | 0, msg?: string): T {
  assert(val, msg)
  return val
}