export interface PhysicsLesson {
  id: string;
  title: string;
  content: string;
  repeatAfterMe?: string;
  example: {
    problem: string;
    solution: string;
    explanation: string;
  };
}

export interface PhysicsQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

// Units and Dimensions Data
export const dimensionsLessons: PhysicsLesson[] = [
  {
    id: 'd1',
    title: 'Basic Physical Quantities',
    content: `Physics deals with measurable quantities. The **fundamental quantities** are:

**Seven Base Quantities (SI System):**
| Quantity | Symbol | SI Unit | Dimensional Symbol |
|----------|--------|---------|-------------------|
| Length | l, L | metre (m) | [L] |
| Mass | m, M | kilogram (kg) | [M] |
| Time | t, T | second (s) | [T] |
| Electric Current | I | ampere (A) | [A] |
| Temperature | T, θ | kelvin (K) | [K] |
| Amount of Substance | n | mole (mol) | [mol] |
| Luminous Intensity | Iᵥ | candela (cd) | [cd] |

**Important:** These cannot be derived from other quantities!`,
    repeatAfterMe: 'The fundamental quantities are Mass, Length, Time, Current, Temperature, Amount of substance, and Luminous intensity. Their dimensional symbols are M, L, T, A, K, mol, and cd respectively.',
    example: {
      problem: 'What is the dimensional symbol for length?',
      solution: '[L]',
      explanation: 'Length is a fundamental quantity represented by the dimensional symbol L in square brackets.',
    },
  },
  {
    id: 'd2',
    title: 'Dimensional Formulas - Basics',
    content: `A **dimensional formula** shows how a physical quantity depends on fundamental quantities.

**Writing Dimensional Formulas:**
- Use [M], [L], [T] for most mechanics problems
- Write as [MᵃLᵇTᶜ] where a, b, c are exponents

**Simple Examples:**
- Area = Length × Length = [L] × [L] = [L²] or [M⁰L²T⁰]
- Volume = Length³ = [L³] or [M⁰L³T⁰]
- Velocity = Distance/Time = [L]/[T] = [LT⁻¹] or [M⁰LT⁻¹]
- Acceleration = Velocity/Time = [LT⁻¹]/[T] = [LT⁻²]`,
    repeatAfterMe: 'Velocity has dimensions L T to the power minus 1. Acceleration has dimensions L T to the power minus 2.',
    example: {
      problem: 'Find the dimensional formula of velocity',
      solution: '[M⁰LT⁻¹] or simply [LT⁻¹]',
      explanation: 'Velocity = displacement/time = [L]/[T] = [LT⁻¹]. Mass exponent is 0.',
    },
  },
  {
    id: 'd3',
    title: 'Dimensional Formulas - Force and Energy',
    content: `**Force:**
- F = mass × acceleration
- [F] = [M] × [LT⁻²] = [MLT⁻²]
- SI Unit: Newton (N) = kg⋅m/s²

**Work/Energy:**
- W = Force × displacement
- [W] = [MLT⁻²] × [L] = [ML²T⁻²]
- SI Unit: Joule (J) = N⋅m

**Power:**
- P = Work/time
- [P] = [ML²T⁻²]/[T] = [ML²T⁻³]
- SI Unit: Watt (W) = J/s`,
    repeatAfterMe: 'Force has dimensions M L T to the power minus 2. Energy has dimensions M L squared T to the power minus 2. Power has dimensions M L squared T to the power minus 3.',
    example: {
      problem: 'Find the dimensional formula of kinetic energy (½mv²)',
      solution: '[ML²T⁻²]',
      explanation: 'KE = ½mv² → [M][LT⁻¹]² = [M][L²T⁻²] = [ML²T⁻²]. Same as work!',
    },
  },
  {
    id: 'd4',
    title: 'Dimensional Formulas - More Quantities',
    content: `**Momentum:**
- p = mass × velocity = [M][LT⁻¹] = [MLT⁻¹]

**Pressure:**
- P = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]

**Density:**
- ρ = Mass/Volume = [M]/[L³] = [ML⁻³T⁰]

**Frequency:**
- f = 1/Time = [T⁻¹] = [M⁰L⁰T⁻¹]

**Angular Velocity:**
- ω = angle/time = [T⁻¹] (angle is dimensionless)`,
    repeatAfterMe: 'Momentum has dimensions M L T to the power minus 1. Pressure has dimensions M L to the power minus 1, T to the power minus 2.',
    example: {
      problem: 'Find the dimensional formula of pressure',
      solution: '[ML⁻¹T⁻²]',
      explanation: 'Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]. Note the negative exponent for L.',
    },
  },
  {
    id: 'd5',
    title: 'Applications of Dimensional Analysis',
    content: `**Uses of Dimensional Analysis:**

1. **Check equation correctness:** Both sides must have same dimensions
2. **Derive relations:** Find how quantities depend on each other
3. **Convert units:** Between different unit systems

**Principle of Homogeneity:**
Every valid physics equation must be dimensionally consistent.

**Limitations:**
- Cannot find dimensionless constants
- Cannot distinguish between quantities with same dimensions (work vs torque)
- Cannot derive complete equations with multiple terms`,
    repeatAfterMe: 'The principle of homogeneity states that both sides of a physics equation must have the same dimensions.',
    example: {
      problem: 'Check if v² = u² + 2as is dimensionally correct',
      solution: 'Yes, all terms have [L²T⁻²]',
      explanation: 'v² and u² = [LT⁻¹]² = [L²T⁻²]. 2as = [LT⁻²][L] = [L²T⁻²]. All same!',
    },
  },
];

export const dimensionsQuestions: PhysicsQuestion[] = [
  {
    id: 'dq1',
    question: 'What is the dimensional formula of velocity?',
    options: ['[MLT⁻¹]', '[M⁰LT⁻¹]', '[ML⁻¹T]', '[M⁰L⁰T⁻¹]'],
    answer: '[M⁰LT⁻¹]',
    hints: ['Velocity = displacement/time', '[L]/[T] = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'dq2',
    question: 'What is the dimensional formula of acceleration?',
    options: ['[LT⁻¹]', '[LT⁻²]', '[MLT⁻²]', '[L²T⁻²]'],
    answer: '[LT⁻²]',
    hints: ['Acceleration = velocity/time', '[LT⁻¹]/[T] = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'dq3',
    question: 'The dimensional formula of force is:',
    options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻²]', '[ML⁻¹T⁻²]'],
    answer: '[MLT⁻²]',
    hints: ['Force = mass × acceleration', '[M] × [LT⁻²] = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'dq4',
    question: 'Which quantity has the same dimensions as work?',
    options: ['Force', 'Power', 'Torque', 'Momentum'],
    answer: 'Torque',
    hints: ['Work = Force × displacement = [ML²T⁻²]', 'Torque = Force × perpendicular distance'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'dq5',
    question: 'The dimensional formula of pressure is:',
    options: ['[MLT⁻²]', '[ML⁻¹T⁻²]', '[ML²T⁻²]', '[ML⁻²T⁻²]'],
    answer: '[ML⁻¹T⁻²]',
    hints: ['Pressure = Force/Area', '[MLT⁻²]/[L²] = ?'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'dq6',
    question: 'Which is a dimensionless quantity?',
    options: ['Velocity', 'Strain', 'Pressure', 'Momentum'],
    answer: 'Strain',
    hints: ['Strain = change in length / original length', '[L]/[L] = ?'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'dq7',
    question: 'The dimensional formula of Planck\'s constant (h = E/f) is:',
    options: ['[ML²T⁻¹]', '[ML²T⁻²]', '[MLT⁻¹]', '[ML²T⁻³]'],
    answer: '[ML²T⁻¹]',
    hints: ['h = Energy/frequency', '[ML²T⁻²]/[T⁻¹] = ?'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'dq8',
    question: 'If F = aρv², where F is force, ρ is density, v is velocity, what are dimensions of a?',
    options: ['[L²]', '[L⁻²]', '[M⁰L⁰T⁰]', '[L]'],
    answer: '[L²]',
    hints: ['F = aρv², so a = F/(ρv²)', '[MLT⁻²]/([ML⁻³][L²T⁻²]) = ?'],
    difficulty: 'hard',
    xpReward: 25,
  },
];

// Motion in a Plane Data
export const motionLessons: PhysicsLesson[] = [
  {
    id: 'm1',
    title: 'Introduction to Projectile Motion',
    content: `**Projectile Motion** is the motion of an object thrown at an angle to the horizontal.

**Key Characteristics:**
- Horizontal motion: Uniform velocity (no acceleration)
- Vertical motion: Uniformly accelerated (g = 9.8 m/s² downward)
- Path is a **parabola**

**Initial Velocity Components:**
- Horizontal: uₓ = u cos θ
- Vertical: uᵧ = u sin θ

where u is initial speed and θ is angle of projection.

**Important Assumption:** Air resistance is neglected.`,
    example: {
      problem: 'A ball is thrown at 20 m/s at 30° to horizontal. Find initial velocity components.',
      solution: 'uₓ = 20 cos 30° = 17.32 m/s, uᵧ = 20 sin 30° = 10 m/s',
      explanation: 'Resolve the velocity into horizontal (u cos θ) and vertical (u sin θ) components.',
    },
  },
  {
    id: 'm2',
    title: 'Time of Flight',
    content: `**Time of Flight (T)** is the total time the projectile remains in air.

**Formula:**
$$T = \\frac{2u \\sin θ}{g}$$

**Derivation:**
- At maximum height, vertical velocity = 0
- Time to reach max height: t = u sin θ / g
- Time of flight = 2 × time to max height

**Key Points:**
- T depends on initial speed and angle
- Maximum T when θ = 90° (straight up)
- For complementary angles (θ and 90°-θ), T is different`,
    example: {
      problem: 'Find time of flight for u = 20 m/s, θ = 30°, g = 10 m/s²',
      solution: 'T = 2(20)(sin 30°)/10 = 2(20)(0.5)/10 = 2 seconds',
      explanation: 'Using T = 2u sin θ/g with given values.',
    },
  },
  {
    id: 'm3',
    title: 'Maximum Height',
    content: `**Maximum Height (H)** is the highest point reached by the projectile.

**Formula:**
$$H = \\frac{u² \\sin²θ}{2g}$$

**Derivation:**
- At max height, vertical velocity vᵧ = 0
- Using v² = u² - 2gH (for vertical motion)
- 0 = (u sin θ)² - 2gH
- H = u² sin²θ / 2g

**Key Points:**
- H depends on (sin θ)² - maximum when θ = 90°
- For same u, H at 30° < H at 60°
- Independent of horizontal velocity`,
    example: {
      problem: 'Find max height for u = 20 m/s, θ = 30°, g = 10 m/s²',
      solution: 'H = (20)²(sin 30°)²/(2×10) = 400(0.25)/20 = 5 m',
      explanation: 'Using H = u² sin²θ/2g with sin 30° = 0.5.',
    },
  },
  {
    id: 'm4',
    title: 'Range of Projectile',
    content: `**Range (R)** is the horizontal distance covered during flight.

**Formula:**
$$R = \\frac{u² \\sin 2θ}{g}$$

**Derivation:**
- R = horizontal velocity × time of flight
- R = (u cos θ) × (2u sin θ/g)
- R = u² (2 sin θ cos θ)/g = u² sin 2θ/g

**Key Points:**
- Maximum range when sin 2θ = 1, i.e., θ = 45°
- R_max = u²/g (at 45°)
- Complementary angles give SAME range: R(30°) = R(60°)`,
    example: {
      problem: 'Find range for u = 20 m/s, θ = 30°, g = 10 m/s²',
      solution: 'R = (20)² sin(60°)/10 = 400(0.866)/10 = 34.64 m',
      explanation: 'Using R = u² sin 2θ/g with sin 60° = √3/2 ≈ 0.866.',
    },
  },
  {
    id: 'm5',
    title: 'Projectile Motion Summary',
    content: `**Summary of Formulas:**

| Quantity | Formula |
|----------|---------|
| Horizontal velocity | uₓ = u cos θ (constant) |
| Vertical velocity at t | vᵧ = u sin θ - gt |
| Time of flight | T = 2u sin θ/g |
| Maximum height | H = u² sin²θ/2g |
| Range | R = u² sin 2θ/g |

**Special Cases:**
- θ = 45°: Maximum range = u²/g
- θ = 90°: Maximum height = u²/2g, Range = 0
- Horizontal projection (θ = 0°): H = 0, Range depends on height

**Velocity at any time:**
v = √(uₓ² + vᵧ²)`,
    example: {
      problem: 'At what angles will a projectile have the same range?',
      solution: 'θ and (90° - θ)',
      explanation: 'sin 2θ = sin 2(90°-θ), so 30° and 60° give same range.',
    },
  },
];

export const motionQuestions: PhysicsQuestion[] = [
  {
    id: 'mq1',
    question: 'In projectile motion, horizontal acceleration is:',
    options: ['g', '0', 'g/2', 'Depends on angle'],
    answer: '0',
    hints: ['Only gravity acts on projectile', 'Gravity acts vertically'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'mq2',
    question: 'The path of a projectile is:',
    options: ['Straight line', 'Circle', 'Parabola', 'Hyperbola'],
    answer: 'Parabola',
    hints: ['Horizontal: uniform motion', 'Vertical: accelerated motion'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'mq3',
    question: 'For maximum range, the angle of projection should be:',
    options: ['30°', '45°', '60°', '90°'],
    answer: '45°',
    hints: ['Range = u² sin 2θ/g', 'Maximum when sin 2θ = 1'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'mq4',
    question: 'Time of flight formula for projectile motion is:',
    options: ['u sin θ/g', '2u sin θ/g', 'u cos θ/g', 'u²sin 2θ/g'],
    answer: '2u sin θ/g',
    hints: ['Time to go up = u sin θ/g', 'Total time = 2 × time to reach max height'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'mq5',
    question: 'Two projectiles are thrown with same speed at 30° and 60°. Their ranges are:',
    options: ['Equal', 'In ratio 1:√3', 'In ratio 1:2', 'In ratio √3:1'],
    answer: 'Equal',
    hints: ['These are complementary angles', 'sin 2(30°) = sin 2(60°)'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'mq6',
    question: 'At the highest point of projectile motion, velocity is:',
    options: ['Zero', 'u cos θ', 'u sin θ', 'u'],
    answer: 'u cos θ',
    hints: ['Vertical velocity becomes zero at max height', 'Horizontal velocity remains constant'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'mq7',
    question: 'A ball is thrown at 30 m/s at 30°. Max height is (g = 10 m/s²):',
    options: ['11.25 m', '22.5 m', '45 m', '5.625 m'],
    answer: '11.25 m',
    hints: ['H = u² sin²θ/2g', 'H = 900 × (0.5)²/(2×10)'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'mq8',
    question: 'If range of projectile is maximum, what is the ratio of max height to range?',
    options: ['1:4', '1:2', '1:1', '2:1'],
    answer: '1:4',
    hints: ['At θ = 45°: H = u²/4g, R = u²/g', 'H/R = (u²/4g)/(u²/g)'],
    difficulty: 'hard',
    xpReward: 25,
  },
];
