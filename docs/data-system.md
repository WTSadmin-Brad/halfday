# Half Day App - Complete Data System Specification

## Overview

This document provides a comprehensive specification of the Half Day App's data system, including data models, validation rules, sync strategies, and error handling.

## Core Data Models

### Base Interfaces

```typescript
// Base interface for all documents with versioning
interface BaseDocument {
  id: string;
  version: number;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
  createdBy: string;
  updatedBy: string;
}

// Interface for documents that support offline sync
interface SyncableDocument extends BaseDocument {
  syncStatus: 'SYNCED' | 'PENDING' | 'ERROR';
  localUpdatedAt: FirebaseTimestamp;
  serverUpdatedAt: FirebaseTimestamp;
}
```

### User Data Models

```typescript
interface User extends BaseDocument {
  // Authentication Data
  email: string;
  role: 'WORKER' | 'ADMIN';
  active: boolean;

  // Personal Information
  name: string;
  phone: string;  // Format: XXX-XXX-XXXX
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;    // Two-letter code
    zipCode: string;  // Five digits
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface UserSettings extends SyncableDocument {
  userId: string;
  notifications: {
    enabled: boolean;
    statusChanges: boolean;
    payrollProcessed: boolean;
    systemUpdates: boolean;
    quietHours: {
      enabled: boolean;
      start: string;  // 24hr format
      end: string;    // 24hr format
    };
  };
  offlineDaysToKeep: number;  // Default: 60
}
```

### Work Record Models

```typescript
interface WorkDay extends SyncableDocument {
  id: string;              // Format: ${userId}_${YYYY-MM-DD}
  userId: string;
  date: FirebaseTimestamp;
  status: 'FULL' | 'HALF' | 'OFF';
  truckId: string;
  locationId: string;
  notes?: string;
  locked: boolean;         // True after payroll processing
}

interface PayPeriod extends BaseDocument {
  startDate: FirebaseTimestamp;
  endDate: FirebaseTimestamp;
  status: 'OPEN' | 'LOCKED' | 'PROCESSED';
  lockedAt?: FirebaseTimestamp;
  lockedBy: string;
}
```

### Reference Data Models

```typescript
interface Location extends BaseDocument {
  name: string;
  active: boolean;
}

interface Truck extends BaseDocument {
  number: string;
  active: boolean;
}
```

## Validation Rules

### Field Validation Patterns

```typescript
const validationPatterns = {
  name: {
    pattern: /^[a-zA-Z\s'-]{2,50}$/,
    message: "Name must be 2-50 characters, letters only"
  },
  phone: {
    pattern: /^\d{3}-\d{3}-\d{4}$/,
    message: "Phone format: XXX-XXX-XXXX"
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format"
  },
  address: {
    street: /^[a-zA-Z0-9\s,.-]{5,100}$/,
    city: /^[a-zA-Z\s.-]{2,50}$/,
    state: /^[A-Z]{2}$/,
    zip: /^\d{5}$/
  }
}
```

### Business Rule Validation

```typescript
const businessRules = {
  workDay: {
    noFutureDates: true,
    maxPastDays: 60,
    requireTruckLocation: true,
    noModifyIfLocked: true
  },
  payPeriod: {
    weeklyOnly: true,
    noOverlap: true,
    requireAllDays: true,
    autoLockOnProcess: true
  }
}
```

## Error Handling

### Error Types and Messages

```typescript
enum ValidationErrorCode {
  REQUIRED = 'REQUIRED',
  INVALID_FORMAT = 'INVALID_FORMAT',
  LOCKED = 'LOCKED',
  INACTIVE = 'INACTIVE',
  FUTURE_DATE = 'FUTURE_DATE',
  TOO_OLD = 'TOO_OLD',
  SYSTEM_CONSTRAINT = 'SYSTEM_CONSTRAINT'
}

interface ValidationError {
  field: string;
  code: ValidationErrorCode;
  message: string;
  context?: Record<string, any>;
}

const errorHandlers = {
  [ValidationErrorCode.REQUIRED]: (field) => ({
    user: `Please enter your ${field}`,
    admin: `Worker ${field} is required`
  }),
  [ValidationErrorCode.LOCKED]: () => ({
    user: "This day has been locked for payroll processing. Contact admin for changes.",
    admin: "Unlock pay period to modify this record"
  }),
  [ValidationErrorCode.SYSTEM_CONSTRAINT]: (context) => ({
    user: "Unable to process. Please try again later.",
    admin: `System limit reached: ${context.constraint}`
  })
}
```

### Recovery Strategies

```typescript
const recoveryStrategies = {
  SYNC_FAILED: {
    retry: true,
    maxAttempts: 3,
    backoffMs: 1000,
    preserveLocal: true
  },
  LOCKED_RECORD: {
    notifyAdmin: true,
    showUserMessage: true,
    preserveAttempt: false
  },
  INVALID_DATA: {
    preserveInput: true,
    allowPartialSave: true,
    showValidationUI: true
  }
}
```

## Sync Management

### Priority Levels

```typescript
const syncPriorities = {
  WORK_STATUS: {
    priority: 1,      // Highest
    maxDelay: 0,      // Immediate
    batchSize: 1      // Individual sync
  },
  LOCKED_PERIOD: {
    priority: 2,
    maxDelay: 1000,   // 1 second
    batchSize: 10
  },
  PROFILE_CHANGES: {
    priority: 3,
    maxDelay: 5000,   // 5 seconds
    batchSize: 5
  },
  SETTINGS_CHANGES: {
    priority: 4,
    maxDelay: 10000,  // 10 seconds
    batchSize: 10
  },
  HISTORICAL_DATA: {
    priority: 5,      // Lowest
    maxDelay: 30000,  // 30 seconds
    batchSize: 20
  }
}
```

### Sync Resolution Strategy

```typescript
const resolutionStrategy = {
  WORK_STATUS: {
    CONCURRENT_EDIT: {
      resolution: 'SERVER_WINS',    // Admin changes take precedence
      notifyUser: true,
      preserveLocal: false
    },
    LOCKED_RECORD: {
      resolution: 'SERVER_WINS',
      notifyUser: true,
      showAdminContact: true
    }
  },
  
  PROFILE_DATA: {
    CONCURRENT_EDIT: {
      resolution: 'CLIENT_WINS',    // Latest change wins
      updateServer: true,
      preserveTimestamp: true
    }
  },

  BATCH_OPERATIONS: {
    allowPartial: true,
    retryFailed: true,
    preserveOrder: true
  }
}
```

## Offline Storage Management

### Storage Configuration

```typescript
interface OfflineStorage {
  // Primary data
  workDays: {
    maxDays: 60,
    aggregateOlder: true,   // Monthly summaries beyond 60 days
    pruneThreshold: "80%"   // Storage cleanup trigger
  },
  
  // Reference data
  referenceData: {
    trucks: true,
    locations: true,
    updateFrequency: "daily"
  },
  
  // Sync queue
  syncQueue: {
    maxItems: 100,
    maxAge: "24h",
    priorityOrder: true
  }
}
```

### Aggregation Strategy

```typescript
interface MonthlyAggregate {
  userId: string;
  year: number;
  month: number;
  summary: {
    fullDays: number;
    halfDays: number;
    offDays: number;
    totalDays: number;
  };
  locations: {
    [locationId: string]: number;  // Days at location
  };
  trucks: {
    [truckId: string]: number;    // Days with truck
  };
}
```

## Performance Considerations

### Optimization Rules

```typescript
const performanceConfig = {
  // Query optimization
  queries: {
    maxBatchSize: 20,
    useIndexes: true,
    cacheResults: true
  },
  
  // Sync optimization
  sync: {
    maxConcurrent: 3,
    batchWindow: 5000,
    retryBackoff: [1000, 5000, 30000]
  },
  
  // Storage optimization
  storage: {
    compressionEnabled: true,
    maxCacheSize: "50MB",
    cleanupInterval: "24h"
  }
}
```

## Implementation Notes

1. Data Access Patterns
   - Use compound indexes for efficient queries
   - Implement optimistic UI updates
   - Cache frequently accessed data

2. Offline Considerations
   - Store minimal required data offline
   - Implement progressive sync on reconnect
   - Maintain clear sync status indicators

3. Security Rules
   - Enforce role-based access
   - Validate all writes server-side
   - Maintain audit trail for changes

4. Performance Targets
   - Sub-second local data access
   - Background sync within 5 minutes
   - Storage usage under 50MB per user

## Next Steps

1. Implementation Priorities
   - Core data models and validation
   - Offline storage setup
   - Basic sync functionality
   - Error handling system

2. Future Enhancements
   - Advanced analytics
   - Extended historical data
   - Custom reporting
   - Backup system