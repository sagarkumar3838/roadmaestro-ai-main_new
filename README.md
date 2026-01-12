# 🎓 Skillverse - Complete Learning Management System

A modern, full-featured learning platform built with React, TypeScript, Firebase, and Tailwind CSS. Features include a W3Schools-style tutorial system, course marketplace, career paths, AI assistant, and comprehensive dashboard.

## ✨ Features

### 🏠 Landing Page & Navigation
- Modern, responsive landing page
- Smooth animations with Framer Motion
- Intelligent navigation system
- User authentication (Email/Password, Google)

### 📚 Learning Platform (W3Schools-style)
- Interactive tutorials for HTML, CSS, JavaScript, React, Python, SQL, Node.js, TypeScript
- Code examples with syntax highlighting
- Copy-to-clipboard functionality
- "Try it Yourself" interactive editor
- Sidebar navigation for easy browsing
- Search functionality

### 🎯 Courses Marketplace
- Browse courses by category
- Featured courses section
- Course details with ratings and reviews
- Progress tracking
- Certification system

### 💼 Career Paths
- OGL Developer
- MERN Stack Developer
- DevOps Developer
- QA Tester
- Web Developer
- Python Full Stack
- Java Full Stack

### 🎨 Dashboard Features
- User profile management
- Resume builder with templates
- ATS (Applicant Tracking System) checker
- AI-powered career assistant
- Practice questions and quizzes
- Learning path tracker
- Analytics and progress reports
- Settings and preferences

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd skillverse
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:8080`

## 📖 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed setup instructions for running on any laptop
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Complete pre-deployment verification
- **[Question System](QUESTION_SYSTEM_SUMMARY.md)** - Question bank documentation

## 🗂️ Project Structure

```
skillverse/
├── src/
│   ├── components/       # Reusable components
│   │   ├── layout/      # AdminLayout, Navbar
│   │   └── ui/          # shadcn/ui components
│   ├── pages/           # Page components
│   │   ├── learn/       # Learning platform pages
│   │   └── careers/     # Career path pages
│   ├── contexts/        # React contexts (Auth, Theme)
│   ├── integrations/    # Firebase integration
│   ├── services/        # API services
│   └── data/           # Static data and questions
├── public/             # Static assets
├── .env               # Environment variables (create this)
└── firebase.json      # Firebase hosting config
```

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Animation:** Framer Motion, GSAP
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** React Query, Context API
- **Code Editor:** Monaco Editor
- **Forms:** React Hook Form, Zod

## 📱 Key Routes

### Public Routes
- `/` - Login page
- `/signup` - Registration page
- `/auth` - Authentication page

### Protected Routes (After Login)
- `/home` - Landing page with navbar
- `/learn` - W3Schools-style learning platform
- `/courses` - Courses marketplace (standalone)
- `/dashboard` - User dashboard with sidebar
- `/careers` - Career paths explorer
- `/profile` - User profile management
- `/practice` - Practice questions
- `/resume-builder` - Resume builder tool
- `/ats-checker` - ATS checker tool
- `/ai-assistant` - AI career assistant
- `/analytics` - Progress analytics
- `/settings` - User settings

## 🎨 Application Flow

1. **Login/Signup** → User authenticates
2. **Home Page** (`/home`) → Landing page with navbar
3. **Three Main Sections:**
   - **Learn** (`/learn`) - W3Schools-style tutorials (no sidebar)
   - **Courses** (`/courses`) - Course marketplace (no sidebar)
   - **Dashboard** (`/dashboard`) - User dashboard (with sidebar)

## 🧪 Available Scripts

```bash
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

## 🚀 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 🔒 Security Features

- Firebase Authentication with protected routes
- Environment variables for sensitive data
- Firestore security rules
- Input validation and sanitization
- CORS configuration
- API key restrictions

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
- Vite will automatically use next available port (8081, 8082, etc.)

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Firebase connection errors**
- Verify `.env` file exists with correct credentials
- Check Firebase Console for service status

**Build fails**
```bash
npm run build
# Fix any TypeScript errors shown
```

## 📞 Support

For detailed help:
1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Check browser console for errors
4. Verify Firebase configuration

## ✅ Verification Checklist

Before deployment:
- [ ] All dependencies installed
- [ ] `.env` file configured
- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Dev server runs without errors
- [ ] All routes tested
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser compatible

## 🎉 Features Highlights

### Learning Platform
- 8+ programming language tutorials
- Interactive code examples
- Real-time code execution
- Progress tracking
- Bookmarking system

### Dashboard
- Personalized learning paths
- Progress analytics
- Achievement badges
- Resource library
- Study schedule

### AI Assistant
- Career guidance
- Code help and debugging
- Interview preparation
- Resume feedback
- Learning recommendations

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- Components are properly typed
- Tests pass before submitting
- Documentation is updated

## 🌟 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Firebase** - Backend infrastructure
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool
- **React** - UI library

---

## 📊 Project Status

✅ **Production Ready**
- All core features implemented
- No TypeScript errors
- Firebase integrated
- Responsive design
- Cross-browser compatible

**Current Version:** 1.0.0  
**Last Updated:** December 2024

---

**Built with ❤️ for learners worldwide**

## 🔗 Quick Links

- [Setup Guide](SETUP_GUIDE.md) - Get started in 5 minutes
- [Deployment Guide](DEPLOYMENT_CHECKLIST.md) - Deploy to production
- [Firebase Console](https://console.firebase.google.com/)
- [Lovable Project](https://lovable.dev/projects/92c532ab-c4c8-429c-92bf-2226a92d6201)
