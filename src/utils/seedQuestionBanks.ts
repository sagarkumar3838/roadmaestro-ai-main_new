import { Question, Skill } from "@/types/question";
import { seedQuestionBank } from "@/services/evaluationService";

// Helper function to generate questions for each difficulty
const generateQuestionsForDifficulty = (
  skill: Skill,
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced',
  count: number
): Question[] => {
  const baseId = `${skill}-${difficulty}`;
  const questions: Question[] = [];

  // Generate sample questions based on skill and difficulty
  const sampleQuestions = getSampleQuestions(skill, difficulty);

  for (let i = 0; i < Math.min(count, sampleQuestions.length); i++) {
    questions.push({
      id: `${baseId}-${i}`,
      skill,
      difficulty,
      type: 'multiple-choice',
      text: sampleQuestions[i].text,
      options: sampleQuestions[i].options,
      correctAnswer: sampleQuestions[i].correctAnswer
    });
  }

  return questions;
};

// Get sample questions for each skill and difficulty
const getSampleQuestions = (skill: Skill, difficulty: 'easy' | 'medium' | 'hard' | 'advanced') => {
  switch (skill) {
    case 'html':
      return getHTMLQuestions(difficulty);
    case 'css':
      return getCSSQuestions(difficulty);
    case 'javascript':
      return getJavaScriptQuestions(difficulty);
    case 'jquery':
      return getJQueryQuestions(difficulty);
    case 'devtools':
      return getDevToolsQuestions(difficulty);
    default:
      return [];
  }
};

const getHTMLQuestions = (difficulty: string) => {
  if (difficulty === 'easy') {
    return [
      { text: "What does HTML stand for?", options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"], correctAnswer: 0 },
      { text: "Which tag is used for the main heading?", options: ["<head>", "<h1>", "<title>", "<heading>"], correctAnswer: 1 },
      { text: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<newline>"], correctAnswer: 2 },
      { text: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], correctAnswer: 0 },
      { text: "What does the <title> tag define?", options: ["Document title", "Main heading", "Page content", "Meta information"], correctAnswer: 0 },
      { text: "Which tag creates a numbered list?", options: ["<ul>", "<ol>", "<list>", "<nl>"], correctAnswer: 1 },
      { text: "What is the purpose of the <p> tag?", options: ["Paragraph", "Page", "Picture", "Preformatted"], correctAnswer: 0 },
      { text: "Which attribute is used to provide alternative text for images?", options: ["title", "alt", "src", "desc"], correctAnswer: 1 }
    ];
  } else if (difficulty === 'medium') {
    return [
      { text: "What is the correct way to reference an external CSS file?", options: ["<link rel=\"stylesheet\" href=\"style.css\">", "<style src=\"style.css\">", "<css href=\"style.css\">", "<stylesheet href=\"style.css\">"], correctAnswer: 0 },
      { text: "Which tag is used to create a form?", options: ["<input>", "<field>", "<form>", "<entry>"], correctAnswer: 2 },
      { text: "What does the <canvas> element do?", options: ["Display images", "Create graphics", "Play videos", "Handle input"], correctAnswer: 1 },
      { text: "What is semantic HTML?", options: ["Using table tags", "Meaningful HTML elements", "Using inline CSS", "None"], correctAnswer: 1 },
      { text: "Which tag is used for navigation?", options: ["<nav>", "<navigation>", "<menu>", "<links>"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'hard') {
    return [
      { text: "What is the purpose of the 'defer' attribute on script tags?", options: ["Execute immediately", "Delay execution until DOM ready", "Load asynchronously", "Block rendering"], correctAnswer: 1 },
      { text: "Which HTTP status indicates a permanent redirect?", options: ["301", "302", "303", "307"], correctAnswer: 0 },
      { text: "What is the purpose of the <dialog> element?", options: ["Popups", "Modal dialogs", "Tooltips", "Notifications"], correctAnswer: 1 }
    ];
  } else { // advanced
    return [
      { text: "What is the Web Components specification?", options: ["HTML5 API", "Custom elements, Shadow DOM, HTML templates", "CSS framework", "JavaScript library"], correctAnswer: 1 },
      { text: "What does SVG stand for?", options: ["Scalable Vector Graphics", "Simple Visual Graphics", "Structured Vector Graphics", "System Vector Graphics"], correctAnswer: 0 },
      { text: "What is Progressive Enhancement?", options: ["Loading pages progressively", "Building from basic to advanced features", "Caching strategy", "Animation technique"], correctAnswer: 1 }
    ];
  }
};

const getCSSQuestions = (difficulty: string) => {
  if (difficulty === 'easy') {
    return [
      { text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: 0 },
      { text: "Which CSS property changes text color?", options: ["color", "font-color", "text-color", "fgcolor"], correctAnswer: 0 },
      { text: "How do you add a background color?", options: ["background-color", "color", "bgcolor", "background"], correctAnswer: 0 },
      { text: "What is the correct CSS syntax?", options: ["selector { property: value }", "property: selector value", "value { selector: property }", "selector: property value"], correctAnswer: 0 },
      { text: "How do you make text bold?", options: ["font-weight: bold", "text-weight: bold", "bold: true", "weight: bold"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'medium') {
    return [
      { text: "What does 'flex: 1' mean in flexbox?", options: ["Takes remaining space", "Sets flex to 1 unit", "Makes element flexible", "All of the above"], correctAnswer: 3 },
      { text: "How do you center content vertically in flexbox?", options: ["align-items: center", "justify-content: center", "vertical-align: center", "center: vertical"], correctAnswer: 0 },
      { text: "What does 'z-index' control?", options: ["Stacking order", "Depth perception", "Layer positioning", "3D positioning"], correctAnswer: 0 },
      { text: "What is the box model?", options: ["Margin, border, padding, content", "Just margin and padding", "Only borders", "Content only"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'hard') {
    return [
      { text: "What does 'contain: layout' do?", options: ["Contains layout to subtree", "Optimizes re-layout", "Isolates positioning", "Contains size calculation"], correctAnswer: 1 },
      { text: "How do you implement CSS container queries?", options: ["@container", "@media", "@supports", "@query"], correctAnswer: 0 },
      { text: "What is the purpose of 'content-visibility'?", options: ["Content visibility optimization", "Lazy rendering", "Performance optimization", "All of the above"], correctAnswer: 3 }
    ];
  } else { // advanced
    return [
      { text: "What are CSS Houdini APIs?", options: ["New CSS properties", "Low-level CSS APIs", "CSS frameworks", "Grid systems"], correctAnswer: 1 },
      { text: "What is CSS-in-JS?", options: ["Writing CSS in JavaScript", "Converting JS to CSS", "Styled components library", "All of the above"], correctAnswer: 0 },
      { text: "What does 'will-change' property do?", options: ["Future property changes", "Performance optimization hint", "Animation trigger", "Style inheritance"], correctAnswer: 1 }
    ];
  }
};

const getJavaScriptQuestions = (difficulty: string) => {
  if (difficulty === 'easy') {
    return [
      { text: "What is JavaScript?", options: ["Programming language", "Markup language", "Styling language", "Database"], correctAnswer: 0 },
      { text: "How do you declare a variable?", options: ["var name", "variable name", "v name", "declare name"], correctAnswer: 0 },
      { text: "What does 'console.log()' do?", options: ["Prints to console", "Creates log file", "Shows alert", "Saves data"], correctAnswer: 0 },
      { text: "How do you create a function?", options: ["function name()", "def name()", "func name()", "create name()"], correctAnswer: 0 },
      { text: "What is an array?", options: ["Single value", "Collection of values", "Function type", "Object type"], correctAnswer: 1 }
    ];
  } else if (difficulty === 'medium') {
    return [
      { text: "What is a closure?", options: ["Function with access to outer scope", "Closed function", "Function wrapper", "Scope container"], correctAnswer: 0 },
      { text: "What is the 'this' context in arrow functions?", options: ["Inherits parent's this", "Has own this", "No this binding", "Global this"], correctAnswer: 0 },
      { text: "How do Promises work?", options: ["Handle async operations", "Promise fulfillment", "Future values", "All of the above"], correctAnswer: 3 },
      { text: "What is destructuring?", options: ["Extracts values from objects/arrays", "Deconstructs data", "Parses structures", "All of the above"], correctAnswer: 3 }
    ];
  } else if (difficulty === 'hard') {
    return [
      { text: "What is the temporal dead zone?", options: ["let/const hoisting behavior", "Dead code zone", "Execution pause", "Time-based blocking"], correctAnswer: 0 },
      { text: "What are execution contexts?", options: ["Code execution environments", "Function scopes", "Variable environments", "All of the above"], correctAnswer: 3 },
      { text: "What are Symbols?", options: ["Unique identifiers", "Special strings", "Primitive values", "Object keys"], correctAnswer: 0 },
      { text: "What is a Proxy object?", options: ["Object wrapper", "Custom object behavior", "Metaprogramming", "All of the above"], correctAnswer: 3 }
    ];
  } else { // advanced
    return [
      { text: "What are JavaScript engines?", options: ["V8, SpiderMonkey, JavaScriptCore", "Programming tools", "Debuggers", "Testing frameworks"], correctAnswer: 0 },
      { text: "What is the event loop?", options: ["Execution model for async code", "Loop for events", "Event handler", "Async iterator"], correctAnswer: 0 },
      { text: "What are Web Workers?", options: ["Background threads", "Worker management", "Task runners", "Multi-threading API"], correctAnswer: 0 },
      { text: "What is the 'use strict' directive?", options: ["Strict mode enforcement", "Code optimization", "Error prevention", "Performance mode"], correctAnswer: 0 }
    ];
  }
};

const getJQueryQuestions = (difficulty: string) => {
  if (difficulty === 'easy') {
    return [
      { text: "What is jQuery?", options: ["JavaScript library", "CSS framework", "HTML preprocessor", "Database tool"], correctAnswer: 0 },
      { text: "How do you select all paragraphs?", options: ["$('p')", "$('.p')", "$('#p')", "$('paragraph')"], correctAnswer: 0 },
      { text: "What does $(document).ready() do?", options: ["Loads the page", "Executes when DOM is ready", "Loads jQuery", "Initializes variables"], correctAnswer: 1 },
      { text: "How do you hide an element?", options: ["hide()", "remove()", "invisible()", "gone()"], correctAnswer: 0 },
      { text: "What does the $ symbol represent?", options: ["jQuery function", "Global object", "DOM element", "Variable"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'medium') {
    return [
      { text: "What is AJAX in jQuery?", options: ["Asynchronous JavaScript and XML", "Advanced JavaScript API", "Automated JavaScript XML", "Asynchronous JSON API"], correctAnswer: 0 },
      { text: "How do you handle click events?", options: ["click()", "onClick()", "handleClick()", "eventClick()"], correctAnswer: 0 },
      { text: "What does fadeIn() do?", options: ["Fades element in", "Moves element", "Changes color", "Resizes element"], correctAnswer: 0 },
      { text: "How do you add a CSS class?", options: ["addClass()", "addCSS()", "applyClass()", "setClass()"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'hard') {
    return [
      { text: "What is the difference between .prop() and .attr()?", options: ["Properties vs attributes", "Values vs strings", "Objects vs elements", "Events vs handlers"], correctAnswer: 0 },
      { text: "How do you create a custom plugin?", options: ["$.fn.pluginName", "$.plugin()", "jQuery.plugin()", "createPlugin()"], correctAnswer: 0 },
      { text: "What does .promise() do?", options: ["Returns a Promise", "Creates async operations", "Handles deferreds", "All of the above"], correctAnswer: 3 },
      { text: "How do you prevent event bubbling?", options: ["stopPropagation()", "preventDefault()", "stopImmediate()", "halt()"], correctAnswer: 0 }
    ];
  } else { // advanced
    return [
      { text: "What is jQuery's Deferred object?", options: ["Promise implementation", "Future value holder", "Async operation", "All of the above"], correctAnswer: 0 },
      { text: "What does .queue() do?", options: ["Function queue for animations", "Event queuing", "Task management", "Callback chain"], correctAnswer: 0 },
      { text: "What is jQuery's data() method?", options: ["Associate data with DOM", "Retrieve element data", "Store arbitrary data", "All of the above"], correctAnswer: 3 }
    ];
  }
};

const getDevToolsQuestions = (difficulty: string) => {
  if (difficulty === 'easy') {
    return [
      { text: "What are Browser DevTools?", options: ["Debugging tools", "Browser settings", "Download manager", "Extensions"], correctAnswer: 0 },
      { text: "How do you open DevTools?", options: ["F12", "Ctrl+U", "Ctrl+F", "Alt+F"], correctAnswer: 0 },
      { text: "What does the Console tab show?", options: ["JavaScript errors", "Page source", "Network requests", "Application data"], correctAnswer: 0 },
      { text: "What does the Elements tab show?", options: ["HTML structure", "JavaScript code", "CSS styles", "Network activity"], correctAnswer: 0 }
    ];
  } else if (difficulty === 'medium') {
    return [
      { text: "What does the Network tab show?", options: ["HTTP requests", "JavaScript errors", "CSS styles", "Page sources"], correctAnswer: 0 },
      { text: "How do you set breakpoints?", options: ["Click line numbers in Sources", "Use console.log()", "Check elements", "View network"], correctAnswer: 0 },
      { text: "What is the Application tab for?", options: ["Service workers", "Local storage", "Cookies", "All of the above"], correctAnswer: 3 },
      { text: "How do you debug JavaScript?", options: ["Set breakpoints", "Use console", "Check errors", "All of the above"], correctAnswer: 3 }
    ];
  } else if (difficulty === 'hard') {
    return [
      { text: "What is the Command Menu?", options: ["Quick commands", "DevTools menu", "Shortcut palette", "All of the above"], correctAnswer: 3 },
      { text: "How do you emulate devices?", options: ["Device toolbar", "Responsive mode", "Mobile settings", "All of the above"], correctAnswer: 3 },
      { text: "What does Lighthouse do?", options: ["Performance auditing", "Accessibility testing", "SEO analysis", "All of the above"], correctAnswer: 3 },
      { text: "What is the Coverage tab?", options: ["Code coverage", "Test coverage", "Performance coverage", "Network coverage"], correctAnswer: 0 }
    ];
  } else { // advanced
    return [
      { text: "What are Chrome DevTools Protocol?", options: ["DevTools API", "Debugging protocol", "Remote debugging", "All of the above"], correctAnswer: 0 },
      { text: "What does the Performance tab measure?", options: ["Runtime performance", "Memory usage", "Network activity", "All of the above"], correctAnswer: 3 },
      { text: "What are Memory snapshots?", options: ["Memory usage at a point", "Heap snapshots", "Garbage collection", "Memory leaks"], correctAnswer: 0 }
    ];
  }
};

// Main seeding function
export const seedAllQuestionBanks = async (): Promise<void> => {
  const skills: Skill[] = ['html', 'css', 'javascript', 'jquery', 'devtools'];

  for (const skill of skills) {
    const questionBank = {
      easy: generateQuestionsForDifficulty(skill, 'easy', 10),
      medium: generateQuestionsForDifficulty(skill, 'medium', 10),
      hard: generateQuestionsForDifficulty(skill, 'hard', 10),
      advanced: generateQuestionsForDifficulty(skill, 'advanced', 10)
    };

    try {
      await seedQuestionBank(skill, questionBank);
      console.log(`✅ Seeded ${skill} question bank`);
    } catch (error) {
      console.error(`❌ Failed to seed ${skill} question bank:`, error);
    }
  }
};

// Seed individual skill question bank
export const seedSkillQuestionBank = async (skill: Skill): Promise<void> => {
  const questionBank = {
    easy: generateQuestionsForDifficulty(skill, 'easy', 10),
    medium: generateQuestionsForDifficulty(skill, 'medium', 10),
    hard: generateQuestionsForDifficulty(skill, 'hard', 10),
    advanced: generateQuestionsForDifficulty(skill, 'advanced', 10)
  };

  await seedQuestionBank(skill, questionBank);
};
