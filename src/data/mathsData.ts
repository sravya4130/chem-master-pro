export interface MathLesson {
  id: string;
  title: string;
  content: string;
  example: {
    problem: string;
    solution: string;
    explanation: string;
  };
}

export interface MathQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

// Sets Data
export const setsLessons: MathLesson[] = [
  {
    id: 's1',
    title: 'Introduction to Sets',
    content: `A **set** is a well-defined collection of distinct objects called elements or members.

**Notation:**
- Sets are denoted by capital letters: A, B, C...
- Elements are written inside curly braces: {1, 2, 3}
- Symbol ∈ means "belongs to" (e.g., 2 ∈ A)
- Symbol ∉ means "does not belong to"

**Types of Sets:**
- Empty Set (∅ or {}): Contains no elements
- Finite Set: Has countable elements
- Infinite Set: Has uncountable elements
- Universal Set (U): Contains all elements under consideration`,
    example: {
      problem: 'A = {1, 2, 3, 4, 5}',
      solution: 'This is a finite set with 5 elements',
      explanation: 'The set A contains natural numbers from 1 to 5. We can say 3 ∈ A and 7 ∉ A.',
    },
  },
  {
    id: 's2',
    title: 'Set Operations',
    content: `**Union (A ∪ B):** All elements in A or B or both
- A ∪ B = {x : x ∈ A or x ∈ B}

**Intersection (A ∩ B):** Elements common to both A and B
- A ∩ B = {x : x ∈ A and x ∈ B}

**Difference (A - B):** Elements in A but not in B
- A - B = {x : x ∈ A and x ∉ B}

**Complement (A'):** Elements not in A (from universal set)
- A' = U - A`,
    example: {
      problem: 'A = {1, 2, 3}, B = {2, 3, 4}. Find A ∪ B and A ∩ B',
      solution: 'A ∪ B = {1, 2, 3, 4}, A ∩ B = {2, 3}',
      explanation: 'Union combines all elements, intersection finds common elements.',
    },
  },
  {
    id: 's3',
    title: 'Subsets and Power Sets',
    content: `**Subset (A ⊆ B):** Every element of A is also in B
- If A ⊆ B and B ⊆ A, then A = B
- Empty set is a subset of every set

**Proper Subset (A ⊂ B):** A ⊆ B but A ≠ B

**Power Set P(A):** Set of all subsets of A
- If n(A) = n, then n(P(A)) = 2ⁿ

**Number of elements formula:**
- n(A ∪ B) = n(A) + n(B) - n(A ∩ B)`,
    example: {
      problem: 'Find all subsets of A = {1, 2}',
      solution: 'P(A) = {∅, {1}, {2}, {1, 2}}',
      explanation: 'A set with 2 elements has 2² = 4 subsets.',
    },
  },
  {
    id: 's4',
    title: 'Venn Diagrams',
    content: `Venn diagrams visually represent sets and their relationships.

**Key Representations:**
- Universal set: Rectangle
- Individual sets: Circles inside rectangle
- Shaded regions: Represent operations

**Problem Solving Tips:**
- Start from innermost region (intersection)
- Work outwards
- Use n(A ∪ B) = n(A) + n(B) - n(A ∩ B)

For three sets:
n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(A∩C) + n(A∩B∩C)`,
    example: {
      problem: 'In a class, 30 students like Maths, 25 like Physics, 10 like both. How many like at least one?',
      solution: 'n(M ∪ P) = 30 + 25 - 10 = 45',
      explanation: 'Using the union formula, we subtract the intersection to avoid counting twice.',
    },
  },
];

export const setsQuestions: MathQuestion[] = [
  {
    id: 'sq1',
    question: 'If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?',
    options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{1}'],
    answer: '{2, 3}',
    hints: ['Intersection means common elements', 'Find elements present in both sets'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'sq2',
    question: 'If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∪ B?',
    options: ['{2, 3}', '{1, 2, 3, 4}', '{1, 4}', '{1, 2, 3}'],
    answer: '{1, 2, 3, 4}',
    hints: ['Union means all elements from both', 'Don\'t repeat common elements'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'sq3',
    question: 'How many subsets does a set with 3 elements have?',
    options: ['3', '6', '8', '9'],
    answer: '8',
    hints: ['Formula: 2ⁿ where n is number of elements', '2³ = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'sq4',
    question: 'If n(A) = 15, n(B) = 20, and n(A ∩ B) = 8, find n(A ∪ B)',
    options: ['27', '35', '43', '23'],
    answer: '27',
    hints: ['Use n(A ∪ B) = n(A) + n(B) - n(A ∩ B)', '15 + 20 - 8 = ?'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'sq5',
    question: 'Which of the following is an empty set?',
    options: ['{0}', '{∅}', '{}', '{1, 2, 3}'],
    answer: '{}',
    hints: ['{0} contains the element 0', 'Empty set has no elements at all'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'sq6',
    question: 'If A = {a, b, c}, which is NOT a subset of A?',
    options: ['{a}', '{a, b}', '∅', '{a, b, c, d}'],
    answer: '{a, b, c, d}',
    hints: ['A subset cannot have elements not in the original set', 'd is not in A'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'sq7',
    question: 'In a survey, 50 people like tea, 30 like coffee, 15 like both. How many like only tea?',
    options: ['50', '35', '15', '65'],
    answer: '35',
    hints: ['Only tea = Total tea - Both', '50 - 15 = ?'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'sq8',
    question: 'If A ⊂ B and B ⊂ A, then:',
    options: ['A = B', 'A ≠ B', 'A ∩ B = ∅', 'A ∪ B = ∅'],
    answer: 'A = B',
    hints: ['If each is a subset of the other...', 'They must contain the same elements'],
    difficulty: 'hard',
    xpReward: 25,
  },
];

// Relations and Functions Data
export const relationsLessons: MathLesson[] = [
  {
    id: 'r1',
    title: 'Cartesian Product and Relations',
    content: `**Cartesian Product (A × B):**
- Set of all ordered pairs (a, b) where a ∈ A and b ∈ B
- If n(A) = m and n(B) = n, then n(A × B) = m × n

**Relation:**
- A relation R from set A to set B is a subset of A × B
- Domain: Set of all first elements
- Range: Set of all second elements
- Co-domain: The set B itself`,
    example: {
      problem: 'A = {1, 2}, B = {a, b}. Find A × B',
      solution: 'A × B = {(1,a), (1,b), (2,a), (2,b)}',
      explanation: 'Each element of A pairs with each element of B, giving 2 × 2 = 4 ordered pairs.',
    },
  },
  {
    id: 'r2',
    title: 'Types of Relations',
    content: `**Reflexive:** (a, a) ∈ R for all a ∈ A

**Symmetric:** If (a, b) ∈ R, then (b, a) ∈ R

**Transitive:** If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R

**Equivalence Relation:** Reflexive + Symmetric + Transitive

**Anti-symmetric:** If (a, b) ∈ R and (b, a) ∈ R, then a = b`,
    example: {
      problem: 'R = {(1,1), (2,2), (1,2), (2,1)} on A = {1, 2}',
      solution: 'R is reflexive, symmetric, but check transitivity',
      explanation: 'It\'s reflexive (has 1,1 and 2,2), symmetric (has both 1,2 and 2,1).',
    },
  },
  {
    id: 'r3',
    title: 'Introduction to Functions',
    content: `A **function** f from A to B (f: A → B) is a special relation where:
- Every element of A has exactly one image in B

**Types:**
- **One-One (Injective):** Different elements have different images
- **Onto (Surjective):** Every element of B has a pre-image
- **Bijective:** Both one-one and onto

**Vertical Line Test:** A curve represents a function if no vertical line intersects it more than once.`,
    example: {
      problem: 'f(x) = 2x, domain = {1, 2, 3}',
      solution: 'Range = {2, 4, 6}',
      explanation: 'Each input gives exactly one output: f(1)=2, f(2)=4, f(3)=6.',
    },
  },
  {
    id: 'r4',
    title: 'Composition and Inverse Functions',
    content: `**Composition of Functions:**
- (f ∘ g)(x) = f(g(x))
- Read as "f of g of x"
- First apply g, then apply f to the result

**Inverse Function (f⁻¹):**
- Only exists for bijective functions
- f⁻¹(f(x)) = x and f(f⁻¹(y)) = y
- To find: Replace f(x) with y, solve for x, swap x and y

**Important:** (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹`,
    example: {
      problem: 'f(x) = 2x + 1. Find f⁻¹(x)',
      solution: 'f⁻¹(x) = (x - 1)/2',
      explanation: 'Let y = 2x + 1, solve for x: x = (y-1)/2, swap to get f⁻¹(x) = (x-1)/2.',
    },
  },
];

export const relationsQuestions: MathQuestion[] = [
  {
    id: 'rq1',
    question: 'If A = {1, 2} and B = {3, 4}, how many elements are in A × B?',
    options: ['2', '4', '6', '8'],
    answer: '4',
    hints: ['n(A × B) = n(A) × n(B)', '2 × 2 = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'rq2',
    question: 'A relation R on set A is reflexive if:',
    options: ['(a, a) ∈ R for all a ∈ A', '(a, b) ∈ R implies (b, a) ∈ R', 'R = A × A', 'R is empty'],
    answer: '(a, a) ∈ R for all a ∈ A',
    hints: ['Reflexive relates each element to itself', 'Think of "=" relation'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'rq3',
    question: 'If f(x) = 3x + 2, what is f(4)?',
    options: ['12', '14', '10', '6'],
    answer: '14',
    hints: ['Substitute x = 4', '3(4) + 2 = ?'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'rq4',
    question: 'Which relation is NOT an equivalence relation?',
    options: ['Equality (=)', '"Greater than" (>)', '"Same age as"', '"Congruence"'],
    answer: '"Greater than" (>)',
    hints: ['Equivalence needs reflexive, symmetric, transitive', 'Is ">" symmetric?'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'rq5',
    question: 'If f(x) = x² and g(x) = x + 1, what is (f ∘ g)(2)?',
    options: ['5', '9', '6', '4'],
    answer: '9',
    hints: ['First find g(2), then apply f', 'g(2) = 3, then f(3) = ?'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'rq6',
    question: 'The inverse of f(x) = 3x - 6 is:',
    options: ['f⁻¹(x) = (x + 6)/3', 'f⁻¹(x) = 3x + 6', 'f⁻¹(x) = x/3 + 2', 'f⁻¹(x) = (x + 6)/3 and f⁻¹(x) = x/3 + 2'],
    answer: 'f⁻¹(x) = (x + 6)/3',
    hints: ['Set y = 3x - 6, solve for x', 'Add 6, then divide by 3'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'rq7',
    question: 'A function f: A → B is onto if:',
    options: ['Every element of A has an image', 'Every element of B has a pre-image', 'f is one-one', 'A = B'],
    answer: 'Every element of B has a pre-image',
    hints: ['Onto means the range equals the codomain', 'Every y in B has some x mapping to it'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'rq8',
    question: 'If f: R → R, f(x) = x², then f is:',
    options: ['One-one and onto', 'One-one but not onto', 'Onto but not one-one', 'Neither one-one nor onto'],
    answer: 'Neither one-one nor onto',
    hints: ['f(2) = f(-2) = 4, so not one-one', 'Negative numbers have no pre-image'],
    difficulty: 'hard',
    xpReward: 25,
  },
];

// Trigonometric Functions Data
export const trigLessons: MathLesson[] = [
  {
    id: 't1',
    title: 'Trigonometric Ratios',
    content: `In a right triangle with angle θ:

**Basic Ratios:**
- sin θ = Opposite / Hypotenuse
- cos θ = Adjacent / Hypotenuse  
- tan θ = Opposite / Adjacent = sin θ / cos θ

**Reciprocal Ratios:**
- cosec θ = 1/sin θ
- sec θ = 1/cos θ
- cot θ = 1/tan θ = cos θ / sin θ

**Memory Trick:** SOH-CAH-TOA`,
    example: {
      problem: 'In a right triangle, opposite = 3, adjacent = 4, hypotenuse = 5. Find sin θ and cos θ.',
      solution: 'sin θ = 3/5, cos θ = 4/5',
      explanation: 'Using SOH-CAH: sin = opp/hyp = 3/5, cos = adj/hyp = 4/5.',
    },
  },
  {
    id: 't2',
    title: 'Standard Angles',
    content: `**Important Values to Memorize:**

| θ | 0° | 30° | 45° | 60° | 90° |
|---|---|---|---|---|---|
| sin θ | 0 | 1/2 | 1/√2 | √3/2 | 1 |
| cos θ | 1 | √3/2 | 1/√2 | 1/2 | 0 |
| tan θ | 0 | 1/√3 | 1 | √3 | ∞ |

**Pattern:** sin values: √0/2, √1/2, √2/2, √3/2, √4/2

**Converting:** 
- 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2`,
    example: {
      problem: 'Find sin 60° + cos 30°',
      solution: '√3/2 + √3/2 = √3',
      explanation: 'Both sin 60° and cos 30° equal √3/2.',
    },
  },
  {
    id: 't3',
    title: 'Trigonometric Identities',
    content: `**Pythagorean Identities:**
- sin²θ + cos²θ = 1
- 1 + tan²θ = sec²θ
- 1 + cot²θ = cosec²θ

**Negative Angle Identities:**
- sin(-θ) = -sin θ
- cos(-θ) = cos θ
- tan(-θ) = -tan θ

**Complementary Angles:**
- sin(90° - θ) = cos θ
- cos(90° - θ) = sin θ`,
    example: {
      problem: 'If sin θ = 3/5, find cos θ',
      solution: 'cos θ = 4/5',
      explanation: 'Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, so cos²θ = 16/25, cos θ = 4/5.',
    },
  },
  {
    id: 't4',
    title: 'Graphs of Trigonometric Functions',
    content: `**y = sin x:**
- Period: 2π
- Range: [-1, 1]
- Starts at origin

**y = cos x:**
- Period: 2π
- Range: [-1, 1]
- Starts at (0, 1)

**y = tan x:**
- Period: π
- Range: (-∞, ∞)
- Vertical asymptotes at x = ±π/2, ±3π/2...

**Transformations:**
- y = A sin(Bx + C) + D
- A: Amplitude, 2π/B: Period, -C/B: Phase shift, D: Vertical shift`,
    example: {
      problem: 'What is the period of y = sin(2x)?',
      solution: 'Period = 2π/2 = π',
      explanation: 'For y = sin(Bx), period = 2π/B. Here B = 2, so period = π.',
    },
  },
];

export const trigQuestions: MathQuestion[] = [
  {
    id: 'tq1',
    question: 'What is sin 30°?',
    options: ['1/2', '√3/2', '1/√2', '1'],
    answer: '1/2',
    hints: ['Remember the standard angle values', 'sin increases from 0 to 1 as angle goes from 0° to 90°'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'tq2',
    question: 'What is cos 60°?',
    options: ['1/2', '√3/2', '1/√2', '0'],
    answer: '1/2',
    hints: ['cos 60° = sin 30°', 'Use complementary angle relationship'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'tq3',
    question: 'What is tan 45°?',
    options: ['0', '1', '√3', '1/√3'],
    answer: '1',
    hints: ['tan = sin/cos', 'At 45°, sin and cos are equal'],
    difficulty: 'easy',
    xpReward: 10,
  },
  {
    id: 'tq4',
    question: 'If sin θ = 4/5, what is cos θ? (θ is acute)',
    options: ['3/5', '4/5', '5/4', '5/3'],
    answer: '3/5',
    hints: ['Use sin²θ + cos²θ = 1', '16/25 + cos²θ = 1'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'tq5',
    question: 'What is the period of y = sin(3x)?',
    options: ['2π', 'π', '2π/3', '3π'],
    answer: '2π/3',
    hints: ['Period of sin(Bx) is 2π/B', 'Here B = 3'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'tq6',
    question: 'sin(-60°) equals:',
    options: ['√3/2', '-√3/2', '1/2', '-1/2'],
    answer: '-√3/2',
    hints: ['sin(-θ) = -sin θ', 'sin 60° = √3/2'],
    difficulty: 'medium',
    xpReward: 15,
  },
  {
    id: 'tq7',
    question: 'Which identity is correct?',
    options: ['sin²θ - cos²θ = 1', '1 + tan²θ = sec²θ', 'sin²θ + cos²θ = 2', 'tan²θ - 1 = sec²θ'],
    answer: '1 + tan²θ = sec²θ',
    hints: ['This is a Pythagorean identity', 'Divide sin²θ + cos²θ = 1 by cos²θ'],
    difficulty: 'hard',
    xpReward: 25,
  },
  {
    id: 'tq8',
    question: 'sin 75° equals:',
    options: ['sin 45° + sin 30°', 'sin(45° + 30°)', 'sin 45° × sin 30°', 'cos 15°'],
    answer: 'cos 15°',
    hints: ['sin θ = cos(90° - θ)', 'sin 75° = cos(90° - 75°)'],
    difficulty: 'hard',
    xpReward: 25,
  },
];
