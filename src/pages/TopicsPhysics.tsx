import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TopicCard } from '@/components/topics/TopicCard';
import { Ruler, MoveRight } from 'lucide-react';

const TopicsPhysics = () => {
  const navigate = useNavigate();
  const { userProgress, selectedTutor } = useApp();

  const topics = [
    {
      id: 'units-dimensions',
      title: 'Units & Dimensions',
      description: 'Physical quantities, dimensional formulas & analysis',
      icon: <Ruler className="h-7 w-7 text-primary-foreground" />,
      color: 'yellow' as const,
      progress: userProgress.completedTopics.includes('units-dimensions') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('units-dimensions'),
    },
    {
      id: 'motion-in-plane',
      title: 'Motion in a Plane',
      description: 'Projectile motion, time of flight, range & height',
      icon: <MoveRight className="h-7 w-7 text-primary-foreground" />,
      color: 'red' as const,
      progress: userProgress.completedTopics.includes('motion-in-plane') ? 100 : 0,
      isCompleted: userProgress.completedTopics.includes('motion-in-plane'),
    },
  ];

  return (
    <AppLayout title="Physics Topics">
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
                "Physics explains how the universe works! Let's master dimensions and projectile motion together!"
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
              onClick={() => navigate(`/learn/physics/${topic.id}`)}
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

export default TopicsPhysics;
