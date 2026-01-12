import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../integrations/firebase/client';
import { Question, Skill, Difficulty, UserProgress } from '../types/question';

// Collection names
const QUESTIONS_COLLECTION = 'questions';
const CATEGORIES_COLLECTION = 'categories';
const USER_PROGRESS_COLLECTION = 'userProgress';

// Question Service for Firebase operations
export class QuestionService {
  
  // Add a single question
  static async addQuestion(question: Question): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  // Add multiple questions in batch
  static async addQuestionsBatch(questions: Question[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      questions.forEach((question) => {
        const docRef = doc(collection(db, QUESTIONS_COLLECTION));
        batch.set(docRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

      await batch.commit();
      console.log(`Successfully added ${questions.length} questions`);
    } catch (error) {
      console.error('Error adding questions batch:', error);
      throw error;
    }
  }

  // Get questions by skill and difficulty
  static async getQuestions(
    skill: Skill, 
    difficulty: Difficulty, 
    limit?: number
  ): Promise<Question[]> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('skill', '==', skill),
        where('difficulty', '==', difficulty)
      );

      const querySnapshot = await getDocs(q);
      const questions: Question[] = [];
      
      querySnapshot.forEach((doc) => {
        questions.push({ ...doc.data(), id: doc.id } as Question);
      });

      // Shuffle and limit if specified
      const shuffled = questions.sort(() => Math.random() - 0.5);
      return limit ? shuffled.slice(0, limit) : shuffled;
    } catch (error) {
      console.error('Error getting questions:', error);
      throw error;
    }
  }

  // Get all questions for a skill
  static async getQuestionsBySkill(skill: Skill): Promise<Question[]> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('skill', '==', skill)
      );

      const querySnapshot = await getDocs(q);
      const questions: Question[] = [];
      
      querySnapshot.forEach((doc) => {
        questions.push({ ...doc.data(), id: doc.id } as Question);
      });

      return questions;
    } catch (error) {
      console.error('Error getting questions by skill:', error);
      throw error;
    }
  }

  // Update a question
  static async updateQuestion(questionId: string, updates: Partial<Question>): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, questionId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  // Delete a question
  static async deleteQuestion(questionId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, QUESTIONS_COLLECTION, questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }

  // Get question count by skill and difficulty
  static async getQuestionCount(skill: Skill, difficulty: Difficulty): Promise<number> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('skill', '==', skill),
        where('difficulty', '==', difficulty)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting question count:', error);
      throw error;
    }
  }

  // Export questions to JSON
  static async exportQuestionsToJSON(skill?: Skill): Promise<string> {
    try {
      let questions: Question[];
      
      if (skill) {
        questions = await this.getQuestionsBySkill(skill);
      } else {
        const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
        questions = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Question));
      }

      return JSON.stringify(questions, null, 2);
    } catch (error) {
      console.error('Error exporting questions:', error);
      throw error;
    }
  }

  // Import questions from JSON
  static async importQuestionsFromJSON(jsonString: string): Promise<number> {
    try {
      const questions: Question[] = JSON.parse(jsonString);
      await this.addQuestionsBatch(questions);
      return questions.length;
    } catch (error) {
      console.error('Error importing questions:', error);
      throw error;
    }
  }
}

// Category Service for managing question categories
export class CategoryService {
  
  // Add or update a category
  static async saveCategory(
    skill: Skill, 
    difficulty: Difficulty, 
    metadata: {
      name: string;
      description?: string;
      totalQuestions?: number;
      passingScore?: number;
    }
  ): Promise<void> {
    try {
      const categoryId = `${skill}-${difficulty}`;
      await setDoc(doc(db, CATEGORIES_COLLECTION, categoryId), {
        skill,
        difficulty,
        ...metadata,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }

  // Get all categories
  static async getAllCategories(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }
}

// Get user progress
export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  try {
    const docRef = doc(db, USER_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    }

    // Return default progress for new users
    const defaultProgress: UserProgress = {
      userId,
      skills: {
        html: { completed: [], bestScores: { easy: 0, medium: 0, hard: 0, advanced: 0 } },
        css: { completed: [], bestScores: { easy: 0, medium: 0, hard: 0, advanced: 0 } },
        javascript: { completed: [], bestScores: { easy: 0, medium: 0, hard: 0, advanced: 0 } },
        jquery: { completed: [], bestScores: { easy: 0, medium: 0, hard: 0, advanced: 0 } },
        devtools: { completed: [], bestScores: { easy: 0, medium: 0, hard: 0, advanced: 0 } }
      },
      oglCoursesUnlocked: false
    };

    return defaultProgress;
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

// Save user progress
export const saveUserProgress = async (progress: UserProgress): Promise<void> => {
  try {
    const docRef = doc(db, USER_PROGRESS_COLLECTION, progress.userId);
    await setDoc(docRef, progress);
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
};
