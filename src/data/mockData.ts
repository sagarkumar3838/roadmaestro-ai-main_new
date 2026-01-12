// Mock data for development - will be replaced with real AI API calls and database

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Comprehensive question pools for different areas
export const questionPools = {
  'Web Development': [
    {
      id: 'web-1',
      text: "What does HTML stand for?",
      type: 'multiple-choice' as const,
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
      correctAnswer: 0,
      category: 'Web Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'web-2',
      text: "Which CSS property is used to change the background color?",
      type: 'multiple-choice' as const,
      options: ['color', 'bgcolor', 'background-color', 'bg-color'],
      correctAnswer: 2,
      category: 'Web Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'web-3',
      text: "What is the correct way to create a function in JavaScript?",
      type: 'multiple-choice' as const,
      options: ['function myFunction() {}', 'create myFunction() {}', 'def myFunction() {}', 'function = myFunction() {}'],
      correctAnswer: 0,
      category: 'Web Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'web-4',
      text: "Which of the following is NOT a JavaScript framework?",
      type: 'multiple-choice' as const,
      options: ['React', 'Angular', 'Vue', 'Bootstrap'],
      correctAnswer: 3,
      category: 'Web Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'web-5',
      text: "What does REST stand for in web APIs?",
      type: 'multiple-choice' as const,
      options: ['Representational State Transfer', 'Remote State Transfer', 'Relational State Transfer', 'Responsive State Transfer'],
      correctAnswer: 0,
      category: 'Web Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'web-6',
      text: "Which HTTP method is used to update an existing resource?",
      type: 'multiple-choice' as const,
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 2,
      category: 'Web Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'web-7',
      text: "What is the virtual DOM in React?",
      type: 'multiple-choice' as const,
      options: ['A copy of the real DOM kept in memory', 'A new HTML element', 'A CSS framework', 'A database technology'],
      correctAnswer: 0,
      category: 'Web Development',
      difficulty: 'advanced' as const
    },
    {
      id: 'web-8',
      text: "Which CSS property is used for responsive design?",
      type: 'multiple-choice' as const,
      options: ['display', 'position', 'media-query', 'flex'],
      correctAnswer: 2,
      category: 'Web Development',
      difficulty: 'intermediate' as const
    }
  ],
  'Mobile Development': [
    {
      id: 'mobile-1',
      text: "What is React Native?",
      type: 'multiple-choice' as const,
      options: ['A native mobile development framework', 'A cross-platform mobile development framework', 'A web framework', 'A database'],
      correctAnswer: 1,
      category: 'Mobile Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'mobile-2',
      text: "Which language is primarily used for iOS development?",
      type: 'multiple-choice' as const,
      options: ['Java', 'Kotlin', 'Swift', 'C#'],
      correctAnswer: 2,
      category: 'Mobile Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'mobile-3',
      text: "What is the main IDE for Android development?",
      type: 'multiple-choice' as const,
      options: ['Xcode', 'Android Studio', 'Visual Studio', 'Eclipse'],
      correctAnswer: 1,
      category: 'Mobile Development',
      difficulty: 'beginner' as const
    },
    {
      id: 'mobile-4',
      text: "Which programming language is used for Android native development?",
      type: 'multiple-choice' as const,
      options: ['Swift', 'Objective-C', 'Kotlin', 'Dart'],
      correctAnswer: 2,
      category: 'Mobile Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'mobile-5',
      text: "What is Flutter?",
      type: 'multiple-choice' as const,
      options: ['A web framework', 'A cross-platform mobile framework by Google', 'An iOS framework', 'A testing tool'],
      correctAnswer: 1,
      category: 'Mobile Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'mobile-6',
      text: "Which of the following is used for state management in React Native?",
      type: 'multiple-choice' as const,
      options: ['Redux', 'MobX', 'Context API', 'All of the above'],
      correctAnswer: 3,
      category: 'Mobile Development',
      difficulty: 'advanced' as const
    },
    {
      id: 'mobile-7',
      text: "What is the purpose of Android Manifest file?",
      type: 'multiple-choice' as const,
      options: ['Define app permissions and components', 'Store user data', 'Handle network requests', 'Manage app styling'],
      correctAnswer: 0,
      category: 'Mobile Development',
      difficulty: 'intermediate' as const
    },
    {
      id: 'mobile-8',
      text: "Which architecture pattern is commonly used in mobile development?",
      type: 'multiple-choice' as const,
      options: ['MVC', 'MVP', 'MVVM', 'All of the above'],
      correctAnswer: 3,
      category: 'Mobile Development',
      difficulty: 'advanced' as const
    }
  ],
  'Data Science': [
    {
      id: 'ds-1',
      text: "What is Python pandas used for?",
      type: 'multiple-choice' as const,
      options: ['Web development', 'Data manipulation and analysis', 'Mobile development', 'Game development'],
      correctAnswer: 1,
      category: 'Data Science',
      difficulty: 'beginner' as const
    },
    {
      id: 'ds-2',
      text: "Which of the following is a popular data visualization library in Python?",
      type: 'multiple-choice' as const,
      options: ['NumPy', 'Matplotlib', 'Requests', 'Flask'],
      correctAnswer: 1,
      category: 'Data Science',
      difficulty: 'beginner' as const
    },
    {
      id: 'ds-3',
      text: "What does SQL stand for?",
      type: 'multiple-choice' as const,
      options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'],
      correctAnswer: 0,
      category: 'Data Science',
      difficulty: 'beginner' as const
    },
    {
      id: 'ds-4',
      text: "Which is NOT a measure of central tendency?",
      type: 'multiple-choice' as const,
      options: ['Mean', 'Median', 'Mode', 'Range'],
      correctAnswer: 3,
      category: 'Data Science',
      difficulty: 'intermediate' as const
    },
    {
      id: 'ds-5',
      text: "What is the purpose of cross-validation in machine learning?",
      type: 'multiple-choice' as const,
      options: ['To increase training speed', 'To evaluate model performance', 'To reduce dataset size', 'To visualize data'],
      correctAnswer: 1,
      category: 'Data Science',
      difficulty: 'intermediate' as const
    },
    {
      id: 'ds-6',
      text: "Which algorithm is commonly used for classification problems?",
      type: 'multiple-choice' as const,
      options: ['Linear Regression', 'K-Means', 'Random Forest', 'PCA'],
      correctAnswer: 2,
      category: 'Data Science',
      difficulty: 'advanced' as const
    },
    {
      id: 'ds-7',
      text: "What is overfitting in machine learning?",
      type: 'multiple-choice' as const,
      options: ['Model performs well on training but poorly on test data', 'Model performs poorly on all data', 'Model is too simple', 'Model trains too fast'],
      correctAnswer: 0,
      category: 'Data Science',
      difficulty: 'advanced' as const
    },
    {
      id: 'ds-8',
      text: "Which library is commonly used for machine learning in Python?",
      type: 'multiple-choice' as const,
      options: ['Beautiful Soup', 'Scikit-learn', 'Requests', 'Pillow'],
      correctAnswer: 1,
      category: 'Data Science',
      difficulty: 'intermediate' as const
    }
  ],
  'AI/Machine Learning': [
    {
      id: 'ai-1',
      text: "What is artificial intelligence?",
      type: 'multiple-choice' as const,
      options: ['Computer simulation of human intelligence', 'A programming language', 'A database system', 'A web framework'],
      correctAnswer: 0,
      category: 'AI/Machine Learning',
      difficulty: 'beginner' as const
    },
    {
      id: 'ai-2',
      text: "Which of the following is a type of machine learning?",
      type: 'multiple-choice' as const,
      options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'All of the above'],
      correctAnswer: 3,
      category: 'AI/Machine Learning',
      difficulty: 'beginner' as const
    },
    {
      id: 'ai-3',
      text: "What is a neural network?",
      type: 'multiple-choice' as const,
      options: ['A computer network', 'A computing system inspired by biological neural networks', 'A database structure', 'A programming paradigm'],
      correctAnswer: 1,
      category: 'AI/Machine Learning',
      difficulty: 'intermediate' as const
    },
    {
      id: 'ai-4',
      text: "Which library is popular for deep learning?",
      type: 'multiple-choice' as const,
      options: ['TensorFlow', 'PyTorch', 'Keras', 'All of the above'],
      correctAnswer: 3,
      category: 'AI/Machine Learning',
      difficulty: 'intermediate' as const
    },
    {
      id: 'ai-5',
      text: "What is the purpose of an activation function in neural networks?",
      type: 'multiple-choice' as const,
      options: ['To introduce non-linearity', 'To reduce computation', 'To store data', 'To display results'],
      correctAnswer: 0,
      category: 'AI/Machine Learning',
      difficulty: 'advanced' as const
    },
    {
      id: 'ai-6',
      text: "What is backpropagation?",
      type: 'multiple-choice' as const,
      options: ['A data preprocessing technique', 'An algorithm for training neural networks', 'A visualization method', 'A database operation'],
      correctAnswer: 1,
      category: 'AI/Machine Learning',
      difficulty: 'advanced' as const
    },
    {
      id: 'ai-7',
      text: "Which of the following is used to prevent overfitting?",
      type: 'multiple-choice' as const,
      options: ['Dropout', 'Regularization', 'Early stopping', 'All of the above'],
      correctAnswer: 3,
      category: 'AI/Machine Learning',
      difficulty: 'advanced' as const
    },
    {
      id: 'ai-8',
      text: "What is Natural Language Processing (NLP)?",
      type: 'multiple-choice' as const,
      options: ['Processing natural resources', 'AI field focused on human language', 'A programming language', 'A database query language'],
      correctAnswer: 1,
      category: 'AI/Machine Learning',
      difficulty: 'intermediate' as const
    }
  ],
  'Cybersecurity': [
    {
      id: 'cyber-1',
      text: "What is cybersecurity?",
      type: 'multiple-choice' as const,
      options: ['Protection of digital systems from threats', 'A programming language', 'A database system', 'A web framework'],
      correctAnswer: 0,
      category: 'Cybersecurity',
      difficulty: 'beginner' as const
    },
    {
      id: 'cyber-2',
      text: "What does VPN stand for?",
      type: 'multiple-choice' as const,
      options: ['Virtual Private Network', 'Very Private Network', 'Verified Private Network', 'Variable Private Network'],
      correctAnswer: 0,
      category: 'Cybersecurity',
      difficulty: 'beginner' as const
    },
    {
      id: 'cyber-3',
      text: "Which of the following is a common type of cyberattack?",
      type: 'multiple-choice' as const,
      options: ['Phishing', 'Malware', 'DDoS', 'All of the above'],
      correctAnswer: 3,
      category: 'Cybersecurity',
      difficulty: 'beginner' as const
    },
    {
      id: 'cyber-4',
      text: "What is encryption?",
      type: 'multiple-choice' as const,
      options: ['Converting data into a coded format', 'Deleting data permanently', 'Copying data', 'Compressing data'],
      correctAnswer: 0,
      category: 'Cybersecurity',
      difficulty: 'intermediate' as const
    },
    {
      id: 'cyber-5',
      text: "What is two-factor authentication?",
      type: 'multiple-choice' as const,
      options: ['Using two passwords', 'Authentication requiring two forms of verification', 'Logging in twice', 'Using two devices'],
      correctAnswer: 1,
      category: 'Cybersecurity',
      difficulty: 'intermediate' as const
    },
    {
      id: 'cyber-6',
      text: "What is a firewall?",
      type: 'multiple-choice' as const,
      options: ['A physical barrier', 'Network security system that monitors traffic', 'A programming tool', 'A database system'],
      correctAnswer: 1,
      category: 'Cybersecurity',
      difficulty: 'intermediate' as const
    },
    {
      id: 'cyber-7',
      text: "What is penetration testing?",
      type: 'multiple-choice' as const,
      options: ['Testing network speed', 'Authorized testing of system vulnerabilities', 'Testing user interface', 'Testing database performance'],
      correctAnswer: 1,
      category: 'Cybersecurity',
      difficulty: 'advanced' as const
    },
    {
      id: 'cyber-8',
      text: "What is a zero-day vulnerability?",
      type: 'multiple-choice' as const,
      options: ['A vulnerability with no fix available', 'A vulnerability discovered on day zero', 'A vulnerability that takes zero time to exploit', 'A vulnerability that costs zero dollars'],
      correctAnswer: 0,
      category: 'Cybersecurity',
      difficulty: 'advanced' as const
    }
  ],
  'Cloud Computing': [
    {
      id: 'cloud-1',
      text: "What is cloud computing?",
      type: 'multiple-choice' as const,
      options: ['Computing in the sky', 'Delivery of computing services over the internet', 'A programming language', 'A database system'],
      correctAnswer: 1,
      category: 'Cloud Computing',
      difficulty: 'beginner' as const
    },
    {
      id: 'cloud-2',
      text: "Which company provides AWS?",
      type: 'multiple-choice' as const,
      options: ['Google', 'Microsoft', 'Amazon', 'IBM'],
      correctAnswer: 2,
      category: 'Cloud Computing',
      difficulty: 'beginner' as const
    },
    {
      id: 'cloud-3',
      text: "What does IaaS stand for?",
      type: 'multiple-choice' as const,
      options: ['Internet as a Service', 'Infrastructure as a Service', 'Integration as a Service', 'Information as a Service'],
      correctAnswer: 1,
      category: 'Cloud Computing',
      difficulty: 'beginner' as const
    },
    {
      id: 'cloud-4',
      text: "Which of the following is a cloud service model?",
      type: 'multiple-choice' as const,
      options: ['SaaS', 'PaaS', 'IaaS', 'All of the above'],
      correctAnswer: 3,
      category: 'Cloud Computing',
      difficulty: 'intermediate' as const
    },
    {
      id: 'cloud-5',
      text: "What is Docker?",
      type: 'multiple-choice' as const,
      options: ['A database', 'A containerization platform', 'A programming language', 'A cloud provider'],
      correctAnswer: 1,
      category: 'Cloud Computing',
      difficulty: 'intermediate' as const
    },
    {
      id: 'cloud-6',
      text: "What is Kubernetes?",
      type: 'multiple-choice' as const,
      options: ['A programming language', 'Container orchestration platform', 'A database', 'A web framework'],
      correctAnswer: 1,
      category: 'Cloud Computing',
      difficulty: 'advanced' as const
    },
    {
      id: 'cloud-7',
      text: "What is serverless computing?",
      type: 'multiple-choice' as const,
      options: ['Computing without servers', 'Computing where server management is abstracted', 'A type of database', 'A programming paradigm'],
      correctAnswer: 1,
      category: 'Cloud Computing',
      difficulty: 'advanced' as const
    },
    {
      id: 'cloud-8',
      text: "What is the benefit of auto-scaling?",
      type: 'multiple-choice' as const,
      options: ['Automatic adjustment of resources based on demand', 'Automatic code deployment', 'Automatic testing', 'Automatic documentation'],
      correctAnswer: 0,
      category: 'Cloud Computing',
      difficulty: 'intermediate' as const
    }
  ]
};

// Initial assessment questions
export const initialQuestions = [
  {
    id: '1',
    text: "Hi! I'm your AI Course Mentor. Let's start by understanding your background. What's your current experience level with programming?",
    type: 'multiple-choice' as const,
    options: ['Complete beginner', 'Some basic knowledge', 'Intermediate', 'Advanced']
  },
  {
    id: '2', 
    text: "What area of technology interests you most?",
    type: 'multiple-choice' as const,
    options: ['Web Development', 'Mobile Development', 'Data Science', 'AI/Machine Learning', 'Cybersecurity', 'Cloud Computing']
  }
];

// --- Large pool generator (extends each category up to 1000 items) ---
const categoryTopics: Record<string, string[]> = {
  'Web Development': ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Accessibility', 'SEO', 'Performance', 'PWAs', 'Webpack', 'Vite'],
  'Mobile Development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xcode', 'Android Studio', 'Jetpack Compose', 'Navigation', 'State management', 'Offline storage'],
  'Data Science': ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Feature engineering', 'Cross-validation', 'Time series', 'Statistics', 'Data cleaning'],
  'AI/Machine Learning': ['Neural networks', 'CNN', 'RNN', 'Transformers', 'Activation functions', 'Backpropagation', 'Regularization', 'Optimization', 'Transfer learning'],
  'Cybersecurity': ['OWASP', 'XSS', 'CSRF', 'SQL injection', 'Encryption', 'VPN', 'IDS/IPS', 'Firewalls', 'Zero trust', 'Pen testing'],
  'Cloud Computing': ['AWS', 'Azure', 'GCP', 'EC2', 'S3', 'Lambda', 'Kubernetes', 'Docker', 'Auto-scaling', 'IaC']
};

const questionFormats = [
  'Which of the following best describes {topic}?',
  'What is the primary purpose of {topic}?',
  'In {topic}, which option is MOST correct?',
  'When working with {topic}, what should you do first?',
  'For {topic}, which approach is recommended?',
  'What commonly causes issues in {topic}?',
  'How do you optimize {topic} in production?',
  'Which tool is typically used with {topic}?'
];

const optionSets = [
  ['It depends on the scenario', 'A fixed rule applies', 'Always avoid it', 'Only use in tests'],
  ['Initialization', 'Validation', 'Deployment', 'Monitoring'],
  ['Performance', 'Security', 'Maintainability', 'All of the above'],
  ['Build from scratch', 'Use a framework', 'Skip validation', 'Use global state'],
  ['Static typing', 'Dynamic typing', 'No typing', 'Runtime-only checks']
];

const difficulties: Array<Question['difficulty']> = ['beginner', 'intermediate', 'advanced'];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generatePool(category: string, count: number): Question[] {
  const topics = categoryTopics[category] || ['General'];
  const timestamp = Date.now();
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const format = questionFormats[i % questionFormats.length];
    const opts = optionSets[i % optionSets.length];
    const difficulty = difficulties[i % difficulties.length];
    const correctAnswer = i % opts.length;
    questions.push({
      id: `gen-${category.toLowerCase().replace(/\s+/g, '-')}-${difficulty}-${timestamp}-${i}`,
      text: format.replace('{topic}', topic),
      type: 'multiple-choice',
      options: opts,
      correctAnswer,
      category,
      difficulty
    });
  }
  return questions;
}

function ensureAtLeast(base: Question[], category: string, min: number): Question[] {
  if (base.length >= min) return base;
  const needed = min - base.length;
  const extras = generatePool(category, needed);
  return [...base, ...extras];
}

// Import external JSON seeds per category (optional; merged when available)
// Vite/TS supports JSON imports; if not, we can switch to dynamic fetch.
import webDevSeeds from './pools/web-development.json';
import mobileSeeds from './pools/mobile-development.json';
import dataScienceSeeds from './pools/data-science.json';
import aiMlSeeds from './pools/ai-ml.json';
import cyberSeeds from './pools/cybersecurity.json';
import cloudSeeds from './pools/cloud-computing.json';

const mergedPools: typeof questionPools = {
  'Web Development': [...questionPools['Web Development'], ...webDevSeeds as unknown as Question[]],
  'Mobile Development': [...questionPools['Mobile Development'], ...mobileSeeds as unknown as Question[]],
  'Data Science': [...questionPools['Data Science'], ...dataScienceSeeds as unknown as Question[]],
  'AI/Machine Learning': [...questionPools['AI/Machine Learning'], ...aiMlSeeds as unknown as Question[]],
  'Cybersecurity': [...questionPools['Cybersecurity'], ...cyberSeeds as unknown as Question[]],
  'Cloud Computing': [...questionPools['Cloud Computing'], ...cloudSeeds as unknown as Question[]]
};

const expandedQuestionPools: typeof questionPools = {
  'Web Development': ensureAtLeast(mergedPools['Web Development'], 'Web Development', 1000),
  'Mobile Development': ensureAtLeast(mergedPools['Mobile Development'], 'Mobile Development', 1000),
  'Data Science': ensureAtLeast(mergedPools['Data Science'], 'Data Science', 1000),
  'AI/Machine Learning': ensureAtLeast(mergedPools['AI/Machine Learning'], 'AI/Machine Learning', 1000),
  'Cybersecurity': ensureAtLeast(mergedPools['Cybersecurity'], 'Cybersecurity', 1000),
  'Cloud Computing': ensureAtLeast(mergedPools['Cloud Computing'], 'Cloud Computing', 1000)
};

// Function to get random questions for a specific category
export const getRandomQuestions = async (category: string, count: number = 5) => {
  const pool = expandedQuestionPools[category as keyof typeof expandedQuestionPools] || [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    provider: 'TechAcademy',
    difficulty: 'Beginner' as const,
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them to the web.',
    duration: '12 weeks',
    rating: 4.8,
    category: 'Web Development',
    link: 'https://example.com/web-dev',
    price: '$299'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    provider: 'DataLearn',
    difficulty: 'Intermediate' as const,
    description: 'Master Python programming for data analysis, visualization, and machine learning. Work with pandas, numpy, and scikit-learn.',
    duration: '8 weeks',
    rating: 4.9,
    category: 'Data Science',
    link: 'https://example.com/python-data',
    price: '$199'
  },
  {
    id: '3',
    title: 'React Native Mobile Development',
    provider: 'MobilePro',
    difficulty: 'Intermediate' as const,
    description: 'Build cross-platform mobile apps with React Native. Learn navigation, state management, and app deployment.',
    duration: '10 weeks',
    rating: 4.7,
    category: 'Mobile Development',
    link: 'https://example.com/react-native',
    price: '$249'
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    provider: 'AI Institute',
    difficulty: 'Advanced' as const,
    description: 'Deep dive into machine learning algorithms, neural networks, and AI applications. Hands-on projects with TensorFlow.',
    duration: '16 weeks',
    rating: 4.9,
    category: 'AI/Machine Learning',
    link: 'https://example.com/ml-fundamentals',
    price: '$399'
  },
  {
    id: '5',
    title: 'Introduction to Programming',
    provider: 'CodeStart',
    difficulty: 'Beginner' as const,
    description: 'Perfect first programming course. Learn basic concepts through interactive exercises and simple projects.',
    duration: '6 weeks',
    rating: 4.6,
    category: 'Programming',
    link: 'https://example.com/intro-programming',
    price: 'Free'
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS',
    provider: 'CloudMasters',
    difficulty: 'Intermediate' as const,
    description: 'Learn AWS services, cloud architecture, and deployment strategies. Prepare for AWS certification.',
    duration: '12 weeks',
    rating: 4.8,
    category: 'Cloud Computing',
    link: 'https://example.com/aws-cloud',
    price: '$299'
  }
];

export const mockRoadmap = [
  {
    id: '1',
    title: 'Foundation Building',
    description: 'Start with programming fundamentals and basic web technologies. Learn HTML, CSS, and JavaScript basics.',
    duration: '2-3 weeks',
    status: 'completed' as const,
    skills: ['HTML', 'CSS', 'JavaScript Basics', 'Git'],
    week: 1
  },
  {
    id: '2',
    title: 'JavaScript Deep Dive',
    description: 'Master JavaScript concepts including ES6+, async programming, and DOM manipulation.',
    duration: '3-4 weeks',
    status: 'current' as const,
    skills: ['ES6+', 'Async/Await', 'DOM APIs', 'Event Handling'],
    week: 2
  },
  {
    id: '3',
    title: 'React Development',
    description: 'Learn React fundamentals, component architecture, hooks, and state management.',
    duration: '4-5 weeks',
    status: 'upcoming' as const,
    skills: ['React Components', 'Hooks', 'State Management', 'React Router'],
    week: 3
  },
  {
    id: '4',
    title: 'Backend Development',
    description: 'Build APIs with Node.js and Express. Learn database design and integration.',
    duration: '4-5 weeks',
    status: 'upcoming' as const,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    week: 4
  },
  {
    id: '5',
    title: 'Full Stack Project',
    description: 'Combine frontend and backend skills to build a complete web application.',
    duration: '3-4 weeks',
    status: 'upcoming' as const,
    skills: ['Full Stack Integration', 'Deployment', 'Testing', 'DevOps'],
    week: 5
  }
];