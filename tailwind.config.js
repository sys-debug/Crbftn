/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/*.html", 
    "./assets/js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'crbftn-red': '#dc2626',
        'crbftn-blue': '#2563eb'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}