import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpeechControls } from '@/components/speech/SpeechControls';
import { useApp } from '@/contexts/AppContext';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { functionalGroups } from '@/data/organicChemistryData';
import { ArrowLeft, Volume2 } from 'lucide-react';

const OrganicFunctionalGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const speech = useTutorSpeech(selectedTutor);

  const group = useMemo(() => functionalGroups.find(g => g.id === groupId), [groupId]);

  const intro = group
    ? `Let's explore the ${group.name} functional group. Its general formula is ${group.formula}. ${group.identification}`
    : '';

  useEffect(() => {
    if (!group) return;
    const t = setTimeout(() => speech.speak(intro), 700);
    return () => {
      clearTimeout(t);
      speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  if (!group) {
    return (
      <AppLayout title="Not Found">
        <div className="p-10 text-center">
          <p className="text-muted-foreground">Functional group not found.</p>
          <Button onClick={() => navigate('/organic-chemistry')} className="mt-4">Back to Lab</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={group.name}>
      <div className="p-4 pb-16 max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br ${group.color} text-white shadow-2xl`}
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/20 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-widest opacity-90 font-bold">Functional Group</p>
            <h1 className="text-3xl md:text-5xl font-black mt-1">{group.name}</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white/20 backdrop-blur px-4 py-2">
                <p className="text-xs opacity-90">General Formula</p>
                <p className="font-mono font-bold">{group.formula}</p>
              </div>
              <div className="rounded-2xl bg-white/20 backdrop-blur px-4 py-2">
                <p className="text-xs opacity-90">Structure</p>
                <p className="font-mono font-bold">{group.structure}</p>
              </div>
              <div className="rounded-2xl bg-white/20 backdrop-blur px-4 py-2">
                <p className="text-xs opacity-90">Suffix / Prefix</p>
                <p className="font-mono font-bold">{group.suffix} / {group.prefix}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Narration */}
        {selectedTutor && (
          <div className="rounded-3xl bg-card/70 backdrop-blur-xl border border-primary/20 p-5 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-11 w-11 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0">
                {selectedTutor.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold flex items-center gap-2">
                  Prof. {selectedTutor.name}
                  <Volume2 className="h-3.5 w-3.5 text-primary animate-pulse" />
                </p>
                <p className="text-sm text-muted-foreground italic leading-relaxed mt-1">"{intro}"</p>
              </div>
            </div>
            <SpeechControls
              isSpeaking={speech.isSpeaking}
              isPaused={speech.isPaused}
              speedMultiplier={speech.speedMultiplier}
              progress={speech.progress}
              onPlay={() => speech.speak(intro)}
              onPause={speech.pause}
              onResume={speech.resume}
              onStop={speech.stop}
              onIncreaseSpeed={speech.increaseSpeed}
              onDecreaseSpeed={speech.decreaseSpeed}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Section title="🔍 Identification">{group.identification}</Section>
          <Section title="📝 Naming Rule">{group.namingRule}</Section>
          <Section title="🌡️ Physical Properties">
            <ul className="space-y-1 text-sm">
              {group.physicalProperties.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </Section>
          <Section title="⚗️ Chemical Properties">
            <ul className="space-y-1 text-sm">
              {group.chemicalProperties.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </Section>
          <Section title="🧪 Common Examples">
            <div className="space-y-2">
              {group.examples.map((e, i) => (
                <div key={i} className="flex justify-between rounded-lg bg-background/40 px-3 py-1.5">
                  <span className="font-semibold text-sm">{e.name}</span>
                  <span className="font-mono text-sm text-primary">{e.formula}</span>
                </div>
              ))}
            </div>
          </Section>
          <Section title="🌍 Applications">
            <div className="flex flex-wrap gap-2">
              {group.applications.map((a, i) => <Badge key={i} variant="secondary">{a}</Badge>)}
            </div>
          </Section>
        </div>
      </div>
    </AppLayout>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-card/60 backdrop-blur border border-border/50 p-5">
    <h3 className="font-bold mb-2">{title}</h3>
    <div className="text-sm md:text-base text-muted-foreground">{children}</div>
  </div>
);

export default OrganicFunctionalGroup;
