import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { FlaskConical, BookOpen, Trophy, Flame, Target, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { selectedTutor, userProgress, selectedSubject } = useApp();

  // Show welcome/setup flow if no subject or tutor selected
  if (!selectedSubject) {
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
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Home">
      <div className="p-4 space-y-6 pb-8">
        {/* Welcome Card */}
        <div className="gradient-hero rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            {selectedTutor && (
              <div className="w-16 h-16 rounded-full bg-card/20 flex items-center justify-center text-3xl">
                {selectedTutor.emoji}
              </div>
            )}
            <div>
              <p className="opacity-80">Welcome back!</p>
              <h2 className="text-2xl font-bold">
                {selectedTutor ? `Learning with ${selectedTutor.name}` : 'Ready to learn?'}
              </h2>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <Flame className="h-6 w-6 text-game-streak mx-auto mb-2" />
            <p className="text-2xl font-bold">{userProgress.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <Trophy className="h-6 w-6 text-game-xp mx-auto mb-2" />
            <p className="text-2xl font-bold">{userProgress.xp}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <Target className="h-6 w-6 text-game-level mx-auto mb-2" />
            <p className="text-2xl font-bold">{userProgress.level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Continue Learning</h3>
          
          <Button
            onClick={() => navigate('/topics')}
            className="w-full h-auto p-4 justify-start gap-4 bg-topic-blue hover:bg-topic-blue/90"
          >
            <BookOpen className="h-6 w-6" />
            <div className="text-left">
              <p className="font-bold">Chemistry Topics</p>
              <p className="text-sm opacity-80">3 topics available</p>
            </div>
          </Button>

          {!selectedTutor && (
            <Button
              onClick={() => navigate('/tutors')}
              variant="outline"
              className="w-full h-auto p-4 justify-start gap-4"
            >
              <span className="text-2xl">👩‍🏫</span>
              <div className="text-left">
                <p className="font-bold">Choose a Tutor</p>
                <p className="text-sm text-muted-foreground">Select your learning companion</p>
              </div>
            </Button>
          )}
        </div>

        {/* Daily Goal */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Daily Goal</h3>
            <span className="text-sm text-muted-foreground">{Math.min(userProgress.xp, 50)}/50 XP</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${Math.min((userProgress.xp / 50) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {userProgress.xp >= 50 
              ? '🎉 Goal completed! Keep going!'
              : `Earn ${50 - Math.min(userProgress.xp, 50)} more XP to reach your daily goal`
            }
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
