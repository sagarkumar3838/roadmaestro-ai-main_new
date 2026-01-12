import aiMl from '@/data/pools/ai-ml.json';
import cloud from '@/data/pools/cloud-computing.json';
import cybersecurity from '@/data/pools/cybersecurity.json';
import dataScience from '@/data/pools/data-science.json';
import mobile from '@/data/pools/mobile-development.json';
import web from '@/data/pools/web-development.json';
import { auth } from '@/integrations/firebase/client';
import { db } from '@/integrations/firebase/client';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export type PoolCategoryKey =
  | 'ai-ml'
  | 'cloud-computing'
  | 'cybersecurity'
  | 'data-science'
  | 'mobile-development'
  | 'web-development';

export type PoolDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface PoolQuestion {
  id: string;
  text: string;
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: PoolDifficulty;
}

const pools: Record<PoolCategoryKey, PoolQuestion[]> = {
  'ai-ml': aiMl as PoolQuestion[],
  'cloud-computing': cloud as PoolQuestion[],
  'cybersecurity': cybersecurity as PoolQuestion[],
  'data-science': dataScience as PoolQuestion[],
  'mobile-development': mobile as PoolQuestion[],
  'web-development': web as PoolQuestion[],
};

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('question_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('question_session_id', sessionId);
  }
  return sessionId;
};

const getUserKey = async (): Promise<string> => {
  try {
    const user = auth.currentUser;
    return user?.uid || getSessionId();
  } catch {
    return getSessionId();
  }
};

const getUsedQuestionIds = async (category: string, difficulty: string): Promise<string[]> => {
  const userKey = await getUserKey();

  try {
    const q = query(
      collection(db, 'usedQuestions'),
      where('userSessionId', '==', userKey),
      where('category', '==', category),
      where('difficulty', '==', difficulty)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data().questionId);
  } catch (error) {
    console.error('Error fetching used questions:', error);
    return [];
  }
};

const storeUsedQuestions = async (
  questions: PoolQuestion[],
  category: string,
  difficulty: string
): Promise<void> => {
  const userKey = await getUserKey();

  try {
    const batch = questions.map(q =>
      addDoc(collection(db, 'usedQuestions'), {
        questionId: q.id,
        category,
        difficulty,
        userSessionId: userKey,
        createdAt: new Date()
      })
    );

    await Promise.all(batch);
  } catch (error) {
    console.error('Error storing used questions:', error);
  }
};

export const getUniquePoolQuestions = async (
  categoryKey: PoolCategoryKey,
  difficulty: PoolDifficulty,
  count: number = 5
): Promise<PoolQuestion[]> => {
  const all = pools[categoryKey] || [];
  const usedIds = await getUsedQuestionIds(categoryKey, difficulty);
  const available = all.filter(
    (q) => q.difficulty === difficulty && !usedIds.includes(q.id)
  );
  // Shuffle and take first N
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  const selected = available.slice(0, count);
  // Persist as used
  if (selected.length) {
    await storeUsedQuestions(selected, categoryKey, difficulty);
  }
  return selected;
};

export const clearUsedPoolQuestions = async (): Promise<void> => {
  // For now, just clear session storage
  // TODO: Implement Firestore delete operation if needed
  try {
    const user = auth.currentUser;
    if (!user) {
      sessionStorage.removeItem('question_session_id');
    }
  } catch {
    // ignore
  }
};
