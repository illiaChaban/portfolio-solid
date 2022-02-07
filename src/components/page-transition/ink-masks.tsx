import { css } from "solid-styled-components";
import InkImg from './assets/ink.png'
import { createMemo, JSX } from "solid-js";
import { Path2, Path3, Path4, Path5, Path6, Path7, Path8, Path9, Path10, Path11,
  Path12, Path13, Path14, Path15, Path16, Path17, Path18, Path19, Path20, Path21,
  Path22, Path23, Path24, Path25 } from './assets/clips'
import { cx } from "../../utils/styles";
import { Ref } from "../../hooks/use-ref";
import { use } from "../../hooks/use-directives";
import { devId } from "../../directives/dev-id";
import { makeStyles } from "../../theme";

export const framesNum = 25;

const useStyles = makeStyles()({
  outOfRange: css({
    background: '#0c1126',
    top: 0, bottom: 0, right: 0, left: 0,
  }),
  inRange: css({
    left: 0,
    height: '100%',
    width: `${framesNum * 100}%`,
    background: `url(${InkImg}) no-repeat 0 0`,
    backgroundSize: '100% 100%',
  })
})

export const InkImage = (p: {
  step: number, 
  className?: string, 
  style?: JSX.CSSProperties,
  ref?: Ref<Element>
}) => {

  const frameInPercent = 100 / framesNum

  const position$ = createMemo(() => p.step * frameInPercent);
  const inRange$ = createMemo(() => position$() >= 0 && position$() < 100)

  const styles = useStyles()
  return (
    <div 
      ref={use(p.ref, devId('ink-mask'))}
      className={cx(
        p.className,
        css({position: 'absolute'}),
        inRange$() 
          ? [styles.inRange(), css({transform: `translateX(-${position$()}%)`})]
          : styles.outOfRange()
      )}
      style={p.style} 
    />
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