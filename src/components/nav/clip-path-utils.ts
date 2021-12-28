type Curve = [number, number, number, number, number, number]
export const flipCurve = (curve: Curve): Curve => {
  const [x1, y1, x2, y2, xEnd, yEnd] = curve
  return [x2 - xEnd, y2 - yEnd, xEnd - x1, y1 - yEnd, xEnd, -yEnd]
}