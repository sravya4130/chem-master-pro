import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean;
}

export const GameTimer = ({ duration, onTimeUp, isRunning }: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / duration) * 100;

  const isLow = percentage < 25;
  const isMedium = percentage >= 25 && percentage < 50;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-colors',
        isLow ? 'bg-destructive text-destructive-foreground animate-pulse' :
        isMedium ? 'bg-warning text-warning-foreground' :
        'bg-secondary text-foreground'
      )}>
        <Clock className="h-5 w-5" />
        <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
      </div>
      
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-1000',
            isLow ? 'bg-destructive' :
            isMedium ? 'bg-warning' :
            'bg-primary'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
