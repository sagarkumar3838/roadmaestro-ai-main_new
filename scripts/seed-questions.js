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

console.log('🔄 Starting Firebase question bank seeder...');

// JSON Question Data (structured as Firebase documents)
const questionBanks = {
  html: {
    easy: [
      {
        id: 'html-easy-1',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
        correctAnswer: 0,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages."
      },
      {
        id: 'html-easy-2',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "Which tag is used for the main heading?",
        options: ["<head>", "<h1>", "<title>", "<heading>"],
        correctAnswer: 1,
        explanation: "<h1> is the opening tag for the highest level heading."
      },
      {
        id: 'html-easy-3',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correctAnswer: 2,
        explanation: "The <br> tag inserts a single line break."
      },
      {
        id: 'html-easy-4',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "Which tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correctAnswer: 0,
        explanation: "The <a> tag (anchor tag) defines a hyperlink."
      },
      {
        id: 'html-easy-5',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What does the <title> tag define?",
        options: ["Document title", "Main heading", "Page content", "Meta information"],
        correctAnswer: 0,
        explanation: "The <title> tag defines the document title shown in browser tab."
      },
      {
        id: 'html-easy-6',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "Which tag creates a numbered list?",
        options: ["<ul>", "<ol>", "<list>", "<nl>"],
        correctAnswer: 1,
        explanation: "<ol> creates an ordered (numbered) list."
      },
      {
        id: 'html-easy-7',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What is the purpose of the <p> tag?",
        options: ["Paragraph", "Page", "Picture", "Preformatted"],
        correctAnswer: 0,
        explanation: "The <p> tag defines a paragraph of text."
      },
      {
        id: 'html-easy-8',
        skill: 'html',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "Which attribute is used to provide alternative text for images?",
        options: ["title", "alt", "src", "desc"],
        correctAnswer: 1,
        explanation: "The alt attribute provides alternative text for accessibility."
      }
    ],
    medium: [
      {
        id: 'html-medium-1',
        skill: 'html',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "What is the correct way to reference an external CSS file?",
        options: ["<link rel=\"stylesheet\" href=\"style.css\">", "<style src=\"style.css\">", "<css href=\"style.css\">", "<stylesheet href=\"style.css\">"],
        correctAnswer: 0,
        explanation: "External CSS is linked using <link> tag with rel=\"stylesheet\"."
      },
      {
        id: 'html-medium-2',
        skill: 'html',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "Which tag is used to create a form?",
        options: ["<input>", "<field>", "<form>", "<entry>"],
        correctAnswer: 2,
        explanation: "The <form> tag creates a container for form elements."
      },
      {
        id: 'html-medium-3',
        skill: 'html',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "What does the <canvas> element do?",
        options: ["Display images", "Create graphics", "Play videos", "Handle input"],
        correctAnswer: 1,
        explanation: "Canvas element is used for dynamic graphics using JavaScript."
      },
      {
        id: 'html-medium-4',
        skill: 'html',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "What is semantic HTML?",
        options: ["Using table tags", "Meaningful HTML elements", "Using inline CSS", "None"],
        correctAnswer: 1,
        explanation: "Semantic HTML uses meaningful tags like <article>, <section> for content structure."
      },
      {
        id: 'html-medium-5',
        skill: 'html',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "Which tag is used for navigation?",
        options: ["<nav>", "<navigation>", "<menu>", "<links>"],
        correctAnswer: 0,
        explanation: "The <nav> tag defines navigation links."
      }
    ],
    hard: [
      {
        id: 'html-hard-1',
        skill: 'html',
        difficulty: 'hard',
        type: 'multiple-choice',
        text: "What is the purpose of the 'defer' attribute on script tags?",
        options: ["Execute immediately", "Delay execution until DOM ready", "Load asynchronously", "Block rendering"],
        correctAnswer: 1,
        explanation: "defer delays script execution until DOM is fully loaded."
      },
      {
        id: 'html-hard-2',
        skill: 'html',
        difficulty: 'hard',
        type: 'multiple-choice',
        text: "Which HTTP status indicates a permanent redirect?",
        options: ["301", "302", "303", "307"],
        correctAnswer: 0,
        explanation: "301 Moved Permanently redirects to new URL permanently."
      },
      {
        id: 'html-hard-3',
        skill: 'html',
        difficulty: 'hard',
        type: 'multiple-choice',
        text: "What is the purpose of the <dialog> element?",
        options: ["Popups", "Modal dialogs", "Tooltips", "Notifications"],
        correctAnswer: 1,
        explanation: "<dialog> represents a modal dialog or other interactive component."
      }
    ],
    advanced: [
      {
        id: 'html-advanced-1',
        skill: 'html',
        difficulty: 'advanced',
        type: 'multiple-choice',
        text: "What is the Web Components specification?",
        options: ["HTML5 API", "Custom elements, Shadow DOM, HTML templates", "CSS framework", "JavaScript library"],
        correctAnswer: 1,
        explanation: "Web Components enable creating reusable custom elements with encapsulated functionality."
      },
      {
        id: 'html-advanced-2',
        skill: 'html',
        difficulty: 'advanced',
        type: 'multiple-choice',
        text: "What does SVG stand for?",
        options: ["Scalable Vector Graphics", "Simple Visual Graphics", "Structured Vector Graphics", "System Vector Graphics"],
        correctAnswer: 0,
        explanation: "SVG is a language for describing 2D graphics in XML."
      },
      {
        id: 'html-advanced-3',
        skill: 'html',
        difficulty: 'advanced',
        type: 'multiple-choice',
        text: "What is Progressive Enhancement?",
        options: ["Loading pages progressively", "Building from basic to advanced features", "Caching strategy", "Animation technique"],
        correctAnswer: 1,
        explanation: "Progressive Enhancement starts with basic functionality, adding advanced features as compatible."
      }
    ]
  },

  css: {
    easy: [
      {
        id: 'css-easy-1',
        skill: 'css',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0,
        explanation: "CSS stands for Cascading Style Sheets."
      },
      {
        id: 'css-easy-2',
        skill: 'css',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "Which CSS property changes text color?",
        options: ["color", "font-color", "text-color", "fgcolor"],
        correctAnswer: 0,
        explanation: "The color property sets the color of text."
      },
      {
        id: 'css-easy-3',
        skill: 'css',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "How do you add a background color?",
        options: ["background-color", "color", "bgcolor", "background"],
        correctAnswer: 0,
        explanation: "background-color property sets the background color."
      },
      {
        id: 'css-easy-4',
        skill: 'css',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What is the correct CSS syntax?",
        options: ["selector { property: value }", "property: selector value", "value { selector: property }", "selector: property value"],
        correctAnswer: 0,
        explanation: "CSS syntax is: selector { property: value; }"
      }
    ],
    medium: [
      {
        id: 'css-medium-1',
        skill: 'css',
        difficulty: 'medium',
        type: 'multiple-choice',
        text: "What does 'flex: 1' mean in flexbox?",
        options: ["Takes remaining space", "Sets flex to 1 unit", "Makes element flexible", "All of the above"],
        correctAnswer: 3,
        explanation: "flex: 1 means the item can grow (takes remaining space)."
      }
    ],
    hard: [],
    advanced: []
  },

  javascript: {
    easy: [
      {
        id: 'js-easy-1',
        skill: 'javascript',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "What is JavaScript?",
        options: ["Programming language", "Markup language", "Styling language", "Database"],
        correctAnswer: 0,
        explanation: "JavaScript is a programming language for web development."
      },
      {
        id: 'js-easy-2',
        skill: 'javascript',
        difficulty: 'easy',
        type: 'multiple-choice',
        text: "How do you declare a variable?",
        options: ["var name", "variable name", "v name", "declare name"],
        correctAnswer: 0,
        explanation: "Use var, let, or const to declare variables."
      }
    ],
    medium: [],
    hard: [],
    advanced: []
  },

  jquery: {
    easy: [{
      id: 'jquery-easy-1',
      skill: 'jquery',
      difficulty: 'easy',
      type: 'multiple-choice',
      text: "What is jQuery?",
      options: ["JavaScript library", "CSS framework", "HTML preprocessor", "Database tool"],
      correctAnswer: 0,
      explanation: "jQuery is a JavaScript library for DOM manipulation."
    }],
    medium: [],
    hard: [],
    advanced: []
  },

  devtools: {
    easy: [{
      id: 'devtools-easy-1',
      skill: 'devtools',
      difficulty: 'easy',
      type: 'multiple-choice',
      text: "What are Browser DevTools?",
      options: ["Debugging tools", "Browser settings", "Download manager", "Extensions"],
      correctAnswer: 0,
      explanation: "Browser DevTools are debugging and development tools."
    }],
    medium: [],
    hard: [],
    advanced: []
  }
};

async function seedQuestionsToFirebase() {
  try {
    console.log('🔄 Initializing Firebase...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📋 Seeding question banks...');

    const skills = Object.keys(questionBanks);

    for (const skill of skills) {
      console.log(`\n📝 Seeding ${skill} questions...`);

      const questionBank = questionBanks[skill];
      const easyCount = questionBank.easy.length;
      const mediumCount = questionBank.medium.length;
      const hardCount = questionBank.hard.length;
      const advancedCount = questionBank.advanced.length;
      const totalCount = easyCount + mediumCount + hardCount + advancedCount;

      console.log(`   Easy: ${easyCount} questions`);
      console.log(`   Medium: ${mediumCount} questions`);
      console.log(`   Hard: ${hardCount} questions`);
      console.log(`   Advanced: ${advancedCount} questions`);
      console.log(`   Total: ${totalCount} questions`);

      if (totalCount > 0) {
        // Save to Firebase Firestore
        const docRef = doc(db, 'questionBank', skill);

        await setDoc(docRef, questionBank);
        console.log(`✅ Successfully seeded ${skill} question bank to Firebase!`);
      } else {
        console.log(`⚠️  Skipping ${skill} - no questions found`);
      }
    }

    console.log('\n🎉 All question banks successfully seeded to Firebase!');
    console.log('📍 Firebase Firestore → questionBank collection');
    console.log('📊 Each skill has its own document with question arrays');
    console.log('\n🚀 Your Evaluation Module is now ready to use!');

  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env file has correct Firebase config');
    console.log('2. Ensure Firebase project exists and Firestore is enabled');
    console.log('3. Verify Firebase security rules allow writes');
  }
}

// Run the seeder
seedQuestionsToFirebase();
