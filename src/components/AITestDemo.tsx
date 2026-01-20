import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { freeAIService } from '@/services/freeAIService';
import { Brain, CheckCircle, Zap } from 'lucide-react';

const AITestDemo: React.FC = () => {
  const [status, setStatus] = React.useState<string>('Ready to test');
  const [serviceStatus, setServiceStatus] = React.useState(freeAIService.getServiceStatus());

  const testAIService = async () => {
    setStatus('Testing AI services...');
    
    try {
      // Test feedback generation
      const feedback = await freeAIService.generatePersonalizedFeedback(
        'javascript',
        'easy',
        7,
        10,
        [
          {
            question: {
              id: 'test-1',
              skill: 'javascript',
              difficulty: 'easy',
              type: 'multiple-choice',
              text: 'What is the correct way to declare a variable?',
              options: ['var x', 'let x', 'const x', 'All of the above'],
              correctAnswer: 3,
              topic: 'Variables'
            },
            userAnswer: 0
          }
        ]
      );

      setStatus(`✅ AI Service Working! Generated ${feedback.length} characters of feedback.`);
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Evaluation System Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded bg-gray-700">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${serviceStatus.local ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="text-white text-sm">Local AI</div>
              <div className="text-xs text-gray-400">Always Available</div>
            </div>
            
            <div className="text-center p-3 rounded bg-gray-700">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${serviceStatus.huggingFace ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div className="text-white text-sm">Hugging Face</div>
              <div className="text-xs text-gray-400">Free Demo</div>
            </div>
            
            <div className="text-center p-3 rounded bg-gray-700">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${serviceStatus.rapidApi ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div className="text-white text-sm">RapidAPI</div>
              <div className="text-xs text-gray-400">Optional</div>
            </div>
          </div>

          <div className="p-4 rounded bg-gray-700">
            <div className="text-white font-medium mb-2">Status:</div>
            <div className="text-gray-300">{status}</div>
          </div>

          <Button 
            onClick={testAIService}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Test AI Services
          </Button>

          <div className="text-center">
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Integration Complete
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITestDemo;