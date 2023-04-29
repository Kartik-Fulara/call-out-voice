const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
    },
    extend: {
      colors: {
        "darker-blue": "#20253d",
        "dark-blue": "#2F3857",
        "blue": "#40486C",
        "light-blue": "#4c60aa",
        "lighter-blue": "#3C81ED",
      }
    },
  },
  plugins: [],
};
