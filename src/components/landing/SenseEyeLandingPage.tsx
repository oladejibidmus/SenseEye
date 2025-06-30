"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { User, Eye, Star, CheckCircle, Play, Mail, Lock, Github, Facebook, Twitter, Linkedin, ArrowRight, Zap, Shield, Clock, Award, X, ChevronDown, ChevronLeft, ChevronRight, Smartphone, Brain, Users, Globe, Heart, Stethoscope } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Carousel, CarouselItem } from "../ui/carousel";
import Header from "./Header";
import SignUpModal from "./SignUpModal";
import CapitalDemo from "./CapitalDemo";
import FAQSection from "./FAQSection";

export interface SenseEyeLandingPageProps {
  className?: string;
}

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Ophthalmologist",
    hospital: "Johns Hopkins Hospital",
    avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?w=100&h=100&fit=crop&crop=face",
    quote: "SenseEye has revolutionized how we conduct visual field tests. The accuracy and ease of use are remarkable. Our patients love the comfortable VR experience.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Patient",
    condition: "Glaucoma Monitoring",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=face",
    quote: "Finally, a visual field test I can do from home. The VR experience is comfortable and the results are instant. It's changed how I manage my condition.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    role: "Neurologist",
    hospital: "Mayo Clinic",
    avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?w=100&h=100&fit=crop&crop=face",
    quote: "The precision and reliability of SenseEye's testing protocol exceeds traditional methods. It's become an essential tool in our practice.",
    rating: 5
  },
  {
    id: 4,
    name: "Dr. Emily Thompson",
    role: "Optometrist",
    hospital: "Cleveland Clinic",
    avatar: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?w=100&h=100&fit=crop&crop=face",
    quote: "The patient compliance and comfort with SenseEye is outstanding. We've seen a 40% reduction in test retakes due to patient fatigue.",
    rating: 5
  },
  {
    id: 5,
    name: "Robert Kim",
    role: "Patient",
    condition: "Diabetic Retinopathy",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face",
    quote: "Being able to monitor my vision at home gives me peace of mind. The technology is incredible and the results help my doctor track my progress.",
    rating: 5
  }
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Results",
    description: "Get comprehensive visual field analysis in under 5 minutes with our advanced VR technology.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Clinical Grade Accuracy",
    description: "FDA-approved testing protocols ensure results you can trust for medical decisions.",
    color: "from-green-400 to-blue-500"
  },
  {
    icon: Clock,
    title: "Convenient Testing",
    description: "Test from home or clinic with our portable VR headset and intuitive interface.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Award,
    title: "Expert Validated",
    description: "Developed with leading ophthalmologists and validated across thousands of patients.",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: Heart,
    title: "Patient Comfort",
    description: "Immersive VR environment reduces anxiety and improves patient compliance.",
    color: "from-red-400 to-pink-500"
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced machine learning provides detailed analysis and predictive insights.",
    color: "from-indigo-400 to-purple-500"
  }
];

const howItWorksSteps = [
  {
    step: 1,
    title: "Calibrate",
    description: "Put on the VR headset and complete a quick 30-second calibration process tailored to your vision.",
    icon: Eye,
    image: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=400&h=300&fit=crop"
  },
  {
    step: 2,
    title: "Test",
    description: "Follow the guided visual field test with interactive prompts and real-time feedback in an immersive environment.",
    icon: User,
    image: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?w=400&h=300&fit=crop"
  },
  {
    step: 3,
    title: "Get Results",
    description: "Receive detailed analysis and recommendations instantly on your device with comprehensive reporting.",
    icon: CheckCircle,
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop"
  }
];

const features = [
  {
    icon: Smartphone,
    title: "Mobile Integration",
    description: "Seamlessly sync with mobile devices for remote monitoring and data access.",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?w=300&h=200&fit=crop"
  },
  {
    icon: Globe,
    title: "Cloud Analytics",
    description: "Secure cloud-based analysis with real-time data processing and storage.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?w=300&h=200&fit=crop"
  },
  {
    icon: Users,
    title: "Multi-User Support",
    description: "Support for multiple healthcare providers with role-based access control.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=300&h=200&fit=crop"
  },
  {
    icon: Stethoscope,
    title: "Clinical Integration",
    description: "Direct integration with EMR systems and clinical workflows.",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?w=300&h=200&fit=crop"
  }
];

const stats = [
  { number: "95%", label: "Accuracy Rate", description: "Compared to traditional perimetry" },
  { number: "5min", label: "Test Duration", description: "Average time per eye" },
  { number: "500+", label: "Healthcare Providers", description: "Trust SenseEye worldwide" },
  { number: "50k+", label: "Tests Completed", description: "Successful visual field assessments" }
];

export default function SenseEyeLandingPage({ className }: SenseEyeLandingPageProps) {
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-[#FAF7F2] via-white to-[#F8F5F0]", className)}>
      {/* Subtle Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      {/* Header */}
      <Header onGetStarted={handleGetStarted} onNavigate={scrollToSection} />

      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-white via-50% to-[#F8F5F0] to-100%">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A1A]/5 via-transparent to-[#1A2233]/5" />
        <div className="max-w-8xl mx-auto px-6 py-32 sm:py-40 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="text-center lg:text-left space-y-8"
            >
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
              
              {/* Stats Carousel */}
              <div className="pt-8">
                <Carousel autoPlay={true} autoPlayInterval={3000} showArrows={false} className="max-w-md mx-auto lg:mx-0">
                  {stats.map((stat, index) => (
                    <CarouselItem key={index}>
                      <div className="text-center lg:text-left bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-light text-[#FF6A1A] mb-2">{stat.number}</div>
                        <div className="text-lg font-medium text-[#1A2233] mb-1">{stat.label}</div>
                        <div className="text-sm text-gray-600">{stat.description}</div>
                      </div>
                    </CarouselItem>
                  ))}
                </Carousel>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
                <Button 
                  onClick={handleGetStarted} 
                  disabled={isLoading} 
                  className="group relative overflow-hidden bg-gradient-to-r from-[#FF6A1A] via-[#FF7A2A] to-[#FF6A1A] hover:from-[#E55A0F] hover:via-[#F56A1F] hover:to-[#E55A0F] text-white px-12 py-6 text-xl font-light rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
                <Button 
                  variant="tertiary" 
                  onClick={() => scrollToSection('demo')} 
                  className="group text-[#FF6A1A] hover:text-[#E55A0F] px-12 py-6 text-xl font-light hover:bg-[#FF6A1A]/10 rounded-2xl transition-all duration-300"
                >
                  See How It Works
                  <Play className="ml-3 h-6 w-6 transition-transform group-hover:scale-110" />
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} 
              className="relative"
            >
              {/* Hero Image Carousel */}
              <Carousel autoPlay={true} autoPlayInterval={4000} showDots={false} className="relative group">
                <CarouselItem>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=700&h=500&fit=crop" 
                      alt="SenseEye dashboard interface showing visual field testing analytics" 
                      className="w-full h-auto rounded-3xl shadow-3xl group-hover:shadow-4xl transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF6A1A]/20 via-transparent to-[#1A2233]/10 rounded-3xl opacity-60" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=700&h=500&fit=crop" 
                      alt="Patient using SenseEye VR headset for visual field testing" 
                      className="w-full h-auto rounded-3xl shadow-3xl group-hover:shadow-4xl transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF6A1A]/20 via-transparent to-[#1A2233]/10 rounded-3xl opacity-60" />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?w=700&h=500&fit=crop" 
                      alt="Healthcare provider reviewing SenseEye test results" 
                      className="w-full h-auto rounded-3xl shadow-3xl group-hover:shadow-4xl transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF6A1A]/20 via-transparent to-[#1A2233]/10 rounded-3xl opacity-60" />
                  </div>
                </CarouselItem>
              </Carousel>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6A1A]/20 to-[#1A2233]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
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

      {/* How It Works with Enhanced Carousel */}
      <section id="how-it-works" className="py-32 sm:py-40 bg-gradient-to-br from-white via-[#FAF7F2] to-white">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-24 space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              How It Works
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Three simple steps to comprehensive visual field analysis
            </p>
          </motion.div>
          
          {/* Desktop View */}
          <div className="hidden lg:grid grid-cols-3 gap-16">
            {howItWorksSteps.map((step, index) => (
              <motion.div 
                key={step.step} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.2 }} 
                viewport={{ once: true }} 
                whileHover={{ scale: 1.05, y: -10 }} 
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-8">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500"
                  />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#1A2233] to-[#2A3243] text-white rounded-full flex items-center justify-center text-lg font-light shadow-2xl">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-3xl font-light text-[#1A2233] mb-6">{step.title}</h3>
                <p className="text-lg font-light text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <Carousel showDots={true} showArrows={true}>
              {howItWorksSteps.map((step, index) => (
                <CarouselItem key={step.step}>
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }} 
                    viewport={{ once: true }} 
                    className="text-center px-4"
                  >
                    <div className="relative mb-8">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#1A2233] to-[#2A3243] text-white rounded-full flex items-center justify-center text-lg font-light shadow-2xl">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-3xl font-light text-[#1A2233] mb-6">{step.title}</h3>
                    <p className="text-lg font-light text-gray-600 leading-relaxed max-w-md mx-auto">{step.description}</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Key Benefits with Enhanced Carousel */}
      <section id="benefits" className="py-32 sm:py-40 bg-gradient-to-br from-[#FAF7F2] via-[#F8F5F0] to-[#FAF7F2]">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-24 space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              Why Choose SenseEye?
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced technology meets clinical excellence for superior patient care
            </p>
          </motion.div>
          
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.15 }} 
                viewport={{ once: true }} 
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl hover:shadow-4xl transition-all duration-700 rounded-3xl overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  <CardHeader className="text-center pb-6 pt-12 relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-light text-[#1A2233]">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-8 pb-12 relative z-10">
                    <p className="text-lg font-light text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <Carousel showDots={true} showArrows={true} autoPlay={true} autoPlayInterval={4000}>
              {benefits.map((benefit, index) => (
                <CarouselItem key={benefit.title}>
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }} 
                    viewport={{ once: true }} 
                    className="px-4"
                  >
                    <Card className="h-full bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl rounded-3xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-10`} />
                      <CardHeader className="text-center pb-6 pt-12 relative z-10">
                        <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                          <benefit.icon className="h-10 w-10 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-light text-[#1A2233]">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center px-8 pb-12 relative z-10">
                        <p className="text-lg font-light text-gray-600 leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Features Carousel */}
      <section id="features" className="py-32 sm:py-40 bg-gradient-to-br from-white via-[#FAF7F2] to-white">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-24 space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              Advanced Features
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge technology designed for modern healthcare
            </p>
          </motion.div>
          
          <Carousel showDots={true} showArrows={true} autoPlay={true} autoPlayInterval={5000}>
            {features.map((feature, index) => (
              <CarouselItem key={feature.title}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.8 }} 
                  viewport={{ once: true }} 
                  className="px-4"
                >
                  <Card className="bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                      <div className="flex flex-col justify-center space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FF6A1A] to-[#FF7A2A] rounded-2xl flex items-center justify-center shadow-lg">
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-4xl font-light text-[#1A2233]">{feature.title}</h3>
                        <p className="text-xl font-light text-gray-600 leading-relaxed">{feature.description}</p>
                        <Button className="w-fit bg-[#FF6A1A] hover:bg-[#E55A0F] text-white px-8 py-3 rounded-xl">
                          Learn More
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                      <div className="relative">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FF6A1A]/20 via-transparent to-transparent rounded-2xl" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Capital Demo */}
      <section id="demo" className="py-32 sm:py-40 bg-gradient-to-br from-[#FAF7F2] via-[#F8F5F0] to-[#FAF7F2]">
        <CapitalDemo />
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section id="testimonials" className="py-32 sm:py-40 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-24 space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#1A2233] tracking-tight">
              Trusted by Professionals
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-[#FF6A1A] to-[#1A2233] mx-auto" />
            <p className="text-2xl font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See what healthcare providers and patients are saying about SenseEye
            </p>
          </motion.div>
          
          <Carousel showDots={true} showArrows={true} autoPlay={true} autoPlayInterval={6000}>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }} 
                  className="px-4"
                >
                  <Card className="h-full bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl hover:shadow-4xl transition-all duration-700 rounded-3xl overflow-hidden group max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A1A]/5 via-transparent to-[#1A2233]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <CardContent className="p-12 relative z-10">
                      <div className="flex items-center mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-2xl font-light text-gray-700 mb-12 leading-relaxed italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center justify-center">
                        <Avatar className="h-20 w-20 mr-6 ring-4 ring-[#FF6A1A]/20">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="font-light text-2xl text-[#1A2233] mb-2">{testimonial.name}</p>
                          <p className="text-lg font-light text-gray-600 mb-1">{testimonial.role}</p>
                          {testimonial.hospital && (
                            <p className="text-base font-light text-[#FF6A1A]">{testimonial.hospital}</p>
                          )}
                          {testimonial.condition && (
                            <p className="text-base font-light text-[#FF6A1A]">{testimonial.condition}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
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
                <Button variant="tertiary" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button variant="tertiary" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="tertiary" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110">
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
      {showCookieConsent && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="fixed bottom-6 left-6 right-6 z-50 max-w-lg mx-auto"
        >
          <Card className="bg-gradient-to-br from-white via-white to-[#FAF7F2] border-0 shadow-3xl rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-base font-light text-gray-700 mb-4 leading-relaxed">
                    We use cookies to enhance your experience and analyze site usage. 
                    By continuing, you agree to our cookie policy.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleAcceptCookies} 
                      size="sm" 
                      className="bg-gradient-to-r from-[#FF6A1A] to-[#FF7A2A] hover:from-[#E55A0F] hover:to-[#F56A1F] text-white px-6 py-2 font-light rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Accept
                    </Button>
                    <Button 
                      onClick={handleAcceptCookies} 
                      variant="tertiary" 
                      size="sm" 
                      className="px-6 py-2 font-light rounded-lg"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleAcceptCookies} 
                  variant="tertiary" 
                  size="sm" 
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}