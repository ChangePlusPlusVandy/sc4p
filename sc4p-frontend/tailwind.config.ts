import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

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
  plugins: [heroui()],
} satisfies Config;
