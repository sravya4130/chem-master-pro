import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Mistake {
  id: string;
  subject: 'chemistry' | 'physics' | 'mathematics';
  topic: string;
  topicId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  timestamp: number;
  resolved: boolean;
}

interface MistakeContextType {
  mistakes: Mistake[];
  addMistake: (mistake: Omit<Mistake, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveMistake: (id: string) => void;
  getMistakesBySubject: (subject: string) => Mistake[];
  getMistakesByTopic: (topicId: string) => Mistake[];
  getUnresolvedMistakes: () => Mistake[];
  getTotalMistakeCount: () => number;
  clearResolvedMistakes: () => void;
}

const MistakeContext = createContext<MistakeContextType | undefined>(undefined);

export const MistakeProvider = ({ children }: { children: ReactNode }) => {
  const [mistakes, setMistakes] = useState<Mistake[]>(() => {
    const saved = localStorage.getItem('chemlearn-mistakes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chemlearn-mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  const addMistake = (mistake: Omit<Mistake, 'id' | 'timestamp' | 'resolved'>) => {
    const newMistake: Mistake = {
      ...mistake,
      id: `mistake-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      resolved: false,
    };
    setMistakes(prev => [...prev, newMistake]);
  };

  const resolveMistake = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, resolved: true } : m));
  };

  const getMistakesBySubject = (subject: string) => {
    return mistakes.filter(m => m.subject === subject && !m.resolved);
  };

  const getMistakesByTopic = (topicId: string) => {
    return mistakes.filter(m => m.topicId === topicId && !m.resolved);
  };

  const getUnresolvedMistakes = () => {
    return mistakes.filter(m => !m.resolved);
  };

  const getTotalMistakeCount = () => {
    return mistakes.filter(m => !m.resolved).length;
  };

  const clearResolvedMistakes = () => {
    setMistakes(prev => prev.filter(m => !m.resolved));
  };

  return (
    <MistakeContext.Provider
      value={{
        mistakes,
        addMistake,
        resolveMistake,
        getMistakesBySubject,
        getMistakesByTopic,
        getUnresolvedMistakes,
        getTotalMistakeCount,
        clearResolvedMistakes,
      }}
    >
      {children}
    </MistakeContext.Provider>
  );
};

export const useMistakes = () => {
  const context = useContext(MistakeContext);
  if (!context) {
    throw new Error('useMistakes must be used within MistakeProvider');
  }
  return context;
};
