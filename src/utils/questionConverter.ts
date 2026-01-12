import { Question, Skill, Difficulty } from '../types/question';

// JSON structure for organizing questions
export interface QuestionJSON {
  metadata: {
    skill: Skill;
    difficulty: Difficulty;
    totalQuestions: number;
    version: string;
    lastUpdated: string;
  };
  questions: Question[];
}

// Convert questions array to organized JSON structure
export const convertToJSON = (
  questions: Question[],
  skill: Skill,
  difficulty: Difficulty
): QuestionJSON => {
  return {
    metadata: {
      skill,
      difficulty,
      totalQuestions: questions.length,
      version: '1.0',
      lastUpdated: new Date().toISOString()
    },
    questions: questions.map(q => ({
      ...q,
      // Ensure all required fields are present
      id: q.id,
      skill: q.skill,
      difficulty: q.difficulty,
      type: q.type,
      text: q.text,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
      codeSnippet: q.codeSnippet || '',
      blanks: q.blanks || []
    }))
  };
};

// Parse JSON and extract questions
export const parseQuestionJSON = (jsonString: string): Question[] => {
  try {
    const data = JSON.parse(jsonString);
    
    // Handle both formats: with metadata wrapper or direct array
    if (Array.isArray(data)) {
      return data;
    } else if (data.questions && Array.isArray(data.questions)) {
      return data.questions;
    }
    
    throw new Error('Invalid JSON format');
  } catch (error) {
    console.error('Error parsing question JSON:', error);
    throw error;
  }
};

// Download JSON file
export const downloadJSON = (data: any, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Read JSON file
export const readJSONFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Validate question structure
export const validateQuestion = (question: any): boolean => {
  const requiredFields = ['id', 'skill', 'difficulty', 'type', 'text', 'correctAnswer'];
  
  for (const field of requiredFields) {
    if (!(field in question)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Validate multiple-choice questions have options
  if (question.type === 'multiple-choice' && (!question.options || question.options.length === 0)) {
    console.error('Multiple-choice question must have options');
    return false;
  }
  
  return true;
};

// Bulk validate questions
export const validateQuestions = (questions: any[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  questions.forEach((q, index) => {
    if (!validateQuestion(q)) {
      errors.push(`Question at index ${index} (id: ${q.id || 'unknown'}) is invalid`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};
