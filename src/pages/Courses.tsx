import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play, 
  BookOpen,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Master the Art of Building AI Products using JavaScript',
    instructor: 'Rakesh K',
    duration: '30hr+',
    rating: 5.0,
    students: 120,
    price: '₹4,999',
    originalPrice: '₹9,999',
    category: 'Gen AI',
    level: 'Intermediate',
    description: 'Complete course for building, deploying, and optimizing Generative AI applications using Modern Frameworks and best practices.',
    image: '/api/placeholder/400/250',
    tags: ['JavaScript', 'AI', 'Machine Learning', 'React'],
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    title: 'Become a Production-ready Fullstack Engineer in 14 weeks',
    instructor: 'Rakesh K',
    duration: '80hr+',
    rating: 4.9,
    students: 700,
    price: '₹4,999',
    originalPrice: '₹9,999',
    category: 'Fullstack',
    level: 'Beginner',
    description: 'Ship a real-time pizza-ordering SAAS, master DevOps & microservices, and join 500+ grads now working at TCS, Infosys & Deloitte.',
    image: '/api/placeholder/400/250',
    tags: ['MERN', 'DevOps', 'Microservices', 'AWS'],
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    title: 'Master Backend Foundation through hands-on Training',
    instructor: 'Rakesh K',
    duration: '46hr+',
    rating: 4.9,
    students: 260,
    price: '₹3,999',
    originalPrice: '₹7,999',
    category: 'Backend',
    level: 'Intermediate',
    description: 'Join an intensive recorded backend course to build real-world production grade systems with confidence.',
    image: '/api/placeholder/400/250',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    isNew: false,
    isBestseller: false
  },
  {
    id: 4,
    title: 'Learn Golang by building Real-world projects',
    instructor: 'Rakesh K',
    duration: '35hr+',
    rating: 4.8,
    students: 350,
    price: 'Coming Soon',
    originalPrice: '',
    category: 'Backend',
    level: 'Intermediate',
    description: 'Learn Golang from the ground up & in great depth by building multiple projects including REST API, All Golang Concepts, Learn concurrency & Develop web services',
    image: '/api/placeholder/400/250',
    tags: ['Golang', 'Concurrency', 'REST API', 'Web Services'],
    isNew: false,
    isBestseller: false,
    isUpcoming: true
  },
  {
    id: 5,
    title: 'Complete React Development Bootcamp',
    instructor: 'Rakesh K',
    duration: '25hr+',
    rating: 4.7,
    students: 450,
    price: '₹2,999',
    originalPrice: '₹5,999',
    category: 'Frontend',
    level: 'Beginner',
    description: 'Master React from basics to advanced concepts including hooks, context, routing, and state management.',
    image: '/api/placeholder/400/250',
    tags: ['React', 'JavaScript', 'Hooks', 'Context'],
    isNew: false,
    isBestseller: false
  },
  {
    id: 6,
    title: 'Advanced JavaScript & ES6+ Mastery',
    instructor: 'Rakesh K',
    duration: '20hr+',
    rating: 4.8,
    students: 380,
    price: '₹1,999',
    originalPrice: '₹3,999',
    category: 'Frontend',
    level: 'Intermediate',
    description: 'Deep dive into modern JavaScript features, async programming, and advanced concepts.',
    image: '/api/placeholder/400/250',
    tags: ['JavaScript', 'ES6+', 'Async', 'Promises'],
    isNew: false,
    isBestseller: false
  }
];

const categories = [
  { name: 'All', icon: BookOpen, count: courses.length },
  { name: 'Gen AI', icon: Brain, count: courses.filter(c => c.category === 'Gen AI').length },
  { name: 'Fullstack', icon: Globe, count: courses.filter(c => c.category === 'Fullstack').length },
  { name: 'Backend', icon: Database, count: courses.filter(c => c.category === 'Backend').length },
  { name: 'Frontend', icon: Code, count: courses.filter(c => c.category === 'Frontend').length }
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.name === category);
    return categoryData?.icon || BookOpen;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Latest Courses</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Master software development with our structured courses designed to make you job-ready.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const CategoryIcon = getCategoryIcon(course.category);
          return (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <CategoryIcon className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {course.isNew && (
                    <Badge className="bg-green-500 text-white">New</Badge>
                  )}
                  {course.isBestseller && (
                    <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                  )}
                  {course.isUpcoming && (
                    <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{course.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}+
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {course.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {course.price}
                    </div>
                    {course.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {course.originalPrice}
                      </div>
                    )}
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                    disabled={course.isUpcoming}
                  >
                    {course.isUpcoming ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Join Waitlist
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Enroll Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* CTA Section */}
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers with our comprehensive courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              <Award className="mr-2 h-5 w-5" />
              Get Certified
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
