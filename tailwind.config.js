/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./price/index.html",
    "./terms/index.html",
    "./booking/index.html",
    "./care/index.html",
    "./contract.*/index.html",
    "./fb/index.html",
    "./ig/index.html",
    "./link/index.html",
    "./map/index.html",
    "./msg/index.html",
    "./review/index.html",
    "./partials/**/*.html",
    // Add any JS files that might have Tailwind classes
    "./js/**/*.js",

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
