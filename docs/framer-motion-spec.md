# Motion (Framer Motion) Implementation Specification

## Installation and Setup

```bash
npm install framer-motion@11.13.1
```

## Core Imports

```typescript
// Correct imports
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import type { Variants, AnimationControls } from "framer-motion";
```

## Type Definitions

```typescript
// Correct type interfaces
interface MotionProps {
  initial?: boolean | Target | VariantLabels;
  animate?: Target | VariantLabels | AnimationControls;
  exit?: Target | VariantLabels;
  transition?: Transition;
  variants?: Variants;
}

interface Transition {
  type?: "tween" | "spring" | "keyframes";
  delay?: number;
  duration?: number;
  ease?: string | number[];
  
  // Spring-specific
  bounce?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
  
  // Advanced
  repeat?: number;
  repeatDelay?: number;
  repeatType?: "loop" | "reverse" | "mirror";
}

type Target = {
  [key: string]: string | number;
}

type VariantLabels = string | string[];
```

## Component Structure

```typescript
// /components/animations/[feature].tsx
'use client';

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const AnimatedComponent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
    />
  );
};
```

## Shared Animation Constants

```typescript
// /lib/animations/constants.ts
export const transitions = {
  spring: {
    type: "spring",
    damping: 20,
    stiffness: 300
  },
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut"
  }
} as const;

export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
} as const;
```

## Hooks Implementation

```typescript
// /lib/hooks/useMotionControls.ts
'use client';

import { useAnimation, type AnimationControls } from "framer-motion";

export const useMotionControls = () => {
  const controls = useAnimation();

  const animate = async (variant: string) => {
    await controls.start(variant);
  };

  return {
    controls,
    animate
  };
};
```

## Layout Animations

```typescript
// /components/layout/transitions.tsx
'use client';

import { motion, AnimatePresence } from "framer-motion";

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
```

## Server Component Integration

```typescript
// /app/[route]/page.tsx
import { AnimatedComponent } from "@/components/animations/component";

export default function Page() {
  return (
    <div>
      <AnimatedComponent />
    </div>
  );
}

// /app/[route]/layout.tsx
import { PageTransition } from "@/components/layout/transitions";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

## Implementation Rules

1. Always use 'use client' for motion components
2. Keep motion components as leaves in the component tree
3. Use variants for complex animations
4. Define transitions explicitly
5. Use hooks for programmatic control
6. Maintain type safety with proper interfaces
7. Share common animations through constants
8. Handle unmount animations with AnimatePresence

## Common Patterns

### Basic Animation
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>
```

### Variants Usage
```typescript
const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
/>
```

### Gesture Animation
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### Layout Animation
```typescript
<motion.div
  layout
  initial={false}
  transition={{
    type: "spring",
    damping: 20,
    stiffness: 300
  }}
/>
```

## Error Prevention

1. Always verify import paths
2. Use type checking for variants
3. Keep animation components client-side
4. Test hydration compatibility
5. Handle exit animations properly
6. Maintain consistent transition types
7. Check for proper hook usage
8. Validate animation properties