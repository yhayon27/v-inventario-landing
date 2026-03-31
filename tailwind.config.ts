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
        vi: {
          bg:            "#09090b",
          surface1:      "#161618",
          surface2:      "#1a1a1d",
          "surface-up":  "#1e1e22",
          border:        "#2e2e32",
          green:         "#22c55e",
          "green-dim":   "#0d2016",
          "green-border":"#163521",
          body:          "#c4c4c8",
          sub:           "#a0a0a6",
          muted:         "#888890",
          placeholder:   "#666670",
          orange:        "#f97316",
          white:         "#ffffff",
        },
      },
      fontFamily: {
        sans:    ["DM Sans", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":    "fade-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "radar":      "radar 2s ease-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "node-pulse": "node-pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,197,94,0.15)" },
          "50%":      { boxShadow: "0 0 40px rgba(34,197,94,0.35)" },
        },
        "radar": {
          "0%":   { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "node-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.3)" },
          "50%":      { boxShadow: "0 0 0 6px rgba(34,197,94,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
