import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Server, CheckCircle, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DevOpsDeveloper() {
  const navigate = useNavigate();

  const skills = [
    { name: 'Docker & Containers', level: 0, color: 'bg-blue-500' },
    { name: 'Kubernetes', level: 0, color: 'bg-blue-600' },
    { name: 'CI/CD Pipelines', level: 0, color: 'bg-green-500' },
    { name: 'AWS/Cloud', level: 0, color: 'bg-orange-500' },
  ];

  const learningPath = [
    { title: 'Linux Fundamentals', duration: '2 weeks', completed: false },
    { title: 'Docker Basics', duration: '3 weeks', completed: false },
    { title: 'Kubernetes Essentials', duration: '4 weeks', completed: false },
    { title: 'CI/CD with Jenkins', duration: '3 weeks', completed: false },
    { title: 'AWS Cloud Services', duration: '4 weeks', completed: false },
    { title: 'Infrastructure as Code', duration: '3 weeks', completed: false },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/careers')} className="border-gray-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </div>

        <Card className="p-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">DevOps Developer</h1>
              <p className="text-xl text-purple-100 mb-6 max-w-2xl">
                Master CI/CD, containerization, and cloud infrastructure management
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white hover:bg-white/30">DevOps</Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">Cloud</Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">19 weeks</Badge>
              </div>
            </div>
            <Server className="h-20 w-20 text-white/80" />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Skills</h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-3" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Path</h2>
              <div className="space-y-4">
                {learningPath.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.completed ? 'bg-purple-500' : 'bg-gray-300'}`}>
                        {item.completed ? <CheckCircle className="h-5 w-5 text-white" /> : <BookOpen className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.duration}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
                  <div className="text-3xl font-bold text-gray-900">0%</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Modules Completed</p>
                  <div className="text-3xl font-bold text-gray-900">0/6</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Time</p>
                  <div className="text-3xl font-bold text-gray-900">19 weeks</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Ready to Start?</h3>
              <p className="text-purple-100 mb-4">
                Begin your journey to becoming a DevOps Developer today!
              </p>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                Start Learning
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
