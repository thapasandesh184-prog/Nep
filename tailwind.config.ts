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
        void: "#08070A",
        violet: "#7B5EA7",
        "violet-light": "#A78BFA",
        teal: "#34D399",
        gold: "#F0C040",
        text: "#F2EFF9",
        muted: "#C4BADA",
      },
      fontFamily: {
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
