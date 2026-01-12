import React, { useEffect, useState } from 'react';
import { Skill, Difficulty } from '@/types/question';
import { getUserSkillProgress } from '@/services/progressionService';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, CheckCircle, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LevelProgressIndicatorProps {
  skill: Skill;
  currentLevel?: Difficulty;
}

export const LevelProgressIndicator: React.FC<LevelProgressIndicatorProps> = ({ 
  skill, 
  currentLevel 
}) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const levels: Difficulty[] = ['easy', 'medium', 'hard', 'advanced'];

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userProgress = await getUserSkillProgress(user.uid, skill);
        setProgress(userProgress);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user, skill]);

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading progress...</div>;
  }

  if (!user) {
    return (
      <div className="text-gray-400 text-sm">
        Sign in to track your progress
      </div>
    );
  }

  const getLevelStatus = (level: Difficulty) => {
    if (!progress) return 'locked';
    
    const levelIndex = levels.indexOf(level);
    const currentLevelIndex = levels.indexOf(progress.currentLevel);
    
    if (progress.completedLevels.includes(level)) {
      return 'completed';
    } else if (levelIndex <= currentLevelIndex) {
      return 'unlocked';
    } else {
      return 'locked';
    }
  };

  const getLevelScore = (level: Difficulty) => {
    if (!progress) return 0;
    return progress.levelScores[level] || 0;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
        Level Progress
      </h3>
      <div className="space-y-2">
        {levels.map((level) => {
          const status = getLevelStatus(level);
          const score = getLevelScore(level);
          const isCurrent = level === currentLevel;

          return (
            <div
              key={level}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isCurrent
                  ? 'border-blue-500 bg-blue-500/10'
                  : status === 'completed'
                  ? 'border-green-500/30 bg-green-500/5'
                  : status === 'unlocked'
                  ? 'border-gray-600 bg-gray-700/50'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : status === 'unlocked' ? (
                  <Circle className="h-5 w-5 text-blue-400" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-500" />
                )}
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium capitalize ${
                      status === 'locked' ? 'text-gray-500' : 'text-white'
                    }`}>
                      {level}
                    </span>
                    {isCurrent && (
                      <Badge variant="outline" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  {status !== 'locked' && score > 0 && (
                    <span className="text-xs text-gray-400">
                      Best: {score}/10 ({Math.round((score / 10) * 100)}%)
                    </span>
                  )}
                </div>
              </div>

              <div>
                {status === 'completed' && (
                  <Badge className="bg-green-500">Passed</Badge>
                )}
                {status === 'unlocked' && !isCurrent && (
                  <Badge variant="outline">Available</Badge>
                )}
                {status === 'locked' && (
                  <Badge variant="secondary" className="bg-gray-700">Locked</Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {progress && (
        <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <div className="text-sm text-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>Tests Taken:</span>
              <span className="font-semibold text-white">{progress.totalTestsTaken}</span>
            </div>
            <div className="flex justify-between">
              <span>Levels Completed:</span>
              <span className="font-semibold text-white">
                {progress.completedLevels.length}/4
              </span>
            </div>
            <div className="flex justify-between">
              <span>Current Streak:</span>
              <span className="font-semibold text-white">
                {progress.streakData.currentStreak} 🔥
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
