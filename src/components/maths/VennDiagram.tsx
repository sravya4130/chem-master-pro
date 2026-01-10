import { useMemo } from 'react';

interface VennDiagramProps {
  type: 'union' | 'intersection' | 'difference' | 'complement' | 'basic';
  setA?: string[];
  setB?: string[];
  universal?: string[];
  showLabels?: boolean;
  animated?: boolean;
}

export const VennDiagram = ({ 
  type, 
  setA = ['1', '2', '3'], 
  setB = ['3', '4', '5'], 
  universal = ['1', '2', '3', '4', '5', '6'],
  showLabels = true,
  animated = true 
}: VennDiagramProps) => {
  const result = useMemo(() => {
    switch (type) {
      case 'union':
        return [...new Set([...setA, ...setB])];
      case 'intersection':
        return setA.filter(x => setB.includes(x));
      case 'difference':
        return setA.filter(x => !setB.includes(x));
      case 'complement':
        return universal.filter(x => !setA.includes(x));
      default:
        return setA;
    }
  }, [type, setA, setB, universal]);

  const onlyInA = setA.filter(x => !setB.includes(x));
  const onlyInB = setB.filter(x => !setA.includes(x));
  const inBoth = setA.filter(x => setB.includes(x));
  const outside = universal.filter(x => !setA.includes(x) && !setB.includes(x));

  const getHighlightClass = (section: 'a' | 'b' | 'both' | 'outside') => {
    const baseClass = animated ? 'transition-all duration-500' : '';
    switch (type) {
      case 'union':
        return section === 'outside' ? `${baseClass} opacity-30` : `${baseClass} opacity-100`;
      case 'intersection':
        return section === 'both' ? `${baseClass} opacity-100` : `${baseClass} opacity-30`;
      case 'difference':
        return section === 'a' ? `${baseClass} opacity-100` : `${baseClass} opacity-30`;
      case 'complement':
        return section === 'a' || section === 'both' ? `${baseClass} opacity-30` : `${baseClass} opacity-100`;
      default:
        return baseClass;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'union': return 'A ∪ B (Union)';
      case 'intersection': return 'A ∩ B (Intersection)';
      case 'difference': return 'A - B (Difference)';
      case 'complement': return "A' (Complement)";
      default: return 'Sets A and B';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'union': return 'All elements in A OR B (or both)';
      case 'intersection': return 'Elements in BOTH A AND B';
      case 'difference': return 'Elements in A but NOT in B';
      case 'complement': return 'Elements NOT in A (from universal set)';
      default: return 'Two overlapping sets';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      {showLabels && (
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold text-purple-400">{getTitle()}</h3>
          <p className="text-sm text-muted-foreground">{getDescription()}</p>
        </div>
      )}
      
      <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
        {/* Universal Set Rectangle */}
        <div className={`absolute inset-2 border-2 border-dashed border-muted-foreground/50 rounded-lg ${getHighlightClass('outside')}`}>
          <span className="absolute top-1 left-2 text-xs text-muted-foreground">U</span>
          {/* Outside elements */}
          <div className="absolute bottom-2 right-2 flex gap-1 flex-wrap justify-end max-w-[60px]">
            {outside.map((el, i) => (
              <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">{el}</span>
            ))}
          </div>
        </div>
        
        {/* Set A Circle */}
        <div 
          className={`absolute left-[15%] top-[20%] w-[45%] aspect-square rounded-full border-3 border-purple-500 ${
            type === 'intersection' || type === 'complement' ? 'bg-purple-500/10' : 'bg-purple-500/30'
          } ${getHighlightClass('a')} ${animated ? 'animate-pulse-slow' : ''}`}
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-purple-400">A</span>
          {/* Only in A */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {onlyInA.map((el, i) => (
              <span key={i} className={`text-sm bg-purple-500/40 px-2 py-0.5 rounded font-mono ${getHighlightClass('a')}`}>{el}</span>
            ))}
          </div>
        </div>
        
        {/* Set B Circle */}
        <div 
          className={`absolute right-[15%] top-[20%] w-[45%] aspect-square rounded-full border-3 border-cyan-500 ${
            type === 'difference' || type === 'complement' ? 'bg-cyan-500/10' : 'bg-cyan-500/30'
          } ${getHighlightClass('b')} ${animated ? 'animate-pulse-slow' : ''}`}
          style={{ animationDelay: '0.5s' }}
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-cyan-400">B</span>
          {/* Only in B */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {onlyInB.map((el, i) => (
              <span key={i} className={`text-sm bg-cyan-500/40 px-2 py-0.5 rounded font-mono ${getHighlightClass('b')}`}>{el}</span>
            ))}
          </div>
        </div>
        
        {/* Intersection Area */}
        <div className={`absolute left-1/2 top-[35%] -translate-x-1/2 flex flex-col gap-1 z-10 ${getHighlightClass('both')}`}>
          {inBoth.map((el, i) => (
            <span key={i} className="text-sm bg-gradient-to-r from-purple-500/60 to-cyan-500/60 px-2 py-0.5 rounded font-mono text-white shadow-lg">{el}</span>
          ))}
        </div>
      </div>
      
      {/* Result Display */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Result:</p>
        <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl">
          <span className="font-mono text-lg font-bold text-purple-400">
            {'{' + result.join(', ') + '}'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VennDiagram;
