import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,tsx,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#A377DC",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
