import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { OGLCourse, CourseFilters } from '@/types/oglCourse';

const COLLECTION_NAME = 'ogl-courses';

export class OGLCourseService {
  static async getOGLCourses(filters: CourseFilters = {}): Promise<OGLCourse[]> {
    try {
      let q = query(collection(db, COLLECTION_NAME));

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters.level) {
        q = query(q, where('level', '==', filters.level));
      }

      // Apply sorting
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder === 'asc' ? 'asc' : 'desc';
      q = query(q, orderBy(sortBy, sortOrder));

      const querySnapshot = await getDocs(q);
      const courses: OGLCourse[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        courses.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as OGLCourse);
      });

      return courses;
    } catch (error) {
      console.error('Error fetching OGL courses:', error);
      throw error;
    }
  }

  static async getOGLCourseById(id: string): Promise<OGLCourse | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as OGLCourse;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching OGL course:', error);
      throw error;
    }
  }

  static async getOGLCourseByPath(path: string): Promise<OGLCourse | null> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('path', '==', path));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as OGLCourse;
      }
      return null;
    } catch (error) {
      console.error('Error fetching OGL course by path:', error);
      throw error;
    }
  }

  static async searchOGLCourses(searchTerm: string, filters: CourseFilters = {}): Promise<OGLCourse[]> {
    try {
      const courses = await this.getOGLCourses(filters);

      const searchLower = searchTerm.toLowerCase();
      return courses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.skillsLearned.some(skill => skill.toLowerCase().includes(searchLower))
      );
    } catch (error) {
      console.error('Error searching OGL courses:', error);
      throw error;
    }
  }

  static async createOGLCourse(course: Omit<OGLCourse, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date();
      const docData = {
        ...course,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating OGL course:', error);
      throw error;
    }
  }

  static async updateOGLCourse(id: string, updates: Partial<Omit<OGLCourse, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...updates,
        updatedAt: new Date(),
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating OGL course:', error);
      throw error;
    }
  }

  static async deleteOGLCourse(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting OGL course:', error);
      throw error;
    }
  }

  static async getCategories(): Promise<{ [key: string]: number }> {
    try {
      const courses = await this.getOGLCourses();
      const categories: { [key: string]: number } = {};

      courses.forEach(course => {
        categories[course.category] = (categories[course.category] || 0) + 1;
      });

      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Debug function to test Firebase connectivity
  static async testConnection(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      console.log('🔍 Testing Firebase connection...');
      console.log('📊 Testing getOGLCourses...');
      const courses = await this.getOGLCourses();

      // Test writing a temporary document
      console.log('✍️  Testing write access...');
      const testDoc = await this.createOGLCourse({
        title: 'Test Course',
        description: 'Test course for Firebase connectivity',
        longDescription: 'Test course for Firebase connectivity',
        category: 'Test',
        level: 'Beginner',
        durationHours: 1,
        studentsCount: 0,
        completionRate: 100,
        icon: 'BookOpen',
        path: '/test-course',
        modules: [],
        features: [],
        prerequisites: [],
        skillsLearned: []
      });

      // Delete the test document
      console.log('🗑️  Cleaning up test document...');
      await this.deleteOGLCourse(testDoc);

      return {
        success: true,
        message: `Firebase connection successful. Found ${courses.length} courses in database.`,
        data: { coursesCount: courses.length }
      };
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      return {
        success: false,
        message: `Firebase connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        data: error
      };
    }
  }
}
