import { cn } from '@/lib/utils';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { ReactNode } from 'react';

interface TopicCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'pink';
  progress: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  onClick: () => void;
}

const colorMap = {
  blue: 'bg-topic-blue',
  green: 'bg-topic-green',
  pink: 'bg-topic-pink',
};

const borderColorMap = {
  blue: 'border-topic-blue/30 hover:border-topic-blue',
  green: 'border-topic-green/30 hover:border-topic-green',
  pink: 'border-topic-pink/30 hover:border-topic-pink',
};

export const TopicCard = ({
  title,
  description,
  icon,
  color,
  progress,
  isLocked = false,
  isCompleted = false,
  onClick,
}: TopicCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        'relative p-6 rounded-2xl border-2 transition-all duration-300 w-full text-left',
        'hover:shadow-card-hover',
        isLocked 
          ? 'opacity-50 cursor-not-allowed bg-muted border-border' 
          : cn('bg-card', borderColorMap[color]),
        !isLocked && 'hover:scale-[1.02]'
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
        {isCompleted && <CheckCircle className="h-5 w-5 text-success" />}
        {!isLocked && !isCompleted && (
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', colorMap[color])}>
            <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
          </div>
        )}
      </div>

      {/* Icon */}
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
        colorMap[color]
      )}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-500', colorMap[color])}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{progress}% Complete</p>
    </button>
  );
};
