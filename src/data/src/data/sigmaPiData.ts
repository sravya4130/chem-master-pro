export type SigmaPiQuestion = {
  id: number;
  structure: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  hints: string[];
};

export const sigmaPiQuestions: SigmaPiQuestion[] = [
  {
    id: 1,
    structure: 'Single bond between two carbons',
    name: '1 sigma bond',
    difficulty: 'easy',
    xpReward: 10,
    hints: ['Single bonds are sigma bonds']
  },
  {
    id: 2,
    structure: 'Double bond between two carbons',
    name: '1 sigma bond and 1 pi bond',
    difficulty: 'easy',
    xpReward: 15,
    hints: ['Double bond = sigma + pi']
  },
  {
    id: 3,
    structure: 'Triple bond between two carbons',
    name: '1 sigma bond and 2 pi bonds',
    difficulty: 'medium',
    xpReward: 20,
    hints: ['Triple bond has one sigma']
  }
];
