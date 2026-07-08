import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TopicCard } from '@/components/topics/TopicCard';
import { Atom, Link2, FileText, FlaskConical, Grid3x3, Beaker } from 'lucide-react';

const Topics = () => {
  const navigate = useNavigate();
  const { userProgress, selectedTutor } = useApp();

  const topics = [
    {
      id: 'basic-concepts',
      title: 'Some Basic Concepts of Chemistry',
      description: 'Matter, Mole, Solutions, Molarity & more',
      icon: <FlaskConical className="h-7 w-7 text-primary-foreground" />,
      color: 'pink' as const,
      progress: userProgress.completedTopics.includes('basic-concepts') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('basic-concepts'),
    },
    {
      id: 'periodic-table',
      title: 'Interactive Periodic Table',
      description: 'Explore all 118 elements with AI voice tutor',
      icon: <Grid3x3 className="h-7 w-7 text-primary-foreground" />,
      color: 'purple' as const,
      progress: userProgress.completedTopics.includes('periodic-table') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('periodic-table'),
    },
    {
      id: 'organic-chemistry',
      title: 'Organic Chemistry Laboratory',
      description: '17 chapters · 16 functional groups · animated reaction mechanisms',
      icon: <Beaker className="h-7 w-7 text-primary-foreground" />,
      color: 'orange' as const,
      progress: userProgress.completedTopics.includes('organic-chemistry') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('organic-chemistry'),
    },
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
          <div className="bg-card/80 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-card flex items-start gap-3">
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
              onClick={() => navigate(
                topic.id === 'periodic-table' ? '/periodic-table'
                : topic.id === 'organic-chemistry' ? '/organic-chemistry'
                : `/learn/${topic.id}`
              )}
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
