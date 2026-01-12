import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  BookOpen,
  Target,
  BarChart3,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { auth } from '@/integrations/firebase/client';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.displayName) {
      const names = user.displayName.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    return user.email?.[0].toUpperCase() || 'U';
  };

  // Get display name
  const getDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User';
  };

  // Get email
  const getEmail = () => {
    return user?.email || 'user@example.com';
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
    { name: 'ATS Checker', href: '/ats-checker', icon: FileCheck },
    { name: 'AI Assistant', href: '/ai-assistant', icon: MessageSquare },
    { name: 'Practice', href: '/practice', icon: HelpCircle },
    { name: 'Careers', href: '/careers', icon: Target },
    { name: 'Learning Path', href: '/learning-path', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => navigate('/home')} 
              className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Skillverse</span>
            </button>

            {/* Right Side Actions */}
            <div className="flex items-center gap-x-4">
              {/* Search */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 rounded-xl border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <ModeToggle />
              
              {/* Quick Actions */}
              <Link to="/career-mentor">
                <Button size="sm" variant="outline" className="hidden md:inline-flex border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl">
                  Career Mentor
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button size="sm" variant="outline" className="hidden md:inline-flex border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl">
                  Chat
                </Button>
              </Link>

              {/* Notifications */}
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs leading-5 text-gray-500">
                    {getEmail()}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="hidden lg:flex items-center text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation Bar */}
      <nav className="fixed top-20 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <Icon className={`mr-2 h-4 w-4 ${
                      isActive(item.href) ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-500'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm">
          <div className="fixed top-20 right-4 left-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Navigation</div>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-blue-700' : 'text-gray-400'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="border-t border-gray-200 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-32 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
