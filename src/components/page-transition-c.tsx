import { createEffect, createSignal, on, onCleanup } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled-components";
import { Transition } from "solid-transition-group";
import { PageTransition } from "../contexts/page-transition/page-transition";
import { createLogValues } from "../utils/log";
import MaskImg from '../contexts/page-transition/mask.png'
import { invoke } from "../utils/lodash";
import { cx } from "../utils/styles";
// import InkImg from '../contexts/page-transition/ink-11.png'

type State = 'entering' | 'exiting' | 'stale'
export const PageTransitionC = (p: {children: JSX.Element}) => {
  const [state, setState] = createSignal<State>('stale')

  const [animateCount, animate] = invoke(() => {
    const [count, setCount] = createSignal<number>(0)
    return [count, () => setCount(count => count + 1)]
  })

  // createLogValues({animateCount})
  // const [onTransitionIn, setOntransitionIn] = createSignal(() => {})



  console.log({towDivs, ref})

  // console.log(<div></div>)
  // createLogValues({c: p.children})
  return (
    <>
      {/* <PageTransition onTransitionIn={onTransitionIn()} /> */}
      {/* <Mask animateCount={animateCount()}/> */}
      <Transition
        onEnter={(el, done) => {
          // setTimeout(done, 400)
          animate()
          setTimeout(done, 600)
        }}
        onExit={(el, done) => {
          setTimeout(done, 200)
          // done()
          // setOntransitionIn(() => done)
        }}
      >
        {p.children}
      </Transition>
    </>
  )
}

const Mask = (p: {animateCount: number}) => {

  const [clipPath, setClipPath] = createSignal<number>(0) 


  createEffect(on(() => p.animateCount, () => {
    console.log('animate count changeed', p.animateCount)

    setClipPath(0)

    const id = setInterval(() => {
      let val = clipPath() + 2
      if (val >= 100) {
        console.log('reset', val)
        // reset
        setClipPath(0)
        cancel()
        return
      }
      setClipPath(val)
    }, 5)

    function cancel() {
      clearInterval(id)
    }

    onCleanup(cancel)
  }))

  return (
    <div className={css({
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    })}>


      <div className={cx(css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }), css({
        clipPath: `circle(${clipPath()}% at center)`,
      }))} 

      >


        <div className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'red',
          // objectFit: 'cover',

        })}>

        </div>

      </div>

      {/* <div className={css({
          position: 'absolute',
          // left: '50%',
          // top: '50%',
          // transform: `translateY(-50%) translateX(-18%)`,
          height: '100vh',
          width: '100vw',
          // width: `${25 * 100}%`,
          // background: `url(${InkImg}) no-repeat 0 0`,
          mask: `url(${MaskImg})`,
          backgroundSize: '100% 100%',
          // backgroundBlendMode: 'overlay',
          // backgroundColor: 'white',
          // opacity: 1,
          // mixBlendMode: 'screen'

        })}>

                <div className={css({
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: '100%',
        height: '100%',
        background: 'red',
        // objectFit: 'cover',

      })}>

      </div>
        </div> */}
      {/* <div className={css({
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translateY(-50%) translateX(-18%)`,
        height: '100%',
        width: `${25 * 100}%`,
        // background: `url(${InkImg}) no-repeat 0 0`,
        backgroundSize: '100% 100%',
        opacity: 1,
        // mixBlendMode: 'screen'
      })}>
        <div className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'red',
        })} />
      </div> */}
    </div>
  )
}

      {/* <div className={css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'red',
        objectFit: 'cover',

      })}>

      </div> */}