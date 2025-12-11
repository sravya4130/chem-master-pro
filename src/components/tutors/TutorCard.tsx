import { Tutor } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TutorCardProps {
  tutor: Tutor;
  isSelected: boolean;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  'tutor-alex': 'bg-tutor-alex',
  'tutor-david': 'bg-tutor-david',
  'tutor-sravya': 'bg-tutor-sravya',
  'tutor-olivia': 'bg-tutor-olivia',
  'tutor-mermi': 'bg-tutor-mermi',
  'tutor-ogneson': 'bg-tutor-ogneson',
};

export const TutorCard = ({ tutor, isSelected, onClick }: TutorCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl border-2 transition-all duration-300 w-full text-left',
        'hover:scale-105 hover:shadow-card-hover',
        isSelected 
          ? 'border-primary bg-primary/5 shadow-game' 
          : 'border-border bg-card hover:border-primary/50'
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        'w-16 h-16 rounded-full flex items-center justify-center mb-4',
        colorMap[tutor.color] || 'bg-primary'
      )}>
        <span className="text-3xl">{tutor.emoji}</span>
      </div>
      
      <h3 className="font-bold text-lg">{tutor.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{tutor.specialty}</p>
    </button>
  );
};
