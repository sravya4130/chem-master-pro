import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { TutorCard } from '@/components/tutors/TutorCard';

const Tutors = () => {
  const { tutors, selectedTutor, setSelectedTutor } = useApp();

  return (
    <AppLayout title="Your Tutors">
      <div className="p-4 pb-8">
        {/* Current Tutor */}
        {selectedTutor && (
          <div className="bg-primary/10 rounded-2xl p-4 mb-6 border-2 border-primary/30">
            <p className="text-sm text-muted-foreground mb-2">Currently Learning With</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-3xl">
                {selectedTutor.emoji}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedTutor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTutor.specialty}</p>
              </div>
            </div>
          </div>
        )}

        {/* All Tutors */}
        <h2 className="font-bold text-lg mb-4">All Tutors</h2>
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

        <p className="text-sm text-muted-foreground text-center mt-6">
          Tap a tutor to select them as your learning companion.
          <br />
          You can edit tutor names in Settings.
        </p>
      </div>
    </AppLayout>
  );
};

export default Tutors;
