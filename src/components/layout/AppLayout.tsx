import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { useApp } from '@/contexts/AppContext';
import { Flame, Trophy } from 'lucide-react';
import { SceneBackground } from '@/components/3d/SceneBackground';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  hideBackground?: boolean;
}

export const AppLayout = ({ children, showHeader = true, title, hideBackground = false }: AppLayoutProps) => {
  const { userProgress } = useApp();

  return (
    <div className="min-h-screen bg-background relative">
      {/* 3D Background for all pages */}
      {!hideBackground && <SceneBackground />}
      
      <AppSidebar />
      
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 h-14 bg-card/60 backdrop-blur-xl border-b border-border/50 z-40 flex items-center justify-between px-16">
          <h2 className="font-bold text-lg">{title || 'ChemLearn'}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-game-streak" />
              <span className="font-semibold text-sm">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <Trophy className="h-4 w-4 text-game-xp" />
              <span className="font-semibold text-sm">{userProgress.xp}</span>
            </div>
          </div>
        </header>
      )}
      
      <main className={`relative z-10 ${showHeader ? 'pt-14' : ''}`}>
        {children}
      </main>
    </div>
  );
};
