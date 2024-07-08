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
        'custom-gradient': 'linear-gradient(90deg, rgba(160,158,194,1) 0%, rgba(197,197,255,1) 43%, rgba(0,212,255,1) 100%)',
      },
      colors: {
        azure:  '#F0FFFF',
      },
      fontFamily: {
        'rubik': ['Rubik','sans-serif'],
        'space mono': ['Space Mono','monospace']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

