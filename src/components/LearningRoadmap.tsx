import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock, Target } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  skills: string[];
  week: number;
}

interface LearningRoadmapProps {
  roadmap: RoadmapItem[];
  currentWeek?: number;
}

export function LearningRoadmap({ roadmap, currentWeek = 1 }: LearningRoadmapProps) {
  const getStatusIcon = (status: string, isActive: boolean) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'current':
        return <Target className={`h-6 w-6 ${isActive ? 'text-primary animate-pulse-glow' : 'text-primary'}`} />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/10';
      case 'current':
        return 'border-primary bg-primary/10 ai-glow';
      default:
        return 'border-border bg-card/50';
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="ai-gradient-text">
          <Target className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold ai-gradient-text">Your Learning Roadmap</h2>
          <p className="text-muted-foreground">Personalized path to achieve your goals</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-8 bottom-0 w-0.5 roadmap-line"></div>

        <div className="space-y-6">
          {roadmap.map((item, index) => {
            const isActive = item.week === currentWeek;
            
            return (
              <div key={item.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline Node */}
                <div className="absolute left-6 mt-2 z-10 bg-background p-1 rounded-full">
                  {getStatusIcon(item.status, isActive)}
                </div>

                {/* Content Card */}
                <div className={`ml-20 p-6 rounded-xl border-2 transition-all duration-300 ${getStatusColor(item.status)} ${isActive ? 'transform scale-105' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Week {item.week}
                        </Badge>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{item.duration}</span>
                        </div>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${item.status === 'current' ? 'ai-gradient-text' : ''}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-card-foreground/80 mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="text-xs bg-secondary/20 text-secondary-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {item.status === 'current' && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary font-medium">In Progress</span>
                      </div>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div className="progress-fill h-2 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}