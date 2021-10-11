import { useLocation } from "solid-app-router"
import { createEffect, createSignal, onCleanup, onMount } from "solid-js"
import { css } from 'solid-styled-components'
import { cx, makeStyles } from "../utils/styles/make-styles"

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
    transition: 'opacity .6s'
  },
  showTransition: `
    animation: fadeInOut .6s;
    @keyframes fadeInOut {
      0% {
        opacity: 0;
      }
    
      50% {
        opacity: 1;
      }

      0% {
        opacity: 0;
      }
    }
  `,
  showTransition2: `
    animation: fadeInOut2 .6s;
    @keyframes fadeInOut2 {
      0% {
        opacity: 0;
      }
    
      50% {
        opacity: 1;
      }

      0% {
        opacity: 0;
      }
    }
  `
})

// TODO: should play be a count ? For quick consecutive transitions
export const InkTransition = () => {
  const location = useLocation()

  // new MutationObserver((mutationList, observer) => {
  //   console.log(mutationList, observer)
  //   mutationList.forEach(value => {
  //     console.log(value.target.tagName)
  //   })
  // }).observe(document.body, {
  //   childList: true,
  //   subtree: true
  // })
  
  // createEffect(() => {
  //   [location.pathname];
  //   const links = document.querySelectorAll('a')

  //   console.log(links)

  //   const callback = (e: MouseEvent) => {
  //     // e.preventDefault()
  //     console.log('click')
  //   }
    
  //   links.forEach(link => {
  //     link.addEventListener('click', callback)
  //   })

  //   onCleanup(() => {
  //     links.forEach(link => {
  //       link.removeEventListener('click', callback)
  //     })
  //   })
  // })


  const [transition, setTransition] = createSignal(false)
  const playTransition = () => setTransition((val) => !val)

  // createEffect(() => {
  //   [location.pathname];
  //   console.log('pathname')
  //   playTransition()
  // })

  // const id = setInterval(playTransition, 1000)
  // onCleanup(() => clearInterval(id))

  // createLogValues({transition})
  
  return (
    null
    // <div 
    //   className={cx(styles.cover, transition() ? styles.showTransition : styles.showTransition2)}
    // ></div>
  )

}