export type QuestionType = 'multiple-choice' | 'coding' | 'fill-blanks';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'advanced';

export type Skill = 'html' | 'css' | 'jquery' | 'devtools' | 'javascript';

export interface Question {
  id: string;
  skill: Skill;
  difficulty: Difficulty;
  type: QuestionType;
  text: string;
  options?: string[]; // For MCQ and fill-blanks
  correctAnswer: number | string; // Index for MCQ, code for coding, answer for blanks
  explanation?: string;
  codeSnippet?: string; // For coding questions
  blanks?: string[]; // For fill-blanks, the correct answers
  topic?: string; // Topic for learning resources
}

export interface TestResult {
  userId: string;
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  timestamp: Date;
  questions: {
    questionId: string;
    userAnswer: number | string;
    isCorrect: boolean;
  }[];
}

export interface UserProgress {
  userId: string;
  skills: {
    [skill in Skill]: {
      completed: Difficulty[];
      bestScores: {
        [level in Difficulty]: number;
      };
    };
  };
  oglCoursesUnlocked: boolean;
}
