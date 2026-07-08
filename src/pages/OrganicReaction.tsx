import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactionMechanism } from '@/components/organic/ReactionMechanism';
import { useApp } from '@/contexts/AppContext';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { organicReactions } from '@/data/organicChemistryData';
import { ArrowLeft, FlaskConical, Beaker, Factory, GraduationCap, AlertTriangle, Sparkles } from 'lucide-react';

const OrganicReaction = () => {
  const { reactionId } = useParams();
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const speech = useTutorSpeech(selectedTutor);

  const reaction = useMemo(() => organicReactions.find(r => r.id === reactionId), [reactionId]);

  useEffect(() => {
    if (!reaction) return;
    const intro = `Welcome. Let's study ${reaction.name}. This is a ${reaction.reactionType} reaction. The key reagent is ${reaction.reagent}.`;
    const t = setTimeout(() => speech.speak(intro), 700);
    return () => {
      clearTimeout(t);
      speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactionId]);

  if (!reaction) {
    return (
      <AppLayout title="Not Found">
        <div className="p-10 text-center">
          <p className="text-muted-foreground">Reaction not found.</p>
          <Button onClick={() => navigate('/organic-chemistry')} className="mt-4">Back to Lab</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={reaction.name}>
      <div className="p-4 pb-16 max-w-5xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20 border border-primary/30 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="secondary">{reaction.category}</Badge>
            <Badge className="bg-primary text-primary-foreground">{reaction.reactionType}</Badge>
          </div>
          <h1 className="text-2xl md:text-4xl font-black">{reaction.name}</h1>

          {/* Balanced equation, boxed */}
          <div className="mt-5 rounded-2xl bg-background/60 border-2 border-primary/40 p-5 shadow-inner">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">⚖️ Balanced Equation</p>
            <pre className="font-mono text-sm md:text-base whitespace-pre-wrap text-center leading-relaxed">
              {reaction.equation}
            </pre>
          </div>
        </motion.div>

        {/* Mechanism */}
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Animated Mechanism
          </h2>
          <ReactionMechanism
            steps={reaction.mechanism}
            onNarrate={(t) => speech.speak(t)}
            onStop={() => speech.stop()}
          />
        </div>

        {/* Details Tabs */}
        <Tabs defaultValue="conditions" className="mb-6">
          <TabsList className="grid grid-cols-4 rounded-2xl bg-card/60 backdrop-blur border border-border/50 p-1">
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="exam">Exam Tips</TabsTrigger>
            <TabsTrigger value="uses">Uses</TabsTrigger>
          </TabsList>

          <TabsContent value="conditions" className="mt-4 space-y-3">
            <Info icon={<Beaker className="h-4 w-4" />} label="Reagent" value={reaction.reagent} />
            <Info icon={<FlaskConical className="h-4 w-4" />} label="Catalyst" value={reaction.catalyst} />
            <Info icon={<FlaskConical className="h-4 w-4" />} label="Conditions" value={reaction.conditions} />
            <Info icon={<FlaskConical className="h-4 w-4" />} label="Temperature" value={reaction.temperature} />
            <Info icon={<Sparkles className="h-4 w-4" />} label="Products" value={reaction.products} />
            <Info icon={<Sparkles className="h-4 w-4" />} label="By-products" value={reaction.byProducts} />
            <Info icon={<Sparkles className="h-4 w-4" />} label="Yield" value={reaction.yield} />
          </TabsContent>

          <TabsContent value="notes" className="mt-4 space-y-3">
            <Callout label="Important Notes" tone="info">{reaction.notes}</Callout>
            <Callout label="Exceptions" tone="warn">{reaction.exceptions}</Callout>
            <Callout label="Common Mistakes" tone="danger">{reaction.commonMistakes}</Callout>
          </TabsContent>

          <TabsContent value="exam" className="mt-4 space-y-3">
            <Callout label="🎯 Exam Tricks" tone="info">{reaction.examTips}</Callout>
            <Callout label="JEE Tips" tone="info">{reaction.jeeTips}</Callout>
            <Callout label="NEET Tips" tone="info">{reaction.neetTips}</Callout>
          </TabsContent>

          <TabsContent value="uses" className="mt-4 space-y-3">
            <Info icon={<Sparkles className="h-4 w-4" />} label="Applications" value={reaction.applications} />
            <Info icon={<Factory className="h-4 w-4" />} label="Industrial Method" value={reaction.industrialMethod} />
            <Info icon={<GraduationCap className="h-4 w-4" />} label="Laboratory Method" value={reaction.labMethod} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const Info = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-2xl bg-card/60 backdrop-blur border border-border/50 p-4">
    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5 mb-1">
      {icon} {label}
    </p>
    <p className="text-sm md:text-base">{value}</p>
  </div>
);

const Callout = ({ label, tone, children }: { label: string; tone: 'info' | 'warn' | 'danger'; children: React.ReactNode }) => {
  const toneClass = {
    info: 'from-primary/10 to-primary/5 border-primary/30',
    warn: 'from-warning/10 to-warning/5 border-warning/30',
    danger: 'from-destructive/10 to-destructive/5 border-destructive/30',
  }[tone];
  const Icon = tone === 'info' ? Sparkles : AlertTriangle;
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${toneClass} border p-4`}>
      <p className="text-xs uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
        <Icon className="h-4 w-4" /> {label}
      </p>
      <p className="text-sm md:text-base">{children}</p>
    </div>
  );
};

export default OrganicReaction;
