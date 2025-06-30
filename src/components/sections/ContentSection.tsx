import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  User,
  Eye,
  Clock,
  Settings,
  Play,
  ChevronDown,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

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

// Mock patient data for demo
const mockPatients = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1965-03-15',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastVisit: '2024-01-15',
    totalTests: 8,
    medicalHistory: ['Glaucoma', 'Hypertension']
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    dateOfBirth: '1972-08-22',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastVisit: '2024-01-20',
    totalTests: 12,
    medicalHistory: ['Diabetic Retinopathy', 'Type 2 Diabetes']
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    dateOfBirth: '1958-11-03',
    email: 'emma.rodriguez@email.com',
    phone: '(555) 345-6789',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastVisit: '2024-01-10',
    totalTests: 15,
    medicalHistory: ['Age-related Macular Degeneration']
  }
];

export const ContentSection: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [testConfig, setTestConfig] = useState({
    testType: '24-2',
    strategy: 'SITA Standard',
    eye: 'OD',
    duration: 300,
    stimulusSize: 3,
    stimulusIntensity: 10,
    fixationMonitoring: true
  });

  const filteredPatients = mockPatients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 md:py-32 bg-background-primary">
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
            Streamlined Test Setup Workflow
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Experience our intuitive test configuration interface that makes visual field testing 
            simple and efficient for your clinical workflow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Patient Selection */}
          <motion.div variants={item} className="lg:col-span-1">
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Patient Selection</h3>
                <p className="text-text-tertiary text-sm">Choose patient for testing</p>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowPatientDropdown(true)}
                  className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                />
              </div>

              {/* Patient Dropdown */}
              {showPatientDropdown && (
                <div className="bg-background-tertiary border border-border-default rounded-input max-h-60 overflow-y-auto mb-4">
                  {filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => {
                        setSelectedPatient(patient);
                        setSearchTerm(`${patient.firstName} ${patient.lastName}`);
                        setShowPatientDropdown(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-background-secondary transition-colors text-left"
                    >
                      <img
                        src={patient.avatar}
                        alt={`${patient.firstName} ${patient.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-text-primary">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-sm text-text-tertiary">
                          Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Patient */}
              {selectedPatient && (
                <div className="bg-background-tertiary rounded-input p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedPatient.avatar}
                      alt={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-text-primary">
                        {selectedPatient.firstName} {selectedPatient.lastName}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <span>{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <p>Previous tests: {selectedPatient.totalTests}</p>
                    <p>Conditions: {selectedPatient.medicalHistory.join(', ')}</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Test Configuration */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Test Configuration</h3>
                <p className="text-text-tertiary text-sm">Configure test parameters and settings</p>
              </div>

              <div className="space-y-6">
                {/* Basic Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Test Type
                    </label>
                    <select
                      value={testConfig.testType}
                      onChange={(e) => setTestConfig(prev => ({ ...prev, testType: e.target.value }))}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    >
                      <option value="24-2">24-2 Swedish Interactive Threshold</option>
                      <option value="30-2">30-2 Swedish Interactive Threshold</option>
                      <option value="10-2">10-2 Swedish Interactive Threshold</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Strategy
                    </label>
                    <select
                      value={testConfig.strategy}
                      onChange={(e) => setTestConfig(prev => ({ ...prev, strategy: e.target.value }))}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    >
                      <option value="SITA Standard">SITA Standard</option>
                      <option value="SITA Fast">SITA Fast</option>
                      <option value="Full Threshold">Full Threshold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Eye Selection
                    </label>
                    <div className="flex space-x-2">
                      {['OD', 'OS', 'OU'].map((eye) => (
                        <button
                          key={eye}
                          onClick={() => setTestConfig(prev => ({ ...prev, eye }))}
                          className={`flex-1 px-4 py-2 rounded-button border transition-colors ${
                            testConfig.eye === eye
                              ? 'bg-accent-primary text-white border-accent-primary'
                              : 'bg-background-tertiary text-text-primary border-border-default hover:border-border-strong'
                          }`}
                        >
                          {eye}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={testConfig.duration}
                      onChange={(e) => setTestConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Advanced Parameters */}
                <div className="border-t border-border-subtle pt-6">
                  <h4 className="text-lg font-medium text-text-primary mb-4">Advanced Parameters</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Stimulus Size
                      </label>
                      <select
                        value={testConfig.stimulusSize}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, stimulusSize: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                      >
                        <option value={1}>Size I (0.1°)</option>
                        <option value={2}>Size II (0.2°)</option>
                        <option value={3}>Size III (0.43°)</option>
                        <option value={4}>Size IV (0.86°)</option>
                        <option value={5}>Size V (1.72°)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Stimulus Intensity: {testConfig.stimulusIntensity} dB
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={testConfig.stimulusIntensity}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, stimulusIntensity: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-text-tertiary mt-1">
                        <span>0 dB</span>
                        <span>40 dB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={testConfig.fixationMonitoring}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, fixationMonitoring: e.target.checked }))}
                        className="w-4 h-4 text-accent-primary border-border-default rounded focus:ring-accent-primary"
                      />
                      <span className="text-text-primary font-medium">Enable Fixation Monitoring</span>
                    </label>
                    <p className="text-sm text-text-tertiary mt-1 ml-7">
                      Monitor patient's fixation during the test
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Test Preview */}
        <motion.div variants={item} className="mt-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Test Preview</h3>
              <div className="flex items-center space-x-2 text-text-tertiary">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Estimated duration: {Math.ceil(testConfig.duration / 60)} minutes</span>
              </div>
            </div>
            
            <div className="bg-background-tertiary rounded-input p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-text-tertiary">Patient</p>
                  <p className="text-text-primary font-medium">
                    {selectedPatient?.firstName} {selectedPatient?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-text-tertiary">Test Type</p>
                  <p className="text-text-primary font-medium">{testConfig.testType}</p>
                </div>
                <div>
                  <p className="text-text-tertiary">Strategy</p>
                  <p className="text-text-primary font-medium">{testConfig.strategy}</p>
                </div>
                <div>
                  <p className="text-text-tertiary">Eye</p>
                  <p className="text-text-primary font-medium">{testConfig.eye}</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  icon={<Play className="w-4 h-4" />}
                  size="lg"
                  className="px-8"
                >
                  Start Test Demo
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          variants={container}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={item} className="text-center">
            <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Patient Management</h3>
            <p className="text-text-secondary text-sm">
              Comprehensive patient database with medical history, test records, and scheduling integration.
            </p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-accent-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Advanced Configuration</h3>
            <p className="text-text-secondary text-sm">
              Customizable test parameters with clinical-grade precision for specialized testing requirements.
            </p>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Real-time Testing</h3>
            <p className="text-text-secondary text-sm">
              Live test monitoring with instant feedback and quality control for reliable results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};