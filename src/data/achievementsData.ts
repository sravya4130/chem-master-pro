export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'xp' | 'topics' | 'accuracy' | 'speed' | 'general';
  requirement: {
    type: 'xp' | 'streak' | 'topics_completed' | 'questions_answered' | 'perfect_games' | 'level';
    value: number;
  };
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const achievements: Achievement[] = [
  // Streak Achievements
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first question',
    icon: '👶',
    category: 'general',
    requirement: { type: 'questions_answered', value: 1 },
    xpReward: 10,
    rarity: 'common',
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Answer 10 questions correctly',
    icon: '🎯',
    category: 'general',
    requirement: { type: 'questions_answered', value: 10 },
    xpReward: 25,
    rarity: 'common',
  },
  {
    id: 'chemistry-novice',
    name: 'Chemistry Novice',
    description: 'Answer 50 questions correctly',
    icon: '🧪',
    category: 'general',
    requirement: { type: 'questions_answered', value: 50 },
    xpReward: 50,
    rarity: 'rare',
  },
  {
    id: 'chemistry-expert',
    name: 'Chemistry Expert',
    description: 'Answer 100 questions correctly',
    icon: '🔬',
    category: 'general',
    requirement: { type: 'questions_answered', value: 100 },
    xpReward: 100,
    rarity: 'epic',
  },
  
  // Streak Achievements
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Achieve a 3-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
    xpReward: 30,
    rarity: 'common',
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Achieve a 7-day streak',
    icon: '💪',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    xpReward: 75,
    rarity: 'rare',
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Achieve a 30-day streak',
    icon: '⚡',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    xpReward: 200,
    rarity: 'legendary',
  },
  
  // XP Achievements
  {
    id: 'xp-collector',
    name: 'XP Collector',
    description: 'Earn 100 XP total',
    icon: '⭐',
    category: 'xp',
    requirement: { type: 'xp', value: 100 },
    xpReward: 20,
    rarity: 'common',
  },
  {
    id: 'xp-hunter',
    name: 'XP Hunter',
    description: 'Earn 500 XP total',
    icon: '💎',
    category: 'xp',
    requirement: { type: 'xp', value: 500 },
    xpReward: 50,
    rarity: 'rare',
  },
  {
    id: 'xp-champion',
    name: 'XP Champion',
    description: 'Earn 1000 XP total',
    icon: '👑',
    category: 'xp',
    requirement: { type: 'xp', value: 1000 },
    xpReward: 100,
    rarity: 'epic',
  },
  {
    id: 'xp-legend',
    name: 'XP Legend',
    description: 'Earn 5000 XP total',
    icon: '🏆',
    category: 'xp',
    requirement: { type: 'xp', value: 5000 },
    xpReward: 250,
    rarity: 'legendary',
  },
  
  // Topic Achievements
  {
    id: 'iupac-explorer',
    name: 'IUPAC Explorer',
    description: 'Complete the IUPAC naming module',
    icon: '📝',
    category: 'topics',
    requirement: { type: 'topics_completed', value: 1 },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'hybridisation-hero',
    name: 'Hybridisation Hero',
    description: 'Master hybridisation concepts',
    icon: '🎭',
    category: 'topics',
    requirement: { type: 'topics_completed', value: 2 },
    xpReward: 75,
    rarity: 'rare',
  },
  {
    id: 'bond-breaker',
    name: 'Bond Breaker',
    description: 'Complete sigma & pi bonds module',
    icon: '⚛️',
    category: 'topics',
    requirement: { type: 'topics_completed', value: 3 },
    xpReward: 100,
    rarity: 'epic',
  },
  
  // Level Achievements
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: '🌟',
    category: 'general',
    requirement: { type: 'level', value: 5 },
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'level-10',
    name: 'Chemistry Apprentice',
    description: 'Reach Level 10',
    icon: '🎓',
    category: 'general',
    requirement: { type: 'level', value: 10 },
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'level-25',
    name: 'Chemistry Scientist',
    description: 'Reach Level 25',
    icon: '🧬',
    category: 'general',
    requirement: { type: 'level', value: 25 },
    xpReward: 250,
    rarity: 'epic',
  },
  {
    id: 'level-50',
    name: 'Chemistry Master',
    description: 'Reach Level 50',
    icon: '🏅',
    category: 'general',
    requirement: { type: 'level', value: 50 },
    xpReward: 500,
    rarity: 'legendary',
  },
  
  // Accuracy Achievements
  {
    id: 'perfect-10',
    name: 'Perfect 10',
    description: 'Get 10 correct answers in a row',
    icon: '💯',
    category: 'accuracy',
    requirement: { type: 'perfect_games', value: 1 },
    xpReward: 50,
    rarity: 'rare',
  },
  {
    id: 'flawless',
    name: 'Flawless',
    description: 'Complete a game with 100% accuracy',
    icon: '✨',
    category: 'accuracy',
    requirement: { type: 'perfect_games', value: 3 },
    xpReward: 100,
    rarity: 'epic',
  },
];

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-500';
    case 'rare': return 'from-blue-400 to-blue-600';
    case 'epic': return 'from-purple-400 to-purple-600';
    case 'legendary': return 'from-yellow-400 to-orange-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

export const getRarityBorder = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common': return 'border-gray-400';
    case 'rare': return 'border-blue-400';
    case 'epic': return 'border-purple-400';
    case 'legendary': return 'border-yellow-400 animate-pulse';
    default: return 'border-gray-400';
  }
};
