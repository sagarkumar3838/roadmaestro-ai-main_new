import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap,
  TestTube,
  BookOpen,
  Users,
  Target,
  Trophy,
  Brain,
  Code,
  Database,
  Wrench,
  FileText,
  Settings,
  ArrowLeft,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { checkOGLCoursesUnlock, getUserEvaluationResults } from '@/services/evaluationService';
import { EvaluationResult } from '@/services/evaluationService';
import { getUserSkillProgress } from '@/services/progressionService';
import { UserSkillProgress } from '@/services/progressionService';
import { Difficulty, Skill } from '@/types/question';
import OGLCourses from '@/pages/OGLCourses';
import OGLTesterCourse from '@/pages/OGLTesterCourse';
import HCMCourse from '@/pages/HCMCourse';
import OGLContentDeveloperCourse from '@/pages/OGLContentDeveloperCourse';
import QATesterCourse from '@/pages/QATesterCourse';
import FusionDeveloperCourse from '@/pages/FusionDeveloperCourse';
import RedwoodDeveloperCourse from '@/pages/RedwoodDeveloperCourse';
import SCMCourse from '@/pages/SCMCourse';
import CXCourse from '@/pages/CXCourse';
import EPMCourse from '@/pages/EPMCourse';
import ERPCourse from '@/pages/ERPCourse';
import Evaluation from './Evaluation';
import OGLCoursesGrid from './OGLCoursesGrid';

const OGLDeveloper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [hasOGLAccess, setHasOGLAccess] = useState(false);
  const [evaluationStats, setEvaluationStats] = useState<Record<string, EvaluationResult>>({});
  const [skillProgression, setSkillProgression] = useState<Record<string, UserSkillProgress>>({});
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Check if we're on the base route (should show OGL courses grid)
  const isBaseRoute = location.pathname.endsWith('/careers/ogl-developer') || location.pathname.endsWith('/ogl-developer');

  // Define functions with useCallback to prevent unnecessary re-renders
  const checkUserAccess = useCallback(async () => {
    if (!user) return;
    try {
      const oglUnlocked = await checkOGLCoursesUnlock(user.uid);
      setHasOGLAccess(oglUnlocked);
    } catch (error) {
      console.error('Error checking OGL access:', error);
    }
  }, [user]);

  const loadSkillProgression = useCallback(async () => {
    if (!user) return;
    try {
      const skills = ['html', 'css', 'javascript', 'jquery', 'devtools'];
      const progression: Record<string, UserSkillProgress> = {};

      for (const skill of skills) {
        const progress = await getUserSkillProgress(user.uid, skill as Skill);
        progression[skill] = progress;
      }

      setSkillProgression(progression);
    } catch (error) {
      console.error('Error loading skill progression:', error);
    }
  }, [user]);

  const loadEvaluationStats = useCallback(async () => {
    if (!user) return;
    try {
      const stats = await getUserEvaluationResults(user.uid);
      setEvaluationStats(stats);
      await loadSkillProgression();
    } catch (error) {
      console.error('Error loading evaluation stats:', error);
    }
  }, [user, loadSkillProgression]);

  // Load user data when user changes
  useEffect(() => {
    if (user) {
      checkUserAccess();
      loadEvaluationStats();
    }
  }, [user, checkUserAccess, loadEvaluationStats]);

  // Handle URL-based navigation for tabs
  useEffect(() => {
    const path = location.pathname;
    const pathSegments = path.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    // If we're on the base OGL developer route, show the courses grid
    if (path.endsWith('/careers/ogl-developer') || path.endsWith('/ogl-developer')) {
      // Don't set any tab, let the Routes handle showing OGLCoursesGrid
      return;
    }
    
    if (lastSegment === 'overview' || lastSegment === 'journey' || lastSegment === 'progress' || lastSegment === 'evaluations' || lastSegment === 'hands-on') {
      setActiveTab(lastSegment);
    } else if (lastSegment === 'courses' && !path.includes('/courses/')) {
      setActiveTab('courses');
    }
  }, [location.pathname, navigate]);

  // Handle full-screen mode for hands-on tab
  useEffect(() => {
    if (activeTab === 'hands-on') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeTab]);



  const getSkillIcon = (skill: string) => {
    const icons = {
      html: Code,
      css: FileText,
      javascript: Brain,
      jquery: Settings,
      devtools: Wrench
    };
    return icons[skill as keyof typeof icons] || Code;
  };

  const dynamicEvaluationStats = Object.entries(evaluationStats).map(([skill, result]) => ({
    skill,
    icon: getSkillIcon(skill),
    passed: result.passed,
    score: `${result.score}/10`
  }));

  // Fallback static data if no evaluations taken yet
  const fallbackEvaluationStats = [
    { skill: 'html', icon: Code, passed: false, score: 'Not taken' },
    { skill: 'css', icon: FileText, passed: false, score: 'Not taken' },
    { skill: 'javascript', icon: Brain, passed: false, score: 'Not taken' },
    { skill: 'jquery', icon: Settings, passed: false, score: 'Not taken' },
    { skill: 'devtools', icon: Wrench, passed: false, score: 'Not taken' },
  ];

  const displayEvaluationStats = dynamicEvaluationStats.length > 0 ? dynamicEvaluationStats : fallbackEvaluationStats;

  const courseCategories = [
    {
      title: 'Core Development',
      courses: [
        { name: 'OGL Content Developer', icon: Code, href: '/ogl-developer/courses/content-developer' },
        { name: 'OGL Tester', icon: TestTube, href: '/ogl-developer/courses/tester' },
        { name: 'Fusion Developer', icon: Database, href: '/ogl-developer/courses/fusion-developer' },
        { name: 'Redwood Developer', icon: Wrench, href: '/ogl-developer/courses/redwood-developer' },
      ]
    },
    {
      title: 'Business Applications',
      courses: [
        { name: 'HCM Course', icon: Users, href: '/ogl-developer/courses/hcm' },
        { name: 'SCM Course', icon: Settings, href: '/ogl-developer/courses/scm' },
        { name: 'CX Course', icon: Target, href: '/ogl-developer/courses/cx' },
      ]
    },
    {
      title: 'Advanced Modules',
      courses: [
        { name: 'QA Tester', icon: TestTube, href: '/ogl-developer/courses/qa-tester' },
        { name: 'EPM Course', icon: BookOpen, href: '/ogl-developer/courses/epm' },
        { name: 'ERP Course', icon: Database, href: '/ogl-developer/courses/erp' },
      ]
    }
  ];

  return (
    <div className={`h-full bg-gradient-to-br from-slate-50 to-blue-50 ${activeTab === 'hands-on' ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className={`h-full space-y-8 ${activeTab === 'hands-on' ? 'p-2' : 'p-6'}`}>
        {/* Only show header and tabs if not on base route */}
        {!isBaseRoute && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">OGL Developer Hub</h1>
                  <p className="text-gray-600">Master Oracle Guided Learning technologies</p>
                </div>
              </div>
              {hasOGLAccess && (
                <Badge className="bg-green-500">
                  <Trophy className="h-4 w-4 mr-2" />
                  OGL Access Unlocked
                </Badge>
              )}
            </motion.div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              // Navigate to the appropriate URL
              const basePath = location.pathname.split('/').slice(0, -1).join('/') || location.pathname;
              navigate(`${basePath}/${value}`);
            }} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="journey">Course Journey</TabsTrigger>
                <TabsTrigger value="evaluations">Skill Evaluations</TabsTrigger>
                <TabsTrigger value="courses">OGL Courses</TabsTrigger>
                <TabsTrigger value="hands-on">Hands-on OGL Environment</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome to OGL Developer Platform</h2>
                    <p className="text-indigo-100 mt-2">
                      Master Oracle technologies through comprehensive courses and skill evaluations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Take Evaluation</h3>
                    <p className="text-sm text-gray-600">Test your skills</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-3"
                  onClick={() => setActiveTab('evaluations')}
                >
                  Start Evaluation
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Browse Courses</h3>
                    <p className="text-sm text-gray-600">Learn new skills</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-3"
                  onClick={() => setActiveTab('courses')}
                  disabled={!hasOGLAccess}
                >
                  {hasOGLAccess ? 'View Courses' : 'Unlock Courses'}
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Track Progress</h3>
                    <p className="text-sm text-gray-600">Monitor achievements</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => setActiveTab('progress')}
                >
                  View Progress
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Mentor</h3>
                    <p className="text-sm text-gray-600">Get guidance</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => navigate('/ai-assistant')}
                >
                  Ask AI
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            {/* OGL Course Journey Timeline */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">OGL Developer Journey</h2>
                    <p className="text-purple-100 mt-2">
                      Choose your path: Learn from basics or prove your existing skills
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Path Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beginner Path */}
              <Card className="border-2 border-blue-500 bg-blue-50 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <BookOpen className="h-6 w-6" />
                    Beginner Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>New to web development?</strong> Start from the fundamentals and build your skills step by step.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Learning Path:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Study HTML fundamentals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Learn CSS styling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Master JavaScript basics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Explore jQuery & DevTools</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Take skill evaluations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Unlock OGL courses</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate('/learn/html')}
                    >
                      Start Learning Journey
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Experienced Path */}
              <Card className="border-2 border-green-500 bg-green-50 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Trophy className="h-6 w-6" />
                    Experienced Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Already know web development?</strong> Take our skill evaluations to prove your knowledge and fast-track to OGL courses.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Quick Assessment:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Take HTML evaluation test</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Take CSS evaluation test</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Take JavaScript evaluation test</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Take jQuery & DevTools tests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Pass 3+ tests → Unlock OGL</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Access Oracle specializations</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setActiveTab('evaluations')}
                    >
                      Take Skill Evaluations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Adaptive Journey Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Your Personalized Journey
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Timeline adapts based on your current skill level and progress
                </p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"></div>
                  
                  {/* Dynamic Timeline Steps */}
                  <div className="space-y-8">
                    {/* Step 0: Choose Your Path (Always visible for new users) */}
                    {Object.keys(evaluationStats).length === 0 && (
                      <div className="relative flex items-start gap-6">
                        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white border-indigo-500">
                          <span className="text-indigo-600 font-bold">?</span>
                        </div>
                        <Card className="flex-1 p-6 border-indigo-500 bg-indigo-50">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">Choose Your Starting Point</h3>
                              <p className="text-gray-600">Are you new to web development or do you have existing knowledge?</p>
                            </div>
                            <Badge className="bg-indigo-500">Start Here</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-blue-700">New to Web Dev</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Start with HTML basics and learn step by step</p>
                              <Button 
                                size="sm" 
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => navigate('/learn/html')}
                              >
                                Start Learning
                              </Button>
                            </div>
                            <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-700">Have Experience</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Take tests to prove your skills quickly</p>
                              <Button 
                                size="sm" 
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={() => setActiveTab('evaluations')}
                              >
                                Take Tests
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                    {/* Step 1: Foundation Skills - Dynamic based on user progress */}
                    <div className="relative flex items-start gap-6">
                      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                        ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) 
                          ? 'bg-green-500 border-green-300' 
                          : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed)
                          ? 'bg-yellow-500 border-yellow-300'
                          : 'bg-white border-blue-500'
                      }`}>
                        {['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) ? (
                          <CheckCircle className="h-8 w-8 text-white" />
                        ) : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed) ? (
                          <span className="text-white font-bold">⚡</span>
                        ) : (
                          <span className="text-blue-600 font-bold">1</span>
                        )}
                      </div>
                      <Card className={`flex-1 p-6 ${
                        ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) 
                          ? 'border-green-500 bg-green-50' 
                          : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed)
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-blue-500 bg-blue-50'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Foundation Skills</h3>
                            <p className="text-gray-600">
                              {['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) 
                                ? 'All foundation skills mastered!' 
                                : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed)
                                ? 'Some skills completed - keep going!'
                                : 'Master web development fundamentals'
                              }
                            </p>
                          </div>
                          <Badge className={
                            ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) 
                              ? 'bg-green-500' 
                              : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed)
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }>
                            {['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) 
                              ? 'Completed' 
                              : ['html', 'css', 'javascript'].some(skill => evaluationStats[skill]?.passed)
                              ? 'In Progress'
                              : 'Start Here'
                            }
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {['html', 'css', 'javascript'].map(skill => {
                            const evaluation = evaluationStats[skill];
                            const Icon = getSkillIcon(skill);
                            const hasEvaluation = evaluation !== undefined;
                            const passed = evaluation?.passed || false;
                            
                            return (
                              <div key={skill} className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                                passed ? 'bg-green-100 border-green-300' : 
                                hasEvaluation ? 'bg-red-100 border-red-300' : 
                                'bg-white border-gray-200'
                              }`}>
                                <Icon className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                  <p className="font-medium capitalize">{skill}</p>
                                  <div className="flex items-center gap-1">
                                    {passed ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : hasEvaluation ? (
                                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✗</span>
                                      </div>
                                    ) : (
                                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                                    )}
                                    <span className="text-xs text-gray-600">
                                      {hasEvaluation ? `${evaluation.score}/10` : 'Not taken'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Dynamic Action Buttons */}
                        <div className="flex gap-2">
                          {['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) ? (
                            <Button 
                              onClick={() => setActiveTab('evaluations')}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              Review Skills
                            </Button>
                          ) : (
                            <>
                              <Button 
                                onClick={() => navigate('/learn/html')}
                                variant="outline"
                                className="flex-1"
                              >
                                Study First
                              </Button>
                              <Button 
                                onClick={() => setActiveTab('evaluations')}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                              >
                                Take Tests
                              </Button>
                            </>
                          )}
                        </div>
                      </Card>
                    </div>

                    {/* Step 2: Advanced Skills - Dynamic based on prerequisites and progress */}
                    <div className="relative flex items-start gap-6">
                      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                        ['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) 
                          ? 'bg-green-500 border-green-300' 
                          : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed)
                          ? ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed)
                            ? 'bg-yellow-500 border-yellow-300'
                            : 'bg-white border-purple-500'
                          : 'bg-gray-200 border-gray-300'
                      }`}>
                        {['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) ? (
                          <CheckCircle className="h-8 w-8 text-white" />
                        ) : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) ? (
                          ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed) ? (
                            <span className="text-white font-bold">⚡</span>
                          ) : (
                            <span className="text-purple-600 font-bold">2</span>
                          )
                        ) : (
                          <span className="text-gray-400 font-bold">🔒</span>
                        )}
                      </div>
                      <Card className={`flex-1 p-6 ${
                        ['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) 
                          ? 'border-green-500 bg-green-50' 
                          : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed)
                          ? ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed)
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 bg-gray-50 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Advanced Skills</h3>
                            <p className="text-gray-600">
                              {['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) 
                                ? 'Advanced skills mastered!' 
                                : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed)
                                ? ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed)
                                  ? 'Making progress on advanced skills!'
                                  : 'Ready for jQuery and Developer Tools'
                                : 'Complete foundation skills first'
                              }
                            </p>
                          </div>
                          <Badge className={
                            ['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) 
                              ? 'bg-green-500' 
                              : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed)
                              ? ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed)
                                ? 'bg-yellow-500'
                                : 'bg-purple-500'
                              : 'bg-gray-400'
                          }>
                            {['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) 
                              ? 'Completed' 
                              : ['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed)
                              ? ['jquery', 'devtools'].some(skill => evaluationStats[skill]?.passed)
                                ? 'In Progress'
                                : 'Available'
                              : 'Locked'
                            }
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {['jquery', 'devtools'].map(skill => {
                            const evaluation = evaluationStats[skill];
                            const Icon = getSkillIcon(skill);
                            const hasEvaluation = evaluation !== undefined;
                            const passed = evaluation?.passed || false;
                            const isLocked = !['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed);
                            
                            return (
                              <div key={skill} className={`flex items-center gap-2 p-3 rounded-lg border-2 ${
                                isLocked ? 'bg-gray-100 border-gray-200 opacity-50' :
                                passed ? 'bg-green-100 border-green-300' : 
                                hasEvaluation ? 'bg-red-100 border-red-300' : 
                                'bg-white border-gray-200'
                              }`}>
                                <Icon className="h-5 w-5 text-purple-600" />
                                <div className="flex-1">
                                  <p className="font-medium capitalize">{skill === 'devtools' ? 'Dev Tools' : skill}</p>
                                  <div className="flex items-center gap-1">
                                    {isLocked ? (
                                      <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">🔒</span>
                                      </div>
                                    ) : passed ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : hasEvaluation ? (
                                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✗</span>
                                      </div>
                                    ) : (
                                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                                    )}
                                    <span className="text-xs text-gray-600">
                                      {isLocked ? 'Locked' : hasEvaluation ? `${evaluation.score}/10` : 'Not taken'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Dynamic Action Buttons */}
                        <div className="flex gap-2">
                          {!['html', 'css', 'javascript'].every(skill => evaluationStats[skill]?.passed) ? (
                            <Button 
                              disabled
                              className="w-full"
                            >
                              Complete Foundation Skills First
                            </Button>
                          ) : ['jquery', 'devtools'].every(skill => evaluationStats[skill]?.passed) ? (
                            <Button 
                              onClick={() => setActiveTab('evaluations')}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              Review Skills
                            </Button>
                          ) : (
                            <>
                              <Button 
                                onClick={() => navigate('/learn/javascript')}
                                variant="outline"
                                className="flex-1"
                              >
                                Study jQuery
                              </Button>
                              <Button 
                                onClick={() => setActiveTab('evaluations')}
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                              >
                                Take Tests
                              </Button>
                            </>
                          )}
                        </div>
                      </Card>
                    </div>

                    {/* Step 3: OGL Courses Access - Dynamic based on skill completion */}
                    <div className="relative flex items-start gap-6">
                      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                        hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                          ? 'bg-green-500 border-green-300' 
                          : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1
                          ? 'bg-white border-indigo-500'
                          : 'bg-gray-200 border-gray-300'
                      }`}>
                        {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3 ? (
                          <Trophy className="h-8 w-8 text-white" />
                        ) : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1 ? (
                          <span className="text-indigo-600 font-bold">3</span>
                        ) : (
                          <span className="text-gray-400 font-bold">🔒</span>
                        )}
                      </div>
                      <Card className={`flex-1 p-6 ${
                        hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                          ? 'border-green-500 bg-green-50' 
                          : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 bg-gray-50 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">OGL Courses Access</h3>
                            <p className="text-gray-600">
                              {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                                ? 'Oracle Guided Learning platform unlocked!' 
                                : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1
                                ? `${Object.values(evaluationStats).filter(stat => stat.passed).length}/3 skills completed - almost there!`
                                : 'Pass 3 skill evaluations to unlock Oracle courses'
                              }
                            </p>
                          </div>
                          <Badge className={
                            hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                              ? 'bg-green-500' 
                              : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1
                              ? 'bg-indigo-500'
                              : 'bg-gray-400'
                          }>
                            {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                              ? 'Unlocked' 
                              : Object.values(evaluationStats).filter(stat => stat.passed).length >= 1
                              ? 'Almost There'
                              : 'Locked'
                            }
                          </Badge>
                        </div>
                        
                        {/* Progress Visualization */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className={`h-5 w-5 ${
                              hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                                ? 'text-green-600' 
                                : 'text-indigo-600'
                            }`} />
                            <span className="font-medium">
                              {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                                ? 'Requirements Met!' 
                                : 'Progress Toward Unlock:'
                              }
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                              ? 'All requirements completed - Oracle courses are now available' 
                              : 'Pass skill evaluations to unlock comprehensive Oracle courses'
                            }
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Progress:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${
                                  hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                                    ? 'bg-green-600 w-full' 
                                    : 'bg-indigo-600'
                                }`}
                                style={{ 
                                  width: hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                                    ? '100%' 
                                    : `${Math.min((Object.values(evaluationStats).filter(stat => stat.passed).length / 3) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.min(Object.values(evaluationStats).filter(stat => stat.passed).length, 3)}/3
                            </span>
                          </div>
                        </div>
                        
                        {/* Skills Progress Grid */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          {['html', 'css', 'javascript', 'jquery', 'devtools'].map(skill => {
                            const evaluation = evaluationStats[skill];
                            const passed = evaluation?.passed || false;
                            return (
                              <div key={skill} className={`p-2 rounded text-center text-xs ${
                                passed ? 'bg-green-200 text-green-800' : 
                                evaluation ? 'bg-red-200 text-red-800' : 
                                'bg-gray-200 text-gray-600'
                              }`}>
                                <div className="font-medium capitalize">{skill}</div>
                                <div>{passed ? '✓' : evaluation ? '✗' : '○'}</div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <Button 
                          onClick={() => setActiveTab(hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3 ? 'courses' : 'evaluations')}
                          disabled={Object.values(evaluationStats).filter(stat => stat.passed).length === 0}
                          className={
                            hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                              ? 'w-full bg-green-600 hover:bg-green-700' 
                              : 'w-full bg-indigo-600 hover:bg-indigo-700'
                          }
                        >
                          {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                            ? 'Browse OGL Courses' 
                            : Object.values(evaluationStats).filter(stat => stat.passed).length > 0
                            ? 'Continue Evaluations'
                            : 'Start Skill Evaluations'
                          }
                        </Button>
                      </Card>
                    </div>

                    {/* Step 4: Specialization - Only show when OGL is unlocked */}
                    {(hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3) && (
                      <div className="relative flex items-start gap-6">
                        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white border-amber-500">
                          <span className="text-amber-600 font-bold">4</span>
                        </div>
                        <Card className="flex-1 p-6 border-amber-500 bg-amber-50">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">Choose Your Specialization</h3>
                              <p className="text-gray-600">Select your Oracle career path and become an expert</p>
                            </div>
                            <Badge className="bg-amber-500">Available</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {[
                              { name: 'Content Developer', icon: Code, path: '/ogl-developer/courses/content-developer' },
                              { name: 'OGL Tester', icon: TestTube, path: '/ogl-developer/courses/tester' },
                              { name: 'Fusion Developer', icon: Database, path: '/ogl-developer/courses/fusion-developer' },
                              { name: 'HCM Specialist', icon: Users, path: '/ogl-developer/courses/hcm' }
                            ].map((specialization) => {
                              const Icon = specialization.icon;
                              return (
                                <div 
                                  key={specialization.name} 
                                  className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-amber-200 hover:border-amber-400 cursor-pointer transition-all"
                                  onClick={() => navigate(specialization.path)}
                                >
                                  <Icon className="h-5 w-5 text-amber-600" />
                                  <span className="text-sm font-medium">{specialization.name}</span>
                                </div>
                              );
                            })}
                          </div>
                          <Button 
                            onClick={() => setActiveTab('courses')}
                            className="w-full bg-amber-600 hover:bg-amber-700"
                          >
                            Explore All Specializations
                          </Button>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Journey Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {Object.values(evaluationStats).filter(stat => stat.passed).length}
                    </div>
                    <p className="text-gray-600">Skills Mastered</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Object.values(evaluationStats).length > 0 
                        ? Math.round(Object.values(evaluationStats).reduce((acc, stat) => acc + stat.score, 0) / Object.values(evaluationStats).length)
                        : 0}%
                    </div>
                    <p className="text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                        ? '100' 
                        : Math.round((Object.values(evaluationStats).filter(stat => stat.passed).length / 5) * 100)}%
                    </div>
                    <p className="text-gray-600">Journey Progress</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3 ? '✓' : '○'}
                    </div>
                    <p className="text-gray-600">OGL Access</p>
                  </div>
                </div>
                
                {/* Journey Status Message */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {Object.keys(evaluationStats).length === 0 
                        ? '🚀 Ready to Start Your Journey?' 
                        : hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                        ? '🎉 Congratulations! OGL Developer Path Unlocked!'
                        : Object.values(evaluationStats).filter(stat => stat.passed).length > 0
                        ? '⚡ Great Progress! Keep Going!'
                        : '📚 Time to Prove Your Skills!'
                      }
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {Object.keys(evaluationStats).length === 0 
                        ? 'Choose your learning path above - study first or take tests to prove existing knowledge.' 
                        : hasOGLAccess || Object.values(evaluationStats).filter(stat => stat.passed).length >= 3
                        ? 'You can now access all Oracle Guided Learning courses and choose your specialization.'
                        : Object.values(evaluationStats).filter(stat => stat.passed).length > 0
                        ? `You've passed ${Object.values(evaluationStats).filter(stat => stat.passed).length} skill(s). Pass ${3 - Object.values(evaluationStats).filter(stat => stat.passed).length} more to unlock OGL courses.`
                        : 'Take skill evaluations or study the fundamentals first - the choice is yours!'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-6">
            {!selectedSkill ? (
              <>
                {/* Skill Selection */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-6 w-6" />
                      Choose a Skill to Evaluate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['html', 'css', 'javascript', 'jquery', 'devtools'].map((skill) => {
                        const Icon = getSkillIcon(skill);
                        const progress = skillProgression[skill];
                        const currentLevel = progress?.currentLevel || 'easy';
                        const completedLevels = progress?.completedLevels.length || 0;

                        return (
                          <Card key={skill} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedSkill(skill)}>
                            <div className="flex items-start gap-3 mb-3">
                              <Icon className="h-8 w-8 text-blue-600 mt-1" />
                              <div className="flex-1">
                                <h3 className="font-semibold capitalize">{skill}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">
                                    Current: {currentLevel}
                                  </Badge>
                                  <Badge variant="secondary">
                                    {completedLevels}/4 levels
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Progress through easy, medium, hard, and advanced levels
                                </p>
                              </div>
                            </div>
                            <Button className="w-full">
                              Select {skill.charAt(0).toUpperCase() + skill.slice(1)}
                            </Button>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Level Selection for Selected Skill */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {(() => {
                          const Icon = getSkillIcon(selectedSkill);
                          return <Icon className="h-6 w-6" />;
                        })()} {selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1)} Levels
                      </CardTitle>
                      <Button variant="outline" onClick={() => setSelectedSkill(null)}>
                        Back to Skills
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {(['easy', 'medium', 'hard', 'advanced'] as const).map((level) => {
                        const progress = skillProgression[selectedSkill];
                        const levelScore = progress?.levelScores[level] || 0;
                        const isCompleted = progress?.completedLevels.includes(level) || false;
                        // Check if user can take this level (synchronous check based on current level)
                        const levelOrder: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];
                        const currentIndex = levelOrder.indexOf(progress?.currentLevel || 'easy');
                        const requestedIndex = levelOrder.indexOf(level);
                        const canTake = requestedIndex <= currentIndex;
                        const currentLevel = progress?.currentLevel === level;
                        const isLocked = !canTake && !isCompleted;

                        return (
                          <Card key={level} className={`p-6 transition-all ${currentLevel ? 'border-blue-500 bg-blue-50' : isCompleted ? 'border-green-500 bg-green-50' : isLocked ? 'opacity-50' : 'hover:shadow-md'}`}>
                            <div className="text-center">
                              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                                isCompleted ? 'bg-green-500' : currentLevel ? 'bg-blue-500' : isLocked ? 'bg-gray-300' : 'bg-gray-100'
                              }`}>
                                {isCompleted ? (
                                  <Trophy className="h-6 w-6 text-white" />
                                ) : currentLevel ? (
                                  <Target className="h-6 w-6 text-white" />
                                ) : isLocked ? (
                                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                ) : (
                                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                                )}
                              </div>

                              <h3 className="font-semibold mb-1 capitalize">{level} Level</h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {level === 'easy' && 'Basic concepts and fundamentals'}
                                {level === 'medium' && 'Intermediate knowledge and best practices'}
                                {level === 'hard' && 'Advanced techniques and complex scenarios'}
                                {level === 'advanced' && 'Expert-level understanding and mastery'}
                              </p>

                              <div className="mb-3">
                                <div className="text-lg font-bold">
                                  {levelScore}/10
                                </div>
                                {isCompleted && <Badge className="bg-green-500 mt-1">Passed</Badge>}
                                {currentLevel && !isCompleted && <Badge className="bg-blue-500 mt-1">Current Level</Badge>}
                                {isLocked && <Badge variant="outline" className="mt-1">🔒 Locked</Badge>}
                              </div>

                              <Button
                                className="w-full"
                                disabled={isLocked}
                                onClick={() => {
                                  const testUrl = `/test/${selectedSkill}/${level}`;
                                  window.open(testUrl, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                {currentLevel ? 'Take Test' :
                                 isCompleted ? 'Retake' :
                                 isLocked ? 'Complete Previous Levels' :
                                 'Take Test'}
                              </Button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Progress Summary */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Progress Summary</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Completed Levels:</span>
                        <div className="flex gap-1">
                          {(['easy', 'medium', 'hard', 'advanced'] as const).map((level) => (
                            <Badge
                              key={level}
                              variant={skillProgression[selectedSkill]?.completedLevels.includes(level) ? "default" : "outline"}
                              className="text-xs"
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Complete {selectedSkill.toUpperCase()} Advanced level to unlock OGL courses!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {hasOGLAccess ? (
              <>
                {/* Course Access Unlocked */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Trophy className="h-8 w-8" />
                      <div>
                        <h2 className="text-2xl font-bold">OGL Courses Unlocked!</h2>
                        <p className="text-green-100 mt-2">
                          You've passed 3+ skill evaluations. Access all Oracle Guided Learning courses below.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Categories */}
                {courseCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.courses.map((course, courseIndex) => {
                          const Icon = course.icon;
                          return (
                            <Card key={courseIndex} className="p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3 mb-3">
                                <Icon className="h-6 w-6 text-blue-600 mt-1" />
                                <div className="flex-1">
                                  <h3 className="font-semibold">{course.name}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Master {course.name.toLowerCase()} concepts and best practices
                                  </p>
                                </div>
                              </div>
                              <Button className="w-full" onClick={() => navigate(course.href)}>
                                Start Course
                              </Button>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              /* Course Access Required */
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Target className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">OGL Courses Coming Soon!</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Complete skill evaluations to unlock access to comprehensive Oracle Guided Learning courses.
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-500">Progress to unlock:</p>
                      <div className="flex justify-center gap-2">
                        {displayEvaluationStats.map((stat, index) => (
                          <Badge key={index} variant={stat.passed && stat.score !== 'Not taken' ? 'default' : 'secondary'}>
                            {stat.skill}: {stat.passed ? '✅' : '❌'}
                          </Badge>
                        ))}
                      </div>
                     </div>
                    <Button onClick={() => setActiveTab('evaluations')}>
                      Take Skill Evaluations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="hands-on" className="space-y-6">
            {/* OGL Environment Simulation */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Wrench className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Hands-on OGL Environment</h2>
                    <p className="text-teal-100 mt-2">
                      Practice with real Oracle tools and environments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access Status Banner */}
            {!hasOGLAccess && (
              <Card className="border-2 border-orange-500 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-900">Preview Mode</h3>
                      <p className="text-orange-700 text-sm">
                        This is a preview of the OGL environment. Complete 3+ skill evaluations to unlock full interactive access.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* OGL Environment Launcher */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  Oracle Guided Learning Environment
                </CardTitle>
                <p className="text-gray-600">
                  {hasOGLAccess 
                    ? 'Access the full OGL platform with real Oracle tools and content management'
                    : 'Preview the OGL interface - full access available after completing skill evaluations'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full py-3 text-lg ${
                    hasOGLAccess 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                  onClick={() => {
                    if (hasOGLAccess) {
                      window.open('/ogl-environment', '_blank', 'noopener,noreferrer');
                    } else {
                      setActiveTab('evaluations');
                    }
                  }}
                >
                  {hasOGLAccess ? '🚀 Launch OGL Test Environment' : '📚 Complete Evaluations to Unlock'}
                </Button>
              </CardContent>
            </Card>

            {/* Environment Preview - Always Visible */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Environment Preview</CardTitle>
                <p className="text-gray-600">
                  {hasOGLAccess 
                    ? 'Interactive preview of your OGL workspace'
                    : 'Static preview - become interactive after unlocking access'
                  }
                </p>
              </CardHeader>
              <CardContent>
                {/* OGL Interface Replica */}
                <div className={`bg-gray-100 rounded-lg p-4 border-2 border-gray-300 ${!hasOGLAccess ? 'opacity-75' : ''}`}>
                  {/* Top Navigation Bar */}
                  <div className="bg-red-600 text-white p-2 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">O</span>
                        </div>
                        <span className="font-semibold">Oracle Guided Learning</span>
                      </div>
                      <div className="text-sm bg-red-700 px-2 py-1 rounded">PREMIUM</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>🔥 162</span>
                      <span>sugarAumar.samal@oracle.com</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="bg-white border-x-2 border-gray-300 min-h-96">
                    {/* Secondary Navigation */}
                    <div className="bg-gray-800 text-white p-3 flex items-center gap-4">
                      <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm" disabled={!hasOGLAccess}>
                        <option>Base Content Development</option>
                        <option>Advanced Content</option>
                        <option>Testing Modules</option>
                      </select>
                      <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm" disabled={!hasOGLAccess}>
                        <option>HCM 25D</option>
                        <option>SCM 25D</option>
                        <option>CX 25D</option>
                      </select>
                    </div>

                    {/* Main Content Layout */}
                    <div className="flex">
                      {/* Left Sidebar */}
                      <div className="w-64 bg-gray-50 border-r border-gray-300 p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <span>🏠</span> Home
                          </div>
                          <div className="ml-4 space-y-1 text-sm">
                            <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                              <span>📁</span> My Content
                            </div>
                            <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                              <span>📦</span> Archive (0)
                            </div>
                            <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                              <span>⚙️</span> Settings
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <div className="text-sm font-medium text-gray-600 mb-2">Library</div>
                            <div className="ml-2 space-y-1 text-sm">
                              <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>📚</span> Use Cases
                              </div>
                              <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>�</span> User Guides
                              </div>
                              <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>🎯</span> Oracle Content
                              </div>
                            </div>
                          </div>

                          <div className="pt-4">
                            <div className="text-sm font-medium text-gray-600 mb-2">Analytics & Reports</div>
                            <div className="ml-2 space-y-1 text-sm">
                              <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>📊</span> Dashboards
                              </div>
                              <div className={`flex items-center gap-2 p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed'}`}>
                                <span>📈</span> Reports
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex-1 p-6">
                        {/* Content Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold">My Content</h2>
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                placeholder="Search..." 
                                className="px-3 py-1 border border-gray-300 rounded text-sm"
                                disabled={!hasOGLAccess}
                              />
                              <Button size="sm" variant="outline" disabled={!hasOGLAccess}>🔍</Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={!hasOGLAccess}>
                              Create +
                            </Button>
                            <Button size="sm" variant="outline" disabled={!hasOGLAccess}>
                              Filters (0) ≡
                            </Button>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {/* Content Cards */}
                          {[
                            { title: 'Candidate Search - Keyword - Redwood', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Add Candidate - Source - Redwood', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Create Job Requisition: Custom Posting', status: 'DRAFT', type: 'Recent' },
                            { title: 'Candidate Search - Landing Page - Redwood', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Manage Enterprise HCM Information-Employment Model', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Manage Departments for HR Specialists-Correcting Effective Start Date', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Manage Participant Feedback for the Performance Evaluation', status: 'DRAFT', type: 'Smart Tip' },
                            { title: 'Manage Grade Ladders-Legislative Data Group', status: 'DRAFT', type: 'Smart Tip' }
                          ].map((item, index) => (
                            <Card key={index} className={`p-3 transition-shadow border border-gray-200 ${hasOGLAccess ? 'hover:shadow-md cursor-pointer' : 'cursor-not-allowed'}`}>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {item.type}
                                  </Badge>
                                  <Badge 
                                    variant={item.status === 'DRAFT' ? 'secondary' : 'default'}
                                    className="text-xs"
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                                <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>apiName: {item.title.toLowerCase().replace(/\s+/g, '').substring(0, 8)}</span>
                                  <div className="flex gap-1">
                                    <button className={`p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-100' : 'cursor-not-allowed'}`} disabled={!hasOGLAccess}>📝</button>
                                    <button className={`p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-100' : 'cursor-not-allowed'}`} disabled={!hasOGLAccess}>👁️</button>
                                    <button className={`p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-100' : 'cursor-not-allowed'}`} disabled={!hasOGLAccess}>⚙️</button>
                                    <button className={`p-1 rounded ${hasOGLAccess ? 'hover:bg-gray-100' : 'cursor-not-allowed'}`} disabled={!hasOGLAccess}>⋮</button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center mt-6 gap-2">
                          <Button size="sm" variant="outline" disabled={!hasOGLAccess}>‹</Button>
                          <Button size="sm" variant="outline" disabled={!hasOGLAccess}>1</Button>
                          <Button size="sm" variant="outline" disabled={!hasOGLAccess}>2</Button>
                          <Button size="sm" variant="outline" disabled={!hasOGLAccess}>3</Button>
                          <Button size="sm" variant="outline" disabled={!hasOGLAccess}>›</Button>
                        </div>
                      </div>

                      {/* Right Sidebar - Filters */}
                      <div className="w-64 bg-gray-50 border-l border-gray-300 p-4">
                        <h3 className="font-semibold mb-4">Filters</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Label</label>
                            <input 
                              type="text" 
                              placeholder="Filter by labels" 
                              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              disabled={!hasOGLAccess}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Product</label>
                            <div className="mt-2 space-y-1 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" disabled={!hasOGLAccess} />
                                Human Capital Management
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" disabled={!hasOGLAccess} />
                                {"<Not Assigned>"}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Module</label>
                            <div className="mt-2 space-y-1 text-sm">
                              <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" disabled={!hasOGLAccess} />
                                Absence Management
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" disabled={!hasOGLAccess} />
                                Benefits
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" disabled={!hasOGLAccess} />
                                Certificate
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status Bar */}
                  <div className="bg-gray-200 p-2 rounded-b-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span>🔍 Search</span>
                      <span>📊 Analytics</span>
                      <span>⚙️ Settings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Status: {hasOGLAccess ? 'Connected' : 'Preview Mode'}</span>
                      <span>•</span>
                      <span>12:30 2024</span>
                    </div>
                  </div>
                </div>

                <div className={`mt-4 p-4 rounded-lg ${hasOGLAccess ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <h4 className={`font-semibold mb-2 ${hasOGLAccess ? 'text-blue-900' : 'text-orange-900'}`}>
                    {hasOGLAccess ? '🎯 Interactive Features Available:' : '🔒 Features Available After Unlock:'}
                  </h4>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${hasOGLAccess ? 'text-blue-800' : 'text-orange-800'}`}>
                    <div>• Create and manage content</div>
                    <div>• Test HCM workflows</div>
                    <div>• Practice with real Oracle tools</div>
                    <div>• Access learning modules</div>
                    <div>• Collaborate with team members</div>
                    <div>• Generate reports and analytics</div>
                  </div>
                  {!hasOGLAccess && (
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => setActiveTab('evaluations')}
                      >
                        Complete Evaluations to Unlock
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Progress Overview */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Your Learning Progress</h2>
                    <p className="text-orange-100 mt-2">
                      Track your achievements and skill development
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Evaluations Taken</p>
                    <p className="text-2xl font-bold">{Object.keys(evaluationStats).length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Skills Passed</p>
                    <p className="text-2xl font-bold">
                      {Object.values(evaluationStats).filter(stat => stat.passed).length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">OGL Access</p>
                    <p className="text-2xl font-bold">{hasOGLAccess ? 'Unlocked' : 'Locked'}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Skill Progress Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Skill Progress Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['html', 'css', 'javascript', 'jquery', 'devtools'].map((skill) => {
                    const Icon = getSkillIcon(skill);
                    const progress = skillProgression[skill];
                    const evaluation = evaluationStats[skill];
                    const completedLevels = progress?.completedLevels.length || 0;
                    const totalLevels = 4; // easy, medium, hard, advanced

                    return (
                      <div key={skill} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold capitalize">{skill}</h3>
                              <p className="text-sm text-gray-600">
                                {completedLevels} of {totalLevels} levels completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {evaluation ? (
                              <>
                                <Badge variant={evaluation.passed ? 'default' : 'destructive'}>
                                  {evaluation.passed ? 'Passed' : 'Failed'}
                                </Badge>
                                <p className="text-sm text-gray-600 mt-1">
                                  Score: {evaluation.score}%
                                </p>
                              </>
                            ) : (
                              <Badge variant="outline">Not Taken</Badge>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(completedLevels / totalLevels) * 100}%` }}
                          ></div>
                        </div>

                        {/* Level Badges */}
                        <div className="flex gap-2 flex-wrap">
                          {(['easy', 'medium', 'hard', 'advanced'] as const).map((level) => (
                            <Badge
                              key={level}
                              variant={progress?.completedLevels.includes(level) ? 'default' : 'outline'}
                              className="text-xs"
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <Button 
                    className="flex-1"
                    onClick={() => setActiveTab('evaluations')}
                  >
                    Continue Evaluations
                  </Button>
                  {hasOGLAccess && (
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setActiveTab('courses')}
                    >
                      View Courses
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </>
        )}

        {/* Sub-Routes for OGL Courses and other nested pages */}
        <Routes>
          {/* Default route shows OGL courses grid */}
          <Route path="/" element={<OGLCoursesGrid />} />
          <Route path="courses/ogl-courses" element={<OGLCourses />} />
          <Route path="courses/tester" element={<OGLTesterCourse />} />
          <Route path="courses/content-developer" element={<OGLContentDeveloperCourse />} />
          <Route path="courses/qa-tester" element={<QATesterCourse />} />
          <Route path="courses/fusion-developer" element={<FusionDeveloperCourse />} />
          <Route path="courses/redwood-developer" element={<RedwoodDeveloperCourse />} />
          <Route path="courses/hcm" element={<HCMCourse />} />
          <Route path="courses/scm" element={<SCMCourse />} />
          <Route path="courses/cx" element={<CXCourse />} />
          <Route path="courses/epm" element={<EPMCourse />} />
          <Route path="courses/erp" element={<ERPCourse />} />
          <Route path="evaluation/:skill" element={<Evaluation />} />
          {/* Handle tab navigation - these don't render anything, just for URL handling */}
          <Route path="overview" element={<></>} />
          <Route path="journey" element={<></>} />
          <Route path="progress" element={<></>} />
          <Route path="evaluations" element={<></>} />
          <Route path="courses" element={<></>} />
          <Route path="hands-on" element={<></>} />
        </Routes>
      </div>
    </div>
  );
};

export default OGLDeveloper;
