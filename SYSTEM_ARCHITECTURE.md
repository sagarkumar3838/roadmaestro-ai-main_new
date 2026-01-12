# Question Management System - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Question Management System                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   Content        │         │   Developers     │         │   End Users      │
│   Creators       │         │                  │         │                  │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         │                            │                            │
         ▼                            ▼                            ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  JSON Files     │         │  Admin UI       │         │  Quiz App       │
│  - Create       │         │  - Manage       │         │  - Take Tests   │
│  - Edit         │         │  - Import       │         │  - View Results │
│  - Version      │         │  - Export       │         │                 │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                            │
         │                           │                            │
         └───────────────┬───────────┴────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Question Service   │
              │   - CRUD Operations  │
              │   - Validation       │
              │   - Batch Upload     │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Firebase Firestore  │
              │  - questions/        │
              │  - categories/       │
              │  - userProgress/     │
              └──────────────────────┘
```

## Data Flow

### Creating Questions

```
1. Content Creator
   │
   ├─→ Generate Template
   │   └─→ generate-question-template.mjs
   │       └─→ questions/{skill}-{difficulty}.json
   │
   ├─→ Edit JSON File
   │   └─→ Add questions, options, answers
   │
   └─→ Upload to Firebase
       └─→ seed-questions-firebase.mjs
           └─→ QuestionService.addQuestionsBatch()
               └─→ Firebase Firestore
```

### Managing Questions (Admin UI)

```
1. Admin User
   │
   ├─→ Load Questions
   │   └─→ QuestionManager Component
   │       └─→ QuestionService.getQuestions()
   │           └─→ Firebase Firestore
   │
   ├─→ Edit Question
   │   └─→ QuestionManager Component
   │       └─→ QuestionService.updateQuestion()
   │           └─→ Firebase Firestore
   │
   ├─→ Export Questions
   │   └─→ QuestionManager Component
   │       └─→ QuestionService.exportQuestionsToJSON()
   │           └─→ Download JSON file
   │
   └─→ Import Questions
       └─→ QuestionManager Component
           └─→ parseQuestionJSON()
           └─→ validateQuestions()
           └─→ QuestionService.addQuestionsBatch()
               └─→ Firebase Firestore
```

### Taking a Quiz (End User)

```
1. End User
   │
   ├─→ Select Skill & Difficulty
   │   └─→ Quiz Component
   │
   ├─→ Load Questions
   │   └─→ QuestionService.getQuestions(skill, difficulty, 10)
   │       └─→ Firebase Firestore
   │       └─→ Returns 10 random questions
   │
   ├─→ Answer Questions
   │   └─→ Quiz Component
   │       └─→ Track answers
   │
   └─→ Submit & Score
       └─→ Calculate score
       └─→ Save to userProgress/
           └─→ Firebase Firestore
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │ QuestionManager  │         │  Quiz Component  │         │
│  │  (Admin UI)      │         │  (User UI)       │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                    │
│           └────────────┬───────────────┘                    │
│                        │                                    │
└────────────────────────┼────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                   Service Layer                              │
├────────────────────────┼────────────────────────────────────┤
│                        │                                    │
│  ┌─────────────────────▼──────────────────┐                │
│  │      QuestionService                   │                │
│  │  - addQuestion()                       │                │
│  │  - addQuestionsBatch()                 │                │
│  │  - getQuestions()                      │                │
│  │  - getQuestionsBySkill()               │                │
│  │  - updateQuestion()                    │                │
│  │  - deleteQuestion()                    │                │
│  │  - exportQuestionsToJSON()             │                │
│  │  - importQuestionsFromJSON()           │                │
│  └────────────────────┬───────────────────┘                │
│                       │                                     │
│  ┌────────────────────▼───────────────────┐                │
│  │      CategoryService                   │                │
│  │  - saveCategory()                      │                │
│  │  - getAllCategories()                  │                │
│  └────────────────────┬───────────────────┘                │
│                       │                                     │
└───────────────────────┼─────────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────────┐
│                  Utility Layer                               │
├───────────────────────┼─────────────────────────────────────┤
│                       │                                     │
│  ┌────────────────────▼───────────────────┐                │
│  │      questionConverter.ts              │                │
│  │  - convertToJSON()                     │                │
│  │  - parseQuestionJSON()                 │                │
│  │  - validateQuestion()                  │                │
│  │  - validateQuestions()                 │                │
│  │  - downloadJSON()                      │                │
│  │  - readJSONFile()                      │                │
│  └────────────────────┬───────────────────┘                │
│                       │                                     │
└───────────────────────┼─────────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────────┐
│                  Firebase Layer                              │
├───────────────────────┼─────────────────────────────────────┤
│                       │                                     │
│  ┌────────────────────▼───────────────────┐                │
│  │      Firebase Firestore                │                │
│  │                                         │                │
│  │  Collections:                           │                │
│  │  ├─ questions/                          │                │
│  │  │  └─ {questionId}/                    │                │
│  │  │     ├─ id                            │                │
│  │  │     ├─ skill                         │                │
│  │  │     ├─ difficulty                    │                │
│  │  │     ├─ type                          │                │
│  │  │     ├─ text                          │                │
│  │  │     ├─ options                       │                │
│  │  │     ├─ correctAnswer                 │                │
│  │  │     ├─ explanation                   │                │
│  │  │     ├─ createdAt                     │                │
│  │  │     └─ updatedAt                     │                │
│  │  │                                       │                │
│  │  ├─ categories/                         │                │
│  │  │  └─ {skill-difficulty}/              │                │
│  │  │     ├─ skill                         │                │
│  │  │     ├─ difficulty                    │                │
│  │  │     ├─ name                          │                │
│  │  │     ├─ description                   │                │
│  │  │     └─ totalQuestions                │                │
│  │  │                                       │                │
│  │  └─ userProgress/                       │                │
│  │     └─ {userId}/                        │                │
│  │        ├─ userId                        │                │
│  │        ├─ skills                        │                │
│  │        └─ oglCoursesUnlocked            │                │
│  │                                         │                │
│  └─────────────────────────────────────────┘                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## File Structure

```
project-root/
│
├── src/
│   ├── services/
│   │   └── questionService.ts          # Firebase operations
│   │       ├── QuestionService class
│   │       │   ├── addQuestion()
│   │       │   ├── addQuestionsBatch()
│   │       │   ├── getQuestions()
│   │       │   ├── getQuestionsBySkill()
│   │       │   ├── updateQuestion()
│   │       │   ├── deleteQuestion()
│   │       │   ├── getQuestionCount()
│   │       │   ├── exportQuestionsToJSON()
│   │       │   └── importQuestionsFromJSON()
│   │       │
│   │       └── CategoryService class
│   │           ├── saveCategory()
│   │           └── getAllCategories()
│   │
│   ├── utils/
│   │   └── questionConverter.ts        # JSON utilities
│   │       ├── convertToJSON()
│   │       ├── parseQuestionJSON()
│   │       ├── downloadJSON()
│   │       ├── readJSONFile()
│   │       ├── validateQuestion()
│   │       └── validateQuestions()
│   │
│   ├── components/
│   │   └── admin/
│   │       └── QuestionManager.tsx     # Admin UI
│   │           ├── Load questions
│   │           ├── Edit questions
│   │           ├── Delete questions
│   │           ├── Import from JSON
│   │           └── Export to JSON
│   │
│   ├── types/
│   │   └── question.ts                 # TypeScript types
│   │       ├── Question interface
│   │       ├── Skill type
│   │       ├── Difficulty type
│   │       ├── QuestionType type
│   │       └── TestResult interface
│   │
│   └── integrations/
│       └── firebase/
│           └── client.ts               # Firebase config
│
├── questions/                          # Question JSON files
│   ├── html-easy.json
│   ├── css-easy.json
│   ├── javascript-easy.json
│   └── README.md
│
├── scripts/
│   ├── seed-questions-firebase.mjs     # Upload script
│   └── generate-question-template.mjs  # Template generator
│
├── docs/
│   ├── README_QUESTIONS.md
│   ├── QUICK_START_QUESTIONS.md
│   ├── QUESTION_MANAGEMENT_GUIDE.md
│   ├── QUESTION_SYSTEM_SUMMARY.md
│   ├── QUESTIONS_INDEX.md
│   └── SYSTEM_ARCHITECTURE.md          # This file
│
├── questions-template.json             # Base template
├── firestore.rules.template            # Security rules
└── package.json                        # NPM scripts
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│           Frontend                      │
│  - React + TypeScript                   │
│  - Lucide React (icons)                 │
│  - Tailwind CSS (styling)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Backend Services              │
│  - Firebase Firestore (database)        │
│  - Firebase Auth (authentication)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Build Tools                   │
│  - Vite (bundler)                       │
│  - Node.js (scripts)                    │
│  - npm (package manager)                │
└─────────────────────────────────────────┘
```

## Security Model

```
┌──────────────────────────────────────────────────────────┐
│                    Firestore Rules                        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  questions/                                               │
│  ├─ read: public (anyone can read)                       │
│  └─ write: admin only                                    │
│                                                           │
│  categories/                                              │
│  ├─ read: public                                         │
│  └─ write: admin only                                    │
│                                                           │
│  userProgress/                                            │
│  ├─ read: owner only                                     │
│  ├─ write: owner only                                    │
│  └─ delete: admin only                                   │
│                                                           │
│  testResults/                                             │
│  ├─ read: owner only                                     │
│  ├─ create: owner only                                   │
│  ├─ update: none (immutable)                             │
│  └─ delete: admin only                                   │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## Workflow Diagrams

### Content Creation Workflow

```
Start
  │
  ▼
Generate Template
  │ (npm run generate:questions)
  ▼
Edit JSON File
  │ (Add questions, options, answers)
  ▼
Validate
  │ (Automatic during upload)
  ▼
Upload to Firebase
  │ (npm run seed:questions)
  ▼
Verify in Admin UI
  │ (Load and check questions)
  ▼
Test in Quiz App
  │ (Take a test)
  ▼
Export Backup
  │ (Export to JSON)
  ▼
Version Control
  │ (Commit to Git)
  ▼
End
```

### Question Lifecycle

```
Created
  │
  ├─→ Uploaded to Firebase
  │   └─→ Available for quizzes
  │
  ├─→ Used in Tests
  │   └─→ Analytics collected
  │
  ├─→ Updated
  │   └─→ Version tracked
  │
  ├─→ Exported
  │   └─→ Backup created
  │
  └─→ Deleted
      └─→ Removed from Firebase
```

## Integration Points

```
┌─────────────────────────────────────────────────────────┐
│                  Your Application                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Quiz Component                                          │
│  └─→ QuestionService.getQuestions()                     │
│      └─→ Display questions                              │
│      └─→ Collect answers                                │
│      └─→ Calculate score                                │
│                                                          │
│  Admin Panel                                             │
│  └─→ QuestionManager Component                          │
│      └─→ Manage all questions                           │
│                                                          │
│  User Progress                                           │
│  └─→ Track completed tests                              │
│  └─→ Store scores                                       │
│  └─→ Unlock content                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────┐
│                  Optimization Strategies                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Batch Operations                                     │
│     └─→ Upload up to 500 questions at once              │
│                                                          │
│  2. Query Optimization                                   │
│     └─→ Index on skill + difficulty                     │
│     └─→ Limit results (e.g., 10 questions)              │
│                                                          │
│  3. Caching                                              │
│     └─→ Cache frequently used questions                 │
│     └─→ Use React Query for client-side caching         │
│                                                          │
│  4. Lazy Loading                                         │
│     └─→ Load questions only when needed                 │
│     └─→ Paginate in admin UI                            │
│                                                          │
│  5. Validation                                           │
│     └─→ Validate before upload (client-side)            │
│     └─→ Prevent invalid data in database                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Scalability

The system is designed to scale:

- **Questions**: Supports thousands of questions per category
- **Users**: Firebase scales automatically
- **Concurrent Access**: Firestore handles multiple simultaneous users
- **Batch Operations**: Efficient bulk uploads (500 per batch)
- **Query Performance**: Indexed queries for fast retrieval

## Future Enhancements

Potential additions to the system:

1. **Question Analytics**
   - Track question difficulty based on user performance
   - Identify problematic questions
   - A/B testing for question variations

2. **Advanced Features**
   - Question tagging system
   - Multi-language support
   - Rich media support (images, videos)
   - Code execution for coding questions

3. **Admin Improvements**
   - Bulk editing
   - Question preview mode
   - Search and filter
   - Question versioning

4. **User Features**
   - Bookmarking questions
   - Reporting issues
   - Community contributions
   - Adaptive difficulty

---

This architecture provides a solid foundation for a scalable, maintainable question management system.
