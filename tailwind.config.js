/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        sourceSansPro: ['source-sans-pro'],
        robotoCondensed: ['Roboto Condensed'],
        roboto: ['Roboto'],
      }
    },
  },
  plugins: [],
}