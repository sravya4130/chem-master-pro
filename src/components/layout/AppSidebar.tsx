import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Home, 
  FlaskConical, 
  Users, 
  MessageCircle, 
  Info, 
  Settings, 
  GraduationCap,
  Flame,
  Trophy,
  UserPlus,
  CreditCard,
  Award
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/tutors', icon: GraduationCap, label: 'Tutors' },
  { to: '/achievements', icon: Award, label: 'Achievements' },
  { to: '/friends', icon: Users, label: 'Friends' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/pricing', icon: CreditCard, label: 'Pricing' },
  { to: '/signup', icon: UserPlus, label: 'Sign Up' },
  { to: '/about', icon: Info, label: 'About Us' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const AppSidebar = () => {
  const { userProgress, selectedTutor } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50 bg-card shadow-card hover:shadow-card-hover transition-all"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
        {/* Header */}
        <div className="gradient-hero p-6 text-primary-foreground">
          <h1 className="text-2xl font-bold">ChemLearn</h1>
          <p className="text-sm opacity-90">Master Chemistry with Fun!</p>
          
          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-game-streak" />
              <span className="font-semibold">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-game-xp" />
              <span className="font-semibold">{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Selected Tutor */}
        {selectedTutor && (
          <div className="px-4 py-3 bg-secondary/50 border-b border-sidebar-border">
            <p className="text-xs text-muted-foreground mb-1">Your Tutor</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedTutor.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{selectedTutor.name}</p>
                <p className="text-xs text-muted-foreground">{selectedTutor.specialty}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Level Badge */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-secondary rounded-xl p-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-game-level flex items-center justify-center mb-2">
              <span className="text-primary-foreground font-bold text-lg">{userProgress.level}</span>
            </div>
            <p className="text-sm font-medium">Level {userProgress.level}</p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${(userProgress.xp % 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{userProgress.xp % 100}/100 XP to next level</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
