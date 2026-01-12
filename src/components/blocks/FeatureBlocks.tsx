import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Users, Trophy, Clock, Target } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface Feature {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
  highlight?: boolean;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Interactive Learning',
    description: 'Hands-on coding exercises with real-time feedback',
    benefits: ['Live code editor', 'Instant feedback', 'Step-by-step guidance'],
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Learn with thousands of developers worldwide',
    benefits: ['Peer support', 'Code reviews', 'Study groups'],
    highlight: true,
  },
  {
    icon: Trophy,
    title: 'Industry Recognition',
    description: 'Certificates valued by top tech companies',
    benefits: ['Verified certificates', 'Portfolio projects', 'Job placement'],
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace, anytime, anywhere',
    benefits: ['Self-paced learning', 'Mobile access', 'Offline content'],
  },
  {
    icon: Target,
    title: 'Personalized Path',
    description: 'AI-powered recommendations based on your goals',
    benefits: ['Custom curriculum', 'Skill assessment', 'Progress tracking'],
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Content reviewed by industry experts',
    benefits: ['Expert-reviewed', 'Up-to-date content', 'Best practices'],
  },
];

export function FeatureBlocks() {
  return (
    <section className="py-24 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven learning methodologies to give you the best coding education experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard 
                  className={`group p-8 h-full hover:scale-105 transition-all duration-500 ${
                    feature.highlight 
                      ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20' 
                      : ''
                  }`}
                >
                  {/* Highlight Badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${
                    feature.highlight 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-500'
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    feature.highlight
                      ? 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'
                      : 'bg-gradient-to-br from-gray-500/5 via-transparent to-gray-500/5'
                  }`} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GlassCard className="inline-block p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">Ready to start your journey?</h4>
                <p className="text-sm text-foreground/70">Join thousands of successful developers</p>
              </div>
              <button className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}