import { Question, Skill, Difficulty } from '@/types/question';

// Interface for JSON question file structure
interface QuestionFile {
  skill: Skill;
  difficulty: Difficulty;
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    topic: string;
    explanation: string;
  }>;
}

// Cache for loaded questions to avoid repeated file loads
const questionCache = new Map<string, Question[]>();

// Load questions from JSON file
export const loadQuestionsFromJSON = async (skill: Skill, difficulty: Difficulty): Promise<Question[]> => {
  const cacheKey = `${skill}-${difficulty}`;
  
  // Return cached questions if available
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey)!;
  }

  try {
    // Dynamic import of JSON file
    const questionFile = await import(`../data/questions/${skill}-${difficulty}.json`);
    const data: QuestionFile = questionFile.default;
    
    // Convert to Question format
    const questions: Question[] = data.questions.map(q => ({
      id: q.id,
      skill,
      difficulty,
      type: 'multiple-choice' as const,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      topic: q.topic
    }));

    // Cache the questions
    questionCache.set(cacheKey, questions);
    
    return questions;
  } catch (error) {
    console.error(`Error loading questions for ${skill}-${difficulty}:`, error);
    return [];
  }
};

// Get unique random questions from a pool
export const getUniqueRandomQuestions = (questions: Question[], count: number): Question[] => {
  if (questions.length <= count) {
    return [...questions].sort(() => Math.random() - 0.5);
  }
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Load all questions for a skill across all difficulties
export const loadAllQuestionsForSkill = async (skill: Skill): Promise<{
  easy: Question[];
  medium: Question[];
  hard: Question[];
  advanced: Question[];
}> => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];
  
  const questionBank = {
    easy: [] as Question[],
    medium: [] as Question[],
    hard: [] as Question[],
    advanced: [] as Question[]
  };

  // Load questions for each difficulty
  for (const difficulty of difficulties) {
    try {
      questionBank[difficulty] = await loadQuestionsFromJSON(skill, difficulty);
    } catch (error) {
      console.warn(`Could not load ${skill}-${difficulty} questions:`, error);
      questionBank[difficulty] = [];
    }
  }

  return questionBank;
};

// Generate balanced test questions (mix of difficulties)
export const generateBalancedTestQuestions = async (skill: Skill, totalCount: number = 10): Promise<Question[]> => {
  const questionBank = await loadAllQuestionsForSkill(skill);
  
  // Define distribution based on total count
  const getDistribution = (total: number) => {
    if (total <= 4) return { easy: total, medium: 0, hard: 0, advanced: 0 };
    if (total <= 6) return { easy: 3, medium: total - 3, hard: 0, advanced: 0 };
    if (total <= 8) return { easy: 3, medium: 3, hard: total - 6, advanced: 0 };
    return { easy: 3, medium: 3, hard: 2, advanced: total - 8 };
  };

  const distribution = getDistribution(totalCount);
  const selectedQuestions: Question[] = [];

  // Select questions from each difficulty level
  Object.entries(distribution).forEach(([level, count]) => {
    if (count > 0) {
      const levelQuestions = questionBank[level as Difficulty];
      const selected = getUniqueRandomQuestions(levelQuestions, count);
      selectedQuestions.push(...selected);
    }
  });

  // Final shuffle to randomize order
  return selectedQuestions.sort(() => Math.random() - 0.5);
};

// Generate questions for specific difficulty level
export const generateLevelTestQuestions = async (
  skill: Skill, 
  difficulty: Difficulty, 
  count: number = 10
): Promise<Question[]> => {
  const questions = await loadQuestionsFromJSON(skill, difficulty);
  return getUniqueRandomQuestions(questions, count);
};

// Clear cache (useful for development/testing)
export const clearQuestionCache = (): void => {
  questionCache.clear();
};

// Get available question count for a skill/difficulty
export const getQuestionCount = async (skill: Skill, difficulty: Difficulty): Promise<number> => {
  const questions = await loadQuestionsFromJSON(skill, difficulty);
  return questions.length;
};

// Validate that all required question files exist
export const validateQuestionFiles = async (): Promise<{
  valid: boolean;
  missing: string[];
  available: string[];
}> => {
  const skills: Skill[] = ['html', 'css', 'javascript', 'jquery', 'devtools'];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];
  
  const missing: string[] = [];
  const available: string[] = [];

  for (const skill of skills) {
    for (const difficulty of difficulties) {
      try {
        const questions = await loadQuestionsFromJSON(skill, difficulty);
        if (questions.length > 0) {
          available.push(`${skill}-${difficulty}`);
        } else {
          missing.push(`${skill}-${difficulty}`);
        }
      } catch (error) {
        missing.push(`${skill}-${difficulty}`);
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    available
  };
};