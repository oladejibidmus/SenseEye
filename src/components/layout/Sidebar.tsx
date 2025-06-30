import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Settings as SettingsIcon,
  Eye,
  BarChart3,
  Users,
  User,
  Menu,
  X,
  Activity,
  Calendar,
  Shield,
  LogOut,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', path: '/app', description: 'Overview and statistics' },
  { icon: SettingsIcon, label: 'Test Setup', path: '/app/setup', description: 'Configure test parameters' },
  { icon: Eye, label: 'Visual Field Test', path: '/app/test', description: 'Conduct visual field testing' },
  { icon: BarChart3, label: 'Results', path: '/app/results', description: 'View and analyze test results' },
  { icon: Users, label: 'Patient Management', path: '/app/patients', description: 'Manage patient records' },
  { icon: SettingsIcon, label: 'Settings', path: '/app/settings', description: 'Application preferences' },
];

const quickActions = [
  { icon: Activity, label: 'Quick Test', action: 'start-test' },
  { icon: Calendar, label: 'Schedule', action: 'schedule' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // The auth state change will automatically redirect to sign in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: window.innerWidth >= 1024 ? 0 : (isOpen ? 0 : -280)
        }}
        className={clsx(
          'bg-background-secondary border-r border-border-subtle',
          'w-64 lg:w-72 h-screen',
          // Desktop: always visible, sticky positioning
          'lg:sticky lg:top-0 lg:z-30 lg:translate-x-0',
          // Mobile: fixed overlay when open
          'fixed left-0 top-0 z-50 lg:block',
          !isOpen && 'hidden lg:block'
        )}
      >
        {/* Header - Sticky within sidebar */}
        <div className="sticky top-0 z-10 bg-background-secondary border-b border-border-subtle">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">VisionTest</h1>
                <p className="text-xs text-text-tertiary">Clinical Platform</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-background-tertiary rounded-button transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-background-tertiary scrollbar-thumb-border-strong">
          <nav className="p-4">
            <div className="mb-6">
              <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 px-3">
                Navigation
              </h3>
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center space-x-3 px-3 py-3 rounded-button transition-all duration-200',
                          'hover:bg-background-tertiary group',
                          isActive
                            ? 'bg-accent-primary text-white shadow-medium'
                            : 'text-text-secondary hover:text-text-primary'
                        )
                      }
                      onClick={() => window.innerWidth < 1024 && onToggle()}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block truncate">{item.label}</span>
                        <span className="text-xs opacity-75 block truncate">{item.description}</span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 px-3">
                Quick Actions
              </h3>
              <ul className="space-y-1">
                {quickActions.map((action) => (
                  <li key={action.action}>
                    <button
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-button transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-background-tertiary"
                      onClick={() => {
                        // Handle quick actions here
                        console.log(`Quick action: ${action.action}`);
                      }}
                    >
                      <action.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{action.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* User Profile - Sticky at bottom */}
        <div className="sticky bottom-0 bg-background-secondary border-t border-border-subtle">
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 rounded-button hover:bg-background-tertiary transition-colors cursor-pointer mb-3">
              <div className="w-10 h-10 bg-accent-secondary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{getUserDisplayName()}</p>
                <p className="text-xs text-text-tertiary truncate">Ophthalmic Technician</p>
              </div>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-button transition-all duration-200 text-text-secondary hover:text-error hover:bg-error/10 group"
            >
              <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-error transition-colors" />
              <span className="font-medium group-hover:text-error transition-colors">Sign Out</span>
            </button>
            
            {/* Status and Settings */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Online</span>
              <button className="p-1 hover:bg-background-tertiary rounded transition-colors">
                <Shield className="w-3 h-3 text-text-tertiary" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};