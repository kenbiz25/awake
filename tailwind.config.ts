import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // World palette — Sky / Water / Earth
        sky: { DEFAULT: "#E0F2FE", soft: "#F0F7FF", mist: "#F8FAFF" },
        water: { DEFAULT: "#2A2FFF" },
        ink: { DEFAULT: "#0A0F1E", deep: "#070B16", black: "#0B0B0B" },
        earth: { DEFAULT: "#0B5C2F", soft: "#E8F7EB" },
        gold: { DEFAULT: "#FACC15" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: { container: "1280px" },
      borderRadius: { card: "24px", section: "40px" },
    },
  },
  plugins: [],
};

export default config;
