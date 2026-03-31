/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
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
