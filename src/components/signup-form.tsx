import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '@/integrations/firebase/client';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Brain, Sparkles, User, Mail, Lock, Zap, Eye, EyeOff, Shield, CheckCircle, Star, Users, Award } from 'lucide-react';
import { FloatingInput } from '@/components/ui/floating-input';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ParticlesBackground } from '@/components/ui/particles-background';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Spotlight } from '@/components/ui/spotlight';
import { LoadingDots } from '@/components/ui/loading-dots';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: 'Invalid password',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'profiles', user.uid), {
        display_name: name || email.split('@')[0],
        email: user.email,
        created_at: new Date(),
      });

      toast({
        title: 'Account created!',
        description: 'Welcome! You can now explore the platform.',
      });
      navigate('/profile');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast({
          title: 'Account exists',
          description: 'This email is already registered. Please sign in instead.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(
        doc(db, 'profiles', user.uid),
        {
          display_name: user.displayName || user.email?.split('@')[0],
          email: user.email,
          photo_url: user.photoURL,
          created_at: new Date(),
        },
        { merge: true }
      );

      toast({
        title: 'Welcome!',
        description: 'Your account has been created.',
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: 'Google sign up failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuroraBackground className="min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Spotlight Effect */}
      <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md transform transition-all duration-1000">
          {/* Glass Card with Enhanced Effects */}
          <div className="relative group">
            {/* Card Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-black/20 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 rounded-3xl"></div>
              
              {/* Header with Enhanced Animation */}
              <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-110">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Join Skillverse
                </h1>
                <p className="text-white/70 text-lg">Create your account and unlock your potential</p>
                
                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>10K+ Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span>Trusted</span>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-white/60">4.9/5 from 2,500+ reviews</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Enhanced Floating Inputs */}
                <FloatingInput
                  label="Full Name"
                  icon={<User className="w-5 h-5" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />

                <FloatingInput
                  label="Email Address"
                  type="email"
                  icon={<Mail className="w-5 h-5" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />

                {/* Enhanced Password Input with Strength Indicator */}
                <div className="space-y-3">
                  <div className="relative">
                    <FloatingInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      icon={<Lock className="w-5 h-5" />}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">Password Strength</span>
                        <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Terms Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                    className="mt-1 rounded border-white/20 bg-white/5 text-pink-500 focus:ring-pink-400/20"
                  />
                  <p className="text-white/70 text-sm leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-pink-300 hover:text-pink-200 underline font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-pink-300 hover:text-pink-200 underline font-medium">
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                {/* Enhanced Submit Button */}
                <AnimatedButton
                  type="submit"
                  size="lg"
                  loading={isLoading}
                  disabled={!agreedToTerms}
                  className="w-full group"
                >
                  {isLoading ? (
                    <>
                      <LoadingDots className="text-white" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:animate-pulse" />
                      <span>Create Account</span>
                    </>
                  )}
                </AnimatedButton>

                {/* Enhanced Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-black/20 text-white/60 backdrop-blur-sm rounded-full">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Enhanced Google Sign Up Button */}
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  Continue with Google
                </AnimatedButton>
              </form>

              {/* Enhanced Footer */}
              <div className="text-center mt-8 relative z-10">
                <p className="text-white/70">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-pink-300 hover:text-pink-200 font-medium transition-colors relative group"
                  >
                    <span className="relative z-10">Sign in here</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-8 grid grid-cols-1 gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 font-medium">Free to start</p>
                <p className="text-xs text-white/60">No credit card required</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 font-medium">Instant access</p>
                <p className="text-xs text-white/60">Start learning immediately</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/80 font-medium">Expert-led courses</p>
                <p className="text-xs text-white/60">Learn from industry professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}