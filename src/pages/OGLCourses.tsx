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
  TestTube,
  PenTool,
  QrCode,
  Zap,
  Cloud,
  Database,
  MonitorSpeaker,
  Calculator,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OGLCourseService } from '@/services/oglCourseService';
import { OGLCourse } from '@/types/oglCourse';
import { HeroParallax } from '@/components/ui/hero-parallax';

export default function OGLCourses() {
  const navigate = useNavigate();
  const [oglCourses, setOglCourses] = useState<OGLCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        console.log('🔄 Starting to fetch OGL courses...');
        const courses = await OGLCourseService.getOGLCourses();
        console.log('✅ Fetched courses:', courses.length, 'courses');
        setOglCourses(courses);
        setError(null);

        // If no courses found, try seeding
        if (courses.length === 0) {
          console.log('📝 No courses found, attempting to seed data...');
          try {
            const { seedOGLCourses } = await import('@/utils/seedOGLCourses');
            await seedOGLCourses();
            console.log('✅ Seeding completed, retrying fetch...');
            // Retry fetching after seeding
            const retryCourses = await OGLCourseService.getOGLCourses();
            console.log('✅ Retry fetched courses:', retryCourses.length, 'courses');
            setOglCourses(retryCourses);
          } catch (seedError) {
            console.error('❌ Error seeding courses:', seedError);
            setError(`Seeding failed: ${seedError instanceof Error ? seedError.message : 'Unknown error'}`);
          }
        }
      } catch (err) {
        console.error('❌ Error fetching OGL courses:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load courses: ${errorMessage}. Please check Firebase connection.`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    if (category === 'Oracle SaaS') return 'bg-blue-100 text-blue-800';
    if (category === 'Fusion Cloud') return 'bg-purple-100 text-purple-800';
    if (category === 'Redwood') return 'bg-teal-100 text-teal-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      TestTube, PenTool, QrCode, Zap, Cloud, Database, MonitorSpeaker, Calculator, Users, BookOpen
    };
    return icons[iconName] || BookOpen;
  };

  const handleCourseClick = (path: string) => {
    navigate(path);
  };

  // Convert OGL courses to HeroParallax products format
  const products = oglCourses.map(course => ({
    title: course.title,
    link: course.path,
    thumbnail: `https://images.unsplash.com/1600x900/?technology,oracle,${course.category.toLowerCase().replace(' ', ',')}&w=400&h=300&fit=crop&crop=center&q=80`
  }));

  return (
    <div className="min-h-screen">
      {/* Loading or Error States */}
      {loading && (
        <div className="flex items-center justify-center py-12 min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading courses...</span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4">
          <div className="text-red-600 dark:text-red-400 mb-4 text-center max-w-md">{error}</div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  console.log('🔄 Manual seeding triggered...');
                  const { seedOGLCourses } = await import('@/utils/seedOGLCourses');
                  await seedOGLCourses();
                  console.log('✅ Manual seeding completed');
                  window.location.reload();
                } catch (seedError) {
                  console.error('❌ Manual seeding failed:', seedError);
                  setError(`Manual seeding failed: ${seedError instanceof Error ? seedError.message : 'Unknown error'}`);
                }
              }}
            >
              Seed Data Manually
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const { OGLCourseService } = await import('@/services/oglCourseService');
                  const testResult = await OGLCourseService.testConnection();
                  console.log('🔍 Firebase test result:', testResult);
                  if (testResult.success) {
                    setError(`✅ Firebase connection working! ${testResult.message}`);
                  } else {
                    setError(`❌ Firebase connection failed: ${testResult.message}`);
                  }
                } catch (testError) {
                  console.error('❌ Firebase test failed:', testError);
                  setError(`❌ Firebase test failed: ${testError instanceof Error ? testError.message : 'Unknown error'}`);
                }
              }}
            >
              Test Firebase Connection
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center max-w-lg">
            <p className="mb-2">If you're seeing this error, check:</p>
            <ul className="text-left list-disc list-inside">
              <li>Firebase project ID is correct</li>
              <li>Firestore security rules allow reads</li>
              <li>Firebase credentials are valid</li>
              <li>Network connectivity to Firebase</li>
            </ul>
          </div>
        </div>
      )}

      {/* Hero Parallax Component */}
      {!loading && !error && (
        <HeroParallax products={products} />
      )}
    </div>
  );
}
