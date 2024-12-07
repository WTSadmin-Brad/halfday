import type { Transition, Variants } from "framer-motion";

/**
 * Shared transition configurations
 */
export const transitions = {
  // Spring animation for natural, bouncy movements
  spring: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },

  // Smooth tween for subtle animations
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut",
  },

  // Quick tween for responsive feedback
  quick: {
    type: "tween",
    duration: 0.15,
    ease: "easeOut",
  },

  // Bounce effect for playful interactions
  bounce: {
    type: "spring",
    damping: 10,
    stiffness: 100,
    mass: 0.5,
  },
} as const;

/**
 * Shared animation variants
 */
export const variants = {
  // Fade in/out
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
  },

  // Slide up with fade
  slideUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.spring,
    },
  },

  // Scale with fade
  scale: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.spring,
    },
  },

  // Container for staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  },

  // Item for staggered animations
  staggerItem: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.spring,
    },
  },
} as const;
