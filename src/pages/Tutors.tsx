import { AppLayout } from '@/components/layout/AppLayout';
import { useApp, Tutor } from '@/contexts/AppContext';
import { TutorCard } from '@/components/tutors/TutorCard';
import { useSpeech } from '@/hooks/useSpeech';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { TutorAvatar3D } from '@/components/tutors/TutorAvatar3D';

const tutorMessages: Record<string, string> = {
  alex: "Hi! I'm Alex. Chemistry is amazing, let me show you!",
  david: "Hey! I'm David. Let's conquer chemistry together!",
  sravya: "Hello! I'm Sravya. I'll help you master every concept!",
  olivia: "Hi there! I'm Olivia. Organic chemistry is my passion!",
  mermi: "Greetings! I'm Mermi. Chemical reactions await us!",
  ogneson: "Welcome! I'm Ogneson. JEE chemistry made easy!",
};

const colorHexMap: Record<string, string> = {
  'tutor-alex': '#6366f1',
  'tutor-david': '#22c55e',
  'tutor-sravya': '#f43f5e',
  'tutor-olivia': '#f59e0b',
  'tutor-mermi': '#06b6d4',
  'tutor-ogneson': '#8b5cf6',
};

const Tutors = () => {
  const { tutors, selectedTutor, setSelectedTutor } = useApp();
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const [speakingTutorId, setSpeakingTutorId] = useState<string | null>(null);

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setSpeakingTutorId(tutor.id);
    const message = tutorMessages[tutor.id] || `Hello! I'm ${tutor.name}. Nice to meet you!`;
    speak(message);
  };

  const handleSpeakAgain = () => {
    if (selectedTutor) {
      setSpeakingTutorId(selectedTutor.id);
      const message = tutorMessages[selectedTutor.id] || `Hello! I'm ${selectedTutor.name}!`;
      speak(message);
    }
  };

  useEffect(() => {
    if (!isSpeaking) {
      setSpeakingTutorId(null);
    }
  }, [isSpeaking]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <AppLayout title="Your Tutors">
      <div className="p-4 pb-8">
        {/* Current Tutor */}
        {selectedTutor && (
          <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-4 mb-6 border-2 border-primary/30">
            <p className="text-sm text-muted-foreground mb-2">Currently Learning With</p>
            <div className="flex items-center gap-4">
              <TutorAvatar3D 
                color={colorHexMap[selectedTutor.color] || '#6366f1'}
                isSelected={true}
                isSpeaking={isSpeaking && speakingTutorId === selectedTutor.id}
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{selectedTutor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTutor.specialty}</p>
              </div>
              {isSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSpeakAgain}
                  className={isSpeaking && speakingTutorId === selectedTutor.id ? "text-primary animate-pulse" : ""}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
            </div>
            {isSpeaking && speakingTutorId === selectedTutor.id && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-muted-foreground">Speaking...</span>
              </div>
            )}
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
              onClick={() => handleTutorClick(tutor)}
              isSpeaking={isSpeaking && speakingTutorId === tutor.id}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Tap a tutor to select them and hear their voice.
          <br />
          You can edit tutor names in Settings.
        </p>
      </div>
    </AppLayout>
  );
};

export default Tutors;
