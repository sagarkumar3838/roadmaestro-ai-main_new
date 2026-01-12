# Question Management System

A complete Firebase-based question management system with JSON import/export capabilities for quiz applications.

## 🚀 Quick Start

### 1. Upload Sample Questions
```bash
npm run seed:questions questions-template.json
```

### 2. Add Admin UI to Your App
```tsx
import { QuestionManager } from './components/admin/QuestionManager';

<Route path="/admin/questions" element={<QuestionManager />} />
```

### 3. Start Managing Questions
Visit `/admin/questions` in your app to manage questions via the UI.

## 📁 What's Included

### Services & Utilities
- **QuestionService** - Firebase CRUD operations
- **CategoryService** - Category management
- **Question Converter** - JSON import/export utilities
- **Validation** - Question structure validation

### UI Components
- **QuestionManager** - Full-featured admin interface
  - Load questions by skill/difficulty
  - Edit questions inline
  - Delete questions
  - Import from JSON
  - Export to JSON

### Sample Data
- HTML questions (easy)
- CSS questions (easy)
- JavaScript questions (easy)
- Template for creating more

### Scripts
- Seeding script for bulk uploads
- Validation utilities
- Export/import helpers

## 📝 Creating Questions

### Method 1: JSON Files (Recommended)

1. **Copy the template**:
```bash
cp questions-template.json questions/my-questions.json
```

2. **Edit your questions**:
```json
{
  "metadata": {
    "skill": "html",
    "difficulty": "medium",
    "totalQuestions": 20,
    "version": "1.0",
    "lastUpdated": "2025-12-05"
  },
  "questions": [
    {
      "id": "html-medium-001",
      "skill": "html",
      "difficulty": "medium",
      "type": "multiple-choice",
      "text": "Your question here?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Why this is correct"
    }
  ]
}
```

3. **Upload to Firebase**:
```bash
npm run seed:questions questions/my-questions.json
```

### Method 2: Admin UI

1. Navigate to `/admin/questions`
2. Click "Import from JSON"
3. Select your JSON file
4. Questions are validated and uploaded

## 🎯 Question Types

### Multiple Choice
```json
{
  "type": "multiple-choice",
  "text": "Question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0
}
```

### Coding
```json
{
  "type": "coding",
  "text": "Write code to...",
  "correctAnswer": "function example() {}",
  "codeSnippet": "// Starter code"
}
```

### Fill in the Blanks
```json
{
  "type": "fill-blanks",
  "text": "The _____ property...",
  "blanks": ["answer"],
  "correctAnswer": "answer"
}
```

## 🔧 API Usage

### Import the Service
```typescript
import { QuestionService } from './services/questionService';
```

### Add Questions
```typescript
// Single question
await QuestionService.addQuestion(question);

// Multiple questions (batch)
await QuestionService.addQuestionsBatch(questions);
```

### Get Questions
```typescript
// Get 10 random questions for HTML Easy
const questions = await QuestionService.getQuestions('html', 'easy', 10);

// Get all questions for a skill
const allHtml = await QuestionService.getQuestionsBySkill('html');

// Get question count
const count = await QuestionService.getQuestionCount('html', 'easy');
```

### Export/Import
```typescript
// Export to JSON string
const json = await QuestionService.exportQuestionsToJSON('html');

// Import from JSON string
const count = await QuestionService.importQuestionsFromJSON(jsonString);
```

### Update/Delete
```typescript
// Update a question
await QuestionService.updateQuestion(questionId, { text: 'New text' });

// Delete a question
await QuestionService.deleteQuestion(questionId);
```

## 📊 Categories

### Skills
- `html` - HTML questions
- `css` - CSS questions
- `javascript` - JavaScript questions
- `jquery` - jQuery questions
- `devtools` - Developer Tools questions

### Difficulty Levels
- `easy` - Beginner level
- `medium` - Intermediate level
- `hard` - Advanced level
- `advanced` - Expert level

## 🔒 Security

### Firestore Rules

Copy the template rules to your Firebase project:

```bash
# Copy template
cp firestore.rules.template firestore.rules

# Deploy to Firebase
firebase deploy --only firestore:rules
```

The template includes:
- Public read access for questions
- Admin-only write access
- User-specific progress tracking
- Secure test results

## 📚 Documentation

- **QUICK_START_QUESTIONS.md** - Get started in 5 minutes
- **QUESTION_MANAGEMENT_GUIDE.md** - Complete documentation
- **QUESTION_SYSTEM_SUMMARY.md** - System overview
- **README_QUESTIONS.md** - This file

## 🛠️ Commands

```bash
# Upload questions from JSON
npm run seed:questions <file>

# Examples
npm run seed:questions questions-template.json
npm run seed:questions questions/css-easy.json
npm run seed:questions questions/javascript-easy.json

# Development
npm run dev

# Build
npm run build
```

## 📦 File Structure

```
your-project/
├── src/
│   ├── services/
│   │   └── questionService.ts       # Firebase operations
│   ├── utils/
│   │   └── questionConverter.ts     # JSON utilities
│   ├── components/
│   │   └── admin/
│   │       └── QuestionManager.tsx  # Admin UI
│   └── types/
│       └── question.ts              # TypeScript types
├── questions/
│   ├── html-easy.json               # Sample questions
│   ├── css-easy.json
│   └── javascript-easy.json
├── seed-questions-firebase.mjs      # Upload script
├── questions-template.json          # Template
├── firestore.rules.template         # Security rules
└── docs/
    ├── QUICK_START_QUESTIONS.md
    ├── QUESTION_MANAGEMENT_GUIDE.md
    └── QUESTION_SYSTEM_SUMMARY.md
```

## ✨ Features

- ✅ Firebase Firestore integration
- ✅ JSON import/export
- ✅ Multiple question types
- ✅ Batch operations (up to 500 questions)
- ✅ Automatic validation
- ✅ Admin UI for management
- ✅ Category organization
- ✅ Real-time updates
- ✅ TypeScript support
- ✅ Security rules template

## 🎓 Example Workflow

### For Content Creators

1. Copy template: `cp questions-template.json questions/new-category.json`
2. Edit questions in your favorite editor
3. Upload: `npm run seed:questions questions/new-category.json`
4. Test in your application
5. Export for backup via admin UI

### For Developers

```typescript
// In your quiz component
import { QuestionService } from './services/questionService';

const startQuiz = async (skill: Skill, difficulty: Difficulty) => {
  // Get 10 random questions
  const questions = await QuestionService.getQuestions(skill, difficulty, 10);
  
  // Start the quiz with these questions
  setQuizQuestions(questions);
};
```

## 🐛 Troubleshooting

### Questions not uploading
- Check Firebase config in `.env`
- Verify Firestore rules allow writes
- Check console for errors

### Validation errors
- Ensure all required fields are present
- Verify question IDs are unique
- Check correctAnswer index is valid

### Questions not loading
- Check skill and difficulty match
- Verify Firebase connection
- Check browser console for errors

## 💡 Tips

1. **Unique IDs**: Use format `{skill}-{difficulty}-{number}`
   - ✅ Good: `html-easy-001`, `css-medium-042`
   - ❌ Bad: `question1`, `test`, `q1`

2. **Explanations**: Always include explanations for learning

3. **Version Control**: Keep JSON files in Git

4. **Backups**: Export questions regularly

5. **Testing**: Test questions before production

6. **Batch Upload**: Upload multiple files at once:
```bash
npm run seed:questions questions/html-easy.json && \
npm run seed:questions questions/css-easy.json && \
npm run seed:questions questions/js-easy.json
```

## 🚀 Next Steps

1. Create questions for all your categories
2. Customize the admin UI to match your design
3. Set up Firestore security rules
4. Add question analytics
5. Implement question search
6. Add bulk edit features
7. Create question preview mode

## 📄 License

This question management system is part of your project and follows your project's license.

## 🤝 Contributing

To add more questions:
1. Create a JSON file following the template
2. Validate the structure
3. Upload via script or UI
4. Test in the application
5. Submit for review (if applicable)

---

**Ready to manage your questions!** 🎉

Start with the quick start guide and refer to the full documentation as needed.
