import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { iupacLessons } from '@/data/iupacData';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';

const LearnIUPAC = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn' | 'practice'>('intro');

  const lesson = iupacLessons[currentLesson];

  if (mode === 'intro') {
    return (
      <AppLayout title="IUPAC Nomenclature">
        <div className="p-4 pb-8">
          {/* Header Card */}
          <div className="gradient-game rounded-2xl p-6 text-primary-foreground mb-6">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-card/20 flex items-center justify-center text-3xl">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">IUPAC Naming</h2>
                <p className="opacity-80">Learn to name organic compounds</p>
              </div>
            </div>
            
            {selectedTutor && (
              <div className="bg-card/20 rounded-xl p-4">
                <p className="text-sm">
                  "{selectedTutor.name} here! IUPAC nomenclature is essential for JEE. 
                  Let's master it together with examples and games!"
                </p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Button
              onClick={() => setMode('learn')}
              className="w-full h-auto p-6 justify-start gap-4 bg-topic-pink hover:bg-topic-pink/90"
            >
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Learn First</p>
                <p className="text-sm opacity-80">Study the rules with examples</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/game/iupac')}
              variant="outline"
              className="w-full h-auto p-6 justify-start gap-4 border-2"
            >
              <Gamepad2 className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Jump to Game</p>
                <p className="text-sm text-muted-foreground">Test your knowledge directly</p>
              </div>
            </Button>
          </div>

          {/* What you'll learn */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">What you'll learn:</h3>
            <ul className="space-y-3">
              {['Basic IUPAC rules', 'Alkane naming', 'Alkenes & Alkynes', 'Substituent naming'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-topic-pink/20 flex items-center justify-center">
                    <span className="text-topic-pink font-bold">{i + 1}</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Lesson ${currentLesson + 1}`}>
      <div className="p-4 pb-24">
        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {iupacLessons.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i <= currentLesson ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Tutor */}
        {selectedTutor && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
              {selectedTutor.emoji}
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 shadow-card">
              <p className="text-sm">{selectedTutor.name} is teaching...</p>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
          <div className="prose prose-sm text-foreground">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold mt-3">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ')) {
                return <p key={i} className="ml-4">• {line.substring(2)}</p>;
              }
              return <p key={i} className="text-muted-foreground">{line}</p>;
            })}
          </div>
        </div>

        {/* Example */}
        <div className="bg-secondary rounded-2xl p-6">
          <h3 className="font-bold mb-3">📝 Example</h3>
          <div className="bg-card rounded-xl p-4 mb-3">
            <p className="font-mono text-lg text-center">{lesson.example.structure}</p>
          </div>
          <p className="text-center">
            <span className="text-muted-foreground">Name: </span>
            <span className="font-bold text-primary">{lesson.example.name}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {lesson.example.explanation}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              if (currentLesson > 0) {
                setCurrentLesson(currentLesson - 1);
              } else {
                setMode('intro');
              }
            }}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => {
              if (currentLesson < iupacLessons.length - 1) {
                setCurrentLesson(currentLesson + 1);
              } else {
                navigate('/game/iupac');
              }
            }}
            className="flex-1"
          >
            {currentLesson < iupacLessons.length - 1 ? 'Next' : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnIUPAC;
