import fs from 'fs';
import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const markdown = fs.readFileSync('jquery_cheatsheet.md', 'utf8');

const cheatsheet = {
  title: 'jQuery Cheatsheet',
  category: 'JavaScript',
  content: markdown,
  tags: ['jquery', 'javascript', 'cheatsheet'],
  authorId: 'system',
  authorName: 'System',
  likes: 0,
  views: 0,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now()
};

addDoc(collection(db, 'cheatsheets'), cheatsheet).then(docRef => {
  console.log('Cheatsheet added with ID:', docRef.id);
}).catch(error => {
  console.error('Error adding cheatsheet:', error);
});
