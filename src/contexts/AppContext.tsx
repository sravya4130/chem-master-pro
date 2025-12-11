import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tutor {
  id: string;
  name: string;
  color: string;
  emoji: string;
  specialty: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  level: number;
  completedTopics: string[];
  currentTopic: string | null;
}

interface AppContextType {
  tutors: Tutor[];
  setTutors: React.Dispatch<React.SetStateAction<Tutor[]>>;
  selectedTutor: Tutor | null;
  setSelectedTutor: (tutor: Tutor | null) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  addXP: (amount: number) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
}

const defaultTutors: Tutor[] = [
  { id: '1', name: 'Alex', color: 'tutor-alex', emoji: '🧪', specialty: 'Organic Chemistry' },
  { id: '2', name: 'David', color: 'tutor-david', emoji: '⚗️', specialty: 'Hybridisation' },
  { id: '3', name: 'Sravya', color: 'tutor-sravya', emoji: '🔬', specialty: 'IUPAC Naming' },
  { id: '4', name: 'Olivia', color: 'tutor-olivia', emoji: '💎', specialty: 'Molecular Geometry' },
  { id: '5', name: 'Mermi', color: 'tutor-mermi', emoji: '🌟', specialty: 'Chemical Bonds' },
  { id: '6', name: 'Ogneson', color: 'tutor-ogneson', emoji: '🚀', specialty: 'Quantum Numbers' },
];

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 0,
  level: 1,
  completedTopics: [],
  currentTopic: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tutors, setTutors] = useState<Tutor[]>(() => {
    const saved = localStorage.getItem('chemlearn-tutors');
    return saved ? JSON.parse(saved) : defaultTutors;
  });

  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(() => {
    const saved = localStorage.getItem('chemlearn-selected-tutor');
    return saved ? JSON.parse(saved) : null;
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('chemlearn-progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  const [selectedSubject, setSelectedSubject] = useState<string | null>(() => {
    const saved = localStorage.getItem('chemlearn-subject');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('chemlearn-tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('chemlearn-selected-tutor', JSON.stringify(selectedTutor));
  }, [selectedTutor]);

  useEffect(() => {
    localStorage.setItem('chemlearn-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('chemlearn-subject', JSON.stringify(selectedSubject));
  }, [selectedSubject]);

  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        tutors,
        setTutors,
        selectedTutor,
        setSelectedTutor,
        userProgress,
        setUserProgress,
        addXP,
        selectedSubject,
        setSelectedSubject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
