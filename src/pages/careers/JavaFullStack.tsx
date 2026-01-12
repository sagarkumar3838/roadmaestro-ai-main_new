import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Code,
  Database,
  Globe,
  Server,
  CheckCircle,
  GraduationCap,
  TestTube,
  BookOpen,
  Users,
  Target,
  Trophy,
  Brain,
  FileText,
  Settings,
  Wrench,
  Coffee,
  Layers,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEvaluationResults, EvaluationResult } from '@/services/evaluationService';
import { getUserSkillProgress, UserSkillProgress } from '@/services/progressionService';
import { Difficulty } from '@/types/question';
import { CourseJourneyDashboard } from '@/components/course/CourseJourneyDashboard';

export default function JavaFullStack() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [evaluationStats, setEvaluationStats] = useState<Record<string, EvaluationResult>>({});
  const [skillProgression, setSkillProgression] = useState<Record<string, UserSkillProgress>>({});
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hasJavaAccess, setHasJavaAccess] = useState(false);

  useEffect(() => {
    if (user) {
      loadEvaluationStats();
      checkJavaAccess();
    }
  }, [user]);

  const loadEvaluationStats = async () => {
    if (!user) return;
    try {
      const stats = await getUserEvaluationResults(user.uid);
      setEvaluationStats(stats);
      await loadSkillProgression();
    } catch (error) {
      console.error('Error loading evaluation stats:', error);
    }
  };

  const loadSkillProgression = async () => {
    if (!user) return;
    try {
      const javaSkills = ['java', 'spring', 'angular', 'mysql', 'hibernate'];
      const progression: Record<string, UserSkillProgress> = {};

      for (const skill of javaSkills) {
        const progress = await getUserSkillProgress(user.uid, skill as any);
        progression[skill] = progress;
      }

      setSkillProgression(progression);
    } catch (error) {
      console.error('Error loading skill progression:', error);
    }
  };

  const checkJavaAccess = () => {
    // Check if user has completed basic web skills to unlock Java path
    const webSkillsPassed = ['html', 'css', 'javascript'].every(skill => 
      evaluationStats[skill]?.passed
    );
    setHasJavaAccess(webSkillsPassed);
  };

  const getSkillIcon = (skill: string) => {
    const icons = {
      java: Coffee,
      spring: Layers,
      angular: Globe,
      mysql: Database,
      hibernate: Server,
      html: Code,
      css: FileText,
      javascript: Brain
    };
    return icons[skill as keyof typeof icons] || Code;
  };

  const javaSkills = [
    { name: 'java', label: 'Core Java', description: 'Object-oriented programming fundamentals' },
    { name: 'spring', label: 'Spring Framework', description: 'Enterprise application development' },
    { name: 'angular', label: 'Angular', description: 'Frontend framework for dynamic web apps' },
    { name: 'mysql', label: 'MySQL', description: 'Relational database management' },
    { name: 'hibernate', label: 'Hibernate', description: 'Object-relational mapping framework' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-8 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/careers')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Java Full Stack Developer</h1>
              <p className="text-gray-600">Master enterprise application development with Java ecosystem</p>
            </div>
          </div>
          {hasJavaAccess && (
            <Badge className="bg-red-500">
              <Trophy className="h-4 w-4 mr-2" />
              Java Path Unlocked
            </Badge>
          )}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journey">Course Journey</TabsTrigger>
            <TabsTrigger value="evaluations">Skill Evaluations</TabsTrigger>
            <TabsTrigger value="courses">Java Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Coffee className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome to Java Full Stack Platform</h2>
                    <p className="text-red-100 mt-2">
                      Master enterprise Java development from backend to frontend
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flowchart Visualization */}
            <Card className="border-0 shadow-lg p-8">
              <div className="flex flex-col items-center space-y-8">
                {/* Top Circle */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-red-500 bg-white flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <Coffee className="h-8 w-8 text-red-600 mx-auto mb-1" />
                      <span className="text-sm font-semibold text-gray-800">Java Stack</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-12 bg-red-500"></div>
                </div>

                {/* Main Title */}
                <Card className="w-full max-w-md p-6 bg-white border-2 border-red-500 shadow-lg">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Java Full Stack Developer</h3>
                    <p className="text-gray-600 text-sm">Enterprise Application Development</p>
                  </div>
                </Card>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-8">
                  {/* Current Skills */}
                  <Card className="p-4 bg-white border-2 border-green-400 shadow-md">
                    <div className="text-center mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Current Skills</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {['html', 'css', 'javascript'].map(skill => {
                        const evaluation = evaluationStats[skill];
                        const passed = evaluation?.passed || false;
                        return (
                          <div key={skill} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${passed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="capitalize">{skill}</span>
                            <div className="ml-auto">
                              {passed ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <span className="text-xs text-gray-400">Not completed</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Java Skills Required */}
                  <Card className="p-4 bg-white border-2 border-red-400 shadow-md">
                    <div className="text-center mb-3">
                      <Coffee className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Java Skills</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {javaSkills.slice(0, 3).map(skill => {
                        const evaluation = evaluationStats[skill.name];
                        const progress = evaluation?.score || 0;
                        return (
                          <div key={skill.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{skill.label}</span>
                            <div className="ml-auto w-12 h-1 bg-gray-200 rounded">
                              <div 
                                className="h-1 bg-red-500 rounded transition-all"
                                style={{ width: `${progress * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Progress Stats */}
                  <Card className="p-4 bg-white border-2 border-blue-400 shadow-md">
                    <div className="text-center mb-3">
                      <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Progress</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="h-3 w-3 text-blue-500" />
                        <span>Completed: {Object.values(evaluationStats).filter(s => s.passed).length}/8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-3 w-3 text-purple-500" />
                        <span>Avg Score: {Math.round(Object.values(evaluationStats).reduce((acc, s) => acc + s.score, 0) / Math.max(Object.values(evaluationStats).length, 1))}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3 text-green-500" />
                        <span>Access: {hasJavaAccess ? 'Unlocked' : 'Locked'}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Take Evaluation</h3>
                    <p className="text-sm text-gray-600">Test Java skills</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-3 bg-red-600 hover:bg-red-700"
                  onClick={() => setActiveTab('evaluations')}
                >
                  Start Evaluation
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Java Courses</h3>
                    <p className="text-sm text-gray-600">Learn Java stack</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-3"
                  onClick={() => setActiveTab('courses')}
                  disabled={!hasJavaAccess}
                >
                  {hasJavaAccess ? 'View Courses' : 'Complete Prerequisites'}
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-600" />
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
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Mentor</h3>
                    <p className="text-sm text-gray-600">Get Java help</p>
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
            {/* Course Journey Point System */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Course Journey Point System</h2>
                    <p className="text-amber-100 mt-2">
                      Track your progress with our gamified learning system
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Journey Dashboard */}
            <CourseJourneyDashboard 
              onModuleComplete={(moduleId) => {
                // Refresh evaluation stats when module is completed
                loadEvaluationStats();
              }}
            />
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-6">
            {!selectedSkill ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6" />
                    Choose a Java Skill to Evaluate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {javaSkills.map((skill) => {
                      const Icon = getSkillIcon(skill.name);
                      const progress = skillProgression[skill.name];
                      const evaluation = evaluationStats[skill.name];
                      const completedLevels = progress?.completedLevels.length || 0;

                      return (
                        <Card key={skill.name} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedSkill(skill.name)}>
                          <div className="flex items-start gap-3 mb-3">
                            <Icon className="h-8 w-8 text-red-600 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{skill.label}</h3>
                              <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={evaluation?.passed ? "default" : "outline"}>
                                  {evaluation?.passed ? `Passed (${evaluation.score}/10)` : 'Not taken'}
                                </Badge>
                                <Badge variant="secondary">
                                  {completedLevels}/4 levels
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full bg-red-600 hover:bg-red-700">
                            Evaluate {skill.label}
                          </Button>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {(() => {
                        const Icon = getSkillIcon(selectedSkill);
                        return <Icon className="h-6 w-6" />;
                      })()} {javaSkills.find(s => s.name === selectedSkill)?.label} Levels
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
                      const currentLevel = progress?.currentLevel === level;

                      return (
                        <Card key={level} className={`p-6 transition-all ${currentLevel ? 'border-red-500 bg-red-50' : isCompleted ? 'border-green-500 bg-green-50' : 'hover:shadow-md'}`}>
                          <div className="text-center">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                              isCompleted ? 'bg-green-500' : currentLevel ? 'bg-red-500' : 'bg-gray-100'
                            }`}>
                              {isCompleted ? (
                                <Trophy className="h-6 w-6 text-white" />
                              ) : currentLevel ? (
                                <Target className="h-6 w-6 text-white" />
                              ) : (
                                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                              )}
                            </div>

                            <h3 className="font-semibold mb-1 capitalize">{level} Level</h3>
                            <div className="text-lg font-bold mb-3">{levelScore}/10</div>

                            <Button
                              className="w-full bg-red-600 hover:bg-red-700"
                              onClick={() => {
                                const testUrl = `/test/${selectedSkill}/${level}`;
                                window.open(testUrl, '_blank', 'noopener,noreferrer');
                              }}
                            >
                              {currentLevel ? 'Take Test' : isCompleted ? 'Retake' : 'Take Test'}
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {hasJavaAccess ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Java Full Stack Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Core Java Fundamentals', icon: Coffee, description: 'Master Java basics and OOP' },
                      { name: 'Spring Boot Development', icon: Layers, description: 'Build enterprise applications' },
                      { name: 'Angular Frontend', icon: Globe, description: 'Create dynamic web interfaces' },
                      { name: 'Database with MySQL', icon: Database, description: 'Design and manage databases' },
                      { name: 'Hibernate ORM', icon: Server, description: 'Object-relational mapping' },
                      { name: 'Full Stack Project', icon: Trophy, description: 'Complete end-to-end application' }
                    ].map((course, index) => {
                      const Icon = course.icon;
                      return (
                        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3 mb-3">
                            <Icon className="h-6 w-6 text-red-600 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{course.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            </div>
                          </div>
                          <Button className="w-full bg-red-600 hover:bg-red-700">
                            Start Course
                          </Button>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Coffee className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Prerequisites First</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Master HTML, CSS, and JavaScript fundamentals before starting the Java Full Stack path.
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-500">Required skills:</p>
                      <div className="flex justify-center gap-2">
                        {['html', 'css', 'javascript'].map((skill) => {
                          const evaluation = evaluationStats[skill];
                          return (
                            <Badge key={skill} variant={evaluation?.passed ? 'default' : 'secondary'}>
                              {skill.toUpperCase()}: {evaluation?.passed ? '✅' : '❌'}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <Button onClick={() => setActiveTab('evaluations')} className="bg-red-600 hover:bg-red-700">
                      Complete Prerequisites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Progress Overview */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-600 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Java Learning Progress</h2>
                    <p className="text-red-100 mt-2">Track your Java full stack development journey</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Java Skills</p>
                    <p className="text-2xl font-bold">{Object.keys(evaluationStats).filter(s => javaSkills.some(js => js.name === s)).length}/{javaSkills.length}</p>
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
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Score</p>
                    <p className="text-2xl font-bold">
                      {Math.round(Object.values(evaluationStats).reduce((acc, s) => acc + s.score, 0) / Math.max(Object.values(evaluationStats).length, 1))}%
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course Access</p>
                    <p className="text-2xl font-bold">{hasJavaAccess ? 'Unlocked' : 'Locked'}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Skill Progress Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Java Skills Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {javaSkills.map((skill) => {
                    const Icon = getSkillIcon(skill.name);
                    const progress = skillProgression[skill.name];
                    const evaluation = evaluationStats[skill.name];
                    const completedLevels = progress?.completedLevels.length || 0;
                    const totalLevels = 4;

                    return (
                      <div key={skill.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-red-600" />
                            <div>
                              <h3 className="font-semibold">{skill.label}</h3>
                              <p className="text-sm text-gray-600">{skill.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {evaluation ? (
                              <>
                                <Badge variant={evaluation.passed ? 'default' : 'destructive'}>
                                  {evaluation.passed ? 'Passed' : 'Failed'}
                                </Badge>
                                <p className="text-sm text-gray-600 mt-1">Score: {evaluation.score}/10</p>
                              </>
                            ) : (
                              <Badge variant="outline">Not Taken</Badge>
                            )}
                          </div>
                        </div>

                        <Progress value={(completedLevels / totalLevels) * 100} className="mb-2" />

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

                <div className="mt-6 flex gap-4">
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => setActiveTab('evaluations')}
                  >
                    Continue Evaluations
                  </Button>
                  {hasJavaAccess && (
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
      </div>
    </div>
  );
}
