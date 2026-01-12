export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  points: number;
  initialPoints: number;
  startDate: Date;
  targetCompletionDate: Date;
  completionDate?: Date;
  isCompleted: boolean;
  status: 'on-track' | 'late' | 'completed' | 'overdue';
  timeLimit: number; // in days
  completedModules: CompletedModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompletedModule {
  moduleId: string;
  moduleName: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  pointsAwarded: number;
  completedAt: Date;
}

export interface CourseModule {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  basePoints: number;
  estimatedHours: number;
  prerequisites?: string[];
}

export interface PointsCalculation {
  basePoints: number;
  bonusPoints: number;
  deductedPoints: number;
  finalPoints: number;
  daysLate: number;
  completionBonus: number;
}

export interface CourseJourney {
  courseId: string;
  courseName: string;
  description: string;
  totalModules: number;
  estimatedDuration: number; // in days
  modules: CourseModule[];
  maxPoints: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
    advanced: number;
  };
}