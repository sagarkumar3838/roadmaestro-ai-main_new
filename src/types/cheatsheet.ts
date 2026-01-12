export interface CheatSheet {
  id: string;
  title: string;
  category: string;
  content: string; // Markdown content
  tags: string[];
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
}

export interface CheatSheetCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface CheatSheetFilters {
  category?: string;
  search?: string;
  tags?: string[];
  sortBy?: 'title' | 'createdAt' | 'likes' | 'views';
  sortOrder?: 'asc' | 'desc';
}
