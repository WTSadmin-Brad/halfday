# Half Day App - Complete Architecture

## Root Directory Structure

```plaintext
half-day-app/
├── .windsurf/                  # Windsurf IDE configuration
├── src/                        # Source code root
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Authentication routes (grouped)
│   │   │   ├── login/         # Login page
│   │   │   ├── register/      # Registration page
│   │   │   ├── reset/         # Password reset
│   │   │   └── layout.tsx     # Auth layout
│   │   ├── (worker)/          # Worker routes (grouped)
│   │   │   ├── calendar/      # Calendar view
│   │   │   │   ├── components/# Calendar-specific components
│   │   │   │   ├── hooks/     # Calendar-specific hooks
│   │   │   │   └── page.tsx   # Calendar page
│   │   │   ├── profile/       # Worker profile
│   │   │   ├── settings/      # User settings
│   │   │   └── layout.tsx     # Worker layout
│   │   ├── (admin)/           # Admin routes (grouped)
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   │   ├── components/# Dashboard-specific components
│   │   │   │   ├── widgets/   # Dashboard widgets
│   │   │   │   └── page.tsx   # Dashboard page
│   │   │   ├── employees/     # Employee management
│   │   │   ├── reports/       # Report generation
│   │   │   ├── locations/     # Location management
│   │   │   ├── trucks/        # Truck management
│   │   │   └── layout.tsx     # Admin layout
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Auth endpoints
│   │   │   ├── workers/       # Worker endpoints
│   │   │   ├── admin/         # Admin endpoints
│   │   │   └── sync/          # Sync endpoints
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Root page
│   ├── components/            # React components
│   │   ├── animations/        # Animation components
│   │   ├── auth/             # Authentication components
│   │   │   ├── animations/    # Auth-specific animations
│   │   │   ├── elements/      # Neumorphic UI elements
│   │   │   ├── forms/        # Auth forms
│   │   │   └── shared/       # Shared auth components
│   │   ├── worker/           # Worker-specific components
│   │   │   ├── calendar/     # Calendar components
│   │   │   └── profile/      # Profile components
│   │   ├── admin/            # Admin-specific components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   ├── reports/      # Report components
│   │   │   └── management/   # Management tools
│   │   ├── shared/           # Shared components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── forms/        # Form components
│   │   │   └── feedback/     # Feedback components
│   │   └── ui/              # Base UI components
│   │       └── typography/   # Typography components
│   ├── lib/                 # Library code
│   │   ├── animations/      # Animation utilities
│   │   │   ├── constants/   # Animation configs
│   │   │   ├── hooks/       # Animation hooks
│   │   │   └── variants/    # Animation variants
│   │   ├── firebase/        # Firebase configuration
│   │   │   ├── auth.ts      # Authentication setup
│   │   │   ├── firestore.ts # Database config
│   │   │   ├── functions.ts # Cloud functions
│   │   │   └── index.ts     # Firebase initialization
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── auth/       # Authentication hooks
│   │   │   ├── data/       # Data management hooks
│   │   │   ├── offline/    # Offline functionality hooks
│   │   │   └── ui/         # UI-related hooks
│   │   ├── store/          # State management
│   │   │   ├── slices/     # Store slices
│   │   │   ├── middleware/ # Custom middleware
│   │   │   └── index.ts    # Store configuration
│   │   ├── styles/         # Global styles
│   │   ├── typography/     # Typography system
│   │   │   ├── types.ts    # Typography definitions
│   │   │   └── hooks/      # Typography hooks
│   │   └── utils/          # Utility functions
│   ├── styles/             # Global styles
│   └── types/             # TypeScript definitions
├── public/               # Static assets
│   ├── logo/            # Logo assets
│   │   └── fallback/    # Fallback images
│   └── [other assets]   # Other static assets
├── tests/               # Test files
└── docs/               # Documentation
```

## Development Guidelines

### Animation Usage
```typescript
// Feature animations: components/[feature]/animations/
// Shared animations: lib/animations/
// Config: lib/animations/constants/
```

### Typography Implementation
```typescript
// Provider setup: components/ui/typography/provider.tsx
// Type definitions: lib/typography/types.ts
// Theme hooks: lib/typography/hooks/
```

### Component Organization
```plaintext
Base UI (components/ui/)
├── Reusable base components
├── Typography components
└── Animation components

Feature Components (components/[feature]/)
├── Feature-specific components
├── Feature-specific animations
└── Feature-specific styles
```

### State Management
```plaintext
lib/store/
├── Core state slices
├── Feature-specific slices
└── Sync/offline middleware
```

### Offline Architecture
```plaintext
lib/hooks/offline/
├── Sync management
├── Local storage
└── Background operations
```

### Firebase Integration
```plaintext
lib/firebase/
├── Authentication
├── Firestore config
├── Cloud Functions
└── Storage setup
```

## Core Features 

1. Authentication System (PWA-ready)
2. Calendar Interface (worker)
3. Admin Dashboard
4. Offline Sync
5. Analytics & Reports
6. Worker Management
7. Location/Truck Tracking

## Technical Requirements

1. Performance optimization
2. Offline-first architecture
3. Real-time sync
4. Responsive design
5. Type safety
6. Automated testing
7. Documentation maintenance