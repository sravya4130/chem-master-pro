import { Achievement, getRarityColor, getRarityBorder } from '@/data/achievementsData';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  onClick?: () => void;
}

export const AchievementBadge = ({ achievement, unlocked, onClick }: AchievementBadgeProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 ${
        unlocked ? 'hover:scale-105' : 'opacity-50 grayscale'
      }`}
    >
      {/* Badge Card */}
      <div
        className={`relative rounded-2xl p-4 border-2 ${
          unlocked ? getRarityBorder(achievement.rarity) : 'border-muted'
        } bg-card shadow-card overflow-hidden`}
      >
        {/* Gradient Background for unlocked badges */}
        {unlocked && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10`}
          />
        )}

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            className={`text-4xl mb-2 ${
              unlocked ? 'animate-bounce-in' : ''
            }`}
          >
            {unlocked ? achievement.icon : <Lock className="h-8 w-8 text-muted-foreground" />}
          </div>

          {/* Name */}
          <h3 className="font-bold text-sm mb-1 line-clamp-1">{achievement.name}</h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {achievement.description}
          </p>

          {/* XP Reward */}
          {unlocked && (
            <div className="mt-2 text-xs font-semibold text-game-xp">
              +{achievement.xpReward} XP
            </div>
          )}
        </div>

        {/* Rarity Label */}
        <div
          className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${
            unlocked
              ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {achievement.rarity}
        </div>

        {/* Locked Overlay */}
        {!unlocked && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Glow effect for legendary badges */}
      {unlocked && achievement.rarity === 'legendary' && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl opacity-30 animate-pulse" />
      )}
    </div>
  );
};
