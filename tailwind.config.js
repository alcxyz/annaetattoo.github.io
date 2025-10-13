/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./price/index.html",
    "./terms/index.html",
    "./booking/index.html",
    "./care/index.html",
    "./contract./index.html",
    "./faq/index.html",
    "./no/**/*.html",
    "./partials/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      // Add this screens object
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
