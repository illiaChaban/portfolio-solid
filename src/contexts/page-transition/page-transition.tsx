import { createEffect, on, onCleanup, onMount } from "solid-js"
import { css, keyframes } from "solid-styled-components"
import { Unsubscribe } from "../../types"
import { waitForEvent } from "../../utils/events"
import { invoke } from "../../utils/lodash"
import { useRef } from "../../utils/use-ref"
import InkImg from './ink-11.png' // 11, 14

const framesNum = 25;
const styles = invoke(() => {
  const transitionLayer = css({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    height: '100%',
    width: '100%',
    opacity: 0,
    visibility: 'hidden',
    overflow: 'hidden',
  })

  const frameInPercent = 100 / framesNum
  const initialPosition = frameInPercent / 2; // center the frame
  const showFramesNum = framesNum - 5
  const animationTime = 400

  const bgLayer = css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translateY(-50%) translateX(-${initialPosition}%)`,
    /* its dimentions will be overwritten using jQuery to proportionally fit the viewport */
    height: '100%',
    /* our sprite is composed of 25 frames */
    width: `${framesNum * 100}%`,
    background: `url(${InkImg}) no-repeat 0 0`,
    backgroundSize: '100% 100%',
    opacity: 1,
  })
  const visible = css({
      opacity: 1,
      visibility: 'visible',
  });



  const sequence = keyframes`
    0% {
      transform: translateY(-50%) translateX(-${initialPosition}%);
    }
    100% {
      transform: translateY(-50%) translateX(-${initialPosition + showFramesNum * frameInPercent}%);
    }
  `
  const sequenceReverse = keyframes`
    0% {
      transform: translateY(-50%) translateX(-${initialPosition + showFramesNum * frameInPercent}%);
    }
    100% {
      transform: translateY(-50%) translateX(-${initialPosition}%);
    }
  `
  const opening = css({
    [`& .${bgLayer}`]: {
      animation: `${sequence} ${animationTime / 1000}s steps(${showFramesNum})`,
      animationFillMode: 'forwards',
    }
  })
  const closing = css({
    [`& .${bgLayer}`]: {
      animation: `${sequenceReverse} ${animationTime / 1000}s steps(${showFramesNum})`,
      animationFillMode: 'forwards',
    }
  })

  return {
    transitionLayer,
    bgLayer,
    visible,
    opening,
    closing,
  }
})

// TODO:
// - fix set layer dimensions on mobile
export const PageTransition = (p: {onTransitionIn: () => void}) => {
  const transitionLayerRef = useRef<HTMLDivElement>()
  const backgroundLayerRef = useRef<HTMLDivElement>()

  onMount(() => {
    const transitionLayer = transitionLayerRef.current;
    const backgroundLayer = backgroundLayerRef.current;

    const frameProportion = 1.78; //png frame aspect ratio
  
    let settingLayerDimensions = false;
  
    //set transitionBackground dimentions
    setLayerDimensions();
    window.addEventListener('resize', () => {
      console.log('resize')
      if( !settingLayerDimensions ) {
        settingLayerDimensions = true;
        (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
      }
    });
  
    const animate = (callback: () => void): Unsubscribe => {
      const classes = transitionLayer.classList

      let canceled = false
      const cancel = () => canceled = true;

      const waitForAnimation = () => waitForEvent(backgroundLayer, 'animationend')

      ;(async () => {
        classes.remove(styles.closing)
        if (!classes.contains(styles.opening)) {
          classes.add(styles.visible, styles.opening);
          await waitForAnimation()
        }
        if (canceled) return

        classes.remove(styles.opening)
        callback()
        classes.add(styles.closing);

        await waitForAnimation()
        if (canceled) return
        classes.remove(styles.visible, styles.closing);
      })()

      return cancel
    }
  
    // vanilla JS window width and height
    function getWindowWidthHeight() {
      var w=window,
      d=document,
      e=d.documentElement,
      g=d.getElementsByTagName('body')[0],
      x=w.innerWidth||e.clientWidth||g.clientWidth,
      y=w.innerHeight||e.clientHeight||g.clientHeight;
      return [x,y];
    };
  
    function setLayerDimensions() {
      const [windowWidth, windowHeight] = getWindowWidthHeight();
      let layerHeight, layerWidth;
  
      if( windowWidth/windowHeight > frameProportion ) {
        layerWidth = windowWidth;
        layerHeight = layerWidth/frameProportion;
      } else {
        layerHeight = windowHeight*1.2;
        layerWidth = layerHeight*frameProportion;
      }
  
      backgroundLayer.style.width = layerWidth*framesNum+'px';
      backgroundLayer.style.height = layerHeight+'px';

      console.log('set layer dimensions', {layerHeight, layerWidth})
  
      settingLayerDimensions = false;
    }

    createEffect(on(
      () => p.onTransitionIn, 
      () => {
        const cancel = animate(p.onTransitionIn)
        onCleanup(cancel)
      }
    ))
  
  })

  return (
    <div 
      class={styles.transitionLayer} 
      ref={transitionLayerRef}
    > 
      <div 
        class={styles.bgLayer} 
        ref={backgroundLayerRef}
      />
    </div>
  )
}