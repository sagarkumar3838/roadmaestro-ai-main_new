import { motion } from 'framer-motion';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

interface Stat {
  icon: any;
  value: string;
  label: string;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Learners',
    description: 'Students actively learning on our platform',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BookOpen,
    value: '200+',
    label: 'Courses Available',
    description: 'Comprehensive courses across all tech domains',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Award,
    value: '95%',
    label: 'Success Rate',
    description: 'Students who complete courses get jobs',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    value: '4.9/5',
    label: 'Average Rating',
    description: 'Based on thousands of student reviews',
    color: 'from-orange-500 to-red-500'
  }
];

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white/90 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join a community of learners who have transformed their careers through our comprehensive coding education platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-semibold text-white/90">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium">Live now: 2,847 students learning</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium">New course added this week</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}