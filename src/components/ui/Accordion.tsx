import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}

const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}>({
  openItems: [],
  toggleItem: () => {},
  type: 'single'
});

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
}>({
  value: '',
  isOpen: false
});

export const Accordion: React.FC<AccordionProps> = ({ 
  type, 
  collapsible = false, 
  className = '', 
  children 
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems(prev => 
        prev.includes(value) ? (collapsible ? [] : prev) : [value]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  value, 
  className = '', 
  children 
}) => {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={className}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  className = '', 
  children 
}) => {
  const { toggleItem } = React.useContext(AccordionContext);
  const { value, isOpen } = React.useContext(AccordionItemContext);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={`flex w-full items-center justify-between text-left ${className}`}
    >
      {children}
      <ChevronDown 
        className={`w-4 h-4 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} 
      />
    </button>
  );
};

export const AccordionContent: React.FC<AccordionContentProps> = ({ 
  className = '', 
  children 
}) => {
  const { isOpen } = React.useContext(AccordionItemContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className={className}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};