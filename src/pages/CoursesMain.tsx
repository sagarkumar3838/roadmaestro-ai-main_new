import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  BookOpen,
  Code,
  Database,
  Server,
  Globe,
  Layers,
  ArrowRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  X
} from 'lucide-react';

const courseCategories = [
  {
    id: 'ogl',
    name: 'Oracle Guided Learning',
    icon: Layers,
    color: 'from-blue-500 to-blue-600',
    description: 'Master Oracle Cloud technologies and OGL framework',
    courses: 11,
    path: '/courses/ogl-courses'
  },
  {
    id: 'web',
    name: 'Web Development',
    icon: Globe,
    color: 'from-green-500 to-green-600',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks',
    courses: 8,
    path: '/careers/web-developer'
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    icon: Code,
    color: 'from-purple-500 to-purple-600',
    description: 'MERN, Python, Java full stack development',
    courses: 12,
    path: '/careers/mern-stack'
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: Server,
    color: 'from-orange-500 to-orange-600',
    description: 'Docker, Kubernetes, AWS, CI/CD pipelines',
    courses: 10,
    path: '/careers/devops'
  },
  {
    id: 'database',
    name: 'Database Management',
    icon: Database,
    color: 'from-pink-500 to-pink-600',
    description: 'SQL, NoSQL, Database design and optimization',
    courses: 6,
    path: '/courses/database'
  },
];

const featuredCourses = [
  {
    id: 1,
    title: 'Complete OGL Developer Bootcamp',
    description: 'Master Oracle Guided Learning from basics to advanced',
    instructor: 'Expert Instructor',
    duration: '40 hours',
    students: 1250,
    rating: 4.8,
    price: '₹4,999',
    image: '/api/placeholder/400/250',
    category: 'OGL',
    level: 'All Levels',
    path: '/courses/ogl-courses'
  },
  {
    id: 2,
    title: 'MERN Stack Complete Guide',
    description: 'Build full-stack applications with MongoDB, Express, React, Node.js',
    instructor: 'Senior Developer',
    duration: '50 hours',
    students: 2100,
    rating: 4.9,
    price: '₹5,999',
    image: '/api/placeholder/400/250',
    category: 'Full Stack',
    level: 'Intermediate',
    path: '/careers/mern-stack'
  },
  {
    id: 3,
    title: 'DevOps Mastery Program',
    description: 'Learn Docker, Kubernetes, AWS, and modern DevOps practices',
    instructor: 'DevOps Expert',
    duration: '45 hours',
    students: 1800,
    rating: 4.7,
    price: '₹6,999',
    image: '/api/placeholder/400/250',
    category: 'DevOps',
    level: 'Advanced',
    path: '/careers/devops'
  },
];

const stats = [
  { label: 'Total Courses', value: '50+', icon: BookOpen },
  { label: 'Active Students', value: '10,000+', icon: Users },
  { label: 'Expert Instructors', value: '25+', icon: Award },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
];

export default function CoursesMain() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on search query using useMemo for performance
  const { filteredCategories, filteredFeaturedCourses } = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        filteredCategories: courseCategories,
        filteredFeaturedCourses: featuredCourses
      };
    }

    const query = searchQuery.toLowerCase().trim();
    
    const filteredCategories = courseCategories.filter(category =>
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );

    const filteredFeaturedCourses = featuredCourses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query)
    );

    return { filteredCategories, filteredFeaturedCourses };
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const totalResults = filteredCategories.length + filteredFeaturedCourses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
      </div>
      {/* Navigation */}
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8">
            Explore Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Learn from industry experts and advance your career with our comprehensive courses
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500 bg-white/80 backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-4 text-center">
                <p className="text-lg text-orange-600">
                  Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                {totalResults === 0 && (
                  <p className="text-gray-600 mt-2">
                    Try searching for "web development", "oracle", "devops", or "database"
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Icon className="h-10 w-10 mx-auto mb-3 text-orange-500" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      {(!searchQuery || filteredCategories.length > 0) && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
              <p className="text-xl text-gray-600">Choose your learning path and start your journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                    onClick={() => navigate(category.path)}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} w-fit mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                        {category.courses} Courses
                      </Badge>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses */}
      {(!searchQuery || filteredFeaturedCourses.length > 0) && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
              <p className="text-xl text-gray-600">Most popular courses chosen by our students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeaturedCourses.map((course) => (
                <Card 
                  key={course.id}
                  className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-orange-400 to-pink-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-white/80" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <Badge className="mb-3 bg-orange-100 text-orange-700">
                      {course.category}
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                        onClick={() => navigate(course.path)}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results State */}
      {searchQuery && totalResults === 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No courses found for "{searchQuery}"
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Try searching for different keywords or browse our course categories below.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Web Development', 'Oracle', 'DevOps', 'Database', 'Full Stack'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    onClick={() => setSearchQuery(suggestion.toLowerCase())}
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={clearSearch}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                Browse All Courses
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-gray-600">Learn from the best and achieve your goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 w-fit mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of real-world experience
              </p>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 w-fit mx-auto mb-6">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certification</h3>
              <p className="text-gray-600">
                Get recognized certificates upon course completion to boost your career
              </p>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 w-fit mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Growth</h3>
              <p className="text-gray-600">
                95% of our students report career advancement within 6 months
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of students already learning with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Browse All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-6"
              onClick={() => navigate('/signup')}
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 Skillverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
