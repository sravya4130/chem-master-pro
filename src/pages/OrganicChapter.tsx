import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpeechControls } from '@/components/speech/SpeechControls';
import { useApp } from '@/contexts/AppContext';
import { useTutorSpeech } from '@/hooks/useTutorSpeech';
import { organicChapters, functionalGroups, organicReactions } from '@/data/organicChemistryData';
import { ArrowLeft, Volume2, ChevronRight } from 'lucide-react';

const OrganicChapter = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { selectedTutor } = useApp();
  const speech = useTutorSpeech(selectedTutor);

  const chapter = useMemo(() => organicChapters.find(c => c.id === chapterId), [chapterId]);

  useEffect(() => {
    if (!chapter) return;
    const t = setTimeout(() => speech.speak(chapter.intro), 800);
    return () => {
      clearTimeout(t);
      speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  if (!chapter) {
    return (
      <AppLayout title="Not Found">
        <div className="p-10 text-center">
          <p className="text-muted-foreground">Chapter not found.</p>
          <Button onClick={() => navigate('/organic-chemistry')} className="mt-4">Back to Lab</Button>
        </div>
      </AppLayout>
    );
  }

  const chapterGroups = chapter.functionalGroups
    ? functionalGroups.filter(g => chapter.functionalGroups!.includes(g.id))
    : [];
  const chapterReactions = chapter.reactions
    ? organicReactions.filter(r => chapter.reactions!.includes(r.id))
    : [];

  return (
    <AppLayout title={chapter.title}>
      <div className="p-4 pb-16 max-w-5xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate('/organic-chemistry')} className="gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" /> Organic Chemistry Lab
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br ${chapter.color} bg-opacity-20 border border-primary/30`}
        >
          <div className="absolute inset-0 backdrop-blur-3xl bg-background/40" />
          <div className="relative flex items-start gap-4">
            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${chapter.color} flex items-center justify-center text-3xl shadow-2xl shrink-0`}>
              {chapter.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black">{chapter.title}</h1>
              <p className="text-muted-foreground mt-1">{chapter.description}</p>
            </div>
          </div>
        </motion.div>

        {/* AI narration */}
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
                <p className="text-sm text-muted-foreground italic leading-relaxed mt-1">
                  "{chapter.intro}"
                </p>
              </div>
            </div>
            <SpeechControls
              isSpeaking={speech.isSpeaking}
              isPaused={speech.isPaused}
              speedMultiplier={speech.speedMultiplier}
              progress={speech.progress}
              onPlay={() => speech.speak(chapter.intro)}
              onPause={speech.pause}
              onResume={speech.resume}
              onStop={speech.stop}
              onIncreaseSpeed={speech.increaseSpeed}
              onDecreaseSpeed={speech.decreaseSpeed}
            />
          </div>
        )}

        {/* Key points */}
        <div className="rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">🎯 Key Points</h2>
          <ul className="space-y-2">
            {chapter.keyPoints.map((k, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-2 text-sm md:text-base"
              >
                <span className="text-primary shrink-0">▸</span>
                <span>{k}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Functional groups */}
        {chapterGroups.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">⚗️ Functional Groups Explorer</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {chapterGroups.map((g, i) => (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  onClick={() => navigate(`/organic-chemistry/functional-group/${g.id}`)}
                  className={`text-left rounded-2xl p-4 bg-gradient-to-br ${g.color} text-white shadow-lg hover:shadow-2xl transition`}
                >
                  <p className="text-xs opacity-80 font-semibold">{g.formula}</p>
                  <p className="font-bold text-lg">{g.name}</p>
                  <p className="text-xs opacity-90 mt-1 font-mono">{g.structure}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Reactions */}
        {chapterReactions.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">🔬 Reactions in this Chapter</h2>
            <div className="space-y-3">
              {chapterReactions.map((r, i) => (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => navigate(`/organic-chemistry/reaction/${r.id}`)}
                  className="w-full text-left rounded-2xl p-4 bg-card/70 backdrop-blur border border-border/50 hover:border-primary/50 flex items-center gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{r.reactionType}</Badge>
                      <p className="font-bold">{r.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate">{r.equation}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default OrganicChapter;
