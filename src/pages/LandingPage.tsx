import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import FAQSection from '../components/ui/FAQSection';
import {
  Eye,
  Menu,
  X,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  CheckCircle,
  Smartphone,
  Brain,
  Shield,
  Clock,
  Users,
  Zap,
  Globe,
  Lock,
  Play,
  Monitor,
  Headphones,
  Award,
} from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const features: Feature[] = [
  {
    id: "accessible-anywhere",
    icon: Smartphone,
    title: "Accessible Anywhere",
    description: "Built for mobile and desktop. Test your visual field from any device, anywhere you have privacy and quiet."
  },
  {
    id: "ai-precision",
    icon: Brain,
    title: "AI Precision",
    description: "Powered by machine learning accuracy. Our algorithms provide clinically validated results you can trust."
  },
  {
    id: "clinical-grade",
    icon: Award,
    title: "Clinical Grade",
    description: "Validated by experts and peer-reviewed. Meets the same standards as traditional perimetry equipment."
  },
  {
    id: "fast-private",
    icon: Lock,
    title: "Fast & Private",
    description: "No data leaves your device. Complete privacy with results available in minutes, not days."
  },
  {
    id: "wcag-compliant",
    icon: Users,
    title: "WCAG-Compliant",
    description: "Inclusive for users with impairments. Designed with accessibility at its core for everyone."
  },
  {
    id: "easy-onboarding",
    icon: Zap,
    title: "Easy Onboarding",
    description: "No account required. Start testing immediately with our streamlined, intuitive interface."
  }
];

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. Lisa Cheng",
    role: "Ophthalmologist, Vision Medical Center",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "SenseEye gave me back control of my vision care. I tested at home, and it felt like magic. The accuracy rivals our clinic equipment.",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "Dr. Michael Rodriguez",
    role: "Glaucoma Specialist, Eye Institute",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "The convenience factor is incredible. My patients can monitor their visual fields between visits, giving us better data for treatment decisions.",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Sarah Martinez",
    role: "Glaucoma Patient",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "As someone with glaucoma, regular monitoring is crucial. SenseEye lets me test monthly instead of waiting for appointments. It's been life-changing.",
    rating: 5
  }
];

const navigationLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleSeeDemo = () => {
    scrollToSection('#how-it-works');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b" 
           style={{ backgroundColor: 'rgba(250, 250, 249, 0.95)', borderColor: '#E5E5E5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: '#FF6A1A' }}>
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold" style={{ color: '#0A1A2F' }}>SenseEye</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="font-medium transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#0A1A2F' }}
                >
                  {link.label}
                </button>
              ))}
              <Button 
                onClick={handleGetStarted}
                className="text-white font-medium px-6 py-2"
                style={{ backgroundColor: '#FF6A1A' }}
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#0A1A2F' }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
              style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF9' }}
            >
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left font-medium py-2 transition-colors"
                    style={{ color: '#0A1A2F' }}
                  >
                    {link.label}
                  </button>
                ))}
                <Button 
                  onClick={handleGetStarted}
                  className="w-full text-white font-medium"
                  style={{ backgroundColor: '#FF6A1A' }}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    style={{ color: '#0A1A2F' }}>
                  Visual Field Testing—
                  <span style={{ color: '#FF6A1A' }}>Anywhere, Anytime.</span>
                </h1>
                <p className="text-xl leading-relaxed max-w-2xl"
                   style={{ color: '#4A5568' }}>
                  SenseEye brings accurate, AI-powered field tests to your device. 
                  No clinic visit needed. Get clinically validated results in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="text-white font-medium text-lg px-8 py-4"
                  style={{ backgroundColor: '#FF6A1A' }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="tertiary" 
                  size="lg" 
                  onClick={handleSeeDemo}
                  className="font-medium text-lg px-8 py-4 border-2"
                  style={{ color: '#0A1A2F', borderColor: '#0A1A2F' }}
                >
                  See How It Works
                </Button>
              </div>
            </motion.div>

            {/* Right Column - App Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm">
                {/* Phone Frame */}
                <div className="relative rounded-3xl p-2 shadow-2xl"
                     style={{ backgroundColor: '#0A1A2F' }}>
                  <div className="rounded-2xl overflow-hidden"
                       style={{ backgroundColor: '#1A1A1A' }}>
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 py-2 text-white text-sm">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="px-6 py-8 space-y-6">
                      {/* Header */}
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                             style={{ backgroundColor: '#FF6A1A' }}>
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">Visual Field Test</h3>
                        <p className="text-gray-400 text-sm">Right Eye - 24-2 Protocol</p>
                      </div>

                      {/* Test Grid Visualization */}
                      <div className="bg-black rounded-lg p-6">
                        <div className="grid grid-cols-8 gap-1">
                          {Array.from({ length: 64 }, (_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: Math.random() > 0.7 ? '#FF6A1A' : 
                                                Math.random() > 0.5 ? '#22c55e' : '#374151'
                              }}
                            />
                          ))}
                        </div>
                        {/* Central fixation point */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">73%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="h-2 rounded-full" 
                               style={{ backgroundColor: '#FF6A1A', width: '73%' }}></div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="text-center">
                        <p className="text-gray-300 text-sm">
                          Look at the center dot and press when you see a flash
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#0A1A2F' }}>
              How SenseEye Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto"
               style={{ color: '#4A5568' }}>
              Three simple steps to accurate visual field testing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Smartphone,
                title: "Start Test",
                description: "Launch from any device. No downloads or accounts required."
              },
              {
                step: "2",
                icon: Headphones,
                title: "Follow Prompts",
                description: "Voice-guided, accessible instructions walk you through each step."
              },
              {
                step: "3",
                icon: CheckCircle,
                title: "Get Results",
                description: "Clinically accurate reports in minutes, ready to share with your doctor."
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                       style={{ backgroundColor: '#FF6A1A' }}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                       style={{ backgroundColor: '#0A1A2F' }}>
                    {step.step}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold"
                      style={{ color: '#0A1A2F' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#4A5568' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#0A1A2F' }}>
              Why Choose SenseEye?
            </h2>
            <p className="text-xl max-w-2xl mx-auto"
               style={{ color: '#4A5568' }}>
              Advanced technology meets accessibility for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-8 text-center space-y-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        style={{ backgroundColor: 'white', borderColor: '#E5E5E5' }}>
                    <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                         style={{ backgroundColor: 'rgba(255, 106, 26, 0.1)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#FF6A1A' }} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold"
                          style={{ color: '#0A1A2F' }}>
                        {feature.title}
                      </h3>
                      <p style={{ color: '#4A5568' }}>
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 font-medium"
                         style={{ color: '#FF6A1A' }}>
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Available Now</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Trusted by Patients and Professionals
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what people are saying about SenseEye
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="p-12 text-center space-y-6">
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-xl text-gray-300 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={`${testimonials[currentTestimonial].name} profile picture`}
                    className="w-16 h-16 rounded-full object-cover ring-2"
                    style={{ ringColor: '#FF6A1A' }}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-gray-600 text-white hover:bg-gray-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-white' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full border border-gray-600 text-white hover:bg-gray-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: 'white' }}>
        <FAQSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: 'rgba(255, 106, 26, 0.05)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#0A1A2F' }}>
              Ready to Transform Your Vision Care?
            </h2>
            <p className="text-xl"
               style={{ color: '#4A5568' }}>
              Join thousands who trust SenseEye for accurate, convenient visual field testing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="text-white font-medium text-lg px-8 py-4"
                style={{ backgroundColor: '#FF6A1A' }}
              >
                <Shield className="h-5 w-5 mr-2" />
                Start Free Test
              </Button>
              <Button 
                variant="tertiary" 
                size="lg"
                className="font-medium text-lg px-8 py-4 border-2"
                style={{ color: '#0A1A2F', borderColor: '#0A1A2F' }}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8"
              style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: '#FF6A1A' }}>
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">SenseEye</h3>
              </div>
              <p className="text-gray-300 max-w-md">
                Advanced visual field testing platform that brings clinical-grade accuracy 
                to any device, anywhere.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {navigationLinks.map(link => (
                  <li key={link.label}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href="mailto:contact@senseeye.com" 
                       className="text-gray-300 hover:text-white transition-colors">
                      contact@senseeye.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 SenseEye. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">🔧 Built with</span>
              <span className="font-medium" style={{ color: '#FF6A1A' }}>Bolt.new</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};