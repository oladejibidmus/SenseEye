import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-background-secondary border-b border-border-subtle px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-background-tertiary rounded-button transition-colors"
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search patients, tests..."
              className="pl-10 pr-4 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-background-tertiary rounded-button transition-colors"
          >
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-primary rounded-full"></span>
          </motion.button>
          
          <div className="text-right">
            <p className="text-sm font-medium text-text-primary">Good morning</p>
            <p className="text-xs text-text-tertiary">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};