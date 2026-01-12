import { supabase } from '@/integrations/supabase/client';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Note: You'll need to add your Firebase service account key as an environment variable
// Get this from Firebase Console -> Project Settings -> Service Accounts -> Generate new private key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

async function initializeFirebaseAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    });
  }
  return getFirestore();
}

interface ProfileData {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  skills: string[] | null;
  interests: string[] | null;
  learning_goals: string[] | null;
  completed_assessments: number;
  total_score: number;
  preferred_learning_style: string | null;
  experience_level: string | null;
  created_at: string;
  updated_at: string;
}

interface UsedQuestionData {
  id: string;
  question_id: string;
  category: string;
  difficulty: string;
  user_session_id: string;
  created_at: string;
}

export async function exportSupabaseData() {
  console.log('🔄 Starting Supabase data export...');

  try {
    // Export profiles
    console.log('📊 Exporting profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) {
      console.error('❌ Error exporting profiles:', profilesError);
      throw profilesError;
    }

    console.log(`✅ Exported ${profiles?.length || 0} profiles`);

    // Export used_questions
    console.log('❓ Exporting used questions...');
    const { data: usedQuestions, error: questionsError } = await supabase
      .from('used_questions')
      .select('*');

    if (questionsError) {
      console.error('❌ Error exporting used questions:', questionsError);
      throw questionsError;
    }

    console.log(`✅ Exported ${usedQuestions?.length || 0} used questions`);

    return {
      profiles: profiles as ProfileData[],
      usedQuestions: usedQuestions as UsedQuestionData[]
    };

  } catch (error) {
    console.error('❌ Failed to export Supabase data:', error);
    throw error;
  }
}

export async function importToFirestore(data: { profiles: ProfileData[]; usedQuestions: UsedQuestionData[] }) {
  console.log('🔄 Starting Firestore import...');

  try {
    // Note: This requires a service account key
    // You'll need to set FIREBASE_SERVICE_ACCOUNT_KEY environment variable
    // Get the key from Firebase Console -> Project Settings -> Service Accounts
    const db = await initializeFirebaseAdmin();

    // Import profiles as a collection of documents
    console.log('📊 Importing profiles to Firestore...');
    const batch = db.batch();

    for (const profile of data.profiles) {
      const profileRef = db.collection('profiles').doc();
      // Transform data for Firestore
      const firestoreProfile = {
        ...profile,
        // Convert created_at and updated_at to Firestore timestamps if they exist
        createdAt: new Date(profile.created_at),
        updatedAt: new Date(profile.updated_at),
        // Store the original Supabase user_id for mapping
        supabaseUserId: profile.user_id,
        // This will need to be mapped to Firebase user ID later
        firebaseUserId: null, // TODO: Map this when user logs in with Firebase
      };
      batch.set(profileRef, firestoreProfile);
    }

    // Import used questions
    console.log('❓ Importing used questions to Firestore...');
    for (const question of data.usedQuestions) {
      const questionRef = db.collection('usedQuestions').doc();
      const firestoreQuestion = {
        ...question,
        createdAt: new Date(question.created_at),
        // Store session info for migration
        sessionId: question.user_session_id,
      };
      batch.set(questionRef, firestoreQuestion);
    }

    await batch.commit();
    console.log('✅ Successfully imported all data to Firestore');

    return {
      profilesImported: data.profiles.length,
      questionsImported: data.usedQuestions.length
    };

  } catch (error) {
    console.error('❌ Failed to import data to Firestore:', error);
    throw error;
  }
}

export async function runMigration() {
  try {
    console.log('🚀 Starting Supabase to Firestore migration...');

    // Step 1: Export from Supabase
    const exportedData = await exportSupabaseData();

    // Step 2: Import to Firestore
    const importResult = await importToFirestore(exportedData);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Profiles migrated: ${importResult.profilesImported}`);
    console.log(`❓ Used questions migrated: ${importResult.questionsImported}`);

    return importResult;

  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  }
}

// For running directly with Node.js
if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}
