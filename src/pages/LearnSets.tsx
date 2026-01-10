import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';
import VennDiagram from '@/components/maths/VennDiagram';

interface SetLesson {
  id: string;
  title: string;
  content: string;
  example: {
    problem: string;
    solution: string;
    explanation: string;
  };
  vennType?: 'union' | 'intersection' | 'difference' | 'complement' | 'basic';
}

const setsLessonsEnhanced: SetLesson[] = [
  {
    id: 's1',
    title: 'What is a Set?',
    content: `A **set** is a well-defined collection of distinct objects called elements or members.

**Key Characteristics:**
- Objects must be distinct (no duplicates)
- The collection must be well-defined
- Order doesn't matter: {1, 2, 3} = {3, 1, 2}

**Notation:**
- Sets are denoted by capital letters: A, B, C...
- Elements are written inside curly braces: {1, 2, 3}
- Symbol ∈ means "belongs to" (e.g., 2 ∈ A)
- Symbol ∉ means "does not belong to"

**Types of Sets:**
- Empty Set (∅ or {}): Contains no elements
- Singleton Set: Contains exactly one element
- Finite Set: Has countable elements
- Infinite Set: Has uncountable elements
- Universal Set (U): Contains all elements under consideration`,
    example: {
      problem: 'A = {a, e, i, o, u}',
      solution: 'This is the set of vowels in English',
      explanation: 'The set A contains 5 distinct elements. We can say "a ∈ A" (a belongs to A) and "b ∉ A" (b does not belong to A).',
    },
    vennType: 'basic',
  },
  {
    id: 's2',
    title: 'Standard Set Notations',
    content: `**Set Builder Notation:**
Write sets by describing properties of elements.

**Common Number Sets:**
- ℕ = Natural numbers = {1, 2, 3, 4, ...}
- ℤ = Integers = {..., -2, -1, 0, 1, 2, ...}
- ℚ = Rational numbers (fractions)
- ℝ = Real numbers (all numbers on number line)

**Interval Notation:**
- [a, b] = {x : a ≤ x ≤ b} (closed interval)
- (a, b) = {x : a < x < b} (open interval)
- [a, b) = {x : a ≤ x < b} (half-open)

**Roster Form vs Set Builder:**
- Roster: A = {2, 4, 6, 8, 10}
- Set Builder: A = {x : x is an even number, 1 < x ≤ 10}`,
    example: {
      problem: 'Write in set builder: A = {1, 4, 9, 16, 25}',
      solution: 'A = {x² : x ∈ ℕ, 1 ≤ x ≤ 5}',
      explanation: 'These are perfect squares of natural numbers from 1 to 5.',
    },
  },
  {
    id: 's3',
    title: 'Union of Sets (A ∪ B)',
    content: `**Union (A ∪ B):** The set containing ALL elements that are in A OR in B (or in both).

**Definition:**
A ∪ B = {x : x ∈ A or x ∈ B}

**Properties:**
- Commutative: A ∪ B = B ∪ A
- Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)
- Identity: A ∪ ∅ = A
- Idempotent: A ∪ A = A

**Visual Understanding:**
In a Venn diagram, Union is the ENTIRE shaded region covering both circles.

**Real-life Example:**
If A = {students who play cricket} and B = {students who play football}, then A ∪ B = {students who play cricket OR football OR both}.`,
    example: {
      problem: 'A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Find A ∪ B',
      solution: 'A ∪ B = {1, 2, 3, 4, 5, 6}',
      explanation: 'Combine all elements from both sets. Common elements (3, 4) are written only once.',
    },
    vennType: 'union',
  },
  {
    id: 's4',
    title: 'Intersection of Sets (A ∩ B)',
    content: `**Intersection (A ∩ B):** The set containing elements that are in BOTH A AND B.

**Definition:**
A ∩ B = {x : x ∈ A and x ∈ B}

**Properties:**
- Commutative: A ∩ B = B ∩ A
- Associative: (A ∩ B) ∩ C = A ∩ (B ∩ C)
- Identity: A ∩ U = A (U is universal set)
- Idempotent: A ∩ A = A

**Disjoint Sets:**
If A ∩ B = ∅, sets A and B are called disjoint (no common elements).

**Visual Understanding:**
In a Venn diagram, Intersection is ONLY the overlapping region.

**Real-life Example:**
If A = {students in math class} and B = {students in science class}, then A ∩ B = {students taking BOTH math and science}.`,
    example: {
      problem: 'A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Find A ∩ B',
      solution: 'A ∩ B = {3, 4}',
      explanation: 'Only elements present in BOTH sets. 3 and 4 appear in both A and B.',
    },
    vennType: 'intersection',
  },
  {
    id: 's5',
    title: 'Difference of Sets (A - B)',
    content: `**Difference (A - B or A \\ B):** Elements in A but NOT in B.

**Definition:**
A - B = {x : x ∈ A and x ∉ B}

**Important Notes:**
- A - B ≠ B - A (Not commutative!)
- A - B removes elements of B from A
- Also called "relative complement of B in A"

**Properties:**
- A - ∅ = A
- A - A = ∅
- A - B = A ∩ B'

**Visual Understanding:**
In a Venn diagram, A - B is the part of circle A that does NOT overlap with B.

**Symmetric Difference (A △ B):**
A △ B = (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)
Elements in A or B but NOT in both.`,
    example: {
      problem: 'A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Find A - B and B - A',
      solution: 'A - B = {1, 2}, B - A = {5, 6}',
      explanation: 'A - B: Remove 3, 4 from A. B - A: Remove 3, 4 from B. Notice they are different!',
    },
    vennType: 'difference',
  },
  {
    id: 's6',
    title: 'Complement of a Set (A\')',
    content: `**Complement (A' or Aᶜ):** Elements in the universal set U but NOT in A.

**Definition:**
A' = U - A = {x : x ∈ U and x ∉ A}

**Properties:**
- (A')' = A (Double complement)
- A ∪ A' = U
- A ∩ A' = ∅
- ∅' = U and U' = ∅

**De Morgan's Laws:**
- (A ∪ B)' = A' ∩ B' (Complement of union = intersection of complements)
- (A ∩ B)' = A' ∪ B' (Complement of intersection = union of complements)

**Visual Understanding:**
In a Venn diagram, A' is everything OUTSIDE circle A but still inside the rectangle U.`,
    example: {
      problem: 'U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 2, 3, 4}. Find A\'',
      solution: 'A\' = {5, 6, 7, 8}',
      explanation: 'A\' contains all elements of U that are not in A.',
    },
    vennType: 'complement',
  },
  {
    id: 's7',
    title: 'Important Formulas and Laws',
    content: `**Cardinality Formulas:**

**For Two Sets:**
n(A ∪ B) = n(A) + n(B) - n(A ∩ B)

**For Three Sets:**
n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(A∩C) + n(A∩B∩C)

**Laws of Sets:**
- Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)
- Distributive: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
- Absorption: A ∪ (A ∩ B) = A
- Absorption: A ∩ (A ∪ B) = A

**Power Set:**
- P(A) = set of all subsets of A
- If n(A) = n, then n(P(A)) = 2ⁿ`,
    example: {
      problem: 'In a class, 40 study Math, 30 study Science, 10 study both. Find total studying at least one.',
      solution: 'n(M ∪ S) = 40 + 30 - 10 = 60',
      explanation: 'Using the formula: Add both, subtract the intersection to avoid double counting.',
    },
  },
  {
    id: 's8',
    title: 'Subsets and Power Sets',
    content: `**Subset (A ⊆ B):**
Every element of A is also in B.

**Properties:**
- ∅ is a subset of every set
- Every set is a subset of itself: A ⊆ A
- If A ⊆ B and B ⊆ A, then A = B

**Proper Subset (A ⊂ B):**
A ⊆ B but A ≠ B (A has fewer elements)

**Power Set P(A):**
The set of ALL possible subsets of A.

**Formula:**
If n(A) = n, then:
- Number of subsets = 2ⁿ
- Number of proper subsets = 2ⁿ - 1
- Number of non-empty subsets = 2ⁿ - 1

**Example:**
A = {a, b}
P(A) = {∅, {a}, {b}, {a, b}}
4 subsets = 2² = 4 ✓`,
    example: {
      problem: 'Find all subsets of A = {1, 2, 3}',
      solution: 'P(A) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}',
      explanation: 'A set with 3 elements has 2³ = 8 subsets. This includes the empty set and the set itself.',
    },
  },
];

const LearnSets = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');

  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported, speedMultiplier, increaseSpeed, decreaseSpeed, progress } = useTutorSpeech(selectedTutor);

  const lesson = setsLessonsEnhanced[currentLesson];

  useEffect(() => { return () => { stop(); }; }, [stop]);
  useEffect(() => { stop(); }, [currentLesson, stop]);

  const getLessonSpeechText = () => {
    if (!lesson) return '';
    const cleanContent = lesson.content.replace(/\*\*/g, '').replace(/- /g, '').replace(/\n+/g, '. ').trim();
    return `${lesson.title}. ${cleanContent}. Example: ${lesson.example.problem}. Solution: ${lesson.example.solution}. ${lesson.example.explanation}`;
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Sets">
        <div className="p-4 pb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white mb-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl animate-bounce">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">Sets</h2>
                <p className="opacity-80">Master the foundation of mathematics</p>
              </div>
            </div>
            {selectedTutor && (
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm">
                  "{selectedTutor.name} here! Sets are everywhere in mathematics - they're collections of objects that follow specific rules. We'll learn about unions, intersections, Venn diagrams, and powerful formulas. Let's begin!"
                </p>
              </div>
            )}
          </div>

          {/* Topics Overview */}
          <div className="bg-card rounded-xl p-4 mb-6 shadow-card">
            <h3 className="font-bold mb-3">📚 What you'll learn:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Set basics & notation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>Union & Intersection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Difference & Complement</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Venn diagrams</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>Important formulas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Power sets</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setMode('learn')} 
              className="w-full h-auto p-6 justify-start gap-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
            >
              <BookOpen className="h-8 w-8" />
              <div className="text-left">
                <p className="font-bold text-lg">Learn First</p>
                <p className="text-sm opacity-80">Interactive lessons with Venn diagrams</p>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/game/maths/sets')} 
              variant="outline" 
              className="w-full h-auto p-6 justify-start gap-4 border-2 border-purple-500/30 hover:bg-purple-500/10"
            >
              <Gamepad2 className="h-8 w-8 text-purple-500" />
              <div className="text-left">
                <p className="font-bold text-lg">Jump to Game</p>
                <p className="text-sm text-muted-foreground">Test your knowledge</p>
              </div>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Lesson ${currentLesson + 1} of ${setsLessonsEnhanced.length}`}>
      <div className="p-4 pb-32">
        {/* Progress bar */}
        <div className="flex gap-1 mb-6">
          {setsLessonsEnhanced.map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                i < currentLesson ? 'bg-purple-500' : 
                i === currentLesson ? 'bg-purple-400 animate-pulse' : 
                'bg-muted'
              }`} 
            />
          ))}
        </div>

        {/* Tutor section */}
        {selectedTutor && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                {selectedTutor.emoji}
              </div>
              <div className="flex-1 bg-card rounded-xl p-3 shadow-card">
                <p className="text-sm">
                  {isSpeaking && !isPaused ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">🔊</span> {selectedTutor.name} is teaching...
                    </span>
                  ) : (
                    <span>Click play to hear {selectedTutor.name} explain</span>
                  )}
                </p>
              </div>
            </div>
            {isSupported && (
              <SpeechControls 
                isSpeaking={isSpeaking} 
                isPaused={isPaused} 
                speedMultiplier={speedMultiplier} 
                progress={progress} 
                onPlay={() => speak(getLessonSpeechText())} 
                onPause={pause} 
                onResume={resume} 
                onStop={stop} 
                onIncreaseSpeed={increaseSpeed} 
                onDecreaseSpeed={decreaseSpeed} 
              />
            )}
          </div>
        )}

        {/* Lesson content */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="text-xl font-bold mb-4 text-purple-400">{lesson.title}</h2>
          <div className="prose prose-sm text-foreground space-y-2">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold mt-4 text-purple-300">{line.replace(/\*\*/g, '')}</p>;
              } else if (line.startsWith('- ')) {
                return <p key={i} className="ml-4 text-muted-foreground">• {line.substring(2)}</p>;
              } else if (line.trim() === '') {
                return <div key={i} className="h-2" />;
              }
              return <p key={i} className="text-muted-foreground">{line}</p>;
            })}
          </div>
        </div>

        {/* Venn Diagram (if applicable) */}
        {lesson.vennType && (
          <div className="mb-6">
            <VennDiagram 
              type={lesson.vennType} 
              setA={['1', '2', '3', '4']}
              setB={['3', '4', '5', '6']}
              universal={['1', '2', '3', '4', '5', '6', '7', '8']}
            />
          </div>
        )}

        {/* Example */}
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/30">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">📝</span> Example
          </h3>
          <div className="bg-card rounded-xl p-4 mb-3 shadow-inner">
            <p className="font-mono text-lg text-center text-purple-300">{lesson.example.problem}</p>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">Solution: </span>
            <span className="font-bold text-purple-400">{lesson.example.solution}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center bg-card/50 rounded-lg p-2">
            💡 {lesson.example.explanation}
          </p>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button 
            variant="outline" 
            onClick={() => { 
              stop(); 
              if (currentLesson > 0) {
                setCurrentLesson(currentLesson - 1);
              } else {
                setMode('intro');
              }
            }} 
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={() => { 
              stop(); 
              if (currentLesson < setsLessonsEnhanced.length - 1) {
                setCurrentLesson(currentLesson + 1);
              } else {
                navigate('/game/maths/sets');
              }
            }} 
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600"
          >
            {currentLesson < setsLessonsEnhanced.length - 1 ? 'Next' : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnSets;
