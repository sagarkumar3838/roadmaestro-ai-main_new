import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Sparkles, Gift } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
  };

  const benefits = [
    'Weekly coding tips and tutorials',
    'Exclusive access to new courses',
    'Industry insights and trends',
    'Job opportunities and career advice',
    'Free resources and templates'
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 text-center bg-white/10 backdrop-blur-xl border-white/20">
              {!isSubscribed ? (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                      <Gift className="w-4 h-4" />
                      Free Resources
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      Stay Ahead in Your Coding Journey
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                      Join 25,000+ developers who receive our weekly newsletter packed with coding tips, 
                      career advice, and exclusive resources.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      {benefits.slice(0, 3).map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {benefits.slice(3).map((benefit, index) => (
                        <motion.div
                          key={index + 3}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Subscribe
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-white/70 text-sm mt-4">
                      No spam, unsubscribe at any time. We respect your privacy.
                    </p>
                  </motion.form>

                  {/* Social Proof */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 flex items-center justify-center gap-8 text-white/80"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white"
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm">25,000+ subscribers</span>
                    </div>
                    <div className="h-4 w-px bg-white/30"></div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Sparkles key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                      <span className="text-sm ml-2">4.9/5 rating</span>
                    </div>
                  </motion.div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Welcome to the Community! 🎉
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    Thank you for subscribing! Check your email for a special welcome gift 
                    and your first weekly newsletter.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setIsSubscribed(false)}
                      className="px-6 py-3 bg-white/20 text-white border border-white/30 hover:bg-white/30 font-medium rounded-xl transition-all duration-300"
                    >
                      Subscribe Another Email
                    </button>
                    <button className="px-6 py-3 bg-white text-purple-600 hover:bg-white/90 font-medium rounded-xl transition-all duration-300">
                      Explore Courses
                    </button>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}