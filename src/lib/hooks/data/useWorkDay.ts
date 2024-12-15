import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp, collection, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../auth/useAuth';
import { addToSyncQueue } from '@/lib/firebase/firestore';
import { WorkDay, WorkStatus } from '@/lib/data/models';
import { workDaySchema } from '@/lib/data/validation/schemas';

interface UseWorkDayReturn {
  workDays: WorkDay[];
  isLoading: boolean;
  error: Error | null;
  updateWorkDay: (id: string, updates: Partial<WorkDay>) => Promise<void>;
  createWorkDay: (date: Date, status: WorkStatus, locationId?: string, truckId?: string) => Promise<void>;
  syncStatus: 'synced' | 'pending' | 'error';
}

export function useWorkDay(month?: Date): UseWorkDayReturn {
  const [workDays, setWorkDays] = useState<WorkDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'error'>('synced');

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const startDate = month ? new Date(month.getFullYear(), month.getMonth(), 1) : new Date();
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const workDaysQuery = query(
      collection(db, 'workDays'),
      where('userId', '==', user.uid),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );

    const unsubscribe = onSnapshot(workDaysQuery,
      (snapshot) => {
        try {
          const validatedWorkDays = snapshot.docs.map(doc => {
            const data = doc.data();
            return workDaySchema.parse({
              ...data,
              id: doc.id,
              date: data.date.toDate()
            });
          });
          setWorkDays(validatedWorkDays);
          setSyncStatus('synced');
        } catch (err) {
          console.error('WorkDay validation error:', err);
          setError(err instanceof Error ? err : new Error('WorkDay validation failed'));
          setSyncStatus('error');
        }
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching workdays:', err);
        setError(err as Error);
        setSyncStatus('error');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, month]);

  const updateWorkDay = async (id: string, updates: Partial<WorkDay>) => {
    if (!user) return;

    try {
      const workDayRef = doc(db, 'workDays', id);
      const currentWorkDay = workDays.find(wd => wd.id === id);

      if (!currentWorkDay) {
        throw new Error('WorkDay not found');
      }

      const updatedWorkDay = {
        ...currentWorkDay,
        ...updates,
        updated: serverTimestamp(),
        version: currentWorkDay.version + 1
      };

      workDaySchema.parse(updatedWorkDay);

      setWorkDays(prev => prev.map(wd => wd.id === id ? updatedWorkDay : wd));
      setSyncStatus('pending');

      if (!navigator.onLine) {
        await addToSyncQueue({
          userId: user.uid,
          operation: 'UPDATE',
          entityType: 'WORKDAY',
          entityId: id,
          data: updatedWorkDay
        });
        return;
      }

      await setDoc(workDayRef, updatedWorkDay, { merge: true });
      setSyncStatus('synced');
    } catch (err) {
      console.error('Error updating workday:', err);
      setError(err as Error);
      setSyncStatus('error');
    }
  };

  const createWorkDay = async (date: Date, status: WorkStatus, locationId?: string, truckId?: string) => {
    if (!user) return;

    try {
      const workDayId = `${user.uid}_${date.toISOString().split('T')[0]}`;
      const workDayRef = doc(db, 'workDays', workDayId);

      const newWorkDay: WorkDay = {
        id: workDayId,
        userId: user.uid,
        date,
        status,
        locationId,
        truckId,
        locked: false,
        version: 1,
        syncStatus: 'PENDING',
        created: serverTimestamp(),
        updated: serverTimestamp()
      };

      workDaySchema.parse(newWorkDay);

      setWorkDays(prev => [...prev, newWorkDay]);
      setSyncStatus('pending');

      if (!navigator.onLine) {
        await addToSyncQueue({
          userId: user.uid,
          operation: 'CREATE',
          entityType: 'WORKDAY',
          entityId: workDayId,
          data: newWorkDay
        });
        return;
      }

      await setDoc(workDayRef, newWorkDay);
      setSyncStatus('synced');
    } catch (err) {
      console.error('Error creating workday:', err);
      setError(err as Error);
      setSyncStatus('error');
    }
  };

  return {
    workDays,
    isLoading,
    error,
    updateWorkDay,
    createWorkDay,
    syncStatus
  };
}