const { LuShapes } = require('react-icons/lu')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, rgba(160,158,194,1) 0%, rgba(197,197,255,1) 43%, rgb(240, 255, 255) 100%)',
      },
      colors: {
        azure: '#F0FFFF',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'abril-fatface': ['Abril Fatface', 'serif']
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(255, 255, 255, 0.6)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

