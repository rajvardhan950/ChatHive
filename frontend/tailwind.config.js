/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#059669",       // main emerald green - buttons, borders, accents
        "primary-dark": "#065f46", // darker emerald - chat header, input bar, sender bubble
        "primary-light": "#d1fae5", // light emerald - hover states
        "online-dot": "#3b82f6",   // blue accent for online status (pops against green theme)
      },
    },
  },
}