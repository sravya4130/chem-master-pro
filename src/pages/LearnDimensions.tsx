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

  // Structured table data for 7 base quantities
  const baseQuantities = [
    { sn: 1, quantity: 'Length', formula: 'l, L', dimensional: '[L]', siUnit: 'metre (m)' },
    { sn: 2, quantity: 'Mass', formula: 'm, M', dimensional: '[M]', siUnit: 'kilogram (kg)' },
    { sn: 3, quantity: 'Time', formula: 't, T', dimensional: '[T]', siUnit: 'second (s)' },
    { sn: 4, quantity: 'Electric Current', formula: 'I', dimensional: '[A]', siUnit: 'ampere (A)' },
    { sn: 5, quantity: 'Temperature', formula: 'T, θ', dimensional: '[K]', siUnit: 'kelvin (K)' },
    { sn: 6, quantity: 'Amount of Substance', formula: 'n', dimensional: '[mol]', siUnit: 'mole (mol)' },
    { sn: 7, quantity: 'Luminous Intensity', formula: 'Iᵥ', dimensional: '[cd]', siUnit: 'candela (cd)' },
  ];

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
                baseQuantities
                  .map(r => `${r.quantity}, symbol ${r.formula}, dimensional formula ${r.dimensional}, SI unit ${r.siUnit}`)
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

        {/* ✅ FIXED 5-COLUMN TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left font-bold border border-border rounded-tl-xl">S.No</th>
                <th className="p-3 text-left font-bold border border-border">Quantity</th>
                <th className="p-3 text-center font-bold border border-border">Formula</th>
                <th className="p-3 text-center font-bold border border-border">Dimensional Formula</th>
                <th className="p-3 text-center font-bold border border-border rounded-tr-xl">SI Unit</th>
              </tr>
            </thead>
            <tbody>
              {baseQuantities.map((row) => (
                <tr key={row.sn} className="bg-card">
                  <td className="p-3 border border-border font-semibold">{row.sn}</td>
                  <td className="p-3 border border-border">{row.quantity}</td>
                  <td className="p-3 border border-border text-center font-mono">{row.formula}</td>
                  <td className="p-3 border border-border text-center font-mono text-primary">{row.dimensional}</td>
                  <td className="p-3 border border-border text-center">{row.siUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
