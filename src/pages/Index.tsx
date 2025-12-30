import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { FlaskConical, Trophy, Flame, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { selectedTutor, userProgress } = useApp();

  // Home always shows the subject selection / main menu
  return (
    <AppLayout showHeader={false}>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="gradient-hero flex-1 flex flex-col items-center justify-center px-6 py-12 text-primary-foreground">
          <div className="text-6xl mb-6 animate-bounce-in">🧪</div>
          <h1 className="text-4xl font-black text-center mb-4">ChemLearn</h1>
          <p className="text-lg text-center opacity-90 max-w-sm">
            Master Chemistry for JEE with interactive games and fun lessons!
          </p>
          
          {/* Show current stats if user has progress */}
          {userProgress.xp > 0 && (
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2">
                <Flame className="h-5 w-5 text-game-streak" />
                <span className="font-bold">{userProgress.streak}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2">
                <Trophy className="h-5 w-5 text-game-xp" />
                <span className="font-bold">{userProgress.xp} XP</span>
              </div>
            </div>
          )}
        </div>

        {/* Subject Selection */}
        <div className="bg-background rounded-t-3xl -mt-6 p-6 animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-center">Choose Your Subject</h2>
          
          <button
            onClick={() => navigate('/select-subject')}
            className="w-full p-6 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all hover:scale-[1.02] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <FlaskConical className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Chemistry</h3>
                <p className="text-sm text-muted-foreground">3 Topics • Organic & Inorganic</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </button>

          <div className="mt-4 space-y-3">
            <button
              disabled
              className="w-full p-4 rounded-xl border-2 border-border bg-muted/50 opacity-50 text-left"
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
              className="w-full p-4 rounded-xl border-2 border-border bg-muted/50 opacity-50 text-left"
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

          {/* Quick access to continue learning if tutor is selected */}
          {selectedTutor && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-2xl">
              <p className="text-sm text-muted-foreground mb-2">Continue learning with</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedTutor.emoji}</span>
                  <span className="font-semibold">{selectedTutor.name}</span>
                </div>
                <Button onClick={() => navigate('/topics')} size="sm">
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
