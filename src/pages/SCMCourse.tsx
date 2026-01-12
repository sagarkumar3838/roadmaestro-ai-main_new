import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users, Target, BookOpen, ArrowLeft, Truck, Package, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SCMCourse() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
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
        <Badge className="bg-blue-100 text-blue-800">Oracle SaaS</Badge>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Supply Chain Management (SCM) Course
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn Oracle SCM fundamentals including procurement, inventory, and logistics management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">48hr+</div>
            <div className="text-gray-600 dark:text-gray-400">Duration</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">250+</div>
            <div className="text-gray-600 dark:text-gray-400">Students</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">87%</div>
            <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">Certificate</div>
            <div className="text-gray-600 dark:text-gray-400">Upon Completion</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Procurement and Sourcing', duration: '6 hours' },
                { title: 'Inventory Management', duration: '8 hours' },
                { title: 'Logistics and Transportation', duration: '7 hours' },
                { title: 'Warehousing', duration: '6 hours' },
                { title: 'Supply Chain Analytics', duration: '5 hours' },
                { title: 'Integration with ERP', duration: '4 hours' }
              ].map((module, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'End-to-end supply chain management',
                  'Procurement process automation',
                  'Inventory optimization techniques',
                  'Logistics and transportation management',
                  'Supplier relationship management',
                  'SC analytics and reporting'
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Master Supply Chain</h3>
              <p className="text-green-100 mb-4">Transform supply chain operations with Oracle SCM</p>
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
