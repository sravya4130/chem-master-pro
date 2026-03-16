import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { useMistakes } from '@/contexts/MistakeContext';
import { Button } from '@/components/ui/button';
import { GameTimer } from '@/components/game/GameTimer';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { ArrowLeft, Check, X, Trophy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

const questions: Question[] = [
  // Mole concept
  {
    id: 1, question: "What is the value of Avogadro's number?",
    options: ["6.022 × 10²³", "6.022 × 10²²", "3.011 × 10²³", "6.022 × 10²⁴"],
    correctAnswer: "6.022 × 10²³", topic: "Mole Concept", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 2, question: "1 mole of any gas at STP occupies what volume?",
    options: ["11.2 L", "22.4 L", "44.8 L", "6.022 L"],
    correctAnswer: "22.4 L", topic: "Mole Concept", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 3, question: "What is the formula for number of moles?",
    options: ["n = Given mass / Molar mass", "n = Molar mass / Given mass", "n = Mass × Avogadro's number", "n = Volume / 22.4 at NTP"],
    correctAnswer: "n = Given mass / Molar mass", topic: "Mole Concept", difficulty: 'easy', xpReward: 10,
  },
  // Molarity
  {
    id: 4, question: "What is the formula for Molarity?",
    options: ["M = moles of solute / volume of solution in L", "M = mass / volume", "M = moles / mass of solvent in kg", "M = equivalents / volume"],
    correctAnswer: "M = moles of solute / volume of solution in L", topic: "Molarity", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 5, question: "What is the symbol for Molarity?",
    options: ["m", "M", "N", "χ"],
    correctAnswer: "M", topic: "Molarity", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 6, question: "If 2 moles of NaOH are dissolved in 500 mL solution, what is the Molarity?",
    options: ["1 M", "2 M", "4 M", "0.5 M"],
    correctAnswer: "4 M", topic: "Molarity", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 7, question: "Molarity of a mixture of two solutions of same solute is given by?",
    options: ["M = (M₁V₁ + M₂V₂) / (V₁ + V₂)", "M = M₁ + M₂", "M = (M₁ + M₂) / 2", "M = M₁V₁ / V₂"],
    correctAnswer: "M = (M₁V₁ + M₂V₂) / (V₁ + V₂)", topic: "Molarity", difficulty: 'hard', xpReward: 20,
  },
  // Molality
  {
    id: 8, question: "What is the formula for Molality?",
    options: ["m = moles of solute / mass of solvent in kg", "m = moles / volume in L", "m = mass / moles", "m = equivalents / mass"],
    correctAnswer: "m = moles of solute / mass of solvent in kg", topic: "Molality", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 9, question: "Molality is independent of?",
    options: ["Temperature", "Pressure", "Mass", "Concentration"],
    correctAnswer: "Temperature", topic: "Molality", difficulty: 'medium', xpReward: 15,
  },
  // Normality
  {
    id: 10, question: "What is the formula for Normality?",
    options: ["N = gram equivalents / volume in L", "N = moles / volume", "N = mass / equivalents", "N = moles × n-factor"],
    correctAnswer: "N = gram equivalents / volume in L", topic: "Normality", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 11, question: "What is the relation between Normality and Molarity?",
    options: ["N = M × n-factor", "N = M / n-factor", "N = M + n-factor", "N = M² × n-factor"],
    correctAnswer: "N = M × n-factor", topic: "Normality", difficulty: 'hard', xpReward: 20,
  },
  {
    id: 12, question: "The n-factor of H₂SO₄ is?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2", topic: "Normality", difficulty: 'easy', xpReward: 10,
  },
  // Formulas & General
  {
    id: 13, question: "What is the formula for mole fraction (χ)?",
    options: ["χ = nₐ / (nₐ + n_b)", "χ = nₐ × n_b", "χ = nₐ - n_b", "χ = nₐ / n_b"],
    correctAnswer: "χ = nₐ / (nₐ + n_b)", topic: "Mole Fraction", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 14, question: "What is the formula for % w/w?",
    options: ["(mass of solute / mass of solution) × 100", "(mass of solute / volume of solution) × 100", "(volume of solute / volume of solution) × 100", "(moles / mass) × 100"],
    correctAnswer: "(mass of solute / mass of solution) × 100", topic: "Concentration", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 15, question: "Equivalent weight of an element is?",
    options: ["Atomic weight / Valency", "Molecular weight / n-factor", "Atomic weight × Valency", "Molecular weight × n-factor"],
    correctAnswer: "Atomic weight / Valency", topic: "Equivalent Weight", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 16, question: "What is the molar mass of water (H₂O)?",
    options: ["16 g/mol", "18 g/mol", "20 g/mol", "2 g/mol"],
    correctAnswer: "18 g/mol", topic: "Molar Mass", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 17, question: "Empirical formula represents?",
    options: ["Simplest whole number ratio of atoms", "Actual number of atoms", "Molecular weight", "Moles of compound"],
    correctAnswer: "Simplest whole number ratio of atoms", topic: "Chemical Formula", difficulty: 'easy', xpReward: 10,
  },
  {
    id: 18, question: "Relation between molecular formula and empirical formula?",
    options: ["Molecular formula = n × Empirical formula", "Molecular formula = Empirical formula / n", "They are always the same", "No relation"],
    correctAnswer: "Molecular formula = n × Empirical formula", topic: "Chemical Formula", difficulty: 'medium', xpReward: 15,
  },
  {
    id: 19, question: "What is the relation between Molarity (M), Molality (m), and density (d)?",
    options: ["M = (m × d × 1000) / (1000 + m × M₂)", "M = m × d", "M = m / d", "M = m + d"],
    correctAnswer: "M = (m × d × 1000) / (1000 + m × M₂)", topic: "Concentration Relations", difficulty: 'hard', xpReward: 20,
  },
  {
    id: 20, question: "Law of Conservation of Mass was given by?",
    options: ["Lavoisier", "Dalton", "Proust", "Gay Lussac"],
    correctAnswer: "Lavoisier", topic: "Chemical Laws", difficulty: 'easy', xpReward: 10,
  },
];

const GameBasicConcepts = () => {
  const navigate = useNavigate();
  const { addXP, selectedTutor } = useApp();
  const { addMistake } = useMistakes();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const question = shuffledQuestions[currentQuestion];

  const handleTimeUp = useCallback(() => {
    if (!selectedAnswer && question) {
      addMistake({
        subject: 'chemistry',
        topic: question.topic,
        topicId: 'basic-concepts',
        question: question.question,
        userAnswer: 'Time Up',
        correctAnswer: question.correctAnswer,
      });
      toast.error(`⏰ Time's up! The answer was: ${question.correctAnswer}`);
      setTimeout(() => {
        if (currentQuestion < shuffledQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setTimerKey(prev => prev + 1);
        } else {
          setGameOver(true);
        }
      }, 1500);
    }
  }, [selectedAnswer, question, currentQuestion, shuffledQuestions.length, addMistake]);

  const checkAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      setTotalXP(prev => prev + question.xpReward);
      addXP(question.xpReward);
      toast.success(`✅ Correct! +${question.xpReward} XP`);
    } else {
      addMistake({
        subject: 'chemistry',
        topic: question.topic,
        topicId: 'basic-concepts',
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
      });
      toast.error(`❌ Wrong! The answer was: ${question.correctAnswer}`);
    }

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setTotalXP(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
    setTimeLeft(30);
  };

  if (!question && !gameOver) return null;

  return (
    <AppLayout title="Basic Concepts Quiz">
      <div className="p-4 pb-8">
        <Button variant="ghost" onClick={() => navigate('/topics')} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Topics
        </Button>

        {!gameOver ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <ScoreDisplay score={score} totalQuestions={shuffledQuestions.length} xp={totalXP} />
              <GameTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} isActive={!selectedAnswer && !gameOver} />
            </div>

            {/* Progress */}
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="bg-card/90 backdrop-blur-md rounded-3xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">{question.topic}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>{question.difficulty}</span>
              </div>
              <p className="text-lg font-semibold mb-1">Question {currentQuestion + 1} of {shuffledQuestions.length}</p>
              <p className="text-foreground text-base">{question.question}</p>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {question.options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-2xl border transition-all duration-200 text-sm font-medium ";
                if (selectedAnswer) {
                  if (option === question.correctAnswer) {
                    btnClass += "bg-green-500/20 border-green-500 text-green-300";
                  } else if (option === selectedAnswer && !isCorrect) {
                    btnClass += "bg-red-500/20 border-red-500 text-red-300";
                  } else {
                    btnClass += "bg-secondary/50 border-border/50 text-muted-foreground opacity-50";
                  }
                } else {
                  btnClass += "bg-card/80 border-border/50 hover:border-primary hover:bg-primary/10 text-foreground";
                }

                return (
                  <button key={idx} className={btnClass} onClick={() => checkAnswer(option)} disabled={!!selectedAnswer}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                      {selectedAnswer && option === question.correctAnswer && <Check className="h-5 w-5 ml-auto text-green-400" />}
                      {selectedAnswer && option === selectedAnswer && !isCorrect && <X className="h-5 w-5 ml-auto text-red-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tutor */}
            {selectedTutor && selectedAnswer && (
              <div className="bg-card/80 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">{selectedTutor.emoji}</div>
                <p className="text-sm text-muted-foreground">
                  {isCorrect ? `"Great job! You nailed it! 🎉" — ${selectedTutor.name}` : `"Don't worry, you'll get it next time! Keep learning! 💪" — ${selectedTutor.name}`}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Game Over */
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="bg-card/90 backdrop-blur-md rounded-3xl p-8 shadow-card border border-border/50">
              <Trophy className="h-16 w-16 text-game-xp mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-muted-foreground mb-6">Basic Concepts of Chemistry</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/50 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-primary">{score}/{shuffledQuestions.length}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-game-xp">{totalXP} XP</p>
                  <p className="text-xs text-muted-foreground">Earned</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={restartGame} className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" /> Play Again
                </Button>
                <Button variant="outline" onClick={() => navigate('/topics')} className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Topics
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default GameBasicConcepts;
