import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../auth/useAuth';
import { addToSyncQueue } from '@/lib/firebase/firestore';
import { Profile } from '@/lib/data/models/profile';
import { profileUtils } from '@/lib/data/utils/profile';

interface UseProfileReturn {
    profile: Profile | null;
    isLoading: boolean;
    error: Error | null;
    updateProfile: (updates: Partial<Profile>) => Promise<void>;
    syncStatus: 'synced' | 'pending' | 'error';
}

export function useProfile(): UseProfileReturn {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'error'>('synced');
    
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const profileRef = doc(db, 'users', user.uid);

        const unsubscribe = onSnapshot(profileRef, 
            (doc) => {
                if (doc.exists()) {
                    try {
                        const profileData = profileUtils.validateProfile(doc.data());
                        setProfile(profileData);
                        setSyncStatus('synced');
                    } catch (err) {
                        console.error('Profile validation error:', err);
                        setError(err instanceof Error ? err : new Error('Profile validation failed'));
                        setSyncStatus('error');
                    }
                } else {
                    const defaultProfile = profileUtils.createDefaultProfile(
                        user.uid,
                        user.email || '',
                        user.displayName || ''
                    );
                    setProfile(defaultProfile);
                }
                setIsLoading(false);
            },
            (err) => {
                console.error('Error fetching profile:', err);
                setError(err as Error);
                setSyncStatus('error');
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user || !profile) return;

        try {
            const updatedProfile = {
                ...profile,
                ...updates,
                updated: serverTimestamp(),
                version: profile.version + 1
            };

            // Validate the merged profile
            profileUtils.validateProfile(updatedProfile);

            // Optimistically update local state
            setProfile(updatedProfile);
            setSyncStatus('pending');

            const profileRef = doc(db, 'users', user.uid);

            if (!navigator.onLine) {
                await addToSyncQueue({
                    userId: user.uid,
                    operation: 'UPDATE',
                    entityType: 'PROFILE',
                    entityId: user.uid,
                    data: updatedProfile
                });
                return;
            }

            await setDoc(profileRef, updatedProfile, { merge: true });
            setSyncStatus('synced');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err as Error);
            setSyncStatus('error');
        }
    };

    return {
        profile,
        isLoading,
        error,
        updateProfile,
        syncStatus
    };
}