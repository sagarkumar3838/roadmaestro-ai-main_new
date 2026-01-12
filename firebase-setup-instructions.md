# 🔥 Firebase Setup Instructions - URGENT FIX

## Issue: "Missing or insufficient permissions" 

The Firebase project `korporatekeeda` needs manual setup in the Firebase Console.

## Required Steps (Do these NOW):

### 1. Enable Authentication
1. Go to: https://console.firebase.google.com/project/korporatekeeda
2. Click **Authentication** → **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click **Save**

### 2. Enable Firestore Database  
1. In the same console, click **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for now)
4. Select location: **us-central1** (or closest to you)
5. Click **Done**

### 3. Verify Rules (Should be automatic)
The rules are already deployed, but verify in Firestore → Rules tab:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## After Setup:
1. Refresh http://localhost:8080/
2. Try login/signup
3. Navigate to profile page
4. The errors should be gone!

## Quick Test:
- Login should work
- Profile page should load
- "Explore Career" button should be visible
- Profile editing should save to Firebase

**This will take 2-3 minutes to complete in Firebase Console.**