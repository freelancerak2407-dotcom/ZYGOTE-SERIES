/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003049',
        secondary: '#27E6D4',
        accent: '#C4262E',
        background: '#F9FAFB',
      }
    },
  },
  plugins: [],
}
