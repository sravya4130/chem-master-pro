import { AppLayout } from '@/components/layout/AppLayout';
import { ChemistryScene } from '@/components/3d/ChemistryScene';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlighted: boolean;
  buttonText: string;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    icon: <Star className="h-6 w-6" />,
    features: [
      'Access to 1 topic',
      'Basic progress tracking',
      '3 hints per day',
      'Community support',
      'Ads supported',
    ],
    highlighted: false,
    buttonText: 'Get Started',
    color: 'bg-secondary',
  },
  {
    name: 'Pro',
    price: 299,
    period: 'month',
    description: 'Most popular for serious learners',
    icon: <Zap className="h-6 w-6" />,
    features: [
      'All topics unlocked',
      'Unlimited hints',
      'Ad-free experience',
      'Priority tutor support',
      'Achievement badges',
      'Detailed analytics',
      'Offline mode',
    ],
    highlighted: true,
    buttonText: 'Subscribe Now',
    color: 'bg-primary',
  },
  {
    name: 'Premium',
    price: 499,
    period: 'month',
    description: 'For maximum results',
    icon: <Crown className="h-6 w-6" />,
    features: [
      'Everything in Pro',
      'Personalized study plans',
      'Mock tests & exams',
      'Certificate generation',
      'Priority support 24/7',
      '1-on-1 tutoring sessions',
      'Early access to new features',
    ],
    highlighted: false,
    buttonText: 'Go Premium',
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  },
];

const Pricing = () => {
  return (
    <AppLayout title="Pricing">
      <ChemistryScene />
      
      <div className="p-4 pb-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Choose Your Plan
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Unlock Your Chemistry Potential
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose the perfect plan for your learning journey. Upgrade anytime!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-4 max-w-4xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-6 ${
                tier.highlighted
                  ? 'bg-card/95 backdrop-blur-md border-2 border-primary shadow-lg'
                  : 'bg-card/80 backdrop-blur-sm border border-border/50'
              }`}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Tier Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-2xl ${tier.color} flex items-center justify-center text-primary-foreground`}>
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center sm:text-right">
                  <div className="flex items-baseline justify-center sm:justify-end gap-1">
                    {tier.price > 0 && <span className="text-lg text-muted-foreground">₹</span>}
                    <span className="text-4xl font-bold">
                      {tier.price === 0 ? 'Free' : tier.price}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-muted-foreground">/{tier.period}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className={`h-4 w-4 ${tier.highlighted ? 'text-primary' : 'text-success'}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full mt-6 h-12 text-lg font-bold ${
                  tier.highlighted
                    ? ''
                    : tier.name === 'Premium'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black'
                    : 'variant-outline'
                }`}
                variant={tier.highlighted ? 'default' : tier.name === 'Free' ? 'outline' : 'default'}
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-sm text-muted-foreground">
                We offer a 7-day money-back guarantee. If you're not satisfied, get a full refund.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit/debit cards, UPI, and net banking.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Secure payments powered by industry-leading encryption
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
