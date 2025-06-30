import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface AccordionContextType {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  type,
  collapsible = false,
  value,
  onValueChange,
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    type === 'single' ? '' : []
  );

  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = onValueChange || setInternalValue;

  return (
    <AccordionContext.Provider
      value={{
        type,
        value: currentValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={clsx('space-y-4', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className,
  children,
}) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isOpen = context.type === 'single' 
    ? context.value === value
    : Array.isArray(context.value) && context.value.includes(value);

  return (
    <div className={clsx('border border-gray-200 rounded-xl overflow-hidden', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { value, isOpen, context } as any)
          : child
      )}
    </div>
  );
};

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isOpen?: boolean;
  context?: AccordionContextType;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
  value,
  isOpen,
  context,
}) => {
  if (!context || !value) return null;

  const handleClick = () => {
    if (context.type === 'single') {
      const newValue = isOpen ? '' : value;
      context.onValueChange?.(newValue);
    } else {
      const currentArray = Array.isArray(context.value) ? context.value : [];
      const newValue = isOpen
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      context.onValueChange?.(newValue);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full px-6 py-5 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-200',
        isOpen && 'bg-[#FF6A1A]/5 border-[#FF6A1A]/20',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {children}
    </button>
  );
};

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isOpen?: boolean;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx('px-6 pb-5 pt-0', className)}
    >
      {children}
    </motion.div>
  );
};