import { css, keyframes } from "solid-styled-components";
import { invoke } from "../../utils/lodash";
import InkImg from '../../contexts/page-transition/ink-11.png'
import { createMemo } from "solid-js";
import { log } from "../../utils/log";

const framesNum = 25;
const frameInPercent = 100 / framesNum
const initialPosition = frameInPercent / 2; // center the frame


// const styles = invoke(() => {
//   const transitionLayer = css({
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     zIndex: 2,
//     height: '100%',
//     width: '100%',
//     opacity: 0,
//     visibility: 'hidden',
//     overflow: 'hidden',
//   })

//   const frameInPercent = 100 / framesNum
//   const initialPosition = frameInPercent / 2; // center the frame
//   const showFramesNum = framesNum - 5
//   const animationTime = 400

//   const bgLayer = css({
//     position: 'absolute',
//     left: '50%',
//     top: '50%',
//     transform: `translateY(-50%) translateX(-${initialPosition}%)`,
//     /* its dimentions will be overwritten using jQuery to proportionally fit the viewport */
//     height: '100%',
//     /* our sprite is composed of 25 frames */
//     width: `${framesNum * 100}%`,
//     background: `url(${InkImg}) no-repeat 0 0`,
//     backgroundSize: '100% 100%',
//     opacity: 1,
//   })
//   const visible = css({
//       opacity: 1,
//       visibility: 'visible',
//   });



//   const sequence = keyframes`
//     0% {
//       transform: translateY(-50%) translateX(-${initialPosition}%);
//     }
//     100% {
//       transform: translateY(-50%) translateX(-${initialPosition + showFramesNum * frameInPercent}%);
//     }
//   `
//   const sequenceReverse = keyframes`
//     0% {
//       transform: translateY(-50%) translateX(-${initialPosition + showFramesNum * frameInPercent}%);
//     }
//     100% {
//       transform: translateY(-50%) translateX(-${initialPosition}%);
//     }
//   `
//   const opening = css({
//     [`& .${bgLayer}`]: {
//       animation: `${sequence} ${animationTime / 1000}s steps(${showFramesNum})`,
//       animationFillMode: 'forwards',
//     }
//   })
//   const closing = css({
//     [`& .${bgLayer}`]: {
//       animation: `${sequenceReverse} ${animationTime / 1000}s steps(${showFramesNum})`,
//       animationFillMode: 'forwards',
//     }
//   })

//   return {
//     transitionLayer,
//     bgLayer,
//     visible,
//     opening,
//     closing,
//   }
// })

export const InkImage = (p: {step?: number}) => {
  const position = createMemo(() => initialPosition + (p.step ?? 0) * frameInPercent);

  /* log.accessors({position}) */

  return (
    <div className={css({
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translateY(-50%) translateX(-${position()}%)`,
      /* its dimentions will be overwritten using jQuery to proportionally fit the viewport */
      height: '100%',
      /* our sprite is composed of 25 frames */
      width: `${framesNum * 100}%`,
      background: `url(${InkImg}) no-repeat 0 0`,
      backgroundSize: '100% 100%',
      opacity: 1,
    })} />
  )
}