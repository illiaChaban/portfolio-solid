import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js"
import { css } from 'solid-styled-components'
import { bindEvent } from "../../utils/bind-event"
import { cx, makeStyles } from "../../utils/styles/make-styles"
import { useRef } from "../../utils/useRef"

const styles = makeStyles({
  cover: {
    width: '100vw',
    height: '100vh',
    background: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
    opacity: 0,
    transition: 'opacity 1s',
    display: 'block',
    pointerEvents: 'none'
  },
  hide: {
    display: 'none'
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0,
  },
      
  // 50% {
  //   opacity: 1;
  // }

  // showTransition: `
  //   animation: fadeInOut .6s;
  //   animation-fill-mode: forwards;
  //   @keyframes fadeInOut {
  //     0% {
  //       opacity: 0;
  //     }

  //     100% {
  //       opacity: 1;
  //     }
  //   }
  // `,
  // showTransition2: `
  //   animation: fadeInOut2 .6s;
  //   @keyframes fadeInOut2 {
  //     0% {
  //       opacity: 0;
  //     }
    
  //     50% {
  //       opacity: 1;
  //     }

  //     0% {
  //       opacity: 0;
  //     }
  //   }
  // `
})

const animationDuration = 400
const animationStyle = css`
  animation: fadeInOut ${animationDuration / 1000}s;
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`

export const PageTranstion = (p: {onTransitionIn?: () => void}) => {
  // const ref = useRef<HTMLDivElement>()


  // createEffect(on(() => p.onTransitionIn, () => {
  //   ref.current.classList.add(animationStyle)
  //   const id = setTimeout(() => p.onTransitionIn?.(), animationDuration / 2)
  //   const unbind = bindEvent(ref.current, 'animationend', () => ref.current.classList.remove(animationStyle))
  //   onCleanup(() => {
  //     clearTimeout(id);
  //     unbind()
  //   })
  //   console.log('on transition in changed')


  // }))

  onMount(() => {
    const transitionL = document.querySelector('.cd-transition-layer'),
    transitionB = transitionL.querySelector('.bg-layer');
  
    const animationEndEvents = ['webkitAnimationEnd', 'onanimationend', 'msAnimationEnd', 'animationend'],
      frameProportion = 1.78, //png frame aspect ratio
      frames = 25; //number of png frames
  
    let settingLayerDimensions = false;
  
    //set transitionBackground dimentions
    setLayerDimensions();
    window.addEventListener('resize', () => {
      if( !settingLayerDimensions ) {
        settingLayerDimensions = true;
        (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
      }
    });
  
    //open modal window
    // modalT.addEventListener('click', e => {
    // 	e.preventDefault();
    const animate = () => {
      transitionL.classList.add('visible','opening');
      // var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
      setTimeout(function(){
        p.onTransitionIn()
        transitionL.classList.add('closing');
        animationEndEvents.forEach( event => {
          transitionB.addEventListener( event, removeTransitionLayerClasses )
        });
      }, 500);
    }
    // })
  
    //close modal window
    function removeTransitionLayerClasses() {
      transitionL.classList.remove('closing', 'opening', 'visible');
      animationEndEvents.forEach( ev => {
        transitionB.removeEventListener(ev, removeTransitionLayerClasses);
      });
    }
  
  
    // modalW.addEventListener('click', e => {
    // 	if (e.target.classList.contains('modal-close')) {
    // 		e.preventDefault();
    // 		transitionL.classList.add('closing');
    // 		modalW.classList.remove('visible');
    // 		animationEndEvents.forEach( event => {
    // 			transitionB.addEventListener( event, removeTransitionLayerClasses )
    // 		});
    // 	}
    // })
  
  
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
  
      transitionB.style.width = layerWidth*frames+'px';
      transitionB.style.height = layerHeight+'px';
  
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
      console.log('on transition in changed')
      animate()


    }))
  
  })
 

  return (
    // <div 
    //   ref={ref}
    //   className={cx(
    //     styles.cover, 
    //   )}
    // ></div>

    <div class="cd-transition-layer"> 
      <div class="bg-layer"></div>
    </div>
  )
}