/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0CA7FF',
      },
    },
  },
  plugins: [],
  variants: {
    margin: ['responsive', 'hover'],
  },
};
