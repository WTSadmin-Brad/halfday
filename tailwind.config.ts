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
        // Brand Colors
        gunmetal: "#232C33",
        sage: "#638475",
        orange: "#FCA311",
        "light-gray": "#D8DBE2",
        "anti-flash-white": "#EFF1F3",

        // Semantic Colors
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",

        // Neumorphic Colors
        neumorphic: {
          base: "var(--color-background)",
          light: "#FFFFFF",
          dark: "var(--color-muted)",
          shadow: {
            light: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(174, 174, 192, 0.4)",
          },
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
              8px 8px 16px var(--tw-shadow-color),
              -8px -8px 16px var(--tw-inner-shadow-color)
            `,
          },
          "100%": {
            boxShadow: `
              4px 4px 8px var(--tw-shadow-color),
              -4px -4px 8px var(--tw-inner-shadow-color)
            `,
          },
        },
        "fade-in": {
          "0%": { 
            opacity: "0",
            filter: "blur(5px)",
          },
          "100%": { 
            opacity: "1",
            filter: "blur(0px)",
          },
        },
      },
      animation: {
        "neumorphic-press": "neumorphic-press 0.2s ease-in-out forwards",
        "fade-in": "fade-in 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
