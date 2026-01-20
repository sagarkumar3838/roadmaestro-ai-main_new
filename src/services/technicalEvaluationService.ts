import { v4 as uuidv4 } from 'uuid';
import { 
  EvaluationLevel, 
  TechnicalEvaluation, 
  EvaluationQuestion, 
  QuestionType, 
  SkillArea,
  EvaluationResult,
  EvaluationResponse 
} from '@/types/evaluation';

// Question pools for different levels and skill areas
const QUESTION_POOLS = {
  BASIC: {
    HTML: [
      {
        type: 'mcq' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'Which HTML element is used to define the main content of a document?',
        options: ['<header>', '<main>', '<section>', '<article>'],
        correct_answer: 1,
        expected_skills: ['HTML semantics', 'Document structure']
      },
      {
        type: 'mcq' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'What is the correct way to create a hyperlink in HTML?',
        options: ['<link href="url">text</link>', '<a href="url">text</a>', '<url>text</url>', '<hyperlink>text</hyperlink>'],
        correct_answer: 1,
        expected_skills: ['HTML links', 'Basic HTML elements']
      },
      {
        type: 'scenario' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'You need to create a form that collects user email and password. Which approach ensures better accessibility?',
        options: [
          'Use placeholder text only',
          'Use label elements with proper for attributes',
          'Use div elements with text inside',
          'Use span elements for labels'
        ],
        correct_answer: 1,
        expected_skills: ['HTML forms', 'Accessibility', 'Form labels']
      }
    ],
    CSS: [
      {
        type: 'mcq' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'Which CSS property is used to change the text color of an element?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correct_answer: 2,
        expected_skills: ['CSS properties', 'Text styling']
      },
      {
        type: 'scenario' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'You want to center a div horizontally and vertically in its container. Which modern CSS approach is most appropriate?',
        options: [
          'Use float: center',
          'Use flexbox with justify-content and align-items',
          'Use position: absolute with negative margins',
          'Use text-align: center'
        ],
        correct_answer: 1,
        expected_skills: ['CSS layout', 'Flexbox', 'Centering techniques']
      }
    ],
    JavaScript: [
      {
        type: 'mcq' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'Which method is used to add an element to the end of an array?',
        options: ['append()', 'push()', 'add()', 'insert()'],
        correct_answer: 1,
        expected_skills: ['JavaScript arrays', 'Array methods']
      },
      {
        type: 'code_reasoning' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'What will be the output of: console.log(typeof null)?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correct_answer: 2,
        expected_skills: ['JavaScript types', 'typeof operator', 'JavaScript quirks']
      }
    ]
  },
  INTERMEDIATE: {
    HTML: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'You\'re building a news website. Which semantic HTML structure best represents an article with a headline, author, publication date, and content?',
        options: [
          '<div><h1>Title</h1><p>Author</p><p>Date</p><p>Content</p></div>',
          '<article><header><h1>Title</h1><p>Author</p><time>Date</time></header><p>Content</p></article>',
          '<section><title>Title</title><author>Author</author><date>Date</date><content>Content</content></section>',
          '<article><h1>Title</h1><span>Author</span><span>Date</span><div>Content</div></article>'
        ],
        correct_answer: 1,
        expected_skills: ['HTML5 semantics', 'Document structure', 'Accessibility']
      },
      {
        type: 'multi_select' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'Which attributes are essential for making images accessible? (Select all that apply)',
        options: ['alt', 'title', 'aria-label', 'src', 'loading'],
        correct_answer: [0, 2],
        expected_skills: ['Web accessibility', 'Image optimization', 'ARIA attributes']
      }
    ],
    CSS: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'You need to create a responsive grid that shows 1 column on mobile, 2 on tablet, and 3 on desktop. Which CSS approach is most maintainable?',
        options: [
          'Use CSS Grid with grid-template-columns and media queries',
          'Use float with different widths in media queries',
          'Use flexbox with flex-wrap and flex-basis',
          'Use CSS Grid with auto-fit and minmax()'
        ],
        correct_answer: 3,
        expected_skills: ['CSS Grid', 'Responsive design', 'Modern CSS']
      },
      {
        type: 'code_reasoning' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'What happens when you apply "transform: translateX(50px)" to an element?',
        options: [
          'Element moves 50px to the left',
          'Element moves 50px to the right without affecting layout',
          'Element\'s width increases by 50px',
          'Element moves 50px down'
        ],
        correct_answer: 1,
        expected_skills: ['CSS transforms', 'Layout behavior', 'Performance']
      }
    ],
    JavaScript: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'You need to fetch data from an API and handle potential errors. Which approach is most robust?',
        options: [
          'Use fetch() with .then() and .catch()',
          'Use async/await with try/catch blocks',
          'Use XMLHttpRequest with error callbacks',
          'Use fetch() without error handling'
        ],
        correct_answer: 1,
        expected_skills: ['Async JavaScript', 'Error handling', 'Modern JavaScript']
      },
      {
        type: 'code_reasoning' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'What will happen when this code runs?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
        options: ['Prints: 0, 1, 2', 'Prints: 3, 3, 3', 'Prints: 1, 2, 3', 'Throws an error'],
        correct_answer: 1,
        expected_skills: ['JavaScript closures', 'Event loop', 'Variable scoping']
      }
    ]
  },
  ADVANCED: {
    HTML: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'You\'re optimizing a large e-commerce site for performance. Which HTML strategy would have the most impact on Core Web Vitals?',
        options: [
          'Adding more semantic elements',
          'Implementing lazy loading for images and using appropriate loading attributes',
          'Using more div elements instead of semantic ones',
          'Adding more meta tags'
        ],
        correct_answer: 1,
        expected_skills: ['Performance optimization', 'Core Web Vitals', 'Image optimization']
      },
      {
        type: 'assertion_reason' as QuestionType,
        skill_area: 'HTML' as SkillArea,
        question: 'Assertion: Using <button> is always better than <div role="button">.\nReason: Native button elements provide built-in keyboard navigation and screen reader support.',
        options: [
          'Both assertion and reason are true, and reason explains assertion',
          'Both are true, but reason doesn\'t explain assertion',
          'Assertion is true, reason is false',
          'Assertion is false, reason is true'
        ],
        correct_answer: 0,
        expected_skills: ['Accessibility', 'Semantic HTML', 'ARIA roles']
      }
    ],
    CSS: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'Your website has performance issues with layout thrashing during animations. Which CSS property change would most likely solve this?',
        options: [
          'Change from animating "left" to animating "transform: translateX()"',
          'Add more keyframes to the animation',
          'Increase animation duration',
          'Use CSS variables instead of fixed values'
        ],
        correct_answer: 0,
        expected_skills: ['CSS performance', 'Browser rendering', 'Animation optimization']
      },
      {
        type: 'code_reasoning' as QuestionType,
        skill_area: 'CSS' as SkillArea,
        question: 'What is the most likely cause of a "flash of unstyled content" (FOUC) in a web application?',
        options: [
          'CSS file is too large',
          'CSS is loaded after HTML parsing completes',
          'JavaScript is blocking CSS parsing',
          'Images are loading slowly'
        ],
        correct_answer: 1,
        expected_skills: ['Critical rendering path', 'Performance optimization', 'Resource loading']
      }
    ],
    JavaScript: [
      {
        type: 'scenario' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'You\'re building a real-time collaborative editor. Which approach best handles concurrent edits without conflicts?',
        options: [
          'Lock the document when someone is editing',
          'Use operational transformation or conflict-free replicated data types',
          'Overwrite changes with the latest version',
          'Queue all changes sequentially'
        ],
        correct_answer: 1,
        expected_skills: ['Distributed systems', 'Conflict resolution', 'Real-time applications']
      },
      {
        type: 'code_reasoning' as QuestionType,
        skill_area: 'JavaScript' as SkillArea,
        question: 'In a React application, what\'s the primary reason to use useCallback for event handlers?',
        options: [
          'To improve performance by preventing unnecessary re-renders of child components',
          'To make the code more readable',
          'To handle errors better',
          'To enable better debugging'
        ],
        correct_answer: 0,
        expected_skills: ['React optimization', 'Memoization', 'Component lifecycle']
      }
    ]
  }
};

class TechnicalEvaluationService {
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private selectRandomQuestions(
    pool: any[], 
    count: number, 
    level: EvaluationLevel
  ): EvaluationQuestion[] {
    const shuffled = this.shuffleArray(pool);
    return shuffled.slice(0, count).map((q, index) => ({
      question_id: uuidv4(),
      level,
      ...q
    }));
  }

  generateEvaluation(level: EvaluationLevel): TechnicalEvaluation {
    const evaluation_id = uuidv4();
    const questions: EvaluationQuestion[] = [];
    
    // Question distribution based on level
    const distributions = {
      BASIC: { HTML: 4, CSS: 3, JavaScript: 3 },
      INTERMEDIATE: { HTML: 3, CSS: 4, JavaScript: 3 },
      ADVANCED: { HTML: 3, CSS: 3, JavaScript: 4 }
    };

    const distribution = distributions[level];
    
    // Generate questions for each skill area
    Object.entries(distribution).forEach(([skillArea, count]) => {
      const pool = QUESTION_POOLS[level][skillArea as SkillArea] || [];
      if (pool.length > 0) {
        const selectedQuestions = this.selectRandomQuestions(pool, count, level);
        questions.push(...selectedQuestions);
      }
    });

    // Shuffle final question order
    const shuffledQuestions = this.shuffleArray(questions);

    return {
      evaluation_id,
      evaluation_level: level,
      question_count: shuffledQuestions.length,
      questions: shuffledQuestions,
      created_at: new Date().toISOString()
    };
  }

  calculateResult(
    evaluation: TechnicalEvaluation,
    responses: EvaluationResponse[],
    userId: string
  ): EvaluationResult {
    let correctAnswers = 0;
    const skillBreakdown: { [key in SkillArea]: { total: number; correct: number; percentage: number } } = {
      HTML: { total: 0, correct: 0, percentage: 0 },
      CSS: { total: 0, correct: 0, percentage: 0 },
      JavaScript: { total: 0, correct: 0, percentage: 0 },
      Mixed: { total: 0, correct: 0, percentage: 0 }
    };

    // Calculate scores
    evaluation.questions.forEach((question) => {
      const response = responses.find(r => r.question_id === question.question_id);
      skillBreakdown[question.skill_area].total++;

      if (response) {
        let isCorrect = false;
        
        if (question.type === 'multi_select' && Array.isArray(question.correct_answer)) {
          // For multi-select, check if arrays match
          const userAnswer = Array.isArray(response.selected_answer) 
            ? response.selected_answer.sort() 
            : [response.selected_answer];
          const correctAnswer = question.correct_answer.sort();
          isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        } else {
          // For single answer questions
          isCorrect = response.selected_answer === question.correct_answer;
        }

        if (isCorrect) {
          correctAnswers++;
          skillBreakdown[question.skill_area].correct++;
        }
      }
    });

    // Calculate percentages for skill breakdown
    Object.keys(skillBreakdown).forEach(skill => {
      const skillData = skillBreakdown[skill as SkillArea];
      skillData.percentage = skillData.total > 0 
        ? Math.round((skillData.correct / skillData.total) * 100) 
        : 0;
    });

    const totalTime = responses.reduce((sum, r) => sum + r.time_spent, 0);
    const percentage = Math.round((correctAnswers / evaluation.question_count) * 100);

    return {
      evaluation_id: evaluation.evaluation_id,
      user_id: userId,
      level: evaluation.evaluation_level,
      score: correctAnswers,
      percentage,
      total_questions: evaluation.question_count,
      correct_answers: correctAnswers,
      time_taken: totalTime,
      responses,
      completed_at: new Date().toISOString(),
      skill_breakdown: skillBreakdown
    };
  }

  // Get performance insights based on results
  getPerformanceInsights(result: EvaluationResult): string[] {
    const insights: string[] = [];
    
    if (result.percentage >= 80) {
      insights.push('Excellent performance! You have a strong foundation in front-end development.');
    } else if (result.percentage >= 60) {
      insights.push('Good job! You have solid knowledge with room for improvement in some areas.');
    } else {
      insights.push('Keep practicing! Focus on strengthening your fundamentals.');
    }

    // Skill-specific insights
    Object.entries(result.skill_breakdown).forEach(([skill, data]) => {
      if (data.total > 0) {
        if (data.percentage < 50) {
          insights.push(`Focus on improving your ${skill} skills - consider additional practice and study.`);
        } else if (data.percentage >= 80) {
          insights.push(`Strong ${skill} knowledge! You're performing well in this area.`);
        }
      }
    });

    // Time-based insights
    const avgTimePerQuestion = result.time_taken / result.total_questions;
    if (avgTimePerQuestion < 30) {
      insights.push('You completed the evaluation quickly - make sure to read questions carefully.');
    } else if (avgTimePerQuestion > 120) {
      insights.push('Take time to practice for better speed and confidence in your answers.');
    }

    return insights;
  }
}

export const technicalEvaluationService = new TechnicalEvaluationService();