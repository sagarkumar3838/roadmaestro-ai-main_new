import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/integrations/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/integrations/firebase/client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GoogleGeminiEffect } from '@/components/ui/gemini-effect';
import { 
  Brain, 
  BookOpen, 
  Target, 
  Trophy, 
  Share2, 
  ExternalLink,
  Users,
  TrendingUp,
  Star,
  Play
} from 'lucide-react';

interface MentorQuestion {
  id: string;
  text: string;
  type: 'open-ended' | 'multiple-choice';
  options: string[] | null;
}

interface Course {
  courseTitle: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  rating?: number;
  duration?: string;
  price?: string;
}

interface MentorProfile {
  name: string;
  score: number;
  globalRank: string;
  interests: string[];
  recommendedCourses: string[];
  shareableSummary: string;
}

interface MentorResponse {
  questions: MentorQuestion[];
  score: number;
  courses: Course[];
  roadmap: string[];
  profile: MentorProfile;
}

export function CareerMentor() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [questions, setQuestions] = useState<MentorQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mentorData, setMentorData] = useState<MentorResponse | null>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengths = [
    useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]),
    useTransform(scrollYProgress, [0, 0.8], [0, 1.2]),
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  };

  const startAssessment = async () => {
    setIsLoading(true);
    try {
      const initialData = await generateMentorResponse([], true);
      setQuestions(initialData.questions);
      setCurrentStep('assessment');
    } catch (error) {
      console.error('Error starting assessment:', error);
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMentorResponse = async (userAnswers: string[], isInitial: boolean = false): Promise<MentorResponse> => {
    // For now, using static data since Supabase functions are not available with Firebase
    // TODO: Implement Firebase Cloud Functions equivalent
    return {
      questions: [
        {
          id: 'q1',
          text: "What's your current experience level in technology?",
          type: 'multiple-choice',
          options: ['Complete beginner', 'Some experience (1-2 years)', 'Intermediate (3-5 years)', 'Advanced (5+ years)']
        },
        {
          id: 'q2',
          text: "Which technology area interests you most?",
          type: 'multiple-choice',
          options: ['Web Development', 'Mobile Development', 'Data Science', 'AI/Machine Learning', 'Cybersecurity', 'Cloud Computing']
        },
        {
          id: 'q3',
          text: "What's your preferred learning style?",
          type: 'multiple-choice',
          options: ['Visual learner (videos, diagrams)', 'Hands-on practice (coding exercises)', 'Reading documentation', 'Group learning and discussions']
        }
      ],
      score: Math.floor(Math.random() * 40) + 60,
      courses: [
        {
          courseTitle: 'The Complete JavaScript Course 2024',
          category: 'Web Development',
          level: 'Beginner',
          url: 'https://www.udemy.com/course/the-complete-javascript-course/',
          rating: 4.7,
          duration: '69 hours',
          price: '$84.99'
        },
        {
          courseTitle: 'React - The Complete Guide 2024',
          category: 'Web Development',
          level: 'Intermediate',
          url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
          rating: 4.6,
          duration: '48 hours',
          price: '$84.99'
        },
        {
          courseTitle: 'Python for Data Science and Machine Learning',
          category: 'Data Science',
          level: 'Intermediate',
          url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
          rating: 4.5,
          duration: '25 hours',
          price: '$84.99'
        }
      ],
      roadmap: [
        'Step 1: Master JavaScript fundamentals and ES6+ features',
        'Step 2: Learn React.js for modern frontend development',
        'Step 3: Understand backend technologies (Node.js, databases)',
        'Step 4: Build full-stack projects to showcase your skills',
        'Step 5: Learn testing, deployment, and DevOps basics'
      ],
      profile: {
        name: user?.email?.split('@')[0] || 'User',
        score: Math.floor(Math.random() * 40) + 60,
        globalRank: `Top ${Math.floor(Math.random() * 20) + 10}%`,
        interests: ['Web Development', 'React'],
        recommendedCourses: ['JavaScript Course', 'React Guide'],
        shareableSummary: `I just completed my AI Career Mentor assessment and got ranked in the top ${Math.floor(Math.random() * 20) + 10}%! 🚀 Check out my personalized learning path.`
      }
    };
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete
      setIsLoading(true);
      try {
        const finalData = await generateMentorResponse(newAnswers);
        setMentorData(finalData);
        
        // Update user profile with assessment data
        if (user) {
          await updateUserProfile(finalData);
        }
        
        setCurrentStep('results');
        toast({
          title: "Assessment Complete! 🎉",
          description: `Your personalized career roadmap is ready!`,
        });
      } catch (error) {
        console.error('Error completing assessment:', error);
        toast({
          title: "Error",
          description: "Failed to complete assessment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateUserProfile = async (data: MentorResponse) => {
    try {
      if (!user?.uid) return;

      const profileRef = doc(db, 'profiles', user.uid);
      const profileSnap = await getDoc(profileRef);

      let currentProfile = null;
      if (profileSnap.exists()) {
        currentProfile = profileSnap.data();
      }

      await updateDoc(profileRef, {
        completed_assessments: (currentProfile?.completed_assessments || 0) + 1,
        total_score: (currentProfile?.total_score || 0) + data.score,
        interests: data.profile.interests,
        learning_goals: data.roadmap.slice(0, 3),
        updated_at: new Date()
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleShareProfile = () => {
    if (!mentorData) return;

    const shareText = mentorData.profile.shareableSummary;
    
    if (navigator.share) {
      navigator.share({
        title: 'My AI Career Mentor Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
      toast({
        title: "Link copied!",
        description: "Assessment results copied to clipboard",
      });
    }
  };

  const restartAssessment = () => {
    setCurrentStep('intro');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMentorData(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Intro Step */}
      {currentStep === 'intro' && (
        <div ref={ref} className="text-center space-y-8">
          <GoogleGeminiEffect
            title="AI Career Mentor"
            description="Get personalized course recommendations, adaptive assessments, and a custom learning roadmap tailored to your skills and career goals. Share your progress with the world!"
            pathLengths={pathLengths}
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center course-card">
              <Brain className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Adaptive AI Questions</h3>
              <p className="text-muted-foreground text-sm">
                Dynamic questions that adapt based on your profile and previous answers
              </p>
            </Card>
            
            <Card className="p-6 text-center course-card">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Scoring System</h3>
              <p className="text-muted-foreground text-sm">
                Get scored 0-100 and see your global ranking compared to other learners
              </p>
            </Card>
            
            <Card className="p-6 text-center course-card">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Udemy Integration</h3>
              <p className="text-muted-foreground text-sm">
                Direct links to recommended Udemy courses based on your assessment
              </p>
            </Card>
          </div>

          <Button 
            size="lg" 
            onClick={startAssessment}
            disabled={isLoading}
            className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 ai-glow"
          >
            {isLoading ? 'Starting...' : 'Start AI Career Assessment'}
            <Brain className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Assessment Step */}
      {currentStep === 'assessment' && questions.length > 0 && (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="progress-fill h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center">
                {questions[currentQuestionIndex]?.text}
              </h2>

              {questions[currentQuestionIndex]?.type === 'multiple-choice' && questions[currentQuestionIndex]?.options && (
                <div className="grid gap-3 max-w-2xl mx-auto">
                  {questions[currentQuestionIndex].options!.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleAnswer(option)}
                      className="p-4 h-auto text-left justify-start hover:bg-primary/10 hover:border-primary transition-all"
                      disabled={isLoading}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {questions[currentQuestionIndex]?.type === 'open-ended' && (
                <div className="max-w-2xl mx-auto">
                  <textarea
                    className="w-full p-4 border rounded-lg resize-none"
                    rows={4}
                    placeholder="Type your answer here..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const value = (e.target as HTMLTextAreaElement).value.trim();
                        if (value) {
                          handleAnswer(value);
                        }
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-2">Press Enter to submit</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Results Step */}
      {currentStep === 'results' && mentorData && (
        <div className="space-y-8">
          {/* Header with Score and Sharing */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold ai-gradient-text">Your Career Assessment Results</h1>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {mentorData.profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h2 className="text-xl font-semibold">{mentorData.profile.name}</h2>
                  <p className="text-muted-foreground">Career Score: {mentorData.score}/100</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className="px-4 py-2 text-lg bg-success text-success-foreground">
                  {mentorData.profile.globalRank}
                </Badge>
                <Button variant="outline" onClick={handleShareProfile}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Recommended Courses
              </TabsTrigger>
              <TabsTrigger value="roadmap">
                <Target className="h-4 w-4 mr-2" />
                Learning Roadmap
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Users className="h-4 w-4 mr-2" />
                Profile Summary
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorData.courses.map((course, index) => (
                  <Card key={index} className="p-6 course-card">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                          {course.level}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{course.rating || '4.5'}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{course.courseTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
                        {course.duration && (
                          <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{course.price || '$84.99'}</span>
                        <Button asChild>
                          <a href={course.url} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Enroll Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Your Personalized Learning Roadmap
                </h3>
                <div className="space-y-4">
                  {mentorData.roadmap.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Profile Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Assessment Score</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-muted rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full"
                            style={{ width: `${mentorData.score}%` }}
                          />
                        </div>
                        <span className="font-semibold">{mentorData.score}/100</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Global Ranking</h4>
                      <Badge className="px-3 py-1">{mentorData.profile.globalRank}</Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentorData.profile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Recommended Courses</h4>
                      <ul className="space-y-1">
                        {mentorData.profile.recommendedCourses.map((course, index) => (
                          <li key={index} className="text-sm text-muted-foreground">• {course}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Share Your Success</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {mentorData.profile.shareableSummary}
                      </p>
                      <Button variant="outline" onClick={handleShareProfile} className="w-full">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share on Social Media
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button variant="outline" onClick={restartAssessment}>
              Take Assessment Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
