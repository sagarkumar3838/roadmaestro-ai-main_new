import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter } from 'lucide-react';
import { CheatSheet, CheatSheetFilters } from '@/types/cheatsheet';
import { CheatSheetService } from '@/services/cheatsheetService';
import CheatSheetCard from '@/components/CheatSheetCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CheatSheetsPage: React.FC = () => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CheatSheetFilters>({});
  const [categories, setCategories] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming this hook exists

  useEffect(() => {
    loadCheatSheets();
    loadCategories();
  }, [filters]);

  const loadCheatSheets = async () => {
    try {
      setLoading(true);
      let sheets: CheatSheet[];

      if (searchTerm.trim()) {
        sheets = await CheatSheetService.searchCheatSheets(searchTerm, filters);
      } else {
        const result = await CheatSheetService.getCheatSheets(filters);
        sheets = result.sheets;
      }

      setCheatSheets(sheets);
    } catch (error) {
      console.error('Error loading cheat sheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await CheatSheetService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = () => {
    loadCheatSheets();
  };

  const handleFilterChange = (key: keyof CheatSheetFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value || undefined
    }));
  };

  const handleLike = async (id: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await CheatSheetService.toggleLike(id, user.uid);
      // Refresh the list to show updated likes
      loadCheatSheets();
    } catch (error) {
      console.error('Error liking cheat sheet:', error);
    }
  };

  const handleCreateNew = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/cheatsheets/create');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cheat Sheets</h1>
          <p className="text-muted-foreground">
            Quick reference guides for developers and learners
          </p>
        </div>
        {user && (
          <Button onClick={handleCreateNew} className="mt-4 lg:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Cheat Sheet
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cheat sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} variant="outline">
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categories).map(([category, count]) => (
                <SelectItem key={category} value={category}>
                  {category} ({count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filters.category === undefined ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange('category', 'all')}
          >
            All ({Object.values(categories).reduce((a, b) => a + b, 0)})
          </Badge>
          {Object.entries(categories).map(([category, count]) => (
            <Badge
              key={category}
              variant={filters.category === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleFilterChange('category', category)}
            >
              {category} ({count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Cheat Sheets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted h-48 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : cheatSheets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatSheets.map((sheet) => (
            <CheatSheetCard
              key={sheet.id}
              cheatSheet={sheet}
              onLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm || Object.keys(filters).some(key => filters[key as keyof CheatSheetFilters])
              ? "No cheat sheets found matching your criteria."
              : "No cheat sheets available yet."}
          </div>
          {user && (
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create the first cheat sheet
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CheatSheetsPage;
