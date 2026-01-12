import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Code,
  Database,
  Server,
  Globe,
  Layers,
  Palette,
  Terminal,
  BookOpen,
  Play,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';

const tutorials = [
  {
    id: 'html',
    name: 'HTML',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    description: 'The language for building web pages',
    lessons: 95,
    level: 'Beginner',
    popular: true,
    path: '/learn/html'
  },
  {
    id: 'css',
    name: 'CSS',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    description: 'The language for styling web pages',
    lessons: 87,
    level: 'Beginner',
    popular: true,
    path: '/learn/css'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: Code,
    color: 'from-yellow-500 to-orange-500',
    description: 'The language for programming web pages',
    lessons: 120,
    level: 'Intermediate',
    popular: true,
    path: '/learn/javascript'
  },
  {
    id: 'react',
    name: 'React',
    icon: Zap,
    color: 'from-cyan-500 to-blue-500',
    description: 'A JavaScript library for building UIs',
    lessons: 78,
    level: 'Intermediate',
    popular: true,
    path: '/learn/react'
  },
  {
    id: 'python',
    name: 'Python',
    icon: Terminal,
    color: 'from-green-500 to-emerald-500',
    description: 'A popular programming language',
    lessons: 110,
    level: 'Beginner',
    popular: false,
    path: '/learn/python'
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    description: 'A language for accessing databases',
    lessons: 65,
    level: 'Beginner',
    popular: false,
    path: '/learn/sql'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: Server,
    color: 'from-green-600 to-green-700',
    description: 'JavaScript runtime environment',
    lessons: 72,
    level: 'Intermediate',
    popular: false,
    path: '/learn/nodejs'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: Code,
    color: 'from-blue-600 to-blue-700',
    description: 'JavaScript with syntax for types',
    lessons: 58,
    level: 'Intermediate',
    popular: false,
    path: '/learn/typescript'
  },
];

const stats = [
  { label: 'Tutorials', value: '70+', icon: BookOpen },
  { label: 'Code Examples', value: '10,000+', icon: Code },
  { label: 'Learners', value: '50M+', icon: Users },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
];

export default function LearnHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white/90 via-blue-50/90 to-indigo-100/90 backdrop-blur-xl py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8">
            Learn to Code
          </h1>
          <p className="text-2xl text-gray-700 mb-6 font-semibold">
            With the world's largest web developer site.
          </p>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Free tutorials, references, and exercises in all the major languages of the web
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/learn/html')}
            >
              <Play className="mr-3 h-6 w-6" />
              Start Learning
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold text-xl px-12 py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/learn/exercises')}
            >
              Try Exercises
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <Icon className="h-10 w-10 mx-auto mb-3 text-green-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tutorials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Tutorials</h2>
            <p className="text-xl text-gray-600">Start with the most popular courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredTutorials.filter(t => t.popular).map((tutorial) => {
              const Icon = tutorial.icon;
              return (
                <Card 
                  key={tutorial.id}
                  className="p-6 bg-white border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(tutorial.path)}
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${tutorial.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {tutorial.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{tutorial.lessons} lessons</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {tutorial.level}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tutorials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Tutorials</h2>
            <p className="text-xl text-gray-600">Browse all available courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTutorials.map((tutorial) => {
              const Icon = tutorial.icon;
              return (
                <Card 
                  key={tutorial.id}
                  className="p-6 bg-white border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(tutorial.path)}
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${tutorial.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {tutorial.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{tutorial.lessons} lessons</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {tutorial.level}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Learn With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 w-fit mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy to Learn</h3>
              <p className="text-gray-600">
                Simple, clear tutorials with examples you can try yourself
              </p>
            </Card>

            <Card className="p-8 bg-white border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 w-fit mx-auto mb-6">
                <Code className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Try It Yourself</h3>
              <p className="text-gray-600">
                Interactive code editor to practice as you learn
              </p>
            </Card>

            <Card className="p-8 bg-white border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 w-fit mx-auto mb-6">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Certified</h3>
              <p className="text-gray-600">
                Earn certificates to showcase your skills
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join millions of learners worldwide
          </p>
          <Button 
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full"
            onClick={() => navigate('/learn/html')}
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Top Tutorials</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/learn/html" className="hover:text-white">HTML Tutorial</a></li>
                <li><a href="/learn/css" className="hover:text-white">CSS Tutorial</a></li>
                <li><a href="/learn/javascript" className="hover:text-white">JavaScript Tutorial</a></li>
                <li><a href="/learn/python" className="hover:text-white">Python Tutorial</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">References</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/learn/html/reference" className="hover:text-white">HTML Reference</a></li>
                <li><a href="/learn/css/reference" className="hover:text-white">CSS Reference</a></li>
                <li><a href="/learn/javascript/reference" className="hover:text-white">JS Reference</a></li>
                <li><a href="/learn/sql/reference" className="hover:text-white">SQL Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Exercises</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/learn/html/exercises" className="hover:text-white">HTML Exercises</a></li>
                <li><a href="/learn/css/exercises" className="hover:text-white">CSS Exercises</a></li>
                <li><a href="/learn/javascript/exercises" className="hover:text-white">JS Exercises</a></li>
                <li><a href="/learn/python/exercises" className="hover:text-white">Python Exercises</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Get Certified</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/learn/certification/html" className="hover:text-white">HTML Certificate</a></li>
                <li><a href="/learn/certification/css" className="hover:text-white">CSS Certificate</a></li>
                <li><a href="/learn/certification/javascript" className="hover:text-white">JS Certificate</a></li>
                <li><a href="/learn/certification/python" className="hover:text-white">Python Certificate</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Skillverse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
