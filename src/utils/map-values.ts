
type Key = string | number | symbol
export const mapValues = <TKey extends Key, TValue, TNewValue>(
  obj: Record<TKey, TValue>, 
  map: (value: TValue, key: TKey) => TNewValue
): Record<TKey, TNewValue> => {
  const newEntries = Object.entries(obj)
    .map(([key, value]) => [key, map(value as TValue, key as TKey)])
  return Object.fromEntries(newEntries)
}