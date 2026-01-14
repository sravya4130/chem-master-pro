import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useMistakes } from '@/contexts/MistakeContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Beaker,
  Calculator,
  Atom
} from 'lucide-react';
import { toast } from 'sonner';

const Mistakes = () => {
  const navigate = useNavigate();
  const { mistakes, getUnresolvedMistakes, resolveMistake, getMistakesBySubject } = useMistakes();
  const { addXP } = useApp();
  const [gameMode, setGameMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameSubject, setGameSubject] = useState<string | null>(null);

  const unresolvedMistakes = getUnresolvedMistakes();
  const chemistryMistakes = getMistakesBySubject('chemistry');
  const physicsMistakes = getMistakesBySubject('physics');
  const mathsMistakes = getMistakesBySubject('mathematics');

  const gameMistakes = gameSubject 
    ? getMistakesBySubject(gameSubject)
    : unresolvedMistakes;

  const currentMistake = gameMistakes[currentIndex];

  const handleStartGame = (subject?: string) => {
    if (subject) {
      setGameSubject(subject);
    } else {
      setGameSubject(null);
    }
    setGameMode(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentMistake.correctAnswer) {
      resolveMistake(currentMistake.id);
      addXP(15);
      toast.success('Correct! Mistake resolved! +15 XP');
    } else {
      toast.error('Not quite! Keep practicing.');
    }
  };

  const handleNext = () => {
    if (currentIndex < gameMistakes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameMode(false);
      toast.success('Revision session complete!');
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'chemistry': return <Beaker className="h-5 w-5" />;
      case 'physics': return <Atom className="h-5 w-5" />;
      case 'mathematics': return <Calculator className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'chemistry': return 'bg-emerald-500';
      case 'physics': return 'bg-yellow-500';
      case 'mathematics': return 'bg-cyan-500';
      default: return 'bg-primary';
    }
  };

  if (gameMode && currentMistake) {
    return (
      <AppLayout title="Revision Game">
        <div className="p-4 pb-8">
          <div className="flex gap-1 mb-6">
            {gameMistakes.map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-2 rounded-full transition-colors ${
                  i < currentIndex ? 'bg-green-500' : i === currentIndex ? 'bg-primary' : 'bg-muted'
                }`} 
              />
            ))}
          </div>

          <div className="text-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {gameMistakes.length}
            </span>
          </div>

          <div className={`${getSubjectColor(currentMistake.subject)} rounded-2xl p-4 text-white mb-6`}>
            <div className="flex items-center gap-2 mb-2">
              {getSubjectIcon(currentMistake.subject)}
              <span className="text-sm font-medium capitalize">{currentMistake.subject} - {currentMistake.topic}</span>
            </div>
            <p className="text-lg font-semibold">{currentMistake.question}</p>
          </div>

          <div className="space-y-3 mb-6">
            {[currentMistake.correctAnswer, currentMistake.userAnswer].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5).map((answer, i) => (
              <button
                key={i}
                onClick={() => !showResult && handleAnswer(answer)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showResult 
                    ? answer === currentMistake.correctAnswer
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : answer === selectedAnswer
                        ? 'bg-red-500/20 border-2 border-red-500'
                        : 'bg-card border-2 border-transparent'
                    : 'bg-card border-2 border-transparent hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{answer}</span>
                  {showResult && answer === currentMistake.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showResult && answer === selectedAnswer && answer !== currentMistake.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <Button onClick={handleNext} className="w-full">
              {currentIndex < gameMistakes.length - 1 ? 'Next Question' : 'Finish Session'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Mistakes Review">
      <div className="p-4 pb-8 space-y-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Mistakes to Review</h2>
              <p className="opacity-80">{unresolvedMistakes.length} questions need practice</p>
            </div>
          </div>
          {unresolvedMistakes.length > 0 && (
            <Button 
              onClick={() => handleStartGame()} 
              className="w-full bg-white text-orange-600 hover:bg-white/90"
            >
              <Gamepad2 className="h-5 w-5 mr-2" />
              Start Revision Game (All Subjects)
            </Button>
          )}
        </div>

        {/* Subject-wise Breakdown */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">By Subject</h3>
          
          {/* Chemistry */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Beaker className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Chemistry</h4>
                  <p className="text-sm text-muted-foreground">{chemistryMistakes.length} mistakes</p>
                </div>
              </div>
              {chemistryMistakes.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleStartGame('chemistry')}
                >
                  Practice
                </Button>
              )}
            </div>
          </div>

          {/* Physics */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Atom className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Physics</h4>
                  <p className="text-sm text-muted-foreground">{physicsMistakes.length} mistakes</p>
                </div>
              </div>
              {physicsMistakes.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleStartGame('physics')}
                >
                  Practice
                </Button>
              )}
            </div>
          </div>

          {/* Mathematics */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Mathematics</h4>
                  <p className="text-sm text-muted-foreground">{mathsMistakes.length} mistakes</p>
                </div>
              </div>
              {mathsMistakes.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleStartGame('mathematics')}
                >
                  Practice
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Recent Mistakes List */}
        {unresolvedMistakes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Recent Mistakes</h3>
            <div className="space-y-3">
              {unresolvedMistakes.slice(0, 5).map((mistake) => (
                <div key={mistake.id} className="bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${getSubjectColor(mistake.subject)} flex items-center justify-center flex-shrink-0`}>
                      {getSubjectIcon(mistake.subject)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{mistake.question}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mistake.topic} • {new Date(mistake.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {unresolvedMistakes.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">All Clear!</h3>
            <p className="text-muted-foreground mb-6">No mistakes to review. Keep up the great work!</p>
            <Button onClick={() => navigate('/')}>
              Continue Learning
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Mistakes;
