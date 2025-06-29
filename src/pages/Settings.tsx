import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import {
  Save,
  User,
  Bell,
  Monitor,
  Shield,
  Volume2,
  Globe,
  Download,
  Upload,
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
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

export const Settings: React.FC = () => {
  const { dashboardFrequency, setDashboardFrequency } = useStore();
  
  const [settings, setSettings] = useState({
    // Motion
    reducedMotion: false,
    
    // Notifications
    emailNotifications: true,
    smsAlerts: false,
    appointmentReminders: true,
    testResultNotifications: true,
    
    // Audio
    masterVolume: 80,
    alertVolume: 60,
    feedbackVolume: 70,
    
    // Privacy
    dataRetention: '7years',
    autoBackup: true,
    auditLog: true,
    
    // System
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDashboardFrequencyChange = (frequency: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    setDashboardFrequency(frequency);
  };

  const saveSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-success text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Settings saved successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
            <p className="text-text-secondary">Customize your application preferences</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <Button variant="tertiary" icon={<Download className="w-4 h-4" />}>
              Export Settings
            </Button>
            <Button icon={<Save className="w-4 h-4" />} onClick={saveSettings}>
              Save Changes
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dashboard Settings */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Dashboard Settings</h3>
                <p className="text-text-tertiary text-sm">Configure dashboard display preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Chart Time Period
                </label>
                <p className="text-text-tertiary text-xs mb-4">
                  Choose the time period for dashboard charts and analytics
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'daily', label: 'Daily', icon: Clock, desc: 'Last 24 hours' },
                    { value: 'weekly', label: 'Weekly', icon: Calendar, desc: 'Last 7 days' },
                    { value: 'monthly', label: 'Monthly', icon: TrendingUp, desc: 'Last 30 days' },
                    { value: 'yearly', label: 'Yearly', icon: BarChart3, desc: 'Last 12 months' }
                  ].map((period) => (
                    <button
                      key={period.value}
                      onClick={() => handleDashboardFrequencyChange(period.value as any)}
                      className={`p-4 rounded-button border-2 transition-all text-center ${
                        dashboardFrequency === period.value
                          ? 'border-accent-primary bg-accent-primary/10'
                          : 'border-border-default hover:border-border-strong'
                      }`}
                    >
                      <period.icon className={`w-6 h-6 mx-auto mb-2 ${
                        dashboardFrequency === period.value ? 'text-accent-primary' : 'text-text-tertiary'
                      }`} />
                      <p className={`text-sm font-medium ${
                        dashboardFrequency === period.value ? 'text-accent-primary' : 'text-text-primary'
                      }`}>
                        {period.label}
                      </p>
                      <p className="text-xs text-text-tertiary mt-1">{period.desc}</p>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-background-tertiary rounded-lg">
                  <p className="text-sm text-text-secondary">
                    <strong>Current setting:</strong> {dashboardFrequency.charAt(0).toUpperCase() + dashboardFrequency.slice(1)} view
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    This affects the test volume chart, reliability trends, and activity timeline on your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Interface Preferences */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-accent-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Interface</h3>
                <p className="text-text-tertiary text-sm">Customize interface behavior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                    className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                  />
                  <div>
                    <span className="text-text-primary font-medium">Reduce motion</span>
                    <p className="text-text-tertiary text-xs">Minimize animations and transitions</p>
                  </div>
                </label>
              </div>
              
              <div className="p-4 bg-background-tertiary rounded-lg">
                <h4 className="font-medium text-text-primary mb-2">Theme</h4>
                <p className="text-text-secondary text-sm">
                  This application uses a professional dark theme optimized for clinical environments.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                <p className="text-text-tertiary text-sm">Manage notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-text-primary">Email notifications</span>
                  <p className="text-text-tertiary text-xs">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                  className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <span className="text-text-primary">SMS alerts</span>
                  <p className="text-text-tertiary text-xs">Urgent notifications via SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsAlerts}
                  onChange={(e) => updateSetting('smsAlerts', e.target.checked)}
                  className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <span className="text-text-primary">Appointment reminders</span>
                  <p className="text-text-tertiary text-xs">Reminders for upcoming appointments</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={(e) => updateSetting('appointmentReminders', e.target.checked)}
                  className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <span className="text-text-primary">Test result notifications</span>
                  <p className="text-text-tertiary text-xs">Alerts when test results are ready</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.testResultNotifications}
                  onChange={(e) => updateSetting('testResultNotifications', e.target.checked)}
                  className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                />
              </label>
            </div>
          </Card>
        </motion.div>

        {/* Audio */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Audio</h3>
                <p className="text-text-tertiary text-sm">Configure audio settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Master Volume: {settings.masterVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.masterVolume}
                  onChange={(e) => updateSetting('masterVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Alert Volume: {settings.alertVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.alertVolume}
                  onChange={(e) => updateSetting('alertVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Feedback Volume: {settings.feedbackVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.feedbackVolume}
                  onChange={(e) => updateSetting('feedbackVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-error/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Privacy & Security</h3>
                <p className="text-text-tertiary text-sm">Data protection and security</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Data Retention</label>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => updateSetting('dataRetention', e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="1year">1 Year</option>
                  <option value="3years">3 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="7years">7 Years</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-text-primary">Automatic backup</span>
                    <p className="text-text-tertiary text-xs">Daily automated data backups</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => updateSetting('autoBackup', e.target.checked)}
                    className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-text-primary">Enable audit log</span>
                    <p className="text-text-tertiary text-xs">Track all system activities</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.auditLog}
                    onChange={(e) => updateSetting('auditLog', e.target.checked)}
                    className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                  />
                </label>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-info/20 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-info" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">System</h3>
                <p className="text-text-tertiary text-sm">System and regional preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSetting('timezone', e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Date Format</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => updateSetting('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Data Management</h3>
                <p className="text-text-tertiary text-sm">Backup and restore your data</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Button icon={<Download className="w-4 h-4" />} className="w-full">
                  Export All Data
                </Button>
                <Button variant="secondary" icon={<Upload className="w-4 h-4" />} className="w-full">
                  Import Data
                </Button>
              </div>
              
              <div className="bg-background-tertiary rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Last Backup</h4>
                <p className="text-text-secondary text-sm mb-3">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
                <p className="text-text-tertiary text-xs">
                  Data size: 2.4 MB • Includes 45 patients, 127 test results
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};