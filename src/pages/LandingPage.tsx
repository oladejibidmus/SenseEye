"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, Users, BarChart3, Menu, X, ArrowRight, Star, ChevronLeft, ChevronRight, Mail, Twitter, Linkedin, Facebook, CheckCircle, Target, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  id: "ai-analysis",
  icon: Brain,
  title: "AI-Powered Analysis",
  description: "Advanced machine learning algorithms provide precise visual field analysis with 95% accuracy, detecting subtle changes that traditional methods might miss."
}, {
  id: "patient-management",
  icon: Users,
  title: "Patient Management",
  description: "Comprehensive patient database with automated scheduling, progress tracking, and seamless integration with existing practice management systems."
}, {
  id: "comprehensive-reports",
  icon: BarChart3,
  title: "Comprehensive Reports",
  description: "Generate detailed, professional reports with trend analysis, comparison charts, and customizable templates for insurance and referral purposes."
}];
const testimonials: Testimonial[] = [{
  id: "testimonial-1",
  name: "Dr. Sarah Chen",
  role: "Ophthalmologist, Vision Care Center",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  quote: "SmartEye AI has revolutionized our practice. The AI analysis catches subtle field defects we might have missed, and our patients love the streamlined experience.",
  rating: 5
}, {
  id: "testimonial-2",
  name: "Dr. Michael Rodriguez",
  role: "Glaucoma Specialist, Eye Institute",
  avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  quote: "The comprehensive reporting feature saves us hours each week. The trend analysis helps us make better treatment decisions for our glaucoma patients.",
  rating: 5
}, {
  id: "testimonial-3",
  name: "Dr. Emily Watson",
  role: "Retinal Specialist, Advanced Eye Care",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  quote: "Patient management has never been easier. The automated scheduling and progress tracking features have improved our workflow significantly.",
  rating: 5
}];
const navigationLinks = [{
  label: "Features",
  href: "#features"
}, {
  label: "Pricing",
  href: "#pricing"
}, {
  label: "About",
  href: "#about"
}, {
  label: "Contact",
  href: "#contact"
}] as any[];
export default function LandingPageSingle({}: LandingPageSingleProps) {
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
  return <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SmartEye AI</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map(link => <button key={link.label} onClick={() => scrollToSection(link.href)} className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
                  {link.label}
                </button>)}
              <Button className="ml-4">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle mobile menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
        }} className="md:hidden border-t border-border bg-background">
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map(link => <button key={link.label} onClick={() => scrollToSection(link.href)} className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2">
                    {link.label}
                  </button>)}
                <Button className="w-full mt-4">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Revolutionize Visual Field Testing{" "}
                <span className="text-primary">with AI</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Advanced platform for ophthalmologists featuring AI-powered analysis, 
                comprehensive patient management, and detailed reporting to enhance 
                diagnostic accuracy and streamline your practice.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Target className="h-5 w-5 mr-2" />
                Try for Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
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
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary/10 rounded-2xl">
                      <Eye className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary/10 rounded-2xl">
                      <Brain className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary/10 rounded-2xl">
                      <BarChart3 className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <p className="text-muted-foreground text-lg">
                    Precision • Intelligence • Results
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Powerful Features for Modern Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to deliver exceptional eye care with cutting-edge technology
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
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-primary font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Available Now</span>
                      </div>
                    </CardContent>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Trusted by Leading Ophthalmologists
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what medical professionals are saying about SmartEye AI
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <ScrollArea className="h-80">
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
                    
                    <blockquote className="text-xl text-muted-foreground leading-relaxed italic">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <img src={testimonials[currentTestimonial].avatar} alt={`${testimonials[currentTestimonial].name} profile picture`} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-muted-foreground">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full" aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={cn("w-2 h-2 rounded-full transition-colors", index === currentTestimonial ? "bg-primary" : "bg-muted")} aria-label={`Go to testimonial ${index + 1}`} />)}
              </div>
              
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full" aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of ophthalmologists who trust SmartEye AI for accurate, 
              efficient visual field testing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Shield className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground">SmartEye AI</h3>
              </div>
              <p className="text-muted-foreground max-w-md">
                Advanced visual field testing platform powered by artificial intelligence, 
                designed for modern ophthalmology practices.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection("#features")} className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("#pricing")} className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:contact@smarteyeai.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    contact@smarteyeai.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 SmartEye AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
}