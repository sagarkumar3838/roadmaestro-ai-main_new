import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Database, Cog, FileText, BookOpen, ArrowLeft } from 'lucide-react';

export default function ERPCourse() {
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
        <h1 className="text-4xl font-bold">Enterprise Resource Planning (ERP) Course</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Complete ERP solutions covering financials, procurement, and project management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <Database className="h-8 w-8 mx-auto mb-2 text-cyan-600" />
          <div className="text-2xl font-bold">65hr+</div>
          <div className="text-gray-600">Duration</div>
        </div>
        <div className="text-center">
          <Cog className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold">280+</div>
          <div className="text-gray-600">Students</div>
        </div>
        <div className="text-center">
          <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
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
              'Financial Management',
              'Procurement and Sourcing',
              'Project Management',
              'Inventory Control',
              'ERP Integration',
              'Reporting and Analytics'
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
              'Enterprise-wide business processes',
              'Financial management and accounting',
              'Supply chain and procurement',
              'Project planning and execution',
              'Inventory and warehouse management',
              'Business intelligence and reporting'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
