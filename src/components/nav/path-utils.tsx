import { assert } from "../../utils/assert"
import { call } from "../../utils/lodash"
import { log } from "../../utils/log"

export type Curve = [number, number, number, number, number, number]
export const mirrorCurve = (curve: Curve): Curve => {
  const [x1, y1, x2, y2, xEnd, yEnd] = curve
  return [xEnd - x2, y2 - yEnd, xEnd - x1, y1 - yEnd, xEnd, -yEnd]
}

export const oneLine = (str: string) => str.split('\n').join(' ')



const round = (str: TemplateStringsArray, ...values: number[]) => {
  return str
    .flatMap((v, i) => [v, i in values ? values[i].toFixed(2) : ''])
    .join('')
}

/**
 * More info:
 * https://spencermortensen.com/articles/bezier-circle/
 * https://pomax.github.io/bezierinfo/#circles_cubic
 * https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves
 */
export const getCircleCurveMultiplier = (radians: number) => 4/3 * Math.tan( radians/4 )
export const toRadians = (angleDegrees: number) => angleDegrees / (180 / Math.PI)

export const cubicBezierCircle = (angleDegrees: number, radius: number) => {
  // radians
  const angle = toRadians(angleDegrees)
  const curveMultiplier = 4/3 * Math.tan( angle/4 )
  
  const control1 = {
    x: radius,
    y: radius * curveMultiplier
  }
  
  const control2 = {
    x: radius * ( Math.cos(angle) + curveMultiplier * Math.sin(angle) ),
    y: radius * ( Math.sin(angle) - curveMultiplier * Math.cos(angle) ),
  }
  
  const end = {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }

  const value = round`c ${control1.x},${control1.y} ${control2.x},${control2.y} ${end.x},${end.y}`
  return value
  // return [control1, control2, end]
}

export const buildCurve = (halfCircleAngle: number, radius: number): string => {
  assert(halfCircleAngle > 0 && halfCircleAngle < 90)
  type Coords = {x: number, y: number}

  halfCircleAngle = toRadians(halfCircleAngle)

  const precurveHeight = call(() => {
    const angleDiff = toRadians(90) - halfCircleAngle
    const height = radius * Math.tan(angleDiff)
    return Math.round(height);
  })



  const preCurve: Curve = [
    Math.round(precurveHeight/2+1), .5,
    precurveHeight-1, precurveHeight - Math.round(precurveHeight/2),
    precurveHeight, precurveHeight
  ]
  const postCurve = mirrorCurve(preCurve)



  const curveMiddle = {x: radius, y: radius - precurveHeight}
  // const precurve = 
  log({precurveHeight, curveMiddle})


  return oneLine(`
    c

  `)
}

