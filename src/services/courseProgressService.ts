import { db } from '@/integrations/firebase/client';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { CourseProgress, CompletedModule, PointsCalculation, CourseJourney, CourseModule } from '@/types/courseProgress';

// Points configuration
const POINTS_CONFIG = {
  easy: 10,
  medium: 25,
  hard: 50,
  advanced: 100
};

const COMPLETION_BONUS_PERCENTAGE = 0.10; // 10% bonus for on-time completion
const DAILY_DEDUCTION = 1; // 1 point per day late
const MAX_DEDUCTION_DAYS = 365; // Stop deducting after 1 year

// Java Full Stack Course Definition
export const JAVA_COURSE: CourseJourney = {
  courseId: 'java-fullstack',
  courseName: 'Java Full Stack Developer',
  description: 'Complete Java enterprise development course',
  totalModules: 20,
  estimatedDuration: 90, // 90 days
  maxPoints: 1000,
  difficultyDistribution: {
    easy: 8,
    medium: 6,
    hard: 4,
    advanced: 2
  },
  modules: [
    // Easy modules (10 points each)
    { id: 'java-basics', name: 'Java Fundamentals', description: 'Variables, data types, operators', difficulty: 'easy', basePoints: 10, estimatedHours: 8 },
    { id: 'oop-basics', name: 'OOP Concepts', description: 'Classes, objects, inheritance', difficulty: 'easy', basePoints: 10, estimatedHours: 10 },
    { id: 'java-syntax', name: 'Java Syntax', description: 'Control structures, loops', difficulty: 'easy', basePoints: 10, estimatedHours: 6 },
    { id: 'collections-intro', name: 'Collections Basics', description: 'ArrayList, HashMap basics', difficulty: 'easy', basePoints: 10, estimatedHours: 8 },
    { id: 'html-review', name: 'HTML Review', description: 'HTML5 fundamentals', difficulty: 'easy', basePoints: 10, estimatedHours: 4 },
    { id: 'css-review', name: 'CSS Review', description: 'CSS3 and styling', difficulty: 'easy', basePoints: 10, estimatedHours: 6 },
    { id: 'js-review', name: 'JavaScript Review', description: 'ES6+ fundamentals', difficulty: 'easy', basePoints: 10, estimatedHours: 8 },
    { id: 'git-basics', name: 'Git Basics', description: 'Version control fundamentals', difficulty: 'easy', basePoints: 10, estimatedHours: 4 },
    
    // Medium modules (25 points each)
    { id: 'advanced-oop', name: 'Advanced OOP', description: 'Polymorphism, abstraction, interfaces', difficulty: 'medium', basePoints: 25, estimatedHours: 12 },
    { id: 'exception-handling', name: 'Exception Handling', description: 'Try-catch, custom exceptions', difficulty: 'medium', basePoints: 25, estimatedHours: 8 },
    { id: 'collections-advanced', name: 'Advanced Collections', description: 'Set, Queue, advanced operations', difficulty: 'medium', basePoints: 25, estimatedHours: 10 },
    { id: 'spring-intro', name: 'Spring Framework Intro', description: 'Dependency injection, IoC', difficulty: 'medium', basePoints: 25, estimatedHours: 15 },
    { id: 'spring-boot', name: 'Spring Boot', description: 'Auto-configuration, starters', difficulty: 'medium', basePoints: 25, estimatedHours: 12 },
    { id: 'angular-basics', name: 'Angular Fundamentals', description: 'Components, services, routing', difficulty: 'medium', basePoints: 25, estimatedHours: 16 },
    
    // Hard modules (50 points each)
    { id: 'spring-data-jpa', name: 'Spring Data JPA', description: 'Database operations, repositories', difficulty: 'hard', basePoints: 50, estimatedHours: 20 },
    { id: 'spring-security', name: 'Spring Security', description: 'Authentication, authorization', difficulty: 'hard', basePoints: 50, estimatedHours: 18 },
    { id: 'angular-advanced', name: 'Advanced Angular', description: 'RxJS, state management', difficulty: 'hard', basePoints: 50, estimatedHours: 20 },
    { id: 'rest-apis', name: 'REST API Development', description: 'RESTful services, API design', difficulty: 'hard', basePoints: 50, estimatedHours: 16 },
    
    // Advanced modules (100 points each)
    { id: 'microservices', name: 'Microservices Architecture', description: 'Service design, communication', difficulty: 'advanced', basePoints: 100, estimatedHours: 30 },
    { id: 'fullstack-project', name: 'Full Stack Project', description: 'Complete end-to-end application', difficulty: 'advanced', basePoints: 100, estimatedHours: 40 }
  ]
};

export class CourseProgressService {
  private static instance: CourseProgressService;
  
  static getInstance(): CourseProgressService {
    if (!CourseProgressService.instance) {
      CourseProgressService.instance = new CourseProgressService();
    }
    return CourseProgressService.instance;
  }

  // Start a new course for user
  async startCourse(userId: string, courseId: string, timeLimitDays: number): Promise<CourseProgress> {
    const startDate = new Date();
    const targetCompletionDate = new Date();
    targetCompletionDate.setDate(startDate.getDate() + timeLimitDays);

    const courseProgress: CourseProgress = {
      id: `${userId}_${courseId}`,
      userId,
      courseId,
      courseName: JAVA_COURSE.courseName,
      points: JAVA_COURSE.maxPoints, // Start with max points
      initialPoints: JAVA_COURSE.maxPoints,
      startDate,
      targetCompletionDate,
      isCompleted: false,
      status: 'on-track',
      timeLimit: timeLimitDays,
      completedModules: [],
      createdAt: startDate,
      updatedAt: startDate
    };

    await setDoc(doc(db, 'courseProgress', courseProgress.id), {
      ...courseProgress,
      startDate: Timestamp.fromDate(courseProgress.startDate),
      targetCompletionDate: Timestamp.fromDate(courseProgress.targetCompletionDate),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return courseProgress;
  }

  // Complete a module and award points
  async completeModule(userId: string, courseId: string, moduleId: string): Promise<CourseProgress | null> {
    const progressId = `${userId}_${courseId}`;
    const progressRef = doc(db, 'courseProgress', progressId);
    const progressDoc = await getDoc(progressRef);

    if (!progressDoc.exists()) {
      throw new Error('Course progress not found');
    }

    const progress = this.convertFirestoreToProgress(progressDoc.data());
    const module = JAVA_COURSE.modules.find(m => m.id === moduleId);

    if (!module) {
      throw new Error('Module not found');
    }

    // Check if module already completed
    if (progress.completedModules.some(m => m.moduleId === moduleId)) {
      throw new Error('Module already completed');
    }

    // Add completed module
    const completedModule: CompletedModule = {
      moduleId: module.id,
      moduleName: module.name,
      difficulty: module.difficulty,
      pointsAwarded: module.basePoints,
      completedAt: new Date()
    };

    progress.completedModules.push(completedModule);
    progress.points += module.basePoints;
    progress.updatedAt = new Date();

    // Update status based on current progress
    progress.status = this.calculateStatus(progress);

    await updateDoc(progressRef, {
      completedModules: progress.completedModules.map(m => ({
        ...m,
        completedAt: Timestamp.fromDate(m.completedAt)
      })),
      points: progress.points,
      status: progress.status,
      updatedAt: serverTimestamp()
    });

    return progress;
  }

  // Finish course and calculate final points
  async finishCourse(userId: string, courseId: string): Promise<PointsCalculation> {
    const progressId = `${userId}_${courseId}`;
    const progressRef = doc(db, 'courseProgress', progressId);
    const progressDoc = await getDoc(progressRef);

    if (!progressDoc.exists()) {
      throw new Error('Course progress not found');
    }

    const progress = this.convertFirestoreToProgress(progressDoc.data());
    const completionDate = new Date();
    
    // Calculate points
    const calculation = this.calculateFinalPoints(progress, completionDate);

    // Update progress
    await updateDoc(progressRef, {
      completionDate: Timestamp.fromDate(completionDate),
      isCompleted: true,
      status: 'completed',
      points: calculation.finalPoints,
      updatedAt: serverTimestamp()
    });

    return calculation;
  }

  // Get user's course progress
  async getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
    const progressId = `${userId}_${courseId}`;
    const progressDoc = await getDoc(doc(db, 'courseProgress', progressId));

    if (!progressDoc.exists()) {
      return null;
    }

    return this.convertFirestoreToProgress(progressDoc.data());
  }

  // Listen to real-time progress updates
  subscribeToProgress(userId: string, courseId: string, callback: (progress: CourseProgress | null) => void): () => void {
    const progressId = `${userId}_${courseId}`;
    const progressRef = doc(db, 'courseProgress', progressId);

    return onSnapshot(progressRef, (doc) => {
      if (doc.exists()) {
        callback(this.convertFirestoreToProgress(doc.data()));
      } else {
        callback(null);
      }
    });
  }

  // Calculate current status
  private calculateStatus(progress: CourseProgress): 'on-track' | 'late' | 'completed' | 'overdue' {
    if (progress.isCompleted) return 'completed';

    const now = new Date();
    const daysRemaining = Math.ceil((progress.targetCompletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      const daysLate = Math.abs(daysRemaining);
      return daysLate > MAX_DEDUCTION_DAYS ? 'overdue' : 'late';
    }

    return 'on-track';
  }

  // Calculate final points with bonuses and deductions
  private calculateFinalPoints(progress: CourseProgress, completionDate: Date): PointsCalculation {
    const basePoints = progress.points;
    let bonusPoints = 0;
    let deductedPoints = 0;
    let completionBonus = 0;

    // Calculate days late/early
    const timeDiff = completionDate.getTime() - progress.targetCompletionDate.getTime();
    const daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLate <= 0) {
      // On time or early - award bonus
      const modulePoints = progress.completedModules.reduce((sum, m) => sum + m.pointsAwarded, 0);
      completionBonus = Math.floor(modulePoints * COMPLETION_BONUS_PERCENTAGE);
      bonusPoints = completionBonus;
    } else {
      // Late - deduct points
      const deductionDays = Math.min(daysLate, MAX_DEDUCTION_DAYS);
      deductedPoints = deductionDays * DAILY_DEDUCTION;
    }

    const finalPoints = Math.max(0, basePoints + bonusPoints - deductedPoints);

    return {
      basePoints,
      bonusPoints,
      deductedPoints,
      finalPoints,
      daysLate: Math.max(0, daysLate),
      completionBonus
    };
  }

  // Convert Firestore data to CourseProgress
  private convertFirestoreToProgress(data: any): CourseProgress {
    return {
      ...data,
      startDate: data.startDate?.toDate() || new Date(),
      targetCompletionDate: data.targetCompletionDate?.toDate() || new Date(),
      completionDate: data.completionDate?.toDate(),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      completedModules: data.completedModules?.map((m: any) => ({
        ...m,
        completedAt: m.completedAt?.toDate() || new Date()
      })) || []
    };
  }

  // Get course modules
  getCourseModules(): CourseModule[] {
    return JAVA_COURSE.modules;
  }

  // Get points for difficulty
  getPointsForDifficulty(difficulty: 'easy' | 'medium' | 'hard' | 'advanced'): number {
    return POINTS_CONFIG[difficulty];
  }

  // Calculate progress percentage
  calculateProgressPercentage(progress: CourseProgress): number {
    return Math.round((progress.completedModules.length / JAVA_COURSE.totalModules) * 100);
  }

  // Calculate time remaining
  calculateTimeRemaining(progress: CourseProgress): { days: number; hours: number; isOverdue: boolean } {
    const now = new Date();
    const timeDiff = progress.targetCompletionDate.getTime() - now.getTime();
    const isOverdue = timeDiff < 0;
    
    const totalHours = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return { days, hours, isOverdue };
  }
}