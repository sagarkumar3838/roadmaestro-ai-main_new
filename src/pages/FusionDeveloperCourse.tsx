import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

export default function FusionDeveloperCourse() {
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
        <h1 className="text-4xl font-bold">Fusion Developer Course</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Develop skills in Oracle Fusion Cloud applications development and customization
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
              'Fusion Cloud Architecture',
              'Application Development',
              'Custom Extensions',
              'Integration Services',
              'Security and Compliance',
              'Deployment and Maintenance'
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
              'Oracle Fusion Cloud architecture and principles',
              'Application development and customization',
              'Groovy scripting and business rules',
              'REST API integration and web services',
              'Security policies and compliance',
              'Deployment strategies and best practices'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
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
