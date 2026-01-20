import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Question, Skill, Difficulty } from '@/types/question';
import { getQuestionLearningResources } from '@/services/evaluationService';
import { updateUserProgression, didPassLevel, canTakeTestLevel } from '@/services/progressionService';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AITestEnhancer from '@/components/AITestEnhancer';

interface SkillTestProps {
  skill?: Skill;
  level?: Difficulty;
  onComplete?: () => void;
}

const SkillTest: React.FC<SkillTestProps> = ({ skill: propSkill, level: propLevel, onComplete }) => {
  const { skill: urlSkill, level: urlLevel } = useParams<{ skill: string; level: string }>();
  const skill = propSkill || (urlSkill as Skill);
  const level = propLevel || (urlLevel as Difficulty);

  // All hooks must be called before any early returns
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for level tests
  const [testStarted, setTestStarted] = useState(false);
  const [passed, setPassed] = useState(false);
  const [canTakeTest, setCanTakeTest] = useState(true);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define functions with useCallback before useEffect hooks
  const loadQuestions = useCallback(async () => {
    if (!skill || !level) return;
    
    try {
      // Import the new question loading service
      const { generateLevelQuestions } = await import('@/services/evaluationService');
      
      // Get questions for the specific level
      const levelQuestions = await generateLevelQuestions(skill, level as Difficulty, 10);

      if (levelQuestions.length === 0) {
        toast({
          title: "No Questions Available",
          description: `No questions found for ${skill} ${level} level.`,
          variant: "destructive",
        });
        return;
      }

      setQuestions(levelQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    }
  }, [skill, level, toast]);

  // All useEffect hooks must be before any early returns
  // Check if user is logged in and has access to this level
  useEffect(() => {
    const checkAccess = async () => {
      // Don't check until auth is loaded
      if (authLoading) {
        return;
      }

      // User is not authenticated
      if (!user) {
        setIsCheckingAccess(false);
        return;
      }

      // User is authenticated, check level access
      try {
        const hasAccess = await canTakeTestLevel(user.uid, skill, level as Difficulty);
        setCanTakeTest(hasAccess);
        
        if (!hasAccess) {
          toast({
            title: "Level Locked",
            description: `You must pass the previous level before attempting ${level}.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking level access:', error);
      } finally {
        setIsCheckingAccess(false);
      }
    };

    if (skill && level) {
      checkAccess();
    }
  }, [user, authLoading, toast, skill, level]);

  useEffect(() => {
    if (canTakeTest && !isCheckingAccess && skill && level) {
      loadQuestions();
    }
  }, [skill, level, canTakeTest, isCheckingAccess, loadQuestions]);

  // Update document title for better new tab experience
  useEffect(() => {
    if (skill && level) {
      const originalTitle = document.title;
      document.title = `${getSkillName(skill)} ${level.charAt(0).toUpperCase() + level.slice(1)} Test - RoadMaestro`;
      
      return () => {
        document.title = originalTitle;
      };
    }
  }, [skill, level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [testStarted, timeLeft]);

  // If no skill or level provided, show error (after all hooks)
  if (!skill || !level) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Test</h2>
          <p>Please provide a valid skill and level for the test.</p>
        </div>
      </div>
    );
  }



  const handleSelectAnswer = (answer: number | string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const calculateScore = (): { score: number; percentage: number; passed: boolean } => {
    let correct = 0;
    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });

    const percentage = questions.length > 0 ? (correct / questions.length) * 100 : 0;
    const passed = didPassLevel(correct, questions.length);

    return { score: correct, percentage: Math.round(percentage), passed };
  };

  const handleSubmitTest = async () => {
    console.log('Submit test clicked, user:', user);
    
    if (!user) {
      console.error('No user found!');
      toast({
        title: "Error",
        description: "You must be logged in to submit the test.",
        variant: "destructive",
      });
      return;
    }

    const { score: correctAnswers, percentage: perc, passed: pass } = calculateScore();
    console.log('Score calculated:', { correctAnswers, perc, pass });

    try {
      console.log('Saving to Firebase...');
      await updateUserProgression(user.uid, skill, {
        difficulty: level as Difficulty,
        correctAnswers,
        totalQuestions: questions.length,
        timestamp: new Date()
      });
      console.log('Saved successfully!');

      setScore(correctAnswers);
      setPercentage(perc);
      setPassed(pass);
      setShowResults(true);
      console.log('State updated, showing results');

      toast({
        title: pass ? "Level Passed! 🎉" : "Level Completed",
        description: pass
          ? `Great job! You passed the ${level} level with ${perc}%.`
          : `You scored ${perc}%. Keep practicing to reach 70%.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error saving test results:', error);
      toast({
        title: "Error",
        description: "Failed to save test results. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getSkillName = (skill: Skill) => {
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  if (authLoading || isCheckingAccess || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">
            {authLoading ? 'Authenticating...' : isCheckingAccess ? 'Checking access...' : 'Loading questions...'}
          </p>
        </div>
      </div>
    );
  }

  // Show authentication required if user is not logged in
  if (!user) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-4 md:p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              🔒 Authentication Required
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Sign In Required</h1>
            <p className="text-gray-400">You need to be signed in to take tests and track your progress.</p>
          </div>
          
          <div className="bg-gray-800 border-gray-700 rounded-lg p-8 text-center">
            <p className="text-white mb-6">Please sign in to access the test.</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  if (window.history.length <= 1) {
                    window.close();
                  } else {
                    navigate('/login');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {window.history.length <= 1 ? 'Close Tab' : 'Sign In'}
              </Button>
              <Button 
                onClick={() => {
                  if (window.opener) {
                    window.opener.location.assign('/login');
                    window.close();
                  } else {
                    navigate('/login');
                  }
                }}
                variant="outline"
              >
                Sign In in Main Tab
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show locked message if user doesn't have access
  if (!canTakeTest) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                🔒 Level Locked
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg">
                You need to pass the previous level before attempting <strong>{level}</strong> level.
              </p>
              <p className="text-gray-400">
                Complete the earlier levels to unlock this test and progress through your learning journey.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => navigate(-1)} className="flex-1">
                  Go Back
                </Button>
                <Button onClick={() => navigate('/dashboard')} variant="outline" className="flex-1">
                  Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="h-screen w-screen bg-gray-900 p-4 md:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Test Environment Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4" />
              Test Environment
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {getSkillName(skill)} Assessment
            </h1>
            <p className="text-gray-400">
              {level.charAt(0).toUpperCase() + level.slice(1)} Level • Focused Testing Experience
            </p>
          </div>

          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2 justify-center">
                <Target className="h-6 w-6" />
                Ready to Begin?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Test Information</h3>
                <p>• {questions.length} questions focused on {level} level concepts</p>
                <p>• Passing score: 70% (at least {Math.ceil(questions.length * 0.7)}/ {questions.length} correct)</p>
                <p>• 10 minutes time limit</p>
                <p>• Test your knowledge and unlock next levels</p>
              </div>
              <Button onClick={handleStartTest} className="w-full bg-blue-600 hover:bg-blue-700">
                Start {level.charAt(0).toUpperCase() + level.slice(1)} Level Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <AITestEnhancer
        skill={skill}
        difficulty={level as Difficulty}
        score={score}
        totalQuestions={questions.length}
        questions={questions}
        selectedAnswers={selectedAnswers}
        onClose={() => {
          if (onComplete) {
            onComplete();
          } else if (window.history.length <= 1) {
            window.close();
          } else {
            navigate(-1);
          }
        }}
        onRetakeTest={() => {
          setShowResults(false);
          setCurrentQuestion(0);
          setSelectedAnswers({});
          setScore(0);
          setPassed(false);
          setTestStarted(false);
          setTimeLeft(600);
        }}
        showBasicResults={true}
      />
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="h-screen w-screen bg-gray-900 p-4 md:p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  // Check if opened in new tab/window
                  if (window.history.length <= 1) {
                    // If opened in new tab, close the tab
                    window.close();
                  } else {
                    // If navigated within same tab, go back
                    navigate(-1);
                  }
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {window.history.length <= 1 ? 'Close' : 'Back'}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{getSkillName(skill)} - {level.charAt(0).toUpperCase() + level.slice(1)} Level</h1>
                <p className="text-gray-400">Skill Level Test • New Tab Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={handleSubmitTest} className="bg-red-600 hover:bg-red-700">
                Submit Test
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center text-white mb-4">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Object.keys(selectedAnswers).length} answered</span>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-white">
                <h2 className="text-xl font-semibold mb-4">{currentQ.text}</h2>
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options?.map((option, index) => {
                    const selected = selectedAnswers[currentQuestion] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        className={`p-4 text-left rounded-lg border-2 transition-all ${
                          selected
                            ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                            : 'border-gray-600 bg-gray-700 hover:border-gray-500 text-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                            selected ? 'border-blue-500 text-blue-300' : 'border-gray-500'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="leading-relaxed">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentQuestion === questions.length - 1 ? (
                  <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                    Submit Test
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`h-10 rounded-lg text-white font-medium transition-all ${
                currentQuestion === index
                  ? 'bg-blue-600'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTest;
