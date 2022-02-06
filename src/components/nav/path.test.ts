import {mirrorCurve, rotateCurve90Deg} from './path-utils'
import { describe, expect, it } from 'vitest'

describe('Path mirroring', () => {

  it("Should not match", () => {
    expect(
      mirrorCurve([0,3, 5,2, 5,5])
    ).not.toBe([0,0, 0,0, 0,0])
  })

  it('Should mirror horizontal curve 1', () => {
    expect(
      mirrorCurve([3,0, 5,2, 5,5])
    ).toEqual([0, -3, 2, -5, 5,-5])
  })

  it('Should mirror horizontal curve 2', () => {
    expect(
      mirrorCurve([3,1, 4,3, 5,5])
    ).toEqual([1, -2, 2, -4, 5,-5])
  })

  it('Should mirror horizontal curve 3', () => {
    expect(
      mirrorCurve([0,3, 2,5, 5,5])
    ).toEqual([3, 0, 5, -2, 5,-5])
  })

  it('Should mirror horizontal curve 4', () => {
    expect(
      mirrorCurve([1,3, 3,4, 5,5])
    ).toEqual([2,-1, 4,-2, 5,-5])
  })


  // it('Should flip vertical curve', () => {
  //   expect(
  //     mirrorCurve([0, 3, -2, 5, -5, 5])
  //   ).toEqual([ 5, 5])
  // })

})

describe("Path rotating", () => {
  it('Should rotate 90 deg', () => {
    expect(
      rotateCurve90Deg([0,3, 5,2, 5,5])
    ).toEqual(
      [-3,0, -2,5, -5,5]
    )
  })
})