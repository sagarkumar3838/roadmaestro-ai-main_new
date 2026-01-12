import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import { CheatSheet } from '@/types/cheatsheet';
import { CheatSheetService } from '@/services/cheatsheetService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = [
  'Programming',
  'Web Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Database',
  'System Design',
  'Algorithms',
  'Tools & Frameworks',
  'Other'
];

const CreateCheatSheetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isEditing && id) {
      loadCheatSheet();
    }
  }, [user, isEditing, id]);

  const loadCheatSheet = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const sheet = await CheatSheetService.getCheatSheetById(id);
      if (sheet) {
        if (sheet.authorId !== user?.uid) {
          toast({
            title: "Access Denied",
            description: "You can only edit your own cheat sheets",
            variant: "destructive",
          });
          navigate('/cheatsheets');
          return;
        }

        setFormData({
          title: sheet.title,
          category: sheet.category,
          content: sheet.content,
          tags: sheet.tags,
        });
      }
    } catch (error) {
      console.error('Error loading cheat sheet:', error);
      toast({
        title: "Error",
        description: "Failed to load cheat sheet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      const sheetData = {
        title: formData.title.trim(),
        category: formData.category,
        content: formData.content.trim(),
        tags: formData.tags,
        authorId: user.uid,
        authorName: user.displayName || user.email || 'Anonymous',
        likes: 0,
        views: 0,
      };

      if (isEditing && id) {
        await CheatSheetService.updateCheatSheet(id, sheetData);
        toast({
          title: "Success",
          description: "Cheat sheet updated successfully",
        });
      } else {
        await CheatSheetService.createCheatSheet(sheetData);
        toast({
          title: "Success",
          description: "Cheat sheet created successfully",
        });
      }

      navigate('/cheatsheets');
    } catch (error) {
      console.error('Error saving cheat sheet:', error);
      toast({
        title: "Error",
        description: "Failed to save cheat sheet",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null; // Will redirect to auth
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-50 via-background to-teal-900/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/cheatsheets')}
            className="mb-4 hover:bg-teal-100/50 hover:text-teal-700 dark:hover:bg-teal-900/20 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cheat Sheets
          </Button>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-800 via-teal-600 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
            {isEditing ? 'Edit Cheat Sheet' : 'Create New Cheat Sheet'}
          </h1>
          <p className="text-teal-600 dark:text-teal-300 mt-2">
            Share your knowledge with the community
          </p>
        </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-teal-300 dark:border-teal-700">
              <CardHeader>
                <CardTitle className="text-teal-800 dark:text-teal-100">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-teal-700 dark:text-teal-300">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter cheat sheet title"
                    className="focus:border-teal-500 focus:ring-teal-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-teal-700 dark:text-teal-300">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="focus:border-teal-500 focus:ring-teal-500/20">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-300 dark:border-teal-700">
              <CardHeader>
                <CardTitle className="text-teal-800 dark:text-teal-100">Content</CardTitle>
                <p className="text-sm text-teal-600 dark:text-teal-300">
                  Write your cheat sheet content using Markdown
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter your cheat sheet content in Markdown format..."
                  className="min-h-96 font-mono text-sm focus:border-teal-500 focus:ring-teal-500/20"
                  required
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-teal-300 dark:border-teal-700">
              <CardHeader>
                <CardTitle className="text-teal-800 dark:text-teal-100">Tags</CardTitle>
                <p className="text-sm text-teal-600 dark:text-teal-300">
                  Add relevant tags to help others find your cheat sheet
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag"
                    className="flex-1 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                  <Button type="button" onClick={handleAddTag} size="sm" className="bg-teal-600 hover:bg-teal-700 text-white border-teal-600 hover:border-teal-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 border-teal-200 dark:border-teal-700">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-300 dark:border-teal-700">
              <CardHeader>
                <CardTitle className="text-teal-800 dark:text-teal-100">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p className="text-teal-700 dark:text-teal-300"><strong className="text-teal-800 dark:text-teal-100">Title:</strong> <span className="text-gray-700 dark:text-gray-300">{formData.title || 'Not set'}</span></p>
                  <p className="text-teal-700 dark:text-teal-300"><strong className="text-teal-800 dark:text-teal-100">Category:</strong> <span className="text-gray-700 dark:text-gray-300">{formData.category || 'Not set'}</span></p>
                  <p className="text-teal-700 dark:text-teal-300"><strong className="text-teal-800 dark:text-teal-100">Tags:</strong> <span className="text-gray-700 dark:text-gray-300">{formData.tags.length > 0 ? formData.tags.join(', ') : 'None'}</span></p>
                  <p className="text-teal-700 dark:text-teal-300"><strong className="text-teal-800 dark:text-teal-100">Content length:</strong> <span className="text-gray-700 dark:text-gray-300">{formData.content.length} characters</span></p>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white border-teal-600 hover:border-teal-700 shadow-lg hover:shadow-teal-300/50 dark:hover:shadow-teal-800/50 transition-all duration-300" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : (isEditing ? 'Update Cheat Sheet' : 'Create Cheat Sheet')}
            </Button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateCheatSheetPage;
