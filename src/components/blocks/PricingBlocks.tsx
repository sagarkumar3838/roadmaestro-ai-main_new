import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Rocket, Star } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  originalPrice?: string;
  icon: any;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  gradient: string;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for beginners starting their coding journey',
    price: 'Free',
    period: 'forever',
    icon: Zap,
    features: [
      'Access to 5 beginner courses',
      'Basic coding exercises',
      'Community forum access',
      'Progress tracking',
      'Mobile app access'
    ],
    notIncluded: [
      'Advanced courses',
      'Personal mentorship',
      'Certificate of completion',
      'Job placement assistance'
    ],
    gradient: 'from-gray-600 to-gray-700',
    buttonText: 'Get Started Free'
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Most popular choice for serious learners',
    price: '$49',
    period: 'per month',
    originalPrice: '$79',
    icon: Crown,
    features: [
      'Access to all 200+ courses',
      'Interactive coding projects',
      'Personal mentor assigned',
      'Weekly 1-on-1 sessions',
      'Certificate of completion',
      'Priority community support',
      'Downloadable resources',
      'Mobile app access',
      'Job interview preparation'
    ],
    popular: true,
    gradient: 'from-blue-600 to-purple-600',
    buttonText: 'Start Pro Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: '$199',
    period: 'per month',
    icon: Rocket,
    features: [
      'Everything in Professional',
      'Team management dashboard',
      'Custom learning paths',
      'Dedicated account manager',
      'Advanced analytics',
      'API access',
      'White-label options',
      'Priority support',
      'Custom integrations',
      'Bulk certificates'
    ],
    gradient: 'from-purple-600 to-pink-600',
    buttonText: 'Contact Sales'
  }
];

export function PricingBlocks() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/30">
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
            <Crown className="w-4 h-4" />
            Choose Your Plan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Invest in Your Future
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Choose the perfect plan to accelerate your coding journey. All plans include lifetime access to course updates.
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium text-sm">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-foreground/70 hover:text-foreground font-medium text-sm">
              Annual (Save 20%)
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
              >
                <GlassCard 
                  className={`p-8 h-full ${
                    plan.popular 
                      ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 scale-105' 
                      : ''
                  } hover:scale-105 transition-all duration-500`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-foreground/70 text-sm mb-6">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.period && (
                          <span className="text-foreground/60 text-sm">/{plan.period}</span>
                        )}
                      </div>
                      {plan.originalPrice && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-foreground/50 line-through text-sm">{plan.originalPrice}</span>
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                            Save 38%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.notIncluded && (
                      <>
                        <h4 className="font-semibold text-foreground/60 text-sm uppercase tracking-wide mt-6">Not included:</h4>
                        <ul className="space-y-3">
                          {plan.notIncluded.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground/60">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button 
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20 hover:border-foreground/30'
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  {/* Additional Info */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-foreground/60">
                      {plan.id === 'starter' && 'No credit card required'}
                      {plan.id === 'pro' && '14-day free trial • Cancel anytime'}
                      {plan.id === 'enterprise' && 'Custom pricing available'}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <GlassCard className="inline-block p-6">
            <div className="flex items-center gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                30-day money-back guarantee
              </div>
              <div className="h-4 w-px bg-foreground/20"></div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
              <div className="h-4 w-px bg-foreground/20"></div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                24/7 support
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}