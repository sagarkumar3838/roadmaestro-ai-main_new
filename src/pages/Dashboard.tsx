import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEvaluationResults, EvaluationResult } from '@/services/evaluationService';
import { Skill } from '@/types/question';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Target,
  Award,
  DollarSign,
  FileText,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Play,
  Star,
  CheckCircle,
  Zap,
  Brain,
  Rocket,
  Sparkles,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [evaluationResults, setEvaluationResults] = useState<Record<string, EvaluationResult>>({});

  useEffect(() => {
    if (user) {
      loadEvaluationResults();
    }
  }, [user]);

  const loadEvaluationResults = async () => {
    if (!user) return;

    try {
      const results = await getUserEvaluationResults(user.uid);
      setEvaluationResults(results);
    } catch (error) {
      console.error('Error loading evaluation results:', error);
    }
  };

  const stats = [
    {
      name: 'Courses Completed',
      value: '24',
      change: '+8 this week',
      changeType: 'positive',
      icon: BookOpen,
      description: 'Learning Progress',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Study Hours',
      value: '156h',
      change: '+12h this week',
      changeType: 'positive',
      icon: Clock,
      description: 'This month',
      color: 'from-peach-500 to-peach-600'
    },
    {
      name: 'Achievements',
      value: '12',
      change: '+3 new badges',
      changeType: 'positive',
      icon: Award,
      description: 'Total earned',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Streak Days',
      value: '28',
      change: 'Keep it up!',
      changeType: 'positive',
      icon: Zap,
      description: 'Current streak',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'course_completed',
      title: 'Completed Advanced React Patterns',
      description: 'Mastered hooks, context, and performance optimization',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      progress: 100
    },
    {
      id: 2,
      type: 'course_started',
      title: 'Started TypeScript Fundamentals',
      description: 'Learning type safety and modern JavaScript features',
      time: '1 day ago',
      icon: Play,
      color: 'bg-blue-100 text-blue-600',
      progress: 35
    },
    {
      id: 3,
      type: 'assessment_taken',
      title: 'JavaScript Assessment',
      description: 'Scored 85% on intermediate JavaScript concepts',
      time: '2 days ago',
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
      progress: 85
    },
    {
      id: 4,
      type: 'achievement_earned',
      title: 'Earned "Code Master" Badge',
      description: 'Completed 10 coding challenges in a row',
      time: '3 days ago',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      progress: 100
    }
  ];

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: Play,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      href: '/courses',
      primary: true
    },
    {
      title: 'AI Career Mentor',
      description: 'Get personalized career advice',
      icon: Brain,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      href: '/ai-assistant'
    },
    {
      title: 'Build Resume',
      description: 'Create a professional resume',
      icon: FileText,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      href: '/resume-builder'
    },
    {
      title: 'Learning Path',
      description: 'Plan your learning journey',
      icon: Rocket,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      href: '/learning-path'
    }
  ];

  const learningPaths = [
    {
      title: 'Frontend Development',
      progress: 75,
      courses: 12,
      completed: 9,
      color: 'bg-blue-500',
      description: 'Master modern web development'
    },
    {
      title: 'Data Science',
      progress: 45,
      courses: 8,
      completed: 3,
      color: 'bg-green-500',
      description: 'Learn data analysis and ML'
    },
    {
      title: 'DevOps',
      progress: 20,
      courses: 6,
      completed: 1,
      color: 'bg-purple-500',
      description: 'Infrastructure and deployment'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                  <h1 className="text-4xl lg:text-5xl font-bold">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!</h1>
                </div>
                <p className="text-xl text-orange-100 mb-6 max-w-2xl">
                  Ready to continue your learning journey? 🚀 You have {Object.keys(evaluationResults).length} skill evaluations completed. 
                  Let's achieve more today!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/courses')}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-transparent hover:bg-white/10 text-white border-white/30 transition-all duration-300"
                    onClick={() => navigate('/analytics')}
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-bold mb-2">{Object.keys(evaluationResults).length}</div>
                  <div className="text-orange-200 text-lg mb-4">Skills Evaluated</div>
                  <div className="w-24 h-24 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" 
                         style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:scale-105 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <p className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
                <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50/50 transition-colors">
                      <div className={`p-3 rounded-xl ${activity.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 mb-1">{activity.title}</p>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        {activity.progress < 100 && (
                          <div className="mb-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{activity.progress}%</span>
                            </div>
                            <Progress value={activity.progress} className="h-2" />
                          </div>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Rocket className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.title}
                      variant="ghost"
                      className={`w-full justify-start h-auto p-4 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                        action.primary 
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl' 
                          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => navigate(action.href)}
                    >
                      <div className={`p-3 rounded-xl ${action.color} mr-4 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-semibold text-base ${action.primary ? 'text-white' : 'text-gray-900'}`}>
                          {action.title}
                        </div>
                        <div className={`text-sm ${action.primary ? 'text-orange-100' : 'text-gray-600'}`}>
                          {action.description}
                        </div>
                      </div>
                      <ArrowUpRight className={`h-5 w-5 ${action.primary ? 'text-white' : 'text-gray-400'} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300`} />
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{path.title}</h3>
                  <Badge variant="secondary" className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium">
                    {path.completed}/{path.courses} courses
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">{path.description}</p>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{path.progress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={path.progress} className="h-3" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 transition-all duration-300 group-hover:shadow-md"
                  onClick={() => navigate('/learning-path')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Evaluation Results Section */}
        {Object.keys(evaluationResults).length > 0 && (
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Skill Evaluation Results
              </h2>
              <Button variant="outline" size="sm">
                Take Test
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(evaluationResults).map(([skill, result]) => {
                const overallProgress = Math.min(100, (Object.keys(evaluationResults).length / 5) * 100);
                return (
                  <Card key={skill} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 capitalize">{skill} Test</h3>
                      <Badge className={result.passed ? 'bg-green-500' : 'bg-red-500'}>
                        {result.passed ? 'PASSED' : 'FAILED'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Latest Score:</span>
                        <span className="font-semibold">{result.score}/10 ({result.percentage}%)</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Test Date:</span>
                        <span>{new Date(result.timestamp).toLocaleDateString()}</span>
                      </div>
                      {result.passed && (
                        <div className="mt-3">
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 text-xs">
                            Next Level Unlocked
                          </Badge>
                        </div>
                      )}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Overall Progress</span>
                          <span>{Math.round(overallProgress)}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate(`/evaluation/${skill}`)}
                      >
                        Retake Test
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            {Object.keys(evaluationResults).length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No evaluation results yet</p>
                <Button onClick={() => navigate('/skills')}>
                  Take Your First Test
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Achievements Section */}
        <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl">
              <Award className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-900">Code Master</div>
              <div className="text-xs text-gray-600">Earned 3 days ago</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <Target className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-900">Quick Learner</div>
              <div className="text-xs text-gray-600">Earned 1 week ago</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <Star className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-900">Streak Master</div>
              <div className="text-xs text-gray-600">Earned 2 weeks ago</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <Rocket className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-900">Rising Star</div>
              <div className="text-xs text-gray-600">Earned 1 month ago</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
