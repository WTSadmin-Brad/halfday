# User Profile & Settings Page Specification

---

type: component
category: worker-interface
status: in-development
created: 2024-12-08
tags:

- profile
- settings
- worker
- ui-components
  related:
- [[Calendar Design]]
- [[Authentication System]]
- [[Notification System]]

---

## Overview

The User Profile & Settings page provides workers with a streamlined interface to manage their personal information, notification preferences, and app settings. The design follows our established glass morphism patterns and uses the shadcn/ui component library with Lucide icons.

## Component Structure

### Profile Information Card

```typescript
interface ProfileInfo {
  name: string;
  phone: string;
  email: string;
  emergencyContact: string;
  selectedIcon: string;
  achievements: {
    sevenDay: boolean;
    thirtyDay: boolean;
    sixMonth: boolean;
  };
}
```

#### Features

- Personal information fields (name, phone, email)
- Emergency contact information
- Profile icon selection from Lucide icon set
- Achievement badges display
  - 7-day streak badge
  - 30-day streak badge
  - 6-month streak badge

### Notification Settings Card

```typescript
interface NotificationSettings {
  enabled: boolean;
  scheduleReminders: boolean;
  payrollAlerts: boolean;
  announcements: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string; // format: "HH:mm"
  quietHoursEnd: string; // format: "HH:mm"
  preferredContact: "sms" | "email" | "push";
}
```

#### Features

- Master notification toggle
- Individual notification type toggles:
  - Schedule reminders
  - Payroll alerts
  - Important announcements
- Quiet hours configuration
- Preferred contact method selection

### Data Management Card

```typescript
interface DataSettings {
  syncEnabled: boolean;
}
```

#### Features

- Automatic sync toggle
- Sync status indicator

### Support & Information Card

```typescript
interface SupportInfo {
  version: string;
}
```

#### Features

- Tutorial access button
- Version information display

## Tab-Based Layout

### Tab Structure

```typescript
type TabKey = "info" | "settings" | "data" | "help";

interface TabConfig {
  key: TabKey;
  icon: LucideIcon;
  label: string;
  content: React.FC;
}

const tabs: TabConfig[] = [
  {
    key: "info",
    icon: UserIcon,
    label: "Personal Info",
    content: PersonalInfoTab,
  },
  {
    key: "settings",
    icon: Settings,
    label: "Settings",
    content: SettingsTab,
  },
  {
    key: "data",
    icon: Database,
    label: "Data",
    content: DataTab,
  },
  {
    key: "help",
    icon: HelpCircle,
    label: "Help",
    content: HelpTab,
  },
];
```

### Tab Content Specifications

#### 1. Personal Info Tab

```typescript
interface PersonalInfoForm {
  name: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferredName: string;
  profileIcon: string;
}

// Form validation rules
const personalInfoValidation = {
  name: { required: true, minLength: 2 },
  phone: { required: true, pattern: /^\+?[\d\s-]{10,}$/ },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  emergencyContact: {
    name: { required: true },
    phone: { required: true, pattern: /^\+?[\d\s-]{10,}$/ },
    relationship: { required: true },
  },
};
```

#### 2. Settings Tab

```typescript
interface SettingsForm {
  notifications: {
    enabled: boolean;
    scheduleReminders: boolean;
    payrollAlerts: boolean;
    announcements: boolean;
    quietHours: {
      enabled: boolean;
      start: string; // HH:mm
      end: string; // HH:mm
    };
  };
  appearance: {
    theme: "system" | "light" | "dark";
    reducedMotion: boolean;
    fontSize: "small" | "medium" | "large";
  };
  privacy: {
    showOnlineStatus: boolean;
    shareAchievements: boolean;
  };
}
```

#### 3. Data Management Tab

```typescript
interface DataManagementForm {
  sync: {
    autoSync: boolean;
    syncInterval: number; // minutes
    syncOnCellular: boolean;
  };
  storage: {
    cacheSize: number;
    clearCache: () => Promise<void>;
    exportData: () => Promise<void>;
  };
  preferences: {
    defaultView: "calendar" | "list";
    startOfWeek: 0 | 1 | 6; // 0 = Sunday, 1 = Monday, 6 = Saturday
  };
}
```

#### 4. Help & Support Tab

```typescript
interface HelpContent {
  version: string;
  tutorials: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
  }[];
  support: {
    email: string;
    phone: string;
    hours: string;
    faq: {
      question: string;
      answer: string;
    }[];
  };
}
```

### Tab Interactions

1. **Navigation**:

   - Horizontal swipe between tabs on mobile
   - Smooth transitions with slide animations
   - Tab indicator animation
   - Keyboard navigation support (←/→)

2. **Content Loading**:

   - Progressive loading of tab content
   - Skeleton loading states
   - Cache previously viewed tabs
   - Preserve form state between switches

3. **Form Handling**:

   - Auto-save on field blur
   - Debounced saves for text inputs
   - Immediate save for toggles/switches
   - Offline support with sync queue

4. **Animations**:
   ```typescript
   const tabAnimations = {
     // Tab switch animation
     content: {
       initial: { opacity: 0, x: 20 },
       animate: { opacity: 1, x: 0 },
       exit: { opacity: 0, x: -20 },
     },
     // Tab indicator
     indicator: {
       initial: { width: 0 },
       animate: { width: "100%" },
       transition: { type: "spring", stiffness: 500, damping: 30 },
     },
   };
   ```

## Visual Design

### Glass Morphism Implementation

```tsx
// Base glass-morphic styles matching our established pattern
const glassStyles = {
  base: "bg-white/[0.03] backdrop-blur-md border-white/[0.05]",
  card: "rounded-lg shadow-lg shadow-black/5",
  drawer: "border-t rounded-t-2xl",
};
```

### Layout Structure

```plaintext
┌────────────────────────────┐
│      Profile Section       │
├────────────────────────────┤
│    - Personal Info        │
│    - Emergency Contact    │
│    - Achievement Badges   │
└────────────────────────────┘

┌────────────────────────────┐
│   Notification Settings    │
├────────────────────────────┤
│    - Notification Types   │
│    - Quiet Hours         │
│    - Contact Preferences │
└────────────────────────────┘

┌────────────────────────────┐
│    Data Management        │
├────────────────────────────┤
│    - Sync Settings       │
└────────────────────────────┘

┌────────────────────────────┐
│    Help & Information     │
├────────────────────────────┤
│    - Tutorial Access     │
│    - Version Info        │
└────────────────────────────┘
```

## Firebase Data Structure

```typescript
// Firestore Collections
interface ProfileCollection {
  [userId: string]: {
    // Basic Info
    name: string;
    phone: string;
    email: string;
    emergencyContact: string;
    selectedIcon: string;

    // Settings
    notificationSettings: NotificationSettings;
    dataSettings: DataSettings;

    // Achievements (subcollection)
    achievements: {
      sevenDay: { earned: boolean; timestamp: Timestamp };
      thirtyDay: { earned: boolean; timestamp: Timestamp };
      sixMonth: { earned: boolean; timestamp: Timestamp };
    };

    // Metadata
    lastUpdated: Timestamp;
    lastSynced: Timestamp;
    version: number;
  };
}

// Sync Queue Collection
interface SyncQueueCollection {
  [queueId: string]: {
    userId: string;
    operation: "update" | "delete";
    path: string;
    data: Partial<ProfileCollection>;
    timestamp: Timestamp;
    status: "pending" | "processing" | "completed" | "failed";
    retryCount: number;
  };
}
```

## Offline Integration

### Sync Queue Implementation

```typescript
interface ProfileSyncQueue {
  // Local IndexedDB structure
  pendingChanges: {
    id: string;
    changes: Partial<ProfileCollection>;
    timestamp: number;
    retryCount: number;
  }[];

  // Methods
  queueUpdate(changes: Partial<ProfileCollection>): Promise<void>;
  processPendingChanges(): Promise<void>;
  handleConflicts(
    serverData: ProfileCollection,
    localChanges: Partial<ProfileCollection>
  ): Promise<void>;
}
```

### Offline-First Strategy

1. All profile changes are first saved to IndexedDB
2. Changes are queued in the sync queue
3. Background sync processes changes when online
4. Conflicts are resolved using timestamp-based strategy

## Animation Guidelines

Following our simplified approach from calendar page learnings:

```typescript
// Simple fade transitions
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Subtle scale effects
const scaleVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

// Card transitions
const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
};

// Animation durations
const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};
```

### Animation Usage Guidelines

1. Use simple, single-property animations
2. Avoid complex chained animations
3. Maintain consistent timing across similar interactions
4. Prefer opacity and transform properties
5. Keep animations subtle and purposeful

## Component Dependencies

- @/components/ui/card
- @/components/ui/button
- @/components/ui/switch
- @/components/ui/input
- @/components/ui/select
- @/components/ui/badge
- lucide-react icons

## Implementation Notes

1. **State Management**

   - Use React's useState for local component state
   - Implement proper form validation
   - Save changes immediately on toggle/selection

2. **Responsive Behavior**

   - Full width cards on mobile
   - Two-column layout possible on larger screens
   - Maintain readability of all fields

3. **Achievement Logic**

   - Badges should reflect actual streak data
   - Use opacity to indicate inactive badges
   - Include hover states with achievement details

4. **Notification System**

   - Respect quiet hours in notification delivery
   - Show immediate feedback on preference changes
   - Handle offline state gracefully

5. **Data Considerations**
   - Cache profile data for offline access
   - Implement proper error handling
   - Show sync status indicators

## Accessibility Requirements

1. Proper ARIA labels for all interactive elements
2. Keyboard navigation support
3. High contrast text and icons
4. Clear focus indicators

## Error States

1. Invalid input handling
2. Offline state management
3. Sync failure indicators
4. Form validation feedback

## Next Steps

1. [ ] Implement base component structure
2. [ ] Add state management
3. [ ] Implement notification logic
4. [ ] Add achievement tracking
5. [ ] Test offline functionality
6. [ ] Add error handling
7. [ ] Implement sync logic
8. [ ] Add form validation

## Future Considerations

1. Additional achievement types
2. Enhanced notification options
3. Advanced sync settings
4. Profile data export
5. Additional customization options
