"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Eye, Star, CheckCircle, Play, Mail, Lock, Github, Facebook, Twitter, Linkedin, ArrowRight, Zap, Shield, Clock, Award, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Header from "@/components/ui/Header";
import CapitalDemo from "./CapitalDemo";
import FAQSection from "./FAQSection";
export interface SenseEyeLandingPageProps {
  className?: string;
}
const testimonials = [{
  id: 1,
  name: "Dr. Sarah Chen",
  role: "Ophthalmologist",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
  quote: "SenseEye has revolutionized how we conduct visual field tests. The accuracy and ease of use are remarkable.",
  rating: 5
}, {
  id: 2,
  name: "Michael Rodriguez",
  role: "Patient",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  quote: "Finally, a visual field test I can do from home. The VR experience is comfortable and the results are instant.",
  rating: 5
}, {
  id: 3,
  name: "Dr. James Wilson",
  role: "Neurologist",
  avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
  quote: "The precision and reliability of SenseEye's testing protocol exceeds traditional methods. Highly recommended.",
  rating: 5
}] as any[];
const benefits = [{
  icon: Zap,
  title: "Lightning Fast Results",
  description: "Get comprehensive visual field analysis in under 5 minutes with our advanced VR technology."
}, {
  icon: Shield,
  title: "Clinical Grade Accuracy",
  description: "FDA-approved testing protocols ensure results you can trust for medical decisions."
}, {
  icon: Clock,
  title: "Convenient Testing",
  description: "Test from home or clinic with our portable VR headset and intuitive interface."
}, {
  icon: Award,
  title: "Expert Validated",
  description: "Developed with leading ophthalmologists and validated across thousands of patients."
}] as any[];
const howItWorksSteps = [{
  step: 1,
  title: "Calibrate",
  description: "Put on the VR headset and complete a quick 30-second calibration process.",
  icon: Eye
}, {
  step: 2,
  title: "Test",
  description: "Follow the guided visual field test with interactive prompts and real-time feedback.",
  icon: User
}, {
  step: 3,
  title: "Get Results",
  description: "Receive detailed analysis and recommendations instantly on your device.",
  icon: CheckCircle
}] as any[];
export default function SenseEyeLandingPage({
  className
}: SenseEyeLandingPageProps) {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleGetStarted = () => {
    setIsSignUpModalOpen(true);
  };
  const handleAcceptCookies = () => {
    setShowCookieConsent(false);
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className={cn("min-h-screen bg-gradient-to-br from-[#FAF7F2] via-white to-[#F8F5F0]", className)}>
      {/* Subtle Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />

      {/* Header */}
      <Header onGetStarted={handleGetStarted} onNavigate={scrollToSection} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-white via-50% to-[#F8F5F0] to-100%">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A1A]/5 via-transparent to-[#1A2233]/5" />
        <div className="max-w-8xl mx-auto px-6 py-32 sm:py-40 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: "easeOut"
          }} className="text-center lg:text-left space-y-8">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight text-[#1A2233] leading-[0.9] tracking-tight">
                Revolutionary
                <span className="block font-light text-[#FF6A1A] mt-2">Visual Field</span>
                <span className="block font-extralight text-[#1A2233] mt-2">Testing</span>
              </h1>
              <div className="w-24 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto lg:mx-0" />
              <p className="text-2xl sm:text-3xl font-light text-gray-600 leading-relaxed max-w-2xl">
                Experience the future of eye care with SenseEye's portable VR solution. 
                Get clinical-grade results in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
                <Button onClick={handleGetStarted} disabled={isLoading} className="group relative overflow-hidden bg-gradient-to-r from-[#FF6A1A] via-[#FF7A2A] to-[#FF6A1A] hover:from-[#E55A0F] hover:via-[#F56A1F] hover:to-[#E55A0F] text-white px-12 py-6 text-xl font-light rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection('demo')} className="group text-[#FF6A1A] hover:text-[#E55A0F] px-12 py-6 text-xl font-light hover:bg-[#FF6A1A]/10 rounded-2xl transition-all duration-300">
                  See How It Works
                  <Play className="ml-3 h-6 w-6 transition-transform group-hover:scale-110" />
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            scale: 0.9,
            x: 50
          }} animate={{
            opacity: 1,
            scale: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut"
          }} className="relative">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=700&h=500&fit=crop" alt="Person wearing VR headset for visual field testing" className="w-full h-auto rounded-3xl shadow-3xl group-hover:shadow-4xl transition-all duration-700 transform group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6A1A]/20 via-transparent to-[#1A2233]/10 rounded-3xl opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6A1A]/20 to-[#1A2233]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6A1A]/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6A1A] to-transparent flex-1" />
            <div className="mx-8 w-3 h-3 bg-[#FF6A1A] rounded-full shadow-lg" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF6A1A] to-transparent flex-1" />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 sm:py-40 bg-gradient-to-br from-white via-[#FAF7F2] to-white">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              How It Works
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Three simple steps to comprehensive visual field analysis
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {howItWorksSteps.map((step, index) => <motion.div key={step.step} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} whileHover={{
            scale: 1.05,
            y: -10
          }} className="text-center group cursor-pointer">
                <div className="relative mb-8">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#FF6A1A] via-[#FF7A2A] to-[#FF6A1A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110">
                    <step.icon className="h-14 w-14 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#1A2233] to-[#2A3243] text-white rounded-full flex items-center justify-center text-lg font-light shadow-2xl">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-3xl font-light text-[#1A2233] mb-6">{step.title}</h3>
                <p className="text-lg font-light text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="py-32 sm:py-40 bg-gradient-to-br from-[#FAF7F2] via-[#F8F5F0] to-[#FAF7F2]">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              Why Choose SenseEye?
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced technology meets clinical excellence for superior patient care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{
            opacity: 0,
            y: 40
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.15
          }} viewport={{
            once: true
          }} whileHover={{
            y: -15,
            scale: 1.02
          }}>
                <Card className="h-full bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl hover:shadow-4xl transition-all duration-700 rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A1A]/5 via-transparent to-[#1A2233]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <CardHeader className="text-center pb-6 pt-12 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF6A1A]/20 via-[#FF6A1A]/10 to-transparent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                      <benefit.icon className="h-10 w-10 text-[#FF6A1A]" />
                    </div>
                    <CardTitle className="text-2xl font-light text-[#1A2233]">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-8 pb-12 relative z-10">
                    <p className="text-lg font-light text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Capital Demo */}
      <section id="demo" className="py-32 sm:py-40 bg-gradient-to-br from-white via-[#FAF7F2] to-white">
        <CapitalDemo />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 sm:py-40 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              Trusted by Professionals
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See what healthcare providers and patients are saying about SenseEye
            </p>
          </motion.div>
          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent>
              {testimonials.map(testimonial => <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div whileHover={{
                scale: 1.03,
                y: -10
              }} className="p-6">
                    <Card className="h-full bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl hover:shadow-4xl transition-all duration-700 rounded-3xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A1A]/5 via-transparent to-[#1A2233]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />)}
                        </div>
                        <blockquote className="text-lg font-light text-gray-700 mb-8 leading-relaxed italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center">
                          <Avatar className="h-16 w-16 mr-4 ring-2 ring-[#FF6A1A]/20">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-light text-lg text-[#1A2233]">{testimonial.name}</p>
                            <p className="text-base font-light text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="shadow-2xl" />
            <CarouselNext className="shadow-2xl" />
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 sm:py-40 bg-gradient-to-br from-[#FAF7F2] via-[#F8F5F0] to-[#FAF7F2]">
        <FAQSection />
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1A2233] via-[#2A3243] to-[#1A2233] text-white py-24">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 text-[#FF6A1A] mr-4" />
                <span className="text-3xl font-extralight">SenseEye</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-md text-lg font-light leading-relaxed">
                Revolutionary VR-based visual field testing for the modern healthcare provider.
              </p>
              <div className="flex space-x-6">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-light text-xl mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-white transition-colors font-light text-lg">How It Works</button></li>
                <li><button onClick={() => scrollToSection('benefits')} className="text-gray-300 hover:text-white transition-colors font-light text-lg">Benefits</button></li>
                <li><button onClick={() => scrollToSection('demo')} className="text-gray-300 hover:text-white transition-colors font-light text-lg">Demo</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors font-light text-lg">Testimonials</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-light text-xl mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-light text-lg">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-light text-lg">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-light text-lg">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-light text-lg">About</a></li>
              </ul>
            </div>
          </div>
          
          {/* Elegant Footer Divider */}
          <div className="relative py-8 mb-8">
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-1" />
              <div className="mx-8 w-2 h-2 bg-gray-600 rounded-full" />
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-1" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 text-lg font-light mb-4 sm:mb-0">
              © 2024 SenseEye. All rights reserved.
            </p>
            <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2 text-base font-light">
              Built with Bolt.new
            </Badge>
          </div>
        </div>
      </footer>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />

      {/* GDPR Cookie Consent */}
      {showCookieConsent && <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} className="fixed bottom-6 left-6 right-6 z-50 max-w-lg mx-auto">
          <Card className="bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-base font-light text-gray-700 mb-4 leading-relaxed">
                    We use cookies to enhance your experience and analyze site usage. 
                    By continuing, you agree to our cookie policy.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={handleAcceptCookies} size="sm" className="bg-gradient-to-r from-[#FF6A1A] to-[#FF7A2A] hover:from-[#E55A0F] hover:to-[#F56A1F] text-white px-6 py-2 font-light rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Accept
                    </Button>
                    <Button onClick={handleAcceptCookies} variant="outline" size="sm" className="px-6 py-2 font-light rounded-lg">
                      Decline
                    </Button>
                  </div>
                </div>
                <Button onClick={handleAcceptCookies} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>}
    </div>;
}