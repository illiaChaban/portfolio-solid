import { createEffect, on, onCleanup, onMount } from "solid-js"
import { Unsubscribe } from "../../types"
import { waitForEvent } from "../../utils/events"
import { useRef } from "../../utils/useRef"

// TODO:
// - move global styles here
// - fix set layer dimensions on mobile
// - update ink picture with ligher main color ?
export const PageTranstion = (p: {onTransitionIn: () => void}) => {
  const transitionLayerRef = useRef<HTMLDivElement>()
  const backgroundLayerRef = useRef<HTMLDivElement>()

  onMount(() => {
    const transitionLayer = transitionLayerRef.current;
    const backgroundLayer = backgroundLayerRef.current;

    const frameProportion = 1.78; //png frame aspect ratio
    const frames = 25; //number of png frames
  
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
  
    const animate = (): Unsubscribe => {
      const classes = transitionLayer.classList

      let canceled = false
      const cancel = () => canceled = true;

      const waitForAnimation = () => waitForEvent(backgroundLayer, 'animationend')

      ;(async () => {
        classes.remove('closing')
        if (!classes.contains('opening')) {
          classes.add('visible','opening');
          await waitForAnimation()
        }
        if (canceled) return

        classes.remove('opening')
        p.onTransitionIn()
        classes.add('closing');

        await waitForAnimation()
        if (canceled) return
        classes.remove('visible', 'closing');
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
  
      backgroundLayer.style.width = layerWidth*frames+'px';
      backgroundLayer.style.height = layerHeight+'px';

      console.log('set layer dimensions', {layerHeight, layerWidth})
  
      settingLayerDimensions = false;
    }

    createEffect(on(() => p.onTransitionIn, () => {
      // ref.current.classList.add(animationStyle)
      // const id = setTimeout(() => p.onTransitionIn?.(), animationDuration / 2)
      // const unbind = bindEvent(ref.current, 'animationend', () => ref.current.classList.remove(animationStyle))
      // onCleanup(() => {
      //   clearTimeout(id);
      //   unbind()
      // })
      // console.log('on transition in changed')
      const cancel = animate()
      onCleanup(cancel)
    }))
  
  })
 

  return (
    // <div 
    //   ref={ref}
    //   className={cx(
    //     styles.cover, 
    //   )}
    // ></div>

    <div class="cd-transition-layer" ref={transitionLayerRef}> 
      <div class="bg-layer" ref={backgroundLayerRef}></div>
    </div>
  )
}