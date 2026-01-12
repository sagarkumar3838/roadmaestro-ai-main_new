import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '@/integrations/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Brain, Sparkles, Mail, Lock, LogIn, Eye, EyeOff, Shield, CheckCircle, Star, Users, Award, Zap, Play, BookOpen, TrendingUp } from 'lucide-react';
import { FloatingInput } from '@/components/ui/floating-input';
import { AnimatedButton } from '@/components/ui/animated-button';
import { ParticlesBackground } from '@/components/ui/particles-background';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Spotlight } from '@/components/ui/spotlight';
import { LoadingDots } from '@/components/ui/loading-dots';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Welcome back!',
        description: 'You are now signed in.',
      });
      navigate('/profile');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await setDoc(doc(db, 'profiles', user.uid), {
            display_name: email.split('@')[0],
            email: user.email,
            created_at: new Date(),
          });

          toast({
            title: 'Account created!',
            description: 'Welcome! You can now explore the platform.',
          });
          navigate('/profile');
        } catch (signupError: any) {
          toast({
            title: 'Authentication failed',
            description: signupError.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
        description: 'You are now signed in with Google.',
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: 'Google sign in failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background Effects */}
        <ParticlesBackground />
        <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-20">
          {/* Glass Card with Enhanced Effects */}
          <div className="relative group">
            {/* Card Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-black/20 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-3xl"></div>
              
              {/* Header with Enhanced Animation */}
              <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-110">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-white/70 text-lg">Sign in to continue your learning journey</p>
                
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
                  label="Email Address"
                  type="email"
                  icon={<Mail className="w-5 h-5" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />

                {/* Enhanced Password Input */}
                <div className="space-y-3">
                  <div className="relative">
                    <FloatingInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      icon={<Lock className="w-5 h-5" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400/20"
                    />
                    <label htmlFor="remember" className="text-sm text-white/70">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Enhanced Submit Button */}
                <AnimatedButton
                  type="submit"
                  size="lg"
                  loading={isLoading}
                  className="w-full group"
                >
                  {isLoading ? (
                    <>
                      <LoadingDots className="text-white" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 group-hover:animate-pulse" />
                      <span>Sign In</span>
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

                {/* Enhanced Google Sign In Button */}
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleGoogleSignIn}
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
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors relative group"
                  >
                    <span className="relative z-10">Sign up here</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Video Section */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Video Background */}
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            <div className="text-center mb-6 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                See Skillverse in Action
              </h2>
              <p className="text-white/70 text-lg">Watch how our platform transforms learning</p>
            </div>
            
            <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden relative group">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Interactive Learning Experience</p>
                      <p className="text-sm text-white/80">See how students master new skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 gap-4 mt-6 relative z-10">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">Interactive Courses</h3>
                  <p className="text-xs text-white/60">Hands-on learning with real projects</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">Progress Tracking</h3>
                  <p className="text-xs text-white/60">Monitor your learning journey</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">Certifications</h3>
                  <p className="text-xs text-white/60">Earn recognized credentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
