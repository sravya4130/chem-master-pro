import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ReactionStep } from '@/data/organicChemistryData';

interface Props {
  steps: ReactionStep[];
  onNarrate?: (text: string) => void;
  onStop?: () => void;
}

export const ReactionMechanism = ({ steps, onNarrate, onStop }: Props) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    onNarrate?.(steps[current].narration);
    const t = setTimeout(() => {
      if (current < steps.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setPlaying(false);
      }
    }, Math.max(4500, steps[current].narration.length * 55));
    return () => clearTimeout(t);
  }, [playing, current, steps, onNarrate]);

  const reset = () => {
    setPlaying(false);
    setCurrent(0);
    onStop?.();
  };

  const step = steps[current];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-primary/20 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary/80 font-semibold">
            Mechanism · Step {current + 1} of {steps.length}
          </p>
          <h3 className="text-xl font-bold mt-1">{step.title}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={playing ? 'secondary' : 'default'}
            onClick={() => setPlaying(p => !p)}
            className="rounded-full"
            aria-label={playing ? 'Pause' : 'Play mechanism'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={reset} className="rounded-full" aria-label="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Progress value={((current + 1) / steps.length) * 100} className="h-1 mb-6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          {/* Animated equation */}
          <div className="rounded-2xl bg-background/60 border border-border/50 p-5 font-mono text-sm md:text-base overflow-x-auto">
            <motion.pre
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="whitespace-pre-wrap text-center text-primary-foreground"
            >
              {step.equation}
            </motion.pre>
          </div>

          {/* Animated arrow / electron flow visual */}
          <div className="flex items-center justify-center gap-2 py-2">
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
            <ChevronRight className="h-5 w-5 text-primary animate-pulse" />
          </div>

          <p className="text-muted-foreground leading-relaxed">{step.description}</p>

          <div className="rounded-2xl bg-primary/10 border border-primary/30 p-4">
            <p className="text-xs uppercase tracking-wider text-primary font-bold mb-2">🎙️ AI Tutor</p>
            <p className="text-sm italic leading-relaxed">"{step.narration}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ← Prev
        </Button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-primary' : 'w-2 bg-border'
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};
