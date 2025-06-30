import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, Target, Shield, Users, BarChart3 } from 'lucide-react';

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

export const ContentSection: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-background-primary">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
        <motion.h2 
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl text-4xl font-medium lg:text-5xl text-text-primary"
        >
          The SenseEye ecosystem brings together clinical excellence and modern technology.
        </motion.h2>
        
        <div className="relative">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 space-y-4 md:w-1/2"
          >
            <motion.p variants={item} className="text-text-secondary text-lg">
              SenseEye is evolving to be more than just visual field testing. <span className="text-text-primary font-medium">It supports an entire healthcare ecosystem</span> — from clinical diagnostics to patient management and practice optimization.
            </motion.p>
            <motion.p variants={item} className="text-text-secondary">
              Our platform integrates seamlessly with existing workflows while providing cutting-edge technology that enhances diagnostic accuracy and improves patient outcomes.
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">Lightning Fast</h3>
                </div>
                <p className="text-text-secondary text-sm">
                  SITA-equivalent algorithms reduce testing time while maintaining clinical accuracy, improving patient comfort and workflow efficiency.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-accent-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">Clinical Grade</h3>
                </div>
                <p className="text-text-secondary text-sm">
                  Validated algorithms deliver precision comparable to traditional perimeters, trusted by eye care professionals worldwide.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-success" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">Precise Results</h3>
                </div>
                <p className="text-text-secondary text-sm">
                  Advanced reliability metrics and quality control ensure consistent, accurate results for confident clinical decision-making.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-info/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-info" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">Smart Analytics</h3>
                </div>
                <p className="text-text-secondary text-sm">
                  Comprehensive reporting and trend analysis help track patient progression and optimize treatment strategies.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
            <div aria-hidden className="absolute inset-0 hidden from-transparent to-background-primary to-55% md:block bg-gradient-to-l z-1"></div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl border border-border-default/50 border-dotted p-4 bg-background-secondary/50"
            >
              {/* Visual Field Results Dashboard */}
              <div className="rounded-xl bg-background-secondary p-6 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Visual Field Analysis Dashboard</h3>
                  <p className="text-text-secondary text-sm">Real-time test results and patient analytics</p>
                </div>
                
                {/* Mock dashboard content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-background-tertiary rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-success">94%</div>
                      <div className="text-xs text-text-tertiary">Reliability</div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-text-primary">-2.4</div>
                      <div className="text-xs text-text-tertiary">MD (dB)</div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-warning">3.2</div>
                      <div className="text-xs text-text-tertiary">PSD (dB)</div>
                    </div>
                  </div>
                  
                  {/* Visual field grid */}
                  <div className="bg-black rounded-lg p-4">
                    <div className="grid grid-cols-8 gap-1 w-full aspect-square max-w-48 mx-auto">
                      {Array.from({ length: 64 }).map((_, i) => {
                        const opacity = Math.random() > 0.3 ? 0.8 : 0.2;
                        const color = Math.random() > 0.7 ? '#22c55e' : Math.random() > 0.4 ? '#f59e0b' : '#ef4444';
                        return (
                          <div
                            key={i}
                            className="rounded-sm"
                            style={{ backgroundColor: color, opacity }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Test Duration: 4:32</span>
                    <span className="text-success">✓ Completed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};