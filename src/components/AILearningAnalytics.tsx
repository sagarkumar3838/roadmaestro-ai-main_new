import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { getUserEvaluationResults } from '@/services/evaluationService';
import { aiEvaluationService } from '@/services/aiEvaluationService';
import { Skill, Difficulty } from '@/types/question';
import {
  Brain,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Calendar,
  BarChart3,
  Lightbulb,
  Loader2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LearningAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  nextSteps: string[];
}

interface TestHistory {
  skill: Skill;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  timestamp: Date;
}

const AILearningAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [analysis, setAnalysis] = useState<LearningAnalysis | null>(null);
  const [loading, setLoading] = useState({
    history: true,
    analysis: false
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      loadTestHistory();
    }
  }, [user]);

  const loadTestHistory = async () => {
    if (!user) return;

    setLoading(prev => ({ ...prev, history: true }));
    try {
      const results = await getUserEvaluationResults(user.uid);
      const history: TestHistory[] = Object.entries(results).map(([skill, result]) => ({
        skill: skill as Skill,
        difficulty: 'medium' as Difficulty, // Default, should be stored in results
        score: Math.round((result.percentage / 100) * 10), // Approximate score
        totalQuestions: 10,
        timestamp: new Date(result.timestamp)
      }));
      
      setTestHistory(history);
    } catch (error) {
      console.error('Error loading test history:', error);
    } finally {
      setLoading(prev => ({ ...prev, history: false }));
    }
  };

  const generateAnalysis = async () => {
    if (testHistory.length === 0 || !aiEvaluationService.isAvailable()) return;

    setLoading(prev => ({ ...prev, analysis: true }));
    try {
      const analysisResult = await aiEvaluationService.analyzeLearningPattern(testHistory);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error generating analysis:', error);
    } finally {
      setLoading(prev => ({ ...prev, analysis: false }));
    }
  };

  const getSkillProgress = () => {
    const skillStats: Record<Skill, { tests: number; avgScore: number; lastTest: Date | null }> = {
      html: { tests: 0, avgScore: 0, lastTest: null },
      css: { tests: 0, avgScore: 0, lastTest: null },
      javascript: { tests: 0, avgScore: 0, lastTest: null },
      jquery: { tests: 0, avgScore: 0, lastTest: null },
      devtools: { tests: 0, avgScore: 0, lastTest: null }
    };

    testHistory.forEach(test => {
      const skill = test.skill;
      skillStats[skill].tests++;
      skillStats[skill].avgScore += (test.score / test.totalQuestions) * 100;
      if (!skillStats[skill].lastTest || test.timestamp > skillStats[skill].lastTest!) {
        skillStats[skill].lastTest = test.timestamp;
      }
    });

    Object.keys(skillStats).forEach(skill => {
      const stats = skillStats[skill as Skill];
      if (stats.tests > 0) {
        stats.avgScore = stats.avgScore / stats.tests;
      }
    });

    return skillStats;
  };

  const getOverallProgress = () => {
    if (testHistory.length === 0) return 0;
    const totalScore = testHistory.reduce((sum, test) => sum + (test.score / test.totalQuestions) * 100, 0);
    return totalScore / testHistory.length;
  };

  const getRecentTrend = () => {
    if (testHistory.length < 2) return 'stable';
    const recent = testHistory.slice(-3);
    const scores = recent.map(test => (test.score / test.totalQuestions) * 100);
    
    const trend = scores[scores.length - 1] - scores[0];
    if (trend > 5) return 'improving';
    if (trend < -5) return 'declining';
    return 'stable';
  };

  const skillProgress = getSkillProgress();
  const overallProgress = getOverallProgress();
  const trend = getRecentTrend();

  if (loading.history) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-white">Loading your learning analytics...</span>
      </div>
    );
  }

  if (testHistory.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Test History</h3>
          <p className="text-gray-400 mb-6">Take some tests to see your learning analytics and AI insights.</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Take Your First Test
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="h-6 w-6" />
            AI Learning Analytics
          </h2>
          <p className="text-gray-400">Personalized insights powered by AI</p>
        </div>
        {aiEvaluationService.isAvailable() && (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Enhanced
          </Badge>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold text-white">{overallProgress.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={overallProgress} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tests Completed</p>
                <p className="text-2xl font-bold text-white">{testHistory.length}</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Learning Trend</p>
                <p className="text-2xl font-bold text-white capitalize">{trend}</p>
              </div>
              <TrendingUp className={`h-8 w-8 ${
                trend === 'improving' ? 'text-green-500' : 
                trend === 'declining' ? 'text-red-500' : 'text-yellow-500'
              }`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Skills Overview
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Skills Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(skillProgress).map(([skill, stats]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium capitalize">{skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{stats.tests} tests</span>
                      <span className="text-sm font-medium text-white">
                        {stats.avgScore.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={stats.avgScore} className="h-2" />
                  {stats.lastTest && (
                    <p className="text-xs text-gray-500">
                      Last test: {stats.lastTest.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Test History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testHistory.slice(-5).reverse().map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="capitalize">
                        {test.skill}
                      </Badge>
                      <span className="text-white">
                        {test.score}/{test.totalQuestions}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {((test.score / test.totalQuestions) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-400">
                        {test.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Learning Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiEvaluationService.isAvailable() ? (
                analysis ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Your Strengths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.strengths.map((strength, index) => (
                          <Badge key={index} className="bg-green-600">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.weaknesses.map((weakness, index) => (
                          <Badge key={index} variant="outline" className="border-yellow-400 text-yellow-400">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        AI Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-gray-300 flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Button
                      onClick={generateAnalysis}
                      disabled={loading.analysis}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {loading.analysis ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4 mr-2" />
                      )}
                      Generate AI Analysis
                    </Button>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">AI analysis is not available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis?.nextSteps ? (
                <div className="space-y-3">
                  {analysis.nextSteps.map((step, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-700 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{step}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Generate AI analysis first to see personalized recommendations</p>
                  <Button
                    onClick={generateAnalysis}
                    disabled={loading.analysis}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {loading.analysis ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Brain className="h-4 w-4 mr-2" />
                    )}
                    Generate Analysis
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AILearningAnalytics;