/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          100: "#ffffff",
          200: "#F5F5F5",
          300: "#FAFAFA",
          400: "#D3D3D3",
          500: "#E0E0E0",
        },
        dark: {
          100: "#000000",
          200: "#121212",
          300: "#082032",
          400: "#2c394b",
          500: "#334756",
        },
        primary: {
          100: "#ff4c29",
          200: "#00ff00",
          300: "#ff10f0",
        },
      },
    },
  },
  plugins: [],
};