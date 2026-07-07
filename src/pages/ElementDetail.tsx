import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { getElement, categoryColors } from '@/data/elementsData';
import { useApp } from '@/contexts/AppContext';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { SpeechControls } from '@/components/speech/SpeechControls';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Beaker, Atom as AtomIcon, FlaskConical, Info, Zap, Leaf, Shield, Lightbulb } from 'lucide-react';

const InfoCard = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className="glass-card rounded-xl p-3">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
    <p className="text-base font-bold mt-1">{value ?? '—'}</p>
  </div>
);

const Section = ({ icon: Icon, title, children, color }: { icon: any; title: string; children: React.ReactNode; color: string }) => (
  <section className="glass-card rounded-2xl p-5 animate-slide-up">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-2 rounded-lg" style={{ background: `${color}22`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="font-bold text-lg">{title}</h2>
    </div>
    <div className="text-sm text-foreground/90 space-y-2 leading-relaxed">{children}</div>
  </section>
);

// Simple animated atom (Bohr-style) using CSS orbits
const BohrAtom = ({ shells, color }: { shells: number[]; color: string }) => {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
      {/* nucleus */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-glow"
        style={{ width: 40, height: 40, background: `radial-gradient(circle, ${color}, ${color}88)`, boxShadow: `0 0 30px ${color}` }}
      />
      {shells.map((count, i) => {
        const size = 70 + i * 34;
        const duration = 6 + i * 2;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border"
            style={{
              width: size * 2,
              height: size * 2,
              marginLeft: -size,
              marginTop: -size,
              borderColor: `${color}55`,
              animation: `spin ${duration}s linear infinite`,
            }}
          >
            {Array.from({ length: Math.min(count, 12) }).map((_, j) => {
              const angle = (360 / Math.min(count, 12)) * j;
              return (
                <div
                  key={j}
                  className="absolute rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translate(${size}px) rotate(-${angle}deg) translate(-50%, -50%)`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const ElementDetail = () => {
  const { elementId } = useParams();
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const el = useMemo(() => getElement(elementId || ''), [elementId]);
  const speech = useTutorSpeech(selectedTutor);
  const [autoPlayed, setAutoPlayed] = useState(false);

  useEffect(() => () => speech.stop(), []); // stop on unmount

  const script = useMemo(() => {
    if (!el) return '';
    return `Hello! I am ${el.name}, symbol ${el.symbol}. My atomic number is ${el.number} and my atomic mass is ${el.mass}. ` +
      `I am a ${categoryColors[el.category].label} in ${el.group ? 'group ' + el.group + ', ' : ''}period ${el.period} of the periodic table, belonging to the ${el.block}-block. ` +
      `My electron configuration is ${el.config.replace(/(\d)([spdf])/g, '$1 $2')}. I have ${el.valence} electrons in my outermost shell. ` +
      `${el.summary} ` +
      `In terms of physical properties, I typically exist as a ${el.state}${el.meltingPoint ? ' with a melting point of ' + el.meltingPoint + ' kelvin' : ''}${el.boilingPoint ? ' and a boiling point of ' + el.boilingPoint + ' kelvin' : ''}. ` +
      `${el.origin} ` +
      `Some of my most important uses include: ${el.uses.slice(0,3).join(', ')}. ` +
      `${el.biological} ` +
      `Here is one fascinating fact about me: ${el.facts[0]}`;
  }, [el]);

  useEffect(() => {
    if (el && script && !autoPlayed && speech.isSupported && selectedTutor) {
      setAutoPlayed(true);
      const t = setTimeout(() => speech.speak(script), 600);
      return () => clearTimeout(t);
    }
  }, [el, script, autoPlayed, speech.isSupported, selectedTutor]);

  if (!el) {
    return (
      <AppLayout title="Element Not Found">
        <div className="p-6 text-center">
          <p className="text-muted-foreground mb-4">This element does not exist.</p>
          <Button onClick={() => navigate('/periodic-table')}>Back to Periodic Table</Button>
        </div>
      </AppLayout>
    );
  }

  const c = categoryColors[el.category];

  return (
    <AppLayout title={`${el.name} (${el.symbol})`}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{ background: `radial-gradient(ellipse at top, ${c.glow}33, transparent 60%)` }}
      />

      <div className="p-4 pb-16 max-w-6xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate('/periodic-table')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Periodic Table
        </button>

        {/* Hero */}
        <div
          className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden"
          style={{ borderColor: c.border, boxShadow: `0 20px 60px -20px ${c.glow}` }}
        >
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{ background: c.glow }}
          />
          <div className="relative grid md:grid-cols-[auto,1fr] gap-8 items-center">
            <div className="text-center">
              <div className="text-xs font-semibold opacity-70">#{el.number}</div>
              <div
                className="text-8xl md:text-9xl font-black leading-none animate-bounce-in"
                style={{ color: c.border, textShadow: `0 0 40px ${c.glow}88` }}
              >
                {el.symbol}
              </div>
              <div className="text-sm mt-2 opacity-80">{el.mass}</div>
              <div
                className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.border }}
              >
                {c.label}
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-3">{el.name}</h1>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">{el.summary}</p>
            </div>
          </div>
        </div>

        {/* Tutor + Voice */}
        {selectedTutor && (
          <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                {selectedTutor.emoji}
              </div>
              <div>
                <p className="font-semibold text-sm">{selectedTutor.name}</p>
                <p className="text-xs text-muted-foreground">Your AI voice tutor</p>
              </div>
            </div>
            <div className="md:ml-auto w-full md:w-auto">
              <SpeechControls
                isSpeaking={speech.isSpeaking}
                isPaused={speech.isPaused}
                speedMultiplier={speech.speedMultiplier}
                progress={speech.progress}
                onPlay={() => speech.speak(script)}
                onPause={speech.pause}
                onResume={speech.resume}
                onStop={speech.stop}
                onIncreaseSpeed={speech.increaseSpeed}
                onDecreaseSpeed={speech.decreaseSpeed}
              />
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <InfoCard label="Group" value={el.group ?? '—'} />
          <InfoCard label="Period" value={el.period} />
          <InfoCard label="Block" value={el.block.toUpperCase()} />
          <InfoCard label="State" value={el.state} />
          <InfoCard label="Density" value={el.density ? `${el.density} g/cm³` : '—'} />
          <InfoCard label="Radius" value={el.atomicRadius ? `${el.atomicRadius} pm` : '—'} />
          <InfoCard label="Melting Pt" value={el.meltingPoint ? `${el.meltingPoint} K` : '—'} />
          <InfoCard label="Boiling Pt" value={el.boilingPoint ? `${el.boilingPoint} K` : '—'} />
          <InfoCard label="Electronegativity" value={el.electronegativity ?? '—'} />
          <InfoCard label="Valence e⁻" value={el.valence} />
          <InfoCard label="Oxidation" value={el.oxidationStates} />
          <InfoCard label="Color" value={el.color} />
        </div>

        {/* Atom + Config */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AtomIcon className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg">Atomic Structure</h2>
            </div>
            <BohrAtom shells={el.shells} color={c.border} />
            <p className="text-center text-xs text-muted-foreground mt-3">
              Shell distribution: {el.shells.join(' · ')}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg">Electronic Structure</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Configuration</p>
                <p className="text-lg font-mono mt-1 font-bold" style={{ color: c.border }}>{el.config}</p>
              </div>
              <div className="space-y-2">
                {el.shells.map((count, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-semibold w-16">Shell {i + 1}</span>
                    <div className="flex-1 h-6 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full transition-all animate-slide-up flex items-center justify-end px-2 text-[10px] font-bold"
                        style={{
                          width: `${Math.min((count / 32) * 100, 100)}%`,
                          background: `linear-gradient(90deg, ${c.border}, ${c.glow})`,
                          animationDelay: `${i * 100}ms`,
                        }}
                      >
                        {count} e⁻
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                <strong className="text-foreground">Oxidation states:</strong> {el.oxidationStates} · <strong className="text-foreground">Valency:</strong> {el.valence <= 4 ? el.valence : 8 - el.valence}
              </div>
            </div>
          </div>
        </div>

        {/* Discovery + Origin */}
        <div className="grid md:grid-cols-2 gap-6">
          <Section icon={Info} title="Discovery" color={c.border}>
            <p><strong>Discovered by:</strong> {el.discoveredBy}</p>
            <p><strong>Year:</strong> {el.discoveryYear}</p>
          </Section>
          <Section icon={FlaskConical} title="Origin & Occurrence" color={c.border}>
            <p>{el.origin}</p>
          </Section>
        </div>

        {/* Physical + Chemical */}
        <div className="grid md:grid-cols-2 gap-6">
          <Section icon={Beaker} title="Physical Properties" color={c.border}>
            <ul className="space-y-1">
              <li>State: <strong>{el.state}</strong></li>
              <li>Color: <strong>{el.color}</strong></li>
              {el.density && <li>Density: <strong>{el.density} g/cm³</strong></li>}
              {el.meltingPoint && <li>Melting point: <strong>{el.meltingPoint} K</strong></li>}
              {el.boilingPoint && <li>Boiling point: <strong>{el.boilingPoint} K</strong></li>}
              {el.atomicRadius && <li>Atomic radius: <strong>{el.atomicRadius} pm</strong></li>}
            </ul>
          </Section>
          <Section icon={Zap} title="Chemical Properties" color={c.border}>
            <p><strong>Electronegativity:</strong> {el.electronegativity ?? 'Not applicable'}</p>
            <p><strong>Oxidation states:</strong> {el.oxidationStates}</p>
            <p><strong>Valence electrons:</strong> {el.valence}</p>
            <p><strong>Category behaviour:</strong> Typical of {categoryColors[el.category].label.toLowerCase()}s.</p>
          </Section>
        </div>

        {/* Uses */}
        <Section icon={Lightbulb} title="Uses & Applications" color={c.border}>
          <ul className="grid sm:grid-cols-2 gap-2">
            {el.uses.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.border }} />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Biological */}
        <Section icon={Leaf} title="Biological Importance" color={c.border}>
          <p>{el.biological}</p>
        </Section>

        {/* Safety */}
        <Section icon={Shield} title="Safety" color={c.border}>
          <p>
            {el.category === 'actinide' || el.category === 'unknown'
              ? 'Radioactive — must be handled with lead shielding, gloves, and remote manipulators. Not for classroom handling.'
              : el.category === 'alkali-metal'
              ? 'Highly reactive with water and air. Store under mineral oil. Wear gloves and eye protection.'
              : el.category === 'halogen'
              ? 'Corrosive and toxic. Use in a fume hood with appropriate PPE.'
              : el.category === 'noble-gas'
              ? 'Chemically inert and generally safe, but can cause asphyxiation in enclosed spaces.'
              : 'Follow standard laboratory safety practices — gloves, goggles, and proper ventilation.'}
          </p>
        </Section>

        {/* Facts */}
        <Section icon={Sparkles} title="Interesting Facts" color={c.border}>
          <ul className="space-y-2">
            {el.facts.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 mt-1 flex-shrink-0" style={{ color: c.border }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Nav */}
        <div className="flex justify-between gap-3 pt-2">
          <Button
            variant="outline"
            disabled={el.number <= 1}
            onClick={() => navigate(`/periodic-table/${el.number - 1}`)}
          >
            ← Previous
          </Button>
          <Button
            variant="outline"
            disabled={el.number >= 118}
            onClick={() => navigate(`/periodic-table/${el.number + 1}`)}
          >
            Next →
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ElementDetail;
