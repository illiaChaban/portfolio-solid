/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: '600px',
      md: '960px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {},
  },
  plugins: [],
}

