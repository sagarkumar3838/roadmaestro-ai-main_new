import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'support';
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What makes Journey2Code different from other coding bootcamps?',
    answer: 'Journey2Code combines AI-powered personalized learning with real-world project experience. Our curriculum is constantly updated based on industry trends, and each student gets a dedicated mentor throughout their journey.',
    category: 'general'
  },
  {
    id: 2,
    question: 'Do I need any prior coding experience to start?',
    answer: 'No prior experience is required! Our curriculum starts from the absolute basics and gradually builds up your skills. We have successfully trained complete beginners who are now working at top tech companies.',
    category: 'general'
  },
  {
    id: 3,
    question: 'What is the job placement rate for graduates?',
    answer: 'Our graduates have a 95% job placement rate within 6 months of completion. We provide dedicated career support, interview preparation, and have partnerships with over 500 tech companies.',
    category: 'general'
  },
  {
    id: 4,
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not completely satisfied with the course within the first 30 days, we\'ll provide a full refund, no questions asked.',
    category: 'pricing'
  },
  {
    id: 5,
    question: 'Are there any financing options available?',
    answer: 'We offer flexible payment plans including monthly installments and income-share agreements (ISA). You can also apply for scholarships based on merit and need.',
    category: 'pricing'
  },
  {
    id: 6,
    question: 'What technologies and frameworks do you teach?',
    answer: 'We cover modern web technologies including React, Node.js, Python, JavaScript, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and more. Our curriculum is updated quarterly to include the latest industry trends.',
    category: 'technical'
  },
  {
    id: 7,
    question: 'How much time should I dedicate to studying each week?',
    answer: 'We recommend 15-20 hours per week for optimal progress. However, our flexible schedule allows you to learn at your own pace. Some students complete the program in 6 months, while others take up to 12 months.',
    category: 'technical'
  },
  {
    id: 8,
    question: 'Do you provide career support after graduation?',
    answer: 'Absolutely! Our career support is lifetime. We help with resume building, interview preparation, salary negotiation, and provide ongoing mentorship even after you land your first job.',
    category: 'support'
  }
];

const categories = [
  { id: 'all', label: 'All Questions', count: faqs.length },
  { id: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length },
  { id: 'pricing', label: 'Pricing', count: faqs.filter(f => f.category === 'pricing').length },
  { id: 'technical', label: 'Technical', count: faqs.filter(f => f.category === 'technical').length },
  { id: 'support', label: 'Support', count: faqs.filter(f => f.category === 'support').length },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/30 dark:to-pink-900/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Find answers to the most common questions about our coding bootcamp, curriculum, and career support.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/50 dark:bg-white/10 text-foreground/70 hover:bg-white/70 dark:hover:bg-white/20 hover:text-foreground'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/20 dark:hover:bg-white/5 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openFAQ === faq.id ? (
                          <Minus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <Plus className="w-5 h-5 text-foreground/60" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-4"></div>
                            <p className="text-foreground/80 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GlassCard className="inline-block p-8">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Still have questions?
            </h4>
            <p className="text-foreground/70 mb-6">
              Our team is here to help you make the right decision for your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105">
                Schedule a Call
              </button>
              <button className="px-6 py-3 bg-white/20 dark:bg-white/10 text-foreground border border-white/20 hover:bg-white/30 dark:hover:bg-white/20 font-medium rounded-xl transition-all duration-300">
                Live Chat Support
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}