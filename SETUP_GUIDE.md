# Setup Guide - Running Skillverse on Any Laptop

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (for cloning repository)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

4. **Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd skillverse
```

### Step 2: Install Dependencies
```bash
npm install
```
This will install all required packages (~2-3 minutes)

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# Copy the example (if exists)
cp .env.example .env

# Or create new .env file
touch .env
```

Add your Firebase credentials to `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Start Development Server
```bash
npm run dev
```

The app will start on `http://localhost:8080` (or next available port)

### Step 5: Open in Browser
Navigate to the URL shown in terminal (usually http://localhost:8080)

## 🔥 Firebase Setup (First Time Only)

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name (e.g., "skillverse")
4. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" provider
4. (Optional) Enable "Google" provider

### 3. Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location

### 4. Enable Storage
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (for development)

### 5. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" icon (</>)
4. Register app
5. Copy the config values to your `.env` file

## 📁 Project Structure

```
skillverse/
├── src/
│   ├── components/          # Reusable components
│   │   ├── layout/         # Layout components (AdminLayout, Navbar)
│   │   ├── ui/             # UI components (shadcn/ui)
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── learn/          # Learning platform pages
│   │   ├── careers/        # Career path pages
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── LearnHome.tsx   # Learning platform home
│   │   ├── CoursesMain.tsx # Courses home
│   │   └── ...
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── integrations/       # Firebase integration
│   ├── services/           # API services
│   ├── data/              # Static data and questions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── .env                   # Environment variables (create this)
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
└── firebase.json          # Firebase hosting config
```

## 🧪 Testing the Application

### 1. Test Authentication
- Go to http://localhost:8080
- Click "Sign Up"
- Create a test account
- Verify you're redirected to `/home`

### 2. Test Navigation
- Click "Learn" in navbar → Should go to `/learn`
- Click "Courses" in navbar → Should go to `/courses`
- Click "Skillverse" logo → Should go to `/home`

### 3. Test Dashboard
- Navigate to `/dashboard`
- Verify sidebar appears
- Test all sidebar links
- Test Careers dropdown
- Test Sign Out button

### 4. Test Learning Platform
- Go to `/learn`
- Click on any tutorial (e.g., HTML)
- Verify sidebar navigation works
- Test code copy functionality
- Test Previous/Next buttons

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Seed questions to Firebase
npm run seed:questions
```

## 🐛 Troubleshooting

### Issue: Port already in use
**Solution:** Vite will automatically use the next available port (8081, 8082, etc.)

### Issue: Module not found errors
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Firebase connection errors
**Solution:** 
1. Check `.env` file exists and has correct values
2. Verify Firebase project is active
3. Check browser console for specific errors

### Issue: Build fails
**Solution:**
```bash
# Check for TypeScript errors
npm run build

# Fix any errors shown in output
```

### Issue: Blank page after deployment
**Solution:**
1. Check browser console for errors
2. Verify Firebase hosting rewrites are configured
3. Check that all environment variables are set in hosting platform

### Issue: Authentication not working
**Solution:**
1. Verify Firebase Authentication is enabled
2. Check authorized domains in Firebase Console
3. Verify `.env` variables are correct

## 🌐 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not done):
```bash
firebase init
# Select: Hosting
# Public directory: dist
# Single-page app: Yes
# Automatic builds: No
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

## 📱 Application Features

### Public Pages
- `/` - Login page
- `/signup` - Registration page

### After Login
- `/home` - Landing page with navbar
- `/dashboard` - Dashboard with sidebar
- `/learn` - W3Schools-style learning platform
- `/courses` - Courses marketplace
- `/careers` - Career paths

### Dashboard Features
- Profile management
- Resume builder
- ATS checker
- AI assistant
- Practice questions
- Learning path tracker
- Analytics
- Settings

## 🔒 Security Notes

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Configure Firebase rules** before production
4. **Enable Firebase App Check** for production
5. **Restrict API keys** in Firebase Console

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Check `DEPLOYMENT_CHECKLIST.md`
3. Review browser console for errors
4. Check Firebase Console for service status
5. Verify all environment variables are set

## ✅ Verification Checklist

Before considering setup complete:
- [ ] Dependencies installed successfully
- [ ] `.env` file created with Firebase credentials
- [ ] Dev server starts without errors
- [ ] Can access http://localhost:8080
- [ ] Can create account and login
- [ ] Navigation works (home, learn, courses, dashboard)
- [ ] No console errors in browser
- [ ] Firebase connection working

## 🎉 Success!

If all checks pass, your application is ready to use!

**Development URL:** http://localhost:8080 (or shown port)
**Production URL:** (after deployment)

---

**Last Updated:** December 2024
**Version:** 1.0.0
