# Profile Page Header System Technical Specification

## Overview

The profile page implements a sophisticated header transformation system that converts a full-size hero section into a compact, fixed header during scroll. This document details the complete specifications for this system.

## Core Components

### Fixed Header
```typescript
interface FixedHeader {
  height: 64,               // Fixed header height in pixels
  position: 'fixed',        // Always fixed to viewport top
  background: 'transparent' // Initially transparent
}
```

### Hero Section
```typescript
interface HeroSection {
  height: '30vh',          // Initial hero height
  padding: '16px',         // Consistent with layout system
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}
```

### Avatar Component
```typescript
interface AvatarTransition {
  initialSize: 72,         // Initial avatar size (mobile)
  finalSize: 40,          // Collapsed header size
  borderRadius: '50%',     // Circular
  position: {
    initial: 'center',
    final: '12px'         // Left offset in header
  }
}
```

### Typography
```typescript
interface TextElements {
  fullName: {
    size: 20,             // Consistent 20px throughout
    weight: 600,          // SemiBold
    color: 'white'
  },
  supportingText: {
    size: 16,
    weight: 400,
    opacity: {
      initial: 1,
      final: 0            // Fades out during transition
    }
  }
}
```

## Transition System

### Scroll Triggers
```typescript
interface ScrollTriggers {
  // Start transition when hero bottom approaches header bottom
  transitionStart: {
    scroll: 'heroBottom - headerHeight',
    threshold: 0.8        // Start slightly before contact
  },
  
  // Complete transition by full contact
  transitionComplete: {
    scroll: 'heroBottom - headerHeight',
    threshold: 1
  }
}
```

### Animation Specifications
```typescript
interface TransitionConfig {
  timing: {
    duration: 300,        // ms
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)' // Material easing
  },
  
  avatar: {
    scale: {
      from: 1,
      to: finalSize / initialSize
    },
    position: {
      x: [-50%, 0],      // Center to left
      y: [0, 12]         // Vertical centering
    }
  },
  
  name: {
    position: {
      x: [0, 0],         // Maintain center
      y: [0, 0]          // Vertical centering
    }
  }
}
```

### Dynamic Gradient
```typescript
interface HeaderGradient {
  opacity: {
    initial: 0,
    final: 0.95
  },
  
  trigger: {
    distance: 16,         // px from header bottom
    duration: 200         // ms fade duration
  },
  
  gradient: {
    background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0) 100%)',
    height: '32px'        // Gradient fade height
  }
}
```

## Container Interaction

### Top Container Gradient
```typescript
interface ContainerGradient {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '32px',
  opacity: {
    default: 0,
    active: 0.95
  },
  transition: 'opacity 200ms ease-in-out'
}
```

### Scroll Behavior
```typescript
interface ScrollBehavior {
  // Smooth scroll settings
  scrollBehavior: 'smooth',
  momentum: true,
  
  // Performance optimizations
  debounce: 16,          // ms (matches 60fps)
  throttle: {
    resize: 100,         // ms
    scroll: 16           // ms
  }
}
```

## Implementation Notes

### Key Requirements
1. Avatar and name must maintain crisp appearance throughout transition
2. All animations should feel natural and respond to scroll position
3. Container gradients should only appear when approaching header
4. Text must remain readable throughout transition

### Performance Considerations
1. Use transform and opacity for animations
2. Implement proper debouncing for scroll events
3. Use requestAnimationFrame for smooth transitions
4. Optimize gradient renders during scroll

### Mobile Optimization
1. Focus on touch interaction smoothness
2. Optimize for common mobile viewports
3. Consider reduced motion preferences
4. Handle orientation changes gracefully

## Container Gradient System

### Global Container Requirements
```typescript
interface ContainerGradientSystem {
  // Required for ALL Settings Section containers
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '32px',
    opacity: {
      default: 0,
      active: 0.95  // When approaching header
    },
    transition: 'opacity 200ms ease-in-out',
    zIndex: 10     // Ensure gradient stays above content
  },
  
  // Gradient appears when container top approaches header
  triggerDistance: 16,  // px from header bottom
  fadeAnimation: {
    duration: 200,
    easing: 'ease-in-out'
  }
}
```

### Technical Integration
- Each Settings Section container must implement this gradient
- Gradients activate independently based on scroll position
- Uses Framer Motion for smooth transitions
- Implements shadcn/ui Card component as base

## Test Cases

### Critical User Paths
1. Slow scroll through transition
2. Rapid scroll past transition point
3. Scroll reversal during transition
4. Quick scroll with momentum
5. Scroll during header gradient fade

### Device Testing Matrix
1. iPhone SE (smallest supported viewport)
2. iPhone 14 Pro (notch consideration)
3. iPhone 14 Pro Max (largest viewport)
4. Various lighting conditions
5. Different scroll behaviors (touch, momentum)

## Technical Implementation

### Core Components Integration

```tsx
// Import required libraries and components
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/ui/utils";

const ProfileHeader: React.FC = () => {
  // Framer Motion scroll handling
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Calculate transition points
  const transition = useTransform(
    scrollY,
    [triggerStart, triggerEnd],
    [0, 1],
    {
      ease: [0.4, 0, 0.2, 1] // Material easing
    }
  );
  
  // Transform values based on scroll position
  const avatarScale = useTransform(
    transition,
    [0, 1],
    [1, 40/72]
  );
  
  const avatarX = useTransform(
    transition,
    [0, 1],
    ['50%', '12px']
  );
  
  return (
    <>
      {/* Fixed Header */}
      <motion.header
        ref={headerRef}
        className={cn(
          "fixed top-0 w-full h-16",
          "z-50 flex items-center"
        )}
        style={{
          backgroundColor: useTransform(
            transition,
            [0, 1],
            ['transparent', 'rgba(17, 24, 39, 0.95)']
          )
        }}
      >
        <motion.div className="flex items-center w-full px-4">
          <Avatar 
            style={{ 
              scale: avatarScale,
              x: avatarX 
            }}
          />
          <motion.span 
            className="text-xl font-semibold text-white"
            style={{
              x: useTransform(transition, [0, 1], [0, 24])
            }}
          >
            {firstName}
          </motion.span>
        </motion.div>
      </motion.header>
      
      {/* Hero Section */}
      <motion.section 
        className={cn(
          "h-[30vh]",
          "flex flex-col items-center justify-center",
          "px-4"
        )}
      >
        <Avatar className="w-[72px] h-[72px]" />
        <span className="mt-4 text-xl font-semibold text-white">
          {fullName}
        </span>
        <motion.span 
          className="text-base text-white/80"
          style={{
            opacity: useTransform(transition, [0, 0.8], [1, 0])
          }}
        >
          {email}
        </motion.span>
      </motion.section>
    </>
  );
};

// Settings Section Container with Gradient
const SettingsSection: React.FC<Props> = ({ children, title }) => {
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  
  // Calculate gradient opacity based on proximity to header
  const gradientOpacity = useTransform(
    scrollY,
    (value) => {
      if (!ref.current) return 0;
      const rect = ref.current.getBoundingClientRect();
      const distanceToHeader = rect.top - 64; // header height
      return distanceToHeader < 16 ? 0.95 : 0;
    }
  );

  return (
    <Card ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent"
        style={{ opacity: gradientOpacity }}
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
};
```
