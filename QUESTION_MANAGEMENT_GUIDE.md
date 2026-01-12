# Question Management System Guide

This guide explains how to manage questions in Firebase and work with JSON format for easy question management.

## Overview

The question management system allows you to:
- Store questions in Firebase Firestore
- Export questions to JSON format
- Import questions from JSON files
- Add, edit, and delete questions
- Organize questions by skill and difficulty
- Validate question structure

## File Structure

```
src/
├── services/
│   └── questionService.ts       # Firebase CRUD operations
├── utils/
│   └── questionConverter.ts     # JSON conversion utilities
├── components/
│   └── admin/
│       └── QuestionManager.tsx  # Admin UI for managing questions
└── types/
    └── question.ts              # TypeScript types

seed-questions-firebase.mjs      # Script to seed questions
questions-template.json          # Template for creating questions
```

## Question JSON Format

### Basic Structure

```json
{
  "metadata": {
    "skill": "html",
    "difficulty": "easy",
    "totalQuestions": 10,
    "version": "1.0",
    "lastUpdated": "2025-12-05"
  },
  "questions": [
    {
      "id": "html-easy-001",
      "skill": "html",
      "difficulty": "easy",
      "type": "multiple-choice",
      "text": "What does HTML stand for?",
      "options": [
        "Hypertext Markup Language",
        "High Tech Modern Language"
      ],
      "correctAnswer": 0,
      "explanation": "HTML stands for Hypertext Markup Language"
    }
  ]
}
```

### Question Types

#### 1. Multiple Choice
```json
{
  "id": "unique-id",
  "skill": "html",
  "difficulty": "easy",
  "type": "multiple-choice",
  "text": "Question text here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "explanation": "Explanation here"
}
```

#### 2. Coding Question
```json
{
  "id": "unique-id",
  "skill": "javascript",
  "difficulty": "medium",
  "type": "coding",
  "text": "Write a function to reverse a string",
  "correctAnswer": "function reverse(str) { return str.split('').reverse().join(''); }",
  "explanation": "Use split, reverse, and join methods",
  "codeSnippet": "// Your code here"
}
```

#### 3. Fill in the Blanks
```json
{
  "id": "unique-id",
  "skill": "css",
  "difficulty": "easy",
  "type": "fill-blanks",
  "text": "The _____ property is used to change text color.",
  "blanks": ["color"],
  "correctAnswer": "color",
  "explanation": "The 'color' property changes text color in CSS"
}
```

## Using the Question Manager UI

### 1. Access the Admin Panel

Navigate to the Question Manager component in your admin panel:

```tsx
import { QuestionManager } from './components/admin/QuestionManager';

// In your admin route
<Route path="/admin/questions" element={<QuestionManager />} />
```

### 2. Load Questions

1. Select a skill (HTML, CSS, JavaScript, etc.)
2. Select a difficulty level (Easy, Medium, Hard, Advanced)
3. Click "Load Questions"

### 3. Export Questions

1. Load questions for a specific skill/difficulty
2. Click "Export to JSON"
3. File will be downloaded as `{skill}-{difficulty}-questions.json`

### 4. Import Questions

1. Prepare your JSON file following the template
2. Click "Import from JSON"
3. Select your JSON file
4. Questions will be validated and uploaded to Firebase

### 5. Edit Questions

1. Click the edit icon on any question
2. Modify the text or options
3. Click "Save" to update in Firebase

### 6. Delete Questions

1. Click the delete icon on any question
2. Confirm deletion
3. Question will be removed from Firebase

## Using the Seeding Script

### Install Dependencies

```bash
npm install firebase dotenv
```

### Seed Sample Questions

```bash
node seed-questions-firebase.mjs
```

### Seed from JSON File

```bash
node seed-questions-firebase.mjs path/to/questions.json
```

### Example: Seed HTML Easy Questions

```bash
node seed-questions-firebase.mjs questions-template.json
```

## Programmatic Usage

### Add Questions via Code

```typescript
import { QuestionService } from './services/questionService';

// Add single question
const question: Question = {
  id: 'html-easy-001',
  skill: 'html',
  difficulty: 'easy',
  type: 'multiple-choice',
  text: 'What does HTML stand for?',
  options: ['Hypertext Markup Language', 'Other options...'],
  correctAnswer: 0
};

await QuestionService.addQuestion(question);

// Add multiple questions
const questions: Question[] = [...];
await QuestionService.addQuestionsBatch(questions);
```

### Get Questions

```typescript
// Get 10 random questions for HTML Easy
const questions = await QuestionService.getQuestions('html', 'easy', 10);

// Get all questions for a skill
const allHtmlQuestions = await QuestionService.getQuestionsBySkill('html');

// Get question count
const count = await QuestionService.getQuestionCount('html', 'easy');
```

### Export/Import

```typescript
import { QuestionService } from './services/questionService';

// Export to JSON string
const jsonString = await QuestionService.exportQuestionsToJSON('html');

// Import from JSON string
const count = await QuestionService.importQuestionsFromJSON(jsonString);
```

## Creating Questions for Different Categories

### Step 1: Create JSON File

Create a new JSON file for your category (e.g., `javascript-medium-questions.json`):

```json
{
  "metadata": {
    "skill": "javascript",
    "difficulty": "medium",
    "totalQuestions": 50,
    "version": "1.0",
    "lastUpdated": "2025-12-05"
  },
  "questions": [
    // Your questions here
  ]
}
```

### Step 2: Add Questions

Follow the question format for your question type (multiple-choice, coding, fill-blanks).

### Step 3: Validate

Use the validation utility:

```typescript
import { validateQuestions, parseQuestionJSON } from './utils/questionConverter';

const questions = parseQuestionJSON(jsonString);
const validation = validateQuestions(questions);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
```

### Step 4: Upload

Either use the UI or the seeding script:

```bash
node seed-questions-firebase.mjs javascript-medium-questions.json
```

## Firebase Structure

### Collections

```
questions/
├── {questionId}/
│   ├── id: string
│   ├── skill: string
│   ├── difficulty: string
│   ├── type: string
│   ├── text: string
│   ├── options: array
│   ├── correctAnswer: number|string
│   ├── explanation: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

categories/
├── {skill-difficulty}/
│   ├── skill: string
│   ├── difficulty: string
│   ├── name: string
│   ├── description: string
│   ├── totalQuestions: number
│   └── passingScore: number
```

## Best Practices

1. **Unique IDs**: Use format `{skill}-{difficulty}-{number}` (e.g., `html-easy-001`)

2. **Validation**: Always validate questions before uploading

3. **Batch Operations**: Use batch operations for multiple questions (max 500 per batch)

4. **Backup**: Export questions regularly as JSON backups

5. **Version Control**: Keep JSON files in version control

6. **Testing**: Test questions in the UI before deploying

7. **Explanations**: Always provide explanations for learning purposes

## Troubleshooting

### Import Fails

- Check JSON format matches template
- Ensure all required fields are present
- Validate question IDs are unique
- Check Firebase permissions

### Questions Not Loading

- Verify Firebase configuration
- Check Firestore rules
- Ensure indexes are created
- Check network connectivity

### Batch Upload Limits

- Firebase has a 500 document limit per batch
- The script automatically handles batching
- For large imports, split into multiple files

## Example Workflow

1. **Create questions** in `questions-template.json`
2. **Validate** using the validation utility
3. **Upload** using the seeding script or UI
4. **Test** in the application
5. **Export** as backup
6. **Version control** the JSON file

## Adding New Skills

To add a new skill category:

1. Update `src/types/question.ts`:
```typescript
export type Skill = 'html' | 'css' | 'jquery' | 'devtools' | 'javascript' | 'your-new-skill';
```

2. Create JSON file with questions

3. Upload using the seeding script

4. Update UI to include new skill option

## Support

For issues or questions:
- Check Firebase console for errors
- Review browser console for client-side errors
- Verify Firestore rules allow read/write
- Check question format matches types
