# Firebase Setup Instructions

## Current Status
- ✅ Firebase project: `korporatekeeda` 
- ✅ Web app created: `Skillverse App`
- ✅ Firestore rules deployed
- ✅ Environment variables updated

## Required Manual Steps

### 1. Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/project/korporatekeeda)
2. Navigate to **Authentication** > **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Enable **Google** provider (optional but recommended)

### 2. Enable Firestore Database
1. In Firebase Console, navigate to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (rules are already configured)
4. Select a location (choose closest to your users)

### 3. Test the Application
1. Open http://localhost:8081/
2. Try to sign up/login
3. Navigate to profile page
4. Add profile details and verify they save to Firestore

## Troubleshooting
- If you get permission errors, check that Firestore rules are deployed
- If authentication fails, verify the providers are enabled
- Check browser console for detailed error messages