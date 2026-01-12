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
  limit,
  startAfter,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { CheatSheet, CheatSheetFilters } from '@/types/cheatsheet';

const COLLECTION_NAME = 'cheatsheets';

export class CheatSheetService {
  static async getCheatSheets(filters: CheatSheetFilters = {}, pageSize = 20, lastDoc?: DocumentSnapshot): Promise<{ sheets: CheatSheet[], lastDoc: DocumentSnapshot | null }> {
    try {
      let q = query(collection(db, COLLECTION_NAME));

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters.tags && filters.tags.length > 0) {
        q = query(q, where('tags', 'array-contains-any', filters.tags));
      }

      // Apply sorting
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder === 'asc' ? 'asc' : 'desc';
      q = query(q, orderBy(sortBy, sortOrder));

      // Apply pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      q = query(q, limit(pageSize));

      const querySnapshot = await getDocs(q);
      const sheets: CheatSheet[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sheets.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as CheatSheet);
      });

      const newLastDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null;

      return { sheets, lastDoc: newLastDoc };
    } catch (error) {
      console.error('Error fetching cheat sheets:', error);
      throw error;
    }
  }

  static async getCheatSheetById(id: string): Promise<CheatSheet | null> {
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
        } as CheatSheet;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching cheat sheet:', error);
      throw error;
    }
  }

  static async searchCheatSheets(searchTerm: string, filters: CheatSheetFilters = {}): Promise<CheatSheet[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - you might want to use Algolia or ElasticSearch for better search
      const { sheets } = await this.getCheatSheets(filters, 100);

      const searchLower = searchTerm.toLowerCase();
      return sheets.filter(sheet =>
        sheet.title.toLowerCase().includes(searchLower) ||
        sheet.content.toLowerCase().includes(searchLower) ||
        sheet.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        sheet.category.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching cheat sheets:', error);
      throw error;
    }
  }

  static async createCheatSheet(sheet: Omit<CheatSheet, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docData = {
        ...sheet,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating cheat sheet:', error);
      throw error;
    }
  }

  static async updateCheatSheet(id: string, updates: Partial<Omit<CheatSheet, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating cheat sheet:', error);
      throw error;
    }
  }

  static async deleteCheatSheet(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting cheat sheet:', error);
      throw error;
    }
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      const sheet = await this.getCheatSheetById(id);
      if (sheet) {
        await this.updateCheatSheet(id, { views: sheet.views + 1 });
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  static async toggleLike(id: string, userId: string): Promise<void> {
    try {
      // This would require a separate likes collection for proper implementation
      // For now, just increment likes
      const sheet = await this.getCheatSheetById(id);
      if (sheet) {
        await this.updateCheatSheet(id, { likes: sheet.likes + 1 });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }

  static async getCategories(): Promise<{ [key: string]: number }> {
    try {
      const { sheets } = await this.getCheatSheets({}, 1000);
      const categories: { [key: string]: number } = {};

      sheets.forEach(sheet => {
        categories[sheet.category] = (categories[sheet.category] || 0) + 1;
      });

      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}
