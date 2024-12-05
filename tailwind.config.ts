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
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Neumorphic specific colors
        neumorphic: {
          base: "#F0F0F3",
          light: "#FFFFFF",
          dark: "#D1D9E6",
          shadow: {
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(174, 174, 192, 0.4)",
          },
        },
      },
      boxShadow: {
        "neumorphic-flat": `
          8px 8px 16px rgba(174, 174, 192, 0.4),
          -8px -8px 16px rgba(255, 255, 255, 0.7)
        `,
        "neumorphic-pressed": `
          inset 8px 8px 16px rgba(174, 174, 192, 0.4),
          inset -8px -8px 16px rgba(255, 255, 255, 0.7)
        `,
        "neumorphic-input": `
          inset 2px 2px 5px rgba(174, 174, 192, 0.4),
          inset -2px -2px 5px rgba(255, 255, 255, 0.7)
        `,
      },
      keyframes: {
        "neumorphic-press": {
          "0%": {
            boxShadow: `
            8px 8px 16px rgba(174, 174, 192, 0.4),
            -8px -8px 16px rgba(255, 255, 255, 0.7)
          `,
          },
          "100%": {
            boxShadow: `
            inset 8px 8px 16px rgba(174, 174, 192, 0.4),
            inset -8px -8px 16px rgba(255, 255, 255, 0.7)
          `,
          },
        },
      },
      animation: {
        "neumorphic-press": "neumorphic-press 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
