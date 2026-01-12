import { db } from '@/integrations/firebase/client';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

export interface ModuleProgress {
  id: string;
  userId: string;
  moduleId: string;
  completedSections: string[];
  quizCompleted: boolean;
  quizScore: number;
  totalQuizPoints: number;
  startedAt: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
}

export class ModuleProgressService {
  private static instance: ModuleProgressService;
  
  static getInstance(): ModuleProgressService {
    if (!ModuleProgressService.instance) {
      ModuleProgressService.instance = new ModuleProgressService();
    }
    return ModuleProgressService.instance;
  }

  // Start tracking module progress
  async startModule(userId: string, moduleId: string): Promise<ModuleProgress> {
    const progressId = `${userId}_${moduleId}`;
    const progressRef = doc(db, 'moduleProgress', progressId);
    
    // Check if progress already exists
    const existingDoc = await getDoc(progressRef);
    if (existingDoc.exists()) {
      // Update last accessed time
      await updateDoc(progressRef, {
        lastAccessedAt: serverTimestamp()
      });
      return this.convertFirestoreToProgress(existingDoc.data());
    }

    // Create new progress
    const now = new Date();
    const progress: ModuleProgress = {
      id: progressId,
      userId,
      moduleId,
      completedSections: [],
      quizCompleted: false,
      quizScore: 0,
      totalQuizPoints: 0,
      startedAt: now,
      lastAccessedAt: now
    };

    await setDoc(progressRef, {
      ...progress,
      startedAt: Timestamp.fromDate(progress.startedAt),
      lastAccessedAt: serverTimestamp()
    });

    return progress;
  }

  // Mark section as completed
  async completeSection(userId: string, moduleId: string, sectionId: string): Promise<void> {
    const progressId = `${userId}_${moduleId}`;
    const progressRef = doc(db, 'moduleProgress', progressId);
    
    const progressDoc = await getDoc(progressRef);
    if (!progressDoc.exists()) {
      await this.startModule(userId, moduleId);
    }

    const progress = progressDoc.exists() ? this.convertFirestoreToProgress(progressDoc.data()) : await this.startModule(userId, moduleId);
    
    if (!progress.completedSections.includes(sectionId)) {
      progress.completedSections.push(sectionId);
      
      await updateDoc(progressRef, {
        completedSections: progress.completedSections,
        lastAccessedAt: serverTimestamp()
      });
    }
  }

  // Complete quiz
  async completeQuiz(userId: string, moduleId: string, score: number, totalPoints: number): Promise<void> {
    const progressId = `${userId}_${moduleId}`;
    const progressRef = doc(db, 'moduleProgress', progressId);
    
    const updateData: any = {
      quizCompleted: true,
      quizScore: score,
      totalQuizPoints: totalPoints,
      lastAccessedAt: serverTimestamp()
    };

    // If quiz passed (70%+), mark module as completed
    if (score >= Math.ceil(totalPoints * 0.7)) {
      updateData.completedAt = serverTimestamp();
    }

    await updateDoc(progressRef, updateData);
  }

  // Get module progress
  async getModuleProgress(userId: string, moduleId: string): Promise<ModuleProgress | null> {
    const progressId = `${userId}_${moduleId}`;
    const progressDoc = await getDoc(doc(db, 'moduleProgress', progressId));

    if (!progressDoc.exists()) {
      return null;
    }

    return this.convertFirestoreToProgress(progressDoc.data());
  }

  // Convert Firestore data to ModuleProgress
  private convertFirestoreToProgress(data: any): ModuleProgress {
    return {
      ...data,
      startedAt: data.startedAt?.toDate() || new Date(),
      completedAt: data.completedAt?.toDate(),
      lastAccessedAt: data.lastAccessedAt?.toDate() || new Date()
    };
  }

  // Calculate reading time based on content length
  calculateEstimatedReadingTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Check if user has spent enough time reading
  isReadingTimeComplete(startTime: Date, estimatedMinutes: number): boolean {
    const now = new Date();
    const timeSpent = (now.getTime() - startTime.getTime()) / (1000 * 60); // minutes
    return timeSpent >= (estimatedMinutes * 0.5); // 50% of estimated time
  }
}