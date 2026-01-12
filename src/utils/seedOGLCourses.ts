import { OGLCourseService } from '@/services/oglCourseService';
import { OGLCourse } from '@/types/oglCourse';

// OGL Course data to be seeded into Firebase
const oglCoursesData: Omit<OGLCourse, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'OGL Tester Course',
    description: 'Comprehensive testing course covering manual and automated testing methodologies for OGL platforms.',
    longDescription: 'Master comprehensive testing methodologies for Oracle Global Learning platforms with real-world skills.',
    category: 'OGL Tester',
    level: 'Beginner',
    durationHours: 40,
    studentsCount: 200,
    completionRate: 90,
    icon: 'TestTube',
    path: '/ogl-courses/ogl-tester',
    modules: [
      {
        title: 'Introduction to OGL Testing',
        duration: '2 hours',
        description: 'Understanding Oracle Global Learning platforms and testing fundamentals',
        topics: ['OGL Platform Overview', 'Testing Types', 'Software Quality Assurance']
      },
      {
        title: 'Manual Testing Techniques',
        duration: '4 hours',
        description: 'Comprehensive manual testing methodologies and best practices',
        topics: ['Black Box Testing', 'White Box Testing', 'Exploratory Testing', 'Test Case Design']
      },
      {
        title: 'Automation Testing Fundamentals',
        duration: '6 hours',
        description: 'Introduction to automated testing frameworks and tools',
        topics: ['Selenium WebDriver', 'Test Automation Frameworks', 'Page Object Model', 'Cucumber BDD']
      },
      {
        title: 'Database Testing',
        duration: '3 hours',
        description: 'Testing database operations and data integrity',
        topics: ['SQL Queries for Testing', 'Database Validation', 'Data Migration Testing']
      },
      {
        title: 'Performance Testing',
        duration: '4 hours',
        description: 'Load, stress and performance testing techniques',
        topics: ['Load Testing', 'Stress Testing', 'Performance Metrics', 'JMeter Introduction']
      },
      {
        title: 'Security Testing',
        duration: '3 hours',
        description: 'Basic security testing concepts and practices',
        topics: ['OWASP Top 10', 'Authentication Testing', 'Authorization Testing', 'Security Best Practices']
      },
      {
        title: 'Mobile Testing',
        duration: '3 hours',
        description: 'Testing mobile applications and responsive web applications',
        topics: ['Mobile App Testing', 'Responsive Design Testing', 'Device Compatibility']
      },
      {
        title: 'Test Management and Reporting',
        duration: '3 hours',
        description: 'Test management tools, defect tracking, and reporting techniques',
        topics: ['TestRail', 'JIRA Integration', 'Bug Tracking', 'Test Reports', 'Metrics and KPIs']
      }
    ],
    features: [
      {
        title: 'Hands-on OGL Platform Testing Experience',
        description: 'Get practical experience testing real OGL platforms'
      },
      {
        title: 'Real-world Projects and Case Studies',
        description: 'Work on industry-relevant testing scenarios'
      },
      {
        title: 'Industry-standard Testing Tools',
        description: 'Learn Selenium, JMeter, TestRail, and more'
      },
      {
        title: 'Certification Preparation',
        description: 'Prepare for professional testing certifications'
      }
    ],
    prerequisites: [
      'Basic knowledge of software development concepts',
      'Understanding of web technologies (HTML, CSS, JavaScript)',
      'Familiarity with databases and SQL',
      'No prior testing experience required'
    ],
    skillsLearned: [
      'Manual and Automated Testing Techniques',
      'OGL Platform-Specific Testing',
      'Quality Assurance Best Practices',
      'Defect Management and Reporting',
      'Performance and Security Testing',
      'Mobile Application Testing',
      'Test Automation Frameworks',
      'Database Testing and Validation',
      'Industry-standard Testing Tools',
      'Real-World Project Experience'
    ]
  },
  {
    title: 'Oracle HCM Course',
    description: 'Comprehensive HCM solutions covering HR, payroll, and talent management in Oracle SaaS.',
    longDescription: 'Master Oracle HCM Cloud solutions for comprehensive workforce management, performance, and talent.',
    category: 'Oracle SaaS',
    level: 'Intermediate',
    durationHours: 55,
    studentsCount: 400,
    completionRate: 85,
    icon: 'Users',
    path: '/ogl-courses/hcm',
    modules: [
      {
        title: 'HCM System Overview',
        duration: '3 hours',
        description: 'Understanding Oracle HCM Cloud architecture and core concepts',
        topics: ['HCM Cloud Architecture', 'Navigation and User Experience', 'Data Security', 'Compliance']
      },
      {
        title: 'Workforce Structures',
        duration: '4 hours',
        description: 'Managing organizational structures, positions, and employment models',
        topics: ['Organization Management', 'Job Structures', 'Position Management', 'Enterprise Structures']
      },
      {
        title: 'Hiring and Onboarding',
        duration: '6 hours',
        description: 'Recruitment processes and employee onboarding workflows',
        topics: ['Candidate Pools', 'Job Applications', 'Background Checks', 'New Hire Onboarding', 'Document Management']
      },
      {
        title: 'Compensation Management',
        duration: '5 hours',
        description: 'Managing payroll, salaries, benefits, and employee compensation',
        topics: ['Payroll Processing', 'Salary Administration', 'Benefits Management', 'Incentive Plans']
      },
      {
        title: 'Performance Management',
        duration: '4 hours',
        description: 'Managing employee performance, appraisals, and career development',
        topics: ['Performance Appraisals', '360-Degree Feedback', 'Career Planning', 'Learning Management']
      },
      {
        title: 'Talent Management',
        duration: '5 hours',
        description: 'Talent acquisition, retention, and succession planning',
        topics: ['Talent Acquisition', 'Employee Retention', 'Succession Planning', 'Career Development']
      },
      {
        title: 'Analytics and Reporting',
        duration: '4 hours',
        description: 'HCM data analytics, dashboards, and compliance reporting',
        topics: ['HCM Analytics', 'Custom Dashboards', 'Compliance Reporting', 'Regulatory Requirements']
      },
      {
        title: 'System Administration',
        duration: '3 hours',
        description: 'HCM system configuration, maintenance, and troubleshooting',
        topics: ['System Configuration', 'Security Setup', 'Data Migration', 'System Administration']
      }
    ],
    features: [
      {
        title: 'Hands-on Oracle HCM Cloud Experience',
        description: 'Practical experience with Oracle HCM platform'
      },
      {
        title: 'Real-world HR Scenarios and Case Studies',
        description: 'Learn through industry-relevant case studies'
      },
      {
        title: 'Implementation Best Practices',
        description: 'Industry-standard implementation approaches'
      },
      {
        title: 'Certification Preparation',
        description: 'Prepare for Oracle HCM certifications'
      }
    ],
    prerequisites: [
      'Basic understanding of HR concepts',
      'Familiarity with enterprise applications',
      'Understanding of business processes',
      'No prior Oracle experience required'
    ],
    skillsLearned: [
      'Oracle HCM Cloud Implementation',
      'Workforce Management Solutions',
      'Talent Acquisition & Onboarding',
      'Compensation & Benefits Management',
      'Performance & Career Development',
      'Analytics & Reporting',
      'Compliance & Regulatory Requirements',
      'System Configuration & Security',
      'HR Best Practices & Processes',
      'Real-World Implementation Scenarios'
    ]
  },
  {
    title: 'OGL Content Developer Course',
    description: 'Learn to create and manage content for Oracle Global Learning Platforms.',
    longDescription: 'Master content creation and management for Oracle Global Learning Platforms.',
    category: 'Content Management',
    level: 'Intermediate',
    durationHours: 35,
    studentsCount: 150,
    completionRate: 88,
    icon: 'PenTool',
    path: '/ogl-courses/content-developer',
    modules: [
      {
        title: 'Content Creation Tools and Techniques',
        duration: '4 hours',
        description: 'Learn various tools and techniques for content creation',
        topics: ['Content Authoring Tools', 'Multimedia Production', 'Interactive Content', 'Design Principles']
      },
      {
        title: 'OGL Content Management System',
        duration: '5 hours',
        description: 'Understanding OGL content management platforms and workflows',
        topics: ['CMS Architecture', 'Content Workflows', 'Version Control', 'Content Publishing']
      },
      {
        title: 'Multimedia Content Development',
        duration: '4 hours',
        description: 'Creating engaging multimedia content for learning',
        topics: ['Video Production', 'Audio Recording', 'Graphics Design', 'Animation']
      },
      {
        title: 'Learning Object Design',
        duration: '3 hours',
        description: 'Designing effective learning objects and modules',
        topics: ['SCORM Standards', 'Learning Objectives', 'Assessment Design', 'Content Structure']
      },
      {
        title: 'Accessibility and Compliance',
        duration: '4 hours',
        description: 'Ensuring content accessibility and regulatory compliance',
        topics: ['WCAG Standards', 'ADA Compliance', '508 Compliance', 'Universal Design']
      },
      {
        title: 'Content Publishing and Distribution',
        duration: '3 hours',
        description: 'Publishing content and managing distribution channels',
        topics: ['Publishing Workflows', 'Distribution Channels', 'Analytics and Reporting', 'Content Updates']
      }
    ],
    features: [
      {
        title: 'Professional Content Creation Suite',
        description: 'Access to industry-standard content creation tools'
      },
      {
        title: 'OGL Platform Certification',
        description: 'Get certified in OGL content management'
      },
      {
        title: 'Portfolio Development',
        description: 'Build a professional content portfolio'
      },
      {
        title: 'Industry Networking',
        description: 'Connect with content professionals'
      }
    ],
    prerequisites: [
      'Basic computer skills',
      'Understanding of learning concepts',
      'Familiarity with multimedia tools',
      'Creative mindset'
    ],
    skillsLearned: [
      'Content creation and management for OGL platforms',
      'Design engaging learning experiences',
      'Multimedia content development techniques',
      'Accessibility standards and compliance',
      'Content publishing and distribution workflows',
      'Quality assurance for educational content'
    ]
  },
  {
    title: 'QA Tester Courses',
    description: 'Advanced QA testing techniques including automation frameworks and quality assurance processes.',
    longDescription: 'Master advanced quality assurance techniques and automated testing frameworks.',
    category: 'Quality Assurance',
    level: 'Intermediate',
    durationHours: 45,
    studentsCount: 300,
    completionRate: 87,
    icon: 'QrCode',
    path: '/ogl-courses/qa-tester',
    modules: [
      {
        title: 'Advanced Testing Methodologies',
        duration: '4 hours',
        description: 'Deep dive into advanced testing techniques and strategies',
        topics: ['Risk-based Testing', 'Model-based Testing', 'Context-driven Testing', 'Test Design Techniques']
      },
      {
        title: 'Automation Frameworks',
        duration: '6 hours',
        description: 'Building and maintaining test automation frameworks',
        topics: ['Framework Design', 'TestNG/JUnit', 'Data-driven Testing', 'Keyword-driven Testing']
      },
      {
        title: 'Quality Assurance Processes',
        duration: '5 hours',
        description: 'Understanding QA processes and quality management',
        topics: ['QA Methodologies', 'Quality Standards', 'Process Improvement', 'Quality Metrics']
      },
      {
        title: 'Test Management Tools',
        duration: '4 hours',
        description: 'Using professional test management and tracking tools',
        topics: ['TestRail', 'Zephyr', 'HP ALM', 'Test Case Management', 'Requirements Traceability']
      },
      {
        title: 'Performance and Load Testing',
        duration: '5 hours',
        description: 'Advanced performance testing techniques and tools',
        topics: ['LoadRunner', 'Jenkins Integration', 'Performance Monitoring', 'Scalability Testing']
      },
      {
        title: 'Security Testing Fundamentals',
        duration: '3 hours',
        description: 'Introduction to application security testing',
        topics: ['Security Testing Types', 'Vulnerability Assessment', 'Penetration Testing', 'Compliance Testing']
      }
    ],
    features: [
      {
        title: 'Industry-standard Tools Training',
        description: 'Get hands-on experience with professional QA tools'
      },
      {
        title: 'Automation Framework Development',
        description: 'Learn to build scalable test automation frameworks'
      },
      {
        title: 'ISTQB Certification Preparation',
        description: 'Prepare for international testing certifications'
      },
      {
        title: 'Real Project Experience',
        description: 'Work on enterprise-level testing projects'
      }
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of software development lifecycle',
      'Knowledge of manual testing concepts',
      'Familiarity with databases'
    ],
    skillsLearned: [
      'Manual and automated testing techniques',
      'Quality assurance best practices',
      'Test automation frameworks (Selenium, Cypress)',
      'API testing and integration testing',
      'Performance and security testing',
      'Defect management and reporting'
    ]
  },
  {
    title: 'Fusion Developer Course',
    description: 'Develop skills in Oracle Fusion Cloud applications development and customization.',
    longDescription: 'Master Oracle Fusion Cloud application development and customization techniques.',
    category: 'Fusion Cloud',
    level: 'Advanced',
    durationHours: 60,
    studentsCount: 180,
    completionRate: 82,
    icon: 'Zap',
    path: '/ogl-courses/fusion-developer',
    modules: [
      {
        title: 'Fusion Cloud Architecture',
        duration: '5 hours',
        description: 'Understanding Oracle Fusion Cloud architectural patterns',
        topics: ['Application Architecture', 'Multi-tenancy', 'Security Models', 'Integration Patterns']
      },
      {
        title: 'Application Development',
        duration: '8 hours',
        description: 'Building custom applications in Fusion Cloud',
        topics: ['Visual Builder', 'Application Composer', 'Custom Objects', 'Business Rules']
      },
      {
        title: 'Custom Extensions',
        duration: '6 hours',
        description: 'Creating custom extensions and integrations',
        topics: ['Groovy Scripts', 'Java Extensions', 'Web Services', 'REST APIs']
      },
      {
        title: 'Integration Services',
        duration: '7 hours',
        description: 'Integrating Fusion Cloud with external systems',
        topics: ['Integration Cloud Service', 'SOAP/Web Services', 'File-based Integration', 'Real-time Integration']
      },
      {
        title: 'Security and Compliance',
        duration: '5 hours',
        description: 'Implementing security and compliance in Fusion applications',
        topics: ['Role-based Security', 'Data Encryption', 'Audit Trails', 'GDPR Compliance']
      },
      {
        title: 'Deployment and Maintenance',
        duration: '4 hours',
        description: 'Application deployment and ongoing maintenance',
        topics: ['Deployment Pipelines', 'Version Control', 'Testing Strategies', 'Monitoring and Maintenance']
      }
    ],
    features: [
      {
        title: 'Fusion Cloud Sandbox Environment',
        description: 'Access to dedicated development environments'
      },
      {
        title: 'Real Fusion Implementation Projects',
        description: 'Work on actual Fusion Cloud implementations'
      },
      {
        title: 'Oracle Certification Preparation',
        description: 'Prepare for Oracle Fusion certifications'
      },
      {
        title: 'Expert Mentorship',
        description: 'Learn from Oracle Fusion experts'
      }
    ],
    prerequisites: [
      'Strong programming background',
      'Understanding of enterprise applications',
      'Knowledge of JavaScript and SQL',
      'Experience with web services',
      'Familiarity with Oracle databases'
    ],
    skillsLearned: [
      'Oracle Fusion Cloud architecture and principles',
      'Application development and customization',
      'Groovy scripting and business rules',
      'REST API integration and web services',
      'Security policies and compliance',
      'Deployment strategies and best practices'
    ]
  },
  {
    title: 'Redwood Page Developer Course',
    description: 'Master Oracle Redwood UI development for building modern, intuitive user interfaces.',
    longDescription: 'Become proficient in Oracle Redwood UI development for modern enterprise applications.',
    category: 'Redwood',
    level: 'Intermediate',
    durationHours: 50,
    studentsCount: 120,
    completionRate: 89,
    icon: 'MonitorSpeaker',
    path: '/ogl-courses/redwood-developer',
    modules: [
      {
        title: 'Redwood UI Components',
        duration: '6 hours',
        description: 'Understanding and using Redwood UI component library',
        topics: ['Component Library', 'Design System', 'Component Patterns', 'Accessibility Features']
      },
      {
        title: 'Page Layout and Design',
        duration: '5 hours',
        description: 'Creating effective page layouts and user experiences',
        topics: ['Layout Patterns', 'Responsive Design', 'Navigation Design', 'Page Templates']
      },
      {
        title: 'Responsive Design Principles',
        duration: '4 hours',
        description: 'Building responsive applications for all devices',
        topics: ['Mobile-first Design', 'Responsive Breakpoints', 'Adaptive Layouts', 'Device Testing']
      },
      {
        title: 'Interactive Elements',
        duration: '6 hours',
        description: 'Implementing interactive components and behaviors',
        topics: ['Event Handling', 'State Management', 'Animation Systems', 'User Interactions']
      },
      {
        title: 'Accessibility Standards',
        duration: '4 hours',
        description: 'Ensuring accessibility compliance in Redwood applications',
        topics: ['WCAG Guidelines', 'Screen Reader Support', 'Keyboard Navigation', 'Color Contrast']
      },
      {
        title: 'Performance Optimization',
        duration: '4 hours',
        description: 'Optimizing Redwood applications for performance',
        topics: ['Performance Monitoring', 'Bundle Optimization', 'Lazy Loading', 'Caching Strategies']
      }
    ],
    features: [
      {
        title: 'Redwood Development Environment',
        description: 'Access to Redwood development tools and environments'
      },
      {
        title: 'Modern UI/UX Best Practices',
        description: 'Learn industry-leading design patterns'
      },
      {
        title: 'Oracle UX Certification',
        description: 'Prepare for Oracle UX certifications'
      },
      {
        title: 'Portfolio Projects',
        description: 'Build impressive Redwood UI portfolios'
      }
    ],
    prerequisites: [
      'HTML, CSS, and JavaScript knowledge',
      'Understanding of UI/UX principles',
      'Experience with modern frameworks',
      'Basic knowledge of Oracle applications'
    ],
    skillsLearned: [
      'Oracle Redwood design system and components',
      'Modern UI/UX principles and best practices',
      'Responsive web design for enterprise applications',
      'Accessibility compliance (WCAG 2.1)',
      'Performance optimization techniques',
      'Custom component development'
    ]
  },
  {
    title: 'Supply Chain Management (SCM) Course',
    description: 'Learn Oracle SCM fundamentals including procurement, inventory, and logistics.',
    longDescription: 'Master Oracle Supply Chain Management fundamentals and implementation.',
    category: 'Oracle SaaS',
    level: 'Intermediate',
    durationHours: 48,
    studentsCount: 250,
    completionRate: 87,
    icon: 'Database',
    path: '/ogl-courses/scm',
    modules: [
      {
        title: 'Procurement and Sourcing',
        duration: '6 hours',
        description: 'Master procurement processes and vendor management',
        topics: ['Supplier Management', 'Purchase Orders', 'Contract Management', 'Spend Analysis']
      },
      {
        title: 'Inventory Management',
        duration: '8 hours',
        description: 'Implementing effective inventory control systems',
        topics: ['Inventory Planning', 'Stock Management', 'ABC Analysis', 'Safety Stock Calculation']
      },
      {
        title: 'Logistics and Transportation',
        duration: '7 hours',
        description: 'Managing logistics and transportation operations',
        topics: ['Transportation Management', 'Route Optimization', 'Carrier Selection', 'Freight Management']
      },
      {
        title: 'Warehousing',
        duration: '6 hours',
        description: 'Optimizing warehouse operations and processes',
        topics: ['Warehouse Layout', 'Picking Strategies', 'Slotting Optimization', 'WMS Integration']
      },
      {
        title: 'Supply Chain Analytics',
        duration: '5 hours',
        description: 'Using analytics for supply chain optimization',
        topics: ['Demand Forecasting', 'Supply Chain KPIs', 'Analytics Dashboards', 'Performance Monitoring']
      },
      {
        title: 'Integration with ERP',
        duration: '4 hours',
        description: 'Connecting SCM with enterprise systems',
        topics: ['ERP Integration', 'Data Synchronization', 'API Management', 'System Interoperability']
      }
    ],
    features: [
      {
        title: 'Oracle SCM Cloud Access',
        description: 'Hands-on experience with Oracle SCM platform'
      },
      {
        title: 'Supply Chain Simulation Lab',
        description: 'Practice in simulated supply chain environments'
      },
      {
        title: 'Industry Case Studies',
        description: 'Learn from real-world supply chain implementations'
      },
      {
        title: 'Certification Support',
        description: 'Prepare for Oracle SCM certifications'
      }
    ],
    prerequisites: [
      'Understanding of business operations',
      'Basic knowledge of supply chain concepts',
      'Familiarity with enterprise software',
      'Analytical mindset'
    ],
    skillsLearned: [
      'End-to-end supply chain management',
      'Procurement process automation',
      'Inventory optimization techniques',
      'Logistics and transportation management',
      'Supplier relationship management',
      'SC analytics and reporting'
    ]
  },
  {
    title: 'Customer Experience (CX) Course',
    description: 'Master customer experience platforms including sales, service, and marketing clouds.',
    longDescription: 'Comprehensive training in Oracle Customer Experience cloud solutions.',
    category: 'Oracle SaaS',
    level: 'Intermediate',
    durationHours: 42,
    studentsCount: 320,
    completionRate: 86,
    icon: 'Cloud',
    path: '/ogl-courses/cx',
    modules: [
      {
        title: 'Sales Cloud Management',
        duration: '7 hours',
        description: 'Master sales processes and customer relationship management',
        topics: ['Lead Management', 'Opportunity Tracking', 'Sales Forecasting', 'Customer Segmentation']
      },
      {
        title: 'Service Cloud Operations',
        duration: '6 hours',
        description: 'Managing customer service and support operations',
        topics: ['Case Management', 'Service Level Agreements', 'Knowledge Base', 'Self-service Portals']
      },
      {
        title: 'Marketing Cloud Campaigns',
        duration: '5 hours',
        description: 'Creating effective marketing campaigns and strategies',
        topics: ['Campaign Planning', 'Email Marketing', 'Lead Generation', 'Marketing Analytics']
      },
      {
        title: 'Customer Analytics',
        duration: '4 hours',
        description: 'Analyzing customer behavior and preferences',
        topics: ['Customer Profiling', 'Behavioral Analytics', 'Churn Prediction', 'Customer Lifetime Value']
      },
      {
        title: 'Omnichannel Support',
        duration: '6 hours',
        description: 'Delivering consistent customer experiences across channels',
        topics: ['Multi-channel Integration', 'Customer Journey Mapping', 'Unified Customer View', 'Channel Optimization']
      },
      {
        title: 'Customer Success Management',
        duration: '4 hours',
        description: 'Ensuring long-term customer success and retention',
        topics: ['Success Planning', 'Health Scoring', 'Expansion Opportunities', 'Renewal Management']
      }
    ],
    features: [
      {
        title: 'Oracle CX Cloud Suite',
        description: 'Access to complete CX cloud solutions'
      },
      {
        title: 'Customer Journey Simulations',
        description: 'Practice with real customer scenarios'
      },
      {
        title: 'CRM Best Practices',
        description: 'Learn industry-leading CRM methodologies'
      },
      {
        title: 'Customer Success Framework',
        description: 'Build customer-centric business models'
      }
    ],
    prerequisites: [
      'Understanding of customer service concepts',
      'Basic knowledge of sales processes',
      'Familiarity with CRM systems',
      'Customer-focused mindset'
    ],
    skillsLearned: [
      'Sales force automation and CRM',
      'Customer service platform management',
      'Marketing automation and campaigns',
      'Customer data analytics and insights',
      'Omnichannel customer engagement',
      'Customer success and retention strategies'
    ]
  },
  {
    title: 'Enterprise Performance Management (EPM) Course',
    description: 'Advanced EPM concepts including financial planning, budgeting, and reporting.',
    longDescription: 'Master Enterprise Performance Management with Oracle EPM solutions.',
    category: 'Oracle SaaS',
    level: 'Advanced',
    durationHours: 50,
    studentsCount: 220,
    completionRate: 83,
    icon: 'Calculator',
    path: '/ogl-courses/epm',
    modules: [
      {
        title: 'Financial Planning',
        duration: '6 hours',
        description: 'Strategic financial planning and forecasting',
        topics: ['Planning Models', 'Scenario Planning', 'Cash Flow Projections', 'Financial Modeling']
      },
      {
        title: 'Budgeting and Forecasting',
        duration: '7 hours',
        description: 'Effective budgeting processes and forecasting techniques',
        topics: ['Budget Formulation', 'Rolling Forecasts', 'Driver-based Planning', 'Budget Controls']
      },
      {
        title: 'Financial Reporting',
        duration: '5 hours',
        description: 'Creating comprehensive financial reports and disclosures',
        topics: ['Management Reporting', 'Regulatory Reporting', 'Financial Statements', 'Consolidated Reporting']
      },
      {
        title: 'Profitability Analysis',
        duration: '6 hours',
        description: 'Analyzing profitability by product, customer, and segment',
        topics: ['Profitability Modeling', 'Cost Allocation', 'Margin Analysis', 'Performance Attribution']
      },
      {
        title: 'Risk Management',
        duration: '5 hours',
        description: 'Managing financial and operational risks',
        topics: ['Risk Assessment', 'Stress Testing', 'Risk Mitigation', 'Compliance Frameworks']
      },
      {
        title: 'EPM Analytics',
        duration: '4 hours',
        description: 'Using analytics for performance insights',
        topics: ['Key Performance Indicators', 'Trend Analysis', 'Predictive Analytics', 'Dashboard Design']
      }
    ],
    features: [
      {
        title: 'Oracle EPM Cloud Environment',
        description: 'Hands-on access to EPM Cloud platforms'
      },
      {
        title: 'Financial Modeling Labs',
        description: 'Practice with complex financial scenarios'
      },
      {
        title: 'Industry Benchmarking',
        description: 'Compare performance against industry standards'
      },
      {
        title: 'Expert-led Workshops',
        description: 'Learn from EPM industry experts'
      }
    ],
    prerequisites: [
      'Strong financial background',
      'Understanding of accounting principles',
      'Experience with Excel modeling',
      'Analytical and problem-solving skills'
    ],
    skillsLearned: [
      'Corporate financial planning and analysis',
      'Budget creation and monitoring',
      'Advanced financial reporting',
      'Profit center analysis',
      'Enterprise risk assessment',
      'Performance dashboards and KPIs'
    ]
  },
  {
    title: 'Enterprise Resource Planning (ERP) Course',
    description: 'Complete ERP solutions covering financials, procurement, and project management.',
    longDescription: 'Comprehensive training in Enterprise Resource Planning with Oracle ERP Cloud.',
    category: 'Oracle SaaS',
    level: 'Advanced',
    durationHours: 65,
    studentsCount: 280,
    completionRate: 81,
    icon: 'BookOpen',
    path: '/ogl-courses/erp',
    modules: [
      {
        title: 'Financial Management',
        duration: '8 hours',
        description: 'Complete financial management and accounting processes',
        topics: ['General Ledger', 'Accounts Payable/Receivable', 'Fixed Assets', 'Cash Management']
      },
      {
        title: 'Procurement and Sourcing',
        duration: '6 hours',
        description: 'Managing procurement processes and vendor relationships',
        topics: ['Purchase Requisitions', 'Purchase Orders', 'Supplier Management', 'Procurement Analytics']
      },
      {
        title: 'Project Management',
        duration: '7 hours',
        description: 'Project planning, execution, and monitoring',
        topics: ['Project Setup', 'Resource Management', 'Project Controls', 'Project Reporting']
      },
      {
        title: 'Inventory Control',
        duration: '5 hours',
        description: 'Managing inventory across the enterprise',
        topics: ['Item Master', 'Inventory Transactions', 'Costing Methods', 'Inventory Analysis']
      },
      {
        title: 'ERP Integration',
        duration: '6 hours',
        description: 'Integrating ERP with other business systems',
        topics: ['System Integration', 'Data Flow', 'Middleware Solutions', 'API Management']
      },
      {
        title: 'Reporting and Analytics',
        duration: '4 hours',
        description: 'Creating reports and gaining business insights',
        topics: ['Business Intelligence', 'Dashboards', 'Ad-hoc Reporting', 'Analytics Tools']
      }
    ],
    features: [
      {
        title: 'Oracle ERP Cloud Platform',
        description: 'Full access to Oracle ERP Cloud environments'
      },
      {
        title: 'Enterprise Process Simulation',
        description: 'Practice end-to-end business processes'
      },
      {
        title: 'Real-time Data Analytics',
        description: 'Work with live business data and analytics'
      },
      {
        title: 'ERP Implementation Methodology',
        description: 'Learn proven ERP implementation approaches'
      }
    ],
    prerequisites: [
      'Understanding of business processes',
      'Familiarity with financial concepts',
      'Experience with enterprise software',
      'Project management knowledge'
    ],
    skillsLearned: [
      'Enterprise-wide business processes',
      'Financial management and accounting',
      'Supply chain and procurement',
      'Project planning and execution',
      'Inventory and warehouse management',
      'Business intelligence and reporting'
    ]
  }
];

export async function seedOGLCourses(): Promise<void> {
  try {
    console.log('🌱 Starting OGL courses seeding...');

    // Check if courses already exist
    const existingCourses = await OGLCourseService.getOGLCourses();
    if (existingCourses.length > 0) {
      console.log('📚 OGL courses already exist in database. Skipping seeding.');
      return;
    }

    // Seed courses one by one
    for (const courseData of oglCoursesData) {
      console.log(`📝 Seeding course: ${courseData.title}`);
      await OGLCourseService.createOGLCourse(courseData);
    }

    console.log('✅ Successfully seeded all OGL courses!');
  } catch (error) {
    console.error('❌ Error seeding OGL courses:', error);
    throw error;
  }
}
