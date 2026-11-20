import type { Config } from "tailwindcss";
import { colors, layers } from "./app/lib/design-tokens";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Impact", "sans-serif"],
      },
      colors,
      zIndex: layers,
      maxWidth: {
        site: "76rem",
      },
    },
  },
  plugins: [],
};
export default config;
