# Quick Fix for Authentication Issue

## Immediate Actions

### 1. Go to Firebase Console NOW
Visit: https://console.firebase.google.com/project/mentorai1998/authentication/providers

### 2. Enable Email/Password
- Click on "Email/Password" provider
- Toggle the switch to **ENABLED**
- Click **Save**

### 3. Enable Google Sign-In
- Click on "Google" provider  
- Toggle the switch to **ENABLED**
- Enter your email as support email
- Click **Save**

### 4. Add Authorized Domain
Go to: https://console.firebase.google.com/project/mentorai1998/authentication/settings

Under "Authorized domains", click **Add domain** and add:
- `localhost`

### 5. Test Your Setup
1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:5173/auth-test`

3. Click "Run Configuration Tests"

4. Try "Test Email Sign-In" with:
   - Email: `test@example.com`
   - Password: `test123456`

5. Check the results

## What to Look For

### ✅ Success Signs:
- Green checkmarks on all tests
- "Connected successfully" message
- User created/signed in message

### ❌ Error Signs:
- "auth/operation-not-allowed" → Sign-in method not enabled
- "auth/unauthorized-domain" → Domain not authorized
- "auth/network-request-failed" → Internet/firewall issue

## Most Likely Issue

Based on your symptoms (both email and Google failing), the most likely cause is:

**Sign-in methods are not enabled in Firebase Console**

This is the #1 reason authentication fails on new Firebase projects.

## After Enabling

1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server
3. Try login again at `/login`
4. Check browser console (F12) for any remaining errors

## Still Not Working?

Run the auth test page and share:
1. Screenshot of test results
2. Browser console errors
3. Firebase Console screenshot showing enabled methods
