import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
}

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({
  children,
  className = '',
  variants
}) => {
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  };

  const finalVariants = variants || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={finalVariants.container}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={finalVariants.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};