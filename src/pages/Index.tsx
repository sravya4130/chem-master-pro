import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { useMistakes } from '@/contexts/MistakeContext';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ProgressDashboard } from '@/components/dashboard/ProgressDashboard';
import { Beaker, Calculator, Atom, Sparkles, Flame, Trophy, AlertTriangle, ChevronRight, Star } from 'lucide-react';
import { ChemistryScene } from '@/components/3d/ChemistryScene';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
  color: string;
  onClick: () => void;
  progress?: number;
}

const SubjectCard = ({ title, description, icon, emoji, color, onClick, progress = 0 }: SubjectCardProps) => (
  <button
    onClick={onClick}
    className="w-full bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-left group border border-border/30"
  >
    <div className="flex items-start gap-4">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </button>
);

const Index = () => {
  const navigate = useNavigate();
  const { setSelectedSubject, userProgress, selectedTutor } = useApp();
  const { getTotalMistakeCount } = useMistakes();
  const { playClick } = useSoundEffects();
  
  const mistakeCount = getTotalMistakeCount();

  const handleNavigate = (subject: string, path: string) => {
    playClick();
    setSelectedSubject(subject);
    navigate('/select-tutor');
  };

  const subjects = [
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Master organic chemistry, hybridisation, and IUPAC nomenclature',
      icon: <Beaker className="h-7 w-7 text-white" />,
      emoji: '🧪',
      color: 'bg-emerald-500',
      path: '/topics',
      progress: Math.round((userProgress.completedTopics.filter(t => ['iupac', 'hybridisation', 'sigma-pi'].includes(t)).length / 3) * 100),
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Learn mechanics, motion in a plane, and dimensional analysis',
      icon: <Atom className="h-7 w-7 text-white" />,
      emoji: '⚛️',
      color: 'bg-yellow-500',
      path: '/topics/physics',
      progress: Math.round((userProgress.completedTopics.filter(t => ['units-dimensions', 'motion-plane'].includes(t)).length / 2) * 100),
    },
    {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Explore sets, relations, functions, and trigonometry',
      icon: <Calculator className="h-7 w-7 text-white" />,
      emoji: '📐',
      color: 'bg-cyan-500',
      path: '/topics/maths',
      progress: Math.round((userProgress.completedTopics.filter(t => ['sets', 'relations', 'trigonometry'].includes(t)).length / 3) * 100),
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-topic-blue to-topic-purple flex items-center justify-center shadow-xl">
              <Beaker className="h-10 w-10 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-game-xp animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-center mb-2 mt-4 bg-gradient-to-r from-primary via-topic-blue to-topic-purple bg-clip-text text-transparent drop-shadow-lg">
            CHEMLEARN
          </h1>
          <p className="text-base text-center text-muted-foreground max-w-sm backdrop-blur-sm bg-background/30 rounded-full px-4 py-1.5">
            Master JEE with interactive games!
          </p>
        </div>

        {/* Main Content */}
        <div className="relative bg-background/95 backdrop-blur-xl rounded-t-[2rem] -mt-4 p-5 animate-slide-up z-20 border-t border-border/50 shadow-2xl">
          {/* Stats Row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <Flame className="h-5 w-5 text-game-streak" />
              <span className="font-bold">{userProgress.streak}</span>
              <span className="text-xs text-muted-foreground">streak</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <Trophy className="h-5 w-5 text-game-xp" />
              <span className="font-bold">{userProgress.xp}</span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-bold">Lv.{userProgress.level}</span>
            </div>
          </div>

          {/* Mistakes Alert */}
          {mistakeCount > 0 && (
            <button
              onClick={() => navigate('/mistakes')}
              className="w-full mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4 flex items-center gap-4 hover:from-orange-500/30 hover:to-red-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-orange-400">Mistakes to Review</h3>
                <p className="text-sm text-muted-foreground">{mistakeCount} questions need practice</p>
              </div>
              <ChevronRight className="h-5 w-5 text-orange-400" />
            </button>
          )}

          {/* Subject Cards */}
          <h2 className="text-lg font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Select a Subject
          </h2>
          <div className="space-y-4 mb-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                title={subject.title}
                description={subject.description}
                icon={subject.icon}
                emoji={subject.emoji}
                color={subject.color}
                progress={subject.progress}
                onClick={() => handleNavigate(subject.id, subject.path)}
              />
            ))}
          </div>

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* Tutor Section */}
          {selectedTutor && (
            <div className="mt-6 bg-card rounded-2xl p-4 shadow-card border border-border/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                  {selectedTutor.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Your Tutor</p>
                  <p className="font-bold text-lg">{selectedTutor.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedTutor.specialty}</p>
                </div>
                <button
                  onClick={() => navigate('/tutors')}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
