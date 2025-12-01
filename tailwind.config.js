/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purpleDark: "#604f6f",
        purpleLight: "#817091",
        blueGray: "#5a5f75",
        blue: "#446594",
        pinkSoft: "#f197a3",
        beigeSoft: "#e3c0c0",
        orangeSoft: "#ef8e73",
        purple: "#604f6f",
        red: "#ef4444",
        green: "#22c55e",
        yellow: "#eab308",
      },
    },
  },
  plugins: [],
};
