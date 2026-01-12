// Script to seed questions to Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample questions - you can expand this
const sampleQuestions = [
  {
    id: 'html-easy-001',
    skill: 'html',
    difficulty: 'easy',
    type: 'multiple-choice',
    text: 'What does HTML stand for?',
    options: [
      'Hypertext Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink Text Management Language'
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for Hypertext Markup Language, which is the standard markup language for creating web pages.'
  },
  {
    id: 'html-easy-002',
    skill: 'html',
    difficulty: 'easy',
    type: 'multiple-choice',
    text: 'Which tag is used for the main heading?',
    options: ['<head>', '<h1>', '<title>', '<heading>'],
    correctAnswer: 1,
    explanation: 'The <h1> tag is used for the main heading in HTML.'
  },
  {
    id: 'css-easy-001',
    skill: 'css',
    difficulty: 'easy',
    type: 'multiple-choice',
    text: 'What does CSS stand for?',
    options: [
      'Cascading Style Sheets',
      'Creative Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets'
    ],
    correctAnswer: 0,
    explanation: 'CSS stands for Cascading Style Sheets, used for styling web pages.'
  },
  {
    id: 'css-easy-002',
    skill: 'css',
    difficulty: 'easy',
    type: 'multiple-choice',
    text: 'Which CSS property changes text color?',
    options: ['color', 'font-color', 'text-color', 'fgcolor'],
    correctAnswer: 0,
    explanation: 'The "color" property is used to change text color in CSS.'
  }
];

// Function to seed questions in batches
async function seedQuestions(questions) {
  try {
    const batchSize = 500; // Firestore batch limit
    const batches = [];
    
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchQuestions = questions.slice(i, i + batchSize);
      
      batchQuestions.forEach((question) => {
        const docRef = doc(collection(db, 'questions'));
        batch.set(docRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      batches.push(batch.commit());
    }
    
    await Promise.all(batches);
    console.log(`✅ Successfully seeded ${questions.length} questions to Firebase`);
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    throw error;
  }
}

// Function to seed from JSON file
async function seedFromJSON(filePath) {
  try {
    const fs = await import('fs/promises');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Handle both formats
    const questions = Array.isArray(data) ? data : data.questions || [];
    
    if (questions.length === 0) {
      console.log('⚠️  No questions found in JSON file');
      return;
    }
    
    await seedQuestions(questions);
  } catch (error) {
    console.error('❌ Error reading JSON file:', error);
    throw error;
  }
}

// Main execution
const main = async () => {
  console.log('🚀 Starting question seeding process...');
  
  // Check if JSON file path is provided as argument
  const jsonFilePath = process.argv[2];
  
  if (jsonFilePath) {
    console.log(`📁 Reading questions from: ${jsonFilePath}`);
    await seedFromJSON(jsonFilePath);
  } else {
    console.log('📝 Seeding sample questions...');
    await seedQuestions(sampleQuestions);
  }
  
  console.log('✨ Seeding complete!');
  process.exit(0);
};

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
