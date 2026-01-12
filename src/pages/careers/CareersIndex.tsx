import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Server, 
  TestTube, 
  Globe, 
  Coffee, 
  Layers,
  ArrowRight,
  Target,
  TrendingUp
} from 'lucide-react';

const careerPaths = [
  {
    id: 'ogl-developer',
    name: 'OGL Developer',
    description: 'Master Oracle Guided Learning technologies and become an expert in Oracle Cloud applications',
    icon: Layers,
    color: 'from-blue-500 to-blue-600',
    skills: ['Oracle Cloud', 'OGL Framework', 'Database Management'],
    path: '/careers/ogl-developer'
  },
  {
    id: 'mern-stack',
    name: 'MERN Stack Developer',
    description: 'Build full-stack applications using MongoDB, Express, React, and Node.js',
    icon: Code,
    color: 'from-green-500 to-green-600',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    path: '/careers/mern-stack'
  },
  {
    id: 'devops',
    name: 'DevOps Developer',
    description: 'Learn CI/CD, containerization, and cloud infrastructure management',
    icon: Server,
    color: 'from-purple-500 to-purple-600',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
    path: '/careers/devops'
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    description: 'Ensure software quality through comprehensive testing strategies',
    icon: TestTube,
    color: 'from-orange-500 to-orange-600',
    skills: ['Test Automation', 'Selenium', 'API Testing', 'QA Methodologies'],
    path: '/careers/qa-tester'
  },
  {
    id: 'web-developer',
    name: 'Web Developer',
    description: 'Create modern, responsive websites with HTML, CSS, and JavaScript',
    icon: Globe,
    color: 'from-pink-500 to-pink-600',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    path: '/careers/web-developer'
  },
  {
    id: 'python-fullstack',
    name: 'Python Full Stack',
    description: 'Build scalable applications with Python, Django, and modern frontend frameworks',
    icon: Coffee,
    color: 'from-yellow-500 to-yellow-600',
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL'],
    path: '/careers/python-fullstack'
  },
  {
    id: 'java-fullstack',
    name: 'Java Full Stack',
    description: 'Develop enterprise applications using Java, Spring Boot, and Angular',
    icon: Code,
    color: 'from-red-500 to-red-600',
    skills: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
    path: '/careers/java-fullstack'
  }
];

export default function CareersIndex() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">Career Paths</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your career path and start your journey to becoming a professional developer
          </p>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((career) => {
            const Icon = career.icon;
            return (
              <Card 
                key={career.id} 
                className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => navigate(career.path)}
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${career.color} w-fit mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {career.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {career.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white group-hover:shadow-lg transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(career.path);
                  }}
                >
                  Explore Path
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <p className="text-gray-600">Job Placement Rate</p>
          </Card>
          
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <Target className="h-10 w-10 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">7+</div>
            <p className="text-gray-600">Career Paths Available</p>
          </Card>
          
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg text-center">
            <Code className="h-10 w-10 text-purple-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <p className="text-gray-600">Students Trained</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
