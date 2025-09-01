// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./prices/index.html",
    "./terms/index.html",
    "./partials/**/*.html", // This is crucial to scan your injected partials
    // Add other HTML, JS, or templating files here if they contain Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
