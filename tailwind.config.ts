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
        brand: {
          black:   "#000000",
          surface: "#0A0A0A",
          card:    "#111111",
          border:  "#1A1A1A",
          mid:     "#333333",
          muted:   "#666666",
          subtle:  "#999999",
          accent:  "#06B6D4",
          white:   "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.04em",
        display: "-0.03em",
      },
      animation: {
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":   "fade-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "line-draw": "line-draw 2s cubic-bezier(0.16,1,0.3,1) forwards",
        "count":     "count 0.5s ease-out forwards",
        "glow-pulse":"glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(40px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(6,182,212,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(6,182,212,0.35)" },
        },
      },
      boxShadow: {
        "deep": "0 60px 120px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.05)",
        "card": "0 0 0 1px rgba(26,26,26,1)",
        "accent-glow": "0 0 30px rgba(6,182,212,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
