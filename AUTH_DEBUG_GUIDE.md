# Authentication Debug Guide

## Common Firebase Auth Issues

### 1. Check Firebase Console Settings

Go to Firebase Console → Authentication → Sign-in method:
- ✅ Email/Password should be ENABLED
- ✅ Google should be ENABLED with authorized domains

### 2. Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:
- Add `localhost` for development
- Add your production domain
- Add `127.0.0.1` if needed

### 3. Check Browser Console

Look for these specific errors:
- `auth/operation-not-allowed` - Sign-in method not enabled
- `auth/unauthorized-domain` - Domain not authorized
- `auth/invalid-api-key` - Wrong API key
- `auth/network-request-failed` - Network/CORS issue

### 4. Test Steps

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to login
4. Copy the exact error message

### 5. Quick Fixes

**If you see "operation-not-allowed":**
- Enable Email/Password in Firebase Console
- Enable Google Sign-in in Firebase Console

**If you see "unauthorized-domain":**
- Add your domain to authorized domains list

**If you see network errors:**
- Check if Firebase is blocked by firewall/antivirus
- Try different browser
- Check internet connection
