#!/usr/bin/env ts-node

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { generateQuestionBankJSON } from '../src/utils/questionBankSeedData';
import { QuestionBank } from '../src/services/evaluationService';

// Firebase config - you'll need to set these in your .env
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

async function seedAllQuestionBanks() {
  console.log('🔄 Starting to seed all question banks to Firebase...');

  try {
    const allQuestionBanks = generateQuestionBankJSON();
    const skills = Object.keys(allQuestionBanks) as (keyof typeof allQuestionBanks)[];

    console.log(`📋 Seeding questions for skills: ${skills.join(', ')}`);

    for (const skill of skills) {
      const questionBank = allQuestionBanks[skill];

      if (questionBank && (questionBank.easy.length > 0 || questionBank.medium.length > 0 ||
          questionBank.hard.length > 0 || questionBank.advanced.length > 0)) {

        console.log(`\n📝 Seeding ${skill} question bank...`);
        console.log(`   Easy: ${questionBank.easy.length} questions`);
        console.log(`   Medium: ${questionBank.medium.length} questions`);
        console.log(`   Hard: ${questionBank.hard.length} questions`);
        console.log(`   Advanced: ${questionBank.advanced.length} questions`);

        const totalQuestions = questionBank.easy.length + questionBank.medium.length +
                              questionBank.hard.length + questionBank.advanced.length;
        console.log(`   Total: ${totalQuestions} questions`);

        // Save to Firebase
        const docRef = doc(db, 'questionBank', skill);
        await setDoc(docRef, questionBank);

        console.log(`✅ Successfully seeded ${skill} question bank`);
      } else {
        console.log(`⚠️  Skipping ${skill} - no questions found`);
      }
    }

    console.log('\n🎉 All question banks have been seeded to Firebase!');
    console.log('📍 Location: Firebase Firestore -> questionBank collection');
    console.log('📊 Each skill has its own document with easy/medium/hard/advanced question arrays');

  } catch (error) {
    console.error('❌ Error seeding question banks:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Firebase configuration in .env');
    console.log('2. Ensure Firebase project exists and Firestore is enabled');
    console.log('3. Verify your Firebase security rules allow writes');
    process.exit(1);
  }

  process.exit(0);
}

// Run the seeder
seedAllQuestionBanks();
