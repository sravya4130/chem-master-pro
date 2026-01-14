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

  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported, speedMultiplier, increaseSpeed, decreaseSpeed, progress } = useTutorSpeech(selectedTutor);

  const lesson = dimensionsLessons[currentLesson];

  useEffect(() => { return () => { stop(); }; }, [stop]);
  useEffect(() => { stop(); }, [currentLesson, stop]);

  const getLessonSpeechText = () => {
    if (!lesson) return '';
    const cleanContent = lesson.content.replace(/\*\*/g, '').replace(/- /g, '').replace(/\n+/g, '. ').replace(/\|/g, '').trim();
    let text = `${lesson.title}. ${cleanContent}. Example: ${lesson.example.problem}. Solution: ${lesson.example.solution}. ${lesson.example.explanation}`;
    if (lesson.repeatAfterMe) {
      text += `. Now, repeat after me: ${lesson.repeatAfterMe}`;
    }
    return text;
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Units & Dimensions">
        <div className="p-4 pb-8">
          <div className="bg-yellow-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">{selectedTutor.emoji}</div>}
              <div>
                <h2 className="text-2xl font-bold">Units & Dimensions</h2>
                <p className="opacity-80">Master dimensional analysis</p>
              </div>
            </div>
            {selectedTutor && <div className="bg-white/20 rounded-xl p-4"><p className="text-sm">"{selectedTutor.name} here! Understanding dimensions is key to physics. Let's learn about physical quantities and their formulas!"</p></div>}
          </div>
          <div className="space-y-4">
            <Button onClick={() => setMode('learn')} className="w-full h-auto p-6 justify-start gap-4 bg-yellow-500 hover:bg-yellow-600">
              <BookOpen className="h-8 w-8" />
              <div className="text-left"><p className="font-bold text-lg">Learn First</p><p className="text-sm opacity-80">Study dimensions step by step</p></div>
            </Button>
            <Button onClick={() => navigate('/game/physics/units-dimensions')} variant="outline" className="w-full h-auto p-6 justify-start gap-4 border-2">
              <Gamepad2 className="h-8 w-8" />
              <div className="text-left"><p className="font-bold text-lg">Jump to Game</p><p className="text-sm text-muted-foreground">Test your knowledge</p></div>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Lesson ${currentLesson + 1}`}>
      <div className="p-4 pb-32">
        <div className="flex gap-1 mb-6">{dimensionsLessons.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i <= currentLesson ? 'bg-yellow-500' : 'bg-muted'}`} />)}</div>
        {selectedTutor && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">{selectedTutor.emoji}</div>
              <div className="flex-1 bg-card rounded-xl p-3 shadow-card"><p className="text-sm">{isSpeaking && !isPaused ? <span className="flex items-center gap-2"><span className="animate-pulse">🔊</span> {selectedTutor.name} is teaching...</span> : <span>{selectedTutor.name} will read the lesson for you</span>}</p></div>
            </div>
            {isSupported && <SpeechControls isSpeaking={isSpeaking} isPaused={isPaused} speedMultiplier={speedMultiplier} progress={progress} onPlay={() => speak(getLessonSpeechText())} onPause={pause} onResume={resume} onStop={stop} onIncreaseSpeed={increaseSpeed} onDecreaseSpeed={decreaseSpeed} />}
          </div>
        )}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
  <h2 className="text-xl font-bold mb-6">{lesson.title}</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {lesson.content
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, i) => (
        <div
          key={i}
          className="bg-secondary rounded-xl p-4 shadow-sm"
        >
          {line.startsWith('**') && line.endsWith('**') ? (
            <p className="font-bold text-primary">
              {line.replace(/\*\*/g, '')}
            </p>
          ) : line.startsWith('- ') ? (
            <p className="text-sm">• {line.substring(2)}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {line.replace(/\|/g, '')}
            </p>
          )}
        </div>
      ))}
  </div>
</div>
