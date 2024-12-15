/**
 * useHeaderTransform Hook
 * 
 * Manages scroll-based header transformations with proper performance optimizations.
 * Uses RAF for smooth animations and provides multiple transform states.
 * 
 * Features:
 * - Throttled scroll handling
 * - Multiple breakpoints for transitions
 * - Memoized calculations
 * - Type-safe return values
 * 
 * @returns {Object} Header transformation states and attributes
 */

import { useState, useEffect, useMemo } from 'react';

interface HeaderState {
  isCompact: boolean;
  opacity: number;
  blur: number;
  showMiniProfile: boolean;
}

const SCROLL_THRESHOLD = 100; // Pixels before header transforms
const MINI_PROFILE_THRESHOLD = 250; // Pixels before mini profile appears

export const useHeaderTransform = () => {
  const [scrollY, setScrollY] = useState(0);

  // Memoize our calculations to prevent unnecessary re-renders
  const headerState = useMemo((): HeaderState => {
    // Calculate normalized scroll progress (0 to 1)
    const progress = Math.min(scrollY / SCROLL_THRESHOLD, 1);
    const miniProfileProgress = Math.min((scrollY - SCROLL_THRESHOLD) / MINI_PROFILE_THRESHOLD, 1);

    return {
      isCompact: scrollY > SCROLL_THRESHOLD,
      opacity: Math.min(progress * 0.8, 0.8), // Max 80% opacity
      blur: progress * 10, // 0 to 10px blur
      showMiniProfile: scrollY > MINI_PROFILE_THRESHOLD
    };
  }, [scrollY]);

  useEffect(() => {
    let lastKnownScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScroll = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(lastKnownScroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Provide CSS properties for easy application
  const headerStyles = {
    backgroundColor: `rgba(255, 255, 255, ${headerState.opacity})`,
    backdropFilter: `blur(${headerState.blur}px)`,
  };

  return {
    ...headerState,
    headerStyles,
  };
};

export default useHeaderTransform;