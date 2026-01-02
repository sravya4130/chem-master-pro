import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { FlaskConical, Trophy, Flame, ChevronRight, Sparkles } from 'lucide-react';
import { ChemistryScene } from '@/components/3d/ChemistryScene';
import { ProgressDashboard } from '@/components/dashboard/ProgressDashboard';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const Index = () => {
  const navigate = useNavigate();
  const { selectedTutor, userProgress } = useApp();
  const { playClick, playWhoosh } = useSoundEffects();

  const handleNavigate = (path: string) => {
    playClick();
    playWhoosh();
    navigate(path);
  };

  return (
    <AppLayout showHeader={false} hideBackground={true}>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* 3D Chemistry Background */}
        <ChemistryScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background pointer-events-none" />
        
        {/* Hero Section */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 text-foreground z-10">
          <div className="relative">
            <div className="text-7xl mb-6 animate-bounce-in drop-shadow-2xl">🧪</div>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-game-xp animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-primary via-topic-blue to-primary bg-clip-text text-transparent drop-shadow-lg">
            ChemLearn
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-sm backdrop-blur-sm bg-background/30 rounded-full px-6 py-2">
            Master Chemistry for JEE with interactive games!
          </p>
          
          {/* Show current stats if user has progress */}
          {userProgress.xp > 0 && (
            <div className="flex gap-4 mt-6">
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
        <div className="relative bg-background/95 backdrop-blur-xl rounded-t-[2rem] -mt-6 p-6 animate-slide-up z-20 border-t border-border/50 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">Choose Your Subject</h2>
          
          <button
            onClick={() => handleNavigate('/select-subject')}
            className="w-full p-6 rounded-2xl border-2 border-primary bg-gradient-to-r from-primary/10 to-topic-blue/10 hover:from-primary/20 hover:to-topic-blue/20 transition-all hover:scale-[1.02] hover:shadow-game text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-topic-blue flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FlaskConical className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Chemistry</h3>
                <p className="text-sm text-muted-foreground">3 Topics • Organic & Inorganic</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <div className="mt-4 space-y-3">
            <button
              disabled
              className="w-full p-4 rounded-xl border-2 border-border bg-muted/30 opacity-60 text-left backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-xl">📐</span>
                </div>
                <div>
                  <h3 className="font-semibold">Mathematics</h3>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
              </div>
            </button>
            
            <button
              disabled
              className="w-full p-4 rounded-xl border-2 border-border bg-muted/30 opacity-60 text-left backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-xl">⚛️</span>
                </div>
                <div>
                  <h3 className="font-semibold">Physics</h3>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
              </div>
            </button>
          </div>

          {/* Progress Dashboard */}
          {userProgress.xp > 0 && (
            <div className="mt-6">
              <ProgressDashboard />
            </div>
          )}

          {/* Quick access to continue learning if tutor is selected */}
          {selectedTutor && (
            <div className="mt-6 p-4 glass-card rounded-2xl">
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
