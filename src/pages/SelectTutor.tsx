import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp, Tutor } from '@/contexts/AppContext';
import { TutorCard } from '@/components/tutors/TutorCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

// Helper for cn
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const tutorMessages: Record<string, Record<string, string>> = {
  chemistry: {
    alex: "Welcome! I am Alex. I'll make chemistry fun and easy for you. Let's explore molecules together!",
    david: "Hey there! I'm David. Together we'll conquer every chemistry concept. Ready to learn?",
    sravya: "Hi! I'm Sravya. I'll guide you through organic chemistry and help you master every reaction.",
    olivia: "Hello! I'm Olivia. Let's make organic chemistry your strength. I'm here to help!",
    mermi: "Greetings! I'm Mermi. Chemical reactions are my specialty. Let's begin our adventure!",
    ogneson: "Welcome learner! I'm Ogneson. With my help, you'll ace JEE chemistry. Let's get started!",
  },
  physics: {
    alex: "Hey! I'm Alex. Physics is all about understanding the world. Let's decode motion and forces!",
    david: "Hi there! I'm David. Physics made simple is my motto. Ready to master mechanics?",
    sravya: "Hello! I'm Sravya. From projectiles to dimensions, I'll make physics crystal clear!",
    olivia: "Welcome! I'm Olivia. Let's tackle physics formulas and concepts together!",
    mermi: "Greetings! I'm Mermi. Laws of physics are fascinating. Let's explore them!",
    ogneson: "Welcome! I'm Ogneson, your physics professor. Dimensions, motion - we'll master it all!",
  },
  mathematics: {
    alex: "Hey! I'm Alex. Math is the language of universe. Let's solve problems together!",
    david: "Hi! I'm David. From trigonometry to calculus, I'll guide you step by step!",
    sravya: "Hello! I'm Sravya. Math is fun when you understand it. Let's begin!",
    olivia: "Welcome! I'm Olivia. Formulas, equations, proofs - we'll conquer them all!",
    mermi: "Greetings! I'm Mermi. Numbers are my friends. Let's make them yours too!",
    ogneson: "Welcome! I'm Ogneson. Mathematics is beautiful. Let me show you why!",
  },
};

const getDefaultMessage = (tutorName: string, subject: string) => {
  const subjectText = subject === 'mathematics' ? 'maths' : subject;
  return `Welcome! I am ${tutorName}. I'll guide you through ${subjectText} and help you master every concept.`;
};

const SelectTutor = () => {
  const navigate = useNavigate();
  const { tutors, selectedTutor, setSelectedTutor, selectedSubject } = useApp();
  const [showMessage, setShowMessage] = useState(false);
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const getTopicsPath = () => {
    switch (selectedSubject) {
      case 'physics':
        return '/topics/physics';
      case 'mathematics':
        return '/topics/maths';
      case 'chemistry':
      default:
        return '/topics';
    }
  };

  const handleContinue = () => {
    if (selectedTutor) {
      stop();
      navigate(getTopicsPath());
    }
  };

  const getTutorMessage = (tutor: Tutor) => {
    const subject = selectedSubject || 'chemistry';
    return tutorMessages[subject]?.[tutor.id] || getDefaultMessage(tutor.name, subject);
  };

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowMessage(true);
    speak(getTutorMessage(tutor));
  };

  const handleSpeakAgain = () => {
    if (selectedTutor) {
      speak(getTutorMessage(selectedTutor));
    }
  };

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <AppLayout showHeader={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="gradient-hero px-6 py-8 text-primary-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              stop();
              navigate('/select-subject');
            }}
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Choose Your Tutor</h1>
          <p className="opacity-80 mt-2">Pick your 3D learning companion</p>
        </div>

        {/* Tutors Grid */}
        <div className="p-6 -mt-4">
          <div className="grid grid-cols-2 gap-4">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                isSelected={selectedTutor?.id === tutor.id}
                onClick={() => handleTutorClick(tutor)}
                isSpeaking={isSpeaking && selectedTutor?.id === tutor.id}
              />
            ))}
          </div>
        </div>

        {/* Tutor Message Box */}
        {showMessage && selectedTutor && (
          <div className="mx-6 mb-24 bg-card rounded-2xl p-4 shadow-card animate-slide-up">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-semibold mb-1">
                  Welcome, I am {selectedTutor.name}! 👋
                </p>
                <p className="text-sm text-muted-foreground">
                  {getTutorMessage(selectedTutor)}
                </p>
              </div>
              {isSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSpeakAgain}
                  className={cn(
                    "shrink-0",
                    isSpeaking && "text-primary animate-pulse"
                  )}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
            </div>
            {isSpeaking && (
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
