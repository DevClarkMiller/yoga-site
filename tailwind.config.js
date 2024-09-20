/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Changa-One": '"Changa One", "sans-serif"',
        "Rubik": '"Rubik", "sans-serif"',
        "Slabo": '"Slabo", "sans-serif"'
      },
      colors: {
        "turqoise": "#b3ecec",
        "light-turqoise": "#b2f7e0"
      }
    },
  },
  plugins: [],
}