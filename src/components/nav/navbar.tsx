import { pipeWith } from "pipe-ts"
import { css, styled } from "solid-styled-components"
import { devId } from "../../directives/dev-id"
import { useAtom } from "../../hooks/use-atom"
import { use } from "../../hooks/use-directives"
import { assert } from "../../utils/assert"
import { call, mapValues } from "../../utils/lodash"
import { log } from "../../utils/log"
import { breakpoints, makeStyles } from "../../utils/styles"
import { Curve, curveToString, getCircleCurveMultiplier, mirrorCurve, oneLine, square, toRadians } from "./path-utils"
import { NavIcon } from "./nav-icon"
import { useMediaQuery } from "../../hooks/use-media-query"

const MenuContainer = styled('div')({
  // background: '#181818', /* #2f2f2f */
  // color: 'var(--color-subtle)',
  color: 'black',
  width: 'var(--menu-offset)',
  height: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 3,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRight: '1px solid var(--color-subtle)',

  [breakpoints.down('md')]: {
    width: '100%',
    height: 'var(--menu-offset)',
    minHeight: 0,
    bottom: 0,
    top: 'auto',

    borderRight: 'none',
    borderTop: '1px solid var(--color-subtle)',
  }
})

const NavContainer = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',

  textAlign: 'center',
  height: '210px',
  width: '100%',

  [breakpoints.down('md')]: {
    flexDirection: 'row',
    minWidth: '250px',
    width: '42%',
    overflow: 'hidden',
    textAlign: 'center',
    height: '60px',

    '&:after': {

    }, 
  }
})

const NavContainerNew = styled('nav')`
  height: 50px;
  position: relative;
` 
// const styles = makeStyles({
//   nav: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',

//     textAlign: 'center',
//     height: '210px',
//     width: '100%',

//     [breakpoints.down('md')]: {
//       flexDirection: 'row',
//       minWidth: '250px',
//       width: '42%',
//       overflow: 'hidden',
//       textAlign: 'center',
//       height: '60px',

//       '&:after': {

//       }, 
//     }
//   },
// })

export const Navbar = () => {
  const isDesktop$ = useMediaQuery('md')

  const width = 300
  const circleWidth = 60
  const radius = circleWidth / 2

  const index$ = useAtom<number>()
  const precurveSize = 8
  const startPoint$ = () => -(precurveSize+2) + (index$() ?? 0) * circleWidth

  const angle = 90
  const curveMultiplier = pipeWith(angle, toRadians, getCircleCurveMultiplier)

  const curves = call(() => {
    const pre: Curve = [
      Math.round(precurveSize/2+1),.5,
      precurveSize-1, precurveSize - Math.round(precurveSize/2),
      precurveSize,precurveSize,
    ]
    const preMid: Curve = [
      3.5,radius * curveMultiplier-7,
      radius * (1 - curveMultiplier)-2.5,radius - precurveSize + .5,
      radius,radius - precurveSize + .5,
    ]
    const postMid = mirrorCurve(preMid)
    const post = mirrorCurve(pre)

    return mapValues({pre, preMid, postMid, post}, curveToString)
  })


  return (
    <MenuContainer>
      {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}
      <NavContainerNew 
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        
          textAlign: 'center',
          width: `${width}px`,

        })}
      >

        <div
          className={css`
            border-radius: 16px;
            background: #7fffff9e;
            backdrop-filter: blur(2px);
            position: absolute;
            height: 100%;
            width: 100%;
          `}
            // v 2
            // ${square(3)}
            // v -2

          style={oneLine(`clip-path: path('
            M0,0
            h${startPoint$()+2}
            ${curves.pre}
            ${curves.preMid}

            ${curves.postMid}
            ${curves.post}
            h${width - startPoint$() - circleWidth - precurveSize * 2}
            v60 
            h-${width} 
            z
          ');`)}
        />
        {[
          NavIcon.Home,
          NavIcon.About,
          NavIcon.Skills,
          NavIcon.Projects,
          NavIcon.Contact,
        ].map((Icon, i) => <Icon onActivate={() => index$(i)} />)}
      </NavContainerNew>
    </MenuContainer>

  )
}

