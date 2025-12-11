import { AppLayout } from '@/components/layout/AppLayout';
import { FlaskConical, Heart, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <AppLayout title="About Us">
      <div className="p-4 pb-8">
        {/* Hero */}
        <div className="gradient-hero rounded-2xl p-8 text-primary-foreground text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-card/20 flex items-center justify-center mx-auto mb-4">
            <FlaskConical className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">ChemLearn</h1>
          <p className="opacity-80">Master Chemistry for JEE</p>
          <p className="text-sm opacity-60 mt-2">Version 1.0.0</p>
        </div>

        {/* Mission */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="font-bold text-lg mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            ChemLearn is designed to make Chemistry learning fun and effective for JEE aspirants. 
            Our gamified approach helps students master complex concepts through interactive lessons 
            and engaging games.
          </p>
        </div>

        {/* Features */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="font-bold text-lg mb-4">Features</h2>
          <ul className="space-y-3">
            {[
              '🎮 Gamified learning with XP and streaks',
              '👩‍🏫 Choose from multiple tutor characters',
              '📚 Comprehensive Chemistry topics',
              '⏱️ Timed quizzes to test your speed',
              '💡 Helpful hints when you\'re stuck',
              '📊 Track your progress and compete with friends',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics Covered */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="font-bold text-lg mb-4">Topics Covered</h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-topic-blue/10 rounded-xl p-4">
              <h3 className="font-semibold text-topic-blue">Hybridisation</h3>
              <p className="text-sm text-muted-foreground">sp, sp², sp³, sp³d, sp³d² orbitals, shells, and quantum numbers</p>
            </div>
            <div className="bg-topic-green/10 rounded-xl p-4">
              <h3 className="font-semibold text-topic-green">Sigma & Pi Bonds</h3>
              <p className="text-sm text-muted-foreground">Identify and count sigma and pi bonds in molecules</p>
            </div>
            <div className="bg-topic-pink/10 rounded-xl p-4">
              <h3 className="font-semibold text-topic-pink">IUPAC Nomenclature</h3>
              <p className="text-sm text-muted-foreground">Learn to name organic compounds correctly</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
          <h2 className="font-bold text-lg mb-4">Get in Touch</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Mail className="h-5 w-5" />
              support@chemlearn.app
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <ExternalLink className="h-5 w-5" />
              Visit Our Website
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> for JEE aspirants
          </p>
          <p className="mt-2">© 2024 ChemLearn. All rights reserved.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
