import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp, Tutor } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Volume2, 
  Moon, 
  Trash2, 
  Save,
  Edit2,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { tutors, setTutors, userProgress, setUserProgress, setSelectedTutor, setSelectedSubject } = useApp();
  const [editingTutors, setEditingTutors] = useState(false);
  const [tutorNames, setTutorNames] = useState<Record<string, string>>(
    Object.fromEntries(tutors.map(t => [t.id, t.name]))
  );

  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    darkMode: false,
  });

  const saveTutorNames = () => {
    const updatedTutors = tutors.map(tutor => ({
      ...tutor,
      name: tutorNames[tutor.id] || tutor.name,
    }));
    setTutors(updatedTutors);
    setEditingTutors(false);
    toast.success('Tutor names updated!');
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setUserProgress({
        xp: 0,
        streak: 0,
        level: 1,
        completedTopics: [],
        currentTopic: null,
      });
      setSelectedTutor(null);
      setSelectedSubject(null);
      toast.success('Progress reset successfully');
    }
  };

  return (
    <AppLayout title="Settings">
      <div className="p-4 pb-8 space-y-6">
        {/* Profile Section */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-bold">Profile</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Level</span>
              <span className="font-bold">{userProgress.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total XP</span>
              <span className="font-bold">{userProgress.xp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-bold">{userProgress.streak} days</span>
            </div>
          </div>
        </div>

        {/* Tutor Names Section */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" />
              <h2 className="font-bold">Edit Tutor Names</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingTutors(!editingTutors)}
            >
              {editingTutors ? 'Cancel' : 'Edit'}
              <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${editingTutors ? 'rotate-90' : ''}`} />
            </Button>
          </div>
          
          {editingTutors && (
            <div className="p-4 space-y-3">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="flex items-center gap-3">
                  <span className="text-2xl">{tutor.emoji}</span>
                  <Input
                    value={tutorNames[tutor.id]}
                    onChange={(e) => setTutorNames({
                      ...tutorNames,
                      [tutor.id]: e.target.value
                    })}
                    placeholder="Tutor name"
                  />
                </div>
              ))}
              <Button onClick={saveTutorNames} className="w-full gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
          
          {!editingTutors && (
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {tutors.map((tutor) => (
                  <span key={tutor.id} className="bg-secondary px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    <span>{tutor.emoji}</span>
                    {tutor.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* App Settings */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <h2 className="font-bold">App Settings</h2>
          </div>
          <div className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Notifications</span>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <span>Sound Effects</span>
              </div>
              <Switch
                checked={settings.sound}
                onCheckedChange={(checked) => setSettings({ ...settings, sound: checked })}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/5 rounded-2xl border-2 border-destructive/20 overflow-hidden">
          <div className="p-4 border-b border-destructive/20 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <h2 className="font-bold text-destructive">Danger Zone</h2>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Reset all progress and start fresh. This action cannot be undone.
            </p>
            <Button variant="destructive" onClick={resetProgress} className="w-full gap-2">
              <Trash2 className="h-4 w-4" />
              Reset All Progress
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
