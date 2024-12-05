import { Timestamp, FieldValue } from 'firebase/firestore';

export type FirebaseTimestamp = Timestamp | FieldValue;

export enum SyncStatus {
  PENDING = 'PENDING',
  SYNCED = 'SYNCED',
  CONFLICT = 'CONFLICT'
}

export interface SyncQueueItem extends BaseDocument {
  userId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entityType: 'WORKDAY' | 'SETTINGS' | 'PROFILE';
  entityId: string;
  data: any;
  timestamp: FirebaseTimestamp;
  retryCount: number;
  status: SyncStatus;
  error?: string;
}

// Shared interfaces for Firestore documents
export interface BaseDocument {
  id: string;
  created: FirebaseTimestamp;
  updated: FirebaseTimestamp;
  syncStatus?: SyncStatus;
  version?: number;
}

// Utility type for Firestore collections
export type Collection<T> = {
  [key: string]: T;
};
