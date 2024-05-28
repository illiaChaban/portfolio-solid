/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  experimental: { optimizeUniversalDefaults: true },
  theme: {
    screens: {
      xs: "320px",
      sm: '600px',
      sm_md: '780px',
      md: '960px',
      lg: '1200px',
      xl: '1536px',
      // desktopHover: { 'raw': '(hover: hover) and (pointer: fine)' }
    },
    colors: {
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
        md: '5px'
      },
      fontFamily: {
        mono: ["'Inconsolata'", "'Saira'", 'monospace'],
        serif: ["'Saira'", 'Helvetica', 'Arial', 'sans-serif']
        // serif: ['Inconsolata', 'sans-serif'],
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

// tags: {
//   body: 'body-tags',
//   div: 'div-tags',
//   divEnd: 'div-tags-end',
//   h1: 'h1-tags',
// },

// --menu-offset: 56px;

// --color-subtle-text: #73aeb9;
// --color-subtle: #7f838a;
// --color-main: #fdfbeb;
// --color-highlight: #7fffff;

// --body-background-color: #112d44; 