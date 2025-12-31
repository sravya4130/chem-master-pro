import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { achievements, Achievement } from '@/data/achievementsData';
import { AchievementBadge } from '@/components/achievements/AchievementBadge';
import { ChemistryScene } from '@/components/3d/ChemistryScene';
import { Trophy, Star, Flame, Target } from 'lucide-react';

const Achievements = () => {
  const { userProgress } = useApp();

  const isAchievementUnlocked = (achievement: Achievement): boolean => {
    switch (achievement.requirement.type) {
      case 'xp':
        return userProgress.xp >= achievement.requirement.value;
      case 'streak':
        return userProgress.streak >= achievement.requirement.value;
      case 'level':
        return userProgress.level >= achievement.requirement.value;
      case 'topics_completed':
        return userProgress.completedTopics.length >= achievement.requirement.value;
      case 'questions_answered':
        // This would need to be tracked in userProgress
        return userProgress.xp / 10 >= achievement.requirement.value; // Rough estimate
      case 'perfect_games':
        return false; // Would need specific tracking
      default:
        return false;
    }
  };

  const unlockedCount = achievements.filter(a => isAchievementUnlocked(a)).length;
  const totalXPFromAchievements = achievements
    .filter(a => isAchievementUnlocked(a))
    .reduce((sum, a) => sum + a.xpReward, 0);

  const categories = ['general', 'streak', 'xp', 'topics', 'accuracy'] as const;

  return (
    <AppLayout title="Achievements">
      <ChemistryScene />
      
      <div className="p-4 pb-8 relative z-10">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-game-xp/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-game-xp" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unlockedCount}/{achievements.length}</p>
                <p className="text-xs text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">+{totalXPFromAchievements}</p>
                <p className="text-xs text-muted-foreground">XP from Badges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-card mb-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Your Progress
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-game-xp">
                <Star className="h-4 w-4" />
                <span className="font-bold">{userProgress.xp}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-game-streak">
                <Flame className="h-4 w-4" />
                <span className="font-bold">{userProgress.streak}</span>
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-game-level">
                <Trophy className="h-4 w-4" />
                <span className="font-bold">{userProgress.level}</span>
              </div>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
          </div>
        </div>

        {/* Achievements by Category */}
        {categories.map((category) => {
          const categoryAchievements = achievements.filter(a => a.category === category);
          if (categoryAchievements.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-bold mb-3 capitalize flex items-center gap-2">
                {category === 'streak' && <Flame className="h-5 w-5 text-game-streak" />}
                {category === 'xp' && <Star className="h-5 w-5 text-game-xp" />}
                {category === 'topics' && '📚'}
                {category === 'accuracy' && '🎯'}
                {category === 'general' && '🏅'}
                {category} Achievements
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categoryAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={isAchievementUnlocked(achievement)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Achievements;
