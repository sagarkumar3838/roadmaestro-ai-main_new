# Firebase Storage CORS Fix - Action Steps

## What I've Done
✅ Created `cors.json` with proper CORS configuration
✅ Updated `src/constants/assets.ts` to use filenames without spaces
✅ Updated video references from `Loadingpage _img.mp4` to `Loadingpage_img.mp4`

## What You Need to Do

### Step 1: Rename Files in Firebase Storage
Go to your Firebase Console → Storage and rename these files:
- `Assests/video/Loadingpage _img.mp4` → `Loadingpage_img.mp4`
- `Assests/video/Loadingpage _img.webm` → `Loadingpage_img.webm`

### Step 2: Apply CORS Configuration
Run this command (requires Google Cloud SDK):
```bash
gsutil cors set cors.json gs://mentorai1998.firebasestorage.app
```

If you don't have Google Cloud SDK:
1. Install from: https://cloud.google.com/sdk/docs/install
2. Authenticate: `gcloud auth login`
3. Then run the gsutil command above

### Step 3: Test
After completing steps 1 and 2, refresh your app. The video should load without CORS errors.

## Alternative: Quick Test Without CORS Fix
If you want to test immediately without setting up gsutil:
1. Just rename the files in Firebase Storage (Step 1)
2. The app will try to load the renamed files
3. If CORS issues persist, you'll need to complete Step 2

## Source Map Warnings (Optional)
The source map warnings are harmless but can be suppressed by adding to `vite.config.ts`:
```typescript
build: {
  sourcemap: false
}
```
