import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { UserPlus, Trophy, Flame, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockFriends = [
  { id: 1, name: 'Priya S.', xp: 2450, streak: 15, avatar: '👩‍🔬' },
  { id: 2, name: 'Rahul K.', xp: 1890, streak: 8, avatar: '👨‍🎓' },
  { id: 3, name: 'Sneha M.', xp: 3200, streak: 22, avatar: '🧑‍🔬' },
  { id: 4, name: 'Arjun P.', xp: 1560, streak: 5, avatar: '👨‍💻' },
];

const Friends = () => {
  return (
    <AppLayout title="Friends">
      <div className="p-4 pb-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-10" />
        </div>

        {/* Add Friends */}
        <Button className="w-full mb-6 gap-2">
          <UserPlus className="h-5 w-5" />
          Add Friends
        </Button>

        {/* Leaderboard */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="gradient-hero p-4 text-primary-foreground">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Weekly Leaderboard
            </h2>
          </div>

          <div className="divide-y divide-border">
            {mockFriends
              .sort((a, b) => b.xp - a.xp)
              .map((friend, index) => (
                <div key={friend.id} className="p-4 flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-game-xp text-primary-foreground' :
                    index === 1 ? 'bg-muted-foreground/30' :
                    index === 2 ? 'bg-accent' :
                    'bg-muted'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {friend.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold">{friend.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-game-xp" />
                        {friend.xp.toLocaleString()} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-game-streak" />
                        {friend.streak}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Empty State Note */}
        <p className="text-sm text-muted-foreground text-center mt-6">
          Connect with friends to compare progress and compete on the leaderboard!
        </p>
      </div>
    </AppLayout>
  );
};

export default Friends;
