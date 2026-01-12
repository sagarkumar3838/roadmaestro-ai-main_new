import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, MessageSquare, ShoppingCart, BookOpen, ArrowLeft } from 'lucide-react';

export default function CXCourse() {
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
        <h1 className="text-4xl font-bold">Customer Experience (CX) Course</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Master customer experience platforms including sales, service, and marketing clouds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold">42hr+</div>
          <div className="text-gray-600">Duration</div>
        </div>
        <div className="text-center">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">320+</div>
          <div className="text-gray-600">Students</div>
        </div>
        <div className="text-center">
          <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">Certificate</div>
          <div className="text-gray-600">Included</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Course Modules
          </h2>
          <div className="space-y-4">
            {[
              'Sales Cloud Management',
              'Service Cloud Operations',
              'Marketing Cloud Campaigns',
              'Customer Analytics',
              'Omnichannel Support',
              'Customer Success Management'
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
              'Sales force automation and CRM',
              'Customer service platform management',
              'Marketing automation and campaigns',
              'Customer data analytics and insights',
              'Omnichannel customer engagement',
              'Customer success and retention strategies'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
