import { useTheme } from "next-themes";
import type { ThemeAwareTypography } from "../types";

export function useThemeAwareTypography(): ThemeAwareTypography {
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return isDark ? typographyThemeConstants.dark : typographyThemeConstants.light;
}

// Export constants for consistent usage across the application
export const typographyThemeConstants = {
  dark: {
    textColor: "text-gray-50",
    mutedColor: "text-gray-400",
    headingColor: "text-gray-50",
    linkColor: "text-blue-400",
    linkHoverColor: "hover:text-blue-300",
    form: {
      inputText: "text-white",
      inputPlaceholder: "text-gray-400",
      inputDisabled: "text-gray-600",
      inputError: "text-red-400",
    },
  },
  light: {
    textColor: "text-gray-500",
    mutedColor: "text-gray-400",
    headingColor: "text-gray-500",
    linkColor: "text-blue-600",
    linkHoverColor: "hover:text-blue-700",
    form: {
      inputText: "text-gray-500",
      inputPlaceholder: "text-gray-400",
      inputDisabled: "text-gray-300",
      inputError: "text-red-600",
    },
  },
} as const;
