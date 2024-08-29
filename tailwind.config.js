/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'],
      },
      colors:{
        amazonYellow:"#FF9A00",
        amazonBlack:"#232f3e",


      }
    },
  },
  plugins: [],
}