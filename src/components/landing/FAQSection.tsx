import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export interface FAQSectionProps {
  className?: string;
}

const faqs = [
  {
    id: "faq-1",
    question: "How accurate is SenseEye compared to traditional visual field testing?",
    answer: "SenseEye delivers clinical-grade accuracy that meets or exceeds traditional perimetry standards. Our VR-based testing has been validated in clinical trials with over 95% correlation to standard automated perimetry (SAP). The immersive environment actually reduces patient fatigue and improves test reliability."
  },
  {
    id: "faq-2",
    question: "Is the VR headset comfortable for patients with different vision conditions?",
    answer: "Yes, our VR headset is designed with patient comfort in mind. It accommodates prescription glasses, has adjustable interpupillary distance, and features lightweight ergonomic design. The system automatically calibrates for each patient's visual needs and can be used by patients with various refractive errors."
  },
  {
    id: "faq-3",
    question: "How long does a complete visual field test take with SenseEye?",
    answer: "A comprehensive visual field test typically takes 3-5 minutes per eye with SenseEye, compared to 8-15 minutes with traditional methods. The VR environment keeps patients engaged, reducing the need for breaks and retests due to patient fatigue or attention lapses."
  },
  {
    id: "faq-4",
    question: "What training is required for healthcare providers to use SenseEye?",
    answer: "SenseEye is designed for ease of use with minimal training required. Most healthcare providers can become proficient after a 30-minute training session. We provide comprehensive onboarding, video tutorials, and ongoing support to ensure successful implementation in your practice."
  },
  {
    id: "faq-5",
    question: "Is SenseEye FDA approved and suitable for clinical use?",
    answer: "Yes, SenseEye has received FDA clearance for clinical visual field testing. Our device meets all regulatory requirements for medical devices and follows established clinical protocols. Results can be used for diagnosis, treatment planning, and patient monitoring just like traditional perimetry."
  },
  {
    id: "faq-6",
    question: "Can patients use SenseEye at home for remote monitoring?",
    answer: "SenseEye offers both clinical and home-use versions. The home version allows for convenient patient monitoring between clinic visits, with results automatically shared with healthcare providers. This enables better disease management and early detection of visual field changes."
  }
];

export default function FAQSection({ className }: FAQSectionProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2233] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get answers to common questions about SenseEye's revolutionary visual field testing technology
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                value={faq.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-250 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-200 [&[data-state=open]]:bg-[#FF6A1A]/5 [&[data-state=open]]:border-[#FF6A1A]/20">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-[#1A2233] pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-[#FF6A1A] shrink-0 transition-transform duration-250 [&[data-state=open]]:rotate-180" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-[#FF6A1A]/5 to-[#1A2233]/5 rounded-xl border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#1A2233] mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you understand how SenseEye can transform your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-[#FF6A1A] hover:bg-[#E55A0F] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-[#FF6A1A] text-[#FF6A1A] hover:bg-[#FF6A1A] hover:text-white font-semibold rounded-lg transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}