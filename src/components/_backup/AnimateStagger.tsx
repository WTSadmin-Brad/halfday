'use client';

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Target, VariantLabels } from "framer-motion";
import { transitions, variants } from "@/lib/animations/constants";

interface AnimateStaggerProps {
  /** The elements to animate in sequence */
  children: React.ReactNode;
  /** Optional className for styling */
  className?: string;
  /** Animation state */
  animate?: boolean | Target | VariantLabels;
  /** Optional transition override */
  transition?: typeof transitions.spring;
  /** Optional callbacks */
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

/**
 * Animates children in a staggered sequence using framer-motion.
 * Uses shared animation constants for consistent motion design.
 */
export const AnimateStagger = ({
  children,
  className,
  animate = true,
  transition,
  onAnimationStart,
  onAnimationComplete
}: AnimateStaggerProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
        exit="hidden"
        variants={variants.staggerContainer}
        className={className}
        transition={transition}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={variants.staggerItem}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
