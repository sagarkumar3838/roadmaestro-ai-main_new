import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration with fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBiQVtm1-N6xoIGjFQE6GyluxHbjxl8q_8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mentorai1998.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mentorai1998",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mentorai1998.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "792042014529",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:792042014529:web:faefd332b8e7a15c1183c0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QNRWHX5T9Z",
};

// Only log in development mode, without exposing sensitive data
if (import.meta.env.DEV) {
  console.log("Firebase initialized successfully");
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore - using default getFirestore to avoid initialization conflicts
// Note: CORS issues with localhost are a known Chrome/Firebase limitation
// The app will work in production or you can use Firefox for development
export const db = getFirestore(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);

export default firebaseApp;
