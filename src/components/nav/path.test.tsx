import {mirrorCurve} from './path-utils'

describe('Path transforms', () => {

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


  // it('Should flip vertical curve', () => {
  //   expect(
  //     flipCurve([0, 3, -2, 5, -5, 5])
  //   ).toEqual([ 5, 5])
  // })

})