export function assert(condition: unknown, msg?: string): asserts condition {
  if (condition) return;
  throw new Error(msg ?? 'Assertion failed')
}

export function returnAsserted<T>(val: T | null | undefined | 0, msg?: string): T {
  assert(val, msg)
  return val
}