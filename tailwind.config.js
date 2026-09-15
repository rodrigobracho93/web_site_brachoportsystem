/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './assets/js/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B192C',
          blue: '#1E3E62',
          orange: '#FF6500',
          lightBg: '#F8FAFC',
          darkBg: '#0F172A',
          darkCard: '#1E293B'
        }
      }
    },
  },
  plugins: [],
}

