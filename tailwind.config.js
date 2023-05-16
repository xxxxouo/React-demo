/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      lineHeight:{
        '3rem': '3rem'
      }
    },
  },
  plugins: [],
}

