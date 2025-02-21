/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-night": "#0A0C04",
        "bg-day": "#2E497C",
        "text-color": "#7849BC",
        "cards-color": "#C7D690",
      },
      fontFamily: {
        staatliches: ["Staatliches", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
