# Fix Authentication Issue - Step by Step

## Problem
Login with email/password and Google authentication both failing on different systems.

## Solution Steps

### Step 1: Test Your Setup
1. Navigate to: `http://localhost:5173/auth-test`
2. Click "Run Configuration Tests" to check Firebase connection
3. Try "Test Email Sign-In" with any email/password
4. Try "Test Google Sign-In"
5. Check the test results for specific error messages

### Step 2: Firebase Console Configuration

Go to [Firebase Console](https://console.firebase.google.com/)

#### Enable Authentication Methods:
1. Select your project: `mentorai1998`
2. Go to **Authentication** → **Sign-in method**
3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable"
   - Add support email
   - Click "Save"

#### Add Authorized Domains:
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for development)
   - `127.0.0.1` (alternative localhost)
   - Your production domain (if deployed)

### Step 3: Check Environment Variables

Verify your `.env` file has all required variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyBiQVtm1-N6xoIGjFQE6GyluxHbjxl8q_8
VITE_FIREBASE_AUTH_DOMAIN=mentorai1998.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mentorai1998
VITE_FIREBASE_STORAGE_BUCKET=mentorai1998.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=792042014529
VITE_FIREBASE_APP_ID=1:792042014529:web:faefd332b8e7a15c1183c0
```

### Step 4: Restart Development Server

After making changes:
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

### Step 5: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Incognito/Private mode

### Step 6: Test Login Again

1. Go to `/login` or `/auth`
2. Try email/password login
3. Try Google login
4. Check browser console (F12) for errors

## Common Error Messages and Fixes

### "auth/operation-not-allowed"
**Fix:** Enable the sign-in method in Firebase Console

### "auth/unauthorized-domain"
**Fix:** Add your domain to authorized domains in Firebase Console

### "auth/invalid-api-key"
**Fix:** Check your `.env` file has correct API key

### "auth/popup-blocked"
**Fix:** Allow popups in browser settings for localhost

### "auth/network-request-failed"
**Fix:** 
- Check internet connection
- Disable VPN/Proxy
- Check firewall settings
- Try different browser

### "auth/invalid-credential" or "auth/wrong-password"
**Fix:** 
- Check email/password are correct
- Password must be at least 6 characters
- Try creating a new account first

## Testing Checklist

- [ ] Firebase Email/Password enabled in console
- [ ] Firebase Google Sign-in enabled in console
- [ ] localhost added to authorized domains
- [ ] Environment variables are correct
- [ ] Development server restarted
- [ ] Browser cache cleared
- [ ] Popups allowed in browser
- [ ] No firewall/antivirus blocking Firebase
- [ ] Internet connection working

## Still Not Working?

1. Check the auth test page: `/auth-test`
2. Open browser console (F12) and copy the exact error
3. Check Firebase Console → Authentication → Users to see if accounts are being created
4. Try a different browser (Chrome, Firefox, Edge)
5. Try incognito/private mode
6. Check if Firebase services are down: https://status.firebase.google.com/

## Quick Test Commands

```bash
# Check if environment variables are loaded
npm run dev

# In browser console:
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
```

## Contact Support

If still having issues, provide:
1. Screenshot of `/auth-test` results
2. Browser console errors (F12 → Console tab)
3. Firebase Console screenshot showing enabled methods
4. Browser and OS version
