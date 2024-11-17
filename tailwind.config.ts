import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cardWhite: "#f0f0f0",
        mintGreen: "#98FB98",
      },
      screens: {
        "2xl": "2500px",
        "3xl": "4000px"
      },
      animation: {
        bright: "bright 1.5s ease-out infinite"
      },
      keyframes: {
        bright: {
          "0%, 100%": { 
            filter: 'brightness(1)'
          },
          "50%": {
            filter: 'brightness(1.5)'
          }
        } 
      }
    },
  },
  plugins: [],
};
export default config;
