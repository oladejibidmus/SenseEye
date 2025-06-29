"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, Users, BarChart3, Menu, X, ArrowRight, Star, ChevronLeft, ChevronRight, Mail, Twitter, Linkedin, Facebook, CheckCircle, Target, Brain, Shield } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export interface LandingPageSingleProps {}

interface Feature {
  id: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
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

const features: Feature[] = [{
  id: "visual-field-testing",
  icon: Brain,
  title: "Advanced Visual Field Testing",
  description: "Comprehensive 24-2, 30-2, and 10-2 testing protocols with SITA Standard and SITA Fast strategies. Real-time reliability monitoring and customizable test parameters for precise diagnostics."
}, {
  id: "patient-management",
  icon: Users,
  title: "Complete Patient Management",
  description: "Streamlined patient database with medical history tracking, appointment scheduling, and automated test result organization. Secure HIPAA-compliant data management system."
}, {
  id: "comprehensive-reports",
  icon: BarChart3,
  title: "Intelligent Analytics & Reports",
  description: "Generate detailed PDF reports with trend analysis, reliability indices, and visual field progression maps. Export data for insurance claims and specialist referrals with ease."
}];

const testimonials: Testimonial[] = [{
  id: "testimonial-1",
  name: "Dr. Sarah Chen",
  role: "Ophthalmologist, Vision Care Center",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  quote: "VisionTest has revolutionized our practice workflow. The reliability monitoring and automated reporting save us hours each week, and our patients appreciate the streamlined testing experience.",
  rating: 5
}, {
  id: "testimonial-2",
  name: "Dr. Michael Rodriguez",
  role: "Glaucoma Specialist, Eye Institute",
  avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  quote: "The comprehensive analytics and trend analysis features help us make better clinical decisions for our glaucoma patients. The platform's reliability indices are incredibly detailed and accurate.",
  rating: 5
}, {
  id: "testimonial-3",
  name: "Jennifer Martinez, COT",
  role: "Ophthalmic Technician, Advanced Eye Care",
  avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  quote: "As an ophthalmic technician, this platform makes my job so much easier. Patient management is intuitive, and the test setup process is incredibly efficient and user-friendly.",
  rating: 5
}];

const navigationLinks = [{
  label: "Features",
  href: "#features"
}, {
  label: "Demo",
  href: "#demo"
}, {
  label: "About",
  href: "#about"
}, {
  label: "Contact",
  href: "#contact"
}] as any[];

// Light mode utility function
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function LandingPageSingle({}: LandingPageSingleProps) {
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
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const handleWatchDemo = () => {
    navigate('/test-supabase');
  };

  return <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">VisionTest</h1>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Clinical Platform</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(link => <button key={link.label} onClick={() => scrollToSection(link.href)} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
                  {link.label}
                </button>)}
              <Button onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle mobile menu">
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map(link => <button key={link.label} onClick={() => scrollToSection(link.href)} className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    {link.label}
                  </button>)}
                <Button onClick={handleGetStarted} className="w-full mt-4">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Professional Visual Field Testing{" "}
                <span className="text-blue-600">Platform</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                View Demo
              </Button>
            </div>

            {/* Hero Illustration */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="mt-16 relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-12 max-w-4xl mx-auto border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="flex justify-center">
                    <div className="p-6 bg-blue-600/10 rounded-2xl">
                      <Eye className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="p-6 bg-blue-600/10 rounded-2xl">
                      <Brain className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="p-6 bg-blue-600/10 rounded-2xl">
                      <BarChart3 className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <p className="text-gray-600 text-lg">
                    Precision • Intelligence • Clinical Excellence
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Complete Clinical Testing Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything ophthalmic technicians need for professional visual field testing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <motion.div key={feature.id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} viewport={{
              once: true
            }}>
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200">
                    <div className="p-8 text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Available Now</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Trusted by Eye Care Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what ophthalmologists and ophthalmic technicians are saying about VisionTest
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-white border border-gray-200">
              <div className="p-0">
                <div className="h-80">
                  <motion.div key={currentTestimonial} initial={{
                  opacity: 0,
                  x: 20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} exit={{
                  opacity: 0,
                  x: -20
                }} transition={{
                  duration: 0.5
                }} className="p-12 text-center space-y-6">
                    <div className="flex justify-center space-x-1 mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    
                    <blockquote className="text-xl text-gray-600 leading-relaxed italic">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <img src={testimonials[currentTestimonial].avatar} alt={`${testimonials[currentTestimonial].name} profile picture`} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-600/20" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-gray-500">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="tertiary" size="sm" onClick={prevTestimonial} className="rounded-full bg-white border border-gray-200 hover:bg-gray-50" aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={cn("w-2 h-2 rounded-full transition-colors", index === currentTestimonial ? "bg-blue-600" : "bg-gray-300")} aria-label={`Go to testimonial ${index + 1}`} />)}
              </div>
              
              <Button variant="tertiary" size="sm" onClick={nextTestimonial} className="rounded-full bg-white border border-gray-200 hover:bg-gray-50" aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Ready to Enhance Your Practice?
            </h2>
            <p className="text-xl text-gray-600">
              Join ophthalmic professionals who trust VisionTest for accurate, 
              efficient visual field testing and comprehensive patient management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-6">
                <Shield className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" onClick={handleWatchDemo} className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">VisionTest</h3>
              </div>
              <p className="text-gray-600 max-w-md">
                Professional visual field testing platform designed for modern 
                ophthalmology practices and ophthalmic technicians.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection("#features")} className="text-gray-600 hover:text-gray-900 transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={handleWatchDemo} className="text-gray-600 hover:text-gray-900 transition-colors">
                    Demo
                  </button>
                </li>
                <li>
                  <button onClick={handleGetStarted} className="text-gray-600 hover:text-gray-900 transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Support</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href="mailto:support@visiontest.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                    support@visiontest.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 VisionTest Clinical Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
}