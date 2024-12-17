# Profile Page Technical Specification

---
type: design-spec
category: mobile-interface
status: updated
created: 2024-12-15
tags:
  - profile
  - mobile-first
  - dark-theme
  - neumorphic
  - animations
related:
  - [[Container System Specification]]
  - [[Dark Neumorphic Design System]]
  - [[Settings Page Specification]]
---

## Core Architecture Principle

Every section in the profile page implements the complete four-layer container architecture, ensuring consistent visual hierarchy and user experience throughout the interface.

## Container Layer System

### Universal Structure
```plaintext
└── Outer Container (inset)
    ├── Title Container (raised)
    └── Content Container (raised)
        └── Form Fields (pressed in)
```

### Layer Specifications

#### 1. Outer Container (Base Layer)
```scss
// Applied to EVERY section wrapper
.outer-container {
  // Core properties
  background: #e6e7ee;
  border: 0.0625rem solid rgb(209, 217, 230);
  border-radius: 0.55rem;
  padding: 1.5rem;
  
  // Inset shadow configuration
  box-shadow: 
    inset 2px 2px 5px rgb(184, 185, 190),
    inset -3px -3px 7px rgb(255, 255, 255);
}
```

#### 2. Title Container (Section Headers)
```scss
// Applied to EVERY section header
.header-container {
  // Core properties
  background: transparent;
  border: 0.0625rem solid rgb(250, 251, 254);
  border-radius: 0.55rem;
  padding: 1.25rem 1.5rem;
  
  // Elevated shadow configuration
  box-shadow:
    6px 6px 12px rgb(184, 185, 190),
    -6px -6px 12px rgb(255, 255, 255);
}
```

#### 3. Content Container (Section Content)
```scss
// Applied to EVERY section's content area
.content-container {
  // Core properties
  background: #e6e7ee;
  border: 0.0625rem solid rgb(209, 217, 230);
  border-radius: 0.55rem;
  padding: 1.5rem;
  
  // Medium elevation shadow
  box-shadow:
    6px 6px 12px rgb(184, 185, 190),
    -6px -6px 12px rgb(255, 255, 255);
}
```

#### 4. Form Fields (Interactive Elements)
```scss
// Applied to ALL interactive elements
.form-field {
  // Core properties
  background: #e6e7ee;
  border: 0.0625rem solid rgb(209, 217, 230);
  border-radius: 0.55rem;
  padding: 1rem;
  
  // Inset shadow for interaction areas
  box-shadow:
    inset 2px 2px 5px rgb(184, 185, 190),
    inset -3px -3px 7px rgb(255, 255, 255);
  
  // Focus state adds subtle glow
  &:focus {
    box-shadow:
      inset 2px 2px 5px rgb(184, 185, 190),
      inset -3px -3px 7px rgb(255, 255, 255),
      0 0 0 2px rgba(68, 71, 106, 0.2);
  }
}
```

## Section Implementations

### 1. Personal Information Section
```typescript
interface PersonalInfoSection {
  container: {
    outer: 'neumorphic-inset',
    title: 'neumorphic-raised',
    content: 'neumorphic-raised'
  },
  implementation: {
    grouping: 'accordion',  // Only this section uses accordion
    fields: 'form-fields-inset'
  },
  groups: {
    basicInfo: {/* fields */},
    address: {/* fields */},
    emergency: {/* fields */}
  }
}
```

### 2. Notification Settings Section
```typescript
interface NotificationSection {
  container: {
    outer: 'neumorphic-inset',
    title: 'neumorphic-raised',
    content: 'neumorphic-raised'
  },
  implementation: {
    grouping: 'standard',  // No accordion
    fields: 'form-fields-inset'
  },
  settings: {
    masterToggle: boolean,
    preferences: {/* settings */},
    quietHours: {/* settings */}
  }
}
```

### 3. Data Management Section
```typescript
interface DataSection {
  container: {
    outer: 'neumorphic-inset',
    title: 'neumorphic-raised',
    content: 'neumorphic-raised'
  },
  implementation: {
    grouping: 'standard',  // No accordion
    fields: 'form-fields-inset'
  },
  content: {
    storage: {/* info */},
    sync: {/* status */},
    actions: {/* controls */}
  }
}
```

### 4. Support Information Section
```typescript
interface SupportSection {
  container: {
    outer: 'neumorphic-inset',
    title: 'neumorphic-raised',
    content: 'neumorphic-raised'
  },
  implementation: {
    grouping: 'standard',  // No accordion
    fields: 'form-fields-inset'
  },
  content: {
    version: string,
    support: {/* contact info */},
    tutorial: {/* access */}
  }
}
```

## Section Specifications

### 1. Personal Information Section

#### Basic Information
```typescript
interface BasicInfo {
  name: string;        // Input: Full name validation
  email: string;       // Input: Disabled, pulled from auth
  phone: string;       // Input: Pattern XXX-XXX-XXXX
}
```
**Component Notes:**
- Use shadcn/ui Input with custom validation
- Phone field requires pattern matching
- Email field should be disabled but copyable

#### Address Information
```typescript
interface AddressInfo {
  street1: string;     // Input
  street2?: string;    // Input (optional)
  city: string;        // Input
  state: string;       // Select
  zipCode: string;     // Input: Pattern \d{5}
}
```
**Component Notes:**
- Use shadcn/ui Input for text fields
- State field uses Select with predefined US states
- ZIP requires numerical validation
- All fields except street2 are required

#### Emergency Contact
```typescript
interface EmergencyContact {
  name: string;        // Input
  phone: string;       // Input: Pattern XXX-XXX-XXXX
  relationship: string; // Select
}
```
**Component Notes:**
- Same phone validation as primary phone
- Relationship uses Select with predefined options
- All fields required

### 2. Notification Settings Section

#### Notification Preferences
```typescript
interface NotificationPreferences {
  masterToggle: boolean;   // Switch: Controls all notifications
  statusChanges: boolean;  // Switch: Admin status updates
  payrollUpdates: boolean; // Switch: Payroll processing
  systemUpdates: boolean;  // Switch: App updates
}
```
**Component Notes:**
- Use shadcn/ui Switch components
- Master toggle disables/enables all sub-toggles
- Individual toggles only active if master is enabled

#### Quiet Hours
```typescript
interface QuietHours {
  enabled: boolean;    // Switch
  startTime: string;   // Select: Time picker
  endTime: string;     // Select: Time picker
}
```
**Component Notes:**
- Time selection in 30-minute increments
- Validate end time is after start time
- Times displayed in user's local timezone

### 3. Data Management Section

#### Storage Information
```typescript
interface StorageInfo {
  usedSpace: number;   // Progress: Visual indicator
  retentionDays: {    // Select: Preset options
    value: 7 | 14 | 30 | 60;
    label: string;
  }
}
```
**Component Notes:**
- Progress bar for storage visualization
- Retention period uses Select with fixed options:
  - 7 days: "1 week"
  - 14 days: "2 weeks"
  - 30 days: "1 month"
  - 60 days: "2 months (maximum)"
- Clear helper text explaining storage implications

#### Sync Status
```typescript
interface SyncStatus {
  lastSync: string;    // Label: Timestamp
  status: string;      // Badge: Visual status
  actions: {
    clearCache: () => void;  // Button: Destructive
    forceSync: () => void;   // Button: Primary
  }
}
```
**Component Notes:**
- Use shadcn/ui Badge for status indication
- Color-coded status states:
  - Synced: Green
  - Pending: Yellow
  - Error: Red
- Destructive actions require confirmation dialog

### 4. Support Information Section

#### Application Information
```typescript
interface AppInfo {
  version: string;     // Label
  buildNumber: string; // Label
  environment: string; // Label: (Production/Staging)
}
```
**Component Notes:**
- Read-only informational display
- Copy functionality for support reference
- Grouped in a clean, minimal layout

#### Support Resources
```typescript
interface SupportResources {
  supportEmail: string;    // Link: mailto
  helpCenter: string;      // Link: External
  tutorialAccess: string;  // Button: Secondary
}
```
**Component Notes:**
- External links open in new tab
- Tutorial triggers in-app overlay
- Clear visual hierarchy for support options

## Implementation Guidelines

### Container Structure
Each section must implement the four-layer container system:
1. Outer Container (inset)
2. Title Container (raised)
3. Content Container (raised)
4. Form Fields (pressed in)

### State Management
- Form state handled by react-hook-form
- Validation using zod schemas
- Changes saved automatically with debounce
- Optimistic UI updates with error rollback

### Error Handling
- Field-level validation messages
- Form-level error summaries
- Network error handling
- Retry mechanisms for failed saves

### Performance Notes
- Lazy load sections as needed
- Implement proper form field memoization
- Optimize re-renders on field updates
- Cache form state appropriately

## Technical Requirements

### Component Library Usage
- Consistent use of shadcn/ui components
- Custom styling through Tailwind utilities
- No arbitrary values in Tailwind classes
- Maintain neumorphic aesthetic

### Validation Rules
- Name: 2-50 characters, letters only
- Phone: XXX-XXX-XXXX format
- ZIP: 5 digits
- Email: Standard email format
- Required field handling
## Component Implementation

### Universal Section Template
```tsx
// Base template for ALL sections
const Section = ({ title, children }) => (
  <div className="outer-container">
    <div className="header-container">
      <h2>{title}</h2>
    </div>
    <div className="content-container">
      {children}
    </div>
  </div>
);
```

### Personal Information (with Accordion)
```tsx
const PersonalInfoSection = () => (
  <Section title="Personal Information">
    <Accordion type="single" collapsible>
      {/* Accordion content */}
    </Accordion>
  </Section>
);
```

### Standard Section Example
```tsx
const NotificationSection = () => (
  <Section title="Notifications">
    <div className="form-field">
      {/* Standard form controls */}
    </div>
  </Section>
);
```

## Key Implementation Notes

1. Container Consistency
   - ALL sections use the complete four-layer architecture
   - No exceptions to the container hierarchy
   - Maintains visual consistency throughout

2. Differentiation
   - Only Personal Information uses accordion grouping
   - Other sections use standard content layout
   - All maintain same container structure

3. Shadow System
   - Consistent shadow values across all sections
   - Creates unified depth perception
   - Maintains visual hierarchy

4. Performance Considerations
   - Shadow rendering optimized per container
   - Consistent border-radius values
   - Standardized spacing metrics

## Animation & Transitions

### Container Animation System
```typescript
// Coordinated reveal animation for container structure
const containerAnimations = {
  // All containers animate in together
  containerReveal: {
    duration: 400,
    ease: [0.25, 0.1, 0.25, 1.0],
    properties: {
      opacity: [0, 1],
      transform: ['translateY(20px)', 'translateY(0)']
    }
  },
  
  // Content animates after containers
  contentReveal: {
    delay: 300, // Starts near end of container animation
    stagger: 50, // Stagger between elements
    duration: 200,
    elements: {
      buttons: true,
      inputs: true,
      text: true
    }
  }
}
```

### Scroll Behavior
```typescript
// Scroll configuration for progressive reveal
const scrollConfig = {
  threshold: 0.1,
  rootMargin: "20px",
  animationDuration: 300,
  staggerDelay: 50
}

// Section reveal on scroll
const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
}
```

### Interactive States (Mobile-Focused)
```typescript
// Neumorphic form field interactions
const fieldStates = {
  idle: {
    borderColor: "rgb(209, 217, 230)",
    boxShadow: "inset 2px 2px 5px rgb(184, 185, 190), inset -3px -3px 7px rgb(255, 255, 255)"
  },
  active: {
    borderColor: "rgb(250, 251, 254)",
    boxShadow: "inset 3px 3px 6px rgb(184, 185, 190), inset -4px -4px 8px rgb(255, 255, 255)",
    transform: "scale(0.98)"
  },
  error: {
    borderColor: "rgb(239, 68, 68)",
    boxShadow: "inset 2px 2px 5px rgb(184, 185, 190), inset -3px -3px 7px rgb(255, 255, 255)"
  }
}

// Neumorphic button interactions
const buttonStates = {
  rest: {
    boxShadow: "6px 6px 12px rgb(184, 185, 190), -6px -6px 12px rgb(255, 255, 255)"
  },
  active: {
    boxShadow: "inset 2px 2px 5px rgb(184, 185, 190), inset -3px -3px 7px rgb(255, 255, 255)",
    transform: "scale(0.95)"
  },
  disabled: {
    opacity: 0.7,
    boxShadow: "3px 3px 6px rgb(184, 185, 190), -3px -3px 6px rgb(255, 255, 255)"
  }
}
```

### Performance Optimizations

#### Shadow Rendering
```typescript
// Shadow optimization
const shadowOptimizations = {
  // Use GPU-accelerated properties
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  perspective: 1000,
  
  // Batch shadow updates
  willChange: "transform, box-shadow",
  
  // Reduce shadow complexity on scroll
  scrollOptimization: {
    threshold: 15, // px/s
    simplifiedShadow: "var(--shadow-simple)",
    restoreDelay: 150 // ms
  }
}
```

#### Animation Throttling
```typescript
// Animation frame limiting
const animationThrottling = {
  scrollThrottle: 16.67, // ~60fps
  resizeThrottle: 100,   // ms
  touchThrottle: 0,      // No throttle for touch
  
  // Stagger animations under load
  loadBalancing: {
    maxAnimations: 3,
    staggerDelay: 32,
    priority: {
      touch: 1,
      scroll: 2
    }
  }
}
```

#### State Management
```typescript
// Component state optimization
const stateOptimizations = {
  // Use local state for UI
  formState: {
    atom: true,
    subscribeToParent: false
  },
  
  // Memoize expensive calculations
  memoConfig: {
    shadowValues: true,
    layoutCalculations: true,
    deepComparisons: false
  },
  
  // Batch state updates
  batchStrategy: {
    delay: 16.67,
    maxBatchSize: 5
  }
}
```

#### Memory Usage
```typescript
// Memory optimization
const memoryOptimizations = {
  // Cleanup routines
  cleanup: {
    unmountTimeout: 500,
    cacheTimeout: 5000,
    maxCacheSize: 50
  },
  
  // Resource pooling
  resourcePool: {
    shadowNodes: 10,
    animationFrames: 5,
    intersectionObservers: 3
  }
}
```

### Technical Requirements

1. Animation Priority & Timing
   - Container reveal (400ms)
   - Content stagger (50ms between elements)
   - Interactive feedback (< 100ms)
   - Visual state changes (< 200ms)

2. Performance Targets
   - First paint < 1.2s
   - First interactive < 2.0s
   - Time to full interactive < 3.5s
   - Touch response < 50ms
   - Animation frame budget 16ms

3. Implementation Requirements
   - Maintain container hierarchy during animations
   - Optimize shadow rendering for scrolling
   - Handle state transitions smoothly
   - Ensure responsive behavior across devices
