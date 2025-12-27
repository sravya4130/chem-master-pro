import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { hybridisationLessons } from '@/data/hybridisationData';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2, Atom, Sparkles } from 'lucide-react';

const LearnHybridisation = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');

  const lesson = hybridisationLessons[currentLesson];

  if (mode === 'intro') {
    return (
      <AppLayout title="Hybridisation">
        <div className="p-4 pb-8">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-topic-blue to-primary rounded-2xl p-6 text-primary-foreground mb-6">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-card/20 flex items-center justify-center text-3xl">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">Hybridisation</h2>
                <p className="opacity-80">Master orbital mixing & quantum numbers</p>
              </div>
            </div>
            
            {selectedTutor && (
              <div className="bg-card/20 rounded-xl p-4">
                <p className="text-sm">
                  "{selectedTutor.name} here! Hybridisation is a key concept for JEE. 
                  Let's understand how atoms mix orbitals to form bonds!"
                </p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Button
              onClick={() => setMode('learn')}
              className="w-full h-auto p-6 justify-start gap-4 bg-topic-blue hover:bg-topic-blue/90"
            >
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Learn First</p>
                <p className="text-sm opacity-80">Study sp, sp², sp³ and more</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/game/hybridisation')}
              variant="outline"
              className="w-full h-auto p-6 justify-start gap-4 border-2"
            >
              <Gamepad2 className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Jump to Quiz</p>
                <p className="text-sm text-muted-foreground">Test your knowledge directly</p>
              </div>
            </Button>
          </div>

          {/* What you'll learn */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">What you'll learn:</h3>
            <ul className="space-y-3">
              {[
                { icon: <Atom className="h-4 w-4" />, text: 'sp, sp², sp³ hybridisation' },
                { icon: <Sparkles className="h-4 w-4" />, text: 'sp³d and sp³d² for expanded octets' },
                { icon: <Atom className="h-4 w-4" />, text: 'Molecular geometry & bond angles' },
                { icon: <Sparkles className="h-4 w-4" />, text: 'Quantum numbers (n, l, mₗ, mₛ)' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-topic-blue/20 flex items-center justify-center text-topic-blue">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Reference Card */}
          <div className="mt-8 bg-card rounded-2xl p-5 shadow-card border border-topic-blue/20">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Atom className="h-5 w-5 text-topic-blue" />
              Quick Reference
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-semibold text-topic-blue">sp³</p>
                <p className="text-muted-foreground">Tetrahedral, 109.5°</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-semibold text-topic-blue">sp²</p>
                <p className="text-muted-foreground">Trigonal planar, 120°</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-semibold text-topic-blue">sp</p>
                <p className="text-muted-foreground">Linear, 180°</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="font-semibold text-topic-blue">sp³d²</p>
                <p className="text-muted-foreground">Octahedral, 90°</p>
              </div>
            </div>
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
          {hybridisationLessons.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i <= currentLesson ? 'bg-topic-blue' : 'bg-muted'
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
              <p className="text-sm">{selectedTutor.name} is explaining...</p>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="text-xl font-bold mb-4 text-topic-blue">{lesson.title}</h2>
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
        <div className="bg-topic-blue/10 rounded-2xl p-6 border border-topic-blue/30">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Atom className="h-5 w-5 text-topic-blue" />
            Example
          </h3>
          <div className="bg-card rounded-xl p-4 mb-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Molecule:</span>
              <span className="font-mono font-bold">{lesson.example.molecule}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hybridisation:</span>
              <span className="font-bold text-topic-blue">{lesson.example.hybridisation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Geometry:</span>
              <span className="font-medium">{lesson.example.geometry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bond Angle:</span>
              <span className="font-medium">{lesson.example.bondAngle}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
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
              if (currentLesson < hybridisationLessons.length - 1) {
                setCurrentLesson(currentLesson + 1);
              } else {
                navigate('/game/hybridisation');
              }
            }}
            className="flex-1 bg-topic-blue hover:bg-topic-blue/90"
          >
            {currentLesson < hybridisationLessons.length - 1 ? 'Next' : 'Start Quiz'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnHybridisation;
