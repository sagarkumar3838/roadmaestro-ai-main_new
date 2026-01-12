import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/CodeEditor';
import { getRandomCodingQuestion } from '@/services/CodingQuestionService';
import { getUniquePoolQuestions, PoolCategoryKey, PoolDifficulty } from '@/services/poolQuestionService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


import CodingQuestionCard from "@/components/CodingQuestionCard";

type Question = {
  id: string;
  text: string;
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

type CodingQuestion = {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export default function Practice(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<PoolCategoryKey>('web-development');
  const [difficulty, setDifficulty] = useState<PoolDifficulty>('beginner');
  const [codingQuestion, setCodingQuestion] = useState<CodingQuestion | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const mcqs = await getUniquePoolQuestions(category, difficulty, 5);
        setQuestions(mcqs);
        const initial: Record<string, number | null> = {};
        mcqs.forEach((q) => (initial[q.id] = null));
        setSelectedAnswers(initial);

        const codeQ = await getRandomCodingQuestion(category, difficulty);
        setCodingQuestion(codeQ);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category, difficulty, refreshIndex]);

  const score = useMemo(() => {
    if (!showResults) return 0;
    return questions.reduce((acc, q) => acc + (selectedAnswers[q.id] === q.correctAnswer ? 1 : 0), 0);
  }, [showResults, questions, selectedAnswers]);

  const allAnswered = useMemo(() => {
    return questions.every((q) => selectedAnswers[q.id] !== null && selectedAnswers[q.id] !== undefined);
  }, [questions, selectedAnswers]);

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-900 transition-all duration-500 space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-64">
          <Select value={category} onValueChange={(v) => setCategory(v as PoolCategoryKey)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="ai-ml">AI / ML</SelectItem>
              <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="mobile-development">Mobile Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-48">
          <Select value={difficulty} onValueChange={(v) => setDifficulty(v as PoolDifficulty)}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => { setShowResults(false); setRefreshIndex((i) => i + 1); }}>New Set</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCQ Practice Card */}
        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl transition-all duration-500">
          <CardHeader>
            <CardTitle>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                MCQ Practice
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-lg font-medium text-blue-600">Loading questions...</p>
              </div>
            )}
            {!loading && questions.length === 0 && (
              <p className="text-center text-red-500 font-semibold">No questions available.</p>
            )}
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-medium text-lg text-purple-700 dark:text-purple-300 transition-colors duration-300">
                    {idx + 1}. {q.text}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => {
                      const isSelected = selectedAnswers[q.id] === i;
                      const isCorrect = showResults && q.correctAnswer === i;
                      const isWrong = showResults && isSelected && !isCorrect;
                      return (
                        <button
                          key={i}
                          onClick={() => !showResults && setSelectedAnswers((prev) => ({ ...prev, [q.id]: i }))}
                          className={`w-full text-left border rounded-xl p-2 font-medium transition-all duration-300
                            ${isCorrect ? 'border-green-500 bg-green-100 dark:bg-green-950/40 animate-pulse' :
                            isWrong ? 'border-red-500 bg-red-100 dark:bg-red-950/40 animate-shake' :
                            isSelected ? 'border-blue-500 bg-blue-100 dark:bg-blue-950/40 animate-pulse' :
                            'border-border bg-white/40 dark:bg-gray-800/40 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'}
                          `}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              {!showResults ? (
                <Button
                  disabled={!allAnswered}
                  onClick={() => setShowResults(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Submit
                </Button>
              ) : (
                <>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400 animate-fade-in">
                    Score: {score} / {questions.length}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => { setShowResults(false); setRefreshIndex((i) => i + 1); }}
                    className="border-purple-400 text-purple-600 font-bold px-6 py-2 rounded-xl shadow hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all duration-300"
                  >
                    Try Another Set
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Code Editor Card */}
        <CodingQuestionCard category={category} difficulty={difficulty} />
      </div>
    </div>
  );
}




