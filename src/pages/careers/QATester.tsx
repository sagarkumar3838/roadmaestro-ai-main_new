import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TestTube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QATester() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/careers')} className="border-gray-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </div>

        <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">QA Tester</h1>
              <p className="text-xl text-orange-100 mb-6 max-w-2xl">
                Ensure software quality through comprehensive testing strategies
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white hover:bg-white/30">Testing</Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">Automation</Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">16 weeks</Badge>
              </div>
            </div>
            <TestTube className="h-20 w-20 text-white/80" />
          </div>
        </Card>

        <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            This career path is currently under development. Check back soon for comprehensive learning materials!
          </p>
        </Card>
      </div>
    </div>
  );
}
