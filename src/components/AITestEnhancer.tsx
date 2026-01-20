import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question, Skill, Difficulty } from '@/types/question';
import SmartEvaluationResults from './SmartEvaluationResults';
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Zap,
  ArrowRight 
} from 'lucide-react';

interface AITestEnhancerProps {
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, number | string>;
  onClose: () => void;
  onRetakeTest?: () => void;
  showBasicResults?: boolean;
}

const AITestEnhancer: React.FC<AITestEnhancerProps> = ({
  skill,
  difficulty,
  score,
  totalQuestions,
  questions,
  selectedAnswers,
  onClose,
  onRetakeTest,
  showBasicResults = false
}) => {
  const [showSmartResults, setShowSmartResults] = useState(false);
  
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  // If user wants smart results, show the enhanced component
  if (showSmartResults) {
    return (
      <SmartEvaluationResults
        skill={skill}
        difficulty={difficulty}
        score={score}
        totalQuestions={totalQuestions}
        questions={questions}
        selectedAnswers={selectedAnswers}
        onClose={onClose}
        onRetakeTest={onRetakeTest}
      />
    );
  }

  // Show upgrade prompt or basic results
  return (
    <div className="space-y-6">
      {/* Basic Results (if requested) */}
      {showBasicResults && (
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
      )}

      {/* AI Enhancement Offer */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Unlock Smart AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            Get personalized insights, smart explanations, and adaptive practice questions 
            powered by our free AI system.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Smart Feedback</span>
              </div>
              <p className="text-gray-400 text-sm">
                Personalized analysis of your performance with actionable insights
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">Study Plan</span>
              </div>
              <p className="text-gray-400 text-sm">
                Custom study recommendations based on your weak areas
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-white font-medium">Practice Questions</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-generated questions targeting your specific needs
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="text-white font-medium">What you'll get:</h4>
            <ul className="space-y-1 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Detailed explanation for each incorrect answer
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Personalized study recommendations with resources
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Adaptive practice questions for weak areas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Performance insights and learning analytics
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => setShowSmartResults(true)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get Smart Analysis
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Skip for Now
            </Button>
          </div>

          {/* Free Badge */}
          <div className="text-center">
            <Badge className="bg-green-600 text-white">
              <Zap className="h-3 w-3 mr-1" />
              100% Free - No Limits
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        {!passed && onRetakeTest && (
          <Button onClick={onRetakeTest} variant="outline" className="flex-1">
            Retake Test
          </Button>
        )}
        <Button 
          onClick={() => window.open('/dashboard', '_blank')} 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default AITestEnhancer;