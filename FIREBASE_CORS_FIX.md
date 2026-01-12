# Firebase CORS Issue Fix

## Problem
You're experiencing a CORS error with Firebase Firestore on localhost in Chrome:
```
Access to fetch at 'https://firestore.googleapis.com/...' has been blocked by CORS policy
```

## Solutions

### Option 1: Use Firefox (Recommended for Development)
Firefox doesn't have the same CORS restrictions as Chrome for localhost. Simply open your app in Firefox and it should work.

### Option 2: Clear Browser Data
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Clear all storage:
   - IndexedDB
   - Local Storage
   - Session Storage
4. Hard refresh (Ctrl+Shift+R)

### Option 3: Use Chrome with Disabled Security (NOT RECOMMENDED)
Close all Chrome windows and start with:
```bash
chrome.exe --disable-web-security --user-data-dir="C:/chrome-dev-session"
```

### Option 4: Deploy and Test in Production
The CORS issue only affects localhost. Your production deployment will work fine.

## Why This Happens
Chrome has strict CORS policies when credentials are included with wildcard origins. Firebase's WebChannel transport triggers this when using localhost with certain ports.

## Firebase Storage CORS Fix

### Problem
Video files from Firebase Storage are blocked by OpaqueResponseBlocking error.

### Solution
1. Apply CORS configuration to your Firebase Storage bucket:
```bash
gsutil cors set cors.json gs://mentorai1998.firebasestorage.app
```

2. Rename files in Firebase Storage to remove spaces:
   - `Loadingpage _img.mp4` → `Loadingpage_img.mp4`
   - `Loadingpage _img.webm` → `Loadingpage_img.webm`

3. The cors.json file has been created in the project root with proper configuration.

### Note
You need Google Cloud SDK installed to run the gsutil command.
Install from: https://cloud.google.com/sdk/docs/install

## Current Status
- Firebase Authentication: ✅ Working
- Firebase Config: ✅ Loaded correctly
- Firestore Connection: ❌ Blocked by CORS (Chrome only)
- Firebase Storage: ⚠️ Needs CORS configuration + file rename
