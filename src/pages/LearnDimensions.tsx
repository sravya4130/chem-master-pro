import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { dimensionsLessons } from '@/data/physicsData';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2, Volume2 } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';

const LearnDimensions = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');

  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    speedMultiplier,
    increaseSpeed,
    decreaseSpeed,
    progress,
  } = useTutorSpeech(selectedTutor);

  const lesson = dimensionsLessons[currentLesson];

  useEffect(() => () => stop(), [stop]);
  useEffect(() => stop(), [currentLesson, stop]);

  const cleanLines = lesson.content
    .split('\n')
    .map(line =>
      line
        .replace(/\*\*/g, '')
        .replace(/\|/g, '')
        .replace(/^- /g, '')
        .trim()
    )
    .filter(Boolean);

  if (mode === 'intro') {
    return (
      <AppLayout title="Units & Dimensions">
        <div className="p-4 pb-8 space-y-4">
          <div className="bg-yellow-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold">Units & Dimensions</h2>
            <p className="opacity-80">Learn fundamentals step by step</p>
          </div>

          <Button
            onClick={() => setMode('learn')}
            className="w-full h-auto p-6 justify-start gap-4 bg-yellow-500"
          >
            <BookOpen className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Learn First</p>
              <p className="text-sm opacity-80">Start learning</p>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/game/physics/units-dimensions')}
            variant="outline"
            className="w-full h-auto p-6 justify-start gap-4"
          >
            <Gamepad2 className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Jump to Game</p>
              <p className="text-sm text-muted-foreground">Practice</p>
            </div>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Lesson ${currentLesson + 1}`}>
      <div className="p-4 pb-32 space-y-6">

        {/* Progress */}
        <div className="flex gap-1">
          {dimensionsLessons.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i <= currentLesson ? 'bg-yellow-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Tutor */}
        {selectedTutor && (
          <div className="bg-card rounded-xl p-4 flex gap-3">
            <div className="text-2xl">{selectedTutor.emoji}</div>
            <p className="text-sm">
              {isSpeaking ? 'Teaching…' : 'Tap play to listen'}
            </p>
          </div>
        )}

        {isSupported && (
          <SpeechControls
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            progress={progress}
            onPlay={() => speak(cleanLines.join('. '))}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onIncreaseSpeed={increaseSpeed}
            onDecreaseSpeed={decreaseSpeed}
          />
        )}

        {/* 🔥 FIXED CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cleanLines.map((line, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <p className="text-sm text-foreground">{line}</p>
            </div>
          ))}
        </div>

        {/* Example */}
        <div className="bg-secondary rounded-2xl p-6">
          <h3 className="font-bold mb-3">Example</h3>
          <p className="font-mono text-center mb-2">
            {lesson.example.problem}
          </p>
          <p className="text-center font-bold text-yellow-500">
            {lesson.example.solution}
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {lesson.example.explanation}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              currentLesson > 0
                ? setCurrentLesson(currentLesson - 1)
                : setMode('intro')
            }
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            className="flex-1"
            onClick={() =>
              currentLesson < dimensionsLessons.length - 1
                ? setCurrentLesson(currentLesson + 1)
                : navigate('/game/physics/units-dimensions')
            }
          >
            {currentLesson < dimensionsLessons.length - 1
              ? 'Next'
              : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnDimensions;
