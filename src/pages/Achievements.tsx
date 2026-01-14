import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { achievements, getRarityColor, getRarityBorder } from '@/data/achievementsData';
import { Trophy, Lock } from 'lucide-react';

const Achievements = () => {
  const { userProgress } = useApp();

  const isUnlocked = (achievement: typeof achievements[0]) => {
    const { type, value } = achievement.requirement;
    switch (type) {
      case 'xp':
        return userProgress.xp >= value;
      case 'streak':
        return userProgress.streak >= value;
      case 'level':
        return userProgress.level >= value;
      case 'topics_completed':
        return userProgress.completedTopics.length >= value;
      default:
        return false;
    }
  };

  const unlockedCount = achievements.filter(isUnlocked).length;

  return (
    <AppLayout title="Achievements">
      <div className="p-4 pb-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-7 w-7 text-yellow-500" />
            <h1 className="text-2xl font-bold">Achievements</h1>
          </div>
          <p className="text-muted-foreground">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const unlocked = isUnlocked(achievement);
            return (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  unlocked
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white ${getRarityBorder(achievement.rarity)}`
                    : 'bg-card border-muted opacity-60'
                }`}
              >
                {!unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className={`font-bold text-sm mb-1 ${unlocked ? 'text-white' : ''}`}>
                  {achievement.name.replace(/\*\*/g, '')}
                </h3>
                <p className={`text-xs ${unlocked ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {achievement.description}
                </p>
                <div className={`text-xs mt-2 font-medium ${unlocked ? 'text-white/90' : 'text-primary'}`}>
                  +{achievement.xpReward} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Achievements;
