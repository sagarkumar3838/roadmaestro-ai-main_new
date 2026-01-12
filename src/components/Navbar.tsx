import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import { AnimatedAuthButton } from '@/components/ui/animated-auth-button';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Learn', href: '/learn' },
  { name: 'Courses', href: '/courses' },
  { name: 'Practice', href: '/practice' },
  { name: 'Careers', href: '/careers' },
  { name: 'Cheat Sheets', href: '/cheatsheets' },
  { name: 'AI Assistant', href: '/ai-assistant' },
];

export default function Navbar({ user }: { user?: any }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.avatar-dropdown')) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 border-b border-border/20 shadow-xl backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl overflow-hidden">
                  <span className="text-white font-bold text-xl">J2C</span>
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Journey2Code
                </span>
                <span className="text-xs text-foreground/60">Learn • Build • Succeed</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => navigate(item.href)}
                    className="text-foreground/80 hover:text-foreground relative rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200"
                  >
                    {hoveredItem === item.name && (
                      <motion.div
                        className="bg-muted absolute inset-0 rounded-xl"
                        layoutId="navbar-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <motion.div
              className="hidden items-center space-x-4 lg:flex"
              variants={itemVariants}
            >
              <motion.button
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl p-2 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <ModeToggle />

              {user ? (
                <div className="relative avatar-dropdown">
                  <motion.button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img
                          className="w-full h-full object-cover"
                          alt="User avatar"
                          src={user.photoURL}
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {user?.displayName || 'User'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-foreground/60" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 py-2 z-50"
                      >
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors duration-200 flex items-center gap-3"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors duration-200 flex items-center gap-3"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <hr className="my-2 border-border/50" />
                        <button
                          onClick={() => {
                            handleSignOut();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center gap-3"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <SigninModal>
                    <Button variant="ghost" className="rounded-xl">
                      Sign In
                    </Button>
                  </SigninModal>
                  
                  <SignupModal>
                    <AnimatedAuthButton
                      variant="signup"
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started
                    </AnimatedAuthButton>
                  </SignupModal>
                </div>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="text-foreground hover:bg-muted rounded-xl p-2 transition-colors duration-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-20 right-4 z-50 w-80 overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border/50 shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="space-y-6 p-6">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      <button
                        onClick={() => {
                          navigate(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-foreground hover:bg-muted block w-full rounded-xl px-4 py-3 font-medium transition-colors duration-200 text-left"
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="border-border space-y-4 border-t pt-6"
                  variants={mobileItemVariants}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                  
                  {user ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-foreground hover:bg-muted flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-foreground hover:bg-muted flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <SigninModal>
                        <Button variant="outline" className="w-full rounded-xl">
                          Sign In
                        </Button>
                      </SigninModal>
                      
                      <SignupModal>
                        <AnimatedAuthButton variant="signup" className="w-full rounded-xl">
                          Get Started
                        </AnimatedAuthButton>
                      </SignupModal>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}