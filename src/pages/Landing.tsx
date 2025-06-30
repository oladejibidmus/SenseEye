import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeroHeader } from '../components/HeroHeader';
import {
  Eye,
  Smartphone,
  Shield,
  Award,
  ChevronDown,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Lock,
  Heart,
  Play,
  Globe,
  Mail,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetStarted = () => {
    navigate('/signin');
  };

  const steps = [
    {
      icon: Smartphone,
      title: "Calibrate",
      description: "Quick setup using your device's camera for precise eye tracking and positioning."
    },
    {
      icon: Eye,
      title: "Test",
      description: "Conduct comprehensive visual field testing with clinical-grade accuracy."
    },
    {
      icon: CheckCircle,
      title: "Get Results",
      description: "Receive detailed reports and analysis instantly, ready for clinical review."
    }
  ];

  const features = [
    {
      icon: Award,
      title: "Accurate & Reliable",
      description: "Clinical-grade precision with validated testing protocols and comprehensive reliability metrics."
    },
    {
      icon: Heart,
      title: "Affordable & Accessible",
      description: "Democratizing visual field testing with cost-effective solutions for any healthcare setting."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "HIPAA-compliant data protection with end-to-end encryption and secure cloud storage."
    },
    {
      icon: Zap,
      title: "Clinically Inspired Design",
      description: "Built by eye care professionals for seamless integration into existing workflows."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Ophthalmologist",
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "SenseEye has revolutionized our practice. The accuracy rivals traditional perimeters while being incredibly user-friendly.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Ophthalmic Technician",
      avatar: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "The mobile calibration feature is a game-changer. We can now offer visual field testing in remote locations.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Glaucoma Specialist",
      avatar: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "Exceptional reliability and detailed reporting. My patients appreciate the modern, comfortable testing experience.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How accurate is SenseEye compared to traditional perimeters?",
      answer: "SenseEye achieves clinical-grade accuracy with validation studies showing 95%+ correlation with gold-standard perimetry. Our advanced algorithms and precise calibration ensure reliable results for clinical decision-making."
    },
    {
      question: "What devices are compatible with SenseEye?",
      answer: "SenseEye works with modern smartphones, tablets, and computers with cameras. We support iOS 12+, Android 8+, and modern web browsers. VR headsets are optional for enhanced immersion."
    },
    {
      question: "Is patient data secure and HIPAA compliant?",
      answer: "Yes, SenseEye is fully HIPAA compliant with end-to-end encryption, secure cloud storage, and comprehensive audit trails. Patient data is protected with enterprise-grade security measures."
    },
    {
      question: "How long does a typical test take?",
      answer: "Standard visual field tests take 3-8 minutes per eye, depending on the test type and strategy. Our SITA-equivalent algorithms optimize testing time while maintaining accuracy."
    },
    {
      question: "Can I integrate SenseEye with my existing EMR system?",
      answer: "Yes, SenseEye offers API integration with major EMR systems including Epic, Cerner, and AllScripts. We also support HL7 FHIR standards for seamless data exchange."
    },
    {
      question: "What training is required for staff?",
      answer: "SenseEye is designed for intuitive use with minimal training required. We provide comprehensive onboarding, video tutorials, and ongoing support to ensure smooth adoption."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <HeroHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Visual Field Testing
                <span className="text-[#FF6A1A] block">Reimagined</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Accessible, clinical-grade visual field testing—anywhere, anytime
              </p>
              <p className="text-lg text-gray-500 mt-4 leading-relaxed">
                Transform your practice with innovative perimetry that combines clinical accuracy 
                with modern convenience. No more bulky equipment or complex setups.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  {...scaleOnHover}
                  onClick={handleGetStarted}
                  className="bg-[#FF6A1A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#E55A0F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] focus:ring-offset-2 flex items-center justify-center space-x-2"
                  aria-label="Get started with SenseEye"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  {...scaleOnHover}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-[#FF6A1A] hover:text-[#FF6A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] focus:ring-offset-2 flex items-center justify-center space-x-2"
                  aria-label="Watch demo video"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#FF6A1A] to-[#E55A0F] rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6">
                  {/* Visual Field Grid Illustration */}
                  <div className="grid grid-cols-8 gap-1 w-64 h-64 mx-auto">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const opacity = Math.random() > 0.3 ? 0.8 : 0.2;
                      const color = Math.random() > 0.7 ? '#22c55e' : Math.random() > 0.4 ? '#f59e0b' : '#ef4444';
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity }}
                          transition={{ delay: i * 0.01, duration: 0.5 }}
                          className="rounded-full"
                          style={{ backgroundColor: color, opacity }}
                        />
                      );
                    })}
                  </div>
                  <div className="text-center mt-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Fixation Point</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Eye className="w-8 h-8 text-[#FF6A1A]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to revolutionize your visual field testing workflow
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-[#FF6A1A] rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-[#FF6A1A]" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SenseEye?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets clinical excellence for the future of visual field testing
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#FF6A1A]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#FF6A1A]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Eye Care Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what clinicians are saying about their experience with SenseEye
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SenseEye
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] focus:ring-inset"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF6A1A] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-6 pb-4"
                    id={`faq-answer-${index}`}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6A1A] to-[#E55A0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join thousands of eye care professionals who trust SenseEye for accurate, 
              accessible visual field testing.
            </p>
            <motion.button
              {...scaleOnHover}
              onClick={handleGetStarted}
              className="bg-white text-[#FF6A1A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF6A1A] inline-flex items-center space-x-2"
              aria-label="Get started with SenseEye"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#FF6A1A] rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SenseEye</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Revolutionizing visual field testing with accessible, clinical-grade technology 
                for eye care professionals worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FF6A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] rounded"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FF6A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] rounded"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FF6A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] rounded"
                  aria-label="View our GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">hello@senseeye.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">www.senseeye.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SenseEye. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with <span className="text-[#FF6A1A]">♥</span> using Bolt.new
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};