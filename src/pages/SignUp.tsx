import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChemistryScene } from '@/components/3d/ChemistryScene';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Check, X, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ValidationState {
  hasMinLetters: boolean;
  hasMinNumbers: boolean;
  noSpecialChars: boolean;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password validation
  const validatePassword = (pwd: string): ValidationState => {
    const letterCount = (pwd.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (pwd.match(/[0-9]/g) || []).length;
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(pwd);

    return {
      hasMinLetters: letterCount >= 6,
      hasMinNumbers: numberCount >= 3,
      noSpecialChars: !hasSpecialChars,
    };
  };

  const validation = validatePassword(password);
  const isPasswordValid = validation.hasMinLetters && validation.hasMinNumbers && validation.noSpecialChars;
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNameValid = name.trim().length >= 2 && name.trim().length <= 50;

  const canSubmit = isNameValid && isEmailValid && isPasswordValid && passwordsMatch && acceptTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error('Please fill all fields correctly');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store user data locally (for demo)
    const userData = {
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('chemlearn-user', JSON.stringify(userData));

    toast.success('Account created successfully! 🎉');
    setIsLoading(false);
    navigate('/');
  };

  const ValidationIcon = ({ valid }: { valid: boolean }) => (
    valid ? (
      <Check className="h-4 w-4 text-success" />
    ) : (
      <X className="h-4 w-4 text-destructive" />
    )
  );

  return (
    <AppLayout title="Sign Up">
      <ChemistryScene />
      
      <div className="p-4 pb-8 relative z-10 min-h-[calc(100vh-56px)] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-card/90 backdrop-blur-md rounded-3xl p-6 shadow-card border border-border/50">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Join ChemLearn and start your chemistry journey!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`h-12 ${name && (isNameValid ? 'border-success' : 'border-destructive')}`}
                  />
                  {name && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ValidationIcon valid={isNameValid} />
                    </div>
                  )}
                </div>
                {name && !isNameValid && (
                  <p className="text-xs text-destructive">Name must be 2-50 characters</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-12 ${email && (isEmailValid ? 'border-success' : 'border-destructive')}`}
                  />
                  {email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ValidationIcon valid={isEmailValid} />
                    </div>
                  )}
                </div>
                {email && !isEmailValid && (
                  <p className="text-xs text-destructive">Please enter a valid email</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-12 pr-10 ${password && (isPasswordValid ? 'border-success' : 'border-destructive')}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="bg-secondary/50 rounded-xl p-3 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Password Requirements:</p>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon valid={validation.hasMinLetters} />
                      <span className={validation.hasMinLetters ? 'text-success' : 'text-muted-foreground'}>
                        At least 6 letters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon valid={validation.hasMinNumbers} />
                      <span className={validation.hasMinNumbers ? 'text-success' : 'text-muted-foreground'}>
                        At least 3 numbers
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <ValidationIcon valid={validation.noSpecialChars} />
                      <span className={validation.noSpecialChars ? 'text-success' : 'text-muted-foreground'}>
                        No special characters (only letters and numbers)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`h-12 ${confirmPassword && (passwordsMatch ? 'border-success' : 'border-destructive')}`}
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <ValidationIcon valid={passwordsMatch} />
                    </div>
                  )}
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-destructive">Passwords do not match</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 py-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="w-full h-12 text-lg font-bold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <button className="text-primary font-medium hover:underline">
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignUp;
