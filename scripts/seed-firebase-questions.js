// Simple Node.js script to seed Firebase with question banks
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require(path.join(__dirname, '../path-to-service-account.json')); // You'll need to add your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'your-database-url' // From Firebase console
});

const db = admin.firestore();

// Question data for each skill and difficulty
const skills = ['html', 'css', 'javascript', 'jquery', 'devtools'];
const difficulties = ['easy', 'medium', 'hard', 'advanced'];

async function seedQuestionBanks() {
  console.log('Starting to seed question banks...');

  for (const skill of skills) {
    console.log(`Seeding questions for ${skill}...`);

    const questionBank = {};

    // Generate questions for each difficulty
    for (const difficulty of difficulties) {
      questionBank[difficulty] = generateQuestionsForSkill(skill, difficulty, 10);
    }

    // Save to Firebase
    await db.collection('questionBank').doc(skill).set(questionBank);
    console.log(`✅ Seeded ${skill} question bank`);
  }

  console.log('All question banks seeded successfully!');
}

function generateQuestionsForSkill(skill, difficulty, count) {
  // Import your question generation logic here
  // This is a placeholder - you'll need to adapt your existing question generators
  return Array.from({ length: count }, (_, i) => ({
    id: `${skill}-${difficulty}-${i}`,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: `Sample question ${i + 1} for ${skill} (${difficulty})`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: Math.floor(Math.random() * 4)
  }));
}

// Run the seeder
seedQuestionBanks()
  .then(() => {
    console.log('Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding question banks:', error);
    process.exit(1);
  });
