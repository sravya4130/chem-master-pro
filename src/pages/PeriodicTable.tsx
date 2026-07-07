import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { elements, categoryColors, getGridPosition, ElementCategory } from '@/data/elementsData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const categories: ElementCategory[] = [
  'alkali-metal','alkaline-earth-metal','transition-metal','post-transition-metal',
  'metalloid','nonmetal','halogen','noble-gas','lanthanide','actinide','unknown'
];

const PeriodicTable = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ElementCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      elements
        .filter(e => activeCategory === 'all' || e.category === activeCategory)
        .filter(e => !q || e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q) || String(e.number) === q)
        .map(e => e.number)
    );
  }, [query, activeCategory]);

  return (
    <AppLayout title="Interactive Periodic Table">
      <div className="p-4 pb-16 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-primary via-topic-cyan to-topic-purple bg-clip-text text-transparent mb-2">
            Interactive Periodic Table
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Tap any element to explore its full story — narrated by your AI tutor.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, symbol or atomic number..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-secondary'
              }`}
            >
              All Elements
            </button>
            {categories.map(cat => {
              const c = categoryColors[cat];
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                  style={{
                    background: active ? c.border : c.bg,
                    borderColor: c.border,
                    color: active ? 'white' : undefined,
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Grid */}
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-1.5 min-w-[900px]"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(52px, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(60px, auto))',
            }}
          >
            {/* Placeholder label cells for lanthanide/actinide rows */}
            <div style={{ gridRow: 6, gridColumn: 3 }} className="flex items-center justify-center text-[10px] text-muted-foreground border border-dashed border-border/40 rounded">57-71</div>
            <div style={{ gridRow: 7, gridColumn: 3 }} className="flex items-center justify-center text-[10px] text-muted-foreground border border-dashed border-border/40 rounded">89-103</div>

            {elements.map((el, i) => {
              const { row, col } = getGridPosition(el);
              const c = categoryColors[el.category];
              const dim = filtered.size > 0 && !filtered.has(el.number);
              return (
                <button
                  key={el.number}
                  onClick={() => navigate(`/periodic-table/${el.number}`)}
                  style={{
                    gridRow: row,
                    gridColumn: col,
                    background: c.bg,
                    borderColor: c.border,
                    animationDelay: `${Math.min(i * 8, 800)}ms`,
                    boxShadow: dim ? undefined : `0 4px 20px -8px ${c.glow}`,
                  }}
                  className={`
                    relative group animate-bounce-in rounded-lg border backdrop-blur-md
                    p-1 text-left transition-all duration-200
                    hover:scale-110 hover:z-20 hover:-translate-y-1
                    ${dim ? 'opacity-15 saturate-0' : 'opacity-100'}
                  `}
                >
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `0 0 24px ${c.glow}, inset 0 0 12px ${c.glow}` }}
                  />
                  <div className="text-[8px] leading-none opacity-80 font-semibold">{el.number}</div>
                  <div className="text-lg md:text-xl font-black leading-none mt-0.5" style={{ color: c.border }}>{el.symbol}</div>
                  <div className="text-[7px] leading-tight mt-0.5 truncate opacity-90 font-medium">{el.name}</div>
                  <div className="text-[7px] leading-none opacity-70 mt-0.5">{el.mass}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 glass-card rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wide">Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {categories.map(cat => {
              const c = categoryColors[cat];
              return (
                <div key={cat} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-4 h-4 rounded"
                    style={{ background: c.bg, border: `1.5px solid ${c.border}` }}
                  />
                  <span>{c.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PeriodicTable;
