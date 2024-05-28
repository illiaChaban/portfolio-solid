import { onMount } from 'solid-js'
import { getCssVariable } from '../utils/styles/get-css-var'

export const Particles = () => {
  const containerId = 'particles'

  onMount(async () => {
    const colorHighlight = getCssVariable('--tw-colors-highlight')
    await initParticles(containerId, colorHighlight)
  })

  return (
    <div
      id={containerId}
      class="size-full fixed top-0 overflow-hidden box-border"
    />
  )
}

declare function particlesJS(id: string, config: Record<string, any>): void

const initParticles = async (containerId: string, color: string) => {
  await import('../assets/other/part1cl3sLibrary')

  particlesJS(containerId, {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1026,
        },
      },
      color: {
        value: color,
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.3, //.3
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 1.5, //circle size
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0.1,
          sync: true,
        },
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: color,
        opacity: 0.6, // .4
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5, // .4 - .8
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'bounce',
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 130,
          line_linked: {
            opacity: 0.8, //.7
          },
        },
      },
    },
    retina_detect: true,
  })
}
