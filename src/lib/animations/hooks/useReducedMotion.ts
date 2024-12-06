import { useEffect, useState } from "react";

/**
 * Hook to detect if the user prefers reduced motion
 * This helps us provide accessible animations
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    // Create media query list
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
