import { flow, iif, pipe } from '../../utils'
import {
  toRadians,
  getCircleCurveMultiplier,
  Curve,
  mirrorCurve,
  rotateCurve90Deg,
  curveToString,
} from './path-utils'

const BUTTON_WIDTH = 60
const NAV_BUTTONS = 5
export const NAV_LENGTH = BUTTON_WIDTH * NAV_BUTTONS

const PRECURVE_WIDTH = 8

type Direction = 'down' | 'right'

const curve = (direction: Direction) => {
  const circleWidth = BUTTON_WIDTH
  const radius = circleWidth / 2

  const angle = 90
  const curveMultiplier = pipe(angle, toRadians, getCircleCurveMultiplier)

  const pre: Curve = [
    Math.round(PRECURVE_WIDTH / 2 + 1),
    0.5,
    PRECURVE_WIDTH - 1,
    PRECURVE_WIDTH - Math.round(PRECURVE_WIDTH / 2),
    PRECURVE_WIDTH,
    PRECURVE_WIDTH,
  ]
  const preMid: Curve = [
    3.5,
    radius * curveMultiplier - 7,
    radius * (1 - curveMultiplier) - 2.5,
    radius - PRECURVE_WIDTH + 0.5,
    radius,
    radius - PRECURVE_WIDTH + 0.5,
  ]
  const postMid = mirrorCurve(preMid)
  const post = mirrorCurve(pre)

  return [pre, preMid, postMid, post]
    .map(flow(iif(direction === 'down', rotateCurve90Deg), curveToString))
    .join(' ')
}

const CURVE_WIDTH = PRECURVE_WIDTH + BUTTON_WIDTH + PRECURVE_WIDTH

const SIDE_BUFFER_WIDTH =
  (NAV_BUTTONS - 1) * BUTTON_WIDTH - PRECURVE_WIDTH + PRECURVE_WIDTH

export const NAV_HEIGHT = 56 // TODO: don't hardcode ?

export const calcClipPath = (direction: Direction, windowLength: number) => {
  const sideLength = (windowLength - CURVE_WIDTH) / 2 + SIDE_BUFFER_WIDTH

  const fullLength = sideLength * 2 + CURVE_WIDTH

  return {
    path:
      direction === 'right'
        ? `M 0 0 h ${sideLength} ${curve(
            'right',
          )} h ${sideLength} v ${NAV_HEIGHT} h -${fullLength} z`
        : `M 0 0 h ${NAV_HEIGHT} v ${sideLength} ${curve(
            'down',
          )} v ${sideLength} h -${NAV_HEIGHT} z`,
    fullLength,
  }
}
