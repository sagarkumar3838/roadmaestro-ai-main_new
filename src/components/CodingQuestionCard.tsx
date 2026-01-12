import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CodeEditor from "@/components/CodeEditor";
import { getRandomCodingQuestion } from "@/services/CodingQuestionService";


type CodingQuestion = {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

interface CodingQuestionCardProps {
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const CodingQuestionCard: React.FC<CodingQuestionCardProps> = ({ category, difficulty }) => {
  const [codingQuestion, setCodingQuestion] = useState<CodingQuestion | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const codeQ = await getRandomCodingQuestion(category, difficulty);
        setCodingQuestion(codeQ);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category, difficulty]);

  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl transition-all duration-500 flex flex-col">
      <CardHeader>
        <CardTitle>
          <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
            Code Practice
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-lg font-medium text-pink-600">Loading coding question...</p>
          </div>
        ) : codingQuestion ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">{codingQuestion.title}</h3>
            <p className="text-sm text-muted-foreground">{codingQuestion.description}</p>
            <CodeEditor initialCode={codingQuestion.starterCode} />
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold">No coding question available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CodingQuestionCard;
