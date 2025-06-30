import React from 'react';
import { motion } from 'framer-motion';

interface TextEffectProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  preset?: 'fade-in-blur';
  speedSegment?: number;
  delay?: number;
  per?: 'line' | 'word' | 'char';
}

export const TextEffect: React.FC<TextEffectProps> = ({
  children,
  className = '',
  as: Component = 'div',
  preset = 'fade-in-blur',
  speedSegment = 0.3,
  delay = 0,
  per = 'word'
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(12px)',
      y: 20 
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      <Component className={className}>
        {children}
      </Component>
    </motion.div>
  );
};