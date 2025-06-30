import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  default: 'bg-[#FF6A1A] text-white hover:bg-[#E55A0F] focus:ring-[#FF6A1A]',
  outline: 'border border-gray-300 text-gray-700 hover:border-[#FF6A1A] hover:text-[#FF6A1A] bg-white',
  ghost: 'text-gray-600 hover:text-[#FF6A1A] hover:bg-gray-100',
  link: 'text-[#FF6A1A] hover:text-[#E55A0F] underline-offset-4 hover:underline',
};

const buttonSizes = {
  default: 'px-4 py-2 text-sm',
  sm: 'px-3 py-1.5 text-xs',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const classes = clsx(
      baseClasses,
      buttonVariants[variant],
      buttonSizes[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: clsx(classes, children.props.className),
        ref,
        ...props,
      });
    }

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';