/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}", // if using App Router
    "./pages/**/*.{ts,tsx}", // if using Pages Router
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // if using src/ directory
  ],
  theme: {
    extend: {},
  },
  plugins: [
        require('@tailwindcss/aspect-ratio'),
  ],
};
