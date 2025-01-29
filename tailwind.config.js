/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './source/**/*.{js,jsx,ts,tsx}',
    './source/*.{js,jsx,ts,tsx}',
    './source/screens/**/*.{js,jsx,ts,tsx}',
    './source/screens/*.{js,jsx,ts,tsx}',
    './source/components/**/*.{js,jsx,ts,tsx}',
    './source/components/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        primary: '#01C574',
        secondary: '#323232',
        red: '#ED0103',
        'white-50': '#ffffff80',
        'white-20': '#ffffff40',
      },
    },
  },
  plugins: [],
};
