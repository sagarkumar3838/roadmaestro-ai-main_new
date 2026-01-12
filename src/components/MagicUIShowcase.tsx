import React, { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { WordRotate } from "@/components/ui/word-rotate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { Marquee } from "@/components/ui/marquee";
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  BookOpen, 
  Star,
  Heart,
  Sparkles,
  Rocket,
  Brain,
  Target
} from "lucide-react";

const MagicUIShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const techStack = [
    { name: "React", icon: Code, color: "text-blue-500" },
    { name: "TypeScript", icon: Code, color: "text-blue-600" },
    { name: "Tailwind CSS", icon: Sparkles, color: "text-cyan-500" },
    { name: "Framer Motion", icon: Zap, color: "text-purple-500" },
    { name: "shadcn/ui", icon: Star, color: "text-green-500" },
    { name: "Magic UI", icon: Rocket, color: "text-orange-500" },
  ];

  const courseTopics = [
    "Web Development", "Data Science", "AI & Machine Learning", 
    "Cloud Computing", "Cybersecurity", "Mobile Development",
    "DevOps", "Blockchain", "Game Development", "UI/UX Design"
  ];

  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section with Word Rotate */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold ai-gradient-text">
              Welcome to{" "}
              <WordRotate 
                words={["RoadMaestro AI", "Your Learning Journey", "The Future", "Innovation"]}
                className="text-5xl font-bold ai-gradient-text"
              />
            </h1>
            <div className="text-xl text-muted-foreground">
              <TypingAnimation 
                text="Discover amazing animated components that bring your learning experience to life!"
                duration={30}
                className="text-xl text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Shimmer Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <ShimmerButton
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              shimmerColor="#ffffff"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Start Learning
            </ShimmerButton>
            <ShimmerButton
              className="bg-gradient-to-r from-green-600 to-blue-600"
              shimmerColor="#ffffff"
            >
              <Brain className="mr-2 h-4 w-4" />
              Explore AI
            </ShimmerButton>
            <ShimmerButton
              className="bg-gradient-to-r from-purple-600 to-pink-600"
              shimmerColor="#ffffff"
            >
              <Target className="mr-2 h-4 w-4" />
              Set Goals
            </ShimmerButton>
          </div>
        </div>

        {/* Magic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Learning",
              description: "Personalized learning paths powered by artificial intelligence",
              icon: Brain,
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
            {
              title: "Interactive Courses",
              description: "Engaging content with hands-on projects and real-world applications",
              icon: BookOpen,
              gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            },
            {
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed analytics and insights",
              icon: Target,
              gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            },
          ].map((card, index) => (
            <MagicCard
              key={index}
              className="h-64"
              gradient={card.gradient}
              gradientOpacity={0.1}
            >
              <div className="text-center space-y-4">
                <card.icon className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            </MagicCard>
          ))}
        </div>

        {/* Animated Beam Section */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle>Connected Learning Paths</CardTitle>
            <CardDescription>
              See how different technologies connect in your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={containerRef} className="relative h-64 flex items-center justify-between">
              <div 
                ref={fromRef}
                className="flex flex-col items-center space-y-2 p-4 bg-primary/10 rounded-lg"
              >
                <Code className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Frontend</span>
              </div>
              
              <div 
                ref={toRef}
                className="flex flex-col items-center space-y-2 p-4 bg-accent/10 rounded-lg"
              >
                <Database className="h-8 w-8 text-accent" />
                <span className="text-sm font-medium">Backend</span>
              </div>
              
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={fromRef}
                toRef={toRef}
                curvature={30}
                duration={3}
                gradientStartColor="#3b82f6"
                gradientStopColor="#f59e0b"
              />
            </div>
          </CardContent>
        </Card>

        {/* Marquee Section */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Technologies</CardTitle>
            <CardDescription>
              Trending technologies in the learning community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Marquee className="[--duration:20s]">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 mx-4">
                  <tech.icon className={`h-6 w-6 ${tech.color}`} />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </Marquee>
          </CardContent>
        </Card>

        {/* Course Topics with Particles */}
        <Card className="relative overflow-hidden">
          <Particles
            className="absolute inset-0"
            quantity={50}
            ease={80}
            color="#3b82f6"
            size={0.4}
          />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Available Course Topics</span>
            </CardTitle>
            <CardDescription>
              Choose from our comprehensive range of learning paths
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {courseTopics.map((topic, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Community Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Real-time Collaboration</h4>
                <p className="text-sm text-muted-foreground">
                  Work together with peers on projects and assignments
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">AI Mentorship</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized guidance from our AI learning assistant
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Progress Gamification</h4>
                <p className="text-sm text-muted-foreground">
                  Earn badges and achievements as you complete milestones
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Learning Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Interactive Code Editor</h4>
                <p className="text-sm text-muted-foreground">
                  Practice coding with our built-in IDE and instant feedback
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Smart Flashcards</h4>
                <p className="text-sm text-muted-foreground">
                  AI-generated flashcards based on your learning progress
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Video Learning</h4>
                <p className="text-sm text-muted-foreground">
                  High-quality video content with interactive transcripts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-8">
            <h2 className="text-3xl font-bold mb-4 ai-gradient-text">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of learners who are already building their future with RoadMaestro AI. 
              Start with personalized learning paths and achieve your goals faster.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ShimmerButton
                className="bg-gradient-to-r from-primary to-accent text-white"
                shimmerColor="#ffffff"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Get Started Free
              </ShimmerButton>
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default MagicUIShowcase;


