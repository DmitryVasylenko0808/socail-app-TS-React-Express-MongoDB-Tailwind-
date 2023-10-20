/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      "2xl": "1330px"
    },
    extend: {
      colors: {
        stripe: {
          100: "#cce8f8",
          200: "#99d1f1",
          300: "#66baeb",
          400: "#33a3e4",
          500: "#008cdd"
        }
      },
    },
  },
  plugins: [],
}