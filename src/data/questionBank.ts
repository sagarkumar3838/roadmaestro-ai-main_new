// Dynamic question generator for each skill
import { Question, Skill, Difficulty } from '../types/question';

// Helper function to generate unique ID
const generateQuestionId = (skill: Skill, difficulty: Difficulty, index: number) =>
  `${skill}-${difficulty}-${index}`;

// Generate questions for each skill dynamically (DEPRECATED - Use JSON files instead)
// This function is kept for backward compatibility
export const generateQuestionsForSkill = async (skill: Skill, difficulty: Difficulty, count: number): Promise<Question[]> => {
  try {
    // Import the new question loader service
    const { loadQuestionsFromJSON, getUniqueRandomQuestions } = await import('../services/questionLoaderService');
    
    // Load questions from JSON files
    const questions = await loadQuestionsFromJSON(skill, difficulty);
    
    // Return unique random questions
    return getUniqueRandomQuestions(questions, count);
  } catch (error) {
    console.error(`Error loading questions for ${skill}-${difficulty}:`, error);
    
    // Fallback to old generation method if JSON loading fails
    return generateQuestionsForSkillFallback(skill, difficulty, count);
  }
};

// Fallback generation method (old system)
const generateQuestionsForSkillFallback = (skill: Skill, difficulty: Difficulty, count: number): Question[] => {
  const generators = {
    html: generateHTMLQuestion,
    css: generateCSSQuestion,
    javascript: generateJSQuestion,
    jquery: generateJQueryQuestion,
    devtools: generateDevToolsQuestion
  };

  const generator = generators[skill];
  
  // First, get all available questions for this skill/difficulty
  const allQuestions: Question[] = [];
  const maxQuestions = getMaxQuestionsForSkillDifficulty(skill, difficulty);
  
  for (let i = 0; i < maxQuestions; i++) {
    const id = generateQuestionId(skill, difficulty, i);
    allQuestions.push(generator(id, difficulty, skill));
  }
  
  // Shuffle the questions to randomize order
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  
  // Return only the requested count (or all if count is larger)
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Helper to get max questions available for each skill/difficulty
const getMaxQuestionsForSkillDifficulty = (skill: Skill, difficulty: Difficulty): number => {
  const questionCounts: Record<Skill, Record<Difficulty, number>> = {
    html: { easy: 12, medium: 10, hard: 8, advanced: 8 },
    css: { easy: 12, medium: 10, hard: 8, advanced: 8 },
    javascript: { easy: 12, medium: 10, hard: 8, advanced: 8 },
    jquery: { easy: 10, medium: 8, hard: 8, advanced: 6 },
    devtools: { easy: 10, medium: 8, hard: 8, advanced: 6 }
  };
  
  return questionCounts[skill][difficulty];
};

const generateHTMLQuestion = (id: string, difficulty: Difficulty, skill: Skill): Question => {
  const questionsData = {
    easy: [
      { text: "What does HTML stand for?", options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"], answer: 0 },
      { text: "Which tag is used for the main heading?", options: ["<head>", "<h1>", "<title>", "<heading>"], answer: 1 },
      { text: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<newline>"], answer: 2 },
      { text: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
      { text: "What does the <title> tag define?", options: ["Document title", "Main heading", "Page content", "Meta information"], answer: 0 }
    ],
    medium: [
      { text: "What is the correct way to reference an external CSS file?", options: ["<link rel=\"stylesheet\" href=\"style.css\">", "<style src=\"style.css\">", "<css href=\"style.css\">", "<stylesheet href=\"style.css\">"], answer: 0 },
      { text: "Which tag is used to create a form?", options: ["<input>", "<field>", "<form>", "<entry>"], answer: 2 },
      { text: "What does the <canvas> element do?", options: ["Display images", "Create graphics", "Play videos", "Handle input"], answer: 1 }
    ],
    hard: [
      { text: "What is the purpose of the 'defer' attribute on script tags?", options: ["Execute immediately", "Delay execution until DOM ready", "Load asynchronously", "Block rendering"], answer: 1 },
      { text: "Which HTTP status indicates a permanent redirect?", options: ["301", "302", "303", "307"], answer: 0 },
      { text: "What is the purpose of the <dialog> element?", options: ["Popups", "Modal dialogs", "Tooltips", "Notifications"], answer: 1 }
    ],
    advanced: [
      { text: "What is the purpose of the Shadow DOM?", options: ["Styling isolation", "Component encapsulation", "Performance optimization", "Security enhancement"], answer: 1 },
      { text: "Which HTML5 API allows offline web applications?", options: ["Service Workers", "Web Workers", "Local Storage", "Session Storage"], answer: 0 },
      { text: "What is the purpose of the 'integrity' attribute in script tags?", options: ["Verify script source", "Subresource Integrity check", "CORS validation", "Content Security Policy"], answer: 1 }
    ]
  };

  const set = questionsData[difficulty] || questionsData.easy;
  const questionIndex = parseInt(id.split('-').pop()!) % set.length;
  const q = set[questionIndex];

  return {
    id,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: q.text,
    options: q.options,
    correctAnswer: q.answer
  };
};

const generateCSSQuestion = (id: string, difficulty: Difficulty, skill: Skill): Question => {
  const questionsData = {
    easy: [
      { text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 0 },
      { text: "Which CSS property changes text color?", options: ["color", "font-color", "text-color", "fgcolor"], answer: 0 },
      { text: "How do you add a background color?", options: ["background-color", "color", "bgcolor", "background"], answer: 0 },
      { text: "What is the correct CSS syntax?", options: ["selector { property: value }", "property: selector value", "value { selector: property }", "selector: property value"], answer: 0 }
    ],
    medium: [
      { text: "What does 'flex: 1' mean in flexbox?", options: ["Takes remaining space", "Sets flex to 1 unit", "Makes element flexible", "All of the above"], answer: 3 },
      { text: "How do you center content vertically in flexbox?", options: ["align-items: center", "justify-content: center", "vertical-align: center", "center: vertical"], answer: 0 },
      { text: "What does 'z-index' control?", options: ["Stacking order", "Depth perception", "Layer positioning", "3D positioning"], answer: 0 }
    ],
    hard: [
      { text: "What does 'contain: layout' do?", options: ["Contains layout to subtree", "Optimizes re-layout", "Isolates positioning", "Contains size calculation"], answer: 1 },
      { text: "How do you implement CSS container queries?", options: ["@container", "@media", "@supports", "@query"], answer: 0 },
      { text: "What is the purpose of 'content-visibility'?", options: ["Content visibility optimization", "Lazy rendering", "Performance optimization", "All of the above"], answer: 3 }
    ],
    advanced: [
      { text: "What is CSS Houdini?", options: ["CSS preprocessor", "Low-level CSS API", "CSS framework", "CSS compiler"], answer: 1 },
      { text: "How do you create a custom CSS property with @property?", options: ["Define syntax and initial value", "Use var()", "Register with JS", "Use custom-property"], answer: 0 },
      { text: "What is the purpose of CSS Containment?", options: ["Performance optimization", "Layout isolation", "Style scoping", "All of the above"], answer: 3 }
    ]
  };

  const set = questionsData[difficulty] || questionsData.easy;
  const questionIndex = parseInt(id.split('-').pop()!) % set.length;
  const q = set[questionIndex];

  return {
    id,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: q.text,
    options: q.options,
    correctAnswer: q.answer
  };
};

const generateJSQuestion = (id: string, difficulty: Difficulty, skill: Skill): Question => {
  const questionsData = {
    easy: [
      { text: "What is JavaScript?", options: ["Programming language", "Markup language", "Styling language", "Database"], answer: 0 },
      { text: "How do you declare a variable?", options: ["var name", "variable name", "v name", "declare name"], answer: 0 },
      { text: "What does 'console.log()' do?", options: ["Prints to console", "Creates log file", "Shows alert", "Saves data"], answer: 0 },
      { text: "How do you create a function?", options: ["function name()", "def name()", "func name()", "create name()"], answer: 0 }
    ],
    medium: [
      { text: "What is a closure?", options: ["Function with access to outer scope", "Closed function", "Function wrapper", "Scope container"], answer: 0 },
      { text: "What is the 'this' context in arrow functions?", options: ["Inherits parent's this", "Has own this", "No this binding", "Global this"], answer: 0 },
      { text: "How do Promises work?", options: ["Handle async operations", "Promise fulfillment", "Future values", "All of the above"], answer: 3 },
      { text: "What is destructuring?", options: ["Extracts values from objects/arrays", "Deconstructs data", "Parses structures", "All of the above"], answer: 3 }
    ],
    hard: [
      { text: "What is the temporal dead zone?", options: ["let/const hoisting behavior", "Dead code zone", "Execution pause", "Time-based blocking"], answer: 0 },
      { text: "What are execution contexts?", options: ["Code execution environments", "Function scopes", "Variable environments", "All of the above"], answer: 3 },
      { text: "What are Symbols?", options: ["Unique identifiers", "Special strings", "Primitive values", "Object keys"], answer: 0 },
      { text: "What is a Proxy object?", options: ["Object wrapper", "Custom object behavior", "Metaprogramming", "All of the above"], answer: 3 }
    ],
    advanced: [
      { text: "What is the event loop?", options: ["Async execution model", "Loop structure", "Event handler", "Callback queue"], answer: 0 },
      { text: "What are WeakMaps used for?", options: ["Memory-efficient key-value storage", "Weak references", "Garbage collection optimization", "All of the above"], answer: 3 },
      { text: "What is tail call optimization?", options: ["Recursive function optimization", "Call stack management", "Memory optimization", "All of the above"], answer: 3 }
    ]
  };

  const set = questionsData[difficulty] || questionsData.easy;
  const questionIndex = parseInt(id.split('-').pop()!) % set.length;
  const q = set[questionIndex];

  return {
    id,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: q.text,
    options: q.options,
    correctAnswer: q.answer
  };
};

const generateJQueryQuestion = (id: string, difficulty: Difficulty, skill: Skill): Question => {
  const questionsData = {
    easy: [
      { text: "What is jQuery?", options: ["JavaScript library", "CSS framework", "HTML preprocessor", "Database tool"], answer: 0 },
      { text: "How do you select all paragraphs?", options: ["$('p')", "$('.p')", "$('#p')", "$('paragraph')"], answer: 0 },
      { text: "What does $(document).ready() do?", options: ["Loads the page", "Executes when DOM is ready", "Loads jQuery", "Initializes variables"], answer: 1 },
      { text: "How do you hide an element?", options: ["hide()", "remove()", "invisible()", "gone()"], answer: 0 }
    ],
    medium: [
      { text: "What is AJAX in jQuery?", options: ["Asynchronous JavaScript and XML", "Advanced JavaScript API", "Automated JavaScript XML", "Asynchronous JSON API"], answer: 0 },
      { text: "How do you handle click events?", options: ["click()", "onClick()", "handleClick()", "eventClick()"], answer: 0 },
      { text: "What does fadeIn() do?", options: ["Fades element in", "Moves element", "Changes color", "Resizes element"], answer: 0 },
      { text: "How do you add a CSS class?", options: ["addClass()", "addCSS()", "applyClass()", "setClass()"], answer: 0 }
    ],
    hard: [
      { text: "What is the difference between .prop() and .attr()?", options: ["Properties vs attributes", "Values vs strings", "Objects vs elements", "Events vs handlers"], answer: 0 },
      { text: "How do you create a custom plugin?", options: ["$.fn.pluginName", "$.plugin()", "jQuery.plugin()", "createPlugin()"], answer: 0 },
      { text: "What does .promise() do?", options: ["Returns a Promise", "Creates async operations", "Handles deferreds", "All of the above"], answer: 3 },
      { text: "How do you prevent event bubbling?", options: ["stopPropagation()", "preventDefault()", "stopImmediate()", "halt()"], answer: 0 }
    ],
    advanced: [
      { text: "What is jQuery's Deferred object?", options: ["Promise implementation", "Async handler", "Callback manager", "All of the above"], answer: 3 },
      { text: "How do you optimize jQuery selectors?", options: ["Cache selectors", "Use IDs", "Minimize DOM traversal", "All of the above"], answer: 3 },
      { text: "What is jQuery.noConflict()?", options: ["Prevents $ conflicts", "Removes jQuery", "Disables plugins", "Resets jQuery"], answer: 0 }
    ]
  };

  const set = questionsData[difficulty] || questionsData.easy;
  const questionIndex = parseInt(id.split('-').pop()!) % set.length;
  const q = set[questionIndex];

  return {
    id,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: q.text,
    options: q.options,
    correctAnswer: q.answer
  };
};

const generateDevToolsQuestion = (id: string, difficulty: Difficulty, skill: Skill): Question => {
  const questionsData = {
    easy: [
      { text: "What are Browser DevTools?", options: ["Debugging tools", "Browser settings", "Download manager", "Extensions"], answer: 0 },
      { text: "How do you open DevTools?", options: ["F12", "Ctrl+U", "Ctrl+F", "Alt+F"], answer: 0 },
      { text: "What does the Console tab show?", options: ["JavaScript errors", "Page source", "Network requests", "Application data"], answer: 0 },
      { text: "What does the Elements tab show?", options: ["HTML structure", "JavaScript code", "CSS styles", "Network activity"], answer: 0 }
    ],
    medium: [
      { text: "What does the Network tab show?", options: ["HTTP requests", "JavaScript errors", "CSS styles", "Page sources"], answer: 0 },
      { text: "How do you set breakpoints?", options: ["Click line numbers in Sources", "Use console.log()", "Check elements", "View network"], answer: 0 },
      { text: "What is the Application tab for?", options: ["Service workers", "Local storage", "Cookies", "All of the above"], answer: 3 },
      { text: "How do you debug JavaScript?", options: ["Set breakpoints", "Use console", "Check errors", "All of the above"], answer: 3 }
    ],
    hard: [
      { text: "What is the Command Menu?", options: ["Quick commands", "DevTools menu", "Shortcut palette", "All of the above"], answer: 3 },
      { text: "How do you emulate devices?", options: ["Device toolbar", "Responsive mode", "Mobile settings", "All of the above"], answer: 3 },
      { text: "What does Lighthouse do?", options: ["Performance auditing", "Accessibility testing", "SEO analysis", "All of the above"], answer: 3 },
      { text: "What is the Coverage tab?", options: ["Code coverage", "Test coverage", "Performance coverage", "Network coverage"], answer: 0 }
    ],
    advanced: [
      { text: "What is the Performance tab used for?", options: ["Profiling runtime performance", "Memory analysis", "CPU usage", "All of the above"], answer: 3 },
      { text: "How do you debug Service Workers?", options: ["Application tab", "Sources tab", "Network tab", "Console tab"], answer: 0 },
      { text: "What is the Memory profiler?", options: ["Heap snapshots", "Memory leaks detection", "Allocation tracking", "All of the above"], answer: 3 }
    ]
  };

  const set = questionsData[difficulty] || questionsData.easy;
  const questionIndex = parseInt(id.split('-').pop()!) % set.length;
  const q = set[questionIndex];

  return {
    id,
    skill,
    difficulty,
    type: 'multiple-choice',
    text: q.text,
    options: q.options,
    correctAnswer: q.answer
  };
};

// Convenience functions for each skill
export const getHTMLQuestions = (difficulty: Difficulty, count: number) =>
  generateQuestionsForSkill('html', difficulty, count);

export const getCSSQuestions = (difficulty: Difficulty, count: number) =>
  generateQuestionsForSkill('css', difficulty, count);

export const getJavascriptQuestions = (difficulty: Difficulty, count: number) =>
  generateQuestionsForSkill('javascript', difficulty, count);

export const getJQueryQuestions = (difficulty: Difficulty, count: number) =>
  generateQuestionsForSkill('jquery', difficulty, count);

export const getDevToolsQuestions = (difficulty: Difficulty, count: number) =>
  generateQuestionsForSkill('devtools', difficulty, count);
