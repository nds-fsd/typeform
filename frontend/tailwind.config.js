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
        // 'custom-gradient-2': '#ff0000',
        // 'custom-gradient': 'linear-gradient(45deg, rgba(226, 222, 243,1) 0%, rgb(240, 255, 255) 100%)',
        'custom-gradient': 'linear-gradient(45deg, rgba(168,165,200,1) 0%, rgba(192,192,230,1) 43%, rgb(227, 230, 227) 100%)',
      },
      colors: {
        azure: 'rgb(192,192, 230)'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'abril-fatface': ['Abril Fatface', 'serif']
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(255, 255, 255, 0.6)',
      },
      spacing: {
        'base': '2rem',
        'double-base': '4rem',
        'triple-base': '6rem'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

