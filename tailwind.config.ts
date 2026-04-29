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
        obsidian: "#0C0A08",
        mahogany: "#1A1710",
        "royal-gold": "#C9A96E",
        champagne: "#E8D5A3",
        ivory: "#F5F0E8",
        "midnight-indigo": "#2A1F3D",
        amethyst: "#7B5EA7",
        "forest-seal": "#1C3A2E",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        "luxury": "0.18em",
      },
      borderRadius: {
        sharp: "2px",
      },
      animation: {
        "grid-drift": "gridDrift 60s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        gridDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
