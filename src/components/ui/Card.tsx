import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  onClick 
}) => {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      whileHover={hover ? { y: -2, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={clsx(
        'bg-background-secondary border border-border-subtle rounded-card p-6 shadow-subtle',
        hover && 'hover:shadow-medium hover:border-border-default transition-all duration-200 cursor-pointer',
        onClick && 'text-left w-full',
        className
      )}
    >
      {children}
    </Component>
  );
};