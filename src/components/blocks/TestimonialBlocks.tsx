import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    company: 'Google',
    avatar: 'SC',
    content: 'Journey2Code transformed my career completely. The interactive learning approach and real-world projects gave me the confidence to land my dream job at Google.',
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    company: 'Microsoft',
    avatar: 'MJ',
    content: 'The quality of instruction and the supportive community made all the difference. I went from zero coding knowledge to a full-stack developer in 8 months.',
    rating: 5
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'DevOps Engineer',
    company: 'Amazon',
    avatar: 'PP',
    content: 'The hands-on projects and mentorship program were incredible. I learned more in 6 months than I did in 2 years of self-study.',
    rating: 5
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    role: 'Mobile Developer',
    company: 'Spotify',
    avatar: 'AR',
    content: 'The curriculum is always up-to-date with industry trends. The React Native course helped me transition into mobile development seamlessly.',
    rating: 5
  },
  {
    id: 5,
    name: 'Emily Zhang',
    role: 'Data Scientist',
    company: 'Netflix',
    avatar: 'EZ',
    content: 'The AI and machine learning track exceeded my expectations. The practical approach to complex topics made everything click for me.',
    rating: 5
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Backend Developer',
    company: 'Uber',
    avatar: 'DK',
    content: 'The system design courses and scalability lessons were game-changers. I feel confident tackling any backend challenge now.',
    rating: 5
  }
];

export function TestimonialBlocks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50/50 to-pink-50/50 dark:from-orange-900/10 dark:to-pink-900/10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Student Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hear From Our Graduates
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Real stories from real students who transformed their careers through our comprehensive coding bootcamp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {featuredTestimonial && (
              <GlassCard className="p-8 h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(featuredTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6">
                      "{featuredTestimonial.content}"
                    </blockquote>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {featuredTestimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{featuredTestimonial.name}</div>
                    <div className="text-foreground/70">{featuredTestimonial.role}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{featuredTestimonial.company}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Current Testimonial */}
            <GlassCard className="p-6 h-80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(regularTestimonials[currentIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/90 leading-relaxed mb-6">
                  "{regularTestimonials[currentIndex]?.content}"
                </blockquote>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                  {regularTestimonials[currentIndex]?.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">{regularTestimonials[currentIndex]?.name}</div>
                  <div className="text-sm text-foreground/70">{regularTestimonials[currentIndex]?.role}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{regularTestimonials[currentIndex]?.company}</div>
                </div>
              </div>
            </GlassCard>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex items-center gap-2">
                {regularTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-500 w-6' 
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 p-6 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-foreground/70">Average Rating</div>
            </div>
            <div className="h-8 w-px bg-foreground/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2,500+</div>
              <div className="text-sm text-foreground/70">Reviews</div>
            </div>
            <div className="h-8 w-px bg-foreground/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-foreground/70">Would Recommend</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}