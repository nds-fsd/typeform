const { LuShapes } = require('react-icons/lu')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'white': '#ffffff',
    //   'purple': '#3f3cbb',
    //   'midnight': '#121063',
    //   'metal': '#565584',
    //   'tahiti': '#3ab7bf',
    //   'silver': '#ecebff',
    //   'bubble-gum': '#ff77e9',
    //   'bermuda': '#78dcca',
    // },
    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      backgroundImage: {
        // 'custom-gradient': 'linear-gradient(45deg, rgba(210,230,200,1) 0%, rgba(230,228,200,1) 100%)',
        'custom-gradient': 'linear-gradient(45deg, rgba(160,158,194,1) 0%, rgba(197,197,255,1) 43%, rgba(0,212,255,1) 100%)',
        // 'custom-gradient': 'linear-gradient(45deg, rgba(160,158,194,1) 0%, rgba(197,197,255,1) 20%, rgba(151,211,252,1) 50%, rgba(0,212,255,1)  100%)',
        'grainy': 'url(./assets/grainy-gradient.svg)',
        // backgroundSize: {
        //   'grainy-size': '200px 200px',
        // },
        // backgroundRepeat: {
        //   'grainy-repeat': 'repeat',
        // },
        // backgroundPosition: {
        //   'grainy-center': 'center',
        // },
      },
      colors: {
        azure: '#F0FFFF',
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
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

