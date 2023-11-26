import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "50%": { opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
