export interface HybridisationLesson {
  id: string;
  title: string;
  content: string;
  example: {
    molecule: string;
    hybridisation: string;
    geometry: string;
    bondAngle: string;
    explanation: string;
  };
}

export interface HybridisationQuestion {
  id: string;
  type: 'hybridisation' | 'quantum' | 'geometry';
  question: string;
  molecule?: string;
  options: string[];
  correctAnswer: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  explanation: string;
}

export const hybridisationLessons: HybridisationLesson[] = [
  {
    id: 'h1',
    title: 'What is Hybridisation?',
    content: `Hybridisation is the concept of mixing atomic orbitals to form new hybrid orbitals suitable for bonding.

**Why hybridisation occurs:**
- Atoms need equivalent orbitals for equivalent bonds
- Pure s and p orbitals have different energies
- Mixing creates orbitals of equal energy

**Key Principle:**
The number of hybrid orbitals = Number of orbitals mixed`,
    example: {
      molecule: 'CH₄ (Methane)',
      hybridisation: 'sp³',
      geometry: 'Tetrahedral',
      bondAngle: '109.5°',
      explanation: 'Carbon mixes one s and three p orbitals to form four equivalent sp³ hybrid orbitals.',
    },
  },
  {
    id: 'h2',
    title: 'sp³ Hybridisation',
    content: `**sp³ Hybridisation:**
One s orbital + Three p orbitals → Four sp³ hybrid orbitals

**Characteristics:**
- Geometry: Tetrahedral
- Bond angle: 109.5°
- All single bonds around central atom
- Found in: CH₄, NH₃, H₂O, CCl₄

**Remember:**
- 4 bonding regions = sp³
- Each hybrid orbital holds one bond or lone pair`,
    example: {
      molecule: 'NH₃ (Ammonia)',
      hybridisation: 'sp³',
      geometry: 'Trigonal Pyramidal',
      bondAngle: '107°',
      explanation: 'N has 4 sp³ orbitals: 3 for bonds with H, 1 for lone pair. Lone pair reduces angle.',
    },
  },
  {
    id: 'h3',
    title: 'sp² Hybridisation',
    content: `**sp² Hybridisation:**
One s orbital + Two p orbitals → Three sp² hybrid orbitals

**Characteristics:**
- Geometry: Trigonal planar
- Bond angle: 120°
- One unhybridised p orbital remains (for π bond)
- Found in: C₂H₄, BF₃, CO₃²⁻, graphite

**Double bonds:**
- 1 σ bond (sp² overlap)
- 1 π bond (unhybridised p overlap)`,
    example: {
      molecule: 'C₂H₄ (Ethene)',
      hybridisation: 'sp²',
      geometry: 'Trigonal Planar (each C)',
      bondAngle: '120°',
      explanation: 'Each carbon is sp² hybridised. The C=C double bond has 1σ + 1π bond.',
    },
  },
  {
    id: 'h4',
    title: 'sp Hybridisation',
    content: `**sp Hybridisation:**
One s orbital + One p orbital → Two sp hybrid orbitals

**Characteristics:**
- Geometry: Linear
- Bond angle: 180°
- Two unhybridised p orbitals remain
- Found in: C₂H₂, CO₂, BeF₂, HCN

**Triple bonds:**
- 1 σ bond (sp overlap)
- 2 π bonds (two p orbital overlaps)`,
    example: {
      molecule: 'C₂H₂ (Ethyne/Acetylene)',
      hybridisation: 'sp',
      geometry: 'Linear',
      bondAngle: '180°',
      explanation: 'Each carbon is sp hybridised. The C≡C triple bond has 1σ + 2π bonds.',
    },
  },
  {
    id: 'h5',
    title: 'sp³d and sp³d² Hybridisation',
    content: `**sp³d Hybridisation:**
- Involves d orbitals (possible for elements beyond Period 2)
- 5 hybrid orbitals → Trigonal bipyramidal
- Bond angles: 90° and 120°
- Found in: PCl₅, SF₄

**sp³d² Hybridisation:**
- 6 hybrid orbitals → Octahedral
- Bond angle: 90°
- Found in: SF₆, XeF₄`,
    example: {
      molecule: 'PCl₅ (Phosphorus Pentachloride)',
      hybridisation: 'sp³d',
      geometry: 'Trigonal Bipyramidal',
      bondAngle: '90° and 120°',
      explanation: 'P uses one 3d orbital for hybridisation to accommodate 5 bonds.',
    },
  },
  {
    id: 'h6',
    title: 'Quantum Numbers & Orbitals',
    content: `**Four Quantum Numbers:**

1. **Principal (n)**: Shell number (1, 2, 3...)
   - Determines energy level and size

2. **Azimuthal (l)**: Subshell (0 to n-1)
   - l=0 (s), l=1 (p), l=2 (d), l=3 (f)

3. **Magnetic (mₗ)**: Orbital orientation (-l to +l)
   - Determines spatial orientation

4. **Spin (mₛ)**: Electron spin (+½ or -½)
   - Only two electrons per orbital`,
    example: {
      molecule: '2p electron',
      hybridisation: 'n=2, l=1, mₗ=-1,0,+1',
      geometry: 'Three 2p orbitals',
      bondAngle: 'Perpendicular (90°)',
      explanation: 'A 2p electron has n=2, l=1, and mₗ can be -1, 0, or +1 (3 orientations).',
    },
  },
];

export const hybridisationQuestions: HybridisationQuestion[] = [
  // Easy questions
  {
    id: 'hq1',
    type: 'hybridisation',
    question: 'What is the hybridisation of carbon in methane (CH₄)?',
    molecule: 'CH₄',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp³',
    hints: ['Carbon forms 4 equivalent bonds', 'Tetrahedral geometry'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'Carbon in CH₄ forms 4 σ bonds, requiring 4 hybrid orbitals → sp³.',
  },
  {
    id: 'hq2',
    type: 'geometry',
    question: 'What is the geometry of an sp³ hybridised molecule?',
    options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Octahedral'],
    correctAnswer: 'Tetrahedral',
    hints: ['4 equivalent hybrid orbitals', 'Maximum separation = 109.5°'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: '4 sp³ orbitals arrange tetrahedrally for maximum separation.',
  },
  {
    id: 'hq3',
    type: 'hybridisation',
    question: 'What is the hybridisation of carbon in ethene (C₂H₄)?',
    molecule: 'C₂H₄',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp²',
    hints: ['Double bond present', 'One π bond needs unhybridised p orbital'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'Each C has 3 σ bonds + 1 π bond. 3 hybrid orbitals needed → sp².',
  },
  {
    id: 'hq4',
    type: 'quantum',
    question: 'What is the azimuthal quantum number (l) for a p orbital?',
    options: ['0', '1', '2', '3'],
    correctAnswer: '1',
    hints: ['s=0, p=?, d=2, f=3', 'Alphabetical order corresponds to increasing l'],
    difficulty: 'easy',
    xpReward: 10,
    explanation: 'l values: s=0, p=1, d=2, f=3. So for p orbital, l=1.',
  },
  
  // Medium questions
  {
    id: 'hq5',
    type: 'hybridisation',
    question: 'What is the hybridisation of carbon in acetylene (C₂H₂)?',
    molecule: 'C₂H₂',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp',
    hints: ['Triple bond present', '2 π bonds need 2 unhybridised p orbitals'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'Each C has 2 σ bonds + 2 π bonds. 2 hybrid orbitals needed → sp.',
  },
  {
    id: 'hq6',
    type: 'geometry',
    question: 'What is the bond angle in BF₃?',
    molecule: 'BF₃',
    options: ['90°', '109.5°', '120°', '180°'],
    correctAnswer: '120°',
    hints: ['Boron is sp² hybridised', 'Trigonal planar geometry'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'BF₃ is trigonal planar (sp²) with 120° bond angles.',
  },
  {
    id: 'hq7',
    type: 'hybridisation',
    question: 'What is the hybridisation of nitrogen in NH₃?',
    molecule: 'NH₃',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp³',
    hints: ['Consider lone pairs too', '3 bonds + 1 lone pair = 4 electron domains'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'N has 3 bonds + 1 lone pair = 4 electron domains → sp³.',
  },
  {
    id: 'hq8',
    type: 'quantum',
    question: 'How many orbitals are in the 3d subshell?',
    options: ['1', '3', '5', '7'],
    correctAnswer: '5',
    hints: ['Number of orbitals = 2l + 1', 'For d orbitals, l = 2'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'Number of orbitals = 2l + 1 = 2(2) + 1 = 5 for d subshell.',
  },
  {
    id: 'hq9',
    type: 'hybridisation',
    question: 'What is the hybridisation of carbon in CO₂?',
    molecule: 'CO₂',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp',
    hints: ['Linear molecule', 'Two double bonds from central carbon'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'Carbon in CO₂ is linear with 2 σ bonds and 2 π bonds → sp.',
  },
  {
    id: 'hq10',
    type: 'geometry',
    question: 'What is the shape of H₂O molecule?',
    molecule: 'H₂O',
    options: ['Linear', 'Bent', 'Trigonal planar', 'Tetrahedral'],
    correctAnswer: 'Bent',
    hints: ['Oxygen has lone pairs', 'sp³ but 2 lone pairs push bonds'],
    difficulty: 'medium',
    xpReward: 15,
    explanation: 'O is sp³ with 2 bonds + 2 lone pairs, giving bent geometry.',
  },
  
  // Hard questions
  {
    id: 'hq11',
    type: 'hybridisation',
    question: 'What is the hybridisation of sulfur in SF₆?',
    molecule: 'SF₆',
    options: ['sp³', 'sp³d', 'sp³d²', 'sp³d³'],
    correctAnswer: 'sp³d²',
    hints: ['6 bonds to sulfur', 'Octahedral geometry'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'S forms 6 σ bonds, needing 6 hybrid orbitals → sp³d².',
  },
  {
    id: 'hq12',
    type: 'quantum',
    question: 'What is the maximum number of electrons in the n=3 shell?',
    options: ['8', '18', '32', '2'],
    correctAnswer: '18',
    hints: ['Formula: 2n²', 'n=3, so calculate 2(3)²'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'Maximum electrons = 2n² = 2(9) = 18 for n=3.',
  },
  {
    id: 'hq13',
    type: 'hybridisation',
    question: 'What is the hybridisation of xenon in XeF₄?',
    molecule: 'XeF₄',
    options: ['sp³', 'sp³d', 'sp³d²', 'sp³d³'],
    correctAnswer: 'sp³d²',
    hints: ['Square planar geometry', '4 bonds + 2 lone pairs = 6 electron domains'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'Xe has 4 bonds + 2 lone pairs = 6 domains → sp³d² (square planar).',
  },
  {
    id: 'hq14',
    type: 'geometry',
    question: 'What is the shape of PCl₅?',
    molecule: 'PCl₅',
    options: ['Square pyramidal', 'Trigonal bipyramidal', 'Octahedral', 'Tetrahedral'],
    correctAnswer: 'Trigonal bipyramidal',
    hints: ['P is sp³d hybridised', '5 bonds around phosphorus'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'PCl₅ has 5 σ bonds → sp³d → trigonal bipyramidal.',
  },
  {
    id: 'hq15',
    type: 'quantum',
    question: 'Which quantum numbers are possible for a 3p electron?',
    options: ['n=3, l=0, mₗ=0', 'n=3, l=1, mₗ=-1', 'n=3, l=2, mₗ=0', 'n=2, l=1, mₗ=0'],
    correctAnswer: 'n=3, l=1, mₗ=-1',
    hints: ['3p means n=3 and p orbital', 'p orbital has l=1'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: '3p: n=3, l=1 (for p), mₗ can be -1, 0, or +1.',
  },
  {
    id: 'hq16',
    type: 'hybridisation',
    question: 'In which molecule is the central atom sp³d hybridised?',
    options: ['SF₆', 'PCl₃', 'ClF₃', 'XeF₂'],
    correctAnswer: 'ClF₃',
    hints: ['Count total electron domains', 'Lone pairs count as domains too'],
    difficulty: 'hard',
    xpReward: 25,
    explanation: 'ClF₃: 3 bonds + 2 lone pairs = 5 domains → sp³d.',
  },
];
