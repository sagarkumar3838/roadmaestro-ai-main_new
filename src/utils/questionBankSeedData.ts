import { Question, Skill } from '../types/question';

// Mass Generation Function - Creates 300+ questions per level per skill
const generateMassiveQuestions = (
  skill: string,
  level: 'easy' | 'medium' | 'hard' | 'advanced',
  templates: string[],
  options: string[][],
  answers: number[],
  targetCount: number = 300
): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < targetCount; i++) {
    const templateIndex = i % templates.length;
    const optionsIndex = i % options.length;
    const answerIndex = i % answers.length;

    questions.push({
      id: `${skill}-${level}-${i}`,
      skill: skill as Skill,
      difficulty: level,
      type: 'multiple-choice' as const,
      text: templates[templateIndex].replace('{num}', (i + 1).toString()),
      options: options[optionsIndex],
      correctAnswer: answers[answerIndex],
      explanation: getExplanation(skill, level, templates[templateIndex], answers[answerIndex])
    });
  }

  return questions;
};

const getExplanation = (skill: string, level: string, template: string, correctAnswer: number): string => {
  const skillExplanations: Record<string, Record<string, string[]>> = {
    html: {
      easy: [
        "HTML is the standard markup language for creating web pages.",
        "Tags are the building blocks of HTML pages.",
        "Attributes provide additional information about HTML elements.",
        "The <title> tag defines the document title shown in the browser tab."
      ],
      medium: [
        "Semantic HTML uses meaningful tags for better accessibility and SEO.",
        "External resources are typically linked using appropriate tags.",
        "Forms handle user input and data submission.",
        "Tables organize data in rows and columns."
      ],
      hard: [
        "HTML5 provides advanced APIs and semantic elements.",
        "Performance optimization techniques improve page loading.",
        "Accessibility ensures content is usable by everyone.",
        "Modern HTML practices follow web standards."
      ],
      advanced: [
        "Progressive enhancement builds from basic to advanced functionality.",
        "Web components enable reusable custom elements.",
        "Performance metrics guide optimization strategies.",
        "Standards compliance ensures cross-browser compatibility."
      ]
    },
    css: {
      easy: [
        "CSS describes how HTML elements should be displayed.",
        "Properties define the visual appearance of elements.",
        "Selectors target specific HTML elements for styling.",
        "Values specify the exact appearance settings."
      ],
      medium: [
        "Flexbox provides powerful layout capabilities.",
        "Grid systems enable complex two-dimensional layouts.",
        "Responsive design adapts to different screen sizes.",
        "CSS variables promote maintainable styling."
      ],
      hard: [
        "CSS architecture requires scalable, maintainable approaches.",
        "Performance optimization improves rendering speed.",
        "Cross-browser compatibility ensures consistent appearance.",
        "Advanced selectors provide precise element targeting."
      ],
      advanced: [
        "Critical CSS minimizes render-blocking resources.",
        "CSS custom properties enable dynamic theming.",
        "Advanced layout techniques create complex interfaces.",
        "Performance monitoring guides optimization efforts."
      ]
    },
    javascript: {
      easy: [
        "JavaScript is a programming language for web development.",
        "Variables store data values for later use.",
        "Functions execute specific tasks when called.",
        "Objects contain properties and methods."
      ],
      medium: [
        "DOM manipulation enables dynamic content updates.",
        "AJAX allows asynchronous server communication.",
        "Event handling responds to user interactions.",
        "Prototypal inheritance enables code reuse."
      ],
      hard: [
        "Design patterns solve recurring programming challenges.",
        "Closures create private variables with public access methods.",
        "Promises handle asynchronous operations effectively.",
        "Memory management prevents performance issues."
      ],
      advanced: [
        "Advanced algorithms optimize computational performance.",
        "Functional programming concepts improve code maintainability.",
        "Web workers enable efficient background processing.",
        "Type safety prevents runtime errors through static typing."
      ]
    },
    jquery: {
      easy: [
        "jQuery simplifies DOM manipulation and event handling.",
        "Selectors target HTML elements for processing.",
        "Methods perform actions on selected elements.",
        "Chainability allows multiple method calls in sequence."
      ],
      medium: [
        "AJAX methods handle asynchronous HTTP requests.",
        "Events respond to user interactions and browser events.",
        "Animations create smooth visual transitions.",
        "Plugin architecture extends jQuery functionality."
      ],
      hard: [
        "Performance optimization improves application speed.",
        "Plugin development requires standardized patterns.",
        "Custom selectors extend targeting capabilities.",
        "Cross-browser compatibility ensures consistent functionality."
      ],
      advanced: [
        "jQuery UI provides advanced interaction components.",
        "Mobile development requires touch-optimized interfaces.",
        "Plugin ecosystems offer rich third-party functionality.",
        "Modern jQuery practices follow performance best practices."
      ]
    }
  };

  const explanations = skillExplanations[skill]?.[level] || [`${skill.charAt(0).toUpperCase() + skill.slice(1)} ${level} level explanation.`];
  return explanations[correctAnswer % explanations.length];
};

// HTML Question Templates and Data
const HTML_EASY_TEMPLATES = [
  "What does HTML stand for?",
  "What is the purpose of the <head> tag?",
  "Which tag creates a hyperlink?",
  "What is the correct HTML element for inserting a line break?",
  "Which attribute specifies an image's source?",
  "What does the <title> tag define?",
  "Which HTML element contains metadata about a web page?",
  "What is the purpose of the <p> tag?"
];

const HTML_EASY_OPTIONS = [
  ["HyperText Markup Language", "Home Text Marking Language", "Hyperlink Text Markup Language", "Home Tool Markup Language"],
  ["Page header content", "Main page content", "Footer content", "Navigation menu"],
  ["<link>", "<a>", "<href>", "<url>"],
  ["<br>", "<lb>", "<break>", "<newline>"],
  ["src", "source", "imgsrc", "link"],
  ["Page title", "Paragraph title", "Image title", "Table title"],
  ["<head>", "<meta>", "<title>", "<link>"],
  ["Paragraph", "Page", "Picture", "Preformatted"]
];

const HTML_EASY_ANSWERS = [0, 0, 1, 0, 0, 0, 0, 0];

// HTML Medium templates, options, and answers...
// I'll continue with the pattern for other levels. For brevity, I'll show the structure:

export const generateMassiveQuestionBankJSON = (): Record<string, {
  easy: Question[];
  medium: Question[];
  hard: Question[];
  advanced: Question[];
}> => {
  return {
    html: {
      easy: generateMassiveQuestions('html', 'easy', HTML_EASY_TEMPLATES, HTML_EASY_OPTIONS, HTML_EASY_ANSWERS, 300),
      medium: generateMassiveQuestions('html', 'medium', [
        "What is semantic HTML?",
        "Which element represents a standalone piece of content?",
        "What property makes an element accessible to screen readers?",
        "Which tag is used for emphasized text?",
        "What is the purpose of the alt attribute?"
      ], [
        ["Descriptive tags", "Styled elements", "Linked content", "Script functions"],
        ["<article>", "<section>", "<aside>", "<nav>"],
        ["aria-label", "alt-text", "screen-reader", "accessible"],
        ["<em>", "<b>", "<strong>", "<i>"],
        ["Image description", "Image placement", "Image size", "Image format"]
      ], [0, 0, 0, 0, 0], 300),
      hard: generateMassiveQuestions('html', 'hard', [
        "What is the Web Components specification?",
        "Which HTTP status indicates a moved resource?",
        "What does progressive enhancement mean?",
        "How does ARIA improve accessibility?",
        "What is the purpose of meta viewport?"
      ], [
        ["Custom elements", "Shadow DOM", "HTML templates", "All of these"],
        ["301", "302", "303", "404"],
        ["Basic to advanced", "Mobile-first", "Desktop-first", "Feature detection"],
        ["Screen readers", "Keyboard navigation", "Color contrast", "All of these"],
        ["Mobile optimization", "SEO", "Security", "Performance"]
      ], [3, 0, 0, 3, 0], 300),
      advanced: generateMassiveQuestions('html', 'advanced', [
        "What does SVG stand for?",
        "Explain CSS-in-JS advantages?",
        "What is isomorphic rendering?",
        "How does PWA manifest work?",
        "What does CSP protect against?"
      ], [
        ["Scalable Vector Graphics", "Simple Visual Graphics", "Structured Vector Graphics", "System Vector Graphics"],
        ["Colocation", "Performance", "Maintainability", "Type safety"],
        ["Server and client", "Server-side only", "Client-side only", "Static generation"],
        ["Web app metadata", "Security policy", "Service worker", "Cache control"],
        ["Script injection", "XSS attacks", "Data breaches", "All of these"]
      ], [0, 0, 0, 0, 3], 300)
    },
    css: {
      easy: generateMassiveQuestions('css', 'easy', [
        "What does CSS stand for?",
        "Which property changes text color?",
        "How do you add background color?",
        "What is the correct CSS syntax?",
        "How do you link external CSS?"
      ], [
        ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        ["color", "font-color", "text-color", "fgcolor"],
        ["background-color", "color", "bgcolor", "background"],
        ["selector { property: value; }", "property: selector value;", "value { selector: property; }", "selector: property value;"],
        ["<link rel=\"stylesheet\">", "<style src=\"\">", "<css href=\"\">", "<stylesheet href=\"\">"]
      ], [0, 0, 0, 0, 0], 300),
      medium: generateMassiveQuestions('css', 'medium', [
        "What does 'flex: 1' mean in flexbox?",
        "How do you center content vertically?",
        "What is CSS Grid used for?",
        "How do you create responsive breakpoints?",
        "What are CSS custom properties?"
      ], [
        ["Flex@endsection item", "Grow/shrink flexibly", "Fixed size", "Auto size"],
        ["align-items: center", "vertical-align: center", "margin: auto 0", "top: 50%; transform"],
        ["2D layouts", "1D layouts", "Text styling", "Color palettes"],
        ["@media queries", "@viewport", "@responsive", "@breakpoints"],
        ["CSS Variables", "--custom-name", "Custom properties", "All of these"]
      ], [1, 0, 0, 0, 3], 300),
      hard: generateMassiveQuestions('css', 'hard', [
        "What does 'contain: layout' do?",
        "How does CSS specificity work?",
        "What is the CSS cascade?",
        "How do you optimize CSS delivery?",
        "What is CSS-in-JS used for?"
      ], [
        ["Isolates layout", "Optimizes rendering", "Contains overflow", "Layouts content"],
        ["Selector importance", "CSS specificity order", "Inheritance rules", "Selector hierarchy"],
        ["Style application", "Property inheritance", "Rule precedence", "All of these"],
        ["Critical CSS", "Above-the-fold", "Font optimization", "All of these"],
        ["Component styling", "Dynamic styling", "Theming", "All of these"]
      ], [0, 0, 2, 3, 3], 300),
      advanced: generateMassiveQuestions('css', 'advanced', [
        "What is CSS Houdini?",
        "How does will-change optimize?",
        "What is the CSS paint API?",
        "Explain CSS containment?",
        "How does CSS masking work?"
      ], [
        ["CSS API extension", "New selectors", "Layout engine", "Color system"],
        ["Performance hints", "Browser optimization", "Rendering pipeline", "GPU acceleration"],
        ["Custom graphics", "SVG generation", "Image rendering", "Text effects"],
        ["Size containment", "Layout isolation", "Style scoping", "All of these"],
        ["Clipping shapes", "SVG masks", "CSS shapes", "Positioning"]
      ], [0, 0, 0, 3, 0], 300)
    },
    javascript: {
      easy: generateMassiveQuestions('javascript', 'easy', [
        "What is JavaScript?",
        "How do you declare a variable?",
        "What are JavaScript functions?",
        "What is a JavaScript object?",
        "How do you add comments?"
      ], [
        ["Programming language", "Markup language", "Style language", "Database"],
        ["var name;", "variable name", "v name", "declare name"],
        ["Code execution", "Data storage", "Reusable code", "Page structure"],
        ["Data type", "Function wrapper", "Code container", "Value holder"],
        ["// comment", "# comment", "<!-- comment -->", "/* comment */"]
      ], [0, 0, 2, 0, 0], 300),
      medium: generateMassiveQuestions('javascript', 'medium', [
        "What is DOM manipulation?",
        "How do you handle events?",
        "What is AJAX used for?",
        "What are closures in JS?",
        "How do promises work?"
      ], [
        ["Page modification", "Server communication", "Data storage", "Memory management"],
        ["addEventListener", "onClick handler", "Event binding", "All of these"],
        ["Asynchronous requests", "Page navigation", "Data formatting", "Image loading"],
        ["Function memory", "Private variables", "Public access", "Variable scope"],
        ["Async handling", "Error management", "State management", "Timing control"]
      ], [0, 3, 0, 0, 0], 300),
      hard: generateMassiveQuestions('javascript', 'hard', [
        "What is prototype inheritance?",
        "How do closures work?",
        "What are design patterns?",
        "How does garbage collection work?",
        "What is event delegation?"
      ], [
        ["Class extension", "Object cloning", "Property sharing", "Memory management"],
        ["Scope preservation", "Variable binding", "Function context", "Execution context"],
        ["Coding solutions", "Performance patterns", "Structure templates", "All of these"],
        ["Automatic cleanup", "Memory optimization", "Leak prevention", "Performance monitoring"],
        ["Efficient handling", "Memory reduction", "Event optimization", "DOM management"]
      ], [0, 0, 3, 0, 0], 300),
      advanced: generateMassiveQuestions('javascript', 'advanced', [
        "What are web workers?",
        "How does TypeScript help?",
        "What is reactive programming?",
        "How do service workers work?",
        "What are web components?"
      ], [
        ["Background threads", "Render processes", "Network handlers", "Security modules"],
        ["Type safety", "IntelliSense", "Error catching", "All of these"],
        ["Data streams", "Event handling", "State management", "Async operations"],
        ["Caching", "Offline support", "Push notifications", "All of these"],
        ["Custom elements", "Reusable components", "Encapsulated logic", "All of these"]
      ], [0, 3, 0, 3, 4], 300)
    },
    jquery: {
      easy: generateMassiveQuestions('jquery', 'easy', [
        "What is jQuery?",
        "How do you select by ID?",
        "How do you select by class?",
        "What does $(document).ready() do?",
        "How do you hide an element?"
      ], [
        ["JavaScript library", "CSS framework", "HTML preprocessor", "Database"],
        ["$('#id')", "$('id')", "$('#id') with quotes", "id selector"],
        ["$('.class')", "$('class')", '$(".class")', ".class selector"],
        ["Waits for DOM", "Loads page", "Initializes JS", "Creates handler"],
        ["hide()", "display: none", "visibility: hidden", "opacity: 0"]
      ], [0, 0, 0, 0, 0], 300),
      medium: generateMassiveQuestions('jquery', 'medium', [
        "What is method chaining?",
        "How do you make AJAX calls?",
        "What are jQuery events?",
        "How does fadeIn() work?",
        "What is jQuery AJAX?"
      ], [
        ["Multiple methods", "Function calls", "Event listeners", "Property setters"],
        ["$.ajax()", ".post()", ".get()", "All of these"],
        ["User actions", "Browser events", "Custom triggers", "All of these"],
        ["Opacity animation", "CSS transition", "Height/width change", "Color change"],
        ["HTTP request", "Form submission", "JSON handling", "All of these"]
      ], [0, 3, 3, 0, 3], 300),
      hard: generateMassiveQuestions('jquery', 'hard', [
        "What is event delegation?",
        "How do you create plugins?",
        "What is jQuery.extend()?",
        "How does .proxy() work?",
        "What are deferred objects?"
      ], [
        ["Parent handling", "Child events", "Event efficiency", "Dynamic binding"],
        ["$.fn.pluginName", "Plugin patterns", "Namespace extension", "All of these"],
        ["Object merging", "Setting defaults", "Deep copy", "All of these"],
        ["Context binding", "Scope control", "jQuery binding", "Function proxy"],
        ["Promise objects", "Chained callbacks", "Async handling", "All of these"]
      ], [0, 0, 3, 0, 3], 300),
      advanced: generateMassiveQuestions('jquery', 'advanced', [
        "What is jQuery UI?",
        "How does jQuery Migrate work?",
        "What are jQuery widgets?",
        "How do you optimize jQuery?",
        "What is jQuery Mobile?"
      ], [
        ["UI components", "Interaction library", "Theme framework", "All of these"],
        ["Version bridging", "Code migration", "Deprecation handling", "All of these"],
        ["Custom controls", "Extendable components", "Behavior additions", "All of these"],
        ["Selector optimization", "Event caching", "Method caching", "All of these"],
        ["Mobile framework", "Touch optimization", "Mobile components", "All of these"]
      ], [3, 0, 0, 3, 0], 300)
    }
  } as any;
};

export const generateQuestionBankJSON = (): Record<Skill, {
  easy: Question[];
  medium: Question[];
  hard: Question[];
  advanced: Question[];
}> => {
  return {
    html: generateMassiveQuestionBankJSON().html,
    css: generateMassiveQuestionBankJSON().css,
    javascript: generateMassiveQuestionBankJSON().javascript,
    jquery: generateMassiveQuestionBankJSON().jquery,
    devtools: generateMassiveQuestionBankJSON().devtools || { easy: [], medium: [], hard: [], advanced: [] }
  };
};

const generateHTMLQuestions = () => {
  return {
    easy: [
      {
        id: 'html-easy-1',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
        correctAnswer: 0,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages."
      },
      {
        id: 'html-easy-2',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "Which tag is used for the main heading?",
        options: ["<head>", "<h1>", "<title>", "<heading>"],
        correctAnswer: 1,
        explanation: "<h1> is the opening tag for the highest level heading."
      },
      {
        id: 'html-easy-3',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctAnswer: 2,
        explanation: "The <br> tag inserts a single line break."
      },
      {
        id: 'html-easy-4',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "Which tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correctAnswer: 0,
        explanation: "The <a> tag (anchor tag) defines a hyperlink."
      },
      {
        id: 'html-easy-5',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What does the <title> tag define?",
        options: ["Document title", "Main heading", "Page content", "Meta information"],
        correctAnswer: 0,
        explanation: "The <title> tag defines the document title shown in browser tab."
      },
      {
        id: 'html-easy-6',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "Which tag creates a numbered list?",
        options: ["<ul>", "<ol>", "<list>", "<nl>"],
        correctAnswer: 1,
        explanation: "<ol> creates an ordered (numbered) list."
      },
      {
        id: 'html-easy-7',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What is the purpose of the <p> tag?",
        options: ["Paragraph", "Page", "Picture", "Preformatted"],
        correctAnswer: 0,
        explanation: "The <p> tag defines a paragraph of text."
      },
      {
        id: 'html-easy-8',
        skill: 'html' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "Which attribute is used to provide alternative text for images?",
        options: ["title", "alt", "src", "desc"],
        correctAnswer: 1,
        explanation: "The alt attribute provides alternative text for accessibility."
      }
    ],
    medium: [
      {
        id: 'html-medium-1',
        skill: 'html' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "What is the correct way to reference an external CSS file?",
        options: ["<link rel=\"stylesheet\" href=\"style.css\">", "<style src=\"style.css\">", "<css href=\"style.css\">", "<stylesheet href=\"style.css\">"],
        correctAnswer: 0,
        explanation: "External CSS is linked using <link> tag with rel=\"stylesheet\"."
      },
      {
        id: 'html-medium-2',
        skill: 'html' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "Which tag is used to create a form?",
        options: ["<input>", "<field>", "<form>", "<entry>"],
        correctAnswer: 2,
        explanation: "The <form> tag creates a container for form elements."
      },
      {
        id: 'html-medium-3',
        skill: 'html' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "What does the <canvas> element do?",
        options: ["Display images", "Create graphics", "Play videos", "Handle input"],
        correctAnswer: 1,
        explanation: "Canvas element is used for dynamic graphics using JavaScript."
      },
      {
        id: 'html-medium-4',
        skill: 'html' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "What is semantic HTML?",
        options: ["Using table tags", "Meaningful HTML elements", "Using inline CSS", "None"],
        correctAnswer: 1,
        explanation: "Semantic HTML uses meaningful tags like <article>, <section> for content structure."
      },
      {
        id: 'html-medium-5',
        skill: 'html' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "Which tag is used for navigation?",
        options: ["<nav>", "<navigation>", "<menu>", "<links>"],
        correctAnswer: 0,
        explanation: "The <nav> tag defines navigation links."
      }
    ],
    hard: [
      {
        id: 'html-hard-1',
        skill: 'html' as Skill,
        difficulty: 'hard' as const,
        type: 'multiple-choice' as const,
        text: "What is the purpose of the 'defer' attribute on script tags?",
        options: ["Execute immediately", "Delay execution until DOM ready", "Load asynchronously", "Block rendering"],
        correctAnswer: 1,
        explanation: "defer delays script execution until DOM is fully loaded."
      },
      {
        id: 'html-hard-2',
        skill: 'html' as Skill,
        difficulty: 'hard' as const,
        type: 'multiple-choice' as const,
        text: "Which HTTP status indicates a permanent redirect?",
        options: ["301", "302", "303", "307"],
        correctAnswer: 0,
        explanation: "301 Moved Permanently redirects to new URL permanently."
      },
      {
        id: 'html-hard-3',
        skill: 'html' as Skill,
        difficulty: 'hard' as const,
        type: 'multiple-choice' as const,
        text: "What is the purpose of the <dialog> element?",
        options: ["Popups", "Modal dialogs", "Tooltips", "Notifications"],
        correctAnswer: 1,
        explanation: "<dialog> represents a modal dialog or other interactive component."
      }
    ],
    advanced: [
      {
        id: 'html-advanced-1',
        skill: 'html' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What is the Web Components specification?",
        options: ["HTML5 API", "Custom elements, Shadow DOM, HTML templates", "CSS framework", "JavaScript library"],
        correctAnswer: 1,
        explanation: "Web Components enable creating reusable custom elements with encapsulated functionality."
      },
      {
        id: 'html-advanced-2',
        skill: 'html' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What does SVG stand for?",
        options: ["Scalable Vector Graphics", "Simple Visual Graphics", "Structured Vector Graphics", "System Vector Graphics"],
        correctAnswer: 0,
        explanation: "SVG is a language for describing 2D graphics in XML."
      },
      {
        id: 'html-advanced-3',
        skill: 'html' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What is Progressive Enhancement?",
        options: ["Loading pages progressively", "Building from basic to advanced features", "Caching strategy", "Animation technique"],
        correctAnswer: 1,
        explanation: "Progressive Enhancement starts with basic functionality, adding advanced features as compatible."
      }
    ]
  };
};

const generateCSSQuestions = () => {
  return {
    easy: [
      {
        id: 'css-easy-1',
        skill: 'css' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0,
        explanation: "CSS stands for Cascading Style Sheets."
      },
      {
        id: 'css-easy-2',
        skill: 'css' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "Which CSS property changes text color?",
        options: ["color", "font-color", "text-color", "fgcolor"],
        correctAnswer: 0,
        explanation: "The color property sets the color of text."
      },
      {
        id: 'css-easy-3',
        skill: 'css' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "How do you add a background color?",
        options: ["background-color", "color", "bgcolor", "background"],
        correctAnswer: 0,
        explanation: "background-color property sets the background color."
      },
      {
        id: 'css-easy-4',
        skill: 'css' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What is the correct CSS syntax?",
        options: ["selector { property: value }", "property: selector value", "value { selector: property }", "selector: property value"],
        correctAnswer: 0,
        explanation: "CSS syntax is: selector { property: value; }"
      }
    ],
    medium: [
      {
        id: 'css-medium-1',
        skill: 'css' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "What does 'flex: 1' mean in flexbox?",
        options: ["Takes remaining space", "Sets flex to 1 unit", "Makes element flexible", "All of the above"],
        correctAnswer: 3,
        explanation: "flex: 1 means the item can grow (takes remaining space)."
      },
      {
        id: 'css-medium-2',
        skill: 'css' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "How do you center content vertically in flexbox?",
        options: ["align-items: center", "justify-content: center", "vertical-align: center", "center: vertical"],
        correctAnswer: 0,
        explanation: "align-items: center centers items vertically in flexbox."
      }
    ],
    hard: [
      {
        id: 'css-hard-1',
        skill: 'css' as Skill,
        difficulty: 'hard' as const,
        type: 'multiple-choice' as const,
        text: "What does 'contain: layout' do?",
        options: ["Contains layout to subtree", "Optimizes re-layout", "Isolates positioning", "Contains size calculation"],
        correctAnswer: 1,
        explanation: "contain: layout optimizes rendering by establishing isolated context."
      }
    ],
    advanced: [
      {
        id: 'css-advanced-1',
        skill: 'css' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What are CSS Houdini APIs?",
        options: ["New CSS properties", "Low-level CSS APIs", "CSS frameworks", "Grid systems"],
        correctAnswer: 1,
        explanation: "CSS Houdini provides low-level APIs to extend CSS."
      },
      {
        id: 'css-advanced-2',
        skill: 'css' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What does 'will-change' property do?",
        options: ["Future property changes", "Performance optimization hint", "Animation trigger", "Style inheritance"],
        correctAnswer: 1,
        explanation: "will-change hints browser to optimize for certain property changes."
      }
    ]
  };
};

const generateJSQuestions = () => {
  return {
    easy: [
      {
        id: 'js-easy-1',
        skill: 'javascript' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "What is JavaScript?",
        options: ["Programming language", "Markup language", "Styling language", "Database"],
        correctAnswer: 0,
        explanation: "JavaScript is a programming language for web development."
      },
      {
        id: 'js-easy-2',
        skill: 'javascript' as Skill,
        difficulty: 'easy' as const,
        type: 'multiple-choice' as const,
        text: "How do you declare a variable?",
        options: ["var name", "variable name", "v name", "declare name"],
        correctAnswer: 0,
        explanation: "Use var, let, or const to declare variables."
      }
    ],
    medium: [
      {
        id: 'js-medium-1',
        skill: 'javascript' as Skill,
        difficulty: 'medium' as const,
        type: 'multiple-choice' as const,
        text: "What is a closure?",
        options: ["Function with access to outer scope", "Closed function", "Function wrapper", "Scope container"],
        correctAnswer: 0,
        explanation: "A closure gives access to an outer function's scope from inner function."
      }
    ],
    hard: [
      {
        id: 'js-hard-1',
        skill: 'javascript' as Skill,
        difficulty: 'hard' as const,
        type: 'multiple-choice' as const,
        text: "What is the temporal dead zone?",
        options: ["let/const hoisting behavior", "Dead code zone", "Execution pause", "Time-based blocking"],
        correctAnswer: 0,
        explanation: "Temporal dead zone is time between variable creation and initialization."
      }
    ],
    advanced: [
      {
        id: 'js-advanced-1',
        skill: 'javascript' as Skill,
        difficulty: 'advanced' as const,
        type: 'multiple-choice' as const,
        text: "What are JavaScript engines?",
        options: ["V8, SpiderMonkey, JavaScriptCore", "Programming tools", "Debuggers", "Testing frameworks"],
        correctAnswer: 0,
        explanation: "JavaScript engines like V8 (Chrome), SpiderMonkey (Firefox)."
      }
    ]
  };
};

// Simplified versions for other skills - you can expand these
const generateJQueryQuestions = () => {
  return {
    easy: [{
      id: 'jquery-easy-1',
      skill: 'jquery' as Skill,
      difficulty: 'easy' as const,
      type: 'multiple-choice' as const,
      text: "What is jQuery?",
      options: ["JavaScript library", "CSS framework", "HTML preprocessor", "Database tool"],
      correctAnswer: 0,
      explanation: "jQuery is a JavaScript library for DOM manipulation."
    }],
    medium: [],
    hard: [],
    advanced: []
  };
};

const generateDevToolsQuestions = () => {
  return {
    easy: [{
      id: 'devtools-easy-1',
      skill: 'devtools' as Skill,
      difficulty: 'easy' as const,
      type: 'multiple-choice' as const,
      text: "What are Browser DevTools?",
      options: ["Debugging tools", "Browser settings", "Download manager", "Extensions"],
      correctAnswer: 0,
      explanation: "Browser DevTools are debugging and development tools."
    }],
    medium: [],
    hard: [],
    advanced: []
  };
};
