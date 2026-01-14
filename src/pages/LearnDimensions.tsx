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

  // 🔹 CLEAN + STRUCTURE CONTENT
  const rows = lesson.content
    .split('\n')
    .map(line =>
      line
        .replace(/\*\*/g, '')
        .replace(/\|/g, '')
        .replace(/^- /g, '')
        .trim()
    )
    .filter(Boolean)
    .map(line => {
      // Expected format: Quantity : Symbol = Formula
      const [quantityPart, rest] = line.split(':');
      const [symbol, formula] = rest ? rest.split('=') : [];
      return {
        quantity: quantityPart?.trim() || '-',
        symbol: symbol?.trim() || '-',
        formula: formula?.trim() || '-',
      };
    });

  if (mode === 'intro') {
    return (
      <AppLayout title="Units & Dimensions">
        <div className="p-4 pb-8 space-y-4">
          <div className="bg-yellow-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold">Units & Dimensions</h2>
            <p className="opacity-80">Master dimensional analysis</p>
          </div>

          <Button
            onClick={() => setMode('learn')}
            className="w-full h-auto p-6 justify-start gap-4 bg-yellow-500"
          >
            <BookOpen className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Learn First</p>
              <p className="text-sm opacity-80">Study step by step</p>
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
              <p className="text-sm text-muted-foreground">Test knowledge</p>
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

        {/* Tutor Speech */}
        {selectedTutor && isSupported && (
          <SpeechControls
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            progress={progress}
            onPlay={() =>
              speak(
                rows
                  .map(r => `${r.quantity}, symbol ${r.symbol}, formula ${r.formula}`)
                  .join('. ')
              )
            }
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onIncreaseSpeed={increaseSpeed}
            onDecreaseSpeed={decreaseSpeed}
          />
        )}

        {/* ✅ FIXED 3-COLUMN TABLE */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-2 text-sm">

            <div className="font-bold bg-muted p-3 rounded-tl-xl">Quantity</div>
            <div className="font-bold bg-muted p-3 text-center">Symbol</div>
            <div className="font-bold bg-muted p-3 rounded-tr-xl text-center">
              Dimensional Formula
            </div>

            {rows.map((row, i) => (
              <>
                <div key={`q-${i}`} className="bg-card p-3 border">
                  {row.quantity}
                </div>
                <div key={`s-${i}`} className="bg-card p-3 border text-center">
                  {row.symbol}
                </div>
                <div key={`f-${i}`} className="bg-card p-3 border font-mono text-center">
                  {row.formula}
                </div>
              </>
            ))}
          </div>
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
