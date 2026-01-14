import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Beaker, Calculator, Atom, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  topicsCount: number;
  completedCount: number;
  onClick: () => void;
}

const SubjectCard = ({ title, description, icon, color, topicsCount, completedCount, onClick }: SubjectCardProps) => {
  const progress = (completedCount / topicsCount) * 100;
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-left group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold">{title}</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{completedCount} of {topicsCount} topics</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const Subjects = () => {
  const navigate = useNavigate();
  const { setSelectedSubject, userProgress } = useApp();
  const { playClick } = useSoundEffects();

  const handleSelectSubject = (subject: string, path: string) => {
    playClick();
    setSelectedSubject(subject);
    navigate(path);
  };

  const subjects = [
    {
      id: 'chemistry',
      title: 'Chemistry',
      description: 'Master organic chemistry, bonding, and IUPAC nomenclature',
      icon: <Beaker className="h-8 w-8 text-white" />,
      color: 'bg-emerald-500',
      topicsCount: 3,
      completedCount: userProgress.completedTopics.filter(t => ['iupac', 'hybridisation', 'sigma-pi'].includes(t)).length,
      path: '/topics',
    },
    {
      id: 'physics',
      title: 'Physics',
      description: 'Learn mechanics, motion, and dimensional analysis',
      icon: <Atom className="h-8 w-8 text-white" />,
      color: 'bg-yellow-500',
      topicsCount: 2,
      completedCount: userProgress.completedTopics.filter(t => ['units-dimensions', 'motion-plane'].includes(t)).length,
      path: '/topics/physics',
    },
    {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Explore sets, functions, and trigonometry',
      icon: <Calculator className="h-8 w-8 text-white" />,
      color: 'bg-cyan-500',
      topicsCount: 3,
      completedCount: userProgress.completedTopics.filter(t => ['sets', 'relations', 'trigonometry'].includes(t)).length,
      path: '/topics/maths',
    },
  ];

  return (
    <AppLayout title="Select Subject">
      <div className="p-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Choose Your Subject</h1>
          <p className="text-muted-foreground">Select a subject to start learning</p>
        </div>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              color={subject.color}
              topicsCount={subject.topicsCount}
              completedCount={subject.completedCount}
              onClick={() => handleSelectSubject(subject.id, subject.path)}
            />
          ))}
        </div>

        <div className="mt-8 p-4 bg-secondary/50 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Your Progress</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            You've completed {userProgress.completedTopics.length} topics across all subjects. 
            Keep up the great work!
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Subjects;
