import { Question, Skill, Difficulty } from '@/types/question';

// AI-powered evaluation service
export class AIEvaluationService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. AI features will be disabled.');
    }
  }

  private async makeOpenAIRequest(messages: any[], model = 'gpt-3.5-turbo') {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  // Generate personalized feedback based on test results
  async generatePersonalizedFeedback(
    skill: Skill,
    difficulty: Difficulty,
    score: number,
    totalQuestions: number,
    incorrectQuestions: Array<{ question: Question; userAnswer: string | number }>
  ): Promise<string> {
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

    const messages = [
      {
        role: 'system',
        content: `You are an expert programming instructor providing personalized feedback for a ${skill.toUpperCase()} ${difficulty} level test. Be encouraging, specific, and provide actionable advice.`
      },
      {
        role: 'user',
        content: `
Student Results:
- Skill: ${skill.toUpperCase()}
- Level: ${difficulty}
- Score: ${score}/${totalQuestions} (${percentage.toFixed(1)}%)
- Status: ${passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}

Incorrect Questions:
${incorrectQuestions.map((item, index) => `
${index + 1}. Question: ${item.question.text}
   Student Answer: ${typeof item.userAnswer === 'number' ? item.question.options?.[item.userAnswer] : item.userAnswer}
   Correct Answer: ${typeof item.question.correctAnswer === 'number' ? item.question.options?.[item.question.correctAnswer] : item.question.correctAnswer}
   Topic: ${item.question.topic || 'General'}
`).join('')}

Provide personalized feedback that:
1. Acknowledges their performance
2. Identifies specific areas for improvement
3. Gives actionable study recommendations
4. Encourages continued learning
Keep it concise but helpful (max 200 words).
        `
      }
    ];

    try {
      return await this.makeOpenAIRequest(messages);
    } catch (error) {
      console.error('Error generating AI feedback:', error);
      return this.getFallbackFeedback(passed, percentage, skill, difficulty);
    }
  }

  // Generate study recommendations based on weak areas
  async generateStudyRecommendations(
    skill: Skill,
    weakTopics: string[]
  ): Promise<Array<{ topic: string; recommendation: string; resources: string[] }>> {
    if (weakTopics.length === 0) return [];

    const messages = [
      {
        role: 'system',
        content: `You are a programming education expert. Provide specific study recommendations for ${skill.toUpperCase()} topics.`
      },
      {
        role: 'user',
        content: `
The student needs help with these ${skill.toUpperCase()} topics:
${weakTopics.map(topic => `- ${topic}`).join('\n')}

For each topic, provide:
1. A brief explanation of why it's important
2. Specific study approach
3. 2-3 recommended resources (prefer MDN, W3Schools, or reputable tutorials)

Format as JSON array with objects containing: topic, recommendation, resources
        `
      }
    ];

    try {
      const response = await this.makeOpenAIRequest(messages);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error generating study recommendations:', error);
      return this.getFallbackRecommendations(skill, weakTopics);
    }
  }

  // Generate adaptive questions based on performance
  async generateAdaptiveQuestions(
    skill: Skill,
    difficulty: Difficulty,
    weakAreas: string[],
    count: number = 5
  ): Promise<Question[]> {
    const messages = [
      {
        role: 'system',
        content: `You are an expert in creating ${skill.toUpperCase()} assessment questions. Generate high-quality multiple-choice questions for ${difficulty} level focusing on specific weak areas.`
      },
      {
        role: 'user',
        content: `
Create ${count} multiple-choice questions for ${skill.toUpperCase()} at ${difficulty} level.
Focus on these weak areas: ${weakAreas.join(', ')}

Each question should:
1. Test practical knowledge
2. Have 4 options (A, B, C, D)
3. Include explanation for correct answer
4. Be appropriate for ${difficulty} level

Format as JSON array with objects containing:
- id (unique string)
- skill ("${skill}")
- difficulty ("${difficulty}")
- type ("multiple-choice")
- text (question text)
- options (array of 4 strings)
- correctAnswer (number 0-3)
- explanation (why the answer is correct)
- topic (specific topic from weak areas)
        `
      }
    ];

    try {
      const response = await this.makeOpenAIRequest(messages);
      const questions = JSON.parse(response);
      return questions.map((q: any, index: number) => ({
        ...q,
        id: `ai-${skill}-${difficulty}-${Date.now()}-${index}`
      }));
    } catch (error) {
      console.error('Error generating adaptive questions:', error);
      return [];
    }
  }

  // Analyze learning patterns and suggest next steps
  async analyzeLearningPattern(
    userHistory: Array<{
      skill: Skill;
      difficulty: Difficulty;
      score: number;
      totalQuestions: number;
      timestamp: Date;
    }>
  ): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    nextSteps: string[];
  }> {
    const messages = [
      {
        role: 'system',
        content: 'You are a learning analytics expert. Analyze the student\'s test history and provide insights.'
      },
      {
        role: 'user',
        content: `
Analyze this student's test history:
${userHistory.map(test => `
- ${test.skill.toUpperCase()} ${test.difficulty}: ${test.score}/${test.totalQuestions} (${((test.score/test.totalQuestions)*100).toFixed(1)}%) on ${test.timestamp.toDateString()}
`).join('')}

Provide analysis in JSON format with:
- strengths: array of identified strong areas
- weaknesses: array of areas needing improvement  
- recommendations: array of specific study suggestions
- nextSteps: array of recommended next actions
        `
      }
    ];

    try {
      const response = await this.makeOpenAIRequest(messages);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error analyzing learning pattern:', error);
      return this.getFallbackAnalysis(userHistory);
    }
  }

  // Generate explanation for incorrect answers
  async explainIncorrectAnswer(
    question: Question,
    userAnswer: string | number,
    correctAnswer: string | number
  ): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a patient programming instructor explaining why an answer is incorrect and helping the student understand the correct concept.`
      },
      {
        role: 'user',
        content: `
Question: ${question.text}
Student's Answer: ${typeof userAnswer === 'number' ? question.options?.[userAnswer] : userAnswer}
Correct Answer: ${typeof correctAnswer === 'number' ? question.options?.[correctAnswer] : correctAnswer}
Topic: ${question.topic || question.skill}

Explain:
1. Why the student's answer is incorrect
2. Why the correct answer is right
3. Key concept to remember
Keep it concise and educational (max 100 words).
        `
      }
    ];

    try {
      return await this.makeOpenAIRequest(messages);
    } catch (error) {
      console.error('Error generating explanation:', error);
      return `The correct answer is ${typeof correctAnswer === 'number' ? question.options?.[correctAnswer] : correctAnswer}. Review the ${question.topic || question.skill} documentation for more details.`;
    }
  }

  // Fallback methods when AI is unavailable
  private getFallbackFeedback(passed: boolean, percentage: number, skill: Skill, difficulty: Difficulty): string {
    if (passed) {
      return `Excellent work! You've successfully passed the ${skill.toUpperCase()} ${difficulty} level test with ${percentage.toFixed(1)}%. Your understanding of the concepts is solid. Keep up the great work and continue to the next level!`;
    } else {
      return `You scored ${percentage.toFixed(1)}% on the ${skill.toUpperCase()} ${difficulty} level test. While you didn't reach the 70% passing threshold this time, you're making progress! Focus on reviewing the topics you missed and try again when you feel ready.`;
    }
  }

  private getFallbackRecommendations(skill: Skill, weakTopics: string[]) {
    return weakTopics.map(topic => ({
      topic,
      recommendation: `Review ${topic} concepts and practice with examples`,
      resources: [
        'MDN Web Docs',
        'W3Schools Tutorial',
        'Practice exercises'
      ]
    }));
  }

  private getFallbackAnalysis(userHistory: any[]) {
    const recentTests = userHistory.slice(-5);
    const averageScore = recentTests.reduce((sum, test) => sum + (test.score / test.totalQuestions), 0) / recentTests.length;
    
    return {
      strengths: averageScore > 0.7 ? ['Consistent performance'] : [],
      weaknesses: averageScore < 0.7 ? ['Needs more practice'] : [],
      recommendations: ['Continue regular practice', 'Focus on weak areas'],
      nextSteps: ['Take more tests', 'Review course materials']
    };
  }

  // Check if AI features are available
  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

// Singleton instance
export const aiEvaluationService = new AIEvaluationService();