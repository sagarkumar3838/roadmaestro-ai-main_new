import { useState, useEffect } from 'react';
import { 
  Brain, 
  Youtube,
  Linkedin,
  MessageCircle,
  Github,
} from 'lucide-react';
import { auth } from '@/integrations/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { CSSParticles } from "@/components/ui/css-particles";
import { CategoryGrid } from "@/components/blocks/CategoryGrid";
import { FeatureBlocks } from "@/components/blocks/FeatureBlocks";
import { StatsSection } from "@/components/blocks/StatsSection";
import { TestimonialBlocks } from "@/components/blocks/TestimonialBlocks";
import { PricingBlocks } from "@/components/blocks/PricingBlocks";
import { FAQSection } from "@/components/blocks/FAQSection";
import { NewsletterSection } from "@/components/blocks/NewsletterSection";
import { CTASection } from "@/components/blocks/CTASection";

export default function LandingPage() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 text-foreground relative overflow-hidden">
      {/* CSS-based animated background */}
      <CSSParticles />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 dark:from-pink-400/10 dark:to-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 dark:from-green-400/10 dark:to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <Navbar user={user} />

      {/* Hero Section */}
      <Hero />

      {/* Category Grid Section */}
      <CategoryGrid />

      {/* Feature Blocks Section */}
      <FeatureBlocks />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialBlocks />

      {/* Pricing Section */}
      <PricingBlocks />

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <CTASection onGetStarted={handleGetStarted} />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-900 dark:to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold">Journey2Code</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your comprehensive career development platform powered by AI.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors p-2 bg-gray-800 dark:bg-slate-800 rounded-lg hover:bg-gray-700 dark:hover:bg-slate-700">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Product</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Resume Builder</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">ATS Checker</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">AI Assistant</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Learning Paths</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Career Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Company</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Press</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors font-medium">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 font-medium">&copy; 2024 Journey2Code. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium">Refund Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}