import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

export default function QATesterCourse() {
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
        <h1 className="text-4xl font-bold">QA Tester Course</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Advanced QA testing techniques including automation frameworks and quality assurance processes
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
              'Advanced Testing Methodologies',
              'Automation Frameworks',
              'Quality Assurance Processes',
              'Test Management Tools',
              'Performance and Load Testing',
              'Security Testing Fundamentals'
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
              'Manual and automated testing techniques',
              'Quality assurance best practices',
              'Test automation frameworks (Selenium, Cypress)',
              'API testing and integration testing',
              'Performance and security testing',
              'Defect management and reporting'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
