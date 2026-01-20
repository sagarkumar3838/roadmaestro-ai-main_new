import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Question, Skill, Difficulty } from '@/types/question';
import { freeAIService } from '@/services/freeAIService';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Lightbulb,
  Loader2,
  Sparkles,
  CheckCircle,
  XCircle,
  Award,
  RefreshCw,
  Zap
} from 'lucide-react';

interface SmartEvaluationResultsProps {
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, number | string>;
  onClose: () => void;
  onRetakeTest?: () => void;
}

interface StudyRecommendation {
  topic: string;
  recommendation: string;
  resources: string[];
}

const SmartEvaluationResults: React.FC<SmartEvaluationResultsProps> = ({
  skill,
  difficulty,
  score,
  totalQuestions,
  questions,
  selectedAnswers,
  onClose,
  onRetakeTest
}) => {
  const [aiFeatures, setAiFeatures] = useState({
    feedback: '',
    recommendations: [] as StudyRecommendation[],
    explanations: {} as Record<number, string>,
    adaptiveQuestions: [] as Question[]
  });
  
  const [loading, setLoading] = useState({
    feedback: false,
    recommendations: false,
    explanations: {} as Record<number, boolean>,
    adaptiveQuestions: false
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [serviceStatus, setServiceStatus] = useState(freeAIService.getServiceStatus());

  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  // Get incorrect questions with details
  const incorrectQuestions = questions
    .map((question, index) => ({
      question,
      userAnswer: selectedAnswers[index],
      index
    }))
    .filter(item => item.userAnswer !== item.question.correctAnswer);

  // Extract weak topics
  const weakTopics = [...new Set(incorrectQuestions.map(item => item.question.topic || item.question.skill))];

  // Performance metrics
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-400', icon: Award };
    if (percentage >= 80) return { level: 'Good', color: 'text-blue-400', icon: CheckCircle };
    if (percentage >= 70) return { level: 'Pass', color: 'text-yellow-400', icon: Target };
    return { level: 'Needs Practice', color: 'text-red-400', icon: XCircle };
  };

  const performanceLevel = getPerformanceLevel();

  useEffect(() => {
    // Load AI features on component mount
    loadSmartFeedback();
    if (weakTopics.length > 0) {
      loadStudyRecommendations();
    }
  }, []);

  const loadSmartFeedback = async () => {
    setLoading(prev => ({ ...prev, feedback: true }));
    try {
      const feedback = await freeAIService.generatePersonalizedFeedback(
        skill,
        difficulty,
        score,
        totalQuestions,
        incorrectQuestions
      );
      setAiFeatures(prev => ({ ...prev, feedback }));
    } catch (error) {
      console.error('Error loading smart feedback:', error);
    } finally {
      setLoading(prev => ({ ...prev, feedback: false }));
    }
  };

  const loadStudyRecommendations = async () => {
    if (weakTopics.length === 0) return;

    setLoading(prev => ({ ...prev, recommendations: true }));
    try {
      const recommendations = await freeAIService.generateStudyRecommendations(skill, weakTopics);
      setAiFeatures(prev => ({ ...prev, recommendations }));
    } catch (error) {
      console.error('Error loading study recommendations:', error);
    } finally {
      setLoading(prev => ({ ...prev, recommendations: false }));
    }
  };

  const loadExplanation = async (questionIndex: number) => {
    const item = incorrectQuestions.find(q => q.index === questionIndex);
    if (!item) return;

    setLoading(prev => ({ 
      ...prev, 
      explanations: { ...prev.explanations, [questionIndex]: true }
    }));

    try {
      const explanation = await freeAIService.explainIncorrectAnswer(
        item.question,
        item.userAnswer,
        item.question.correctAnswer
      );
      setAiFeatures(prev => ({
        ...prev,
        explanations: { ...prev.explanations, [questionIndex]: explanation }
      }));
    } catch (error) {
      console.error('Error loading explanation:', error);
    } finally {
      setLoading(prev => ({ 
        ...prev, 
        explanations: { ...prev.explanations, [questionIndex]: false }
      }));
    }
  };

  const loadAdaptiveQuestions = async () => {
    if (weakTopics.length === 0) return;

    setLoading(prev => ({ ...prev, adaptiveQuestions: true }));
    try {
      const adaptiveQuestions = await freeAIService.generateAdaptiveQuestions(
        skill,
        difficulty,
        weakTopics,
        5
      );
      setAiFeatures(prev => ({ ...prev, adaptiveQuestions }));
    } catch (error) {
      console.error('Error loading adaptive questions:', error);
    } finally {
      setLoading(prev => ({ ...prev, adaptiveQuestions: false }));
    }
  };

  const SmartFeatureBadge = () => (
    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Zap className="h-3 w-3 mr-1" />
      Smart AI
    </Badge>
  );

  const ServiceStatusIndicator = () => (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${serviceStatus.local ? 'bg-green-500' : 'bg-red-500'}`} />
        Local AI
      </div>
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${serviceStatus.rapidApi ? 'bg-green-500' : 'bg-yellow-500'}`} />
        Cloud AI
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-white">Smart Test Results</h1>
          <SmartFeatureBadge />
        </div>
        <p className="text-gray-400">
          {skill.toUpperCase()} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
        </p>
        <ServiceStatusIndicator />
      </div>

      {/* Score Overview */}
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{score}/{totalQuestions}</div>
              <div className="text-2xl text-white mb-2">{percentage.toFixed(1)}%</div>
              <Badge className={passed ? 'bg-green-500' : 'bg-red-500'}>
                {passed ? 'PASSED' : 'NEEDS PRACTICE'}
              </Badge>
            </div>

            {/* Performance Level */}
            <div className="text-center">
              <performanceLevel.icon className={`h-12 w-12 mx-auto mb-2 ${performanceLevel.color}`} />
              <div className={`text-xl font-semibold ${performanceLevel.color}`}>
                {performanceLevel.level}
              </div>
              <p className="text-gray-400 text-sm mt-1">Performance Level</p>
            </div>

            {/* Progress Visualization */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Correct Answers</span>
                  <span>{score}/{totalQuestions}</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Pass Threshold</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2 opacity-50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Smart Feedback
          </TabsTrigger>
          <TabsTrigger value="study" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study Plan
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Practice More
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Question Review */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Detailed Question Review</span>
                <Badge variant="outline" className="text-gray-400">
                  {incorrectQuestions.length} to review
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const hasExplanation = aiFeatures.explanations[index];
                const isLoadingExplanation = loading.explanations[index];

                return (
                  <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <p className="text-white font-medium">{question.text}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Your answer: </span>
                            <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                              {userAnswer !== undefined ? question.options?.[userAnswer as number] : 'Not answered'}
                            </span>
                          </div>
                          
                          {!isCorrect && (
                            <div>
                              <span className="text-gray-400">Correct answer: </span>
                              <span className="text-green-400 font-medium">
                                {question.options?.[question.correctAnswer as number]}
                              </span>
                            </div>
                          )}
                        </div>

                        {question.topic && (
                          <Badge variant="outline" className="text-xs">
                            {question.topic}
                          </Badge>
                        )}

                        {/* Smart Explanation */}
                        {!isCorrect && (
                          <div className="mt-3">
                            {hasExplanation ? (
                              <div className="p-3 rounded bg-blue-900/30 border border-blue-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="h-4 w-4 text-blue-400" />
                                  <span className="text-sm text-blue-300 font-medium">Smart Explanation</span>
                                </div>
                                <p className="text-sm text-gray-300">{hasExplanation}</p>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => loadExplanation(index)}
                                disabled={isLoadingExplanation}
                                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                              >
                                {isLoadingExplanation ? (
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                ) : (
                                  <Lightbulb className="h-3 w-3 mr-1" />
                                )}
                                Get Smart Explanation
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Personalized Smart Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.feedback ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-2 text-white">Analyzing your performance...</span>
                </div>
              ) : aiFeatures.feedback ? (
                <div className="space-y-4">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed text-lg">{aiFeatures.feedback}</p>
                  </div>
                  
                  {/* Performance Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{score}</div>
                        <div className="text-sm text-gray-400">Correct Answers</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{weakTopics.length}</div>
                        <div className="text-sm text-gray-400">Areas to Focus</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{Math.ceil(percentage/10)}</div>
                        <div className="text-sm text-gray-400">Study Hours Suggested</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Unable to generate feedback at this time</p>
                  <Button 
                    onClick={loadSmartFeedback} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="study" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Personalized Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.recommendations ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-2 text-white">Creating your study plan...</span>
                </div>
              ) : aiFeatures.recommendations.length > 0 ? (
                <div className="space-y-6">
                  {aiFeatures.recommendations.map((rec, index) => (
                    <div key={index} className="p-6 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-lg mb-2">{rec.topic}</h4>
                          <p className="text-gray-300 mb-4 leading-relaxed">{rec.recommendation}</p>
                          
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400 font-medium">Recommended Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {rec.resources.map((resource, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white cursor-pointer transition-colors"
                                >
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-green-400 text-lg font-medium">Excellent Performance!</p>
                  <p className="text-gray-400 mt-2">No specific study recommendations needed. You're ready for the next level!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Smart Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiFeatures.adaptiveQuestions.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-gray-300 mb-4">
                    Here are practice questions targeting your weak areas:
                  </p>
                  {aiFeatures.adaptiveQuestions.map((question, index) => (
                    <div key={question.id} className="p-4 rounded-lg bg-gray-700 border border-gray-600">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-white font-medium flex-1">{question.text}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 ml-9">
                        {question.options?.map((option, optIndex) => (
                          <div 
                            key={optIndex} 
                            className={`p-3 rounded border transition-colors ${
                              optIndex === question.correctAnswer 
                                ? 'bg-green-900/30 border-green-500 text-green-300' 
                                : 'bg-gray-600 border-gray-500 text-gray-300'
                            }`}
                          >
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 ml-9">
                        <Badge className="bg-purple-600">
                          Topic: {question.topic}
                        </Badge>
                        {question.explanation && (
                          <p className="text-xs text-gray-400">
                            💡 {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Button
                    onClick={loadAdaptiveQuestions}
                    disabled={loading.adaptiveQuestions || weakTopics.length === 0}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {loading.adaptiveQuestions ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Generate Practice Questions
                  </Button>
                  {weakTopics.length === 0 && (
                    <p className="text-gray-400 mt-4">Perfect score! No additional practice needed.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={onClose} className="flex-1" variant="outline">
          Close Results
        </Button>
        {!passed && onRetakeTest && (
          <Button onClick={onRetakeTest} className="flex-1 bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Test
          </Button>
        )}
        <Button 
          onClick={() => window.open('/dashboard', '_blank')} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Target className="h-4 w-4 mr-2" />
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default SmartEvaluationResults;