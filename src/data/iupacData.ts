export interface IUPACLesson {
  id: string;
  title: string;
  content: string;
  example: {
    structure: string;
    name: string;
    explanation: string;
  };
}

export interface IUPACQuestion {
  id: string;
  type: 'name-structure' | 'structure-name';
  structure: string;
  name: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

export const iupacLessons: IUPACLesson[] = [
  {
    id: '1',
    title: 'Basic Rules of IUPAC Nomenclature',
    content: `IUPAC naming follows systematic rules:

1. **Find the longest carbon chain** - This is your parent chain
2. **Number the carbons** - Start from the end nearest to the first substituent
3. **Name the substituents** - Use prefixes like methyl-, ethyl-, etc.
4. **Put it together** - Substituents in alphabetical order + parent name`,
    example: {
      structure: 'CH₃-CH₂-CH₃',
      name: 'Propane',
      explanation: 'A straight chain of 3 carbons with single bonds = prop- (3) + -ane (alkane)',
    },
  },
  {
    id: '2',
    title: 'Alkane Nomenclature',
    content: `Alkanes are saturated hydrocarbons (only single bonds).

**Parent Chain Names:**
- 1 carbon: Meth-
- 2 carbons: Eth-
- 3 carbons: Prop-
- 4 carbons: But-
- 5 carbons: Pent-
- 6 carbons: Hex-

**Suffix:** -ane (for alkanes)`,
    example: {
      structure: 'CH₃-CH(CH₃)-CH₂-CH₃',
      name: '2-Methylbutane',
      explanation: 'Parent chain: 4 carbons (butane). Methyl group at position 2.',
    },
  },
  {
    id: '3',
    title: 'Alkene & Alkyne Nomenclature',
    content: `**Alkenes** have C=C double bonds, suffix: -ene
**Alkynes** have C≡C triple bonds, suffix: -yne

The position of the multiple bond must be indicated by a number.

**Rules:**
- Number from the end nearest to the multiple bond
- The position number comes before the parent name`,
    example: {
      structure: 'CH₂=CH-CH₃',
      name: 'Propene (or Prop-1-ene)',
      explanation: '3 carbon chain with double bond at position 1.',
    },
  },
  {
    id: '4',
    title: 'Naming Substituents',
    content: `Common substituents (alkyl groups):

- **-CH₃** → Methyl
- **-C₂H₅** → Ethyl  
- **-C₃H₇** → Propyl
- **-C₄H₉** → Butyl

**Prefixes for multiple identical groups:**
- 2 groups: di-
- 3 groups: tri-
- 4 groups: tetra-`,
    example: {
      structure: 'CH₃-CH(CH₃)-CH(CH₃)-CH₃',
      name: '2,3-Dimethylbutane',
      explanation: 'Two methyl groups at positions 2 and 3 on a 4-carbon chain.',
    },
  },
];

export const iupacQuestions: IUPACQuestion[] = [
  {
    id: 'q1',
    type: 'structure-name',
    structure: 'CH₃-CH₂-CH₂-CH₃',
    name: 'Butane',
    hints: ['Count the carbons', 'All single bonds = alkane'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'q2',
    type: 'structure-name',
    structure: 'CH₃-CH(CH₃)-CH₃',
    name: '2-Methylpropane',
    hints: ['Find the longest chain', 'There\'s a branch at position 2'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'q3',
    type: 'structure-name',
    structure: 'CH₂=CH-CH₂-CH₃',
    name: 'But-1-ene',
    hints: ['There\'s a double bond', 'Position matters for alkenes'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'q4',
    type: 'structure-name',
    structure: 'CH₃-CH₂-CH(CH₃)-CH₂-CH₃',
    name: '3-Methylpentane',
    hints: ['Longest chain has 5 carbons', 'Number from either end'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'q5',
    type: 'structure-name',
    structure: 'CH₃-C(CH₃)₂-CH₃',
    name: '2,2-Dimethylpropane',
    hints: ['Two methyl groups on same carbon', 'Also called neopentane'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'q6',
    type: 'structure-name',
    structure: 'CH≡C-CH₃',
    name: 'Propyne',
    hints: ['Triple bond = alkyne', '3 carbons in the chain'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'q7',
    type: 'structure-name',
    structure: 'CH₃-CH=CH-CH₃',
    name: 'But-2-ene',
    hints: ['Double bond is in the middle', '4 carbon chain'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'q8',
    type: 'structure-name',
    structure: 'CH₃-CH₂-CH₂-CH₂-CH₂-CH₃',
    name: 'Hexane',
    hints: ['Count all the carbons', 'Hex- = 6'],
    difficulty: 'easy',
    xpReward: 10,
  },
];

export const hybridisationData = {
  lessons: [
    {
      id: 'h1',
      title: 'Introduction to Hybridisation',
      content: `Hybridisation is the mixing of atomic orbitals to form new hybrid orbitals.

**Types:**
- **sp³**: 4 hybrid orbitals, tetrahedral (109.5°)
- **sp²**: 3 hybrid orbitals, trigonal planar (120°)
- **sp**: 2 hybrid orbitals, linear (180°)
- **sp³d**: 5 hybrid orbitals, trigonal bipyramidal
- **sp³d²**: 6 hybrid orbitals, octahedral`,
    },
  ],
  questions: [
    {
      id: 'hq1',
      question: 'What is the hybridisation of carbon in CH₄?',
      options: ['sp', 'sp²', 'sp³', 'sp³d'],
      answer: 'sp³',
      xpReward: 10,
    },
    {
      id: 'hq2',
      question: 'What is the hybridisation of carbon in C₂H₄ (ethene)?',
      options: ['sp', 'sp²', 'sp³', 'sp³d'],
      answer: 'sp²',
      xpReward: 10,
    },
  ],
};

export const bondingData = {
  lessons: [
    {
      id: 'b1',
      title: 'Sigma and Pi Bonds',
      content: `**Sigma (σ) bonds:**
- Head-on overlap of orbitals
- Single bonds are always sigma bonds
- Stronger than pi bonds

**Pi (π) bonds:**
- Side-by-side overlap of p orbitals
- Found in double and triple bonds
- Weaker than sigma bonds

**Counting bonds:**
- Single bond = 1 σ
- Double bond = 1 σ + 1 π
- Triple bond = 1 σ + 2 π`,
    },
  ],
  questions: [
    {
      id: 'bq1',
      question: 'How many sigma and pi bonds are in C₂H₄?',
      options: ['4σ, 1π', '5σ, 1π', '3σ, 2π', '6σ, 0π'],
      answer: '5σ, 1π',
      xpReward: 15,
    },
  ],
};
