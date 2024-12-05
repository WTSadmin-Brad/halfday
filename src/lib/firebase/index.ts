import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDqY8PAbDddgh1rWKtS4gzqyC0rEAo_4bI",
  authDomain: "half-day-ccaea.firebaseapp.com",
  projectId: "half-day-ccaea",
  storageBucket: "half-day-ccaea.firebasestorage.app",
  messagingSenderId: "184162954726",
  appId: "1:184162954726:web:cedc60ee737a80e45bba27",
  measurementId: "G-GK7QMTXF0G"
};

// Initialize Firebase (ensure single instance)
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support offline persistence');
    }
  });

  // Set auth persistence to local
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Error setting auth persistence:', error);
  });
}

// Initialize Analytics (client-side only)
const analytics = typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;

export { firebaseApp, db, auth, functions, analytics };
