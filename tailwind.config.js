/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        cart: "cart .5s ease-in-out forwards",
      },
      keyframes: {
        cart: {
          "0%": {
            transform: "translateX(0)",
          },
          "49%": {
            transform: "translateX(50px)",
          },
          "50%": {
            transform: "translateX(50px)",
          },
          "51%": {
            transform: "translateX(-50px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
