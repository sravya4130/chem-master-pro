import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Home, BookOpen, Users, MessageCircle, Settings, Info, Trophy, Flame, X, Beaker, Atom, Calculator, UserCircle, AlertTriangle, LogIn, Youtube, Grid3x3 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useApp } from '@/contexts/AppContext';
import { useMistakes } from '@/contexts/MistakeContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/topics', icon: Beaker, label: 'Chemistry Topics' },
  { to: '/periodic-table', icon: Grid3x3, label: 'Periodic Table' },
  { to: '/topics/physics', icon: Atom, label: 'Physics Topics' },
  { to: '/topics/maths', icon: Calculator, label: 'Mathematics Topics' },
  { to: '/tutors', icon: UserCircle, label: 'Tutors' },
  { to: '/friends', icon: Users, label: 'Friends' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/mistakes', icon: AlertTriangle, label: 'Mistakes' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/about', icon: Info, label: 'About Us' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/youtube-notes', icon: Youtube, label: 'YouTube Notes' },
  { to: '/signup', icon: LogIn, label: 'Sign Up' },
];

export const AppSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userProgress, selectedTutor } = useApp();
  const { getTotalMistakeCount } = useMistakes();
  
  const mistakeCount = getTotalMistakeCount();

  const handleNavigation = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-card/80 backdrop-blur-lg shadow-lg border border-border/50 hover:bg-card transition-colors">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col h-full">
        {/* Header - Fixed */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-topic-blue bg-clip-text text-transparent">
              ChemLearn
            </h1>
            <SheetClose asChild>
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-game-streak" />
              <span className="font-semibold text-sm">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <Trophy className="h-4 w-4 text-game-xp" />
              <span className="font-semibold text-sm">{userProgress.xp}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Selected Tutor */}
            {selectedTutor && (
              <div className="mb-4 p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                    {selectedTutor.emoji}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Your Tutor</p>
                    <p className="font-semibold">{selectedTutor.name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                const isMistakes = item.to === '/mistakes';
                
                return (
                  <button
                    key={item.to}
                    onClick={() => handleNavigation(item.to)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isMistakes && mistakeCount > 0 && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                        {mistakeCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </ScrollArea>

        {/* Footer - Fixed */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="bg-gradient-to-r from-primary/20 to-topic-blue/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">Level {userProgress.level}</span>
            </div>
            <div className="h-2 bg-background/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-topic-blue transition-all duration-500"
                style={{ width: `${(userProgress.xp % 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {100 - (userProgress.xp % 100)} XP to next level
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
