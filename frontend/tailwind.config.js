/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        foreground: "#FFFFFF",
        background: "#000000",
        primary: "#E88E27",
        grey: "#7B7874",
      },
      backgroundImage: {
        authImg: "url('/authBackground.png')",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
