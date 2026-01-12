#!/usr/bin/env node

/**
 * Question Template Generator
 * 
 * Usage:
 *   node generate-question-template.mjs <skill> <difficulty> <count>
 * 
 * Example:
 *   node generate-question-template.mjs html medium 20
 */

import fs from 'fs/promises';
import path from 'path';

const skills = ['html', 'css', 'javascript', 'jquery', 'devtools'];
const difficulties = ['easy', 'medium', 'hard', 'advanced'];
const questionTypes = ['multiple-choice', 'coding', 'fill-blanks'];

// Parse command line arguments
const [,, skill, difficulty, count = 10] = process.argv;

// Validate inputs
if (!skill || !skills.includes(skill)) {
  console.error(`❌ Invalid skill. Must be one of: ${skills.join(', ')}`);
  process.exit(1);
}

if (!difficulty || !difficulties.includes(difficulty)) {
  console.error(`❌ Invalid difficulty. Must be one of: ${difficulties.join(', ')}`);
  process.exit(1);
}

const questionCount = parseInt(count);
if (isNaN(questionCount) || questionCount < 1) {
  console.error('❌ Count must be a positive number');
  process.exit(1);
}

// Generate question template
const generateQuestion = (index, type = 'multiple-choice') => {
  const id = `${skill}-${difficulty}-${String(index).padStart(3, '0')}`;
  
  const baseQuestion = {
    id,
    skill,
    difficulty,
    type,
    text: `[Question ${index}] Your question text here?`,
    explanation: 'Explanation of the correct answer'
  };

  switch (type) {
    case 'multiple-choice':
      return {
        ...baseQuestion,
        options: [
          'Option A - Correct answer',
          'Option B - Incorrect',
          'Option C - Incorrect',
          'Option D - Incorrect'
        ],
        correctAnswer: 0
      };
    
    case 'coding':
      return {
        ...baseQuestion,
        correctAnswer: '// Your expected code solution here',
        codeSnippet: '// Starter code for the student'
      };
    
    case 'fill-blanks':
      return {
        ...baseQuestion,
        text: `[Question ${index}] The _____ is used for...`,
        blanks: ['answer'],
        correctAnswer: 'answer'
      };
    
    default:
      return baseQuestion;
  }
};

// Generate questions array
const questions = [];
for (let i = 1; i <= questionCount; i++) {
  // Mix question types (80% MCQ, 10% coding, 10% fill-blanks)
  let type = 'multiple-choice';
  if (i % 10 === 0) type = 'fill-blanks';
  else if (i % 10 === 5) type = 'coding';
  
  questions.push(generateQuestion(i, type));
}

// Create the complete JSON structure
const template = {
  metadata: {
    skill,
    difficulty,
    totalQuestions: questionCount,
    version: '1.0',
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  questions
};

// Create output filename
const outputDir = 'questions';
const outputFile = path.join(outputDir, `${skill}-${difficulty}.json`);

// Ensure output directory exists
try {
  await fs.mkdir(outputDir, { recursive: true });
} catch (error) {
  // Directory might already exist
}

// Write the file
try {
  await fs.writeFile(
    outputFile,
    JSON.stringify(template, null, 2),
    'utf-8'
  );
  
  console.log('✅ Question template generated successfully!');
  console.log(`📁 File: ${outputFile}`);
  console.log(`📊 Questions: ${questionCount}`);
  console.log(`🎯 Skill: ${skill}`);
  console.log(`📈 Difficulty: ${difficulty}`);
  console.log('');
  console.log('Next steps:');
  console.log(`1. Edit ${outputFile} and fill in your questions`);
  console.log(`2. Upload to Firebase: npm run seed:questions ${outputFile}`);
  console.log('');
  console.log('Question type distribution:');
  console.log(`  - Multiple Choice: ${questions.filter(q => q.type === 'multiple-choice').length}`);
  console.log(`  - Coding: ${questions.filter(q => q.type === 'coding').length}`);
  console.log(`  - Fill Blanks: ${questions.filter(q => q.type === 'fill-blanks').length}`);
} catch (error) {
  console.error('❌ Error writing file:', error.message);
  process.exit(1);
}

// Generate a summary file
const summaryFile = path.join(outputDir, 'README.md');
const summaryExists = await fs.access(summaryFile).then(() => true).catch(() => false);

if (!summaryExists) {
  const summary = `# Questions Directory

This directory contains question JSON files organized by skill and difficulty.

## Files

- Each file follows the format: \`{skill}-{difficulty}.json\`
- Edit these files to add your questions
- Upload to Firebase using: \`npm run seed:questions questions/{filename}.json\`

## Available Skills

${skills.map(s => `- ${s}`).join('\n')}

## Available Difficulties

${difficulties.map(d => `- ${d}`).join('\n')}

## Question Types

- **multiple-choice**: Traditional MCQ with 4 options
- **coding**: Code writing questions
- **fill-blanks**: Text completion questions

## Creating New Questions

1. Generate template:
   \`\`\`bash
   node generate-question-template.mjs <skill> <difficulty> <count>
   \`\`\`

2. Edit the generated file

3. Upload to Firebase:
   \`\`\`bash
   npm run seed:questions questions/<filename>.json
   \`\`\`

## Example

\`\`\`bash
# Generate 50 HTML medium questions
node generate-question-template.mjs html medium 50

# Edit the file
# questions/html-medium.json

# Upload to Firebase
npm run seed:questions questions/html-medium.json
\`\`\`
`;

  await fs.writeFile(summaryFile, summary, 'utf-8');
  console.log(`📝 Created ${summaryFile}`);
}
