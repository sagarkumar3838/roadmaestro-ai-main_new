import { Skill } from '@/types/question';

// Interface for learning resources
export interface LearningResource {
  mdnLink: string;
  youtubeLink: string;
  topic: string;
  description?: string;
}

// Comprehensive learning resources mapped by topic keywords
const learningResourcesMap: Record<Skill, Record<string, LearningResource>> = {
  html: {
    // HTML Basics
    'HTML Basics': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      youtubeLink: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
      topic: 'HTML Introduction',
      description: 'Learn the fundamentals of HTML'
    },
    'HTML Headings': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',
      youtubeLink: 'https://www.youtube.com/watch?v=6CxCgx1oTvU',
      topic: 'HTML Heading Elements',
      description: 'Understanding h1-h6 heading tags'
    },
    'HTML Line Breaks': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br',
      youtubeLink: 'https://www.youtube.com/watch?v=X4jc_CHBwl0',
      topic: 'HTML Line Break Element',
      description: 'Using the br tag for line breaks'
    },
    'HTML Links': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a',
      youtubeLink: 'https://www.youtube.com/watch?v=eddsQe7HGoo',
      topic: 'HTML Anchor Links',
      description: 'Creating hyperlinks with the anchor tag'
    },
    'HTML Document Structure': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html',
      youtubeLink: 'https://www.youtube.com/watch?v=salY_Sm6mv4',
      topic: 'HTML Document Structure',
      description: 'Understanding HTML document structure'
    },
    'HTML Lists': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul',
      youtubeLink: 'https://www.youtube.com/watch?v=09oErCBjVns',
      topic: 'HTML Lists',
      description: 'Creating ordered and unordered lists'
    },
    'HTML Tag Syntax': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
      youtubeLink: 'https://www.youtube.com/watch?v=MDLn5-zSQQI',
      topic: 'HTML Tag Syntax',
      description: 'Understanding HTML tag structure'
    },
    'HTML Images': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img',
      youtubeLink: 'https://www.youtube.com/watch?v=0vdZa92TaTk',
      topic: 'HTML Images',
      description: 'Adding images with the img tag'
    },
    'HTML Text Elements': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p',
      youtubeLink: 'https://www.youtube.com/watch?v=MDLn5-zSQQI',
      topic: 'HTML Text Elements',
      description: 'Working with paragraphs and text'
    },
    'HTML Text Formatting': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b',
      youtubeLink: 'https://www.youtube.com/watch?v=bWPMSSsVdPk',
      topic: 'HTML Text Formatting',
      description: 'Bold, italic, and other text formatting'
    },
    'HTML Tables': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table',
      youtubeLink: 'https://www.youtube.com/watch?v=dK8L7HvLcVE',
      topic: 'HTML Tables',
      description: 'Creating tables in HTML'
    },
    'HTML CSS Integration': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link',
      youtubeLink: 'https://www.youtube.com/watch?v=DyLaUQ48yPw',
      topic: 'Linking CSS to HTML',
      description: 'How to link external CSS files'
    },
    'HTML Forms': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form',
      youtubeLink: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
      topic: 'HTML Forms',
      description: 'Creating forms for user input'
    },
    'HTML5 Canvas': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas',
      youtubeLink: 'https://www.youtube.com/watch?v=EO6OkltgudE',
      topic: 'HTML5 Canvas',
      description: 'Drawing graphics with canvas'
    },
    'HTML Attributes': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
      youtubeLink: 'https://www.youtube.com/watch?v=V1TlH0Aqzls',
      topic: 'HTML Attributes',
      description: 'Understanding HTML attributes'
    },
    'HTML5 Input Types': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input',
      youtubeLink: 'https://www.youtube.com/watch?v=2O8pkybH6po',
      topic: 'HTML5 Input Types',
      description: 'New input types in HTML5'
    },
    'HTML5 Form Validation': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation',
      youtubeLink: 'https://www.youtube.com/watch?v=In0nB0ABaUk',
      topic: 'HTML5 Form Validation',
      description: 'Built-in form validation features'
    },
    'HTML Form Elements': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select',
      youtubeLink: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
      topic: 'HTML Form Elements',
      description: 'Select, option, and other form elements'
    },
    'HTML Meta Tags': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta',
      youtubeLink: 'https://www.youtube.com/watch?v=bi5bOd_c_Ro',
      topic: 'HTML Meta Tags',
      description: 'Meta tags for SEO and document info'
    },
    'HTML Character Encoding': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset',
      youtubeLink: 'https://www.youtube.com/watch?v=qEgyGyVA1ZQ',
      topic: 'HTML Character Encoding',
      description: 'Setting character encoding in HTML'
    }
  },

  css: {
    'CSS Basics': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      youtubeLink: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
      topic: 'CSS Introduction',
      description: 'Learn the fundamentals of CSS'
    },
    'CSS Text Properties': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color',
      youtubeLink: 'https://www.youtube.com/watch?v=wHnLpPOU7GQ',
      topic: 'CSS Text Properties',
      description: 'Styling text with CSS'
    },
    'CSS Selectors': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
      youtubeLink: 'https://www.youtube.com/watch?v=l1mER1bV0N0',
      topic: 'CSS Selectors',
      description: 'Selecting elements with CSS'
    },
    'CSS Background Properties': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-color',
      youtubeLink: 'https://www.youtube.com/watch?v=hLwF7HMXqMA',
      topic: 'CSS Background Properties',
      description: 'Setting background colors and images'
    },
    'CSS Font Properties': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight',
      youtubeLink: 'https://www.youtube.com/watch?v=6vQhwmADL4E',
      topic: 'CSS Font Properties',
      description: 'Font styling with CSS'
    },
    'CSS Box Model': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model',
      youtubeLink: 'https://www.youtube.com/watch?v=rIO5326FgPE',
      topic: 'CSS Box Model',
      description: 'Understanding padding, margin, and borders'
    },
    'CSS Syntax': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax',
      youtubeLink: 'https://www.youtube.com/watch?v=r1xBCi5eIBA',
      topic: 'CSS Syntax',
      description: 'CSS syntax and structure'
    },
    'CSS Flexbox': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout',
      youtubeLink: 'https://www.youtube.com/watch?v=JJSoEo8JSnc',
      topic: 'CSS Flexbox',
      description: 'Flexible box layout in CSS'
    },
    'CSS Z-Index': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index',
      youtubeLink: 'https://www.youtube.com/watch?v=uS8l4YRXbaw',
      topic: 'CSS Z-Index',
      description: 'Controlling element stacking order'
    },
    'CSS Grid': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
      youtubeLink: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
      topic: 'CSS Grid Layout',
      description: 'Grid layout system in CSS'
    }
  },

  javascript: {
    'JavaScript Variables': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#declarations',
      youtubeLink: 'https://www.youtube.com/watch?v=Z_yXBpTgZ7A',
      topic: 'JavaScript Variables',
      description: 'Declaring and using variables'
    },
    'JavaScript Comments': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#comments',
      youtubeLink: 'https://www.youtube.com/watch?v=QdaS5a5yCQs',
      topic: 'JavaScript Comments',
      description: 'Adding comments to JavaScript code'
    },
    'JavaScript Console': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/API/Console/log',
      youtubeLink: 'https://www.youtube.com/watch?v=L8CDt1J3DAw',
      topic: 'JavaScript Console',
      description: 'Using console.log for debugging'
    },
    'JavaScript Functions': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
      youtubeLink: 'https://www.youtube.com/watch?v=N8ap4k_1QEQ',
      topic: 'JavaScript Functions',
      description: 'Creating and using functions'
    },
    'JavaScript Operators': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators',
      youtubeLink: 'https://www.youtube.com/watch?v=FZzyij43A54',
      topic: 'JavaScript Operators',
      description: 'Comparison and logical operators'
    },
    'JavaScript Arrays': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
      youtubeLink: 'https://www.youtube.com/watch?v=7W4pQQ20nJg',
      topic: 'JavaScript Arrays',
      description: 'Working with arrays in JavaScript'
    },
    'JavaScript Conditionals': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#conditional_statements',
      youtubeLink: 'https://www.youtube.com/watch?v=IsG4Xd6LlsM',
      topic: 'JavaScript Conditionals',
      description: 'If statements and conditional logic'
    },
    'JavaScript Strings': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
      youtubeLink: 'https://www.youtube.com/watch?v=09BwruU4kiY',
      topic: 'JavaScript Strings',
      description: 'Working with strings in JavaScript'
    },
    'JavaScript Loops': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
      youtubeLink: 'https://www.youtube.com/watch?v=s9wW2PpJsmQ',
      topic: 'JavaScript Loops',
      description: 'For loops and iteration in JavaScript'
    }
  },

  jquery: {
    'jQuery Basics': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Glossary/jQuery',
      youtubeLink: 'https://www.youtube.com/watch?v=JjIvF-QKx8A',
      topic: 'jQuery Introduction',
      description: 'Getting started with jQuery'
    },
    'jQuery Selectors': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector',
      youtubeLink: 'https://www.youtube.com/watch?v=VgBWpCCoOJA',
      topic: 'jQuery Selectors',
      description: 'Selecting elements with jQuery'
    },
    'jQuery Events': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/Events',
      youtubeLink: 'https://www.youtube.com/watch?v=VlWsJHsVb-M',
      topic: 'jQuery Events',
      description: 'Handling events with jQuery'
    },
    'jQuery DOM Manipulation': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
      youtubeLink: 'https://www.youtube.com/watch?v=wiozYyXQEVk',
      topic: 'jQuery DOM Manipulation',
      description: 'Manipulating the DOM with jQuery'
    },
    'jQuery AJAX': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX',
      youtubeLink: 'https://www.youtube.com/watch?v=fEYx8dQr_cQ',
      topic: 'jQuery AJAX',
      description: 'Making AJAX requests with jQuery'
    }
  },

  devtools: {
    'Browser DevTools': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools',
      youtubeLink: 'https://www.youtube.com/watch?v=x4q86IjJFag',
      topic: 'Browser Developer Tools',
      description: 'Introduction to browser developer tools'
    },
    'DevTools Console': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Tools/Web_Console',
      youtubeLink: 'https://www.youtube.com/watch?v=L8CDt1J3DAw',
      topic: 'DevTools Console',
      description: 'Using the browser console for debugging'
    },
    'DevTools Elements': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector',
      youtubeLink: 'https://www.youtube.com/watch?v=Z3HGJsNLQ1E',
      topic: 'DevTools Elements Panel',
      description: 'Inspecting and editing HTML/CSS'
    },
    'DevTools Network': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor',
      youtubeLink: 'https://www.youtube.com/watch?v=e1gAyQuIFQo',
      topic: 'DevTools Network Panel',
      description: 'Monitoring network requests'
    },
    'DevTools Debugging': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Tools/Debugger',
      youtubeLink: 'https://www.youtube.com/watch?v=H0XScE08hy8',
      topic: 'JavaScript Debugging',
      description: 'Debugging JavaScript with DevTools'
    },
    'DevTools Performance': {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Tools/Performance',
      youtubeLink: 'https://www.youtube.com/watch?v=nxXkquTPng8',
      topic: 'Performance Profiling',
      description: 'Analyzing performance with DevTools'
    }
  }
};

// Get learning resources for a specific topic
export const getLearningResourcesByTopic = (skill: Skill, topic: string): LearningResource | null => {
  const skillResources = learningResourcesMap[skill];
  if (!skillResources) return null;

  return skillResources[topic] || null;
};

// Get learning resources by question text (fuzzy matching)
export const getLearningResourcesByQuestion = (skill: Skill, questionText: string): LearningResource => {
  const skillResources = learningResourcesMap[skill];
  
  if (!skillResources) {
    return getDefaultLearningResource(skill);
  }

  // Try to find matching topic by keywords in question
  const questionLower = questionText.toLowerCase();
  
  // Direct topic matching
  for (const [topic, resource] of Object.entries(skillResources)) {
    const topicKeywords = topic.toLowerCase().split(' ');
    if (topicKeywords.some(keyword => questionLower.includes(keyword))) {
      return resource;
    }
  }

  // Keyword-based matching
  const keywordMap: Record<string, string> = {
    // HTML keywords
    'html': 'HTML Basics',
    'heading': 'HTML Headings',
    'h1': 'HTML Headings',
    'break': 'HTML Line Breaks',
    'br': 'HTML Line Breaks',
    'link': 'HTML Links',
    'hyperlink': 'HTML Links',
    'anchor': 'HTML Links',
    'title': 'HTML Document Structure',
    'head': 'HTML Document Structure',
    'list': 'HTML Lists',
    'ul': 'HTML Lists',
    'ol': 'HTML Lists',
    'image': 'HTML Images',
    'img': 'HTML Images',
    'paragraph': 'HTML Text Elements',
    'bold': 'HTML Text Formatting',
    'table': 'HTML Tables',
    'form': 'HTML Forms',
    'canvas': 'HTML5 Canvas',
    'meta': 'HTML Meta Tags',
    
    // CSS keywords
    'css': 'CSS Basics',
    'color': 'CSS Text Properties',
    'selector': 'CSS Selectors',
    'background': 'CSS Background Properties',
    'font': 'CSS Font Properties',
    'padding': 'CSS Box Model',
    'margin': 'CSS Box Model',
    'syntax': 'CSS Syntax',
    'flex': 'CSS Flexbox',
    'z-index': 'CSS Z-Index',
    'grid': 'CSS Grid',
    
    // JavaScript keywords
    'variable': 'JavaScript Variables',
    'var': 'JavaScript Variables',
    'let': 'JavaScript Variables',
    'const': 'JavaScript Variables',
    'comment': 'JavaScript Comments',
    'console': 'JavaScript Console',
    'function': 'JavaScript Functions',
    'operator': 'JavaScript Operators',
    'array': 'JavaScript Arrays',
    'condition': 'JavaScript Conditionals',
    'if': 'JavaScript Conditionals',
    'string': 'JavaScript Strings',
    'loop': 'JavaScript Loops',
    'for': 'JavaScript Loops',
    
    // jQuery keywords
    'jquery': 'jQuery Basics',
    'select': 'jQuery Selectors',
    'event': 'jQuery Events',
    'click': 'jQuery Events',
    'ajax': 'jQuery AJAX',
    
    // DevTools keywords
    'devtools': 'Browser DevTools',
    'devtools-console': 'DevTools Console',
    'elements': 'DevTools Elements',
    'network': 'DevTools Network',
    'debug': 'DevTools Debugging',
    'performance': 'DevTools Performance'
  };

  // Find matching keyword
  for (const [keyword, topic] of Object.entries(keywordMap)) {
    if (questionLower.includes(keyword) && skillResources[topic]) {
      return skillResources[topic];
    }
  }

  // Return default resource for the skill
  return getDefaultLearningResource(skill);
};

// Get default learning resource for a skill
export const getDefaultLearningResource = (skill: Skill): LearningResource => {
  const defaults: Record<Skill, LearningResource> = {
    html: {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      youtubeLink: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
      topic: 'HTML Fundamentals',
      description: 'Complete HTML tutorial for beginners'
    },
    css: {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      youtubeLink: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
      topic: 'CSS Fundamentals',
      description: 'Complete CSS tutorial for beginners'
    },
    javascript: {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      youtubeLink: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      topic: 'JavaScript Fundamentals',
      description: 'Complete JavaScript tutorial for beginners'
    },
    jquery: {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Glossary/jQuery',
      youtubeLink: 'https://www.youtube.com/watch?v=JjIvF-QKx8A',
      topic: 'jQuery Fundamentals',
      description: 'Complete jQuery tutorial for beginners'
    },
    devtools: {
      mdnLink: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools',
      youtubeLink: 'https://www.youtube.com/watch?v=x4q86IjJFag',
      topic: 'Browser Developer Tools',
      description: 'Complete DevTools tutorial for beginners'
    }
  };

  return defaults[skill];
};

// Get all available topics for a skill
export const getAvailableTopics = (skill: Skill): string[] => {
  const skillResources = learningResourcesMap[skill];
  return skillResources ? Object.keys(skillResources) : [];
};

// Search resources by keyword
export const searchLearningResources = (skill: Skill, keyword: string): LearningResource[] => {
  const skillResources = learningResourcesMap[skill];
  if (!skillResources) return [];

  const keywordLower = keyword.toLowerCase();
  const results: LearningResource[] = [];

  for (const [topic, resource] of Object.entries(skillResources)) {
    if (
      topic.toLowerCase().includes(keywordLower) ||
      resource.topic.toLowerCase().includes(keywordLower) ||
      resource.description?.toLowerCase().includes(keywordLower)
    ) {
      results.push(resource);
    }
  }

  return results;
};