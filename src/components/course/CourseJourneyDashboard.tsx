import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trophy,
  Clock,
  Target,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  BookOpen,
  Timer
} from 'lucide-react';
import { CourseProgress, CourseModule } from '@/types/courseProgress';
import { CourseProgressService, JAVA_COURSE } from '@/services/courseProgressService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CourseJourneyDashboardProps {
  onModuleComplete?: (moduleId: string) => void;
}

export function CourseJourneyDashboard({ onModuleComplete }: CourseJourneyDashboardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [timeLimit, setTimeLimit] = useState('90');
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  const courseService = CourseProgressService.getInstance();

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;
    
    try {
      const userProgress = await courseService.getCourseProgress(user.uid, 'java-fullstack');
      setProgress(userProgress);
      
      if (userProgress) {
        // Subscribe to real-time updates
        const unsubscribe = courseService.subscribeToProgress(user.uid, 'java-fullstack', (updatedProgress) => {
          setProgress(updatedProgress);
        });
        
        return unsubscribe;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCourse = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const newProgress = await courseService.startCourse(user.uid, 'java-fullstack', parseInt(timeLimit));
      setProgress(newProgress);
      setShowStartDialog(false);
      
      toast({
        title: "Course Started!",
        description: `Java Full Stack journey begins! You have ${timeLimit} days to complete.`,
      });
    } catch (error) {
      console.error('Error starting course:', error);
      toast({
        title: "Error",
        description: "Failed to start course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteModule = async (moduleId: string) => {
    if (!user || !progress) return;

    try {
      const updatedProgress = await courseService.completeModule(user.uid, 'java-fullstack', moduleId);
      if (updatedProgress) {
        const module = JAVA_COURSE.modules.find(m => m.id === moduleId);
        toast({
          title: "Module Completed!",
          description: `+${module?.basePoints} points earned for completing ${module?.name}`,
        });
        onModuleComplete?.(moduleId);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete module",
        variant: "destructive",
      });
    }
  };

  const handleFinishCourse = async () => {
    if (!user || !progress) return;

    try {
      const calculation = await courseService.finishCourse(user.uid, 'java-fullstack');
      
      toast({
        title: "Course Completed!",
        description: `Final score: ${calculation.finalPoints} points ${calculation.bonusPoints > 0 ? `(+${calculation.bonusPoints} bonus!)` : ''}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to finish course",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />;
      case 'late': return <AlertTriangle className="h-4 w-4" />;
      case 'completed': return <Trophy className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="ml-2">Loading course progress...</span>
        </div>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="p-4 bg-white/20 rounded-full w-fit mx-auto mb-4">
              <Zap className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Start Your Java Journey!</h2>
            <p className="text-red-100 mb-6">
              Begin your Java Full Stack development course with our point-based progress system
            </p>
            
            <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
              <DialogTrigger asChild>
                <Button className="bg-white text-red-600 hover:bg-red-50">
                  <Play className="h-4 w-4 mr-2" />
                  Start Course Journey
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Your Course Timeline</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeLimit">Course Completion Timeline</Label>
                    <Select value={timeLimit} onValueChange={setTimeLimit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days (Intensive)</SelectItem>
                        <SelectItem value="60">60 Days (Accelerated)</SelectItem>
                        <SelectItem value="90">90 Days (Standard)</SelectItem>
                        <SelectItem value="120">120 Days (Relaxed)</SelectItem>
                        <SelectItem value="180">180 Days (Part-time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Point System Overview:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Start with 1000 points</li>
                      <li>• Earn points by completing modules</li>
                      <li>• 10% bonus for on-time completion</li>
                      <li>• -1 point per day if late (max 365 days)</li>
                    </ul>
                  </div>
                  
                  <Button onClick={handleStartCourse} className="w-full bg-red-600 hover:bg-red-700">
                    Start Journey ({timeLimit} days)
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = courseService.calculateProgressPercentage(progress);
  const timeRemaining = courseService.calculateTimeRemaining(progress);
  const completedCount = progress.completedModules.length;
  const totalModules = JAVA_COURSE.totalModules;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trophy className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Points</p>
              <p className="text-2xl font-bold text-red-600">{progress.points.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-blue-600">{completedCount}/{totalModules}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Time Remaining</p>
              <p className={`text-2xl font-bold ${timeRemaining.isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                {timeRemaining.isOverdue ? 'Overdue' : `${timeRemaining.days}d ${timeRemaining.hours}h`}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(progress.status).replace('bg-', 'bg-').replace('-500', '-100')}`}>
              {getStatusIcon(progress.status)}
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge className={getStatusColor(progress.status)}>
                {progress.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Course Progress</h3>
          <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-3 mb-4" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Started: {progress.startDate.toLocaleDateString()}</span>
          <span>Target: {progress.targetCompletionDate.toLocaleDateString()}</span>
        </div>
      </Card>

      {/* Course Modules */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Course Modules
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JAVA_COURSE.modules.map((module) => {
              const isCompleted = progress.completedModules.some(m => m.moduleId === module.id);
              const completedModule = progress.completedModules.find(m => m.moduleId === module.id);
              
              return (
                <Card key={module.id} className={`p-4 transition-all ${isCompleted ? 'border-green-500 bg-green-50' : 'hover:shadow-md'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{module.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                    </div>
                    <Badge variant={isCompleted ? 'default' : 'outline'} className="ml-2">
                      {module.basePoints}pts
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        module.difficulty === 'easy' ? 'border-green-500 text-green-700' :
                        module.difficulty === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        module.difficulty === 'hard' ? 'border-orange-500 text-orange-700' :
                        'border-red-500 text-red-700'
                      }`}
                    >
                      {module.difficulty}
                    </Badge>
                    
                    <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">
                            {completedModule?.completedAt.toLocaleDateString()}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`/careers/java-fullstack/module/${module.id}`, '_blank')}
                          className="text-xs"
                        >
                          Review
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => window.open(`/careers/java-fullstack/module/${module.id}`, '_blank')}
                        className="bg-red-600 hover:bg-red-700 text-xs"
                      >
                        Start Learning
                      </Button>
                    )}
                  </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Finish Course Button */}
      {completedCount === totalModules && !progress.isCompleted && (
        <Card className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to Graduate!</h3>
            <p className="mb-4">You've completed all modules. Finish your course to get your final score!</p>
            <Button 
              onClick={handleFinishCourse}
              className="bg-white text-green-600 hover:bg-green-50"
            >
              <Award className="h-4 w-4 mr-2" />
              Finish Course
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}