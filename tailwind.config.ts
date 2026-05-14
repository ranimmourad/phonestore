import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#e8f1ff",
          100: "#cfe1ff",
          200: "#9ec3ff",
          300: "#6da4ff",
          400: "#3c86ff",
          500: "#0b67ff",
          600: "#0052d6",
          700: "#003fa3",
          800: "#002d75",
          900: "#001a47",
          950: "#000d24",
        },
        ink: {
          900: "#06080f",
          800: "#0a0e1a",
          700: "#101524",
          600: "#1a2236",
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "grid-fade": "gridFade 8s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 30px rgba(11,103,255,.35)" },
          "50%":     { boxShadow: "0 0 80px rgba(11,103,255,.75)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        gridFade: {
          "0%,100%": { opacity: "0.25" },
          "50%":     { opacity: "0.6" },
        },
      },
      backgroundImage: {
        "grid-blue":
          "linear-gradient(rgba(11,103,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(11,103,255,0.15) 1px,transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(11,103,255,0.25) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
