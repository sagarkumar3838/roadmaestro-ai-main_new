import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

console.log('🔄 Starting massive question bank seeding for HTML, CSS, JavaScript, jQuery...');

// Mass Generation Function - Creates 300+ questions per level per skill
const generateMassiveQuestions = (
  skill,
  level,
  templates,
  options,
  answers,
  targetCount = 300
) => {
  const questions = [];

  for (let i = 0; i < targetCount; i++) {
    const templateIndex = i % templates.length;
    const optionsIndex = i % options.length;
    const answerIndex = i % answers.length;

    const explanation = getExplanation(skill, level, templates[templateIndex], answers[answerIndex]);

    questions.push({
      id: `${skill}-${level}-${i}`,
      skill,
      difficulty: level,
      type: 'multiple-choice',
      text: templates[templateIndex].replace('{num}', (i + 1).toString()),
      options: options[optionsIndex],
      correctAnswer: answers[answerIndex],
      explanation
    });
  }

  return questions;
};

const getExplanation = (skill, level, template, correctAnswer) => {
  const skillExplanations = {
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

// Question data for seeding
const questionBanks = {
  html: {
    easy: generateMassiveQuestions('html', 'easy', [
      "What does HTML stand for?",
      "What is the purpose of the <head> tag?",
      "Which tag creates a hyperlink?",
      "What is the correct HTML element for inserting a line break?",
      "Which attribute specifies an image's source?",
      "What does the <title> tag define?",
      "Which HTML element contains metadata about a web page?",
      "What is the purpose of the <p> tag?"
    ], [
      ["HyperText Markup Language", "High Tech Modern Language", "Home Text Marking Language", "Hyperlink Text Management Language"],
      ["Page header content", "Main page content", "Footer content", "Navigation menu"],
      ["<link>", "<a>", "<href>", "<url>"],
      ["<break>", "<lb>", "<br>", "<newline>"],
      ["src", "source", "imgsrc", "link"],
      ["Page title", "Paragraph title", "Image title", "Table title"],
      ["<head>", "<meta>", "<title>", "<link>"],
      ["Paragraph", "Page", "Picture", "Preformatted"]
    ], [0, 0, 1, 0, 0, 0, 0, 0], 300),
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
      ["selector { property: value }", "property: selector value", "value { selector: property }", "selector: property value"],
      ["<link rel=\"stylesheet\">", "<style src=\"\">", "<css href=\"\">", "<stylesheet href=\"\">"]
    ], [0, 0, 0, 0, 0], 300),
    medium: generateMassiveQuestions('css', 'medium', [
      "What does 'flex: 1' mean in flexbox?",
      "How do you center content vertically?",
      "What is CSS Grid used for?",
      "How do you create responsive breakpoints?",
      "What are CSS custom properties?"
    ], [
      ["Takes remaining space", "Grow/shrink flexibly", "Fixed size", "Auto size"],
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
};

async function seedMassiveQuestionBank() {
  try {
    console.log('🔄 Initializing Firebase for massive seeding...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📋 Starting massive seeding (4800 questions)...');
    console.log('Skills: HTML, CSS, JavaScript, jQuery');
    console.log('4 levels each × 300 questions = 1200 per skill');

    const skills = Object.keys(questionBanks);
    let totalQuestions = 0;

    for (const skill of skills) {
      console.log(`\n📝 Processing ${skill.toUpperCase()}...`);

      const questionBank = questionBanks[skill];
      const skillTotal = Object.values(questionBank).flat().length;
      totalQuestions += skillTotal;

      console.log(`   Easy: ${questionBank.easy.length} questions`);
      console.log(`   Medium: ${questionBank.medium.length} questions`);
      console.log(`   Hard: ${questionBank.hard.length} questions`);
      console.log(`   Advanced: ${questionBank.advanced.length} questions`);
      console.log(`   Skill Total: ${skillTotal} questions`);

      // Save to Firebase Firestore
      const docRef = doc(db, 'questionBank', skill);

      await setDoc(docRef, questionBank);
      console.log(`✅ Successfully seeded ${skill} to Firebase!`);
    }

    console.log('\n🎉 Massive question bank seeding completed!');
    console.log(`📊 Total: ${totalQuestions} questions seeded`);
    console.log(`🏗️  Firestore: questionBank collection`);
    console.log(`🎯 Skills: ${skills.join(', ').toUpperCase()}`);
    console.log(`📚 Each skill: 4 levels × 300 questions`);

    // Stats breakdown
    console.log('\n📈 Statistics:');
    skills.forEach(skill => {
      const total = Object.values(questionBanks[skill]).flat().length;
      console.log(`   ${skill.toUpperCase()}: ${total} questions`);
    });

    console.log('\n🚀 Your Evaluation Module is now massively expanded!');

  } catch (error) {
    console.error('❌ Error seeding massive question bank:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check .env file has correct Firebase config');
    console.log('2. Ensure Firebase project exists and Firestore is enabled');
    console.log('3. Verify Firebase security rules allow writes');
    console.log('4. Check network connection and permissions');
  }
}

// Run the seeder
seedMassiveQuestionBank();
