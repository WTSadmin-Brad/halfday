# Comprehensive Project Architecture - Half Day App

## Overview
Definitive project structure optimized for Next.js 14, PWA capabilities, offline-first development, and comprehensive testing.

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
│   │   │   ├── admin/        # Admin endpoints
│   │   │   └── sync/         # Sync endpoints
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Root page
│   ├── components/            # React components
│   │   ├── auth/             # Authentication components
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── worker/           # Worker-specific components
│   │   │   ├── calendar/     # Calendar components
│   │   │   │   ├── day-cell.tsx
│   │   │   │   ├── month-view.tsx
│   │   │   │   └── status-panel.tsx
│   │   │   └── profile/      # Profile components
│   │   ├── admin/            # Admin-specific components
│   │   │   ├── dashboard/    # Dashboard widgets
│   │   │   ├── reports/      # Report components
│   │   │   └── management/   # Management tools
│   │   ├── shared/           # Shared components
│   │   │   ├── layout/       # Layout components
│   │   │   │   ├── header/   # Header components
│   │   │   │   ├── navigation/# Navigation components
│   │   │   │   └── footer/   # Footer components
│   │   │   ├── forms/        # Form components
│   │   │   └── feedback/     # Feedback components
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Library code
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
│   │   │   │   ├── auth/   # Auth state
│   │   │   │   ├── offline/# Offline state
│   │   │   │   ├── sync/   # Sync state
│   │   │   │   └── ui/     # UI state
│   │   │   ├── middleware/ # Custom middleware
│   │   │   ├── selectors/  # State selectors
│   │   │   └── index.ts    # Store configuration
│   │   ├── utils/          # Utility functions
│   │   │   ├── date/       # Date utilities
│   │   │   ├── format/     # Formatting utilities
│   │   │   ├── validation/ # Validation utilities
│   │   │   └── test/       # Test utilities
│   │   └── constants/      # Constants and types
│   │       ├── routes.ts   # Route definitions
│   │       └── types.ts    # TypeScript types
│   ├── styles/             # Global styles
│   │   ├── globals.css     # Global CSS
│   │   └── themes/         # Theme configurations
│   └── types/             # TypeScript type definitions
│       ├── auth.d.ts      # Auth types
│       ├── worker.d.ts    # Worker types
│       └── admin.d.ts     # Admin types
├── public/               # Static assets
│   ├── pwa/             # PWA assets
│   │   ├── manifest.json # PWA manifest
│   │   ├── offline.html # Offline fallback
│   │   └── icons/       # App icons
│   └── service-worker/  # Service worker scripts
│       ├── sync.js      # Sync functionality
│       └── push.js      # Push notifications
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   │   ├── components/ # Component tests
│   │   ├── hooks/      # Hook tests
│   │   └── utils/      # Utility tests
│   ├── integration/    # Integration tests
│   │   ├── features/   # Feature tests
│   │   └── api/        # API tests
│   ├── e2e/           # End-to-end tests
│   │   ├── flows/     # User flow tests
│   │   └── scenarios/ # Scenario tests
│   └── __mocks__/     # Mock implementations
├── scripts/           # Build/deployment scripts
│   ├── setup/        # Setup scripts
│   │   ├── env.ts    # Environment setup
│   │   └── db.ts     # Database setup
│   └── deploy/       # Deployment scripts
│       ├── staging.ts # Staging deployment
│       └── prod.ts    # Production deployment
└── docs/             # Documentation
    ├── api/          # API documentation
    ├── architecture/ # Architecture docs
    └── development/  # Development guides
```

## Core Features Organization

### 1. Calendar Feature
```plaintext
src/app/(worker)/calendar/
├── components/           # Calendar-specific components
│   ├── day-cell/        # Day cell component
│   │   ├── index.tsx    # Component implementation
│   │   ├── styles.ts    # Styles
│   │   └── types.ts     # TypeScript types
│   ├── month-view/      # Month view component
│   └── status-panel/    # Status update panel
├── hooks/               # Calendar-specific hooks
│   ├── useCalendarData.ts
│   └── useStatusUpdate.ts
└── page.tsx             # Calendar page
```

### 2. Admin Dashboard
```plaintext
src/app/(admin)/dashboard/
├── components/          # Dashboard-specific components
│   ├── metrics/        # Metrics components
│   ├── charts/         # Chart components
│   └── tables/         # Table components
├── widgets/            # Dashboard widgets
│   ├── quick-stats/    # Quick statistics
│   ├── recent-activity/# Activity feed
│   └── alerts/         # System alerts
└── page.tsx            # Dashboard page
```

### 3. Authentication
```plaintext
src/app/(auth)/
├── login/              # Login route
│   ├── components/     # Login components
│   └── page.tsx        # Login page
├── register/          # Registration route
├── reset/            # Password reset
└── layout.tsx        # Auth layout
```

## Implementation Notes

### 1. Development Workflow
```typescript
// scripts/setup/env.ts
interface EnvSetup {
  environment: 'development' | 'staging' | 'production';
  features: string[];
  firebase: FirebaseConfig;
  pwa: PWAConfig;
}

// scripts/deploy/prod.ts
interface DeployConfig {
  target: 'staging' | 'production';
  version: string;
  features: string[];
}
```

### 2. Testing Structure
```typescript
// tests/integration/features/calendar.test.ts
describe('Calendar Feature', () => {
  describe('Day Selection', () => {
    it('handles status updates correctly', () => {
      // Test implementation
    });
  });
});
```

### 3. Service Worker Strategy
```typescript
// public/service-worker/sync.js
interface SyncStrategy {
  queueSize: number;
  retryLimit: number;
  backoffMultiplier: number;
}
```

## Notes
1. **Feature Organization**
   - Feature-first component organization
   - Colocated tests with features
   - Shared utilities in lib/
   - Clear separation of concerns

2. **PWA Support**
   - Comprehensive offline support
   - Push notification infrastructure
   - Background sync capability
   - Service worker strategy

3. **Testing Coverage**
   - Unit tests for components
   - Integration tests for features
   - E2E tests for critical flows
   - Performance testing setup

4. **Development Experience**
   - Clear import paths
   - Consistent naming conventions
   - Documentation structure
   - Build/deploy automation

Would you like me to:
1. Detail any specific section further?
2. Add more implementation examples?
3. Expand on testing strategies?
4. Document additional patterns?