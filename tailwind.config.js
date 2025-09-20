/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-blue': '#2481cc',
        'tg-blue-hover': '#1d6fa5',
        'tg-bg': '#ffffff',
        'tg-text': '#000000',
        'tg-hint': '#999999',
        'tg-secondary-bg': '#f1f1f1',
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
