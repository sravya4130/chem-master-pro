import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GameTimer } from '@/components/game/GameTimer';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { iupacQuestions, IUPACQuestion } from '@/data/iupacData';
import { ArrowRight, Lightbulb, X, Check, Trophy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const GameIUPAC = () => {
  const navigate = useNavigate();
  const { addXP, selectedTutor, setUserProgress } = useApp();
  
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'checking' | 'finished'>('ready');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timerDuration, setTimerDuration] = useState(60);
  const [shuffledQuestions, setShuffledQuestions] = useState<IUPACQuestion[]>([]);

  useEffect(() => {
    // Shuffle questions on mount
    const shuffled = [...iupacQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleTimeUp = useCallback(() => {
    setIsCorrect(false);
    setStreak(0);
    setGameState('checking');
    toast.error('Time\'s up!');
  }, []);

  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    const userAnswer = answer.trim().toLowerCase().replace(/[- ]/g, '');
    const correctAnswer = currentQuestion.name.toLowerCase().replace(/[- ]/g, '');
    
    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setGameState('checking');

    if (correct) {
      const bonusXP = streak >= 3 ? 5 : 0;
      const hintPenalty = hintsUsed > 0 ? Math.floor(currentQuestion.xpReward * 0.3 * hintsUsed) : 0;
      const earnedXP = Math.max(currentQuestion.xpReward - hintPenalty + bonusXP, 5);
      
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setXpEarned(prev => prev + earnedXP);
      addXP(earnedXP);
      toast.success(`+${earnedXP} XP! ${streak >= 2 ? '🔥 Streak bonus!' : ''}`);
    } else {
      setStreak(0);
      toast.error('Not quite right!');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setIsCorrect(null);
      setHintsUsed(0);
      setShowHint(false);
      setGameState('playing');
    } else {
      setGameState('finished');
      setUserProgress(prev => ({
        ...prev,
        streak: prev.streak + 1,
        completedTopics: prev.completedTopics.includes('iupac') 
          ? prev.completedTopics 
          : [...prev.completedTopics, 'iupac']
      }));
    }
  };

  const useHint = () => {
    if (hintsUsed < (currentQuestion?.hints.length || 0)) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
      toast.info('Hint revealed! (-30% XP for this question)');
    }
  };

  const restartGame = () => {
    const shuffled = [...iupacQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setAnswer('');
    setScore(0);
    setStreak(0);
    setXpEarned(0);
    setHintsUsed(0);
    setShowHint(false);
    setIsCorrect(null);
    setGameState('ready');
  };

  if (gameState === 'ready') {
    return (
      <AppLayout title="IUPAC Game">
        <div className="p-4 pb-8 flex flex-col min-h-[calc(100vh-56px)]">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6 animate-bounce-in">🎮</div>
            <h2 className="text-2xl font-bold mb-2">Ready to Play?</h2>
            <p className="text-muted-foreground mb-6">
              Name the compounds correctly and earn XP!
            </p>

            {/* Timer Selection */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">Time per question:</p>
              <div className="flex gap-2">
                {[30, 60, 120, 180, 300].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setTimerDuration(sec)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      timerDuration === sec
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                  </button>
                ))}
              </div>
            </div>

            {selectedTutor && (
              <div className="bg-card rounded-xl p-4 shadow-card mb-6 max-w-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedTutor.emoji}</span>
                  <p className="text-sm text-left">
                    "{selectedTutor.name} believes in you! Use hints if needed, but they reduce XP."
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={() => setGameState('playing')}
              className="h-14 px-8 text-lg font-bold gap-2"
            >
              Start Game
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (gameState === 'finished') {
    return (
      <AppLayout title="Game Complete!">
        <div className="p-4 pb-8 flex flex-col min-h-[calc(100vh-56px)]">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Amazing!</h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-card mt-6 w-full max-w-sm">
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-game-xp" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-bold text-xl">{score}/{shuffledQuestions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-bold text-xl text-game-xp">+{xpEarned}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-bold text-xl">
                    {Math.round((score / shuffledQuestions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={restartGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button onClick={() => navigate('/topics')}>
                Back to Topics
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}`}>
      <div className="p-4 pb-24">
        {/* Progress & Timer */}
        <div className="mb-6">
          <div className="flex gap-1 mb-4">
            {shuffledQuestions.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  i < currentQuestionIndex ? 'bg-success' :
                  i === currentQuestionIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          {gameState === 'playing' && (
            <GameTimer
              duration={timerDuration}
              onTimeUp={handleTimeUp}
              isRunning={gameState === 'playing'}
            />
          )}
        </div>

        {/* Score Display */}
        <ScoreDisplay
          score={score}
          streak={streak}
          xpEarned={xpEarned}
          className="justify-center mb-6"
        />

        {/* Question */}
        {currentQuestion && (
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${
                currentQuestion.difficulty === 'easy' ? 'bg-success/20 text-success' :
                currentQuestion.difficulty === 'medium' ? 'bg-warning/20 text-warning' :
                'bg-destructive/20 text-destructive'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">
                +{currentQuestion.xpReward} XP
              </span>
            </div>

            <p className="text-muted-foreground mb-2">Name this compound:</p>
            <div className="bg-secondary rounded-xl p-6 mb-4">
              <p className="font-mono text-xl text-center">{currentQuestion.structure}</p>
            </div>

            {/* Hint */}
            {showHint && hintsUsed > 0 && (
              <div className="bg-warning/10 rounded-xl p-3 mb-4 border border-warning/30">
                <p className="text-sm">
                  <Lightbulb className="h-4 w-4 inline mr-2 text-warning" />
                  {currentQuestion.hints[hintsUsed - 1]}
                </p>
              </div>
            )}

            {/* Answer Input */}
            {gameState === 'playing' && (
              <>
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter IUPAC name..."
                  className="mb-4 h-12 text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && answer && checkAnswer()}
                />
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={useHint}
                    disabled={hintsUsed >= currentQuestion.hints.length}
                    className="gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hint ({currentQuestion.hints.length - hintsUsed})
                  </Button>
                  <Button
                    onClick={checkAnswer}
                    disabled={!answer}
                    className="flex-1"
                  >
                    Check Answer
                  </Button>
                </div>
              </>
            )}

            {/* Result */}
            {gameState === 'checking' && (
              <div className={`rounded-xl p-6 text-center ${
                isCorrect ? 'bg-success/10' : 'bg-destructive/10'
              }`}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  isCorrect ? 'bg-success' : 'bg-destructive'
                }`}>
                  {isCorrect ? (
                    <Check className="h-8 w-8 text-success-foreground" />
                  ) : (
                    <X className="h-8 w-8 text-destructive-foreground" />
                  )}
                </div>
                
                <h3 className="font-bold text-xl mb-2">
                  {isCorrect ? 'Correct!' : 'Not quite!'}
                </h3>
                
                {!isCorrect && (
                  <p className="text-muted-foreground">
                    The correct answer was: <span className="font-bold text-foreground">{currentQuestion.name}</span>
                  </p>
                )}

                <Button onClick={nextQuestion} className="mt-4">
                  {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default GameIUPAC;
