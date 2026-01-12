# Pre-Deployment Checklist & Testing Guide

## 🔍 Pre-Deployment Tests

### 1. Environment Setup
- [x] `.env` file configured with Firebase credentials
- [ ] Firebase Storage files renamed (remove spaces from filenames)
- [ ] CORS configuration applied to Firebase Storage

### 2. Build Test
```bash
npm run build
```
Expected: Build completes without errors, creates `dist` folder

### 3. Local Preview Test
```bash
npm run preview
```
Expected: App runs on local server, test all features

### 4. Firebase Storage Assets
Check these files exist in Firebase Storage (without spaces):
- [ ] `Assests/video/Loadingpage_img.mp4`
- [ ] `Assests/video/Loadingpage_img.webm`
- [ ] `Assests/video/Mentor_AI.webm`
- [ ] All images in `Assests/images/`

### 5. Core Features to Test

#### Authentication
- [ ] User can sign up
- [ ] User can log in
- [ ] User can log out
- [ ] Password reset works

#### Question System
- [ ] Questions load from Firebase
- [ ] Can filter by category (HTML, CSS, JavaScript, jQuery, DevTools)
- [ ] Can filter by difficulty (Easy, Medium, Hard, Advance)
- [ ] Question cards display correctly

#### Skill Test
- [ ] Can start a skill test
- [ ] Questions display properly
- [ ] Can submit answers
- [ ] Timer works correctly
- [ ] Results display after completion
- [ ] Score calculation is accurate

#### Code Editor (if applicable)
- [ ] Monaco editor loads
- [ ] Can write code
- [ ] Syntax highlighting works
- [ ] Code evaluation works

#### Admin Features (if applicable)
- [ ] Admin can access admin panel
- [ ] Can add/edit/delete questions
- [ ] Can view user statistics

#### UI/UX
- [ ] All videos load without CORS errors
- [ ] All images load correctly
- [ ] Responsive design works on mobile
- [ ] Navigation works smoothly
- [ ] No console errors

### 6. Performance Check
- [ ] Lighthouse score > 80
- [ ] No memory leaks
- [ ] Fast page load times

## 🚀 Deployment Steps

### Step 1: Install Firebase CLI (if not installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase (if not done)
```bash
firebase init
```
Select:
- Hosting
- Use existing project: mentorai1998
- Public directory: dist
- Single-page app: Yes
- Automatic builds: No

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Test Locally Before Deploy
```bash
firebase serve
```
Test at: http://localhost:5000

### Step 6: Deploy to Firebase
```bash
firebase deploy
```

### Step 7: Verify Deployment
- [ ] Visit your live URL
- [ ] Test all core features
- [ ] Check browser console for errors
- [ ] Test on mobile device

## 🔧 Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run lint`
- Clear cache: `rm -rf node_modules dist && npm install`

### CORS Errors
- Apply CORS config: `gsutil cors set cors.json gs://mentorai1998.firebasestorage.app`
- Check Firebase Storage rules

### Assets Not Loading
- Verify Firebase Storage URLs in `src/constants/assets.ts`
- Check file names match exactly (case-sensitive)
- Ensure files are public in Firebase Storage

### Firebase Connection Issues
- Verify `.env` variables are correct
- Check Firebase project settings
- Ensure Firestore rules allow read/write

## 📝 Post-Deployment

- [ ] Update README with live URL
- [ ] Monitor Firebase usage/quotas
- [ ] Set up error tracking (optional)
- [ ] Enable Firebase Analytics (optional)
- [ ] Configure custom domain (optional)
