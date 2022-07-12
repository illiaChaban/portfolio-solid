export const getUniqueId = (() => {
  const counts: Record<string, number> = {}
  return (prefix: string) => {
    counts[prefix] = (counts[prefix] ?? 0) + 1
    const count = counts[prefix]
    return count === 1 ? prefix : `${prefix}-${count}`
  }
})()
