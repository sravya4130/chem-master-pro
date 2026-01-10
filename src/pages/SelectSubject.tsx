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

  const handleSelectMaths = () => {
    setSelectedSubject('maths');
    navigate('/select-tutor');
  };

  const handleSelectPhysics = () => {
    setSelectedSubject('physics');
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

          {/* Mathematics - Active */}
          <button
            onClick={handleSelectMaths}
            className="w-full bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:scale-[1.02] border-2 border-transparent hover:border-purple-500 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-purple-500 flex items-center justify-center">
                <span className="text-3xl">📐</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">Mathematics</h3>
                <p className="text-muted-foreground">Sets, Relations & Trigonometry</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Sets</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">Relations</span>
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">Trigonometry</span>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-purple-500" />
            </div>
          </button>

          {/* Physics - Active */}
          <button
            onClick={handleSelectPhysics}
            className="w-full bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:scale-[1.02] border-2 border-transparent hover:border-orange-500 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center">
                <span className="text-3xl">⚛️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">Physics</h3>
                <p className="text-muted-foreground">Units, Dimensions & Motion</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">Dimensions</span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Motion</span>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-orange-500" />
            </div>
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SelectSubject;
