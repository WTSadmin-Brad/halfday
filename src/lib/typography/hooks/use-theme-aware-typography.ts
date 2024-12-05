import { useTheme } from "next-themes";

interface ThemeAwareTypography {
  textColor: string;
  mutedColor: string;
  headingColor: string;
  linkColor: string;
  linkHoverColor: string;
}

export function useThemeAwareTypography(): ThemeAwareTypography {
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return {
    // Main text colors
    textColor: isDark ? "text-gray-50" : "text-gray-900",
    mutedColor: isDark ? "text-gray-400" : "text-gray-500",

    // Heading specific color
    headingColor: isDark ? "text-gray-50" : "text-gray-900",

    // Link colors with hover states
    linkColor: isDark ? "text-blue-400" : "text-blue-600",
    linkHoverColor: isDark ? "hover:text-blue-300" : "hover:text-blue-700",
  };
}

// Optional: Export constants for consistent usage
export const typographyThemeConstants = {
  dark: {
    text: "text-gray-50",
    muted: "text-gray-400",
    heading: "text-gray-50",
    link: "text-blue-400",
    linkHover: "hover:text-blue-300",
  },
  light: {
    text: "text-gray-900",
    muted: "text-gray-500",
    heading: "text-gray-900",
    link: "text-blue-600",
    linkHover: "hover:text-blue-700",
  },
} as const;
