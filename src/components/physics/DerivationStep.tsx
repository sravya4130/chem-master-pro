import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TypewriterText } from './TypewriterText';

interface DerivationStepProps {
  stepNumber: number;
  text: string;
  formula?: string;
  delay?: number;
  className?: string;
}

export const DerivationStep = ({ 
  stepNumber, 
  text, 
  formula,
  delay = 0,
  className 
}: DerivationStepProps) => {
  const [isVisible, setIsVisible] = useState(delay === 0);
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "flex gap-3 mb-4 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
        {stepNumber}
      </div>
      <div className="flex-1">
        <p className="text-foreground mb-2" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
          <TypewriterText 
            text={text} 
            speed={25} 
            onComplete={() => formula && setShowFormula(true)}
          />
        </p>
        {formula && showFormula && (
          <div className="bg-muted/50 rounded-lg px-4 py-2 font-mono text-lg animate-scale-in inline-block">
            {formula
              .replace(/\^2/g, '²')
              .replace(/\^3/g, '³')
              .replace(/theta/gi, 'θ')
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default DerivationStep;