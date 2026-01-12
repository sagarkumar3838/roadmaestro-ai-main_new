import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import SkillTest from './SkillTest';
import { Skill, Difficulty, UserProgress } from '@/types/question';
import { getUserProgress } from '@/services/questionService';
import { useToast } from '@/hooks/use-toast';
import {
  Code,
  Palette,
  Zap,
  Settings,
  BookOpen,
  Trophy,
  Target,
  CheckCircle,
  Lock
} from 'lucide-react';

const TestPage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progress = await getUserProgress(user.uid);
      setUserProgress(progress);
    } catch (error) {
      console.error('Error loading user progress:', error);
      toast({
        title: "Error",
        description: "Failed to load progress data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const skills: {
    id: Skill;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
  }[] = [
    {
      id: 'html',
      name: 'HTML',
      description: 'Master the foundation of web development with semantic markup and structure.',
      icon: Code,
      color: 'bg-orange-500'
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'Learn styling, layouts, animations, and responsive design techniques.',
      icon: Palette,
      color: 'bg-blue-500'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Understand core concepts, DOM manipulation, and modern ES6+ features.',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      id: 'jquery',
      name: 'jQuery',
      description: 'DOM manipulation, AJAX calls, and event handling with jQuery library.',
      icon: Settings,
      color: 'bg-gray-500'
    },
    {
      id: 'devtools',
      name: 'DevTools',
      description: 'Browser debugging, performance optimization, and development tools.',
      icon: BookOpen,
      color: 'bg-green-500'
    }
  ];

  const difficulties: {
    id: Difficulty;
    name: string;
    description: string;
    color: string;
    prerequisites?: string;
  }[] = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Basic concepts and fundamentals',
      color: 'bg-green-500'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Intermediate topics and practical applications',
      color: 'bg-yellow-500',
      prerequisites: 'Complete Beginner level first'
    },
    {
      id: 'hard',
      name: 'Hard',
      description: 'Advanced concepts and complex scenarios',
      color: 'bg-red-500',
      prerequisites: 'Complete Medium level first'
    }
  ];

  const getSkillProgress = (skillId: Skill) => {
    if (!userProgress) return { completed: [], bestScores: { beginner: 0, medium: 0, hard: 0 } };
    return userProgress.skills[skillId];
  };

  const canTakeTest = (skillId: Skill, difficulty: Difficulty): boolean => {
    if (difficulty === 'beginner') return true;

    const progress = getSkillProgress(skillId);

    if (difficulty === 'medium') {
      return progress.bestScores.beginner >= 7; // 70% on beginner
    }

    if (difficulty === 'hard') {
      return progress.bestScores.medium >= 7; // 70% on medium
    }

    return false;
  };

  const handleStartTest = (skill: Skill, difficulty: Difficulty) => {
    setSelectedSkill(skill);
    setSelectedDifficulty(difficulty);
  };

  const handleTestComplete = () => {
    setSelectedSkill(null);
    setSelectedDifficulty(null);
    loadUserProgress(); // Refresh progress
  };

  if (selectedSkill && selectedDifficulty) {
    return (
      <SkillTest
        skill={selectedSkill}
        level={selectedDifficulty}
        onComplete={handleTestComplete}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Skill Tests</h1>
              <p className="text-gray-400">Test your knowledge and unlock OGL courses!</p>
            </div>
          </div>

          {userProgress?.oglCoursesUnlocked && (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-green-400 font-semibold">OGL Courses Unlocked!</p>
                <p className="text-green-300 text-sm">Congratulations! You've earned access to Oracle Guided Learning courses.</p>
              </div>
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skills.map((skill) => {
            const progress = getSkillProgress(skill.id);
            const Icon = skill.icon;
            const totalScore = Object.values(progress.bestScores).reduce((a, b) => a + b, 0);

            return (
              <Card key={skill.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-2xl ${skill.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Best Score</p>
                      <p className="text-lg font-bold text-white">{totalScore}/30</p>
                    </div>
                  </div>
                  <CardTitle className="text-white">{skill.name}</CardTitle>
                  <p className="text-sm text-gray-400">{skill.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {difficulties.map((difficulty) => {
                      const canTake = canTakeTest(skill.id, difficulty.id);
                      const bestScore = progress.bestScores[difficulty.id];
                      const passed = bestScore >= 7;
                      const completed = progress.completed.includes(difficulty.id);

                      return (
                        <div key={difficulty.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${difficulty.color}`}></div>
                            <div>
                              <p className="text-white font-medium">{difficulty.name}</p>
                              <p className="text-xs text-gray-400">{difficulty.description}</p>
                              {difficulty.prerequisites && !canTake && (
                                <p className="text-xs text-yellow-500">{difficulty.prerequisites}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {completed && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span className="text-sm text-gray-300">{bestScore}/10</span>
                            {canTake ? (
                              <Button
                                size="sm"
                                onClick={() => handleStartTest(skill.id, difficulty.id)}
                                className={`text-white ${passed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                              >
                                {passed ? 'Retake' : 'Start'}
                              </Button>
                            ) : (
                              <Lock className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {skills.map((skill) => {
                const progress = getSkillProgress(skill.id);
                const completedTests = progress.completed.length;
                const totalScore = Object.values(progress.bestScores).reduce((a, b) => a + b, 0);
                const maxScore = 30; // 10 per level * 3 levels

                return (
                  <div key={skill.id} className="text-center">
                    <p className="text-white font-medium mb-1">{skill.name}</p>
                    <div className="space-y-1">
                      <div className="flex justify-center gap-1">
                        {Array.from({ length: 3 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < completedTests ? 'bg-green-500' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-400">{totalScore}/{maxScore}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestPage;
