/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/component/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iran: ["IranSans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lightbrown: "#EBC8B4",
        lightbrown2: "#F8E6CE",
        brown: "#EFBBA6",
        darkgreen: "#819c8e",
        lightgreen: "#D0DBCD", 
        lightgreen2: "#CCE2AA",
        green: "#B8CEC2",
        light: "#F8F9FA",
        lightOrange:"#eec6b4"
      },
      keyframes: {
        // فقط انیمیشن تکسچر
        textureMove: {
          '0%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '20% 20%' },
          '100%': { 'background-position': '0% 0%' },
        },
      },
      animation: {
        textureMove: 'textureMove 20s linear infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
