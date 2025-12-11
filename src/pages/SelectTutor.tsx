import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TutorCard } from '@/components/tutors/TutorCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SelectTutor = () => {
  const navigate = useNavigate();
  const { tutors, selectedTutor, setSelectedTutor } = useApp();

  const handleContinue = () => {
    if (selectedTutor) {
      navigate('/topics');
    }
  };

  return (
    <AppLayout showHeader={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="gradient-hero px-6 py-8 text-primary-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/select-subject')}
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Choose Your Tutor</h1>
          <p className="opacity-80 mt-2">Pick your learning companion</p>
        </div>

        {/* Tutors Grid */}
        <div className="p-6 -mt-4">
          <div className="grid grid-cols-2 gap-4">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                isSelected={selectedTutor?.id === tutor.id}
                onClick={() => setSelectedTutor(tutor)}
              />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
          <Button
            onClick={handleContinue}
            disabled={!selectedTutor}
            className="w-full h-14 text-lg font-bold gap-2"
          >
            Continue with {selectedTutor?.name || 'Tutor'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SelectTutor;
