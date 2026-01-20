import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Question, Skill, Difficulty } from '@/types/question';
import { aiEvaluationService } from '@/services/aiEvaluationService';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Lightbulb,
  Loader2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface AIEnhancedResultsProps {
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, number | string>;
  onClose: () => void;
  onRetakeTest: () => void;
}

interface StudyRecommendation {
  topic: string;
  recommendation: string;
  resources: string[];
}

const AIEnhancedResults: React.FC<AIEnhancedResultsProps> = ({
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
    explanations: false,
    adaptiveQuestions: false
  });
  const [activeTab, setActiveTab] = useState('overview');

  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  // Get incorrect questions
  const incorrectQuestions = questions
    .map((question, index) => ({
      question,
      userAnswer: selectedAnswers[index],
      index
    }))
    .filter(item => item.userAnswer !== item.question.correctAnswer);

  // Get weak topics
  const weakTopics = [...new Set(incorrectQuestions.map(item => item.question.topic || item.question.skill))];

  useEffect(() => {
    if (aiEvaluationService.isAvailable()) {
      loadAIFeedback();
      loadStudyRecommendations();
    }
  }, []);

  const loadAIFeedback = async () => {
    if (incorrectQuestions.length === 0) return;

    setLoading(prev => ({ ...prev, feedback: true }));
    try {
      const feedback = await aiEvaluationService.generatePersonalizedFeedback(
        skill,
        difficulty,
        score,
        totalQuestions,
        incorrectQuestions
      );
      setAiFeatures(prev => ({ ...prev, feedback }));
    } catch (error) {
      console.error('Error loading AI feedback:', error);
    } finally {
      setLoading(prev => ({ ...prev, feedback: false }));
    }
  };

  const loadStudyRecommendations = async () => {
    if (weakTopics.length === 0) return;

    setLoading(prev => ({ ...prev, recommendations: true }));
    try {
      const recommendations = await aiEvaluationService.generateStudyRecommendations(skill, weakTopics);
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

    setLoading(prev => ({ ...prev, explanations: true }));
    try {
      const explanation = await aiEvaluationService.explainIncorrectAnswer(
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
      setLoading(prev => ({ ...prev, explanations: false }));
    }
  };

  const loadAdaptiveQuestions = async () => {
    if (weakTopics.length === 0) return;

    setLoading(prev => ({ ...prev, adaptiveQuestions: true }));
    try {
      const adaptiveQuestions = await aiEvaluationService.generateAdaptiveQuestions(
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

  const AIFeatureBadge = () => (
    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <Sparkles className="h-3 w-3 mr-1" />
      AI Enhanced
    </Badge>
  );

  return (
    <div className="space-y-6">
      {/* Header with AI Badge */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="text-3xl font-bold text-white">Test Results</h1>
          {aiEvaluationService.isAvailable() && <AIFeatureBadge />}
        </div>
        <p className="text-gray-400">
          {skill.toUpperCase()} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
        </p>
      </div>

      {/* Main Results Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-white">{score}/{totalQuestions}</div>
            <div className="text-2xl text-white">{percentage.toFixed(1)}%</div>
            <Badge className={passed ? 'bg-green-500' : 'bg-red-500'}>
              {passed ? 'PASSED' : 'NEEDS PRACTICE'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI-Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Feedback
          </TabsTrigger>
          <TabsTrigger value="study" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study Plan
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Question Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const hasExplanation = aiFeatures.explanations[index];

                return (
                  <div key={question.id} className="p-4 rounded-lg bg-gray-700">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.text}</p>
                        <p className="text-sm text-gray-300 mb-1">
                          Your answer: {userAnswer !== undefined ? question.options?.[userAnswer as number] : 'Not answered'}
                        </p>
                        
                        {!isCorrect && (
                          <>
                            <p className="text-sm text-green-400 font-medium">
                              Correct answer: {question.options?.[question.correctAnswer as number]}
                            </p>
                            
                            {aiEvaluationService.isAvailable() && (
                              <div className="mt-3">
                                {hasExplanation ? (
                                  <div className="p-3 rounded bg-blue-900/30 border border-blue-700">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Brain className="h-4 w-4 text-blue-400" />
                                      <span className="text-sm text-blue-300 font-medium">AI Explanation</span>
                                    </div>
                                    <p className="text-sm text-gray-300">{hasExplanation}</p>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => loadExplanation(index)}
                                    disabled={loading.explanations}
                                    className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                                  >
                                    {loading.explanations ? (
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    ) : (
                                      <Lightbulb className="h-3 w-3 mr-1" />
                                    )}
                                    Get AI Explanation
                                  </Button>
                                )}
                              </div>
                            )}
                          </>
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
                Personalized AI Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiEvaluationService.isAvailable() ? (
                loading.feedback ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-white">Generating personalized feedback...</span>
                  </div>
                ) : aiFeatures.feedback ? (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">{aiFeatures.feedback}</p>
                  </div>
                ) : (
                  <p className="text-gray-400">No feedback available for perfect scores!</p>
                )
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">AI features are not available</p>
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
                AI-Generated Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiEvaluationService.isAvailable() ? (
                loading.recommendations ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-white">Creating your study plan...</span>
                  </div>
                ) : aiFeatures.recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {aiFeatures.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 rounded-lg bg-gray-700">
                        <h4 className="text-white font-semibold mb-2">{rec.topic}</h4>
                        <p className="text-gray-300 mb-3">{rec.recommendation}</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.resources.map((resource, idx) => (
                            <Badge key={idx} variant="outline" className="text-blue-400 border-blue-400">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Great job! No specific study recommendations needed.</p>
                )
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">AI study recommendations are not available</p>
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
                Adaptive Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiEvaluationService.isAvailable() ? (
                <div className="space-y-4">
                  {aiFeatures.adaptiveQuestions.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        AI-generated questions targeting your weak areas:
                      </p>
                      {aiFeatures.adaptiveQuestions.map((question, index) => (
                        <div key={question.id} className="p-4 rounded-lg bg-gray-700">
                          <p className="text-white font-medium mb-2">{question.text}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {question.options?.map((option, optIndex) => (
                              <div key={optIndex} className="p-2 rounded bg-gray-600 text-gray-300">
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                          <Badge className="mt-2 bg-purple-600">
                            Topic: {question.topic}
                          </Badge>
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
                        <p className="text-gray-400 mt-2">Perfect score! No practice questions needed.</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">AI practice questions are not available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={onClose} className="flex-1">
          Close
        </Button>
        {!passed && (
          <Button onClick={onRetakeTest} variant="outline" className="flex-1">
            Retake Test
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIEnhancedResults;