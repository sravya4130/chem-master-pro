import { cn } from '@/lib/utils';

interface FormulaBoxProps {
  formula: string;
  label?: string;
  isFinal?: boolean;
  className?: string;
  animate?: boolean;
}

// Simple formula renderer that converts basic notation to styled elements
const renderFormula = (formula: string) => {
  // Handle fractions like "u²sin²θ/2g" -> numerator/denominator
  if (formula.includes('/')) {
    const parts = formula.split('/');
    if (parts.length === 2) {
      return (
        <span className="inline-flex flex-col items-center mx-1">
          <span className="border-b border-current px-2">{renderFormulaText(parts[0])}</span>
          <span className="px-2">{renderFormulaText(parts[1])}</span>
        </span>
      );
    }
  }
  return renderFormulaText(formula);
};

const renderFormulaText = (text: string) => {
  // Replace common patterns
  return text
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/theta/gi, 'θ')
    .replace(/alpha/gi, 'α')
    .replace(/beta/gi, 'β')
    .replace(/sqrt\(([^)]+)\)/g, '√($1)')
    .split('')
    .map((char, i) => {
      if (char === '²' || char === '³') {
        return <sup key={i}>{char}</sup>;
      }
      return char;
    });
};

export const FormulaBox = ({ 
  formula, 
  label, 
  isFinal = false,
  className,
  animate = true
}: FormulaBoxProps) => {
  return (
    <div 
      className={cn(
        "relative my-4 transition-all duration-500",
        animate && "animate-scale-in",
        className
      )}
    >
      {label && (
        <p className="text-sm text-muted-foreground mb-2 font-medium">{label}</p>
      )}
      <div 
        className={cn(
          "px-6 py-4 rounded-xl font-mono text-xl text-center transition-all",
          isFinal 
            ? "bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-2 border-primary shadow-lg shadow-primary/20" 
            : "bg-muted/50 border border-border"
        )}
      >
        {isFinal && (
          <div className="absolute -top-2 -right-2">
            <span className="flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-primary items-center justify-center text-xs text-primary-foreground">✓</span>
            </span>
          </div>
        )}
        <span className={cn(
          "font-bold",
          isFinal && "text-primary"
        )}>
          {renderFormula(formula)}
        </span>
      </div>
    </div>
  );
};

export default FormulaBox;