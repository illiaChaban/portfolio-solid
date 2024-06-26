export const getCssVariable = (name: string): string => {
  const bodyStyle = getComputedStyle(document.body)
  const value = bodyStyle.getPropertyValue(name).trim()
  return value
}

export const hoverMedia = '(hover: hover) and (pointer: fine)'
