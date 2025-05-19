/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#080E05',
        secondary: '#151312',
        green: {
          100: '#b5f494',
          200: '#AED39A',
          300: '#678e52',
          400: '#345A20',
        },
        yellow: {
          100: "#fafaf0",
          200: '#F9F6C0',
        },
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221F3D',
          200: '#0D1611',
        },
        accent: '#AB8BFF'
      }
    },
  },
  plugins: [],
}