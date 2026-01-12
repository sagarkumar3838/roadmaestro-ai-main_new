import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  BookOpen,
  Code,
  CheckCircle,
  Clock,
  Trophy,
  Target,
  Play,
  ChevronRight,
  ChevronLeft,
  Award
} from 'lucide-react';
import { JavaModuleContent, ModuleSection, QuizQuestion, getModuleById } from '@/data/javaModules';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CourseProgressService } from '@/services/courseProgressService';

interface JavaModuleLearningProps {
  moduleId: string;
}

export function JavaModuleLearning({ moduleId }: JavaModuleLearningProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [module, setModule] = useState<JavaModuleContent | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const courseService = CourseProgressService.getInstance();

  useEffect(() => {
    const moduleData = getModuleById(moduleId);
    if (moduleData) {
      setModule(moduleData);
    } else {
      toast({
        title: "Module not found",
        description: "The requested module could not be found.",
        variant: "destructive",
      });
      navigate('/careers/java-fullstack');
    }
  }, [moduleId, navigate, toast]);

  const handleSectionComplete = (sectionIndex: number) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
    toast({
      title: "Section Completed!",
      description: `You've completed "${module?.sections[sectionIndex].title}"`,
    });
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = async () => {
    if (!module || !user) return;

    setIsLoading(true);
    let score = 0;
    let totalPoints = 0;

    module.quiz.forEach(question => {
      totalPoints += question.points;
      if (quizAnswers[question.id] === question.correctAnswer) {
        score += question.points;
      }
    });

    setQuizScore(score);
    setQuizCompleted(true);

    // If quiz passed (70% or higher), complete the module
    const passingScore = Math.ceil(totalPoints * 0.7);
    if (score >= passingScore) {
      try {
        await courseService.completeModule(user.uid, 'java-fullstack', moduleId);
        toast({
          title: "Module Completed! 🎉",
          description: `You earned ${module.points} points! Quiz score: ${score}/${totalPoints}`,
        });
      } catch (error: any) {
        console.error('Error completing module:', error);
        toast({
          title: "Module Completed! 🎉",
          description: `Quiz score: ${score}/${totalPoints}. Great job!`,
        });
      }
    } else {
      toast({
        title: "Quiz Completed",
        description: `Score: ${score}/${totalPoints}. You need ${passingScore} to pass. Try again!`,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mb-4 text-gray-900">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mb-3 text-gray-800">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mb-2 text-gray-700">{line.substring(4)}</h3>;
      } else if (line.startsWith('- **') && line.includes('**:')) {
        const parts = line.substring(2).split('**:');
        const term = parts[0].replace('**', '');
        const definition = parts[1];
        return (
          <div key={index} className="mb-2">
            <strong className="text-blue-600">{term}:</strong>
            <span className="text-gray-700">{definition}</span>
          </div>
        );
      } else if (line.startsWith('- ')) {
        return <li key={index} className="mb-1 text-gray-700">{line.substring(2)}</li>;
      } else if (line.trim().startsWith('```java')) {
        return <div key={index} className="text-sm text-gray-500 mt-4">Code Example:</div>;
      } else if (line.trim() === '```') {
        return null;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-3 text-gray-700 leading-relaxed">{line}</p>;
      }
    });
  };

  if (!module) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const progressPercentage = ((completedSections.size + (quizCompleted ? 1 : 0)) / (module.sections.length + 1)) * 100;
  const allSectionsCompleted = completedSections.size === module.sections.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/careers/java-fullstack')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-gray-600">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-red-500">
              <Trophy className="h-4 w-4 mr-1" />
              {module.points} Points
            </Badge>
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              {module.estimatedTime}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Module Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{completedSections.size}/{module.sections.length} sections</span>
              <span>{quizCompleted ? 'Quiz completed' : 'Quiz pending'}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.sections.map((section, index) => (
                    <Button
                      key={section.id}
                      variant={currentSection === index ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto p-3 ${
                        completedSections.has(index) ? 'bg-green-50 border-green-200' : ''
                      }`}
                      onClick={() => setCurrentSection(index)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {completedSections.has(index) ? (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{section.title}</div>
                          <div className="text-xs text-gray-500">Section {index + 1}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                  
                  {/* Quiz Section */}
                  <Button
                    variant={showQuiz ? "default" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-3 ${
                      quizCompleted ? 'bg-blue-50 border-blue-200' : ''
                    } ${!allSectionsCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => allSectionsCompleted && setShowQuiz(true)}
                    disabled={!allSectionsCompleted}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {quizCompleted ? (
                        <Award className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      ) : (
                        <Target className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Quiz</div>
                        <div className="text-xs text-gray-500">
                          {quizCompleted ? `Score: ${quizScore}` : `${module.quiz.length} questions`}
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!showQuiz ? (
              /* Section Content */
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{module.sections[currentSection]?.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                        disabled={currentSection === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSection(Math.min(module.sections.length - 1, currentSection + 1))}
                        disabled={currentSection === module.sections.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {renderContent(module.sections[currentSection]?.content || '')}
                  </div>

                  {/* Code Examples */}
                  {module.sections[currentSection]?.codeExamples?.map((example, index) => (
                    <Card key={index} className="mt-6 bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Code className="h-5 w-5" />
                          {example.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{example.code}</code>
                        </pre>
                        <p className="mt-3 text-gray-600 text-sm">{example.explanation}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Key Points */}
                  {module.sections[currentSection]?.keyPoints && (
                    <Card className="mt-6 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800">Key Points</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {module.sections[currentSection].keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-700">
                              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Section Complete Button */}
                  <div className="mt-6 flex justify-between">
                    <div></div>
                    {!completedSections.has(currentSection) && (
                      <Button 
                        onClick={() => handleSectionComplete(currentSection)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Section Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Quiz Content */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6" />
                    Module Quiz
                  </CardTitle>
                  <p className="text-gray-600">
                    Test your knowledge of {module.title}. You need 70% to pass and earn points.
                  </p>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      {module.quiz.map((question, index) => (
                        <Card key={question.id} className="p-4">
                          <div className="mb-4">
                            <h3 className="font-semibold mb-2">
                              Question {index + 1}: {question.question}
                            </h3>
                            <Badge variant="outline">{question.points} points</Badge>
                          </div>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={optionIndex}
                                  onChange={() => handleQuizAnswer(question.id, optionIndex)}
                                  className="text-red-600"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </Card>
                      ))}
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowQuiz(false)}>
                          Back to Content
                        </Button>
                        <Button 
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(quizAnswers).length !== module.quiz.length || isLoading}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isLoading ? 'Submitting...' : 'Submit Quiz'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Quiz Results */
                    <div className="text-center space-y-6">
                      <div className="p-6 bg-blue-50 rounded-lg">
                        <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-blue-800 mb-2">Quiz Completed!</h3>
                        <p className="text-lg text-blue-700">
                          Your Score: {quizScore}/{module.quiz.reduce((sum, q) => sum + q.points, 0)}
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                          {quizScore >= Math.ceil(module.quiz.reduce((sum, q) => sum + q.points, 0) * 0.7) 
                            ? '🎉 Congratulations! You passed the quiz and earned points!' 
                            : '📚 Keep studying! You can retake the quiz.'}
                        </p>
                      </div>

                      {/* Quiz Review */}
                      <div className="space-y-4 text-left">
                        <h4 className="font-semibold text-lg">Quiz Review:</h4>
                        {module.quiz.map((question, index) => {
                          const userAnswer = quizAnswers[question.id];
                          const isCorrect = userAnswer === question.correctAnswer;
                          
                          return (
                            <Card key={question.id} className={`p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                              <div className="flex items-start gap-2 mb-2">
                                {isCorrect ? (
                                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs mt-0.5">✕</div>
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{question.question}</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Your answer: {question.options[userAnswer]} 
                                    {!isCorrect && (
                                      <span className="text-red-600">
                                        {' '}(Correct: {question.options[question.correctAnswer]})
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2">{question.explanation}</p>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>

                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetQuiz}>
                          Retake Quiz
                        </Button>
                        <Button onClick={() => navigate('/careers/java-fullstack')} className="bg-red-600 hover:bg-red-700">
                          Back to Course
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}