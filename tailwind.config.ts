import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        outfit: ["var(--font-outfit)", ...fontFamily.sans],
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        aurora: "url('/images/background.webp')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "energy-pulse": "energy-pulse 2s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "shrink-to-point": "shrink-to-point 0.3s ease-in-out forwards",
        "expand-from-point": "expand-from-point 0.3s ease-in-out forwards",
        shrink: "shrink 0.3s ease-in-out forwards",
        expand: "expand 0.3s ease-in-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
      colors: {
        border: "hsl(var(--color-border))",
        input: "hsl(var(--input))",
        // Aurora Theme Colors
        "night-blue": "#020212", // Updated from #03072F
        "aurora-pink": "#F9C8CA",
        "royal-blue": "#2D3BAC",
        periwinkle: "#95A4DE",
        "crystal-white": "#FFFCF7",
        "crystal-lavender": "#E8C1FF", // New color for interactive elements
        // Semantic Colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Glass Effects
        glass: {
          background: "var(--glass-background)",
          border: "rgba(255, 255, 255, 0.1)",
          hover: "var(--glass-hover)",
          DEFAULT: "rgba(255, 255, 255, 0.2)",
          foreground: "rgba(255, 255, 255, 0.9)",
          ring: "rgba(255, 255, 255, 0.2)",
        },
      },
      backdropBlur: {
        glass: "16px",
      },
      // Glass morphism utilities
      backgroundColor: {
        glass: "rgba(255, 252, 247, 0.1)",
      },
      borderColor: {
        glass: "rgba(255, 252, 247, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
