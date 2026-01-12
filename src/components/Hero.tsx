import { motion, Variants } from 'framer-motion';
import { ArrowRight, Play, Code2, Sparkles, Users, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SignupModal from './SignupModal';
import { AnimatedAuthButton } from '@/components/ui/animated-auth-button';
// import ThreeBackground from './three/SimpleThreeBackground';

// Stats Component
function StatsCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6 rounded-2xl bg-white/5 dark:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-sm text-foreground/70">{label}</div>
    </motion.div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, delay }: { 
  icon: any; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="group p-8 rounded-3xl bg-white/5 dark:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Hero() {
  const { user } = useAuth();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  return (
    <>
      {/* Three.js Background - Commented out for stability */}
      {/* <ThreeBackground /> */}
      
      {/* CSS-based animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: '10%',
            right: '10%',
          }}
        />
        
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-600/20 dark:from-pink-400/10 dark:to-orange-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: '50%',
            left: '5%',
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-500/10 dark:from-black/20 dark:via-transparent dark:to-blue-500/5" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              {/* Main Heading */}
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="block text-foreground mb-4">Shaping</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent">
                    Developers
                  </span>
                  <span className="block text-foreground">Who Inspire</span>
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    the World
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0"
              >
                Master coding skills through interactive challenges, build impressive projects, 
                and showcase your expertise to land your dream job in the tech industry.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 items-center lg:items-start justify-center lg:justify-start mb-12"
              >
                {!user ? (
                  <>
                    <SignupModal>
                      <AnimatedAuthButton
                        variant="signup"
                        className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]"
                      >
                        Start Learning
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </AnimatedAuthButton>
                    </SignupModal>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-8 py-4 text-lg font-semibold bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-foreground rounded-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 min-w-[200px]"
                    >
                      <Play className="inline mr-2 w-5 h-5" />
                      Watch Demo
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl transition-all duration-300 min-w-[100px]"
                  >
                    Continue Learning
                    <ArrowRight className="ml-2 mt-1 w-5 h-5 group-hover:translate-x-1 transition-transform   "/>
                  </motion.button>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <StatsCard number="50K+" label="Active Learners" delay={0.1} />
                <StatsCard number="200+" label="Coding Challenges" delay={0.2} />
                <StatsCard number="95%" label="Job Success Rate" delay={0.3} />
                <StatsCard number="24/7" label="AI Support" delay={0.4} />
              </motion.div>
            </motion.div>

            {/* Right side - Video */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 lg:h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-cyan-500/10 dark:from-white/5 dark:to-cyan-500/5 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
                <video
                  className="w-full h-full object-cover rounded-3xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/Assests/video/Training Startup Video in Green White 2D Illustration Style.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video overlay with play button */}
              {/* <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Journey2Code</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Experience the future of coding education with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Code2}
              title="Interactive Coding"
              description="Learn by doing with our hands-on coding challenges and real-world projects that build practical skills."
              delay={0.1}
            />
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered Learning"
              description="Get personalized feedback and guidance from our advanced AI mentor that adapts to your learning style."
              delay={0.2}
            />
            <FeatureCard
              icon={Users}
              title="Community Support"
              description="Join a vibrant community of developers, share knowledge, and collaborate on exciting projects."
              delay={0.3}
            />
            <FeatureCard
              icon={Award}
              title="Industry Recognition"
              description="Earn certificates and build a portfolio that showcases your skills to potential employers."
              delay={0.4}
            />
            <FeatureCard
              icon={Play}
              title="Video Tutorials"
              description="Access comprehensive video content covering everything from basics to advanced concepts."
              delay={0.5}
            />
            <FeatureCard
              icon={ArrowRight}
              title="Career Guidance"
              description="Get expert career advice and job placement assistance to launch your tech career successfully."
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </>
  );
}