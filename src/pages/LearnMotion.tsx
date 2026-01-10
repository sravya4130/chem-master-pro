import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';
import { ProjectileAnimation } from '@/components/physics/ProjectileAnimation';
import { FormulaBox } from '@/components/physics/FormulaBox';
import { DerivationStep } from '@/components/physics/DerivationStep';

// Page-based content for motion in a plane
const motionPages = [
  {
    id: 'range',
    title: 'Range of Projectile',
    tutorIntro: "Let's first learn about the Range of a projectile. Watch the animation carefully!",
    definition: "Range (R) is the horizontal distance covered by the projectile from the point of projection to the point where it lands.",
    derivation: [
      { text: "We know that horizontal velocity remains constant...", formula: "vₓ = u cos θ" },
      { text: "The horizontal distance is velocity times time...", formula: "R = vₓ × T" },
      { text: "Time of flight T = 2u sin θ / g, so substituting...", formula: "R = u cos θ × (2u sin θ / g)" },
      { text: "Using the identity 2 sin θ cos θ = sin 2θ...", formula: "R = u² sin 2θ / g" },
    ],
    finalFormula: "R = u² sin 2θ / g",
    example: {
      problem: "A ball is thrown at 20 m/s at 45°. Find the range. (g = 10 m/s²)",
      solution: "R = (20)² × sin(90°) / 10 = 400 × 1 / 10 = 40 m",
    },
    highlight: 'range' as const,
  },
  {
    id: 'height',
    title: 'Maximum Height',
    tutorIntro: "Now let's learn about Maximum Height. This is the highest point the projectile reaches!",
    definition: "Maximum Height (H) is the highest vertical distance reached by the projectile above the point of projection.",
    derivation: [
      { text: "At maximum height, vertical velocity becomes zero...", formula: "vᵧ = 0" },
      { text: "Using v² = u² - 2gh, with v = 0 and u = u sin θ...", formula: "0 = (u sin θ)² - 2gH" },
      { text: "Rearranging for H...", formula: "2gH = u² sin² θ" },
      { text: "Solving for maximum height...", formula: "H = u² sin² θ / 2g" },
    ],
    finalFormula: "H = u² sin² θ / 2g",
    example: {
      problem: "A projectile is launched at 30 m/s at 30°. Find max height. (g = 10 m/s²)",
      solution: "H = (30)² × sin²(30°) / (2×10) = 900 × 0.25 / 20 = 11.25 m",
    },
    highlight: 'height' as const,
  },
  {
    id: 'time',
    title: 'Time of Flight',
    tutorIntro: "Finally, let's understand Time of Flight - how long the projectile stays in the air!",
    definition: "Time of Flight (T) is the total time taken by the projectile from the moment of projection until it returns to the same horizontal level.",
    derivation: [
      { text: "The projectile rises and falls in equal time...", formula: "T = 2 × time to reach max height" },
      { text: "At max height, vᵧ = 0. Using v = u - gt...", formula: "0 = u sin θ - g × t" },
      { text: "Time to reach max height is...", formula: "t = u sin θ / g" },
      { text: "Total time of flight is double this...", formula: "T = 2u sin θ / g" },
    ],
    finalFormula: "T = 2u sin θ / g",
    example: {
      problem: "A ball is projected at 40 m/s at 60°. Find time of flight. (g = 10 m/s²)",
      solution: "T = 2 × 40 × sin(60°) / 10 = 80 × 0.866 / 10 = 6.93 s",
    },
    highlight: 'time' as const,
  },
];

const LearnMotion = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');
  const [currentPage, setCurrentPage] = useState(0);
  const [showDerivation, setShowDerivation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalFormula, setShowFinalFormula] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported, speedMultiplier, increaseSpeed, decreaseSpeed, progress } = useTutorSpeech(selectedTutor);

  const page = motionPages[currentPage];

  useEffect(() => { 
    return () => { stop(); }; 
  }, [stop]);

  useEffect(() => { 
    stop(); 
    setShowDerivation(false);
    setCurrentStep(0);
    setShowFinalFormula(false);
    setShowExample(false);
  }, [currentPage, stop]);

  // Auto-advance derivation steps
  useEffect(() => {
    if (!showDerivation || !page) return;
    
    if (currentStep < page.derivation.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (currentStep === page.derivation.length) {
      const timer = setTimeout(() => setShowFinalFormula(true), 500);
      return () => clearTimeout(timer);
    }
  }, [showDerivation, currentStep, page]);

  useEffect(() => {
    if (showFinalFormula) {
      const timer = setTimeout(() => setShowExample(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showFinalFormula]);

  const getSpeechText = () => {
    if (!page) return '';
    return `${page.tutorIntro} ${page.definition} ${page.derivation.map(d => d.text).join(' ')} The final formula is ${page.finalFormula}. Example: ${page.example.problem}. ${page.example.solution}`;
  };

  const handleAnimationMaxHeight = () => {
    if (page.id === 'height' && selectedTutor) {
      speak("This point represents the maximum height!");
    }
  };

  const startDerivation = () => {
    setShowDerivation(true);
    if (selectedTutor) {
      speak(page.tutorIntro);
    }
  };

  const goToNextPage = () => {
    stop();
    if (currentPage < motionPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      navigate('/game/physics/motion-in-plane');
    }
  };

  const goToPrevPage = () => {
    stop();
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else {
      setMode('intro');
    }
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Motion in a Plane">
        <div className="p-4 pb-8">
          <div className="bg-gradient-to-br from-topic-red to-red-700 rounded-2xl p-6 text-white mb-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl animate-bounce-in">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">Motion in a Plane</h2>
                <p className="opacity-80">Master Projectile Motion</p>
              </div>
            </div>
            {selectedTutor && (
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm">
                  "{selectedTutor.name} here! Projectile motion is one of the most beautiful concepts in physics. 
                  We'll learn about Range, Maximum Height, and Time of Flight step by step with amazing animations!"
                </p>
              </div>
            )}
          </div>

          {/* Preview Animation */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-lg">Preview: Projectile Motion</h3>
            <ProjectileAnimation highlight="all" className="h-48" />
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setMode('learn')} 
              className="w-full h-auto p-6 justify-start gap-4 bg-gradient-to-r from-topic-red to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
            >
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Learn Step by Step</p>
                <p className="text-sm opacity-80">Range → Max Height → Time of Flight</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => navigate('/game/physics/motion-in-plane')} 
              variant="outline" 
              className="w-full h-auto p-6 justify-start gap-4 border-2 border-topic-red/30 hover:bg-topic-red/10"
            >
              <Gamepad2 className="h-8 w-8 text-topic-red" />
              <div className="text-left">
                <p className="font-bold text-lg">Jump to Game</p>
                <p className="text-sm text-muted-foreground">Test your knowledge</p>
              </div>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${page.title}`}>
      <div className="p-4 pb-32">
        {/* Progress indicators */}
        <div className="flex gap-2 mb-6">
          {motionPages.map((p, i) => (
            <div 
              key={p.id} 
              className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                i < currentPage ? 'bg-topic-red' : 
                i === currentPage ? 'bg-gradient-to-r from-topic-red to-red-400' : 
                'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Page title */}
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-topic-red/20 text-topic-red text-sm font-medium mb-2">
            Part {currentPage + 1} of {motionPages.length}
          </span>
          <h1 className="text-2xl font-bold">{page.title}</h1>
        </div>

        {/* Animation */}
        <div className="mb-6">
          <ProjectileAnimation 
            highlight={page.highlight} 
            className="h-52"
            onMaxHeight={handleAnimationMaxHeight}
          />
        </div>

        {/* Tutor section */}
        {selectedTutor && (
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                {selectedTutor.emoji}
              </div>
              <div className="flex-1 bg-card rounded-xl p-3 shadow-card">
                <p className="text-sm" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive", fontSize: '1.1rem' }}>
                  {isSpeaking && !isPaused ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">🔊</span> 
                      {selectedTutor.name} is explaining...
                    </span>
                  ) : (
                    <span>"{page.tutorIntro}"</span>
                  )}
                </p>
              </div>
            </div>
            {isSupported && (
              <SpeechControls 
                isSpeaking={isSpeaking} 
                isPaused={isPaused} 
                speedMultiplier={speedMultiplier} 
                progress={progress} 
                onPlay={() => speak(getSpeechText())} 
                onPause={pause} 
                onResume={resume} 
                onStop={stop} 
                onIncreaseSpeed={increaseSpeed} 
                onDecreaseSpeed={decreaseSpeed} 
              />
            )}
          </div>
        )}

        {/* Definition */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
          <h3 className="font-bold text-lg mb-3 text-topic-red">📖 Definition</h3>
          <p className="text-foreground leading-relaxed" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive", fontSize: '1.15rem' }}>
            {page.definition}
          </p>
        </div>

        {/* Derivation section */}
        {!showDerivation ? (
          <Button 
            onClick={startDerivation}
            className="w-full mb-6 bg-gradient-to-r from-topic-purple to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            📝 Show Step-by-Step Derivation
          </Button>
        ) : (
          <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
            <h3 className="font-bold text-lg mb-4 text-topic-purple">📝 Derivation</h3>
            
            {page.derivation.slice(0, currentStep).map((step, i) => (
              <DerivationStep
                key={i}
                stepNumber={i + 1}
                text={step.text}
                formula={step.formula}
                delay={0}
              />
            ))}

            {showFinalFormula && (
              <FormulaBox 
                formula={page.finalFormula}
                label="✨ Final Formula"
                isFinal={true}
              />
            )}
          </div>
        )}

        {/* Example */}
        {showExample && (
          <div className="bg-secondary rounded-2xl p-5 animate-fade-in mb-6">
            <h3 className="font-bold text-lg mb-3">💡 Solved Example</h3>
            <div className="bg-card rounded-xl p-4 mb-3">
              <p className="font-medium" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive", fontSize: '1.1rem' }}>
                {page.example.problem}
              </p>
            </div>
            <div className="bg-topic-red/10 border border-topic-red/30 rounded-xl p-4">
              <p className="font-mono text-sm">
                {page.example.solution}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={goToPrevPage}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentPage === 0 ? 'Back' : 'Previous'}
          </Button>
          <Button 
            onClick={goToNextPage}
            className="flex-1 bg-gradient-to-r from-topic-red to-red-600"
            disabled={!showFinalFormula && showDerivation}
          >
            {currentPage < motionPages.length - 1 ? 'Next Topic' : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnMotion;