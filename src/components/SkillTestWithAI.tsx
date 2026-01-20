import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question, Skill, Difficulty } from '@/types/question';
import AITestEnhancer from './AITestEnhancer';
import { useSmartEvaluation } from '@/hooks/useSmartEvaluation';
import { 
  CheckCircle, 
  XCircle, 
  Target, 
  Sparkles,
  Brain,
  TrendingUp
} from 'lucide-react';

interface SkillTestWithAIProps {
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, number | string>;
  onClose: () => void;
  onRetakeTest?: () => void;
}

const SkillTestWithAI: React.FC<SkillTestWithAIProps> = ({
  skill,
  difficulty,
  score,
  totalQuestions,
  questions,
  selectedAnswers,
  onClose,
  onRetakeTest
}) => {
  const [showAIResults, setShowAIResults] = useState(false);
  
  const {
    percentage,
    passed,
    incorrectQuestions,
    weakTopics,
    getQuickInsights,
    isAIAvailable,
    serviceStatus
  } = useSmartEvaluation({
    skill,
    difficulty,
    questions,
    selectedAnswers
  });

  const insights = getQuickInsights();

  // Show AI-enhanced results if requested
  if (showAIResults) {
    return (
      <AITestEnhancer
        skill={skill}
        difficulty={difficulty}
        score={score}
        totalQuestions={totalQuestions}
        questions={questions}
        selectedAnswers={selectedAnswers}
        onClose={onClose}
        onRetakeTest={onRetakeTest}
        showBasicResults={false}
      />
    );
  }

  const getSkillName = (skill: Skill) => {
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  return (
    <div className="h-screen w-screen bg-gray-900 p-4 md:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Test Complete
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {getSkillName(skill)} Results
          </h1>
          <p className="text-gray-400">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Assessment
          </p>
        </div>

        {/* Main Results Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Target className="h-6 w-6" />
              {getSkillName(skill)} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
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
              <div className="text-3xl font-bold mb-2">{score}/{totalQuestions}</div>
              <div className="text-xl mb-4">{percentage.toFixed(1)}%</div>
              <Badge className={passed ? 'bg-green-500' : 'bg-red-500'}>
                {passed ? 'PASSED' : 'NEEDS PRACTICE'}
              </Badge>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-gray-700 text-center">
                <div className="text-2xl font-bold text-blue-400">{insights.performanceLevel}</div>
                <div className="text-sm text-gray-400">Performance Level</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-700 text-center">
                <div className="text-2xl font-bold text-purple-400">{weakTopics.length}</div>
                <div className="text-sm text-gray-400">Areas to Focus</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-700 text-center">
                <div className="text-2xl font-bold text-green-400">{insights.studyTimeRecommended}h</div>
                <div className="text-sm text-gray-400">Study Time Suggested</div>
              </div>
            </div>

            {/* Performance Message */}
            {passed ? (
              <div className="text-center text-green-400">
                <p className="text-lg">Congratulations! You've mastered this level.</p>
                <p className="text-sm opacity-75">Next level unlocked!</p>
              </div>
            ) : (
              <div className="text-center text-yellow-400">
                <p className="text-lg">Keep practicing to unlock the next level.</p>
                <p className="text-sm opacity-75 mt-2">Focus on: {weakTopics.join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Enhancement Offer */}
        {isAIAvailable && (
          <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Want Deeper Insights?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Get personalized AI analysis with smart explanations, study recommendations, 
                and practice questions tailored to your performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 rounded bg-gray-800/50">
                  <Brain className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Smart Feedback</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded bg-gray-800/50">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Study Plan</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded bg-gray-800/50">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Practice Questions</span>
                </div>
              </div>

              <Button
                onClick={() => setShowAIResults(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Analysis (Free)
              </Button>

              {/* Service Status */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.local ? 'bg-green-500' : 'bg-red-500'}`} />
                  Local AI
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${serviceStatus.rapidApi ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  Cloud AI
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Question Review */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

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

                      {!isCorrect && (
                        <p className="text-sm text-green-400 font-medium">
                          ⭐ Correct answer: {question.options?.[question.correctAnswer as number]}
                        </p>
                      )}

                      {question.topic && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {question.topic}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={onClose} className="flex-1">
            Close
          </Button>
          {!passed && onRetakeTest && (
            <Button onClick={onRetakeTest} variant="outline" className="flex-1">
              Retake Test
            </Button>
          )}
          <Button 
            onClick={() => window.open('/dashboard', '_blank')} 
            variant="outline" 
            className="flex-1"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillTestWithAI;