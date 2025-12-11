import { AppLayout } from '@/components/layout/AppLayout';
import { MessageCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockMessages = [
  { id: 1, sender: 'Priya S.', message: 'Hey! How did you score on the IUPAC quiz?', time: '2h ago', avatar: '👩‍🔬', unread: true },
  { id: 2, sender: 'Rahul K.', message: 'Can you help me with hybridisation?', time: '5h ago', avatar: '👨‍🎓', unread: true },
  { id: 3, sender: 'Study Group', message: 'New topic unlocked! 🎉', time: '1d ago', avatar: '📚', unread: false },
  { id: 4, sender: 'Sneha M.', message: 'Great streak! Keep it up!', time: '2d ago', avatar: '🧑‍🔬', unread: false },
];

const Messages = () => {
  return (
    <AppLayout title="Messages">
      <div className="p-4 pb-8">
        {/* Search */}
        <div className="relative mb-6">
          <Input placeholder="Search messages..." />
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              className="w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all text-left flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl relative">
                {msg.avatar}
                {msg.unread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className={`font-semibold truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {msg.sender}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.time}</span>
                </div>
                <p className={`text-sm truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {msg.message}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state for new message */}
        <div className="mt-8 bg-secondary/50 rounded-2xl p-6 text-center">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Start a Conversation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with friends and study together!
          </p>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
