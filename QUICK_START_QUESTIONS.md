# Quick Start Guide - Question Management

## Setup (One-time)

1. **Ensure Firebase is configured** in your `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. **Install dependencies** (if not already done):
```bash
npm install
```

## Upload Questions to Firebase

### Method 1: Using the Seeding Script (Recommended)

Upload the template questions:
```bash
npm run seed:questions questions-template.json
```

Upload CSS questions:
```bash
npm run seed:questions questions/css-easy.json
```

Upload JavaScript questions:
```bash
npm run seed:questions questions/javascript-easy.json
```

Upload all at once:
```bash
npm run seed:questions questions-template.json
npm run seed:questions questions/css-easy.json
npm run seed:questions questions/javascript-easy.json
```

### Method 2: Using the Admin UI

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the Question Manager component (add to your admin routes)

3. Click "Import from JSON" and select your JSON file

## Create Your Own Questions

### Step 1: Copy the Template

```bash
cp questions-template.json questions/my-questions.json
```

### Step 2: Edit the JSON File

Open `questions/my-questions.json` and modify:

```json
{
  "metadata": {
    "skill": "html",           // Change to your skill
    "difficulty": "medium",    // Change difficulty
    "totalQuestions": 20,      // Update count
    "version": "1.0",
    "lastUpdated": "2025-12-05"
  },
  "questions": [
    {
      "id": "html-medium-001",  // Unique ID
      "skill": "html",
      "difficulty": "medium",
      "type": "multiple-choice",
      "text": "Your question here?",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": 0,       // Index of correct option
      "explanation": "Why this is correct"
    }
    // Add more questions...
  ]
}
```

### Step 3: Upload to Firebase

```bash
npm run seed:questions questions/my-questions.json
```

## Question Types

### Multiple Choice
```json
{
  "id": "unique-id",
  "skill": "html",
  "difficulty": "easy",
  "type": "multiple-choice",
  "text": "Question text?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "Explanation"
}
```

### Coding Question
```json
{
  "id": "unique-id",
  "skill": "javascript",
  "difficulty": "medium",
  "type": "coding",
  "text": "Write code to...",
  "correctAnswer": "function example() { return true; }",
  "explanation": "Explanation",
  "codeSnippet": "// Starter code"
}
```

### Fill in the Blanks
```json
{
  "id": "unique-id",
  "skill": "css",
  "difficulty": "easy",
  "type": "fill-blanks",
  "text": "The _____ property changes color.",
  "blanks": ["color"],
  "correctAnswer": "color",
  "explanation": "Explanation"
}
```

## Available Skills

- `html`
- `css`
- `javascript`
- `jquery`
- `devtools`

## Available Difficulties

- `easy`
- `medium`
- `hard`
- `advanced`

## Folder Structure

```
your-project/
├── questions/                    # Store your question JSON files here
│   ├── html-easy.json
│   ├── css-easy.json
│   ├── javascript-easy.json
│   └── ...
├── questions-template.json       # Template to copy
├── seed-questions-firebase.mjs   # Upload script
└── QUESTION_MANAGEMENT_GUIDE.md  # Full documentation
```

## Common Tasks

### Export Questions from Firebase

Use the admin UI:
1. Load questions for a skill/difficulty
2. Click "Export to JSON"
3. Save the downloaded file

### Update Existing Questions

1. Export questions to JSON
2. Edit the JSON file
3. Delete old questions from Firebase (via UI)
4. Re-upload the edited JSON

### Add Questions to Existing Category

1. Export existing questions
2. Add new questions to the JSON array
3. Re-upload (duplicates will be created, so use unique IDs)

### Check Question Count

In your code:
```typescript
import { QuestionService } from './services/questionService';

const count = await QuestionService.getQuestionCount('html', 'easy');
console.log(`HTML Easy questions: ${count}`);
```

## Tips

1. **Unique IDs**: Always use format `{skill}-{difficulty}-{number}`
   - Good: `html-easy-001`, `css-medium-042`
   - Bad: `question1`, `test`, `q1`

2. **Batch Upload**: Upload multiple files at once:
```bash
npm run seed:questions questions/html-easy.json && \
npm run seed:questions questions/css-easy.json && \
npm run seed:questions questions/js-easy.json
```

3. **Validation**: Questions are automatically validated before upload

4. **Backup**: Keep your JSON files in version control

5. **Testing**: Test questions in the app before deploying to production

## Troubleshooting

### "Firebase not configured"
- Check your `.env` file has all Firebase variables
- Restart your dev server after changing `.env`

### "Permission denied"
- Check Firestore security rules
- Ensure you're authenticated (if required)

### "Validation failed"
- Check all required fields are present
- Verify question IDs are unique
- Ensure correctAnswer index is valid

### Questions not appearing
- Check the skill and difficulty match
- Verify upload was successful (check console)
- Check Firebase console for the data

## Next Steps

1. Create questions for all your categories
2. Set up the admin UI in your app
3. Test the question flow in your application
4. Export questions regularly as backups

For detailed documentation, see `QUESTION_MANAGEMENT_GUIDE.md`
