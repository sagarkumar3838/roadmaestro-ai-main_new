export interface Module {
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface CourseFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface OGLCourse {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  studentsCount: number;
  completionRate: number;
  icon: string;
  path: string;
  modules: Module[];
  features: CourseFeature[];
  prerequisites: string[];
  skillsLearned: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  sortBy?: 'title' | 'createdAt' | 'studentsCount' | 'durationHours';
  sortOrder?: 'asc' | 'desc';
}
