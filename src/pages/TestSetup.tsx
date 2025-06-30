import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import {
  Search,
  Plus,
  Play,
  Eye,
  Clock,
  Settings,
  Save,
  User,
  ChevronDown,
  Info,
} from 'lucide-react';
import { TestConfiguration } from '../types';

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

export const TestSetup: React.FC = () => {
  const navigate = useNavigate();
  const { patients, setCurrentPatient, setCurrentTest } = useStore();
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  const [testConfig, setTestConfig] = useState<TestConfiguration>({
    testType: '24-2',
    strategy: 'SITA Standard',
    eye: 'OD',
    duration: 300,
    stimulusSize: 3,
    stimulusIntensity: 10,
    fixationMonitoring: true,
    notes: '',
    // Advanced parameters with defaults
    backgroundLuminance: 31.5, // cd/m²
    stimulusDuration: 200, // milliseconds
    interStimulusInterval: 1000, // milliseconds
    falsePositiveRate: 15, // percentage
    falseNegativeRate: 33, // percentage
    customSettings: {},
  });

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  const handleStartTest = () => {
    if (selectedPatientData) {
      setCurrentPatient(selectedPatientData);
      setCurrentTest(testConfig);
      navigate('/app/test');
    }
  };

  const saveTemplate = () => {
    // Save current configuration as a template
    const templateName = `${testConfig.testType}_${testConfig.strategy}_${Date.now()}`;
    const template = {
      name: templateName,
      config: testConfig,
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage for now (could be moved to database later)
    const existingTemplates = JSON.parse(localStorage.getItem('testTemplates') || '[]');
    existingTemplates.push(template);
    localStorage.setItem('testTemplates', JSON.stringify(existingTemplates));
    
    alert(`Template "${templateName}" saved successfully!`);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Test Setup</h1>
            <p className="text-text-secondary">Configure visual field test parameters</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <Button variant="tertiary" icon={<Save className="w-4 h-4" />} onClick={saveTemplate}>
              Save Template
            </Button>
            <Button 
              icon={<Play className="w-4 h-4" />}
              disabled={!selectedPatient}
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      setSelectedPatient(patient.id);
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
                
                <button 
                  className="w-full flex items-center space-x-3 p-3 hover:bg-background-secondary transition-colors text-left border-t border-border-subtle"
                  onClick={() => navigate('/app/patients')}
                >
                  <div className="w-10 h-10 bg-accent-primary rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-accent-primary">Add New Patient</p>
                    <p className="text-sm text-text-tertiary">Create new patient record</p>
                  </div>
                </button>
              </div>
            )}

            {/* Selected Patient */}
            {selectedPatientData && (
              <div className="bg-background-tertiary rounded-input p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={selectedPatientData.avatar}
                    alt={`${selectedPatientData.firstName} ${selectedPatientData.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">
                      {selectedPatientData.firstName} {selectedPatientData.lastName}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      DOB: {new Date(selectedPatientData.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-text-secondary space-y-1">
                  <p>Previous tests: {selectedPatientData.totalTests}</p>
                  <p>Last visit: {new Date(selectedPatientData.lastVisit).toLocaleDateString()}</p>
                  <p>Conditions: {selectedPatientData.medicalHistory.join(', ')}</p>
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

              {/* Standard Advanced Settings */}
              <div className="border-t border-border-subtle pt-6">
                <h4 className="text-lg font-medium text-text-primary mb-4">Standard Parameters</h4>
                
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
                      Stimulus Intensity (dB)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={testConfig.stimulusIntensity}
                      onChange={(e) => setTestConfig(prev => ({ ...prev, stimulusIntensity: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-text-tertiary mt-1">
                      <span>0 dB</span>
                      <span>{testConfig.stimulusIntensity} dB</span>
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

              {/* Advanced Settings Toggle */}
              <div className="border-t border-border-subtle pt-6">
                <button
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="flex items-center space-x-2 text-accent-primary hover:text-accent-primary/80 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Advanced Parameters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedSettings ? 'rotate-180' : ''}`} />
                </button>
                
                {showAdvancedSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-6"
                  >
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Info className="w-4 h-4 text-info" />
                        <span className="text-sm text-text-secondary">
                          These advanced parameters affect test sensitivity and accuracy. Modify only if you understand their clinical implications.
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Background Luminance (cd/m²)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={testConfig.backgroundLuminance}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, backgroundLuminance: parseFloat(e.target.value) }))}
                            className="w-full px-3 py-2 bg-background-secondary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                          />
                          <p className="text-xs text-text-tertiary mt-1">Standard: 31.5 cd/m²</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Stimulus Duration (ms)
                          </label>
                          <input
                            type="number"
                            value={testConfig.stimulusDuration}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, stimulusDuration: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 bg-background-secondary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                          />
                          <p className="text-xs text-text-tertiary mt-1">Standard: 200 ms</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Inter-stimulus Interval (ms)
                          </label>
                          <input
                            type="number"
                            value={testConfig.interStimulusInterval}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, interStimulusInterval: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 bg-background-secondary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                          />
                          <p className="text-xs text-text-tertiary mt-1">Standard: 1000 ms</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            False Positive Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={testConfig.falsePositiveRate}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, falsePositiveRate: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 bg-background-secondary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                          />
                          <p className="text-xs text-text-tertiary mt-1">Standard: 15%</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            False Negative Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={testConfig.falseNegativeRate}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, falseNegativeRate: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 bg-background-secondary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                          />
                          <p className="text-xs text-text-tertiary mt-1">Standard: 33%</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Notes */}
              <div className="border-t border-border-subtle pt-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Test Notes
                </label>
                <textarea
                  value={testConfig.notes}
                  onChange={(e) => setTestConfig(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any special instructions or notes for this test..."
                  rows={4}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-none"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Test Preview */}
      {selectedPatient && (
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Test Preview</h3>
              <div className="flex items-center space-x-2 text-text-tertiary">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Estimated duration: {Math.ceil(testConfig.duration / 60)} minutes</span>
              </div>
            </div>
            
            <div className="bg-background-tertiary rounded-input p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-text-tertiary">Patient</p>
                  <p className="text-text-primary font-medium">
                    {selectedPatientData?.firstName} {selectedPatientData?.lastName}
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
              
              {/* Advanced Parameters Summary */}
              <div className="border-t border-border-subtle pt-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <p className="text-text-tertiary">Stimulus Size</p>
                    <p className="text-text-secondary">Size {testConfig.stimulusSize}</p>
                  </div>
                  <div>
                    <p className="text-text-tertiary">Intensity</p>
                    <p className="text-text-secondary">{testConfig.stimulusIntensity} dB</p>
                  </div>
                  <div>
                    <p className="text-text-tertiary">Fixation Monitor</p>
                    <p className="text-text-secondary">{testConfig.fixationMonitoring ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <div>
                    <p className="text-text-tertiary">Background</p>
                    <p className="text-text-secondary">{testConfig.backgroundLuminance} cd/m²</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};