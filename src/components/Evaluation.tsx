import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Question, Skill } from '@/types/question';
import {
  fetchQuestionBank,
  generateBalancedEvaluationQuestions,
  saveEvaluationResult,
  checkOGLCoursesUnlock,
  updateUserOGLAccess,
  EvaluationResult,
  getQuestionLearningResources
} from '@/services/evaluationService';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface EvaluationProps {
  skill?: Skill;
  onComplete?: () => void;
}

const Evaluation: React.FC<EvaluationProps> = ({ skill: propSkill, onComplete }) => {
  const { skill: urlSkill } = useParams<{ skill: string }>();
  const skill = propSkill || (urlSkill as Skill);

  // All hooks must be called before any early returns
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [passed, setPassed] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define functions with useCallback before useEffect hooks
  const loadQuestions = useCallback(async () => {
    if (!skill) return;
    
    try {
      const questionBank = await fetchQuestionBank(skill);
      // Use balanced selection: 3 easy, 3 medium, 2 hard, 2 advanced
      const selectedQuestions = generateBalancedEvaluationQuestions(questionBank);
      setQuestions(selectedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    }
  }, [skill, toast]);

  const handleSubmitTest = useCallback(async () => {
    if (!user || !skill) return;
    
    try {
      const correctAnswers = questions.filter((q, index) => {
        const userAnswer = selectedAnswers[index];
        return userAnswer === q.correctAnswer;
      }).length;

      const finalPercentage = Math.round((correctAnswers / questions.length) * 100);
      const testPassed = finalPercentage >= 80; // 80% pass requirement

      const result: EvaluationResult = {
        skill: skill,
        score: correctAnswers,
        percentage: finalPercentage,
        passed: testPassed,
        timestamp: new Date().toISOString()
      };

      await saveEvaluationResult(user.uid, skill, result);

      // Check if OGL courses should be unlocked
      const oglUnlocked = await checkOGLCoursesUnlock(user.uid);
      if (oglUnlocked) {
        await updateUserOGLAccess(user.uid, true);
      }

      setScore(correctAnswers);
      setPercentage(finalPercentage);
      setPassed(testPassed);
      setShowResults(true);

      const oglMessage = testPassed && oglUnlocked ? " You've unlocked OGL courses!" : "";

      toast({
        title: testPassed ? "Congratulations! 🎉" : "Test Completed",
        description: testPassed
          ? `You passed with ${finalPercentage}%!${oglMessage}`
          : `You scored ${finalPercentage}%. Keep practicing to reach 80%.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error saving evaluation result:', error);
      toast({
        title: "Error",
        description: "Failed to save test results. Please contact support.",
        variant: "destructive",
      });
    }
  }, [user, skill, questions, selectedAnswers, toast]);

  // All useEffect hooks must be before any early returns
  useEffect(() => {
    if (skill) {
      loadQuestions();
    }
  }, [skill, loadQuestions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      handleSubmitTest();
    }

    return () => clearInterval(timer);
  }, [testStarted, timeLeft, handleSubmitTest]);

  // If no skill provided, show error (after all hooks)
  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Skill</h2>
          <p>Please provide a valid skill for evaluation.</p>
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

    const percentage = (correct / questions.length) * 100;
    const passed = percentage >= 80; // 80% pass requirement

    return { score: correct, percentage: Math.round(percentage), passed };
  };



  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getSkillName = (skill: Skill) => {
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                {getSkillName(skill)} Evaluation Test
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Test Information</h3>
                <p>• 10 unique multiple choice questions (no repeats)</p>
                <p>• Balanced distribution: 3 Easy, 3 Medium, 2 Hard, 2 Advanced</p>
                <p>• 30 minutes time limit</p>
                <p>• Passing score: 80% (8/10)</p>
                <p>• Get explanations and learning resources for wrong answers</p>
              </div>
              <Button onClick={handleStartTest} className="w-full bg-blue-600 hover:bg-blue-700">
                Start Evaluation Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Results Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Evaluation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">
                  {passed ? (
                    <CheckCircle className="text-green-500 inline-block" />
                  ) : (
                    <XCircle className="text-red-500 inline-block" />
                  )}
                </div>
                <div className="text-3xl font-bold mb-2">{score}/10</div>
                <div className="text-xl mb-4">{percentage}%</div>
                <Badge className={passed ? 'bg-green-500' : 'bg-red-500'}>
                  {passed ? 'PASSED' : 'FAILED'}
                </Badge>
              </div>

              {passed && (
                <div className="text-center text-green-400">
                  <p className="text-lg">Excellent work! You've demonstrated mastery of this skill.</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => navigate('/dashboard')} className="flex-1">
                  Back to Dashboard
                </Button>
                <Button onClick={onComplete || (() => navigate('/dashboard'))} variant="outline" className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Question Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const learningResources = getQuestionLearningResources(skill, question.text);

                return (
                  <div key={question.id} className="p-4 rounded-lg bg-gray-700">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">
                          {index + 1}. {question.text}
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                          Your answer: {userAnswer !== undefined ? question.options?.[userAnswer as number] : 'Not answered'}
                        </p>

                        {/* Question Explanation */}
                        {question.explanation && (
                          <div className="mt-3 p-3 rounded bg-gray-600">
                            <p className="text-sm text-blue-300 font-medium mb-1">Explanation:</p>
                            <p className="text-sm text-gray-200">{question.explanation}</p>
                          </div>
                        )}

                        {/* Learning Resources for Wrong Answers */}
                        {!isCorrect && learningResources && (
                          <div className="mt-3 p-3 rounded bg-blue-900/30 border border-blue-700">
                            <p className="text-sm text-blue-300 font-medium mb-2">🚀 Learn More:</p>
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={learningResources.mdnLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                              >
                                📖 MDN docs
                              </a>
                              <a
                                href={learningResources.youtubeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                              >
                                ▶️ Watch Video
                              </a>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              Topic: {learningResources.topic}
                            </p>
                          </div>
                        )}

                        {/* Correct Answer (only show for wrong answers) */}
                        {!isCorrect && (
                          <p className="text-sm text-green-400 font-medium mt-2">
                            ⭐ Correct answer: {question.options?.[question.correctAnswer as number]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onComplete || (() => navigate('/dashboard'))}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{getSkillName(skill)} Evaluation</h1>
                <p className="text-gray-400">Skill Assessment Test</p>
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
        <div className="grid grid-cols-10 gap-2">
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

export default Evaluation;
