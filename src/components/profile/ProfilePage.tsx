import { useState, useEffect } from 'react';
import { auth, db } from '@/integrations/firebase/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CourseCard } from '@/components/CourseCard';
import { 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Share2, 
  Edit, 
  Save,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Clock,
  Star,
  Zap,
  Brain,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Plus,
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  Bell,
  Search,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  skills: string[] | null;
  interests: string[] | null;
  learning_goals: string[] | null;
  completed_assessments: number;
  total_score: number;
  preferred_learning_style: string | null;
  experience_level: string | null;
}

const recommendedCourses = [
  {
    id: '1',
    title: 'The Complete JavaScript Course 2024',
    provider: 'Udemy',
    difficulty: 'Beginner' as const,
    description: 'From Zero to Expert! JavaScript fundamentals, modern ES6+, object-oriented programming, and more.',
    duration: '69 hours',
    rating: 4.7,
    category: 'Web Development',
    link: 'https://www.udemy.com/course/the-complete-javascript-course/',
    price: '$84.99'
  },
  {
    id: '2',
    title: 'React - The Complete Guide 2024',
    provider: 'Udemy',
    difficulty: 'Intermediate' as const,
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    duration: '48 hours',
    rating: 4.6,
    category: 'React',
    link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    price: '$84.99'
  },
  {
    id: '3',
    title: 'Python for Data Science and Machine Learning',
    provider: 'Udemy',
    difficulty: 'Intermediate' as const,
    description: 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!',
    duration: '25 hours',
    rating: 4.5,
    category: 'Data Science',
    link: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
    price: '$84.99'
  },
  {
    id: '4',
    title: 'Complete Web Development Bootcamp',
    provider: 'Udemy',
    difficulty: 'Beginner' as const,
    description: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
    duration: '65 hours',
    rating: 4.7,
    category: 'Full Stack',
    link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    price: '$84.99'
  }
];

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [animatedStats, setAnimatedStats] = useState({
    completedAssessments: 0,
    totalScore: 0,
    studyHours: 0,
    streakDays: 0,
    coursesCompleted: 0
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Performance statistics with animations
  const performanceStats = [
    {
      name: 'Courses Completed',
      value: profile?.completed_assessments || 0,
      animatedValue: animatedStats.completedAssessments,
      max: 50,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      description: 'Learning Progress'
    },
    {
      name: 'Study Hours',
      value: Math.floor((profile?.total_score || 0) * 2.5),
      animatedValue: animatedStats.studyHours,
      max: 200,
      icon: Clock,
      color: 'from-green-500 to-green-600',
      description: 'This month'
    },
    {
      name: 'Total Score',
      value: profile?.total_score || 0,
      animatedValue: animatedStats.totalScore,
      max: 1000,
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
      description: 'Assessment Score'
    },
    {
      name: 'Streak Days',
      value: Math.min((profile?.completed_assessments || 0) * 2, 30),
      animatedValue: animatedStats.streakDays,
      max: 30,
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      description: 'Current streak'
    }
  ];

  // Animate numbers when profile data changes
  useEffect(() => {
    if (profile) {
      const animateValue = (key: keyof typeof animatedStats, target: number, duration: number = 2000) => {
        const start = animatedStats[key];
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      animateValue('completedAssessments', profile.completed_assessments || 0);
      animateValue('totalScore', profile.total_score || 0);
      animateValue('studyHours', Math.floor((profile.total_score || 0) * 2.5));
      animateValue('streakDays', Math.min((profile.completed_assessments || 0) * 2, 30));
      animateValue('coursesCompleted', profile.completed_assessments || 0);
    }
  }, [profile]);

  const [editForm, setEditForm] = useState({
    display_name: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    skills: '',
    interests: '',
    learning_goals: '',
    preferred_learning_style: '',
    experience_level: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        navigate('/login');
        return;
      }
      setUser(firebaseUser);
      await fetchProfile(firebaseUser.uid);
    });

    return unsubscribe;
  };

  const fetchProfile = async (userId: string) => {
    try {
      const profileDoc = await getDoc(doc(db, 'profiles', userId));

      if (profileDoc.exists()) {
        const data = profileDoc.data();
        const profileData = {
          id: profileDoc.id,
          user_id: userId,
          display_name: data.display_name || null,
          bio: data.bio || null,
          avatar_url: data.avatar_url || null,
          github_url: data.github_url || null,
          linkedin_url: data.linkedin_url || null,
          twitter_url: data.twitter_url || null,
          skills: data.skills || null,
          interests: data.interests || null,
          learning_goals: data.learning_goals || null,
          completed_assessments: data.completed_assessments || 0,
          total_score: data.total_score || 0,
          preferred_learning_style: data.preferred_learning_style || null,
          experience_level: data.experience_level || null,
        };

        setProfile(profileData);
        setEditForm({
          display_name: profileData.display_name || '',
          bio: profileData.bio || '',
          github_url: profileData.github_url || '',
          linkedin_url: profileData.linkedin_url || '',
          twitter_url: profileData.twitter_url || '',
          skills: profileData.skills?.join(', ') || '',
          interests: profileData.interests?.join(', ') || '',
          learning_goals: profileData.learning_goals?.join(', ') || '',
          preferred_learning_style: profileData.preferred_learning_style || '',
          experience_level: profileData.experience_level || ''
        });
      } else {
        // Create profile if it doesn't exist
        await createProfile(userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const profileData = {
        display_name: user?.email?.split('@')[0] || 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
        supabaseUserId: userId, // Keep for backward compatibility
        firebaseUserId: userId,
        completed_assessments: 0,
        total_score: 0
      };

      await setDoc(doc(db, 'profiles', userId), profileData);

      const newProfile = {
        id: userId,
        user_id: userId,
        display_name: profileData.display_name,
        bio: null,
        avatar_url: null,
        github_url: null,
        linkedin_url: null,
        twitter_url: null,
        skills: null,
        interests: null,
        learning_goals: null,
        completed_assessments: 0,
        total_score: 0,
        preferred_learning_style: null,
        experience_level: null,
      };

      setProfile(newProfile);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    setIsLoading(true);
    try {
      const updateData = {
        display_name: editForm.display_name,
        bio: editForm.bio,
        github_url: editForm.github_url,
        linkedin_url: editForm.linkedin_url,
        twitter_url: editForm.twitter_url,
        skills: editForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: editForm.interests.split(',').map(s => s.trim()).filter(Boolean),
        learning_goals: editForm.learning_goals.split(',').map(s => s.trim()).filter(Boolean),
        preferred_learning_style: editForm.preferred_learning_style,
        experience_level: editForm.experience_level,
        updatedAt: new Date()
      };

      await updateDoc(doc(db, 'profiles', profile.user_id), updateData);

      await fetchProfile(profile.user_id);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated!",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareProfile = () => {
    const shareText = `Check out my learning profile on AI Course Mentor! 🎓\n\nSkills: ${profile?.skills?.join(', ') || 'Learning in progress'}\nCompleted Assessments: ${profile?.completed_assessments || 0}\nTotal Score: ${profile?.total_score || 0}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My AI Course Mentor Profile',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="h-full space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleShareProfile}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-orange-200">
                <AvatarImage src={profile?.avatar_url || user?.photoURL || ''} />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                  {profile?.display_name?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  {profile?.display_name || user?.displayName || 'User'}
                </h2>
                <p className="text-gray-600 flex items-center mb-2">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </p>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    {profile?.experience_level || 'Beginner'}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {profile?.preferred_learning_style || 'Visual'}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              disabled={isLoading}
              className={isEditing ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {performanceStats.map((stat, index) => {
              const Icon = stat.icon;
              const progressPercentage = (stat.animatedValue / stat.max) * 100;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} mx-auto mb-4 w-fit shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.animatedValue}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{stat.name}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
              {isEditing ? (
                <Textarea
                  placeholder="Tell us about yourself..."
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="min-h-[120px] bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {profile?.bio || 'No bio added yet. Click edit to add your story!'}
                </p>
              )}
            </Card>

            {/* Skills and Test Progress */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Skills & Test Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Personal Skills</h3>
                  {isEditing ? (
                    <Input
                      placeholder="JavaScript, React, Python (comma separated)"
                      value={editForm.skills}
                      onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.map((skill, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                          {skill}
                        </Badge>
                      )) || <span className="text-gray-500">No skills added</span>}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Test Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">HTML Tests:</span>
                      <Badge variant="secondary" className="bg-green-500">0 passed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">CSS Tests:</span>
                      <Badge variant="secondary" className="bg-yellow-500">0 passed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">JavaScript Tests:</span>
                      <Badge variant="secondary" className="bg-blue-500">0 passed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Total Score:</span>
                      <span className="font-bold text-green-400">{profile?.total_score || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Progress Bars */}
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold">Test Completion</h4>
                {['HTML', 'CSS', 'JavaScript', 'jQuery', 'DevTools'].map((skill, index) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span>0/3 completed</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Goals */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Learning Goals</h2>
              {isEditing ? (
                <Input
                  placeholder="Master React, Learn Python, Get certified (comma separated)"
                  value={editForm.learning_goals}
                  onChange={(e) => setEditForm({ ...editForm, learning_goals: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile?.learning_goals?.map((goal, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                      {goal}
                    </Badge>
                  )) || <span className="text-gray-500">No goals set</span>}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Links */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Social Links</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="GitHub URL"
                      value={editForm.github_url}
                      onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="LinkedIn URL"
                      value={editForm.linkedin_url}
                      onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Twitter className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Twitter URL"
                      value={editForm.twitter_url}
                      onChange={(e) => setEditForm({ ...editForm, twitter_url: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile?.github_url && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start border-gray-500 text-gray-300 hover:bg-gray-600">
                      <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {profile?.linkedin_url && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start border-gray-500 text-gray-300 hover:bg-gray-600">
                      <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {profile?.twitter_url && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start border-gray-500 text-gray-300 hover:bg-gray-600">
                      <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {!profile?.github_url && !profile?.linkedin_url && !profile?.twitter_url && (
                    <p className="text-gray-400 text-sm">No social links added</p>
                  )}
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  onClick={() => navigate('/careers')}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Explore Career
                </Button>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate('/courses')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Courses
                </Button>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Statistics
                </Button>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => navigate('/dashboard')}
                >
                  <Award className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white p-6 shadow-lg border-0 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-600">
                  <div className="p-2 bg-green-500 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed Assessment</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-600">
                  <div className="p-2 bg-blue-500 rounded-full">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Started New Course</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-600">
                  <div className="p-2 bg-purple-500 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Earned Badge</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recommended Courses Section */}
        <Card className="bg-white p-6 shadow-lg border-0 rounded-xl mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recommended Courses</h2>
              <p className="text-gray-400">Curated courses to accelerate your learning journey</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-gray-600 p-4 rounded-lg hover:bg-gray-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500 text-white">{course.difficulty}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-white">{course.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{course.duration}</span>
                  <span>{course.price}</span>
                </div>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(course.link, '_blank')}
                >
                  Enroll Now
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
