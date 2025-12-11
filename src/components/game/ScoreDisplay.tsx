import { Trophy, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  streak: number;
  xpEarned: number;
  className?: string;
}

export const ScoreDisplay = ({ score, streak, xpEarned, className }: ScoreDisplayProps) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-card">
        <Trophy className="h-5 w-5 text-game-xp" />
        <span className="font-bold">{score}</span>
      </div>
      
      {streak > 0 && (
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-card animate-bounce-in">
          <Zap className="h-5 w-5 text-game-streak" />
          <span className="font-bold">{streak}x Streak!</span>
        </div>
      )}
      
      <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-card">
        <Star className="h-5 w-5 text-game-level" />
        <span className="font-bold">+{xpEarned} XP</span>
      </div>
    </div>
  );
};
