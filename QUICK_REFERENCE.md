# 🚀 Skillverse - Quick Reference Card

## ⚡ Quick Start (New Laptop)

```bash
# 1. Clone
git clone <repo-url>
cd skillverse

# 2. Install
npm install

# 3. Configure .env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender
VITE_FIREBASE_APP_ID=your_app_id

# 4. Run
npm run dev

# 5. Open
http://localhost:8080
```

## 📱 Main Routes

| Route | Description | Layout |
|-------|-------------|--------|
| `/` | Login | None |
| `/home` | Landing page | Navbar only |
| `/learn` | Learning platform | Navbar only |
| `/courses` | Courses marketplace | Navbar only |
| `/dashboard` | User dashboard | Navbar + Sidebar |

## 🎯 Key Features

### Learning Platform (`/learn`)
- W3Schools-style tutorials
- HTML, CSS, JS, React, Python, SQL, Node.js, TypeScript
- Interactive code examples
- Copy-to-clipboard
- Sidebar navigation

### Courses (`/courses`)
- Standalone marketplace
- Course categories
- Featured courses
- Search functionality
- No sidebar (different from dashboard)

### Dashboard (`/dashboard`)
- Profile, Resume Builder, ATS Checker
- AI Assistant, Practice, Analytics
- Learning Path, Settings
- Sidebar navigation
- Careers dropdown

## 🔧 Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run linter
```

## 🚀 Deploy

```bash
# Firebase
npm run build
firebase deploy

# Vercel
vercel

# Netlify
npm run build
netlify deploy --prod --dir=dist
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Vite auto-uses next port |
| Module errors | `rm -rf node_modules && npm install` |
| Firebase errors | Check `.env` file |
| Build fails | `npm run build` and fix errors |

## 📞 Help

- [Setup Guide](SETUP_GUIDE.md) - Detailed instructions
- [Deployment](DEPLOYMENT_CHECKLIST.md) - Deploy checklist
- [Status](FINAL_STATUS.md) - Current status

## ✅ Status

**Production Ready** ✅
- Build: SUCCESS
- Errors: 0
- Server: Running
- Routes: All working

---

**Need help?** Check the full documentation files above.
