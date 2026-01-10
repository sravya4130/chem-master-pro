import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { FlaskConical, Trophy, Flame, ChevronRight, Sparkles, Calculator, Atom } from 'lucide-react';
import { ChemistryScene } from '@/components/3d/ChemistryScene';
import { ProgressDashboard } from '@/components/dashboard/ProgressDashboard';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const SubjectCard = ({ 
  title, 
  description, 
  icon: Icon, 
  emoji, 
  color, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  emoji: string;
  color: string; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-5 rounded-2xl border-2 border-${color}/30 bg-gradient-to-br from-${color}/10 via-background to-${color}/5 hover:from-${color}/20 hover:via-${color}/10 hover:to-${color}/15 transition-all hover:scale-[1.02] hover:shadow-lg text-left group relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
    <div className="flex items-center gap-4 relative z-10">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${color} to-${color}/70 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className={`h-5 w-5 text-${color} group-hover:translate-x-1 transition-transform`} />
    </div>
  </button>
);

const Index = () => {
  const navigate = useNavigate();
  const { selectedTutor, userProgress } = useApp();
  const { playClick, playWhoosh } = useSoundEffects();

  const handleNavigate = (path: string) => {
    playClick();
    playWhoosh();
    navigate(path);
  };

  const subjects = [
    {
      title: 'Chemistry',
      description: '3 Topics • Organic & Inorganic',
      icon: FlaskConical,
      emoji: '🧪',
      color: 'primary',
      path: '/topics',
    },
    {
      title: 'Physics',
      description: '2 Topics • Mechanics & Dimensions',
      icon: Atom,
      emoji: '⚛️',
      color: 'topic-red',
      path: '/topics/physics',
    },
    {
      title: 'Mathematics',
      description: '3 Topics • Sets, Functions & Trig',
      icon: Calculator,
      emoji: '📐',
      color: 'topic-purple',
      path: '/topics/maths',
    },
  ];

  return (
    <AppLayout showHeader={false} hideBackground={true}>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* 3D Chemistry Background */}
        <ChemistryScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background pointer-events-none" />
        
        {/* Hero Section */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-8 text-foreground z-10">
          <div className="relative">
            <div className="text-6xl mb-4 animate-bounce-in drop-shadow-2xl">🎓</div>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-game-xp animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-center mb-2 bg-gradient-to-r from-primary via-topic-blue to-topic-purple bg-clip-text text-transparent drop-shadow-lg">
            LearnHub
          </h1>
          <p className="text-base text-center text-muted-foreground max-w-sm backdrop-blur-sm bg-background/30 rounded-full px-4 py-1.5">
            Master JEE with interactive games!
          </p>
          
          {/* Show current stats if user has progress */}
          {userProgress.xp > 0 && (
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2 shadow-game">
                <Flame className="h-5 w-5 text-game-streak" />
                <span className="font-bold">{userProgress.streak}</span>
              </div>
              <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2 shadow-game">
                <Trophy className="h-5 w-5 text-game-xp" />
                <span className="font-bold">{userProgress.xp} XP</span>
              </div>
            </div>
          )}
        </div>

        {/* Subject Selection */}
        <div className="relative bg-background/95 backdrop-blur-xl rounded-t-[2rem] -mt-4 p-5 animate-slide-up z-20 border-t border-border/50 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Your Subject
          </h2>
          
          <div className="space-y-3">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                emoji={subject.emoji}
                color={subject.color}
                onClick={() => handleNavigate(subject.path)}
              />
            ))}
          </div>

          {/* Progress Dashboard */}
          {userProgress.xp > 0 && (
            <div className="mt-5">
              <ProgressDashboard />
            </div>
          )}

          {/* Quick access to continue learning if tutor is selected */}
          {selectedTutor && (
            <div className="mt-5 p-4 glass-card rounded-2xl">
              <p className="text-sm text-muted-foreground mb-2">Continue learning with</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedTutor.emoji}</span>
                  <span className="font-semibold">{selectedTutor.name}</span>
                </div>
                <Button onClick={() => handleNavigate('/topics')} size="sm" className="shadow-game">
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
