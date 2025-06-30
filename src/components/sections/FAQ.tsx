import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '../ui/Accordion';
import { 
  Clock, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Shield,
  Eye,
  Users,
  Settings
} from 'lucide-react';

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

interface FAQItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      icon: Eye,
      question: 'How accurate is SenseEye compared to traditional perimeters?',
      answer: 'SenseEye achieves clinical-grade accuracy with validation studies showing 95%+ correlation with gold-standard perimetry. Our advanced algorithms and precise calibration ensure reliable results for clinical decision-making.',
    },
    {
      id: 'item-2',
      icon: Smartphone,
      question: 'What devices are compatible with SenseEye?',
      answer: 'SenseEye works with modern smartphones, tablets, and computers with cameras. We support iOS 12+, Android 8+, and modern web browsers. VR headsets are optional for enhanced immersion.',
    },
    {
      id: 'item-3',
      icon: Shield,
      question: 'Is patient data secure and HIPAA compliant?',
      answer: 'Yes, SenseEye is fully HIPAA compliant with end-to-end encryption, secure cloud storage, and comprehensive audit trails. Patient data is protected with enterprise-grade security measures.',
    },
    {
      id: 'item-4',
      icon: Clock,
      question: 'How long does a typical test take?',
      answer: 'Standard visual field tests take 3-8 minutes per eye, depending on the test type and strategy. Our SITA-equivalent algorithms optimize testing time while maintaining accuracy.',
    },
    {
      id: 'item-5',
      icon: Settings,
      question: 'Can I integrate SenseEye with my existing EMR system?',
      answer: 'Yes, SenseEye offers API integration with major EMR systems including Epic, Cerner, and AllScripts. We also support HL7 FHIR standards for seamless data exchange.',
    },
    {
      id: 'item-6',
      icon: Users,
      question: 'What training is required for staff?',
      answer: 'SenseEye is designed for intuitive use with minimal training required. We provide comprehensive onboarding, video tutorials, and ongoing support to ensure smooth adoption.',
    },
    {
      id: 'item-7',
      icon: CreditCard,
      question: 'What are the pricing options?',
      answer: 'We offer flexible pricing plans including per-test, monthly subscriptions, and enterprise licenses. Contact our sales team for a customized quote based on your practice needs.',
    },
    {
      id: 'item-8',
      icon: Globe,
      question: 'Do you offer international support?',
      answer: 'Yes, SenseEye is available globally with multilingual support. We comply with international medical device regulations and offer localized customer support in multiple time zones.',
    },
  ];

  return (
    <section className="bg-background-secondary/50 py-20" id="faq">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-10 md:flex-row md:gap-16"
        >
          <motion.div variants={item} className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="mt-4 text-3xl font-bold text-text-primary">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary mt-4">
                Can't find what you're looking for? Contact our{' '}
                <Link
                  to="/signin"
                  className="text-accent-primary font-medium hover:underline"
                >
                  customer support team
                </Link>
              </p>
              
              <div className="mt-8 p-6 bg-background-secondary rounded-xl border border-border-default">
                <h3 className="font-semibold text-text-primary mb-3">Need a Demo?</h3>
                <p className="text-text-secondary text-sm mb-4">
                  See SenseEye in action with a personalized demonstration.
                </p>
                <button 
                  onClick={() => window.location.href = 'mailto:demo@senseeye.com?subject=Demo Request'}
                  className="text-accent-primary text-sm font-medium hover:underline"
                >
                  Schedule a Demo →
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item} className="md:w-2/3">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
            >
              {faqItems.map((faqItem) => (
                <AccordionItem
                  key={faqItem.id}
                  value={faqItem.id}
                  className="bg-background-secondary shadow-sm rounded-xl border border-border-default px-6 overflow-hidden"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-6 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex size-8 bg-accent-primary/10 rounded-lg items-center justify-center flex-shrink-0">
                        <faqItem.icon className="size-4 text-accent-primary" />
                      </div>
                      <span className="text-base font-medium text-text-primary text-left">
                        {faqItem.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="pl-12">
                      <p className="text-base text-text-secondary leading-relaxed">
                        {faqItem.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};