import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { sigmaPiLessons } from '@/data/sigmaPiBondsData';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2, Link2, Unlink } from 'lucide-react';

const LearnSigmaPi = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');

  const lesson = sigmaPiLessons[currentLesson];

  if (mode === 'intro') {
    return (
      <AppLayout title="Sigma & Pi Bonds">
        <div className="p-4 pb-8">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-topic-green to-emerald-600 rounded-2xl p-6 text-primary-foreground mb-6">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-card/20 flex items-center justify-center text-3xl">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">Sigma & Pi Bonds</h2>
                <p className="opacity-80">Master chemical bond counting</p>
              </div>
            </div>
            
            {selectedTutor && (
              <div className="bg-card/20 rounded-xl p-4">
                <p className="text-sm">
                  "{selectedTutor.name} here! Understanding σ and π bonds is crucial for JEE organic chemistry. Let's nail this!"
                </p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Button
              onClick={() => setMode('learn')}
              className="w-full h-auto p-6 justify-start gap-4 bg-topic-green hover:bg-topic-green/90"
            >
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Learn First</p>
                <p className="text-sm opacity-80">Study bond types & counting rules</p>
              </div>
            </Button>

            <Button
              onClick={() => navigate('/game/sigma-pi')}
              variant="outline"
              className="w-full h-auto p-6 justify-start gap-4 border-2"
            >
              <Gamepad2 className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Jump to Quiz</p>
                <p className="text-sm text-muted-foreground">Test your bond counting skills</p>
              </div>
            </Button>
          </div>

          {/* What you'll learn */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">What you'll learn:</h3>
            <ul className="space-y-3">
              {[
                { icon: <Link2 className="h-4 w-4" />, text: 'Sigma (σ) bond formation' },
                { icon: <Unlink className="h-4 w-4" />, text: 'Pi (π) bond characteristics' },
                { icon: <Link2 className="h-4 w-4" />, text: 'Single, double & triple bonds' },
                { icon: <Unlink className="h-4 w-4" />, text: 'Counting bonds in molecules' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-topic-green/20 flex items-center justify-center text-topic-green">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Reference Card */}
          <div className="mt-8 bg-card rounded-2xl p-5 shadow-card border border-topic-green/20">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Link2 className="h-5 w-5 text-topic-green" />
              Quick Reference
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-secondary/50 rounded-lg p-3 flex justify-between items-center">
                <span className="font-semibold">Single Bond (—)</span>
                <span className="text-topic-green font-bold">1σ</span>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 flex justify-between items-center">
                <span className="font-semibold">Double Bond (═)</span>
                <span className="text-topic-green font-bold">1σ + 1π</span>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3 flex justify-between items-center">
                <span className="font-semibold">Triple Bond (≡)</span>
                <span className="text-topic-green font-bold">1σ + 2π</span>
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
          {sigmaPiLessons.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                i <= currentLesson ? 'bg-topic-green' : 'bg-muted'
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
          <h2 className="text-xl font-bold mb-4 text-topic-green">{lesson.title}</h2>
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
        <div className="bg-topic-green/10 rounded-2xl p-6 border border-topic-green/30">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-topic-green" />
            Example
          </h3>
          <div className="bg-card rounded-xl p-4 mb-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Molecule:</span>
              <span className="font-mono font-bold">{lesson.example.molecule}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Structure:</span>
              <span className="font-mono">{lesson.example.structure}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sigma (σ) bonds:</span>
              <span className="font-bold text-topic-green">{lesson.example.sigmaBonds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pi (π) bonds:</span>
              <span className="font-bold text-topic-green">{lesson.example.piBonds}</span>
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
              if (currentLesson < sigmaPiLessons.length - 1) {
                setCurrentLesson(currentLesson + 1);
              } else {
                navigate('/game/sigma-pi');
              }
            }}
            className="flex-1 bg-topic-green hover:bg-topic-green/90"
          >
            {currentLesson < sigmaPiLessons.length - 1 ? 'Next' : 'Start Quiz'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnSigmaPi;
