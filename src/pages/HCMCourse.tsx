import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users, Target, BookOpen, ArrowLeft, User, Briefcase, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courseModules = [
  {
    title: 'HCM System Overview',
    duration: '3 hours',
    description: 'Understanding Oracle HCM Cloud architecture and core concepts',
    topics: ['HCM Cloud Architecture', 'Navigation and User Experience', 'Data Security', 'Compliance']
  },
  {
    title: 'Workforce Structures',
    duration: '4 hours',
    description: 'Managing organizational structures, positions, and employment models',
    topics: ['Organization Management', 'Job Structures', 'Position Management', 'Enterprise Structures']
  },
  {
    title: 'Hiring and Onboarding',
    duration: '6 hours',
    description: 'Recruitment processes and employee onboarding workflows',
    topics: ['Candidate Pools', 'Job Applications', 'Background Checks', 'New Hire Onboarding', 'Document Management']
  },
  {
    title: 'Compensation Management',
    duration: '5 hours',
    description: 'Managing payroll, salaries, benefits, and employee compensation',
    topics: ['Payroll Processing', 'Salary Administration', 'Benefits Management', 'Incentive Plans']
  },
  {
    title: 'Performance Management',
    duration: '4 hours',
    description: 'Managing employee performance, appraisals, and career development',
    topics: ['Performance Appraisals', '360-Degree Feedback', 'Career Planning', 'Learning Management']
  },
  {
    title: 'Talent Management',
    duration: '5 hours',
    description: 'Talent acquisition, retention, and succession planning',
    topics: ['Talent Acquisition', 'Employee Retention', 'Succession Planning', 'Career Development']
  },
  {
    title: 'Analytics and Reporting',
    duration: '4 hours',
    description: 'HCM data analytics, dashboards, and compliance reporting',
    topics: ['HCM Analytics', 'Custom Dashboards', 'Compliance Reporting', 'Regulatory Requirements']
  },
  {
    title: 'System Administration',
    duration: '3 hours',
    description: 'HCM system configuration, maintenance, and troubleshooting',
    topics: ['System Configuration', 'Security Setup', 'Data Migration', 'System Administration']
  }
];

const courseFeatures = [
  'Hands-on Oracle HCM Cloud Experience',
  'Real-world HR Scenarios and Case Studies',
  'Implementation Best Practices',
  'Certification Preparation',
  'Live Mentoring Sessions',
  'Lifetime Access to Course Materials',
  'Community Support and Networking'
];

const prerequisites = [
  'Basic understanding of HR concepts',
  'Familiarity with enterprise applications',
  'Understanding of business processes',
  'No prior Oracle experience required'
];

export default function HCMCourse() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <Badge className="bg-yellow-100 text-yellow-800">Intermediate Level</Badge>
        <Badge className="bg-blue-100 text-blue-800">Oracle SaaS</Badge>
      </div>

      {/* Course Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Human Capital Management (HCM) Course
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master Oracle HCM Cloud solutions for comprehensive workforce management, performance, and talent.
        </p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">55hr+</div>
            <div className="text-gray-600 dark:text-gray-400">Duration</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">400+</div>
            <div className="text-gray-600 dark:text-gray-400">Students</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">85%</div>
            <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Award className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">Certificate</div>
            <div className="text-gray-600 dark:text-gray-400">Oracle Certified</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseModules.map((module, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Features and Prerequisites */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {courseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{prereq}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Enroll Button */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Transform HR Operations</h3>
              <p className="text-blue-100 mb-4">Master Oracle HCM Cloud and advance your HR career</p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Enroll Now - Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What You'll Learn */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Oracle HCM Cloud Implementation',
              'Workforce Management Solutions',
              'Talent Acquisition & Onboarding',
              'Compensation & Benefits Management',
              'Performance & Career Development',
              'Analytics & Reporting',
              'Compliance & Regulatory Requirements',
              'System Configuration & Security',
              'HR Best Practices & Processes',
              'Real-World Implementation Scenarios'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
