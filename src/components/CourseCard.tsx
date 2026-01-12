import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, ExternalLink, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  duration: string;
  rating: number;
  category: string;
  link: string;
  price?: string;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="course-card group animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:ai-gradient-text transition-all duration-300">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm">{course.provider}</p>
        </div>
        <Badge className={`${getDifficultyColor(course.difficulty)} font-medium`}>
          {course.difficulty}
        </Badge>
      </div>

      <p className="text-card-foreground/80 mb-4 line-clamp-3">
        {course.description}
      </p>

      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-warning" />
            <span>{course.rating}/5</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold ai-gradient-text">
          {course.price || 'Free'}
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(course.link, '_blank')}
            className="border-primary/20 hover:border-primary hover:bg-primary/10"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            onClick={() => onEnroll?.(course.id)}
            className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
}