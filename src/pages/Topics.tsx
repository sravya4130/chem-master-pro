import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TopicCard } from '@/components/topics/TopicCard';
import { Atom, Link2, FileText } from 'lucide-react';

const Topics = () => {
  const navigate = useNavigate();
  const { userProgress, selectedTutor } = useApp();

  const topics = [
    {
      id: 'hybridisation',
      title: 'Hybridisation',
      description: 'sp, sp², sp³, sp³d, sp³d² orbitals & quantum numbers',
      icon: <Atom className="h-7 w-7 text-primary-foreground" />,
      color: 'blue' as const,
      progress: userProgress.completedTopics.includes('hybridisation') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('hybridisation'),
    },
    {
      id: 'sigma-pi-bonds',
      title: 'Sigma & Pi Bonds',
      description: 'Identify sigma and pi bonds in molecules',
      icon: <Link2 className="h-7 w-7 text-primary-foreground" />,
      color: 'green' as const,
      progress: userProgress.completedTopics.includes('sigma-pi-bonds') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('sigma-pi-bonds'),
    },
    {
      id: 'iupac',
      title: 'IUPAC Nomenclature',
      description: 'Learn to name organic compounds correctly',
      icon: <FileText className="h-7 w-7 text-primary-foreground" />,
      color: 'pink' as const,
      progress: userProgress.completedTopics.includes('iupac') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('iupac'),
    },
  ];

  return (
    <AppLayout title="Chemistry Topics">
      <div className="p-4 pb-8">
        {/* Tutor Message */}
        {selectedTutor && (
          <div className="bg-card rounded-2xl p-4 mb-6 shadow-card flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
              {selectedTutor.emoji}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{selectedTutor.name}</p>
              <p className="text-sm text-muted-foreground">
                "Hey! Let's start with these Chemistry topics. Pick one to begin learning!"
              </p>
            </div>
          </div>
        )}

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              {...topic}
              onClick={() => navigate(`/learn/${topic.id}`)}
            />
          ))}
        </div>

        {/* More Topics Coming */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">More topics coming soon!</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Topics;
