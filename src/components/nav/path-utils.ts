export type Curve = [number, number, number, number, number, number]
export const mirrorCurve = (curve: Curve): Curve => {
  const [x1, y1, x2, y2, xEnd, yEnd] = curve
  return [xEnd - x2, y2 - yEnd, xEnd - x1, y1 - yEnd, xEnd, -yEnd]
}
export const rotateCurve90Deg = (curve: Curve): Curve => {
  const [x1, y1, x2, y2, xEnd, yEnd] = curve
  return [-y1, x1, -y2, x2, -yEnd, xEnd]
}

export const oneLine = (str: string) =>
  str.split('\n').join(' ').replace(/\s+/g, ' ')

/**
 * More info:
 * https://stackoverflow.com/questions/30277646/svg-convert-arcs-to-cubic-bezier
 * https://spencermortensen.com/articles/bezier-circle/
 * https://pomax.github.io/bezierinfo/#circles_cubic
 * https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves
 */
export const getCircleCurveMultiplier = (radians: number) =>
  (4 / 3) * Math.tan(radians / 4)
export const toRadians = (angleDegrees: number) =>
  angleDegrees / (180 / Math.PI)
export const curveToString = (curve: Curve): string =>
  'c ' + curve.map(num => num.toFixed(1)).join(', ')

// For debugging
export const square = (l: number) => `
  h -${l / 2}
  v ${l}
  h ${l}
  v -${l}
  h -${l / 2}
`
