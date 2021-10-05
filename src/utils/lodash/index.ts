// Lodash like helper. Couldn't figure out why the dev env loads the whole lodash library

export const mapValues = <T extends {}, TResult>(
  object: T, 
  mapper: (val: T[keyof T], key: keyof T) => TResult
): {[K in keyof T]: TResult} => {
  const newEntries = Object.entries(object)
    .map(([key, value]) => [
      key, 
      mapper(value as any, key as keyof T)
    ])
  return Object.fromEntries(newEntries) as any
}

export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number'
}

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export const isArray = (val: unknown): val is any[] => {
  return Array.isArray(val)
}