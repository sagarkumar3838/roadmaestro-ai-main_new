import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  Trophy, 
  Target,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  EvaluationLevel, 
  TechnicalEvaluation, 
  EvaluationQuestion, 
  EvaluationResponse,
  EvaluationResult 
} from '@/types/evaluation';
import { technicalEvaluationService } from '@/services/technicalEvaluationService';

interface TechnicalEvaluationProps {
  level?: EvaluationLevel;
  onComplete?: (result: EvaluationResult) => void;
}

export default function TechnicalEvaluationComponent({ 
  level = 'BASIC', 
  onComplete 
}: TechnicalEvaluationProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<'level-select' | 'evaluation' | 'results'>('level-select');
  const [selectedLevel, setSelectedLevel] = useState<EvaluationLevel>(level);
  const [evaluation, setEvaluation] = useState<TechnicalEvaluation | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<EvaluationResponse[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  const startEvaluation = (evalLevel: EvaluationLevel) => {
    const newEvaluation = technicalEvaluationService.generateEvaluation(evalLevel);
    setEvaluation(newEvaluation);
    setSelectedLevel(evalLevel);
    setCurrentStep('evaluation');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (answer: number | number[]) => {
    if (!evaluation || !user) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const currentQuestion = evaluation.questions[currentQuestionIndex];
    
    const response: EvaluationResponse = {
      question_id: currentQuestion.question_id,
      selected_answer: answer,
      time_spent: timeSpent
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (currentQuestionIndex < evaluation.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(Date.now());
    } else {
      // Evaluation complete
      const evaluationResult = technicalEvaluationService.calculateResult(
        evaluation,
        newResponses,
        user.uid
      );
      setResult(evaluationResult);
      setCurrentStep('results');
      onComplete?.(evaluationResult);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Remove the last response
      setResponses(responses.slice(0, -1));
      setQuestionStartTime(Date.now());
    }
  };

  const currentQuestion = evaluation?.questions[currentQuestionIndex];
  const progress = evaluation ? ((currentQuestionIndex + 1) / evaluation.questions.length) * 100 : 0;

  const levelDescriptions = {
    BASIC: {
      title: 'Basic Level',
      description: 'Fundamental concepts and syntax',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    INTERMEDIATE: {
      title: 'Intermediate Level',
      description: 'Practical application and problem-solving',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50'
    },
    ADVANCED: {
      title: 'Advanced Level',
      description: 'Complex scenarios and best practices',
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50'
    }
  };

  if (currentStep === 'level-select') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical 