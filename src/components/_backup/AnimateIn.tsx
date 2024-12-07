"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Target, VariantLabels } from "framer-motion";
import { transitions, variants } from "@/lib/animations/constants";

interface AnimateInProps {
  /** The element to animate */
  children: React.ReactNode;
  /** Optional className for styling */
  className?: string;
  /** Animation state */
  animate?: boolean | Target | VariantLabels;
  /** Whether the component is mounted */
  isPresent?: boolean;
  /** Optional variant override */
  variant?: keyof typeof variants;
  /** Optional transition override */
  transition?: typeof transitions.spring;
  /** Optional callbacks */
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

/**
 * Animates children into view using framer-motion.
 * Uses shared animation constants for consistent motion design.
 */
export const AnimateIn = ({
  children,
  className,
  animate = true,
  isPresent = true,
  variant = "fade",
  transition,
  onAnimationStart,
  onAnimationComplete,
}: AnimateInProps) => {
  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          exit="hidden"
          variants={variants[variant]}
          className={className}
          transition={transition}
          onAnimationStart={onAnimationStart}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
