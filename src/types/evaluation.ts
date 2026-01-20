export type EvaluationLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

export type QuestionType = 'mcq' | 'multi_select' | 'scenario' | 'code_reasoning' | 'assertion_reason';

export type SkillArea = 'HTML' | 'CSS' | 'JavaScript' | 'Mixed';

export interface EvaluationQuestion {
  question_id: string;
  level: EvaluationLevel;
  skill_area: SkillArea;
  type: QuestionType;
  question: string;
  options: string[];
  correct_answer?: number | number[]; // Index for mcq, indices for multi_select
  expected_skills: string[];
  explanation?: string;
}

export interface TechnicalEvaluation {
  evaluation_id: string;
  evaluation_level: EvaluationLevel;
  question_count: number;
  questions: EvaluationQuestion[];
  created_at: string;
}

export interface EvaluationResponse {
  question_id: string;
  selected_answer: number | number[];
  time_spent: number; // in seconds
}

export interface EvaluationResult {
  evaluation_id: string;
  user_id: string;
  level: EvaluationLevel;
  score: number;
  percentage: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number; // total time in seconds
  responses: EvaluationResponse[];
  completed_at: string;
  skill_breakdown: {
    [key in SkillArea]: {
      total: number;
      correct: number;
      percentage: number;
    };
  };
}