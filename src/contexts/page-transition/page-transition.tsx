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
  const ref = useRef<HTMLDivElement>()


  createEffect(on(() => p.onTransitionIn, () => {
    ref.current.classList.add(animationStyle)
    const id = setTimeout(() => p.onTransitionIn?.(), animationDuration / 2)
    const unbind = bindEvent(ref.current, 'animationend', () => ref.current.classList.remove(animationStyle))
    onCleanup(() => {
      clearTimeout(id);
      unbind()
    })
    console.log('on transition in changed')
  }))


  return (
    <div 
      ref={ref}
      className={cx(
        styles.cover, 
      )}
    ></div>
  )
}