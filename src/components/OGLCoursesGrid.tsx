import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Code,
  TestTube,
  Users,
  Database,
  Wrench,
  Settings,
  Target,
  BookOpen,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

const OGLCoursesGrid: React.FC = () => {
  const navigate = useNavigate();

  const oglCourses = [
    {
      id: 'ogl-tester',
      name: 'OGL Tester',
      description: 'Master Oracle Guided Learning testing methodologies and quality assurance processes',
      icon: TestTube,
      difficulty: 'Intermediate',
      duration: '6-8 weeks',
      modules: 12,
      color: 'from-blue-500 to-blue-600',
      route: '/careers/ogl-developer/overview'
    },
    {
      id: 'ogl-content-developer',
      name: 'OGL Content Developer',
      description: 'Create engaging Oracle learning content and interactive educational materials',
      icon: Code,
      difficulty: 'Advanced',
      duration: '8-10 weeks',
      modules: 15,
      color: 'from-green-500 to-green-600',
      route: '/careers/ogl-developer/overview'
    },
    {
      id: 'ogl-devops',
      name: 'OGL DevOps',
      description: 'Implement CI/CD pipelines and infrastructure for Oracle learning platforms',
      icon: Settings,
      difficulty: 'Advanced',
      duration: '10-12 weeks',
      modules: 18,
      color: 'from-purple-500 to-purple-600',
      route: '/careers/ogl-developer/overview'
    },
    {
      id: 'ogl-developer',
      name: 'OGL Developer',
      description: 'Build and maintain Oracle Guided Learning applications and systems',
      icon: Database,
      difficulty: 'Expert',
      duration: '12-14 weeks',
      modules: 20,
      color: 'from-red-500 to-red-600',
      route: '/careers/ogl-developer/overview'
    },
    {
      id: 'ogl-architect',
      name: 'OGL Architect',
      description: 'Design scalable Oracle learning platform architectures and solutions',
      icon: Target,
      difficulty: 'Expert',
      duration: '14-16 weeks',
      modules: 22,
      color: 'from-indigo-500 to-indigo-600',
      route: '/careers/ogl-developer/overview'
    },
    {
      id: 'ogl-consultant',
      name: 'OGL Consultant',
      description: 'Provide expert guidance on Oracle learning implementations and best practices',
      icon: Users,
      difficulty: 'Expert',
      duration: '10-12 weeks',
      modules: 16,
      color: 'from-orange-500 to-orange-600',
      route: '/careers/ogl-developer/overview'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800';
      case 'Expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Oracle Guided Learning Courses</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your specialization path in Oracle Guided Learning. Each course is designed to make you an expert in your chosen field.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>6 Specializations</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Industry-Leading Curriculum</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Expert Instructors</span>
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oglCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-r ${course.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative p-6 h-full flex items-center justify-between text-white">
                      <div>
                        <Icon className="h-10 w-10 mb-2" />
                        <h3 className="text-lg font-bold">{course.name}</h3>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-white/20 text-white border-white/30">
                          {course.modules} Modules
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Difficulty:</span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration:</span>
                        <span className="text-sm font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Modules:</span>
                        <span className="text-sm font-medium">{course.modules} modules</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className="w-full group-hover:bg-gray-900 transition-colors"
                      onClick={() => navigate(course.route)}
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 mt-12"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Target className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">Ready to Start Your OGL Journey?</h3>
                  <p className="text-indigo-100 mt-2">
                    Join thousands of professionals who have advanced their careers with Oracle Guided Learning
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OGLCoursesGrid;