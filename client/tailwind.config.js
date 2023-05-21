/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-primary": "#5f6368",
        "gray-primary2": "#f1f3f4",
        "gray-secondary": "#f3f3f3",
        "gray-secondary2": "#dfe1e5",
        "blue-primary": "#2584fc",
      },
    },
  },
  plugins: [],
};
