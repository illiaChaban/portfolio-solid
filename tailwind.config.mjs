export const breakpoints = {
  xs: 320,
  sm: 600,
  sm_md: 780,
  md: 960,
  lg: 1200,
  xl: 1536,
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  experimental: { optimizeUniversalDefaults: true },
  theme: {
    screens: Object.fromEntries(Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`])),
    colors: {
      curr: 'currentcolor',
      transparent: 'transparent',
      highlight: '#7fffff',
      text: {
        primary: '#fdfbeb',
        subtle1: '#7f838a',
        subtle2: '#73aeb9',
      },
      background: '#112d44',
      gray: {
        light: '#afadad',
      },
      accent: {
        black: 'black',
      },
    },
    misc: {
      navOffset: '56px',
    },
    zIndex: {
      navbar: 3,
      pageTransition: 2,
    },

    extend: {
      borderRadius: {
        md: '5px',
        circle: '50%'
      },
      fontFamily: {
        mono: ["'Inconsolata'", "'Saira'", 'monospace'],
        serif: ["'Saira'", 'Helvetica', 'Arial', 'sans-serif']
        // serif: ['Inconsolata', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: 0
          }
        }
      }
    },
  },
  plugins: [
    ({ addUtilities, theme }) => {
      addUtilities({
        // added inside global index.css
        '.tags-h1': {},
        '.tags-body': {
        },
        '.tags-div': {},
        '.tags-div-end': {}
      });
    },
    ({ addVariant }) => {
      addVariant('desktopHover', '@media (hover: hover) and (pointer: fine)')
    }

  ],
}