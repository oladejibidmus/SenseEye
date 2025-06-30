import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Eye, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleRequestDemo = () => {
    // In a real app, this would open a demo request form or contact modal
    window.location.href = 'mailto:demo@senseeye.com?subject=Demo Request';
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-accent-primary to-accent-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Trusted by 500+ Eye Care Professionals</span>
            </div>
          </motion.div>

          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Ready to Transform Your Practice?
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of eye care professionals who trust SenseEye for accurate, 
            accessible visual field testing. Start your journey to better patient care today.
          </motion.p>

          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-white text-accent-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="tertiary"
              onClick={handleRequestDemo}
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              Request a Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">500+ Practices</h3>
              <p className="text-white/80 text-sm">Trusted by eye care professionals worldwide</p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">HIPAA Compliant</h3>
              <p className="text-white/80 text-sm">Enterprise-grade security and privacy protection</p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Clinical Grade</h3>
              <p className="text-white/80 text-sm">Validated accuracy comparable to traditional perimeters</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};