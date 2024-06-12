/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '3rem', // Define el valor personalizado
      },
      colors: {
        azure: 	'#F0FFFF',
      },
    },
  },
  plugins: [],
}

