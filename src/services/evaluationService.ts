import { db } from "@/integrations/firebase/client";
import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { Question, Skill, Difficulty } from "@/types/question";
import { 
  loadAllQuestionsForSkill, 
  generateBalancedTestQuestions, 
  generateLevelTestQuestions 
} from './questionLoaderService';
import { 
  getLearningResourcesByQuestion, 
  getLearningResourcesByTopic,
  LearningResource 
} from './learningResourcesService';

// Interface for Firebase question bank structure
export interface QuestionBank {
  easy: Question[];
  medium: Question[];
  hard: Question[];
  advanced: Question[];
}

// Interface for evaluation result
export interface EvaluationResult {
  skill: string;
  score: number;
  percentage: number;
  passed: boolean;
  timestamp: string;
}

// Seed question bank in Firebase (run once to populate data)
export const seedQuestionBank = async (skill: Skill, questionBank: QuestionBank): Promise<void> => {
  try {
    const docRef = doc(db, 'questionBank', skill);
    await setDoc(docRef, questionBank);
    console.log(`Question bank seeded for ${skill}`);
  } catch (error) {
    console.error('Error seeding question bank:', error);
    throw error;
  }
};

// Fetch question bank from JSON files
export const fetchQuestionBank = async (skill: Skill): Promise<QuestionBank> => {
  try {
    console.log(`Loading questions from JSON files for ${skill}...`);
    return await loadAllQuestionsForSkill(skill);
  } catch (error) {
    console.error('Error loading questions from JSON files:', error);
    return { easy: [], medium: [], hard: [], advanced: [] };
  }
};

// Generate random 10 UNIQUE questions from all difficulty levels
export const generateEvaluationQuestions = async (skill: Skill): Promise<Question[]> => {
  try {
    return await generateBalancedTestQuestions(skill, 10);
  } catch (error) {
    console.error('Error generating evaluation questions:', error);
    return [];
  }
};

// Generate questions for specific difficulty level
export const generateLevelQuestions = async (
  skill: Skill, 
  difficulty: Difficulty, 
  count: number = 10
): Promise<Question[]> => {
  try {
    return await generateLevelTestQuestions(skill, difficulty, count);
  } catch (error) {
    console.error(`Error generating ${difficulty} questions for ${skill}:`, error);
    return [];
  }
};

// Generate a balanced set of questions (legacy function for compatibility)
export const generateBalancedEvaluationQuestions = async (skill: Skill): Promise<Question[]> => {
  return generateEvaluationQuestions(skill);
};

// Get question topic and learning resources for wrong answers
export const getQuestionLearningResources = (skill: Skill, questionText: string, topic?: string): LearningResource => {
  // If topic is provided (from question data), use it directly
  if (topic) {
    const resourceByTopic = getLearningResourcesByTopic(skill, topic);
    if (resourceByTopic) {
      return resourceByTopic;
    }
  }

  // Otherwise, use question text to find appropriate resources
  return getLearningResourcesByQuestion(skill, questionText);
};

// Save evaluation result to Firebase
export const saveEvaluationResult = async (
  userId: string,
  skill: Skill,
  result: EvaluationResult
): Promise<void> => {
  try {
    // Create a single document per user-skill combination
    const docRef = doc(db, 'userResults', `${userId}_${skill}`);
    await setDoc(docRef, result);
    console.log(`Evaluation result saved for ${userId} - ${skill}`);
  } catch (error) {
    console.error('Error saving evaluation result:', error);
    throw error;
  }
};

// Get user's evaluation results from Firebase
export const getUserEvaluationResults = async (userId: string): Promise<Record<string, EvaluationResult>> => {
  try {
    const results: Record<string, EvaluationResult> = {};

    const skills: Skill[] = ['html', 'css', 'javascript', 'jquery', 'devtools'];

    for (const skill of skills) {
      const docRef = doc(db, 'userResults', `${userId}_${skill}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        results[skill] = docSnap.data() as EvaluationResult;
      }
    }

    return results;
  } catch (error) {
    console.error('Error fetching user evaluation results:', error);
    throw error;
  }
};

// Check if OGL courses should be unlocked based on evaluation results
export const checkOGLCoursesUnlock = async (userId: string): Promise<boolean> => {
  try {
    const results = await getUserEvaluationResults(userId);
    const passedSkills = Object.values(results).filter(result => result.passed);
    return passedSkills.length >= 3; // Unlock OGL courses after passing 3+ skill evaluations
  } catch (error) {
    console.error('Error checking OGL courses unlock:', error);
    return false;
  }
};

// Update user's OGL courses access status
export const updateUserOGLAccess = async (userId: string, hasAccess: boolean): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { oglCoursesUnlocked: hasAccess }, { merge: true });
    console.log(`Updated OGL courses access for user ${userId}: ${hasAccess}`);
  } catch (error) {
    console.error('Error updating user OGL access:', error);
    throw error;
  }
};

// Get all evaluation results for admin purposes
export const getAllEvaluationResults = async (): Promise<any[]> => {
  try {
    const q = collection(db, 'userResults');
    const querySnapshot = await getDocs(q);

    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push({
        userId: doc.id,
        ...doc.data()
      });
    });

    return results;
  } catch (error) {
    console.error('Error fetching all evaluation results:', error);
    throw error;
  }
};
