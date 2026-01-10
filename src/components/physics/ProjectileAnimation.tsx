import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectileAnimationProps {
  highlight?: 'range' | 'height' | 'time' | 'all';
  autoPlay?: boolean;
  onMaxHeight?: () => void;
  onComplete?: () => void;
  className?: string;
}

export const ProjectileAnimation = ({ 
  highlight = 'all', 
  autoPlay = false,
  onMaxHeight,
  onComplete,
  className 
}: ProjectileAnimationProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [ballPosition, setBallPosition] = useState({ x: 20, y: 180 });
  const [showMaxHeightLabel, setShowMaxHeightLabel] = useState(false);
  const [showRangeLabel, setShowRangeLabel] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>();

  const startAnimation = () => {
    setIsPlaying(true);
    setShowMaxHeightLabel(false);
    setShowRangeLabel(false);
    setBallPosition({ x: 20, y: 180 });
    setAnimationProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const duration = 3000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);

      // Parabolic trajectory: x goes 20 -> 380, y follows parabola
      const x = 20 + progress * 360;
      // Parabola: y = 180 - 140 * (1 - (2*progress - 1)^2)
      const normalizedProgress = 2 * progress - 1; // -1 to 1
      const y = 180 - 140 * (1 - normalizedProgress * normalizedProgress);
      
      setBallPosition({ x, y });

      // Show max height label at peak (progress ~0.5)
      if (progress >= 0.48 && progress <= 0.52 && !showMaxHeightLabel) {
        setShowMaxHeightLabel(true);
        onMaxHeight?.();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setShowRangeLabel(true);
        setIsPlaying(false);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, onMaxHeight, onComplete]);

  return (
    <div className={cn("relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden", className)}>
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background */}
        <rect x="0" y="0" width="400" height="200" fill="url(#skyGradient)" />
        
        {/* Ground */}
        <rect x="0" y="200" width="400" height="40" fill="url(#groundGradient)" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#22c55e" strokeWidth="2" />
        
        {/* X-Axis (horizontal component) */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <polygon points="380,195 390,200 380,205" fill="#94a3b8" />
        <text x="370" y="225" fill="#94a3b8" fontSize="12" fontFamily="monospace">x</text>
        <text x="30" y="225" fill="#60a5fa" fontSize="10" fontFamily="monospace">u cos θ</text>
        
        {/* Y-Axis (vertical component) */}
        <line x1="20" y1="200" x2="20" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <polygon points="15,30 20,20 25,30" fill="#94a3b8" />
        <text x="8" y="35" fill="#94a3b8" fontSize="12" fontFamily="monospace">y</text>
        <text x="30" y="80" fill="#f472b6" fontSize="10" fontFamily="monospace" transform="rotate(-90, 30, 80)">u sin θ</text>
        
        {/* Parabolic path (dotted) */}
        <path 
          d="M 20 180 Q 200 -20 380 180" 
          fill="none" 
          stroke="#fbbf24" 
          strokeWidth="2" 
          strokeDasharray="8,4"
          opacity="0.6"
        />
        
        {/* Angle arc */}
        <path 
          d="M 45 180 A 25 25 0 0 0 20 155" 
          fill="none" 
          stroke="#a78bfa" 
          strokeWidth="2"
        />
        <text x="50" y="165" fill="#a78bfa" fontSize="12" fontFamily="serif">θ</text>
        
        {/* Initial velocity vector */}
        <line x1="20" y1="180" x2="70" y2="130" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#22d3ee" />
          </marker>
        </defs>
        <text x="75" y="130" fill="#22d3ee" fontSize="11" fontWeight="bold">u</text>
        
        {/* Maximum Height indicator */}
        {(highlight === 'height' || highlight === 'all') && (
          <>
            <line x1="200" y1="40" x2="200" y2="180" stroke="#f472b6" strokeWidth="2" strokeDasharray="6,3" opacity="0.8" />
            <circle cx="200" cy="40" r="4" fill="#f472b6" />
            <circle cx="200" cy="180" r="4" fill="#f472b6" />
          </>
        )}
        
        {/* Range indicator */}
        {(highlight === 'range' || highlight === 'all') && (
          <>
            <line x1="20" y1="190" x2="380" y2="190" stroke="#4ade80" strokeWidth="3" />
            <circle cx="20" cy="190" r="4" fill="#4ade80" />
            <circle cx="380" cy="190" r="4" fill="#4ade80" />
          </>
        )}
        
        {/* Moving ball */}
        <circle 
          cx={ballPosition.x} 
          cy={ballPosition.y} 
          r="10" 
          fill="#ef4444" 
          filter="url(#glow)"
          className="drop-shadow-lg"
        />
        <circle 
          cx={ballPosition.x - 3} 
          cy={ballPosition.y - 3} 
          r="3" 
          fill="#fca5a5"
          opacity="0.6"
        />
        
        {/* Labels */}
        {showMaxHeightLabel && (highlight === 'height' || highlight === 'all') && (
          <g className="animate-fade-in">
            <rect x="130" y="15" width="140" height="28" rx="6" fill="#f472b6" opacity="0.9" />
            <text x="200" y="35" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
              Maximum Height (H)
            </text>
          </g>
        )}
        
        {showRangeLabel && (highlight === 'range' || highlight === 'all') && (
          <g className="animate-fade-in">
            <rect x="150" y="205" width="100" height="24" rx="6" fill="#4ade80" opacity="0.9" />
            <text x="200" y="222" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
              Range (R)
            </text>
          </g>
        )}
        
        {/* Time of flight indicator */}
        {(highlight === 'time' || highlight === 'all') && animationProgress > 0 && (
          <g>
            <rect x="320" y="5" width="75" height="24" rx="6" fill="#60a5fa" opacity="0.9" />
            <text x="357" y="22" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">
              t = {(animationProgress * 3).toFixed(1)}s
            </text>
          </g>
        )}
      </svg>
      
      {/* Play button overlay */}
      {!isPlaying && animationProgress === 0 && (
        <button
          onClick={startAnimation}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" 
                 style={{ borderLeftWidth: '16px' }} />
          </div>
        </button>
      )}
      
      {/* Replay button */}
      {!isPlaying && animationProgress > 0 && (
        <button
          onClick={startAnimation}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors"
        >
          ↻ Replay
        </button>
      )}
    </div>
  );
};

export default ProjectileAnimation;