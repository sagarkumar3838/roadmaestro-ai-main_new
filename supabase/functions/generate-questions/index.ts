import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables not set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface GeneratedQuestion {
  id: string;
  text: string;
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Interfaces for request and response types (for TypeScript or documentation purposes)
/**
 * @typedef {Object} QuestionRequest
 * @property {string} category
 * @property {'beginner' | 'intermediate' | 'advanced'} difficulty
 * @property {string[]} usedQuestionIds
 * @property {number} count
 * @property {string} sessionId
 */

/**
 * @typedef {Object} GeneratedQuestion
 * @property {string} id
 * @property {string} text
 * @property {'multiple-choice'} type
 * @property {string[]} options
 * @property {number} correctAnswer
 * @property {string} category
 * @property {'beginner' | 'intermediate' | 'advanced'} difficulty
 */

// Route to handle question generation
app.post('/', async (req, res) => {
  try {
    const { category, difficulty, usedQuestionIds, count, sessionId } = req.body;

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    // Generate diversity prompt
    const diversityPrompts = [
      "Focus on real-world scenarios and practical applications",
      "Include edge cases and advanced problem-solving situations",
      "Cover both theoretical concepts and hands-on implementation",
      "Include industry best practices and common pitfalls",
      "Focus on debugging, optimization, and performance considerations",
      "Cover security, scalability, and maintainability aspects",
      "Include modern tools, frameworks, and emerging technologies",
      "Focus on integration patterns and system design concepts"
    ];
    const selectedDiversityPrompt = diversityPrompts[Math.floor(Math.random() * diversityPrompts.length)];
    const questionVariations = Math.floor(Math.random() * 5) + 1;

    const prompt = `Generate ${count} completely unique and diverse multiple-choice questions for ${category} at ${difficulty} level.

CRITICAL UNIQUENESS REQUIREMENTS - TARGET: 10,000+ UNIQUE QUESTIONS:
- Each question MUST be completely different from any previously generated questions
- Session ID: ${sessionId} | Used questions: ${usedQuestionIds.length}
- ${selectedDiversityPrompt}
- Use extremely varied question formats...
Return ONLY a JSON array with the exact structure:
[
  {
    "id": "unique-id-here",
    "text": "Question text here?",
    "type": "multiple-choice",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "category": "${category}",
    "difficulty": "${difficulty}"
  }
]`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert educator and question generator...`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
      }),
    });

    let questions: GeneratedQuestion[] = [];
    if (response.ok) {
      const data = await response.json();
      const generatedContent = data.choices?.[0]?.message?.content;
      try {
        questions = JSON.parse(generatedContent);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', parseError);
        questions = [];
      }
    } else {
      console.error('OpenAI API error status:', response.status);
      questions = [];
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      const baseOptions = ['Option A', 'Option B', 'Option C', 'Option D'];
      questions = Array.from({ length: count }).map((_, idx) => ({
        id: `fallback-${category.toLowerCase().replace(/\s+/g, '-')}-${difficulty}-${idx}`,
        text: `Fallback question ${idx + 1} for ${category} (${difficulty}).`,
        type: 'multiple-choice',
        options: baseOptions,
        correctAnswer: 0,
        category,
        difficulty,
      }));
    }

    const timestamp = Date.now();
    const randomSeed = Math.random().toString(36).substr(2, 9);
    const validatedQuestions = questions.map((q, index) => ({
      ...q,
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-${difficulty}-${timestamp}-${randomSeed}-${index}`,
      type: 'multiple-choice'
    }));

    const uniqueQuestions = validatedQuestions.filter(q =>
      !usedQuestionIds.includes(q.id)
    );

    // Example: You can optionally store or fetch data from Supabase if needed here
    // await supabase.from('questions').insert(uniqueQuestions);

    res.json({ questions: uniqueQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
