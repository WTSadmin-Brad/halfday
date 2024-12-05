import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  Timestamp,
  DocumentReference,
  QueryConstraint,
  increment as firestoreIncrement,
  CollectionReference
} from 'firebase/firestore';
import { db } from './index';
import { BaseDocument, SyncStatus, SyncQueueItem, Collection } from './types';

// Generic type for Firestore operations
type FirestoreDocument = BaseDocument & Record<string, any>;

// Collection references with proper typing
export const collections: {
  [K in 'users' | 'workDays' | 'syncQueue' | 'userSettings' | 'userProfiles']: CollectionReference
} = {
  users: collection(db, 'users'),
  workDays: collection(db, 'workDays'),
  syncQueue: collection(db, 'syncQueue'),
  userSettings: collection(db, 'userSettings'),
  userProfiles: collection(db, 'userProfiles')
};

// Generic CRUD operations
export async function createDocument<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  data: Omit<T, keyof BaseDocument>,
  customId?: string
): Promise<T> {
  const docRef = customId 
    ? doc(collections[collectionName], customId)
    : doc(collections[collectionName]);

  const timestamp = serverTimestamp();
  const documentData = {
    ...data,
    id: customId || docRef.id,
    created: timestamp,
    updated: timestamp,
    syncStatus: SyncStatus.SYNCED,
    version: 1
  } as T;

  await setDoc(docRef, documentData);
  return documentData;
}

export async function updateDocument<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  id: string,
  data: Partial<Omit<T, keyof BaseDocument>>
): Promise<void> {
  const docRef = doc(collections[collectionName], id);
  const updateData = {
    ...data,
    updated: serverTimestamp(),
    version: firestoreIncrement(1)
  };
  await updateDoc(docRef, updateData);
}

export async function deleteDocument(
  collectionName: keyof typeof collections,
  id: string
): Promise<void> {
  const docRef = doc(collections[collectionName], id);
  await deleteDoc(docRef);
}

export async function getDocument<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  id: string
): Promise<T | null> {
  const docRef = doc(collections[collectionName], id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } as T : null;
}

export async function queryDocuments<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  ...queryConstraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(collections[collectionName], ...queryConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
}

// Sync Queue Management
export async function addToSyncQueue(
  item: Omit<SyncQueueItem, keyof BaseDocument | 'retryCount' | 'status' | 'timestamp'>
): Promise<void> {
  await createDocument<SyncQueueItem>('syncQueue', {
    ...item,
    retryCount: 0,
    status: SyncStatus.PENDING,
    timestamp: serverTimestamp()
  });
}

const entityTypeToCollection: Record<SyncQueueItem['entityType'], keyof typeof collections> = {
  'WORKDAY': 'workDays',
  'SETTINGS': 'userSettings',
  'PROFILE': 'userProfiles'
};

export async function processSyncQueue(userId: string): Promise<void> {
  const pendingItems = await queryDocuments<SyncQueueItem>(
    'syncQueue',
    where('userId', '==', userId),
    where('status', '==', SyncStatus.PENDING)
  );

  const batch = writeBatch(db);

  for (const item of pendingItems) {
    try {
      const collectionName = entityTypeToCollection[item.entityType];
      const docRef = doc(collections[collectionName], item.entityId);
      
      switch (item.operation) {
        case 'CREATE':
        case 'UPDATE':
          batch.set(docRef, {
            ...item.data,
            updated: serverTimestamp(),
            syncStatus: SyncStatus.SYNCED
          }, { merge: true });
          break;
        case 'DELETE':
          batch.delete(docRef);
          break;
      }

      // Update sync queue item
      const syncQueueRef = doc(collections.syncQueue, item.id);
      batch.update(syncQueueRef, {
        status: SyncStatus.SYNCED,
        updated: serverTimestamp()
      });
    } catch (error) {
      const syncQueueRef = doc(collections.syncQueue, item.id);
      if (error instanceof Error) {
        batch.update(syncQueueRef, {
          status: SyncStatus.CONFLICT,
          error: error.message,
          retryCount: firestoreIncrement(1),
          updated: serverTimestamp()
        });
      } else {
        batch.update(syncQueueRef, {
          status: SyncStatus.CONFLICT,
          error: 'An unknown error occurred',
          retryCount: firestoreIncrement(1),
          updated: serverTimestamp()
        });
      }
    }
  }

  await batch.commit();
}

// Real-time listeners
export function subscribeToDocument<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  id: string,
  callback: (data: T | null) => void
): () => void {
  const docRef = doc(collections[collectionName], id);
  return onSnapshot(docRef, (snapshot) => {
    callback(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } as T : null);
  });
}

export function subscribeToQuery<T extends FirestoreDocument>(
  collectionName: keyof typeof collections,
  callback: (data: T[]) => void,
  ...queryConstraints: QueryConstraint[]
): () => void {
  const q = query(collections[collectionName], ...queryConstraints);
  return onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T));
    callback(documents);
  });
}