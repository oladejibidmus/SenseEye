import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Eye,
  Users,
  BarChart3,
  Menu,
  X,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  CheckCircle,
  Target,
  Brain,
  Shield,
  Activity,
  Calendar,
  FileText,
  Settings,
  Clock,
  TrendingUp,
  Zap,
  Database,
  Lock,
  Play,
  Monitor,
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
    id: "visual-field-testing",
    icon: Eye,
    title: "Advanced Visual Field Testing",
    description: "Comprehensive 24-2, 30-2, and 10-2 testing protocols with SITA Standard and SITA Fast strategies. Real-time reliability monitoring and customizable test parameters."
  },
  {
    id: "patient-management",
    icon: Users,
    title: "Complete Patient Management",
    description: "Streamlined patient records with medical history tracking, appointment scheduling, and automated test result organization. Secure database with HIPAA compliance."
  },
  {
    id: "analytics-reporting",
    icon: BarChart3,
    title: "Intelligent Analytics & Reporting",
    description: "Generate comprehensive PDF reports with trend analysis, reliability indices, and visual field progression maps. Export data for insurance and referral purposes."
  },
  {
    id: "real-time-dashboard",
    icon: Activity,
    title: "Real-time Dashboard",
    description: "Monitor daily test volumes, reliability scores, and patient statistics with customizable time periods. Track practice performance and identify trends."
  },
  {
    id: "advanced-parameters",
    icon: Settings,
    title: "Advanced Test Configuration",
    description: "Fine-tune stimulus parameters, background luminance, and reliability thresholds. Support for both monocular and binocular testing protocols."
  },
  {
    id: "secure-cloud",
    icon: Shield,
    title: "Secure Cloud Platform",
    description: "Enterprise-grade security with encrypted data storage, automatic backups, and role-based access control. Access your data anywhere, anytime."
  }
];

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. Sarah Chen",
    role: "Ophthalmologist, Vision Care Center",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "VisionTest has transformed our visual field testing workflow. The reliability monitoring and automated reporting save us hours each week, and our patients appreciate the streamlined experience.",
    rating: 5
  },
  {
    id: "testimonial-2",
    name: "Dr. Michael Rodriguez",
    role: "Glaucoma Specialist, Eye Institute",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "The comprehensive analytics and trend analysis features help us make better clinical decisions. The platform's reliability indices are incredibly accurate and detailed.",
    rating: 5
  },
  {
    id: "testimonial-3",
    name: "Jennifer Martinez, COT",
    role: "Ophthalmic Technician, Advanced Eye Care",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    quote: "As an ophthalmic tech, this platform makes my job so much easier. Patient management is intuitive, and the test setup process is incredibly efficient.",
    rating: 5
  }
];

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

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

  const handleWatchDemo = () => {
    navigate('/test-supabase');
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background-secondary/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">VisionTest</h1>
              <span className="text-xs text-text-tertiary bg-background-tertiary px-2 py-1 rounded">Clinical Platform</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <Button onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-text-primary" /> : <Menu className="h-6 w-6 text-text-primary" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border-subtle bg-background-secondary"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <Button onClick={handleGetStarted} className="w-full mt-4">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Professional Visual Field Testing{" "}
                <span className="text-accent-primary">Platform</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Comprehensive clinical platform for ophthalmic technicians featuring advanced 
                visual field testing, patient management, and detailed analytics to enhance 
                diagnostic accuracy and streamline your practice workflow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-6">
                <Target className="h-5 w-5 mr-2" />
                Start Testing
              </Button>
              <Button variant="secondary" size="lg" onClick={handleWatchDemo} className="text-lg px-8 py-6">
                <Play className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Hero App Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-background-secondary rounded-2xl p-8 max-w-6xl mx-auto border border-border-subtle shadow-medium">
                {/* Mock Dashboard Interface */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">VisionTest Dashboard</h3>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-error rounded-full"></div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-tertiary text-sm">Total Patients</p>
                          <p className="text-2xl font-bold text-text-primary">127</p>
                        </div>
                        <Users className="w-8 h-8 text-accent-primary" />
                      </div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-tertiary text-sm">Tests Today</p>
                          <p className="text-2xl font-bold text-text-primary">23</p>
                        </div>
                        <Eye className="w-8 h-8 text-accent-secondary" />
                      </div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-tertiary text-sm">Avg Reliability</p>
                          <p className="text-2xl font-bold text-text-primary">96%</p>
                        </div>
                        <Target className="w-8 h-8 text-success" />
                      </div>
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-tertiary text-sm">This Month</p>
                          <p className="text-2xl font-bold text-text-primary">342</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-info" />
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="bg-background-tertiary rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-text-primary">Test Volume Trends</h4>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-accent-secondary rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-background-primary rounded-lg flex items-end justify-between px-4 py-2">
                      {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                        <div
                          key={index}
                          className="bg-accent-primary rounded-t"
                          style={{ height: `${height}%`, width: '12%' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Complete Clinical Testing Suite
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Everything ophthalmic technicians need for professional visual field testing
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
                  <Card className="h-full hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-accent-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-success text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>Available Now</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
                See VisionTest in Action
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Experience the complete workflow from patient setup to test results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Patient Management</h3>
                <p className="text-text-secondary text-sm">Add patients, manage records, and schedule appointments</p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Settings className="h-6 w-6 text-accent-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Test Configuration</h3>
                <p className="text-text-secondary text-sm">Configure test parameters and advanced settings</p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Results & Analytics</h3>
                <p className="text-text-secondary text-sm">Generate reports and analyze test data</p>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleWatchDemo}>
                <Monitor className="h-5 w-5 mr-2" />
                Try Live Demo
              </Button>
              <Button variant="secondary" size="lg" onClick={handleGetStarted}>
                <Database className="h-5 w-5 mr-2" />
                Test Database
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Trusted by Eye Care Professionals
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              See what ophthalmologists and ophthalmic technicians are saying
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <Card>
              <div className="p-12 text-center space-y-6">
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                
                <blockquote className="text-xl text-text-secondary leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={`${testimonials[currentTestimonial].name} profile picture`}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-accent-primary/20"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-text-primary">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-text-tertiary">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="tertiary" size="sm" onClick={prevTestimonial}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-accent-primary' : 'bg-border-default'
                    }`}
                  />
                ))}
              </div>
              
              <Button variant="tertiary" size="sm" onClick={nextTestimonial}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Ready to Enhance Your Practice?
            </h2>
            <p className="text-xl text-text-secondary">
              Join ophthalmic professionals who trust VisionTest for accurate, 
              efficient visual field testing and patient management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted}>
                <Shield className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" onClick={handleWatchDemo}>
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-secondary py-12 px-4 sm:px-6 lg:px-8 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">VisionTest</h3>
              </div>
              <p className="text-text-secondary max-w-md">
                Professional visual field testing platform designed for modern 
                ophthalmology practices and ophthalmic technicians.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg hover:bg-background-tertiary transition-colors">
                  <Twitter className="h-5 w-5 text-text-tertiary hover:text-text-primary" />
                </button>
                <button className="p-2 rounded-lg hover:bg-background-tertiary transition-colors">
                  <Linkedin className="h-5 w-5 text-text-tertiary hover:text-text-primary" />
                </button>
                <button className="p-2 rounded-lg hover:bg-background-tertiary transition-colors">
                  <Facebook className="h-5 w-5 text-text-tertiary hover:text-text-primary" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection("#features")} className="text-text-secondary hover:text-text-primary transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={handleWatchDemo} className="text-text-secondary hover:text-text-primary transition-colors">
                    Demo
                  </button>
                </li>
                <li>
                  <button onClick={handleGetStarted} className="text-text-secondary hover:text-text-primary transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary">Support</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-text-tertiary" />
                  <a href="mailto:support@visiontest.com" className="text-text-secondary hover:text-text-primary transition-colors">
                    support@visiontest.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-text-tertiary" />
                  <span className="text-text-secondary text-sm">HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border-subtle mt-8 pt-8 text-center">
            <p className="text-text-tertiary">
              © 2024 VisionTest Clinical Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};