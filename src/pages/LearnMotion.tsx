import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { motionLessons } from '@/data/physicsData';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2, Play } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';

const LearnMotion = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');
  const [showAnimation, setShowAnimation] = useState(false);

  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported, speedMultiplier, increaseSpeed, decreaseSpeed, progress } = useTutorSpeech(selectedTutor);

  const lesson = motionLessons[currentLesson];

  useEffect(() => { return () => { stop(); }; }, [stop]);
  useEffect(() => { stop(); setShowAnimation(false); }, [currentLesson, stop]);

  const getLessonSpeechText = () => {
    if (!lesson) return '';
    const cleanContent = lesson.content.replace(/\*\*/g, '').replace(/- /g, '').replace(/\n+/g, '. ').replace(/\$/g, '').trim();
    return `${lesson.title}. ${cleanContent}. Example: ${lesson.example.problem}. Solution: ${lesson.example.solution}. ${lesson.example.explanation}`;
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Motion in a Plane">
        <div className="p-4 pb-8">
          <div className="bg-red-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">{selectedTutor.emoji}</div>}
              <div>
                <h2 className="text-2xl font-bold">Motion in a Plane</h2>
                <p className="opacity-80">Master projectile motion</p>
              </div>
            </div>
            {selectedTutor && <div className="bg-white/20 rounded-xl p-4"><p className="text-sm">"{selectedTutor.name} here! Projectile motion is beautiful physics. Let's derive the formulas for range, height, and time of flight!"</p></div>}
          </div>
          <div className="space-y-4">
            <Button onClick={() => setMode('learn')} className="w-full h-auto p-6 justify-start gap-4 bg-red-500 hover:bg-red-600">
              <BookOpen className="h-8 w-8" />
              <div className="text-left"><p className="font-bold text-lg">Learn First</p><p className="text-sm opacity-80">Study with animations & formulas</p></div>
            </Button>
            <Button onClick={() => navigate('/game/physics/motion-in-plane')} variant="outline" className="w-full h-auto p-6 justify-start gap-4 border-2">
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
        <div className="flex gap-1 mb-6">{motionLessons.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i <= currentLesson ? 'bg-red-500' : 'bg-muted'}`} />)}</div>
        
        {/* Projectile Animation for first lesson */}
        {currentLesson === 0 && (
          <div className="bg-card rounded-2xl p-4 mb-6 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm">Projectile Motion Animation</h3>
              <Button size="sm" variant="outline" onClick={() => setShowAnimation(!showAnimation)}>
                <Play className="h-4 w-4 mr-1" />{showAnimation ? 'Reset' : 'Play'}
              </Button>
            </div>
            <div className="relative h-32 bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-800" />
              {showAnimation && (
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-projectile" style={{ animation: 'projectile 2s ease-out infinite' }} />
              )}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80">
                <path d="M 10 70 Q 100 -20 190 70" fill="none" stroke="rgba(255,255,255,0.3)" strokeDasharray="4" strokeWidth="1" />
                <text x="100" y="20" fill="white" fontSize="8" textAnchor="middle">Max Height (H)</text>
                <text x="100" y="78" fill="white" fontSize="8" textAnchor="middle">Range (R)</text>
              </svg>
            </div>
          </div>
        )}

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
          <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
          <div className="prose prose-sm text-foreground">{lesson.content.split('\n').map((line, i) => line.startsWith('**') && line.endsWith('**') ? <p key={i} className="font-bold mt-3">{line.replace(/\*\*/g, '')}</p> : line.startsWith('- ') ? <p key={i} className="ml-4">• {line.substring(2)}</p> : line.includes('$$') ? <p key={i} className="font-mono text-center bg-muted p-2 rounded my-2">{line.replace(/\$/g, '')}</p> : line.startsWith('|') ? <p key={i} className="font-mono text-xs bg-muted p-1 rounded">{line}</p> : <p key={i} className="text-muted-foreground">{line}</p>)}</div>
        </div>
        <div className="bg-secondary rounded-2xl p-6">
          <h3 className="font-bold mb-3">📝 Example</h3>
          <div className="bg-card rounded-xl p-4 mb-3"><p className="font-mono text-lg text-center">{lesson.example.problem}</p></div>
          <p className="text-center"><span className="text-muted-foreground">Solution: </span><span className="font-bold text-red-500">{lesson.example.solution}</span></p>
          <p className="text-sm text-muted-foreground mt-2 text-center">{lesson.example.explanation}</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { stop(); currentLesson > 0 ? setCurrentLesson(currentLesson - 1) : setMode('intro'); }} className="flex-1"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
          <Button onClick={() => { stop(); currentLesson < motionLessons.length - 1 ? setCurrentLesson(currentLesson + 1) : navigate('/game/physics/motion-in-plane'); }} className="flex-1">{currentLesson < motionLessons.length - 1 ? 'Next' : 'Start Game'}<ArrowRight className="h-4 w-4 ml-2" /></Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnMotion;
