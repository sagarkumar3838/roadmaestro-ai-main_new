import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Globe, Database, Shield } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: any;
  count: number;
  color: string;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern web technologies like React, Vue, and Angular',
    icon: Code,
    count: 45,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Build robust server-side applications and APIs',
    icon: Database,
    count: 38,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Create beautiful and intuitive user experiences',
    icon: Palette,
    count: 32,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Deploy and scale applications with modern tools',
    icon: Globe,
    count: 28,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile apps',
    icon: Zap,
    count: 25,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Protect applications and learn ethical hacking',
    icon: Shield,
    count: 22,
    color: 'text-red-600',
    gradient: 'from-red-500 to-pink-500'
  }
];

export function CategoryGrid() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 dark:from-slate-900 dark:via-blue-900/50 dark:to-indigo-900/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Explore Categories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover comprehensive courses across different technology domains and start your journey to becoming a skilled developer.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="group p-8 h-full hover:scale-105 transition-all duration-500 cursor-pointer">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-sm text-foreground/60 bg-muted px-3 py-1 rounded-full">
                        {category.count} courses
                      </span>
                    </div>
                    
                    <p className="text-foreground/70 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active learning path
                      </div>
                      <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Explore All Categories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}