import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

export default function RedwoodDeveloperCourse() {
  const navigate = useNavigate();

  return (
    <div className="h-full p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/ogl-courses')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Redwood Page Developer Course</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Master Oracle Redwood UI development for building modern, intuitive user interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Course Modules
          </h2>
          <div className="space-y-4">
            {[
              'Redwood UI Components',
              'Page Layout and Design',
              'Responsive Design Principles',
              'Interactive Elements',
              'Accessibility Standards',
              'Performance Optimization'
            ].map((module, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-medium">{module}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">What You'll Learn</h2>
          <div className="space-y-3">
            {[
              'Oracle Redwood design system and components',
              'Modern UI/UX principles and best practices',
              'Responsive web design for enterprise applications',
              'Accessibility compliance (WCAG 2.1)',
              'Performance optimization techniques',
              'Custom component development'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
