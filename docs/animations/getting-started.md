# Getting Started with Animations

## Installation

The animation system comes pre-installed with all necessary dependencies, primarily using Framer Motion as the animation engine.

## Basic Usage

### Simple Fade In Animation

```tsx
import { AnimateIn } from "@/components/animations/AnimateIn";

function MyComponent() {
  return (
    <AnimateIn>
      <div>This will fade in smoothly</div>
    </AnimateIn>
  );
}
```

### Staggered List Animation

```tsx
import { AnimateStagger } from "@/components/animations/AnimateStagger";

function MyList() {
  return (
    <AnimateStagger>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </AnimateStagger>
  );
}
```

## Animation Context

The `AnimationContext` provides global control over animations:

```tsx
import { AnimationProvider } from "@/lib/animations/context/AnimationContext";

function App() {
  return (
    <AnimationProvider
      debug={process.env.NODE_ENV === "development"}
      durationMultiplier={1}
    >
      {/* Your app content */}
    </AnimationProvider>
  );
}
```

## Accessibility

All animations automatically respect the user's reduced motion preferences. This can be checked using:

```tsx
import { useReducedMotion } from "@/lib/animations/hooks/useReducedMotion";

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  // ...
}
```
