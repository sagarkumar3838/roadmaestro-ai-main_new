import { auth, db } from '@/integrations/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  AuthError,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Enhanced error messages
const getAuthErrorMessage = (error: AuthError): string => {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
    'auth/popup-blocked': 'Popup was blocked by the browser. Please allow popups.',
    'auth/unauthorized-domain': 'This domain is not authorized. Please contact support.',
    'auth/invalid-api-key': 'Invalid API key. Please check Firebase configuration.',
  };

  return errorMessages[error.code] || error.message || 'An unexpected error occurred.';
};

// Log detailed error for debugging
const logAuthError = (context: string, error: AuthError) => {
  console.error(`[Auth Error - ${context}]`, {
    code: error.code,
    message: error.message,
    customData: error.customData,
  });
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    console.log('[Auth] Attempting email sign-in...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('[Auth] Sign-in successful');
    return userCredential.user;
  } catch (error) {
    logAuthError('signInWithEmail', error as AuthError);
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

// Create new account with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  try {
    console.log('[Auth] Creating new account...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Create user profile in Firestore
    await setDoc(doc(db, 'profiles', user.uid), {
      display_name: displayName || email.split('@')[0],
      email: user.email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log('[Auth] Account created successfully');
    return user;
  } catch (error) {
    logAuthError('signUpWithEmail', error as AuthError);
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    console.log('[Auth] Attempting Google sign-in...');
    const provider = new GoogleAuthProvider();
    
    // Add custom parameters
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if profile exists
    const profileRef = doc(db, 'profiles', user.uid);
    const profileSnap = await getDoc(profileRef);

    // Create or update profile
    await setDoc(
      profileRef,
      {
        display_name: user.displayName || user.email?.split('@')[0],
        email: user.email,
        photo_url: user.photoURL,
        updated_at: new Date(),
        ...(profileSnap.exists() ? {} : { created_at: new Date() }),
      },
      { merge: true }
    );

    console.log('[Auth] Google sign-in successful');
    return user;
  } catch (error) {
    logAuthError('signInWithGoogle', error as AuthError);
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    console.log('[Auth] Signing out...');
    await signOut(auth);
    console.log('[Auth] Sign-out successful');
  } catch (error) {
    logAuthError('signOut', error as AuthError);
    throw new Error('Failed to sign out. Please try again.');
  }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  try {
    console.log('[Auth] Sending password reset email...');
    await sendPasswordResetEmail(auth, email);
    console.log('[Auth] Password reset email sent');
  } catch (error) {
    logAuthError('resetPassword', error as AuthError);
    throw new Error(getAuthErrorMessage(error as AuthError));
  }
};

// Check if user profile exists
export const checkUserProfile = async (userId: string): Promise<boolean> => {
  try {
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);
    return profileSnap.exists();
  } catch (error) {
    console.error('[Auth] Error checking user profile:', error);
    return false;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check Firebase connection
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('[Auth] Checking Firebase connection...');
    const testRef = doc(db, '_test', 'connection');
    await getDoc(testRef);
    console.log('[Auth] Firebase connection OK');
    return true;
  } catch (error) {
    console.error('[Auth] Firebase connection failed:', error);
    return false;
  }
};
