import { useState, useCallback } from 'react';
import { Question, Skill, Difficulty } from '@/types/question';
import { freeAIService } from '@/services/freeAIService';

interface UseSmartEvaluationProps {
  skill: Skill;
  difficulty: Difficulty;
  questions: Question[];
  selectedAnswers: Record<number, number | string>;
}

interface SmartEvaluationData {
  feedback: string;
  recommendations: Array<{
    topic: string;
    recommendation: string;
    resources: string[];
  }>;
  explanations: Record<number, string>;
  isLoading: boolean;
  error: string | null;
}

export const useSmartEvaluation = ({
  skill,
  difficulty,
  questions,
  selectedAnswers
}: UseSmartEvaluationProps) => {
  const [data, setData] = useState<SmartEvaluationData>({
    feedback: '',
    recommendations: [],
    explanations: {},
    isLoading: false,
    error: null
  });

  // Calculate basic metrics
  const score = questions.reduce((acc, question, index) => {
    return selectedAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = (score / questions.length) * 100;
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

  // Generate smart feedback
  const generateFeedback = useCallback(async () => {
    if (data.feedback) return data.feedback; // Return cached if available

    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const feedback = await freeAIService.generatePersonalizedFeedback(
        skill,
        difficulty,
        score,
        questions.length,
        incorrectQuestions
      );
      
      setData(prev => ({ ...prev, feedback, isLoading: false }));
      return feedback;
    } catch (error) {
      const errorMessage = 'Unable to generate feedback at this time';
      setData(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      return errorMessage;
    }
  }, [skill, difficulty, score, questions.length, incorrectQuestions, data.feedback]);

  // Generate study recommendations
  const generateRecommendations = useCallback(async () => {
    if (data.recommendations.length > 0) return data.recommendations;
    if (weakTopics.length === 0) return [];

    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const recommendations = await freeAIService.generateStudyRecommendations(skill, weakTopics);
      setData(prev => ({ ...prev, recommendations, isLoading: false }));
      return recommendations;
    } catch (error) {
      const errorMessage = 'Unable to generate recommendations';
      setData(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      return [];
    }
  }, [skill, weakTopics, data.recommendations]);

  // Generate explanation for specific question
  const generateExplanation = useCallback(async (questionIndex: number) => {
    if (data.explanations[questionIndex]) return data.explanations[questionIndex];

    const item = incorrectQuestions.find(q => q.index === questionIndex);
    if (!item) return '';

    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const explanation = await freeAIService.explainIncorrectAnswer(
        item.question,
        item.userAnswer,
        item.question.correctAnswer
      );
      
      setData(prev => ({
        ...prev,
        explanations: { ...prev.explanations, [questionIndex]: explanation },
        isLoading: false
      }));
      
      return explanation;
    } catch (error) {
      const errorMessage = 'Unable to generate explanation';
      setData(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      return errorMessage;
    }
  }, [incorrectQuestions, data.explanations]);

  // Get quick insights without AI calls
  const getQuickInsights = useCallback(() => {
    const insights = {
      score,
      percentage: Math.round(percentage),
      passed,
      totalQuestions: questions.length,
      incorrectCount: incorrectQuestions.length,
      weakTopics,
      performanceLevel: percentage >= 90 ? 'Excellent' : 
                      percentage >= 80 ? 'Good' : 
                      percentage >= 70 ? 'Pass' : 'Needs Practice',
      studyTimeRecommended: Math.ceil(percentage < 70 ? (70 - percentage) / 10 : 0),
      readyForNextLevel: passed
    };

    return insights;
  }, [score, percentage, passed, questions.length, incorrectQuestions.length, weakTopics]);

  // Check if AI features are available
  const isAIAvailable = freeAIService.isAvailable();
  const serviceStatus = freeAIService.getServiceStatus();

  return {
    // Data
    ...data,
    
    // Metrics
    score,
    percentage,
    passed,
    incorrectQuestions,
    weakTopics,
    
    // Methods
    generateFeedback,
    generateRecommendations,
    generateExplanation,
    getQuickInsights,
    
    // Status
    isAIAvailable,
    serviceStatus
  };
};