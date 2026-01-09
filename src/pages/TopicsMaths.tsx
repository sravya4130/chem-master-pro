import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TopicCard } from '@/components/topics/TopicCard';
import { Circle, ArrowLeftRight, Triangle } from 'lucide-react';

const TopicsMaths = () => {
  const navigate = useNavigate();
  const { userProgress, selectedTutor } = useApp();

  const topics = [
    {
      id: 'sets',
      title: 'Sets',
      description: 'Set operations, subsets, Venn diagrams & more',
      icon: <Circle className="h-7 w-7 text-primary-foreground" />,
      color: 'purple' as const,
      progress: userProgress.completedTopics.includes('sets') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('sets'),
    },
    {
      id: 'relations-functions',
      title: 'Relations & Functions',
      description: 'Cartesian products, types of relations & functions',
      icon: <ArrowLeftRight className="h-7 w-7 text-primary-foreground" />,
      color: 'orange' as const,
      progress: userProgress.completedTopics.includes('relations-functions') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('relations-functions'),
    },
    {
      id: 'trigonometry',
      title: 'Trigonometric Functions',
      description: 'Ratios, identities, graphs & standard angles',
      icon: <Triangle className="h-7 w-7 text-primary-foreground" />,
      color: 'cyan' as const,
      progress: userProgress.completedTopics.includes('trigonometry') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('trigonometry'),
    },
  ];

  return (
    <AppLayout title="Mathematics Topics">
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
                "Mathematics is the language of the universe! Let's explore sets, functions, and trigonometry together!"
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
              onClick={() => navigate(`/learn/maths/${topic.id}`)}
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

export default TopicsMaths;
