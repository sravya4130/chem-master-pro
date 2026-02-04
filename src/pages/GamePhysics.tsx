import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { useMistakes } from '@/contexts/MistakeContext';
import { Button } from '@/components/ui/button';
import { GameTimer } from '@/components/game/GameTimer';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { dimensionsQuestions, motionQuestions, PhysicsQuestion } from '@/data/physicsData';
import { ArrowRight, Lightbulb, X, Check, Trophy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const GamePhysics = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const { addXP, selectedTutor, setUserProgress } = useApp();
  const { addMistake } = useMistakes();

  const getQuestions = (): PhysicsQuestion[] => {
    switch (topicId) {
      case 'units-dimensions': return dimensionsQuestions;
      case 'motion-in-plane': return motionQuestions;
      default: return dimensionsQuestions;
    }
  };

  const getTopicName = () => {
    switch (topicId) {
      case 'units-dimensions': return 'Units & Dimensions';
      case 'motion-in-plane': return 'Motion in a Plane';
      default: return 'Physics';
    }
  };

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'checking' | 'finished'>('ready');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timerDuration, setTimerDuration] = useState(60);
  const [shuffledQuestions, setShuffledQuestions] = useState<PhysicsQuestion[]>([]);

  useEffect(() => {
    setShuffledQuestions([...getQuestions()].sort(() => Math.random() - 0.5));
  }, [topicId]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleTimeUp = useCallback(() => {
    setIsCorrect(false);
    setStreak(0);
    setGameState('checking');
    toast.error("Time's up!");
  }, []);

  const checkAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;
    const correct = selectedAnswer === currentQuestion.answer;
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
      
      // Record the mistake
      addMistake({
        subject: 'physics',
        topic: getTopicName(),
        topicId: topicId || 'physics',
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setHintsUsed(0);
      setShowHint(false);
      setGameState('playing');
    } else {
      setGameState('finished');
      setUserProgress(prev => ({
        ...prev,
        streak: prev.streak + 1,
        completedTopics: prev.completedTopics.includes(topicId || '') ? prev.completedTopics : [...prev.completedTopics, topicId || '']
      }));
    }
  };

  const restartGame = () => {
    setShuffledQuestions([...getQuestions()].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
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
      <AppLayout title={`${getTopicName()} Game`}>
        <div className="p-4 pb-8 flex flex-col min-h-[calc(100vh-56px)]">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6 animate-bounce-in">🎮</div>
            <h2 className="text-2xl font-bold mb-2">Ready to Play?</h2>
            <p className="text-muted-foreground mb-6">Answer questions and earn XP!</p>
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">Time per question:</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {[30, 60, 120, 180, 300].map((sec) => (
                  <button key={sec} onClick={() => setTimerDuration(sec)} className={`px-4 py-2 rounded-xl font-medium transition-all ${timerDuration === sec ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>
                    {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                  </button>
                ))}
              </div>
            </div>
            {selectedTutor && <div className="bg-card rounded-xl p-4 shadow-card mb-6 max-w-sm"><div className="flex items-center gap-3"><span className="text-2xl">{selectedTutor.emoji}</span><p className="text-sm text-left">"{selectedTutor.name} believes in you! Use hints if needed, but they reduce XP."</p></div></div>}
            <Button onClick={() => setGameState('playing')} className="h-14 px-8 text-lg font-bold gap-2">Start Game<ArrowRight className="h-5 w-5" /></Button>
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
              <div className="flex justify-center mb-6"><Trophy className="h-16 w-16 text-game-xp" /></div>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-muted-foreground">Score</span><span className="font-bold text-xl">{score}/{shuffledQuestions.length}</span></div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground">XP Earned</span><span className="font-bold text-xl text-game-xp">+{xpEarned}</span></div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground">Accuracy</span><span className="font-bold text-xl">{Math.round((score / shuffledQuestions.length) * 100)}%</span></div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={restartGame}><RotateCcw className="h-4 w-4 mr-2" />Play Again</Button>
              <Button onClick={() => navigate('/topics/physics')}>Back to Topics</Button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}`}>
      <div className="p-4 pb-24">
        <div className="mb-6">
          <div className="flex gap-1 mb-4">{shuffledQuestions.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i < currentQuestionIndex ? 'bg-success' : i === currentQuestionIndex ? 'bg-primary' : 'bg-muted'}`} />)}</div>
          {gameState === 'playing' && <GameTimer duration={timerDuration} onTimeUp={handleTimeUp} isRunning={gameState === 'playing'} />}
        </div>
        <ScoreDisplay score={score} streak={streak} xpEarned={xpEarned} className="justify-center mb-6" />
        {currentQuestion && (
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${currentQuestion.difficulty === 'easy' ? 'bg-success/20 text-success' : currentQuestion.difficulty === 'medium' ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'}`}>{currentQuestion.difficulty}</span>
              <span className="text-xs text-muted-foreground">+{currentQuestion.xpReward} XP</span>
            </div>
            <p className="font-medium mb-4">{currentQuestion.question}</p>
            {showHint && hintsUsed > 0 && <div className="bg-warning/10 rounded-xl p-3 mb-4 border border-warning/30"><p className="text-sm"><Lightbulb className="h-4 w-4 inline mr-2 text-warning" />{currentQuestion.hints[hintsUsed - 1]}</p></div>}
            {gameState === 'playing' && (
              <>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button key={idx} onClick={() => setSelectedAnswer(option)} className={`w-full p-4 rounded-xl text-left transition-all ${selectedAnswer === option ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>{option}</button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { setShowHint(true); setHintsUsed(prev => prev + 1); toast.info('Hint revealed! (-30% XP)'); }} disabled={hintsUsed >= currentQuestion.hints.length} className="gap-2"><Lightbulb className="h-4 w-4" />Hint ({currentQuestion.hints.length - hintsUsed})</Button>
                  <Button onClick={checkAnswer} disabled={!selectedAnswer} className="flex-1">Check Answer</Button>
                </div>
              </>
            )}
            {gameState === 'checking' && (
              <div className={`rounded-xl p-6 text-center ${isCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isCorrect ? 'bg-success' : 'bg-destructive'}`}>{isCorrect ? <Check className="h-8 w-8 text-success-foreground" /> : <X className="h-8 w-8 text-destructive-foreground" />}</div>
                <h3 className="font-bold text-xl mb-2">{isCorrect ? 'Correct!' : 'Not quite!'}</h3>
                {!isCorrect && <p className="text-muted-foreground">The correct answer was: <span className="font-bold text-foreground">{currentQuestion.answer}</span></p>}
                <Button onClick={nextQuestion} className="mt-4">{currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'See Results'}<ArrowRight className="h-4 w-4 ml-2" /></Button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default GamePhysics;
