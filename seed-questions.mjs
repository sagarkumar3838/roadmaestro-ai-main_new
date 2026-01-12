import { seedAllQuestionBanks } from './src/utils/seedQuestionBanks.ts';

async function run() {
  try {
    console.log('Starting to seed question banks to Firebase...');
    await seedAllQuestionBanks();
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding question banks:', error);
    process.exit(1);
  }
}

run();
