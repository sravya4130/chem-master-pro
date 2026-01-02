import { Play, Pause, Square, FastForward, Rewind, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SpeechControlsProps {
  isSpeaking: boolean;
  isPaused: boolean;
  speedMultiplier: number;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onIncreaseSpeed: () => void;
  onDecreaseSpeed: () => void;
  className?: string;
  compact?: boolean;
}

export const SpeechControls = ({
  isSpeaking,
  isPaused,
  speedMultiplier,
  progress,
  onPlay,
  onPause,
  onResume,
  onStop,
  onIncreaseSpeed,
  onDecreaseSpeed,
  className,
  compact = false,
}: SpeechControlsProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-2 p-3 rounded-xl bg-card/80 backdrop-blur-md border border-border/50",
      className
    )}>
      <div className="flex items-center gap-2">
        {/* Speed decrease */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDecreaseSpeed}
          disabled={speedMultiplier <= 0.5}
          className="h-8 w-8"
          title="Slow down"
        >
          <Rewind className="h-4 w-4" />
        </Button>

        {/* Play/Pause */}
        {!isSpeaking ? (
          <Button
            variant="default"
            size="icon"
            onClick={onPlay}
            className="h-10 w-10 rounded-full"
            title="Play"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
        ) : isPaused ? (
          <Button
            variant="default"
            size="icon"
            onClick={onResume}
            className="h-10 w-10 rounded-full"
            title="Resume"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            onClick={onPause}
            className="h-10 w-10 rounded-full"
            title="Pause"
          >
            <Pause className="h-5 w-5" />
          </Button>
        )}

        {/* Stop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onStop}
          disabled={!isSpeaking && !isPaused}
          className="h-8 w-8"
          title="Stop"
        >
          <Square className="h-4 w-4" />
        </Button>

        {/* Speed increase */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onIncreaseSpeed}
          disabled={speedMultiplier >= 2.0}
          className="h-8 w-8"
          title="Speed up"
        >
          <FastForward className="h-4 w-4" />
        </Button>

        {/* Speed indicator */}
        <div className="flex items-center gap-1 ml-2 px-2 py-1 rounded-md bg-secondary text-xs font-medium">
          <Volume2 className="h-3 w-3" />
          <span>{speedMultiplier.toFixed(2)}x</span>
        </div>
      </div>

      {/* Progress bar */}
      {!compact && (isSpeaking || isPaused || progress > 0) && (
        <Progress value={progress} className="h-1.5" />
      )}
    </div>
  );
};
