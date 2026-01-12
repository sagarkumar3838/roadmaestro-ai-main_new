import { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { CourseCard } from '@/components/CourseCard';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { CareerMentor } from '@/components/CareerMentor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialQuestions, mockCourses, mockRoadmap } from '@/data/mockData';
import { generateUniqueQuestions, clearUsedQuestions } from '@/services/questionService';
import { Brain, BookOpen, Target, Sparkles, ChevronRight, User, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'chat' | 'mentor' | 'results'>('intro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [mcqQuestions, setMcqQuestions] = useState<any[]>([]);
  const [mcqAnswers, setMcqAnswers] = useState<number[]>([]);
  const [mcqScore, setMcqScore] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'initial' | 'mcq'>('initial');
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const startAssessment = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      if (currentPhase === 'initial') {
        if (currentQuestionIndex === 0) {
          // Store experience level and move to interest question
          setUserAnswers(prev => [...prev, message]);
          setCurrentQuestionIndex(1);
          
          const nextQuestion = initialQuestions[1];
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: nextQuestion.text,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } else if (currentQuestionIndex === 1) {
          // Store selected category and start MCQ phase
          setSelectedCategory(message);
          setCurrentPhase('mcq');
          setCurrentQuestionIndex(0);
          
          // Generate unique AI questions for the selected category
          const generateQuestions = async () => {
            try {
              // Don't clear used questions - we want to track them to avoid repetition
              const aiQuestions = await generateUniqueQuestions(message, 'beginner', 5);
              setMcqQuestions(aiQuestions);
              
              const transitionMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: `Great! You're interested in ${message}. Now I'll ask you 5 unique technical questions to assess your knowledge in this area. Let's begin!`,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, transitionMessage]);
              
              setTimeout(() => {
                if (aiQuestions.length > 0) {
                  const firstMcqMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    type: 'ai',
                    content: `Question 1: ${aiQuestions[0].text}`,
                    timestamp: new Date()
                  };
                  setMessages(prev => [...prev, firstMcqMessage]);
                }
              }, 1000);
            } catch (error) {
              console.error('Error generating questions:', error);
              // Fallback to mock data
              const { getRandomQuestions } = await import('@/data/mockData');
              const fallbackQuestions = await getRandomQuestions(message, 5);
              setMcqQuestions(fallbackQuestions);
              
              const transitionMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: `Great! You're interested in ${message}. Now I'll ask you 5 technical questions to assess your knowledge in this area. Let's begin!`,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, transitionMessage]);
              
              setTimeout(() => {
                if (fallbackQuestions.length > 0) {
                  const firstMcqMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    type: 'ai',
                    content: `Question 1: ${fallbackQuestions[0].text}`,
                    timestamp: new Date()
                  };
                  setMessages(prev => [...prev, firstMcqMessage]);
                }
              }, 1000);
            }
          };
          
          generateQuestions();
        }
      } else if (currentPhase === 'mcq') {
        // Handle MCQ answers
        const currentQuestion = mcqQuestions[currentQuestionIndex];
        if (!currentQuestion) {
          setIsLoading(false);
          return;
        }
        const selectedOptionIndex = currentQuestion.options.findIndex((option: string) => option === message);
        const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;
        
        // Store the answer
        setMcqAnswers(prev => [...prev, selectedOptionIndex]);
        
        if (isCorrect) {
          setMcqScore(prev => prev + 1);
        }
        
        if (currentQuestionIndex < mcqQuestions.length - 1) {
          // Next MCQ question
          const nextQuestionIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextQuestionIndex);
          
          const nextQuestion = mcqQuestions[nextQuestionIndex];
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: `Question ${nextQuestionIndex + 1}: ${nextQuestion.text}`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } else {
          // MCQ assessment complete
          const finalScore = mcqScore + (isCorrect ? 1 : 0);
          const completionMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: `Excellent! You've completed all questions. You scored ${finalScore} out of ${mcqQuestions.length} in ${selectedCategory}. Based on your performance, I've prepared personalized course recommendations and a learning roadmap tailored to your skill level!`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, completionMessage]);
          
          // Calculate final score (0-100 scale)
          const calculatedScore = Math.round((finalScore / mcqQuestions.length) * 100);
          setScore(calculatedScore);
          
          setTimeout(() => {
            setCurrentStep('results');
            toast({
              title: "Assessment Complete! 🎉",
              description: `Your ${selectedCategory} score: ${calculatedScore}/100. Check out your personalized recommendations!`,
            });
          }, 2000);
        }
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleEnroll = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    toast({
      title: "Course Added! 📚",
      description: `${course?.title} has been added to your learning path.`,
    });
  };

  const restartAssessment = () => {
    setCurrentStep('intro');
    setMessages([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setSelectedCategory('');
    setMcqQuestions([]);
    setMcqAnswers([]);
    setMcqScore(0);
    setCurrentPhase('initial');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold ai-gradient-text">AI Course Mentor</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email?.split('@')[0]}!
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/profile')}
                    className="border-primary/20 hover:border-primary"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => supabase.auth.signOut()}
                    className="border-destructive/20 hover:border-destructive text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="border-primary/20 hover:border-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section / Intro */}
      {currentStep === 'intro' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center space-x-2 mb-6">
                <Brain className="h-12 w-12 text-primary animate-pulse-glow" />
                <h1 className="text-5xl font-bold ai-gradient-text">
                  AI Course Mentor
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get personalized course recommendations based on your skills, interests, and career goals. 
                Our AI mentor will assess your knowledge and create a custom learning roadmap just for you.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="course-card text-center">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Traditional Assessment</h3>
                  <p className="text-muted-foreground text-sm">
                    Answer personalized questions to evaluate your current skill level
                  </p>
                </Card>
                
                <Card className="course-card text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
                  <p className="text-muted-foreground text-sm">
                    Get courses tailored to your background and learning goals
                  </p>
                </Card>
                
                <Card className="course-card text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Custom Roadmap</h3>
                  <p className="text-muted-foreground text-sm">
                    Follow a structured learning path designed for your success
                  </p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={startAssessment}
                  className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 ai-glow"
                >
                  Traditional Assessment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCurrentStep('mentor')}
                  className="px-8 py-4 text-lg border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  AI Career Mentor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Career Mentor */}
      {currentStep === 'mentor' && (
        <div className="container mx-auto px-4 py-8">
          <CareerMentor />
        </div>
      )}

      {/* Chat Assessment */}
      {currentStep === 'chat' && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <Badge variant="outline" className="mb-2">
                {currentPhase === 'initial' 
                  ? `Initial Assessment: ${currentQuestionIndex + 1} of ${initialQuestions.length}` 
                  : `${selectedCategory} Quiz: ${currentQuestionIndex + 1} of ${mcqQuestions.length}`
                }
              </Badge>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="progress-fill h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: currentPhase === 'initial' 
                      ? `${((currentQuestionIndex + 1) / initialQuestions.length) * 50}%`
                      : `${50 + ((currentQuestionIndex + 1) / mcqQuestions.length) * 50}%`
                  }}
                ></div>
              </div>
            </div>
            
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              currentQuestion={
                currentPhase === 'initial' 
                  ? initialQuestions[currentQuestionIndex]
                  : currentPhase === 'mcq' && mcqQuestions.length > 0 
                    ? mcqQuestions[currentQuestionIndex]
                    : null
              }
            />
          </div>
        </div>
      )}

      {/* Results */}
      {currentStep === 'results' && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold ai-gradient-text mb-4">
                Your Personalized Results
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Badge className="px-4 py-2 text-lg bg-success text-success-foreground">
                  Skill Score: {score}/100
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-lg">
                  {score >= 90 ? 'Expert' : score >= 70 ? 'Intermediate' : 'Beginner'} Level
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="courses" className="text-lg py-3">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Recommended Courses
                </TabsTrigger>
                <TabsTrigger value="roadmap" className="text-lg py-3">
                  <Target className="mr-2 h-5 w-5" />
                  Learning Roadmap
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCourses.slice(0, 6).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="roadmap">
                <LearningRoadmap roadmap={mockRoadmap} currentWeek={2} />
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                onClick={restartAssessment}
                className="px-6 py-3 border-primary/20 hover:border-primary hover:bg-primary/10"
              >
                Take Assessment Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
