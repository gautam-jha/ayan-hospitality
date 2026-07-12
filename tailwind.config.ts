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
        // Warm ivory/cream base
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#EDE0CF",
        },
        // Deep maroon primary
        maroon: {
          50: "#FCF0F2",
          100: "#F8D9DE",
          200: "#F0B0BB",
          300: "#E07A8A",
          400: "#CC4A62",
          500: "#A82040",
          600: "#8B1A35",
          700: "#7C1C2B",
          800: "#5E1522",
          900: "#3D0D16",
        },
        // Gold/marigold accent
        gold: {
          50: "#FEF9EC",
          100: "#FCF0CC",
          200: "#F8DE94",
          300: "#F3C84E",
          400: "#EFB020",
          500: "#C9922A",
          600: "#A87020",
          700: "#8A5518",
          800: "#6E4014",
          900: "#4D2C0C",
        },
        // Charcoal text
        charcoal: {
          DEFAULT: "#1A1A1A",
          soft: "#3D3D3D",
          muted: "#6B6B6B",
          subtle: "#9A9A9A",
        },
        // WhatsApp green
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25" }],
      },
      spacing: {
        "section-y": "5rem",
        "section-y-lg": "7.5rem",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 100%)",
        "gradient-maroon": "linear-gradient(135deg, #7C1C2B 0%, #5E1522 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9922A 0%, #EFB020 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(28,10,14,0.6) 0%, rgba(28,10,14,0.3) 60%, rgba(28,10,14,0.7) 100%)",
      },
      animation: {
        "scroll-left": "scroll-left 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "warm": "0 4px 24px rgba(124, 28, 43, 0.08)",
        "warm-lg": "0 8px 48px rgba(124, 28, 43, 0.12)",
        "gold": "0 4px 24px rgba(201, 146, 42, 0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
