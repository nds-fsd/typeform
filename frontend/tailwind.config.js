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
        // 'custom-gradient': '#ff0000'
        'custom-gradient': 'linear-gradient(45deg, rgba(226, 222, 243,1) 0%, rgb(240, 255, 255) 100%)',
      },
      colors: {
        azure: '#c5c5ff',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'abril-fatface': ['Abril Fatface', 'serif'],
        // sobrescribe default font usada para todos los textos (ya que el default es sans),
        // objetivo es no tener que especificarla en className todos los componentes
        // 'sans': ['Space Mono']
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(255, 255, 255, 0.6)',
      },
      spacing: {
        'base': '3rem',
        'double-base': '6rem',
        'triple-base': '9rem'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

