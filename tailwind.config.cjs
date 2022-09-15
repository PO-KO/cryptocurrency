/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          mostlydark: "#5B867C",
          dark: "#52796F",
          light: "#AAAAAA",
        },
        secondary: {
          dark: "#0C1110",
          mostlylight: "#F7FBFC",
          light: "#FFFFFF",
        },
      },
      fontFamily: {
        raleway: "Raleway",
      },
      boxShadow: {
        main: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
      },
    },
  },
  plugins: [],
};
