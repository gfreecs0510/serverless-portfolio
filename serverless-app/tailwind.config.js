const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      darkMode: 'class', // Enable class-based dark mode
      colors: {
        body: {
          light: '#ffffff', // Light mode body background
          dark: '#1a202c', // Dark mode body background
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}