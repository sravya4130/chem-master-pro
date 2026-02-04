import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';

interface QuantityRow {
  sn: number;
  quantity: string;
  formula: string;
  dimensional: string;
  siUnit: string;
}

interface SlideContent {
  title: string;
  type: 'table' | 'text';
  data?: QuantityRow[];
  textContent?: React.ReactNode;
}

const LearnDimensions = () => {
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

  // Slide 1: 7 Base Quantities
  const baseQuantities: QuantityRow[] = [
    { sn: 1, quantity: 'Length', formula: 'l, L', dimensional: '[L]', siUnit: 'metre (m)' },
    { sn: 2, quantity: 'Mass', formula: 'm, M', dimensional: '[M]', siUnit: 'kilogram (kg)' },
    { sn: 3, quantity: 'Time', formula: 't, T', dimensional: '[T]', siUnit: 'second (s)' },
    { sn: 4, quantity: 'Electric Current', formula: 'I', dimensional: '[A]', siUnit: 'ampere (A)' },
    { sn: 5, quantity: 'Temperature', formula: 'T, θ', dimensional: '[K]', siUnit: 'kelvin (K)' },
    { sn: 6, quantity: 'Amount of Substance', formula: 'n', dimensional: '[mol]', siUnit: 'mole (mol)' },
    { sn: 7, quantity: 'Luminous Intensity', formula: 'Iᵥ', dimensional: '[cd]', siUnit: 'candela (cd)' },
  ];

  // Slide 2: Derived Quantities - Set 1
  const derivedSet1: QuantityRow[] = [
    { sn: 1, quantity: 'Area', formula: 'A = l × b', dimensional: '[L²]', siUnit: 'm²' },
    { sn: 2, quantity: 'Volume', formula: 'V = l × b × h', dimensional: '[L³]', siUnit: 'm³' },
    { sn: 3, quantity: 'Density', formula: 'ρ = m/V', dimensional: '[ML⁻³]', siUnit: 'kg/m³' },
    { sn: 4, quantity: 'Speed/Velocity', formula: 'v = d/t', dimensional: '[LT⁻¹]', siUnit: 'm/s' },
    { sn: 5, quantity: 'Acceleration', formula: 'a = v/t', dimensional: '[LT⁻²]', siUnit: 'm/s²' },
    { sn: 6, quantity: 'Momentum', formula: 'p = mv', dimensional: '[MLT⁻¹]', siUnit: 'kg·m/s' },
    { sn: 7, quantity: 'Force', formula: 'F = ma', dimensional: '[MLT⁻²]', siUnit: 'N (newton)' },
  ];

  // Slide 3: Derived Quantities - Set 2
  const derivedSet2: QuantityRow[] = [
    { sn: 1, quantity: 'Work', formula: 'W = F × d', dimensional: '[ML²T⁻²]', siUnit: 'J (joule)' },
    { sn: 2, quantity: 'Energy', formula: 'E = W', dimensional: '[ML²T⁻²]', siUnit: 'J (joule)' },
    { sn: 3, quantity: 'Power', formula: 'P = W/t', dimensional: '[ML²T⁻³]', siUnit: 'W (watt)' },
    { sn: 4, quantity: 'Pressure', formula: 'P = F/A', dimensional: '[ML⁻¹T⁻²]', siUnit: 'Pa (pascal)' },
    { sn: 5, quantity: 'Moment of Torque', formula: 'τ = r × F', dimensional: '[ML²T⁻²]', siUnit: 'N·m' },
    { sn: 6, quantity: 'Gravitational Constant', formula: 'G', dimensional: '[M⁻¹L³T⁻²]', siUnit: 'N·m²/kg²' },
    { sn: 7, quantity: 'Impulse of Force', formula: 'J = F × t', dimensional: '[MLT⁻¹]', siUnit: 'N·s' },
    { sn: 8, quantity: 'Coefficient of Viscosity', formula: 'η', dimensional: '[ML⁻¹T⁻¹]', siUnit: 'Pa·s' },
    { sn: 9, quantity: 'Heat/Enthalpy', formula: 'Q, H', dimensional: '[ML²T⁻²]', siUnit: 'J (joule)' },
    { sn: 10, quantity: 'Specific Heat', formula: 'c = Q/(mΔT)', dimensional: '[L²T⁻²K⁻¹]', siUnit: 'J/(kg·K)' },
  ];

  // Slide 4: Derived Quantities - Set 3
  const derivedSet3: QuantityRow[] = [
    { sn: 1, quantity: 'Latent Heat', formula: 'L = Q/m', dimensional: '[L²T⁻²]', siUnit: 'J/kg' },
    { sn: 2, quantity: 'Universal Gas Constant', formula: 'R', dimensional: '[ML²T⁻²K⁻¹mol⁻¹]', siUnit: 'J/(mol·K)' },
    { sn: 3, quantity: 'Electric Charge', formula: 'Q = I × t', dimensional: '[AT]', siUnit: 'C (coulomb)' },
    { sn: 4, quantity: 'Electrical Potential', formula: 'V = W/Q', dimensional: '[ML²T⁻³A⁻¹]', siUnit: 'V (volt)' },
    { sn: 5, quantity: 'Resistance', formula: 'R = V/I', dimensional: '[ML²T⁻³A⁻²]', siUnit: 'Ω (ohm)' },
  ];

  // Slide 5: More Dimensional Formulas
  const derivedSet4: QuantityRow[] = [
    { sn: 1, quantity: "Planck's Constant", formula: 'h = E/ν', dimensional: '[ML²T⁻¹]', siUnit: 'J·s' },
    { sn: 2, quantity: 'Ideal Gas Constant', formula: 'R', dimensional: '[ML²T⁻²K⁻¹mol⁻¹]', siUnit: 'J/(mol·K)' },
    { sn: 3, quantity: 'Modulus of Elasticity', formula: 'E = Stress/Strain', dimensional: '[ML⁻¹T⁻²]', siUnit: 'Pa' },
    { sn: 4, quantity: 'Frequency', formula: 'ν = 1/T', dimensional: '[T⁻¹]', siUnit: 'Hz (hertz)' },
    { sn: 5, quantity: "Boltzmann's Constant", formula: 'k = R/Nₐ', dimensional: '[ML²T⁻²K⁻¹]', siUnit: 'J/K' },
    { sn: 6, quantity: "Wien's Constant", formula: 'b', dimensional: '[LK]', siUnit: 'm·K' },
    { sn: 7, quantity: "Stefan's Constant", formula: 'σ', dimensional: '[MT⁻³K⁻⁴]', siUnit: 'W/(m²·K⁴)' },
    { sn: 8, quantity: 'Magnetic Field', formula: 'B', dimensional: '[MT⁻²A⁻¹]', siUnit: 'T (tesla)' },
    { sn: 9, quantity: 'Magnetic Flux', formula: 'Φ = B × A', dimensional: '[ML²T⁻²A⁻¹]', siUnit: 'Wb (weber)' },
    { sn: 10, quantity: 'Surface Tension', formula: 'γ = F/L', dimensional: '[MT⁻²]', siUnit: 'N/m' },
  ];

  // Slide 6: Accuracy, Precision, Systematic Errors
  const accuracyContent = (
    <div className="space-y-6">
      <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
        <h3 className="font-bold text-lg text-primary mb-2">📌 Accuracy</h3>
        <p className="text-sm">
          <strong>Definition:</strong> Accuracy refers to how close a measured value is to the <em>true</em> or <em>accepted</em> value. 
          A measurement is considered accurate if it agrees closely with the actual value of the quantity being measured.
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          <em>Example:</em> If the true length of a rod is 10.0 cm, and you measure 10.1 cm, your measurement is fairly accurate.
        </p>
      </div>

      <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
        <h3 className="font-bold text-lg text-topic-blue mb-2">📌 Precision</h3>
        <p className="text-sm">
          <strong>Definition:</strong> Precision refers to how close multiple measurements are to <em>each other</em>. 
          It indicates the reproducibility or repeatability of a measurement.
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          <em>Example:</em> If you measure a rod 5 times and get 9.8, 9.8, 9.7, 9.8, 9.8 cm — your measurements are precise (consistent), 
          but may not be accurate if true value is 10.0 cm.
        </p>
      </div>

      <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/30">
        <h3 className="font-bold text-lg text-destructive mb-2">⚠️ Systematic Errors</h3>
        <p className="text-sm mb-3">
          <strong>Definition:</strong> Errors that consistently occur in the same direction (always too high or too low). 
          They arise from faulty instruments, incorrect procedures, or environmental conditions.
        </p>
        <div className="space-y-2 text-sm">
          <p><strong>Types of Systematic Errors:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Instrumental Errors:</strong> Due to faulty calibration or defects in measuring instruments (e.g., zero error in a screw gauge)</li>
            <li><strong>Personal Errors:</strong> Due to observer's bias, parallax, or carelessness in reading instruments</li>
            <li><strong>Environmental Errors:</strong> Due to external conditions like temperature, humidity, or pressure affecting the measurement</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Slide 7: Significant Figures
  const significantFiguresContent = (
    <div className="space-y-4">
      <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
        <h3 className="font-bold text-lg text-primary mb-2">📐 Significant Figures - Definition</h3>
        <p className="text-sm">
          Significant figures are the digits in a measurement that carry meaningful information about its precision. 
          They include all certain digits plus one uncertain (estimated) digit.
        </p>
      </div>

      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="font-bold mb-3">📋 Rules for Counting Significant Figures:</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><strong>All non-zero digits are significant.</strong></li>
          <li><strong>Zeros between non-zero digits are significant.</strong></li>
          <li><strong>Leading zeros (before non-zero digits) are NOT significant.</strong></li>
          <li><strong>Trailing zeros after decimal point ARE significant.</strong></li>
          <li><strong>Trailing zeros in whole numbers without decimal are ambiguous.</strong></li>
        </ol>
      </div>

      <div className="bg-topic-blue/10 rounded-xl p-4 border border-topic-blue/30">
        <h4 className="font-bold text-topic-blue mb-3">✅ 10 Examples:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>1. <code>123</code> → 3 SF</div>
          <div>2. <code>1007</code> → 4 SF</div>
          <div>3. <code>0.0025</code> → 2 SF</div>
          <div>4. <code>2.50</code> → 3 SF</div>
          <div>5. <code>1200</code> → 2, 3, or 4 SF*</div>
          <div>6. <code>5.00</code> → 3 SF</div>
          <div>7. <code>0.00340</code> → 3 SF</div>
          <div>8. <code>8.020</code> → 4 SF</div>
          <div>9. <code>90100</code> → 3, 4, or 5 SF*</div>
          <div>10. <code>7.0 × 10³</code> → 2 SF</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">*Ambiguous cases - use scientific notation for clarity</p>
      </div>

      <div className="bg-success/10 rounded-xl p-4 border border-success/30">
        <h4 className="font-bold text-success mb-3">➕➖ Addition & Subtraction Rules:</h4>
        <p className="text-sm mb-2">Result should have the same number of <strong>decimal places</strong> as the measurement with fewest decimal places.</p>
        <div className="space-y-1 text-sm font-mono bg-background/50 p-2 rounded">
          <div>1. 12.11 + 18.0 + 1.012 = 31.122 → <strong>31.1</strong></div>
          <div>2. 7.21 - 3.1 = 4.11 → <strong>4.1</strong></div>
          <div>3. 5.00 + 2.3 = 7.30 → <strong>7.3</strong></div>
          <div>4. 100.2 - 50.15 = 50.05 → <strong>50.1</strong></div>
          <div>5. 0.123 + 0.4 = 0.523 → <strong>0.5</strong></div>
        </div>
      </div>

      <div className="bg-warning/10 rounded-xl p-4 border border-warning/30">
        <h4 className="font-bold text-warning mb-3">✖️➗ Multiplication & Division Rules:</h4>
        <p className="text-sm mb-2">Result should have the same number of <strong>significant figures</strong> as the measurement with fewest SFs.</p>
        <div className="space-y-1 text-sm font-mono bg-background/50 p-2 rounded">
          <div>1. 4.5 × 2.15 = 9.675 → <strong>9.7</strong> (2 SF)</div>
          <div>2. 3.0 × 12.60 = 37.8 → <strong>38</strong> (2 SF)</div>
          <div>3. 15.0 / 3.00 = 5.00 → <strong>5.00</strong> (3 SF)</div>
          <div>4. 8.321 × 0.1 = 0.8321 → <strong>0.8</strong> (1 SF)</div>
          <div>5. 25.5 / 5.0 = 5.1 → <strong>5.1</strong> (2 SF)</div>
        </div>
      </div>

      <div className="bg-secondary rounded-xl p-4 border border-border">
        <h4 className="font-bold mb-3">🔄 Rounding Off Uncertain Digits:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>If the digit to be dropped is <strong>&lt; 5</strong>, drop it (round down)</li>
          <li>If the digit to be dropped is <strong>&gt; 5</strong>, increase the preceding digit by 1 (round up)</li>
          <li>If the digit to be dropped is <strong>= 5</strong>:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>If preceding digit is even, drop the 5</li>
              <li>If preceding digit is odd, round up</li>
            </ul>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2">This is called "round half to even" or "banker's rounding"</p>
      </div>
    </div>
  );

  const slides: SlideContent[] = [
    { title: '7 Base Quantities', type: 'table', data: baseQuantities },
    { title: 'Derived Quantities - Set 1', type: 'table', data: derivedSet1 },
    { title: 'Derived Quantities - Set 2', type: 'table', data: derivedSet2 },
    { title: 'Derived Quantities - Set 3', type: 'table', data: derivedSet3 },
    { title: 'More Dimensional Formulas', type: 'table', data: derivedSet4 },
    { title: 'Accuracy, Precision & Errors', type: 'text', textContent: accuracyContent },
    { title: 'Significant Figures', type: 'text', textContent: significantFiguresContent },
  ];

  const currentSlideData = slides[currentSlide];

  useEffect(() => () => stop(), [stop]);
  useEffect(() => stop(), [currentSlide, stop]);

  const getSpeechText = () => {
    if (currentSlideData.type === 'table' && currentSlideData.data) {
      return currentSlideData.data
        .map(r => `${r.quantity}, formula ${r.formula}, dimensional formula ${r.dimensional}, SI unit ${r.siUnit}`)
        .join('. ');
    }
    return `${currentSlideData.title}. Please read the content on screen.`;
  };

  if (mode === 'intro') {
    return (
      <AppLayout title="Units & Dimensions">
        <div className="p-4 pb-8 space-y-4">
          <div className="bg-yellow-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold">Units & Dimensions</h2>
            <p className="opacity-80">Master dimensional analysis</p>
          </div>

          <Button
            onClick={() => setMode('learn')}
            className="w-full h-auto p-6 justify-start gap-4 bg-yellow-500"
          >
            <BookOpen className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Learn First</p>
              <p className="text-sm opacity-80">Study step by step</p>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/game/physics/units-dimensions')}
            variant="outline"
            className="w-full h-auto p-6 justify-start gap-4"
          >
            <Gamepad2 className="h-8 w-8" />
            <div className="text-left">
              <p className="font-bold text-lg">Jump to Game</p>
              <p className="text-sm text-muted-foreground">Test knowledge</p>
            </div>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={currentSlideData.title}>
      <div className="p-4 pb-32 space-y-6">

        {/* Progress */}
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i <= currentSlide ? 'bg-yellow-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {slides.length}
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
        {currentSlideData.type === 'table' && currentSlideData.data && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left font-bold border border-border rounded-tl-xl">S.No</th>
                  <th className="p-3 text-left font-bold border border-border">Quantity</th>
                  <th className="p-3 text-center font-bold border border-border">Formula</th>
                  <th className="p-3 text-center font-bold border border-border">Dimensional Formula</th>
                  <th className="p-3 text-center font-bold border border-border rounded-tr-xl">SI Unit</th>
                </tr>
              </thead>
              <tbody>
                {currentSlideData.data.map((row) => (
                  <tr key={row.sn} className="bg-card">
                    <td className="p-3 border border-border font-semibold">{row.sn}</td>
                    <td className="p-3 border border-border">{row.quantity}</td>
                    <td className="p-3 border border-border text-center font-mono">{row.formula}</td>
                    <td className="p-3 border border-border text-center font-mono text-primary">{row.dimensional}</td>
                    <td className="p-3 border border-border text-center">{row.siUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentSlideData.type === 'text' && currentSlideData.textContent && (
          <div className="animate-fade-in">
            {currentSlideData.textContent}
          </div>
        )}

      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              currentSlide > 0
                ? setCurrentSlide(currentSlide - 1)
                : setMode('intro')
            }
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            className="flex-1"
            onClick={() =>
              currentSlide < slides.length - 1
                ? setCurrentSlide(currentSlide + 1)
                : navigate('/game/physics/units-dimensions')
            }
          >
            {currentSlide < slides.length - 1
              ? 'Next'
              : 'Start Game'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LearnDimensions;