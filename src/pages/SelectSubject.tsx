import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { FlaskConical, ChevronRight, ArrowLeft } from 'lucide-react';

const SelectSubject = () => {
  const navigate = useNavigate();
  const { setSelectedSubject } = useApp();

  const handleSelectChemistry = () => {
    setSelectedSubject('chemistry');
    navigate('/select-tutor');
  };

  return (
    <AppLayout showHeader={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="gradient-hero px-6 py-8 text-primary-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Choose Subject</h1>
          <p className="opacity-80 mt-2">Select what you want to learn</p>
        </div>

        {/* Subjects */}
        <div className="p-6 space-y-4 -mt-4">
          {/* Chemistry - Active */}
          <button
            onClick={handleSelectChemistry}
            className="w-full bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:scale-[1.02] border-2 border-transparent hover:border-primary text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">Chemistry</h3>
                <p className="text-muted-foreground">Organic, Inorganic & Physical</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-topic-blue/20 text-topic-blue px-2 py-1 rounded-full">Hybridisation</span>
                  <span className="text-xs bg-topic-green/20 text-topic-green px-2 py-1 rounded-full">Bonds</span>
                  <span className="text-xs bg-topic-pink/20 text-topic-pink px-2 py-1 rounded-full">IUPAC</span>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
          </button>

          {/* Coming Soon Subjects */}
          <div className="opacity-50">
            <div className="w-full bg-muted rounded-2xl p-6 border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted-foreground/20 flex items-center justify-center">
                  <span className="text-3xl">📐</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">Mathematics</h3>
                    <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-accent-foreground">Coming Soon</span>
                  </div>
                  <p className="text-muted-foreground">Calculus, Algebra & Geometry</p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-50">
            <div className="w-full bg-muted rounded-2xl p-6 border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted-foreground/20 flex items-center justify-center">
                  <span className="text-3xl">⚛️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">Physics</h3>
                    <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-accent-foreground">Coming Soon</span>
                  </div>
                  <p className="text-muted-foreground">Mechanics, Waves & Modern Physics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SelectSubject;
