import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SignupModalProps {
  children: React.ReactNode;
}

export default function SignupModal({ children }: SignupModalProps) {
  const id = useId();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      setOpen(false);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success('Account created successfully!');
      setOpen(false);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign up error:', error);
      toast.error(error.message || 'Failed to sign up with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <img
              src="/logo1.svg"
              alt="logo"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Create your account</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your details to create a new account.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form className="space-y-5" onSubmit={handleEmailSignUp}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                name="email"
                placeholder="Enter your email"
                type="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-confirm-password`}>Confirm Password</Label>
              <Input
                id={`${id}-confirm-password`}
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-terms`} required />
            <Label
              htmlFor={`${id}-terms`}
              className="text-muted-foreground font-normal text-sm"
            >
              I agree to the{' '}
              <a href="#" className="underline hover:no-underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:no-underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>
        <Button 
          variant="outline" 
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
          className="w-full"
        >
          {isGoogleLoading ? 'Creating account...' : 'Sign up with Google'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}