import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { organicChapters, functionalGroups, organicReactions } from '@/data/organicChemistryData';
import { ArrowLeft, Search, Beaker, FlaskConical, Atom } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrganicChemistry = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const chapters = q
    ? organicChapters.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.keyPoints.some(k => k.toLowerCase().includes(q))
      )
    : organicChapters;

  const matchedGroups = q ? functionalGroups.filter(f => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q)) : [];
  const matchedReactions = q ? organicReactions.filter(r => r.name.toLowerCase().includes(q) || r.reagent.toLowerCase().includes(q)) : [];

  return (
    <AppLayout title="Organic Chemistry Lab">
      <div className="p-4 pb-16 max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 md:p-10 mb-6 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-pink-500/20 border border-primary/30 backdrop-blur-xl"
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-accent/30 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="rounded-full">🧪 JEE · NEET · KCET · CBSE · ICSE</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-primary via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Organic Chemistry Laboratory
            </h1>
            <p className="text-muted-foreground mt-3 md:text-lg max-w-2xl">
              Step inside an AI-powered virtual lab. Learn every reaction, watch mechanisms come alive, and hear a professor explain each step.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <Stat icon={<FlaskConical className="h-4 w-4" />} label={`${organicChapters.length} Chapters`} />
              <Stat icon={<Atom className="h-4 w-4" />} label={`${functionalGroups.length} Functional Groups`} />
              <Stat icon={<Beaker className="h-4 w-4" />} label={`${organicReactions.length}+ Reactions with Mechanism`} />
            </div>
          </div>
        </motion.div>

        {/* Back + Search */}
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/topics')} className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reaction, compound, functional group…"
              className="pl-9 rounded-full bg-card/60 backdrop-blur border-border/50"
            />
          </div>
        </div>

        {/* Search hits */}
        {q && (matchedGroups.length > 0 || matchedReactions.length > 0) && (
          <div className="mb-6 space-y-3">
            {matchedGroups.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Functional Groups</p>
                <div className="flex flex-wrap gap-2">
                  {matchedGroups.map(g => (
                    <button
                      key={g.id}
                      onClick={() => navigate(`/organic-chemistry/functional-groups#${g.id}`)}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${g.color} hover:scale-105 transition`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {matchedReactions.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Reactions</p>
                <div className="flex flex-wrap gap-2">
                  {matchedReactions.map(r => (
                    <button
                      key={r.id}
                      onClick={() => navigate(`/organic-chemistry/reaction/${r.id}`)}
                      className="px-3 py-1.5 rounded-full text-sm bg-secondary hover:bg-secondary/80 transition"
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chapter grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter, i) => (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => navigate(`/organic-chemistry/${chapter.id}`)}
              className="text-left rounded-3xl p-5 bg-card/70 backdrop-blur-xl border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all group relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${chapter.color} transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl bg-gradient-to-br ${chapter.color} shadow-lg mb-3`}>
                  {chapter.emoji}
                </div>
                <h3 className="font-bold text-lg leading-tight">{chapter.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{chapter.description}</p>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {chapter.functionalGroups && (
                    <Badge variant="outline" className="text-xs">{chapter.functionalGroups.length} groups</Badge>
                  )}
                  {chapter.reactions && (
                    <Badge variant="outline" className="text-xs">{chapter.reactions.length} reactions</Badge>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {q && chapters.length === 0 && matchedGroups.length === 0 && matchedReactions.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No matches for "{query}"</p>
        )}
      </div>
    </AppLayout>
  );
};

const Stat = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-background/50 backdrop-blur border border-border/50 text-xs font-semibold">
    {icon}{label}
  </div>
);

export default OrganicChemistry;
