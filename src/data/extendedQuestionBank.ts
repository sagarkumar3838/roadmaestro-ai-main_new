// Extended Question Bank for Firebase Storage
import { Question, Skill, Difficulty } from '../types/question';

// HTML Questions - targeting 400 per difficulty level
export const generateHTMLEasyQuestions = (): Question[] => [
  { id: 'html-easy-001', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "What does HTML stand for?", options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"], correctAnswer: 0 },
  { id: 'html-easy-002', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "Which tag is used for the main heading?", options: ["<head>", "<h1>", "<title>", "<heading>"], correctAnswer: 1 },
  { id: 'html-easy-003', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<newline>"], correctAnswer: 2 },
  { id: 'html-easy-004', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], correctAnswer: 0 },
  { id: 'html-easy-005', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "What does the <title> tag define?", options: ["Document title", "Main heading", "Page content", "Meta information"], correctAnswer: 0 },
  { id: 'html-easy-006', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "Which HTML tag is used for creating an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correctAnswer: 0 },
  { id: 'html-easy-007', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "What is the correct way to close an HTML tag?", options: ["</tag>", "<tag/>", "<\\tag>", "<end>"], correctAnswer: 0 },
  { id: 'html-easy-008', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "Which HTML attribute specifies an alternate text for an image?", options: ["alt", "src", "title", "href"], correctAnswer: 0 },
  { id: 'html-easy-009', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "What does the <p> tag represent?", options: ["Paragraph", "Page", "Picture", "Panel"], correctAnswer: 0 },
  { id: 'html-easy-010', skill: 'html', difficulty: 'easy', type: 'multiple-choice', text: "Which HTML tag is used to make text bold?", options: ["<b>", "<strong>", "<bold>", "<em>"], correctAnswer: 0 },
  // Add more questions up to 400...
];

export const generateHTMLMediumQuestions = (): Question[] => [
  { id: 'html-medium-001', skill: 'html', difficulty: 'medium', type: 'multiple-choice', text: "What is the correct way to reference an external CSS file?", options: ["<link rel=\"stylesheet\" href=\"style.css\">", "<style src=\"style.css\">", "<css href=\"style.css\">", "<stylesheet href=\"style.css\">"], correctAnswer: 0 },
  { id: 'html-medium-002', skill: 'html', difficulty: 'medium', type: 'multiple-choice', text: "Which tag is used to create a form?", options: ["<input>", "<field>", "<form>", "<entry>"], correctAnswer: 2 },
  { id: 'html-medium-003', skill: 'html', difficulty: 'medium', type: 'multiple-choice', text: "What does the <canvas> element do?", options: ["Display images", "Create graphics", "Play videos", "Handle input"], correctAnswer: 1 },
  { id: 'html-medium-004', skill: 'html', difficulty: 'medium', type: 'multiple-choice', text: "Which HTML tag is used for creating tables?", options: ["<table>", "<tb>", "<tr>", "<td>"], correctAnswer: 0 },
  { id: 'html-medium-005', skill: 'html', difficulty: 'medium', type: 'multiple-choice', text: "What is the purpose of the 'id' attribute?", options: ["Style element", "Unique identifier", "Class name", "Alt text"], correctAnswer: 1 },
  // Add more questions up to 400...
];

export const generateHTMLHardQuestions = (): Question[] => [
  { id: 'html-hard-001', skill: 'html', difficulty: 'hard', type: 'multiple-choice', text: "What is the purpose of the 'defer' attribute on script tags?", options: ["Execute immediately", "Delay execution until DOM ready", "Load asynchronously", "Block rendering"], correctAnswer: 1 },
  { id: 'html-hard-002', skill: 'html', difficulty: 'hard', type: 'multiple-choice', text: "Which HTTP status indicates a permanent redirect?", options: ["301", "302", "303", "307"], correctAnswer: 0 },
  { id: 'html-hard-003', skill: 'html', difficulty: 'hard', type: 'multiple-choice', text: "What is the purpose of the <dialog> element?", options: ["Popups", "Modal dialogs", "Tooltips", "Notifications"], correctAnswer: 1 },
  { id: 'html-hard-004', skill: 'html', difficulty: 'hard', type: 'multiple-choice', text: "What does the <meta charset=\"utf-8\"> tag do?", options: ["Sets font", "Defines encoding", "Links styles", "Adds scripts"], correctAnswer: 1 },
  { id: 'html-hard-005', skill: 'html', difficulty: 'hard', type: 'multiple-choice', text: "What is semantic HTML?", options: ["Colorful tags", "Meaningful tags", "Bold tags", "Italic tags"], correctAnswer: 1 },
  // Add more questions up to 400...
];

export const generateHTMLAdvancedQuestions = (): Question[] => [
  { id: 'html-advanced-001', skill: 'html', difficulty: 'advanced', type: 'multiple-choice', text: "What is the difference between <section> and <article> elements?", options: ["No difference", "Article for complete content, section for parts", "Section for articles, article for sections", "One is semantic"], correctAnswer: 1 },
  { id: 'html-advanced-002', skill: 'html', difficulty: 'advanced', type: 'multiple-choice', text: "What does the 'scope' attribute do in table headers?", options: ["Defines style", "Links cells", "Associates headers with columns/rows", "Adds borders"], correctAnswer: 2 },
  { id: 'html-advanced-003', skill: 'html', difficulty: 'advanced', type: 'multiple-choice', text: "Which attribute controls form input validation?", options: ["required", "validate", "check", "must"], correctAnswer: 0 },
  // Add more questions up to 400...
];

// CSS Questions (will be expanded similarly)
export const generateCSSEasyQuestions = (): Question[] => [
  { id: 'css-easy-001', skill: 'css', difficulty: 'easy', type: 'multiple-choice', text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: 0 },
  { id: 'css-easy-002', skill: 'css', difficulty: 'easy', type: 'multiple-choice', text: "Which CSS property changes text color?", options: ["color", "font-color", "text-color", "fgcolor"], correctAnswer: 0 },
];

// Similarly for other skills...

// Firebase Data Structure Organization
export interface QuestionCollection {
  skill: Skill;
  difficulty: Difficulty;
  questions: Question[];
}

// Helper function to prepare data for Firebase
export const prepareQuestionDataForFirebase = () => {
  return {
    'html-easy': generateHTMLEasyQuestions(),
    'html-medium': generateHTMLMediumQuestions(),
    'html-hard': generateHTMLHardQuestions(),
    'html-advanced': generateHTMLAdvancedQuestions(),
    'css-easy': generateCSSEasyQuestions(),
    // Add other skills...
  };
};

// User Progress Tracking Data Structure
export interface UserSkillProgress {
  userId: string;
  skill: Skill;
  currentLevel: Difficulty;
  levelScores: Record<Difficulty, number>;
  completedLevels: Difficulty[];
  lastTestDate: Date;
  totalTestsTaken: number;
}

// Level progression logic
export const getNextDifficultyLevel = (currentLevel: Difficulty, passedCurrentLevel: boolean): Difficulty | null => {
  const levelOrder: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];

  if (!passedCurrentLevel) {
    return currentLevel; // Stay at current level if failed
  }

  const currentIndex = levelOrder.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex === levelOrder.length - 1) {
    return null; // No next level
  }

  return levelOrder[currentIndex + 1];
};

export const calculatePassThreshold = (difficulty: Difficulty): number => {
  // 70% passing threshold for all levels
  const totalQuestions = 10; // Assuming 10 questions per test
  return Math.ceil(totalQuestions * 0.7);
};
