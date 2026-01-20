import { Question, Skill, Difficulty } from '@/types/question';

// Free AI service using multiple providers with fallbacks
export class FreeAIService {
  private rapidApiKey: string;

  constructor() {
    this.rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY || '';
  }

  // Use Hugging Face Inference API (free tier)
  private async callHuggingFace(prompt: string, model = 'microsoft/DialoGPT-medium') {
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer hf_demo', // Demo token for basic usage
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 500,
            temperature: 0.7,
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result[0]?.generated_text || '';
      }
    } catch (error) {
      console.log('Hugging Face API unavailable, using fallback');
    }
    return null;
  }

  // Use RapidAPI's free AI services
  private async callRapidAPI(prompt: string) {
    if (!this.rapidApiKey) return null;

    try {
      const response = await fetch('https://chatgpt-api8.p.rapidapi.com/', {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: prompt,
          web_access: false
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.text || '';
      }
    } catch (error) {
      console.log('RapidAPI unavailable, using fallback');
    }
    return null;
  }

  // Smart local AI using rule-based analysis
  private generateLocalFeedback(
    skill: Skill,
    difficulty: Difficulty,
    score: number,
    totalQuestions: number,
    incorrectQuestions: Array<{ question: Question; userAnswer: string | number }>
  ): string {
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

    // Analyze patterns in wrong answers
    const topicCounts: Record<string, number> = {};
    incorrectQuestions.forEach(item => {
      const topic = item.question.topic || item.question.skill;
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });

    const weakestTopic = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    let feedback = '';

    if (passed) {
      feedback = `🎉 Excellent work! You've successfully passed the ${skill.toUpperCase()} ${difficulty} level test with ${percentage.toFixed(1)}%. `;
      
      if (incorrectQuestions.length > 0) {
        feedback += `You showed strong understanding overall, with minor gaps in ${weakestTopic}. `;
      }
      
      feedback += `You're ready to advance to the next level! Keep up the momentum and continue building your skills.`;
    } else {
      feedback = `You scored ${percentage.toFixed(1)}% on the ${skill.toUpperCase()} ${difficulty} level test. `;
      
      if (percentage >= 50) {
        feedback += `You're making good progress! `;
      } else {
        feedback += `This indicates you need more foundational practice. `;
      }

      if (weakestTopic) {
        feedback += `Focus your study efforts on ${weakestTopic}, where you missed ${topicCounts[weakestTopic]} question(s). `;
      }

      const studyTips = this.getStudyTips(skill, difficulty);
      feedback += studyTips;
    }

    return feedback;
  }

  private getStudyTips(skill: Skill, difficulty: Difficulty): string {
    const tips: Record<Skill, Record<Difficulty, string>> = {
      html: {
        easy: "Review basic HTML tags, attributes, and document structure. Practice creating simple web pages.",
        medium: "Focus on semantic HTML, forms, and accessibility features. Study HTML5 elements.",
        hard: "Master advanced HTML5 APIs, custom elements, and complex form validation.",
        advanced: "Explore web components, shadow DOM, and cutting-edge HTML specifications."
      },
      css: {
        easy: "Practice CSS selectors, basic properties, and the box model. Learn about colors and fonts.",
        medium: "Study flexbox, grid layout, and responsive design principles. Practice media queries.",
        hard: "Master CSS animations, transforms, and advanced layout techniques. Learn CSS preprocessors.",
        advanced: "Explore CSS-in-JS, custom properties, and modern CSS architecture patterns."
      },
      javascript: {
        easy: "Review variables, functions, and basic control structures. Practice with simple DOM manipulation.",
        medium: "Study objects, arrays, and ES6+ features. Learn about promises and async/await.",
        hard: "Master closures, prototypes, and advanced JavaScript patterns. Practice with APIs.",
        advanced: "Explore design patterns, performance optimization, and modern JavaScript frameworks."
      },
      jquery: {
        easy: "Learn jQuery selectors, basic DOM manipulation, and event handling.",
        medium: "Study jQuery effects, AJAX, and plugin usage. Practice form handling.",
        hard: "Master custom jQuery plugins, advanced selectors, and performance optimization.",
        advanced: "Explore jQuery internals, custom animations, and integration with modern frameworks."
      },
      devtools: {
        easy: "Learn basic browser DevTools navigation, console usage, and element inspection.",
        medium: "Study network tab, performance profiling, and debugging techniques.",
        hard: "Master advanced debugging, memory profiling, and security analysis.",
        advanced: "Explore automation, custom DevTools extensions, and advanced performance analysis."
      }
    };

    return tips[skill]?.[difficulty] || "Continue practicing and reviewing the course materials.";
  }

  // Generate study recommendations using local intelligence
  private generateLocalRecommendations(
    skill: Skill,
    weakTopics: string[]
  ): Array<{ topic: string; recommendation: string; resources: string[] }> {
    const resourceMap: Record<Skill, Record<string, string[]>> = {
      html: {
        'HTML Basics': ['MDN HTML Basics', 'W3Schools HTML Tutorial', 'FreeCodeCamp HTML Course'],
        'Forms': ['MDN Forms Guide', 'HTML5 Form Validation', 'Accessible Forms Tutorial'],
        'Semantic HTML': ['MDN Semantic HTML', 'HTML5 Semantic Elements', 'Accessibility Guidelines'],
        'HTML5 APIs': ['MDN Web APIs', 'HTML5 Rocks', 'Can I Use HTML5']
      },
      css: {
        'CSS Basics': ['MDN CSS Basics', 'W3Schools CSS', 'CSS-Tricks Almanac'],
        'Flexbox': ['Flexbox Froggy', 'MDN Flexbox Guide', 'CSS-Tricks Flexbox'],
        'Grid': ['CSS Grid Garden', 'MDN Grid Guide', 'Grid by Example'],
        'Responsive Design': ['MDN Responsive Design', 'Responsive Web Design Basics', 'Media Query Examples']
      },
      javascript: {
        'JavaScript Basics': ['MDN JavaScript Guide', 'JavaScript.info', 'Eloquent JavaScript'],
        'DOM Manipulation': ['MDN DOM Guide', 'JavaScript DOM Tutorial', 'DOM Enlightenment'],
        'Async JavaScript': ['MDN Promises', 'Async/Await Tutorial', 'JavaScript Promises Guide'],
        'ES6+ Features': ['MDN ES6 Guide', 'ES6 Features Overview', 'Modern JavaScript Tutorial']
      },
      jquery: {
        'jQuery Basics': ['jQuery Documentation', 'jQuery Learning Center', 'jQuery Tutorial'],
        'jQuery Effects': ['jQuery Effects Guide', 'Animation Examples', 'jQuery UI Documentation'],
        'jQuery AJAX': ['jQuery AJAX Guide', 'AJAX Tutorial', 'RESTful API with jQuery']
      },
      devtools: {
        'DevTools Basics': ['Chrome DevTools Guide', 'Firefox Developer Tools', 'DevTools Tips'],
        'Debugging': ['JavaScript Debugging Guide', 'DevTools Debugging', 'Error Handling Best Practices'],
        'Performance': ['Performance Analysis Guide', 'Web Performance Optimization', 'DevTools Performance Tab']
      }
    };

    return weakTopics.map(topic => {
      const resources = resourceMap[skill]?.[topic] || [
        'MDN Web Docs',
        'W3Schools Tutorial',
        'FreeCodeCamp Course'
      ];

      const recommendations: Record<string, string> = {
        'HTML Basics': 'Start with basic HTML structure and common tags. Practice creating simple web pages daily.',
        'Forms': 'Focus on form elements, validation, and accessibility. Build interactive forms.',
        'CSS Basics': 'Master selectors, properties, and the box model. Practice styling simple layouts.',
        'Flexbox': 'Learn flexbox properties through interactive games and real projects.',
        'JavaScript Basics': 'Practice variables, functions, and control structures with coding exercises.',
        'DOM Manipulation': 'Build interactive web pages that respond to user actions.',
        'jQuery Basics': 'Learn jQuery syntax and practice DOM manipulation with jQuery.',
        'DevTools Basics': 'Spend time exploring browser DevTools with real websites.'
      };

      return {
        topic,
        recommendation: recommendations[topic] || `Focus on understanding ${topic} concepts through practice and examples.`,
        resources
      };
    });
  }

  // Main method to generate personalized feedback
  async generatePersonalizedFeedback(
    skill: Skill,
    difficulty: Difficulty,
    score: number,
    totalQuestions: number,
    incorrectQuestions: Array<{ question: Question; userAnswer: string | number }>
  ): Promise<string> {
    // Try AI services first
    const prompt = `Provide encouraging feedback for a student who scored ${score}/${totalQuestions} (${((score/totalQuestions)*100).toFixed(1)}%) on a ${skill.toUpperCase()} ${difficulty} level test. ${incorrectQuestions.length > 0 ? `They struggled with: ${incorrectQuestions.map(q => q.question.topic || q.question.skill).join(', ')}` : 'Perfect score!'}`;

    // Try Hugging Face first
    let aiFeedback = await this.callHuggingFace(prompt);
    
    // Try RapidAPI if Hugging Face fails
    if (!aiFeedback) {
      aiFeedback = await this.callRapidAPI(prompt);
    }

    // Use local intelligence as fallback
    if (!aiFeedback) {
      aiFeedback = this.generateLocalFeedback(skill, difficulty, score, totalQuestions, incorrectQuestions);
    }

    return aiFeedback;
  }

  // Generate study recommendations
  async generateStudyRecommendations(
    skill: Skill,
    weakTopics: string[]
  ): Promise<Array<{ topic: string; recommendation: string; resources: string[] }>> {
    // For now, use local intelligence (very reliable and fast)
    return this.generateLocalRecommendations(skill, weakTopics);
  }

  // Generate explanation for incorrect answers
  async explainIncorrectAnswer(
    question: Question,
    userAnswer: string | number,
    correctAnswer: string | number
  ): Promise<string> {
    const userAnswerText = typeof userAnswer === 'number' ? question.options?.[userAnswer] : userAnswer;
    const correctAnswerText = typeof correctAnswer === 'number' ? question.options?.[correctAnswer] : correctAnswer;

    // Try AI explanation first
    const prompt = `Explain why "${correctAnswerText}" is correct and "${userAnswerText}" is wrong for this ${question.skill} question: "${question.text}". Keep it educational and concise.`;
    
    let aiExplanation = await this.callHuggingFace(prompt);
    
    if (!aiExplanation) {
      aiExplanation = await this.callRapidAPI(prompt);
    }

    // Fallback to local explanation
    if (!aiExplanation) {
      aiExplanation = this.generateLocalExplanation(question, userAnswerText, correctAnswerText);
    }

    return aiExplanation;
  }

  private generateLocalExplanation(question: Question, userAnswer: string, correctAnswer: string): string {
    const explanations: Record<Skill, (q: Question, ua: string, ca: string) => string> = {
      html: (q, ua, ca) => `The correct answer is "${ca}" because it follows proper HTML syntax and semantics. "${ua}" may not be valid HTML or doesn't achieve the intended result. Review HTML documentation for ${q.topic || 'this concept'}.`,
      
      css: (q, ua, ca) => `"${ca}" is correct as it applies the proper CSS property and value. "${ua}" either uses incorrect syntax or doesn't achieve the desired styling effect. Practice CSS selectors and properties for ${q.topic || 'this area'}.`,
      
      javascript: (q, ua, ca) => `The correct answer "${ca}" follows JavaScript best practices and syntax. "${ua}" may cause errors or unexpected behavior. Review JavaScript fundamentals, especially ${q.topic || 'this concept'}.`,
      
      jquery: (q, ua, ca) => `"${ca}" uses the correct jQuery method and syntax. "${ua}" either isn't valid jQuery or doesn't perform the intended action. Study jQuery documentation for ${q.topic || 'this functionality'}.`,
      
      devtools: (q, ua, ca) => `"${ca}" is the correct DevTools feature or method. "${ua}" may not exist or work as expected. Practice using browser DevTools for ${q.topic || 'debugging and analysis'}.`
    };

    const explainer = explanations[question.skill];
    return explainer ? explainer(question, userAnswer, correctAnswer) : 
      `The correct answer is "${correctAnswer}". Review the documentation and practice more examples to strengthen your understanding.`;
  }

  // Generate adaptive questions using templates
  async generateAdaptiveQuestions(
    skill: Skill,
    difficulty: Difficulty,
    weakAreas: string[],
    count: number = 5
  ): Promise<Question[]> {
    // Use question templates based on weak areas
    return this.generateTemplateQuestions(skill, difficulty, weakAreas, count);
  }

  private generateTemplateQuestions(
    skill: Skill,
    difficulty: Difficulty,
    weakAreas: string[],
    count: number
  ): Question[] {
    const templates: Record<Skill, Record<string, any[]>> = {
      html: {
        'HTML Basics': [
          {
            text: 'Which HTML tag is used to create a hyperlink?',
            options: ['<link>', '<a>', '<href>', '<url>'],
            correctAnswer: 1,
            explanation: 'The <a> tag with href attribute creates hyperlinks.'
          },
          {
            text: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
            correctAnswer: 0,
            explanation: 'HTML stands for Hyper Text Markup Language.'
          }
        ],
        'Forms': [
          {
            text: 'Which input type is used for email validation?',
            options: ['text', 'email', 'mail', 'validate'],
            correctAnswer: 1,
            explanation: 'The email input type provides built-in email validation.'
          }
        ]
      },
      css: {
        'CSS Basics': [
          {
            text: 'Which CSS property controls text color?',
            options: ['text-color', 'font-color', 'color', 'text-style'],
            correctAnswer: 2,
            explanation: 'The color property sets the text color in CSS.'
          }
        ],
        'Flexbox': [
          {
            text: 'Which property makes a container a flex container?',
            options: ['flex: 1', 'display: flex', 'flex-container: true', 'flexbox: on'],
            correctAnswer: 1,
            explanation: 'display: flex makes an element a flex container.'
          }
        ]
      },
      javascript: {
        'JavaScript Basics': [
          {
            text: 'How do you declare a variable in modern JavaScript?',
            options: ['var x', 'let x', 'const x', 'All of the above'],
            correctAnswer: 3,
            explanation: 'var, let, and const are all ways to declare variables, with let and const being preferred in modern JavaScript.'
          }
        ]
      },
      jquery: {
        'jQuery Basics': [
          {
            text: 'How do you select an element with id "myId" in jQuery?',
            options: ['$("#myId")', '$(".myId")', '$("myId")', '$[myId]'],
            correctAnswer: 0,
            explanation: '$("#myId") selects an element by its ID in jQuery.'
          }
        ]
      },
      devtools: {
        'DevTools Basics': [
          {
            text: 'Which DevTools tab is used to inspect HTML elements?',
            options: ['Console', 'Elements', 'Network', 'Sources'],
            correctAnswer: 1,
            explanation: 'The Elements tab allows you to inspect and modify HTML elements.'
          }
        ]
      }
    };

    const questions: Question[] = [];
    const skillTemplates = templates[skill] || {};

    weakAreas.forEach(area => {
      const areaTemplates = skillTemplates[area] || [];
      areaTemplates.forEach((template, index) => {
        if (questions.length < count) {
          questions.push({
            id: `adaptive-${skill}-${area}-${index}-${Date.now()}`,
            skill,
            difficulty,
            type: 'multiple-choice',
            topic: area,
            ...template
          });
        }
      });
    });

    // Fill remaining slots with general questions if needed
    while (questions.length < count && questions.length < 10) {
      const allTemplates = Object.values(skillTemplates).flat();
      if (allTemplates.length === 0) break;
      
      const randomTemplate = allTemplates[Math.floor(Math.random() * allTemplates.length)];
      questions.push({
        id: `adaptive-${skill}-general-${questions.length}-${Date.now()}`,
        skill,
        difficulty,
        type: 'multiple-choice',
        topic: 'General',
        ...randomTemplate
      });
    }

    return questions.slice(0, count);
  }

  // Check if any AI features are available
  isAvailable(): boolean {
    return true; // Always available with local fallbacks
  }

  // Get service status
  getServiceStatus(): { huggingFace: boolean; rapidApi: boolean; local: boolean } {
    return {
      huggingFace: true, // Demo API available
      rapidApi: !!this.rapidApiKey,
      local: true // Always available
    };
  }
}

// Singleton instance
export const freeAIService = new FreeAIService();