import { css, keyframes } from "solid-styled-components";
import { invoke } from "../../utils/lodash";
import InkImg from '../../contexts/page-transition/ink-11.png'
import { createMemo } from "solid-js";
import { log } from "../../utils/log";
import {Path2, Path3, Path4, Path5, Path6, Path7, Path8, Path9, Path10, Path11,
  Path12, Path13, Path14, Path15, Path16, Path17, Path18, Path19, Path20, Path21,
  Path22, Path23, Path24, Path25
} from '../../contexts/page-transition/clips-svg_/clips'
import { cx } from "../../utils/styles";

export const framesNum = 25;



export const InkImage = (p: {step?: number}) => {

  const frameInPercent = 100 / framesNum
  const initialPosition = frameInPercent / 2; // center the frame

  const position = createMemo(() => initialPosition + (p.step ?? 0) * frameInPercent);
  const inRange = createMemo(() => position() > 0 && position() < 100)

  return (
    <div className={cx(
      css({position: 'absolute'}),
      !inRange() 
        && css({
          background: '#0c1126',
          top: 0, bottom: 0, right: 0, left: 0,
        }),
      inRange() 
        && css({
          left: '50%',
          top: '50%',
          transform: `translateY(-50%) translateX(-${position()}%)`,
          height: '100%',
          width: `${framesNum * 100}%`,
          background: `url(${InkImg}) no-repeat 0 0`,
          backgroundSize: '100% 100%',
        }),
    )} />
  )
}

export const ClipPath = (p: {step: number}) => {
  const FullPath = () => <path d="M0 0 h1 v1 h-1 z"/>
  const EmptyPath = () => <path d="M0 0 z"/>

  return (
    <>
      {[
        <EmptyPath />,
        <Path2 />,
        <Path3 />,
        <Path4 />,
        <Path5 />,
        <Path6 />,
        <Path7 />,
        <Path8 />,
        <Path9 />,
        <Path10 />,
        <Path11 />,
        <Path12 />,
        <Path13 />,
        <Path14 />,
        <Path15 />,
        <Path16 />,
        <Path17 />,
        <Path18 />,
        <Path19 />,
        <Path20 />,
        <Path21 />,
        <Path22 />,
        <Path23 />,
        <Path24 />,
        <Path25 />,
      ][p.step] ?? <FullPath />} 
    </>
  )
}