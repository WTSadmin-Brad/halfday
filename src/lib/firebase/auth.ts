import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './index';
import { FirebaseTimestamp, BaseDocument } from './types';

const auth = getAuth();

// Types from data-models.md
export enum UserRole {
  WORKER = 'WORKER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface User extends BaseDocument {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
  lastSyncTimestamp: number;
}

export interface UserProfile extends BaseDocument {
  userId: string;
  phone?: string;
  avatar?: string;
  emergencyContact?: string;
  preferredLanguage: string;
}

// Auth methods
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await getUserData(userCredential.user.uid);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return await getUserData(userCredential.user.uid);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

export const signUpWithEmail = async (
  email: string, 
  password: string, 
  name: string, 
  role: UserRole = UserRole.WORKER
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    
    // Create user document in Firestore
    const userData: User = {
      id: user.uid,
      email: user.email!,
      name,
      role,
      active: true,
      lastSyncTimestamp: Date.now(),
      created: serverTimestamp(),
      updated: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    return userData;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/user-not-found':
          throw new Error('No account found with this email');
        default:
          throw new Error('Failed to send reset email. Please try again later.');
      }
    }
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(email);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

// Helper functions
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userData = await getUserData(firebaseUser.uid);
      callback(userData);
    } else {
      callback(null);
    }
  });
};

// Error handling
const getAuthErrorMessage = (error: any): string => {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completion.';
    default:
      return 'An error occurred during authentication.';
  }
};