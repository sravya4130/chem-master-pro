import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';
import { FlashcardGame } from '@/components/chemistry/FlashcardGame';
import { 
  massFormulas, 
  chemicalLaws, 
  daltonTheory, 
  solutionTypes,
  concentrationFormulas,
  equivalentFormulas,
  allChemistryFormulas
} from '@/data/basicConceptsData';

// Import images
import elementImg from '@/assets/chemistry-element.png';
import compoundImg from '@/assets/chemistry-compound.png';
import mixtureImg from '@/assets/chemistry-mixture.png';

const LearnBasicConcepts = () => {
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mode, setMode] = useState<'intro' | 'learn'>('intro');

  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    speedMultiplier,
    increaseSpeed,
    decreaseSpeed,
    progress,
  } = useTutorSpeech(selectedTutor);

  const totalSlides = 14;

  useEffect(() => () => stop(), [stop]);
  useEffect(() => stop(), [currentSlide, stop]);

  const handleTutorSpeak = (text: string) => {
    speak(text);
  };

  // Slide content renderer
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1Matter />;
      case 1:
        return <Slide2ChemicalLaws />;
      case 2:
        return <Slide3DaltonTheory />;
      case 3:
        return <Slide4MassDefinitions />;
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">🎯 Formula Flashcard Challenge</h3>
            <p className="text-sm text-muted-foreground">Memorize the formulas, then find the correct card!</p>
            <FlashcardGame 
              cards={massFormulas} 
              timeLimit={30}
              tutorSpeak={handleTutorSpeak}
            />
          </div>
        );
      case 5:
        return <Slide6MoleAndMolarMass />;
      case 6:
        return <Slide7EmpiricalFormula />;
      case 7:
        return <Slide8MolecularFormula />;
      case 8:
        return <Slide9Solutions />;
      case 9:
        return <Slide10MolalityMolarity />;
      case 10:
        return <Slide11MoleFraction />;
      case 11:
        return <Slide12EquivalentWeight />;
      case 12:
        return <Slide13Normality />;
      case 13:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">🏆 Final Flashcard Challenge</h3>
            <p className="text-sm text-muted-foreground">All formulas! Can you remember them all?</p>
            <FlashcardGame 
              cards={allChemistryFormulas.slice(0, 8)} 
              timeLimit={30}
              tutorSpeak={handleTutorSpeak}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getSlideTitles = (): string[] => [
    'Matter, Elements, Compounds & Mixtures',
    'Laws of Chemical Combination',
    "Dalton's Atomic Theory",
    'Atomic & Molecular Mass',
    'Formula Flashcard Game',
    'Mole Concept & Molar Mass',
    'Empirical Formula',
    'Molecular Formula',
    'Solutions & Concentration',
    'Molality & Molarity',
    'Mole Fraction & Relations',
    'Equivalent Weight',
    'Normality',
    'Final Flashcard Challenge',
  ];

  const getSpeechText = (): string => {
    const titles = getSlideTitles();
    return `${titles[currentSlide]}. Please follow along with the content on screen.`;
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Basic Concepts of Chemistry">
        <div className="p-4 pb-8 space-y-4">
          <div className="bg-gradient-to-br from-topic-pink to-topic-pink/80 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              {selectedTutor && (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  {selectedTutor.emoji}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">Basic Concepts</h2>
                <p className="opacity-80">Foundation of Chemistry</p>
              </div>
            </div>
            
            {selectedTutor && (
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm">
                  "{selectedTutor.name} here! Let's master the fundamentals of Chemistry - 
                  from atoms to solutions. This is where it all begins!"
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={() => setMode('learn')}
            className="w-full h-auto p-6 justify-start gap-4 bg-topic-pink hover:bg-topic-pink/90"
          >
            <BookOpen className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Learn First</p>
              <p className="text-sm opacity-80">14 comprehensive slides</p>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/game/basic-concepts')}
            variant="outline"
            className="w-full h-auto p-6 justify-start gap-4 border-2"
          >
            <Gamepad2 className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Jump to Game</p>
              <p className="text-sm text-muted-foreground">Test your knowledge</p>
            </div>
          </Button>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">What you'll learn:</h3>
            <ul className="space-y-3">
              {[
                'Matter, Elements & Compounds',
                'Laws of Chemical Combination',
                "Dalton's Atomic Theory",
                'Mole Concept & Solutions'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-topic-pink/20 flex items-center justify-center">
                    <span className="text-topic-pink font-bold">{i + 1}</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={getSlideTitles()[currentSlide]}>
      <div className="p-4 pb-32 space-y-4">
        {/* Progress */}
        <div className="flex gap-1">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i <= currentSlide ? 'bg-topic-pink' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {totalSlides}
        </div>

        {/* Tutor Speech */}
        {selectedTutor && isSupported && (
          <SpeechControls
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            progress={progress}
            onPlay={() => speak(getSpeechText())}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onIncreaseSpeed={increaseSpeed}
            onDecreaseSpeed={decreaseSpeed}
          />
        )}

        {/* Content */}
        <div className="animate-fade-in">
          {renderSlideContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              stop();
              if (currentSlide > 0) {
                setCurrentSlide(currentSlide - 1);
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
              if (currentSlide < totalSlides - 1) {
                setCurrentSlide(currentSlide + 1);
              } else {
                navigate('/game/basic-concepts');
              }
            }}
            className="flex-1 bg-topic-pink hover:bg-topic-pink/90"
          >
            {currentSlide < totalSlides - 1 ? 'Next' : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

// Slide 1: Matter, Elements, Compounds, Mixtures
const Slide1Matter = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary mb-2">📦 Matter</h3>
      <p className="text-sm">
        <strong>Definition:</strong> Matter is anything that has mass and occupies space. 
        All physical objects are made of matter. Matter can exist in three states: solid, liquid, and gas.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {/* Element */}
      <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
        <div className="flex items-start gap-4">
          <img src={elementImg} alt="Element" className="w-20 h-20 object-contain rounded-lg bg-white" />
          <div>
            <h4 className="font-bold text-topic-blue">⚛️ Element</h4>
            <p className="text-sm mt-1">
              A pure substance made of only <strong>one type of atom</strong>. Cannot be broken down by chemical means.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Examples: Gold (Au), Oxygen (O₂), Iron (Fe)</p>
          </div>
        </div>
      </div>

      {/* Compound */}
      <div className="bg-topic-green/10 rounded-xl p-4 border border-topic-green/30">
        <div className="flex items-start gap-4">
          <img src={compoundImg} alt="Compound" className="w-20 h-20 object-contain rounded-lg bg-white" />
          <div>
            <h4 className="font-bold text-topic-green">🔗 Compound</h4>
            <p className="text-sm mt-1">
              A substance formed when <strong>two or more elements chemically combine</strong> in a fixed ratio.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Examples: Water (H₂O), Carbon dioxide (CO₂)</p>
          </div>
        </div>
      </div>

      {/* Mixture */}
      <div className="bg-topic-pink/10 rounded-xl p-4 border border-topic-pink/30">
        <div className="flex items-start gap-4">
          <img src={mixtureImg} alt="Mixture" className="w-20 h-20 object-contain rounded-lg bg-white" />
          <div>
            <h4 className="font-bold text-topic-pink">🎨 Mixture</h4>
            <p className="text-sm mt-1">
              A combination of substances <strong>not chemically bonded</strong>. Can be separated by physical methods.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Examples: Air, Salt water, Alloys</p>
          </div>
        </div>
      </div>
    </div>

    {/* Atom */}
    <div className="bg-secondary rounded-xl p-4 border border-border">
      <h4 className="font-bold">🔬 Atom</h4>
      <p className="text-sm mt-1">
        The <strong>smallest unit of an element</strong> that retains its chemical properties. 
        Made of protons, neutrons, and electrons.
      </p>
    </div>

    {/* IUPAC */}
    <div className="bg-card rounded-xl p-4 border-2 border-primary">
      <h4 className="font-bold text-primary">📚 IUPAC</h4>
      <p className="text-sm mt-1 font-bold">
        International Union of Pure and Applied Chemistry
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        The worldwide authority that sets the standards for chemical nomenclature, symbols, and terminology.
      </p>
    </div>
  </div>
);

// Slide 2: Laws of Chemical Combination
const Slide2ChemicalLaws = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-primary">⚗️ Laws of Chemical Combination</h3>
    
    {chemicalLaws.map((law, index) => (
      <div key={index} className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-start gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            {index + 1}
          </span>
          <div className="flex-1">
            <h4 className="font-bold text-sm">{law.name}</h4>
            <p className="text-xs text-muted-foreground">{law.scientist}</p>
            <p className="text-sm mt-2">{law.definition}</p>
            <div className="bg-secondary/50 rounded-lg p-2 mt-2">
              <p className="text-xs"><strong>Example:</strong> {law.example}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Slide 3: Dalton's Atomic Theory
const Slide3DaltonTheory = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">👨‍🔬 John Dalton</h3>
      <p className="text-sm mt-2">{daltonTheory.about}</p>
    </div>

    <div className="bg-card rounded-xl p-4 border border-border">
      <h4 className="font-bold mb-3">📜 Postulates of Dalton's Atomic Theory:</h4>
      <ol className="space-y-2">
        {daltonTheory.postulates.map((postulate, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
              {index + 1}
            </span>
            <span>{postulate}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/30">
      <h4 className="font-bold text-destructive mb-2">⚠️ Limitations (Modern View):</h4>
      <ul className="space-y-1">
        {daltonTheory.limitations.map((limitation, index) => (
          <li key={index} className="text-sm flex items-start gap-2">
            <span className="text-destructive">•</span>
            <span>{limitation}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Slide 4: Mass Definitions
const Slide4MassDefinitions = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-primary">⚖️ Atomic & Molecular Mass Concepts</h3>
    
    {massFormulas.map((item, index) => (
      <div key={index} className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-bold text-sm text-primary">{item.term}</h4>
        <p className="text-sm mt-1 font-mono bg-secondary/50 p-2 rounded">{item.formula}</p>
      </div>
    ))}

    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h4 className="font-bold text-topic-blue">📝 Example: Average Atomic Mass</h4>
      <p className="text-sm mt-2">
        Chlorine has two isotopes: Cl-35 (75.77%) and Cl-37 (24.23%)
      </p>
      <p className="text-sm font-mono mt-2 bg-white/50 p-2 rounded">
        Average = (35 × 0.7577) + (37 × 0.2423) = 35.48 amu
      </p>
    </div>
  </div>
);

// Slide 6: Mole and Molar Mass
const Slide6MoleAndMolarMass = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">🔢 Mole Concept</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> A mole is the amount of substance that contains 
        as many particles (atoms, molecules, ions) as there are atoms in exactly 12 g of carbon-12.
      </p>
    </div>

    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h4 className="font-bold text-topic-blue">📊 Avogadro's Number (Nₐ)</h4>
      <p className="text-2xl font-mono font-bold text-center my-3">6.022 × 10²³</p>
      <p className="text-sm text-center">particles per mole</p>
    </div>

    <div className="grid gap-3">
      <div className="bg-card rounded-xl p-3 border border-border">
        <p className="font-bold text-sm">Mole (by mass):</p>
        <p className="font-mono text-primary">n = Given mass / Molar mass</p>
      </div>
      <div className="bg-card rounded-xl p-3 border border-border">
        <p className="font-bold text-sm">Mole (by entities):</p>
        <p className="font-mono text-primary">n = Number of entities / Nₐ</p>
      </div>
      <div className="bg-card rounded-xl p-3 border border-border">
        <p className="font-bold text-sm">Mole (for gas at STP):</p>
        <p className="font-mono text-primary">n = Volume / 22.4 L</p>
      </div>
    </div>

    <div className="bg-secondary rounded-xl p-4 border border-border">
      <h4 className="font-bold">🧪 Molar Mass</h4>
      <p className="text-sm mt-1">
        Mass of 1 mole of a substance in grams. Numerically equal to molecular mass but in g/mol.
      </p>
    </div>

    <div className="bg-topic-green/10 rounded-xl p-4 border border-topic-green/30">
      <h4 className="font-bold text-topic-green">📈 Percentage of Element</h4>
      <p className="font-mono text-sm mt-2 bg-white/50 p-2 rounded">
        % = (n × Atomic mass of element / Molecular mass) × 100
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Where n = number of atoms of the element in the compound
      </p>
    </div>
  </div>
);

// Slide 7: Empirical Formula
const Slide7EmpiricalFormula = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">🔬 Empirical Formula</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> The simplest whole number ratio of atoms of each element in a compound.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Examples: CH₂O (glucose's EF), CH (benzene's EF)
      </p>
    </div>

    <div className="bg-card rounded-xl p-4 border-2 border-primary overflow-x-auto">
      <h4 className="font-bold mb-3">📊 How to Find Empirical Formula:</h4>
      <table className="w-full text-xs border-collapse min-w-[300px]">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border border-border text-left">Step</th>
            <th className="p-2 border border-border text-center">Carbon</th>
            <th className="p-2 border border-border text-center">Hydrogen</th>
            <th className="p-2 border border-border text-center">Oxygen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-border font-bold">Element Symbol</td>
            <td className="p-2 border border-border text-center">C</td>
            <td className="p-2 border border-border text-center">H</td>
            <td className="p-2 border border-border text-center">O</td>
          </tr>
          <tr>
            <td className="p-2 border border-border font-bold">Atomic Mass</td>
            <td className="p-2 border border-border text-center">12</td>
            <td className="p-2 border border-border text-center">1</td>
            <td className="p-2 border border-border text-center">16</td>
          </tr>
          <tr>
            <td className="p-2 border border-border font-bold">% Weight</td>
            <td className="p-2 border border-border text-center text-muted-foreground italic">Given in Q</td>
            <td className="p-2 border border-border text-center text-muted-foreground italic">Given in Q</td>
            <td className="p-2 border border-border text-center text-muted-foreground italic">Given in Q</td>
          </tr>
          <tr>
            <td className="p-2 border border-border font-bold">Number of Moles</td>
            <td className="p-2 border border-border text-center font-mono text-primary text-xs">% / 12</td>
            <td className="p-2 border border-border text-center font-mono text-primary text-xs">% / 1</td>
            <td className="p-2 border border-border text-center font-mono text-primary text-xs">% / 16</td>
          </tr>
          <tr>
            <td className="p-2 border border-border font-bold">Simplest Ratio</td>
            <td className="p-2 border border-border text-center font-mono text-xs" colSpan={3}>
              Moles ÷ Smallest moles value
            </td>
          </tr>
          <tr className="bg-primary/10">
            <td className="p-2 border border-border font-bold">Empirical Formula</td>
            <td className="p-2 border border-border text-center font-mono font-bold text-primary" colSpan={3}>
              CₓHᵧOᵧ (using ratios)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Slide 8: Molecular Formula
const Slide8MolecularFormula = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">🧬 Molecular Formula</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> The actual number of atoms of each element in a molecule.
        Shows the true composition of a compound.
      </p>
    </div>

    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h4 className="font-bold text-topic-blue">📐 Formula</h4>
      <p className="text-lg font-mono font-bold text-center my-3 text-primary">
        Molecular Formula = n × Empirical Formula
      </p>
      <p className="text-sm text-center">where</p>
      <p className="text-lg font-mono font-bold text-center my-2 text-primary">
        n = Molar Mass / Empirical Formula Mass
      </p>
    </div>

    <div className="bg-card rounded-xl p-4 border border-border">
      <h4 className="font-bold mb-3">🔗 Relationship:</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border border-border">Compound</th>
            <th className="p-2 border border-border">EF</th>
            <th className="p-2 border border-border">MF</th>
            <th className="p-2 border border-border">n</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-border">Glucose</td>
            <td className="p-2 border border-border text-center">CH₂O</td>
            <td className="p-2 border border-border text-center">C₆H₁₂O₆</td>
            <td className="p-2 border border-border text-center">6</td>
          </tr>
          <tr>
            <td className="p-2 border border-border">Benzene</td>
            <td className="p-2 border border-border text-center">CH</td>
            <td className="p-2 border border-border text-center">C₆H₆</td>
            <td className="p-2 border border-border text-center">6</td>
          </tr>
          <tr>
            <td className="p-2 border border-border">Acetic Acid</td>
            <td className="p-2 border border-border text-center">CH₂O</td>
            <td className="p-2 border border-border text-center">C₂H₄O₂</td>
            <td className="p-2 border border-border text-center">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Slide 9: Solutions
const Slide9Solutions = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">🧪 Solutions</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> A homogeneous mixture of two or more substances. 
        The substance present in larger amount is the <strong>solvent</strong>, 
        and the one in smaller amount is the <strong>solute</strong>.
      </p>
    </div>

    <div className="bg-card rounded-xl p-4 border border-border overflow-x-auto">
      <h4 className="font-bold mb-3">📊 Types of Solutions:</h4>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border border-border">Type</th>
            <th className="p-2 border border-border">Solute</th>
            <th className="p-2 border border-border">Solvent</th>
            <th className="p-2 border border-border">Example</th>
          </tr>
        </thead>
        <tbody>
          {solutionTypes.slice(0, 6).map((sol, i) => (
            <tr key={i}>
              <td className="p-2 border border-border font-medium">{sol.type}</td>
              <td className="p-2 border border-border text-center">{sol.solute}</td>
              <td className="p-2 border border-border text-center">{sol.solvent}</td>
              <td className="p-2 border border-border text-muted-foreground">{sol.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="bg-topic-green/10 rounded-xl p-4 border border-topic-green/30">
      <h4 className="font-bold text-topic-green mb-3">📏 Concentration Measurements:</h4>
      <div className="space-y-2">
        <div className="bg-white/50 rounded p-2">
          <p className="font-mono text-sm font-bold">% w/w = (Mass of solute / Mass of solution) × 100</p>
        </div>
        <div className="bg-white/50 rounded p-2">
          <p className="font-mono text-sm font-bold">% w/V = (Mass of solute / Volume of solution) × 100</p>
        </div>
        <div className="bg-white/50 rounded p-2">
          <p className="font-mono text-sm font-bold">% V/V = (Volume of solute / Volume of solution) × 100</p>
        </div>
      </div>
    </div>
  </div>
);

// Slide 10: Molality and Molarity
const Slide10MolalityMolarity = () => (
  <div className="space-y-4">
    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h3 className="font-bold text-lg text-topic-blue">📊 Molality (m)</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> Number of moles of solute per kilogram of solvent.
      </p>
      <p className="text-sm mt-1"><strong>Symbol:</strong> m</p>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          m = Moles of solute / Mass of solvent (kg)
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Unit: mol/kg or molal</p>
    </div>

    <div className="bg-topic-green/10 rounded-xl p-4 border border-topic-green/30">
      <h3 className="font-bold text-lg text-topic-green">📊 Molarity (M)</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> Number of moles of solute per litre of solution.
      </p>
      <p className="text-sm mt-1"><strong>Symbol:</strong> M</p>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          M = Moles of solute / Volume of solution (L)
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Unit: mol/L or M (molar)</p>
    </div>

    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h4 className="font-bold text-primary">🔄 Molarity of Mixture</h4>
      <p className="text-sm mt-2">For mixing two solutions of the same solute:</p>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          M = (M₁V₁ + M₂V₂) / (V₁ + V₂)
        </p>
      </div>
    </div>
  </div>
);

// Slide 11: Mole Fraction
const Slide11MoleFraction = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">📊 Mole Fraction (χ)</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> The ratio of moles of a component to the total moles of all components.
      </p>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          χₐ = nₐ / (nₐ + nᵦ)
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Note: χₐ + χᵦ = 1</p>
    </div>

    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h4 className="font-bold text-topic-blue">🔗 Mole Fraction ↔ Molality Relation</h4>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono font-bold text-center text-primary text-sm">
          m = (χ_solute × 1000) / (χ_solvent × M_solvent)
        </p>
      </div>
    </div>

    <div className="bg-topic-green/10 rounded-xl p-4 border border-topic-green/30">
      <h4 className="font-bold text-topic-green">🔗 Molarity ↔ Molality ↔ Density Relation</h4>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono font-bold text-center text-primary text-sm">
          M = (m × d × 1000) / (1000 + m × M_solute)
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Where d = density of solution in g/mL
      </p>
    </div>
  </div>
);

// Slide 12: Equivalent Weight
const Slide12EquivalentWeight = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">⚖️ Equivalent Weight</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> The mass of a substance that combines with or displaces 
        1 gram of hydrogen, 8 grams of oxygen, or 35.5 grams of chlorine.
      </p>
    </div>

    <div className="space-y-3">
      {equivalentFormulas.slice(0, 5).map((item, index) => (
        <div key={index} className="bg-card rounded-xl p-3 border border-border">
          <p className="font-bold text-sm">{item.term}</p>
          <p className="font-mono text-primary text-sm mt-1">{item.formula}</p>
        </div>
      ))}
    </div>
  </div>
);

// Slide 13: Normality
const Slide13Normality = () => (
  <div className="space-y-4">
    <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
      <h3 className="font-bold text-lg text-primary">📊 Normality (N)</h3>
      <p className="text-sm mt-2">
        <strong>Definition:</strong> Number of gram equivalents of solute per litre of solution.
      </p>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          N = Gram equivalents / Volume of solution (L)
        </p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Unit: N (normal) or eq/L</p>
    </div>

    <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
      <h4 className="font-bold text-topic-blue">🔗 Normality ↔ Molarity Relation</h4>
      <div className="bg-white/50 rounded p-3 mt-3">
        <p className="font-mono text-lg font-bold text-center text-primary">
          N = M × n-factor
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Where n-factor is:
      </p>
      <ul className="text-xs space-y-1 mt-2">
        <li>• For acids: Basicity (H⁺ ions released)</li>
        <li>• For bases: Acidity (OH⁻ ions released)</li>
        <li>• For salts: Total charge on cation/anion</li>
      </ul>
    </div>

    <div className="bg-secondary rounded-xl p-4 border border-border">
      <h4 className="font-bold mb-2">📝 Examples:</h4>
      <div className="space-y-2 text-sm">
        <p>• H₂SO₄: n-factor = 2 (gives 2 H⁺)</p>
        <p>• NaOH: n-factor = 1 (gives 1 OH⁻)</p>
        <p>• H₃PO₄: n-factor = 3 (gives 3 H⁺)</p>
        <p>• Ca(OH)₂: n-factor = 2 (gives 2 OH⁻)</p>
      </div>
    </div>
  </div>
);

export default LearnBasicConcepts;
