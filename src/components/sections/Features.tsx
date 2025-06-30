import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { 
  Eye, 
  Smartphone, 
  Shield, 
  Award, 
  Zap, 
  Settings2, 
  Sparkles,
  Heart,
  Users,
  Lock
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

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--border-default)_10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--border-default)_20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-radial from-transparent to-background-secondary to-75%"
    />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-border-default bg-background-secondary rounded-lg">
      {children}
    </div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div variants={item}>
    <Card className="group shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
      <div className="p-6 pb-3">
        <CardDecorator>
          <Icon className="w-6 h-6 text-accent-primary" aria-hidden />
        </CardDecorator>
        <h3 className="mt-6 font-semibold text-lg text-text-primary">{title}</h3>
      </div>
      <div className="px-6 pb-6">
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </Card>
  </motion.div>
);

const features = [
  {
    icon: Eye,
    title: "Clinical-Grade Accuracy",
    description: "Advanced algorithms deliver precision comparable to traditional perimeters, validated through extensive clinical testing."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Conduct visual field tests anywhere using smartphones, tablets, or computers with seamless cross-platform compatibility."
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with end-to-end encryption, secure cloud storage, and comprehensive audit trails."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "SITA-equivalent algorithms optimize testing time while maintaining accuracy, reducing patient fatigue and improving workflow."
  },
  {
    icon: Heart,
    title: "Patient-Centered",
    description: "Intuitive interface and comfortable testing experience designed to reduce anxiety and improve patient compliance."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multi-user support with role-based access, real-time collaboration, and seamless integration with existing workflows."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-background-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={item}
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Built to Cover Your Needs
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Comprehensive visual field testing platform designed for modern healthcare environments
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};