import { Tutor } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { TutorAvatar3D } from './TutorAvatar3D';

interface TutorCardProps {
  tutor: Tutor;
  isSelected: boolean;
  onClick: () => void;
  isSpeaking?: boolean;
}

const colorHexMap: Record<string, string> = {
  'tutor-alex': '#6366f1',
  'tutor-david': '#22c55e',
  'tutor-sravya': '#f43f5e',
  'tutor-olivia': '#f59e0b',
  'tutor-mermi': '#06b6d4',
  'tutor-ogneson': '#8b5cf6',
};

export const TutorCard = ({ tutor, isSelected, onClick, isSpeaking = false }: TutorCardProps) => {
  const avatarColor = colorHexMap[tutor.color] || '#6366f1';

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl border-2 transition-all duration-300 w-full text-left backdrop-blur-md',
        'hover:scale-105 hover:shadow-card-hover',
        isSelected 
          ? 'border-primary bg-primary/10 shadow-game' 
          : 'border-border bg-card/80 hover:border-primary/50'
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div className="mb-4">
        <TutorAvatar3D 
          color={avatarColor} 
          isSelected={isSelected} 
          isSpeaking={isSpeaking}
        />
      </div>
      
      <h3 className="font-bold text-lg">{tutor.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{tutor.specialty}</p>
    </button>
  );
};
