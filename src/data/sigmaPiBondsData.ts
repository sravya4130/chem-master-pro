export interface SigmaPiLesson {
  id: string;
  title: string;
  content: string;
  example: {
    molecule: string;
    structure: string;
    sigmaBonds: number;
    piBonds: number;
    explanation: string;
  };
}

export interface SigmaPiQuestion {
  id: string;
  type: 'count-bonds' | 'identify' | 'compare';
  question: string;
  molecule?: string;
  structure?: string;
  options: string[];
  correctAnswer: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  explanation: string;
}

export const sigmaPiLessons: SigmaPiLesson[] = [
  {
    id: 'sp1',
    title: 'Introduction to Sigma & Pi Bonds',
    content: `Covalent bonds are formed by orbital overlap. There are two types:

**Sigma (σ) Bonds:**
- Formed by head-on (axial) overlap of orbitals
- Electron density concentrated along the bond axis
- Stronger than pi bonds
- Free rotation is possible

**Pi (π) Bonds:**
- Formed by side-by-side (lateral) overlap of p orbitals
- Electron density above and below the bond axis
- Weaker than sigma bonds
- Prevents free rotation`,
    example: {
      molecule: 'H₂ (Hydrogen)',
      structure: 'H—H',
      sigmaBonds: 1,
      piBonds: 0,
      explanation: 'Two s orbitals overlap head-on to form one σ bond.',
    },
  },
  {
    id: 'sp2',
    title: 'Single Bonds = Sigma Bonds',
    content: `**All single bonds are sigma bonds!**

When two atoms share one pair of electrons, they form a single bond (σ bond).

**Examples:**
- H—H (hydrogen): 1σ
- C—C in ethane: 1σ
- C—H bonds: 1σ each
- O—H in water: 1σ each

**Key Point:**
Count all single bonds in a molecule — each one is a sigma bond.`,
    example: {
      molecule: 'CH₄ (Methane)',
      structure: 'H₃C—H',
      sigmaBonds: 4,
      piBonds: 0,
      explanation: 'Methane has 4 C—H single bonds = 4 sigma bonds, no pi bonds.',
    },
  },
  {
    id: 'sp3',
    title: 'Double Bonds = σ + π',
    content: `**A double bond consists of:**
- 1 Sigma (σ) bond
- 1 Pi (π) bond

The sigma bond forms first (head-on overlap), then the pi bond forms from the remaining unhybridized p orbitals (side-by-side overlap).

**Remember:**
Double bond = 1σ + 1π

**Why π bonds are weaker:**
The overlapping p orbitals are further apart, resulting in less effective overlap.`,
    example: {
      molecule: 'C₂H₄ (Ethene)',
      structure: 'H₂C═CH₂',
      sigmaBonds: 5,
      piBonds: 1,
      explanation: '4 C—H bonds (4σ) + 1 C═C double bond (1σ + 1π) = 5σ + 1π total.',
    },
  },
  {
    id: 'sp4',
    title: 'Triple Bonds = σ + 2π',
    content: `**A triple bond consists of:**
- 1 Sigma (σ) bond
- 2 Pi (π) bonds

The central sigma bond is surrounded by two pi bonds formed from two sets of p orbitals overlapping sideways.

**Remember:**
Triple bond = 1σ + 2π

**Triple bonds are:**
- Shorter than double and single bonds
- Stronger overall (due to 3 bonds)
- Linear geometry around the triple bond`,
    example: {
      molecule: 'C₂H₂ (Ethyne/Acetylene)',
      structure: 'HC≡CH',
      sigmaBonds: 3,
      piBonds: 2,
      explanation: '2 C—H bonds (2σ) + 1 C≡C triple bond (1σ + 2π) = 3σ + 2π total.',
    },
  },
  {
    id: 'sp5',
    title: 'Counting Bonds in Molecules',
    content: `**Quick counting method:**

1. Count ALL bonds in the structure
2. Every bond has exactly ONE sigma bond
3. Extra bonds in multiple bonds are pi bonds

**Formula:**
- Total σ bonds = Total number of bonds (single, double, triple all have 1σ)
- π bonds = (Number of double bonds × 1) + (Number of triple bonds × 2)

**Shortcut:**
σ bonds = Number of atoms - 1 + rings (for simple molecules)`,
    example: {
      molecule: 'CO₂ (Carbon dioxide)',
      structure: 'O═C═O',
      sigmaBonds: 2,
      piBonds: 2,
      explanation: '2 double bonds: Each C═O has 1σ + 1π. Total = 2σ + 2π.',
    },
  },
  {
    id: 'sp6',
    title: 'Benzene & Resonance',
    content: `**Benzene (C₆H₆)** is a special case:

- Cyclic structure with alternating double bonds
- Has resonance (delocalized electrons)
- All C—C bonds are equivalent (neither single nor double)

**Bond counting in benzene:**
- 6 C—H bonds: 6σ
- 6 C—C bonds: 6σ
- 3 delocalized π bonds (spread over 6 carbons)

**Total: 12σ + 3π**

Note: The 3 π bonds are delocalized, giving extra stability (aromaticity).`,
    example: {
      molecule: 'C₆H₆ (Benzene)',
      structure: '⬡ (hexagonal ring)',
      sigmaBonds: 12,
      piBonds: 3,
      explanation: '6 C—H (6σ) + 6 C—C (6σ) + 3 delocalized π = 12σ + 3π.',
    },
  },
];

export const sigmaPiQuestions: SigmaPiQuestion[] = [
  // Easy questions
  {
    id: 'spq1',
    type: 'count-bonds',
    question: 'How many sigma bonds are in methane (CH₄)?',
    molecule: 'CH₄',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    hints: ['Count all C—H single bonds', 'Single bond = σ bond'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'CH₄ has 4 C—H single bonds. Each single bond = 1σ. Total = 4σ.',
  },
  {
    id: 'spq2',
    type: 'identify',
    question: 'What type of bond is formed by head-on orbital overlap?',
    options: ['Pi bond', 'Sigma bond', 'Hydrogen bond', 'Ionic bond'],
    correctAnswer: 'Sigma bond',
    hints: ['Head-on means axial overlap', 'This is the first bond formed'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'Sigma bonds form by head-on (axial) overlap of orbitals.',
  },
  {
    id: 'spq3',
    type: 'count-bonds',
    question: 'How many pi bonds are in ethane (C₂H₆)?',
    molecule: 'C₂H₆',
    structure: 'CH₃—CH₃',
    options: ['0', '1', '2', '3'],
    correctAnswer: '0',
    hints: ['All bonds in ethane are single bonds', 'Single bonds have no π component'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'Ethane has only single bonds (C—C and C—H). No double/triple bonds = 0π.',
  },
  {
    id: 'spq4',
    type: 'count-bonds',
    question: 'A double bond contains how many sigma and pi bonds?',
    options: ['2σ, 0π', '1σ, 1π', '0σ, 2π', '1σ, 2π'],
    correctAnswer: '1σ, 1π',
    hints: ['First bond is always sigma', 'Second bond is pi'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'Double bond = 1 sigma bond + 1 pi bond.',
  },
  
  // Medium questions
  {
    id: 'spq5',
    type: 'count-bonds',
    question: 'How many sigma bonds are in ethene (C₂H₄)?',
    molecule: 'C₂H₄',
    structure: 'H₂C═CH₂',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    hints: ['Count C—H bonds first', 'The C═C double bond has 1σ'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: '4 C—H bonds (4σ) + 1 C═C bond (1σ from the double bond) = 5σ total.',
  },
  {
    id: 'spq6',
    type: 'count-bonds',
    question: 'How many pi bonds are in ethyne (C₂H₂)?',
    molecule: 'C₂H₂',
    structure: 'HC≡CH',
    options: ['0', '1', '2', '3'],
    correctAnswer: '2',
    hints: ['Triple bond = 1σ + 2π', 'Count only the extra bonds'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'The C≡C triple bond has 2 pi bonds. C—H bonds have no π. Total = 2π.',
  },
  {
    id: 'spq7',
    type: 'count-bonds',
    question: 'How many total sigma bonds are in propene (CH₃CH═CH₂)?',
    molecule: 'C₃H₆',
    structure: 'CH₃—CH═CH₂',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    hints: ['Count all single bonds', 'The double bond also has 1σ'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: '6 C—H bonds (6σ) + 1 C—C single bond (1σ) + 1 C═C (1σ) = 8σ.',
  },
  {
    id: 'spq8',
    type: 'count-bonds',
    question: 'How many pi bonds are in CO₂?',
    molecule: 'CO₂',
    structure: 'O═C═O',
    options: ['0', '1', '2', '3'],
    correctAnswer: '2',
    hints: ['Two double bonds in CO₂', 'Each double bond has 1π'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'CO₂ has 2 C═O double bonds. Each double bond has 1π. Total = 2π.',
  },
  {
    id: 'spq9',
    type: 'compare',
    question: 'Which bond is stronger: σ or π?',
    options: ['Pi bond', 'Sigma bond', 'Both are equal', 'Depends on the atoms'],
    correctAnswer: 'Sigma bond',
    hints: ['Think about orbital overlap', 'Head-on overlap is more effective'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'Sigma bonds are stronger due to better head-on orbital overlap.',
  },
  {
    id: 'spq10',
    type: 'count-bonds',
    question: 'Total σ and π bonds in HCN (H—C≡N)?',
    molecule: 'HCN',
    structure: 'H—C≡N',
    options: ['2σ, 2π', '3σ, 2π', '2σ, 3π', '3σ, 3π'],
    correctAnswer: '2σ, 2π',
    hints: ['H—C is a single bond', 'C≡N is a triple bond'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'H—C (1σ) + C≡N triple bond (1σ + 2π) = 2σ + 2π total.',
  },
  
  // Hard questions
  {
    id: 'spq11',
    type: 'count-bonds',
    question: 'How many sigma and pi bonds are in benzene (C₆H₆)?',
    molecule: 'C₆H₆',
    options: ['12σ, 3π', '9σ, 3π', '12σ, 6π', '6σ, 6π'],
    correctAnswer: '12σ, 3π',
    hints: ['6 C—H + 6 C—C skeleton', 'Alternating double bonds = 3π delocalized'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: '6 C—H (6σ) + 6 C—C (6σ) + 3 delocalized π bonds = 12σ + 3π.',
  },
  {
    id: 'spq12',
    type: 'count-bonds',
    question: 'How many sigma bonds are in CH₃COOH (acetic acid)?',
    molecule: 'CH₃COOH',
    structure: 'CH₃—C(═O)—O—H',
    options: ['6', '7', '8', '9'],
    correctAnswer: '7',
    hints: ['Count every bond including C═O', 'Single bonds + 1σ from double bond'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: '3 C—H (3σ) + C—C (1σ) + C═O (1σ) + C—O (1σ) + O—H (1σ) = 7σ.',
  },
  {
    id: 'spq13',
    type: 'count-bonds',
    question: 'Total π bonds in but-1,3-diene (CH₂═CH—CH═CH₂)?',
    molecule: 'C₄H₆',
    structure: 'CH₂═CH—CH═CH₂',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    hints: ['Count the double bonds', 'Each C═C has 1π'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'Two C═C double bonds, each with 1π bond. Total = 2π.',
  },
  {
    id: 'spq14',
    type: 'count-bonds',
    question: 'In N₂ molecule, how many bonds are present?',
    molecule: 'N₂',
    structure: 'N≡N',
    options: ['1σ, 1π', '1σ, 2π', '2σ, 1π', '3σ, 0π'],
    correctAnswer: '1σ, 2π',
    hints: ['N₂ has a triple bond', 'Triple bond = 1σ + 2π'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'N≡N is a triple bond = 1 sigma + 2 pi bonds.',
  },
  {
    id: 'spq15',
    type: 'count-bonds',
    question: 'How many sigma and pi bonds are in HCOOH (formic acid)?',
    molecule: 'HCOOH',
    structure: 'H—C(═O)—O—H',
    options: ['3σ, 1π', '4σ, 1π', '5σ, 1π', '4σ, 2π'],
    correctAnswer: '4σ, 1π',
    hints: ['Count: H—C, C═O, C—O, O—H', 'The C═O contributes 1σ + 1π'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'H—C (1σ) + C═O (1σ + 1π) + C—O (1σ) + O—H (1σ) = 4σ + 1π.',
  },
  {
    id: 'spq16',
    type: 'count-bonds',
    question: 'Total bonds (σ + π) in C₂H₂?',
    molecule: 'C₂H₂',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    hints: ['2 C—H bonds + 1 triple bond', 'Triple bond = 3 bonds total'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: '2 C—H (2σ) + C≡C (1σ + 2π) = 3σ + 2π = 5 total bonds.',
  },
];
