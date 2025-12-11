import { useNavigate, useParams } from 'react-router-dom';
import LearnIUPAC from './LearnIUPAC';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

const Learn = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  // Route to specific topic pages
  if (topicId === 'iupac') {
    return <LearnIUPAC />;
  }

  // Coming soon page for other topics
  return (
    <AppLayout title="Coming Soon">
      <div className="p-4 pb-8 flex flex-col items-center justify-center min-h-[calc(100vh-56px)]">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
        <p className="text-muted-foreground text-center mb-6">
          This topic is under development. Check back soon!
        </p>
        <Button onClick={() => navigate('/topics')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Topics
        </Button>
      </div>
    </AppLayout>
  );
};

export default Learn;
