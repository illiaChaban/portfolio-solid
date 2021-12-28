import { pipeWith } from "pipe-ts"
import { css, styled } from "solid-styled-components"
import { devId } from "../../directives/dev-id"
import { useAtom } from "../../hooks/use-atom"
import { use } from "../../hooks/use-directives"
import { assert } from "../../utils/assert"
import { call } from "../../utils/lodash"
import { log } from "../../utils/log"
import { breakpoints, makeStyles } from "../../utils/styles"
import { buildCurve, cubicBezierCircle, getCircleCurveMultiplier, oneLine, toRadians } from "./path-utils"
import { NavIcon } from "./nav-icon"

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
  height: 60px;
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
  const width = 300
  const circleWidth = 60
  const radius = circleWidth / 2

  const index$ = useAtom<number>()
  const precurveHeight = 8
  const startPoint = () => -precurveHeight + (index$() ?? 0) * circleWidth

  // console.log(oneLine(`clip-path: path(
  //   'M0,0 h${startPoint()-2}
  //     a${radius},${radius} 0 1,0 ${circleWidth},0 h${
  //     width - startPoint() - circleWidth
  //   } v60 h-${width} z'
  // );`))

  console.log(
    cubicBezierCircle(90, 40),
    cubicBezierCircle(180, 40),
  )

  const angle = 90
  const curveMultiplier = pipeWith(angle, toRadians, getCircleCurveMultiplier)

  buildCurve(80, 40)
  return (
  
    <NavContainerNew 
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      
        textAlign: 'center',
        width: `${width}px`,

      })}
      // style={"clip-path: path('M0,0 a30,30 0 1,0 80,0 h220 v60 h-300 z');"}
    >

      <div
        className={css`
          background: yellow;
          border-radius: 16px;
          background: yellow;
          position: absolute;
          height: 100%;
          width: 100%;
          /* left: 0; */
        `}
          // 
          // l7,7
          // a${29},${25} 0 1,0 ${circleWidth},0
          // a29,25 0 1,0 ${circleWidth},0
          // s 27,52 ${circleWidth},0
          // a${radius},${radius} 0 1,0 ${circleWidth},0
          // ${cubicBezierCircle(-180, 40)}

          // s 5,-1 5,5
          // a8,8 0 0,1 7,-7


        style={oneLine(`clip-path: path('
          M0,0
          h${startPoint()+2}
          c 
          ${Math.round(precurveHeight/2+1)},.5 
          ${precurveHeight-1}, ${precurveHeight - Math.round(precurveHeight/2)}
          ${precurveHeight},${precurveHeight}
          c 
          3,${radius * curveMultiplier-7} 
          ${radius * (1 - curveMultiplier)-4},${radius - precurveHeight} 
          ${radius},${radius - precurveHeight} 
          c 
          ${radius * curveMultiplier},0 
          ${radius},-${radius * (1-curveMultiplier)}, 
          ${radius},-${radius}
          h${width - startPoint() - circleWidth}
          v60 
          h-${width} 
          z
        ');`)}
        // style="clip-path: url(#nav-clip)"
      />
      {/* <svg width="0" height="0">
        <defs>
          <clipPath id={"nav-clip"}>
            <path d={oneLine(`
               M0,0
               h${startPoint()}
               a${radius},${radius} 0 1,0 ${circleWidth},0
               h${width - startPoint() - circleWidth}
               v60 
               h-${width} 
               z
              `)}
            />
            <path d={oneLine(`
               M0,0
               h${startPoint()-7}
               a8,8 0 0,1 7,7
               h${circleWidth}
               a8,8 0 0,1 7,7
               h${width - startPoint() - circleWidth -7}
               v60
               h-${width} 
               z
              `)}
            />
          </clipPath>
        </defs>
      </svg> */}

      {[
        NavIcon.Home,
        NavIcon.About,
        NavIcon.Skills,
        NavIcon.Projects,
        NavIcon.Contact,
      ].map((Icon, i) => <Icon onActivate={() => index$(i)} />)}
      {/* <NavIcon.Home onActivate={() => index$(0)}/>
      <NavIcon.About onActivate={() => index$(1)}/>
      <NavIcon.Skills onActivate={() => index$(2)}/>
      <NavIcon.Projects onActivate={() => index$(3)}/>
      <NavIcon.Contact onActivate={() => index$(4)}/> */}
    </NavContainerNew>
    // <nav 
    //   class={styles.nav}
    // >
      // {/* TODO: navbar */}
      // {/* https://www.youtube.com/watch?v=ArTVfdHOB-M&ab_channel=OnlineTutorials */}

  )
}
