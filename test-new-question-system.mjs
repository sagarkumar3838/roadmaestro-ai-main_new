#!/usr/bin/env node

/**
 * Test script for the new JSON-based question system
 * 
 * Usage: node test-new-question-system.mjs
 */

import fs from 'fs/promises';
import path from 'path';

const testQuestionSystem = async () => {
  console.log('🧪 Testing New Question System...\n');

  // Test 1: Check if JSON files exist
  console.log('📁 Checking JSON question files...');
  const questionFiles = [
    'src/data/questions/html-easy.json',
    'src/data/questions/html-medium.json',
    'src/data/questions/css-easy.json',
    'src/data/questions/javascript-easy.json',
    'src/data/questions/jquery-easy.json',
    'src/data/questions/devtools-easy.json'
  ];

  let totalQuestions = 0;
  const results = [];

  for (const file of questionFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const data = JSON.parse(content);
      const questionCount = data.questions.length;
      totalQuestions += questionCount;
      
      results.push({
        file: file.split('/').pop(),
        skill: data.skill,
        difficulty: data.difficulty,
        count: questionCount,
        status: '✅'
      });
    } catch (error) {
      results.push({
        file: file.split('/').pop(),
        status: '❌',
        error: error.message
      });
    }
  }

  // Display results
  console.log('\n📊 Question File Status:');
  console.log('┌─────────────────────────┬───────┬────────────┬───────┬────────┐');
  console.log('│ File                    │ Skill │ Difficulty │ Count │ Status │');
  console.log('├─────────────────────────┼───────┼────────────┼───────┼────────┤');
  
  results.forEach(result => {
    if (result.status === '✅') {
      const file = result.file.padEnd(23);
      const skill = result.skill.padEnd(5);
      const difficulty = result.difficulty.padEnd(10);
      const count = result.count.toString().padEnd(5);
      console.log(`│ ${file} │ ${skill} │ ${difficulty} │ ${count} │ ${result.status}    │`);
    } else {
      const file = result.file.padEnd(23);
      console.log(`│ ${file} │ ERROR │ ${result.error.slice(0, 20).padEnd(20)} │ ${result.status}    │`);
    }
  });
  
  console.log('└─────────────────────────┴───────┴────────────┴───────┴────────┘');
  console.log(`\n📈 Total Questions Available: ${totalQuestions}`);

  // Test 2: Validate question structure
  console.log('\n🔍 Validating Question Structure...');
  let validQuestions = 0;
  let invalidQuestions = 0;

  for (const result of results) {
    if (result.status === '✅') {
      try {
        const file = questionFiles.find(f => f.endsWith(result.file));
        const content = await fs.readFile(file, 'utf-8');
        const data = JSON.parse(content);
        
        data.questions.forEach((q, index) => {
          const requiredFields = ['id', 'text', 'options', 'correctAnswer', 'topic', 'explanation'];
          const hasAllFields = requiredFields.every(field => q.hasOwnProperty(field));
          
          if (hasAllFields && Array.isArray(q.options) && q.options.length === 4) {
            validQuestions++;
          } else {
            invalidQuestions++;
            console.log(`❌ Invalid question in ${result.file} at index ${index}: Missing fields or invalid structure`);
          }
        });
      } catch (error) {
        console.log(`❌ Error validating ${result.file}: ${error.message}`);
      }
    }
  }

  console.log(`✅ Valid Questions: ${validQuestions}`);
  console.log(`❌ Invalid Questions: ${invalidQuestions}`);

  // Test 3: Check for unique question IDs
  console.log('\n🔑 Checking Question ID Uniqueness...');
  const allIds = new Set();
  const duplicateIds = new Set();

  for (const result of results) {
    if (result.status === '✅') {
      try {
        const file = questionFiles.find(f => f.endsWith(result.file));
        const content = await fs.readFile(file, 'utf-8');
        const data = JSON.parse(content);
        
        data.questions.forEach(q => {
          if (allIds.has(q.id)) {
            duplicateIds.add(q.id);
          } else {
            allIds.add(q.id);
          }
        });
      } catch (error) {
        // Already handled above
      }
    }
  }

  if (duplicateIds.size === 0) {
    console.log('✅ All question IDs are unique');
  } else {
    console.log(`❌ Found ${duplicateIds.size} duplicate IDs:`);
    duplicateIds.forEach(id => console.log(`   - ${id}`));
  }

  // Test 4: Check topic coverage
  console.log('\n📚 Topic Coverage Analysis...');
  const topicsBySkill = {};

  for (const result of results) {
    if (result.status === '✅') {
      try {
        const file = questionFiles.find(f => f.endsWith(result.file));
        const content = await fs.readFile(file, 'utf-8');
        const data = JSON.parse(content);
        
        if (!topicsBySkill[data.skill]) {
          topicsBySkill[data.skill] = new Set();
        }
        
        data.questions.forEach(q => {
          if (q.topic) {
            topicsBySkill[data.skill].add(q.topic);
          }
        });
      } catch (error) {
        // Already handled above
      }
    }
  }

  Object.entries(topicsBySkill).forEach(([skill, topics]) => {
    console.log(`${skill.toUpperCase()}: ${topics.size} unique topics`);
    Array.from(topics).forEach(topic => {
      console.log(`   - ${topic}`);
    });
  });

  // Summary
  console.log('\n🎉 Test Summary:');
  console.log(`📁 Files checked: ${questionFiles.length}`);
  console.log(`✅ Files valid: ${results.filter(r => r.status === '✅').length}`);
  console.log(`❌ Files invalid: ${results.filter(r => r.status === '❌').length}`);
  console.log(`📊 Total questions: ${totalQuestions}`);
  console.log(`🔑 Unique IDs: ${duplicateIds.size === 0 ? 'Yes' : 'No'}`);
  console.log(`📚 Skills covered: ${Object.keys(topicsBySkill).length}`);

  if (results.every(r => r.status === '✅') && duplicateIds.size === 0 && invalidQuestions === 0) {
    console.log('\n🎊 All tests passed! The question system is ready to use.');
  } else {
    console.log('\n⚠️  Some issues found. Please review the results above.');
  }
};

// Run the test
testQuestionSystem().catch(console.error);