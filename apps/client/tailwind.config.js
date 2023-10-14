/** @type {import('tailwindcss').Config} */

export default {
  darkMode: false,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['VTBGroupUI', 'sans-serif'],
      },
      colors: {
        primary: '#002882',
        secondary: '#00AAFF',
        red: '#E62632',
        'light-blue': '#CCEEFF',
        green: '#4CC864',
        orange: '#F1A038',
        'dark-red': '#CA181F',
      },
      borderRadius: {
        pin: '50% 50% 50% 0',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
}
