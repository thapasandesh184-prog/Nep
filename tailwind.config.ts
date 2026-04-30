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
        void: "#FAFAFA",
        "void-deep": "#FFFFFF",
        violet: "#7B5EA7",
        "violet-light": "#A78BFA",
        teal: "#34D399",
        gold: "#F0C040",
        text: "#111111",
        muted: "#666666",
        // Legacy aliases — sections use these
        obsidian: "#FAFAFA",
        ivory: "#111111",
        "royal-gold": "#F0C040",
        mahogany: "#F5F5F5",
        champagne: "#F5E6C8",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
