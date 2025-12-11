import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { useApp } from '@/contexts/AppContext';
import { Flame, Trophy } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
}

export const AppLayout = ({ children, showHeader = true, title }: AppLayoutProps) => {
  const { userProgress } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-lg border-b border-border z-40 flex items-center justify-between px-16">
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
      
      <main className={showHeader ? 'pt-14' : ''}>
        {children}
      </main>
    </div>
  );
};
