import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GameTimer } from '@/components/game/GameTimer';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { sigmaPiQuestions } from '@/data/sigmaPiData';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const GameSigmaPi = () => {
  const navigate = useNavigate();
  const { addXP, setUserProgress } = useApp();

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [state, setState] = useState<'ready' | 'playing' | 'checking' | 'finished'>('ready');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = sigmaPiQuestions[index];

  const checkAnswer = () => {
    const correct =
      answer.trim().toLowerCase() === current.name.toLowerCase();

    setIsCorrect(correct);
    setState('checking');

    if (correct) {
      addXP(current.xpReward);
      setScore(s => s + 1);
      toast.success(`+${current.xpReward} XP`);
    } else {
      toast.error('Wrong answer');
    }
  };

  const next = () => {
    if (index < sigmaPiQuestions.length - 1) {
      setIndex(i => i + 1);
      setAnswer('');
      setIsCorrect(null);
      setState('playing');
    } else {
      setState('finished');
      setUserProgress(p => ({
        ...p,
        completedTopics: [...p.completedTopics, 'sigma-pi']
      }));
    }
  };

  if (state === 'ready') {
    return (
      <AppLayout title="Sigma & Pi Bond Game">
        <div className="p-6 text-center">
          <Button onClick={() => setState('playing')}>Start Game</Button>
        </div>
      </AppLayout>
    );
  }

  if (state === 'finished') {
    return (
      <AppLayout title="Completed">
        <div className="p-6 text-center">
          <p className="text-xl font-bold">Score: {score}</p>
          <Button onClick={() => navigate('/topics')}>Back to Topics</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Question ${index + 1}`}>
      <div className="p-6">
        <ScoreDisplay score={score} streak={0} xpEarned={0} />

        <div className="bg-card p-4 rounded-xl mt-4">
          <p className="mb-4">{current.structure}</p>

          {state === 'playing' && (
            <>
              <Input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Your answer"
              />
              <Button onClick={checkAnswer} className="mt-4">Check</Button>
            </>
          )}

          {state === 'checking' && (
            <>
              <p className="mt-4">
                {isCorrect ? 'Correct!' : `Correct answer: ${current.name}`}
              </p>
              <Button onClick={next} className="mt-4">
                Next <ArrowRight />
              </Button>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default GameSigmaPi;
