import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Timer, RotateCcw } from 'lucide-react';

interface FormulaCard {
  term: string;
  formula: string;
}

interface FlashcardGameProps {
  cards: FormulaCard[];
  timeLimit?: number;
  onComplete?: (correct: boolean) => void;
  tutorSpeak?: (text: string) => void;
}

export const FlashcardGame = ({ 
  cards, 
  timeLimit = 30, 
  onComplete,
  tutorSpeak 
}: FlashcardGameProps) => {
  const [phase, setPhase] = useState<'memorize' | 'quiz' | 'result'>('memorize');
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledCards, setShuffledCards] = useState<FormulaCard[]>([]);

  // Shuffle and start quiz
  const startQuiz = useCallback(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    const randomTarget = Math.floor(Math.random() * shuffled.length);
    setTargetIndex(randomTarget);
    setFlippedCards(new Set());
    setSelectedIndex(null);
    setIsCorrect(null);
    setPhase('quiz');
  }, [cards]);

  // Timer for memorize phase
  useEffect(() => {
    if (phase !== 'memorize') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, startQuiz]);

  const handleCardClick = (index: number) => {
    if (phase !== 'quiz' || selectedIndex !== null) return;
    
    setFlippedCards(prev => new Set(prev).add(index));
    setSelectedIndex(index);
    
    const correct = shuffledCards[index].term === shuffledCards[targetIndex!].term;
    setIsCorrect(correct);
    
    if (correct) {
      tutorSpeak?.("Well done! That's correct!");
    } else {
      tutorSpeak?.("Oops! That wasn't the right one. Keep practicing!");
    }
    
    setTimeout(() => {
      setPhase('result');
      onComplete?.(correct);
    }, 1500);
  };

  const resetGame = () => {
    setPhase('memorize');
    setTimeLeft(timeLimit);
    setFlippedCards(new Set());
    setTargetIndex(null);
    setSelectedIndex(null);
    setIsCorrect(null);
    setShuffledCards([]);
  };

  if (phase === 'memorize') {
    return (
      <div className="space-y-4">
        {/* Timer */}
        <div className="flex items-center justify-center gap-2 text-lg font-bold">
          <Timer className={cn("h-5 w-5", timeLeft <= 10 && "text-destructive animate-pulse")} />
          <span className={cn(timeLeft <= 10 && "text-destructive")}>
            {timeLeft}s - Memorize!
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-3 border border-primary/30"
            >
              <p className="font-bold text-sm text-primary">{card.term}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{card.formula}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Study the table! Cards will flip in {timeLeft} seconds...
        </p>
      </div>
    );
  }

  if (phase === 'quiz') {
    return (
      <div className="space-y-4">
        {/* Target Question */}
        <div className="bg-primary text-primary-foreground rounded-xl p-4 text-center">
          <p className="text-sm opacity-80">Find the card for:</p>
          <p className="text-xl font-bold">{shuffledCards[targetIndex!]?.term}</p>
        </div>

        {/* Shuffled Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {shuffledCards.map((card, index) => {
            const isFlipped = flippedCards.has(index);
            const isSelected = selectedIndex === index;
            
            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
              className={cn(
                "relative h-24 cursor-pointer transition-all duration-300",
                isSelected && isCorrect && "ring-2 ring-success",
                isSelected && !isCorrect && "ring-2 ring-destructive"
              )}
            >
              <div
                className={cn(
                  "w-full h-full rounded-xl transition-transform duration-500",
                  isFlipped && "scale-95"
                )}
              >
                {/* Back of card (hidden content) */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-secondary to-muted rounded-xl flex items-center justify-center",
                  isFlipped && "hidden"
                )}>
                    <span className="text-2xl">❓</span>
                  </div>
                  
                {/* Front of card (revealed) */}
                {isFlipped && (
                  <div className={cn(
                    "absolute inset-0 rounded-xl p-3 flex flex-col justify-center",
                    isSelected && isCorrect ? "bg-success/20 border-2 border-success" :
                    isSelected && !isCorrect ? "bg-destructive/20 border-2 border-destructive" :
                    "bg-card border border-border"
                  )}>
                    <p className="font-bold text-xs text-primary">{card.term}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono line-clamp-2">{card.formula}</p>
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Tap a card to reveal it!
        </p>
      </div>
    );
  }

  // Result phase
  return (
    <div className="space-y-4 text-center">
      {isCorrect ? (
        <div className="bg-success/20 rounded-xl p-6 border border-success">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
          <h3 className="text-xl font-bold text-success">Well Done!</h3>
          <p className="text-sm text-muted-foreground">You found the correct card!</p>
        </div>
      ) : (
        <div className="bg-destructive/20 rounded-xl p-6 border border-destructive">
          <XCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
          <h3 className="text-xl font-bold text-destructive">Not Quite!</h3>
          <p className="text-sm text-muted-foreground">
            The correct answer was: <strong>{shuffledCards[targetIndex!]?.term}</strong>
          </p>
        </div>
      )}

      <Button onClick={resetGame} variant="outline" className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};
