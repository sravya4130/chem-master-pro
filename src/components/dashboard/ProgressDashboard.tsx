import { useApp } from '@/contexts/AppContext';
import { Trophy, Flame, Star, Target, TrendingUp, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const ProgressDashboard = () => {
  const { userProgress } = useApp();
  
  const xpToNextLevel = userProgress.level * 100;
  const currentLevelXP = userProgress.xp % 100;
  const progressPercent = (currentLevelXP / 100) * 100;
  
  const stats = [
    {
      icon: Trophy,
      label: 'Total XP',
      value: userProgress.xp,
      color: 'text-game-xp',
      bgColor: 'bg-game-xp/20',
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: userProgress.streak,
      color: 'text-game-streak',
      bgColor: 'bg-game-streak/20',
    },
    {
      icon: Star,
      label: 'Level',
      value: userProgress.level,
      color: 'text-game-level',
      bgColor: 'bg-game-level/20',
    },
    {
      icon: Target,
      label: 'Topics Done',
      value: userProgress.completedTopics.length,
      color: 'text-topic-blue',
      bgColor: 'bg-topic-blue/20',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Your Progress
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Award className="h-4 w-4" />
          <span>Level {userProgress.level}</span>
        </div>
      </div>
      
      {/* Level Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Next Level</span>
          <span className="font-semibold">{currentLevelXP} / 100 XP</span>
        </div>
        <Progress value={progressPercent} className="h-3" />
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-xl p-3 flex items-center gap-3 transition-transform hover:scale-105`}
          >
            <div className={`p-2 rounded-lg bg-background/50`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Achievement Preview */}
      {userProgress.streak >= 3 && (
        <div className="bg-gradient-to-r from-game-streak/20 to-game-xp/20 rounded-xl p-3 flex items-center gap-3">
          <div className="text-2xl">🔥</div>
          <div>
            <p className="font-semibold text-sm">On Fire!</p>
            <p className="text-xs text-muted-foreground">
              {userProgress.streak} day streak! Keep it up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
