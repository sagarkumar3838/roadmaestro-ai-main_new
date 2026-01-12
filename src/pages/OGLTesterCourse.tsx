import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users, Target, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OGLCourseService } from '@/services/oglCourseService';
import { OGLCourse } from '@/types/oglCourse';

export default function OGLTesterCourse() {
  const navigate = useNavigate();
  const { coursePath } = useParams();
  const [course, setCourse] = useState<OGLCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseData = await OGLCourseService.getOGLCourseByPath('/ogl-courses/ogl-tester');
        if (courseData) {
          setCourse(courseData);
        } else {
          // Fallback: try to seed and fetch again
          try {
            const { seedOGLCourses } = await import('@/utils/seedOGLCourses');
            await seedOGLCourses();
            const retryCourse = await OGLCourseService.getOGLCourseByPath('/ogl-courses/ogl-tester');
            setCourse(retryCourse);
          } catch (seedError) {
            console.error('Error seeding courses:', seedError);
            setError('Course not found. Please try again later.');
          }
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading course...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-red-600 dark:text-red-400">{error || 'Course not found'}</div>
        <Button onClick={() => navigate('/ogl-courses')}>
          Back to Courses
        </Button>
      </div>
    );
  }

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
        <Badge className={getLevelColor(course.level)}>{course.level} Level</Badge>
      </div>

      {/* Course Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {course.longDescription}
        </p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{course.durationHours}hr+</div>
            <div className="text-gray-600 dark:text-gray-400">Duration</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{course.studentsCount}+</div>
            <div className="text-gray-600 dark:text-gray-400">Students</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{course.completionRate}%</div>
            <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">Certificate</div>
            <div className="text-gray-600 dark:text-gray-400">Upon Completion</div>
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
              {course.modules.map((module, index) => (
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
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature.title}</span>
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
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{prereq}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Enroll Button */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Start Testing?</h3>
              <p className="text-blue-100 mb-4">Enroll now and begin your journey as an OGL Tester</p>
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
            {course.skillsLearned.map((skill, index) => (
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
