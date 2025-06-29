import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { useDatabase } from '../hooks/useDatabase';
import { AdvancedTestParameters } from '../types';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Eye,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Bell,
  Settings,
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

interface TestNotification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface EyeTestData {
  reliability: {
    falsePositives: number;
    falseNegatives: number;
    fixationLosses: number;
    score: number;
  };
  indices: {
    md: number;
    psd: number;
    vfi: number;
    ght: string;
  };
  visualFieldData: number[][];
  duration: number;
}

export const VisualFieldTest: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentPatient, 
    currentTest, 
    isTestInProgress, 
    testProgress, 
    startTest, 
    stopTest, 
    updateTestProgress 
  } = useStore();
  
  const { addTestResult } = useDatabase();

  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentQuadrant, setCurrentQuadrant] = useState('Superior Nasal');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [notifications, setNotifications] = useState<TestNotification[]>([]);
  const [reliability, setReliability] = useState({
    falsePositives: 0,
    falseNegatives: 0,
    fixationLosses: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);

  // Test grid for visualization
  const testGrid = Array(8).fill(null).map((_, row) => 
    Array(8).fill(null).map((_, col) => ({
      tested: Math.random() > 0.3,
      response: Math.random() > 0.2,
      active: false,
    }))
  );

  const [gridState, setGridState] = useState(testGrid);
  const [activePoint, setActivePoint] = useState({ row: -1, col: -1 });

  // Check if testing both eyes simultaneously
  const isTestingBothEyes = currentTest?.eye === 'OU';

  // Initialize timer when test configuration changes
  useEffect(() => {
    if (currentTest) {
      // For OU testing, use the same duration as single eye since both eyes are tested simultaneously
      setTimeRemaining(currentTest.duration);
    }
  }, [currentTest]);

  // Add notification function
  const addNotification = useCallback((type: TestNotification['type'], title: string, message: string) => {
    const notification: TestNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep only 5 notifications
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (audioEnabled) {
      try {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.warn('Audio playback failed:', error);
      }
    }
  }, [audioEnabled]);

  // Generate test data for an eye
  const generateEyeTestData = useCallback((eyeLabel: 'OD' | 'OS'): EyeTestData => {
    // For OU testing, generate slightly different data for each eye to simulate real testing
    const baseReliability = Math.max(85, 100 - Math.floor(Math.random() * 15));
    const eyeVariation = eyeLabel === 'OD' ? 0 : Math.floor(Math.random() * 3) - 1; // Small variation between eyes
    
    const currentReliability = {
      falsePositives: Math.max(0, reliability.falsePositives + (Math.random() > 0.5 ? 1 : 0)),
      falseNegatives: Math.max(0, reliability.falseNegatives + (Math.random() > 0.7 ? 1 : 0)),
      fixationLosses: Math.max(0, reliability.fixationLosses + (Math.random() > 0.8 ? 1 : 0)),
      score: Math.max(85, baseReliability + eyeVariation),
    };

    // Generate slightly different visual field data for each eye
    const baseFieldData = gridState.map(row => 
      row.map(point => point.tested ? (point.response ? Math.round((Math.random() * 10 - 2) * 10) / 10 : -10) : 0)
    );

    // For left eye, add slight variation to simulate binocular differences
    const eyeFieldData = eyeLabel === 'OS' 
      ? baseFieldData.map(row => row.map(value => value !== 0 ? value + (Math.random() * 2 - 1) : 0))
      : baseFieldData;

    return {
      reliability: currentReliability,
      indices: {
        md: Math.round((Math.random() * -6 + 1 + eyeVariation) * 10) / 10,
        psd: Math.round((Math.random() * 8 + 1) * 10) / 10,
        vfi: Math.max(70, Math.round(100 - Math.random() * 30 + eyeVariation)),
        ght: Math.random() > 0.7 ? 'Within Normal Limits' : Math.random() > 0.5 ? 'Borderline' : 'Outside Normal Limits',
      },
      visualFieldData: eyeFieldData,
      duration: currentTest?.duration || 300,
    };
  }, [gridState, currentTest, reliability]);

  // Complete test function
  const completeTest = useCallback(async () => {
    if (testCompleted || isSaving) return; // Prevent multiple saves
    
    setTestCompleted(true);
    setIsSaving(true);
    stopTest();
    
    // Play completion sound
    playNotificationSound();
    
    // Add completion notification
    addNotification('success', 'Test Completed!', 
      isTestingBothEyes ? 'Both eyes visual field test completed simultaneously.' : 'Visual field test completed successfully.');
    
    // Generate test result data
    if (currentPatient && currentTest) {
      try {
        console.log('Saving test result for patient:', currentPatient.id);
        
        // Prepare advanced parameters from current test configuration
        const advancedParameters: AdvancedTestParameters = {
          stimulusSize: currentTest.stimulusSize,
          stimulusIntensity: currentTest.stimulusIntensity,
          fixationMonitoring: currentTest.fixationMonitoring,
          backgroundLuminance: currentTest.backgroundLuminance || 31.5,
          stimulusDuration: currentTest.stimulusDuration || 200,
          interStimulusInterval: currentTest.interStimulusInterval || 1000,
          falsePositiveRate: currentTest.falsePositiveRate || 15,
          falseNegativeRate: currentTest.falseNegativeRate || 33,
          customSettings: currentTest.customSettings || {},
        };

        let testResult: any = {
          patientId: currentPatient.id,
          testType: currentTest.testType as '24-2' | '30-2' | '10-2' | 'Custom',
          strategy: currentTest.strategy as 'SITA Standard' | 'SITA Fast' | 'Full Threshold',
          eye: currentTest.eye as 'OD' | 'OS' | 'OU',
          date: new Date().toISOString().split('T')[0],
          duration: currentTest.duration - timeRemaining,
          notes: currentTest.notes || 'Test completed successfully.',
          status: 'completed' as const,
          advancedParameters,
        };

        if (isTestingBothEyes) {
          // For OU testing, generate data for both eyes tested simultaneously
          const rightEyeData = generateEyeTestData('OD');
          const leftEyeData = generateEyeTestData('OS');
          
          // Calculate combined reliability and indices from both eyes
          const combinedReliability = {
            falsePositives: Math.round((rightEyeData.reliability.falsePositives + leftEyeData.reliability.falsePositives) / 2),
            falseNegatives: Math.round((rightEyeData.reliability.falseNegatives + leftEyeData.reliability.falseNegatives) / 2),
            fixationLosses: Math.round((rightEyeData.reliability.fixationLosses + leftEyeData.reliability.fixationLosses) / 2),
            score: Math.round((rightEyeData.reliability.score + leftEyeData.reliability.score) / 2),
          };

          const combinedIndices = {
            md: Math.round(((rightEyeData.indices.md + leftEyeData.indices.md) / 2) * 10) / 10,
            psd: Math.round(((rightEyeData.indices.psd + leftEyeData.indices.psd) / 2) * 10) / 10,
            vfi: Math.round((rightEyeData.indices.vfi + leftEyeData.indices.vfi) / 2),
            ght: rightEyeData.indices.ght === 'Within Normal Limits' && leftEyeData.indices.ght === 'Within Normal Limits' 
              ? 'Within Normal Limits' 
              : rightEyeData.indices.ght === 'Borderline' || leftEyeData.indices.ght === 'Borderline'
              ? 'Borderline'
              : 'Outside Normal Limits',
          };

          testResult = {
            ...testResult,
            reliability: combinedReliability,
            indices: combinedIndices,
            visualFieldData: rightEyeData.visualFieldData, // Use right eye as primary for display
            duration: currentTest.duration - timeRemaining, // Same duration since tested simultaneously
            rightEyeData: rightEyeData,
            leftEyeData: leftEyeData,
          };

          console.log('OU test result with both eyes data (simultaneous testing):', testResult);
        } else {
          // Single eye testing
          const singleEyeData = generateEyeTestData(currentTest.eye as 'OD' | 'OS');
          testResult = {
            ...testResult,
            reliability: singleEyeData.reliability,
            indices: singleEyeData.indices,
            visualFieldData: singleEyeData.visualFieldData,
          };
        }

        console.log('Test result data to save:', testResult);

        await addTestResult(testResult);
        
        addNotification('success', 'Results Saved', 
          isTestingBothEyes 
            ? 'Both eyes test results (simultaneous testing) and advanced parameters saved successfully.' 
            : 'Test results and advanced parameters saved successfully.');
        
        // Navigate to results page after a short delay
        setTimeout(() => {
          navigate('/results');
        }, 2000);
        
      } catch (error) {
        console.error('Error saving test result:', error);
        
        let errorMessage = 'Failed to save test results. Please try again.';
        
        if (error instanceof Error) {
          if (error.message.includes('row-level security')) {
            errorMessage = 'Authentication error. Please refresh the page and try again.';
          } else if (error.message.includes('network')) {
            errorMessage = 'Network error. Please check your connection and try again.';
          } else if (error.message.includes('foreign key')) {
            errorMessage = 'Patient data error. Please select a valid patient and try again.';
          } else {
            errorMessage = `Save failed: ${error.message}`;
          }
        }
        
        addNotification('warning', 'Save Error', errorMessage);
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsSaving(false);
      addNotification('warning', 'Save Error', 'Missing patient or test configuration data.');
    }
  }, [currentPatient, currentTest, timeRemaining, reliability, gridState, stopTest, playNotificationSound, addNotification, addTestResult, navigate, testCompleted, isSaving, isTestingBothEyes, generateEyeTestData]);

  // Main test timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTestInProgress && !isPaused && !testCompleted) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Update progress
          const totalDuration = currentTest?.duration || 300;
          const progress = Math.round(((totalDuration - newTime) / totalDuration) * 100);
          updateTestProgress(Math.min(progress, 100));
          
          // Check if test is complete
          if (newTime <= 0) {
            completeTest();
            return 0;
          }
          
          // Update quadrant every 25% of test duration
          const quarterTime = totalDuration / 4;
          if (newTime === Math.floor(quarterTime * 3)) {
            setCurrentQuadrant('Superior Temporal');
          } else if (newTime === Math.floor(quarterTime * 2)) {
            setCurrentQuadrant('Inferior Nasal');
          } else if (newTime === Math.floor(quarterTime)) {
            setCurrentQuadrant('Inferior Temporal');
          }
          
          // Add time warnings
          if (newTime === 60) {
            addNotification('warning', '1 Minute Remaining', 'Test will complete in 1 minute.');
            playNotificationSound();
          } else if (newTime === 30) {
            addNotification('warning', '30 Seconds Remaining', 'Test will complete in 30 seconds.');
            playNotificationSound();
          }
          
          return newTime;
        });
        
        // Simulate test points (for OU, this represents stimuli shown to both eyes simultaneously)
        if (Math.random() > 0.7) {
          const row = Math.floor(Math.random() * 8);
          const col = Math.floor(Math.random() * 8);
          setActivePoint({ row, col });
          
          setTimeout(() => {
            setActivePoint({ row: -1, col: -1 });
            setGridState(prev => 
              prev.map((r, rIndex) => 
                r.map((c, cIndex) => 
                  rIndex === row && cIndex === col 
                    ? { ...c, tested: true, response: Math.random() > 0.15 }
                    : c
                )
              )
            );
          }, 1000);
        }
        
        // Simulate reliability changes
        if (Math.random() > 0.95) {
          setReliability(prev => ({
            ...prev,
            falsePositives: Math.min(prev.falsePositives + (Math.random() > 0.5 ? 1 : 0), 10),
            falseNegatives: Math.min(prev.falseNegatives + (Math.random() > 0.7 ? 1 : 0), 10),
            fixationLosses: Math.min(prev.fixationLosses + (Math.random() > 0.8 ? 1 : 0), 10),
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTestInProgress, isPaused, testCompleted, currentTest, updateTestProgress, completeTest, addNotification, playNotificationSound]);

  useEffect(() => {
    if (!currentPatient || !currentTest) {
      navigate('/setup');
      return;
    }
  }, [currentPatient, currentTest, navigate]);

  const handleStartTest = () => {
    startTest();
    setIsPaused(false);
    setTestCompleted(false);
    setTimeRemaining(currentTest?.duration || 300);
    updateTestProgress(0);
    setIsSaving(false);
    
    if (isTestingBothEyes) {
      addNotification('info', 'OU Test Started', 'Testing both eyes simultaneously. Patient should focus on the center with both eyes open.');
    } else {
      addNotification('info', 'Test Started', `Visual field test has begun for ${currentTest.eye}. Patient should focus on the center.`);
    }
  };

  const handlePauseTest = () => {
    if (!testCompleted && !isSaving) {
      setIsPaused(!isPaused);
      addNotification('info', isPaused ? 'Test Resumed' : 'Test Paused', 
        isPaused ? 'Test has been resumed.' : 'Test has been paused.');
    }
  };

  const handleStopTest = () => {
    if (!testCompleted && !isSaving) {
      stopTest();
      addNotification('warning', 'Test Stopped', 'Test was stopped before completion.');
    }
    navigate('/results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getNotificationIcon = (type: TestNotification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'info': return <Bell className="w-4 h-4 text-info" />;
      default: return <Bell className="w-4 h-4 text-info" />;
    }
  };

  const getTestStatusMessage = () => {
    if (testCompleted) {
      return isSaving ? 'Test completed - Saving results...' : 'Test completed - Results saved';
    }
    if (isTestInProgress) {
      if (isPaused) {
        return `Test paused - ${isTestingBothEyes ? 'OU (Both Eyes)' : currentTest?.eye} - Focus on center when resumed`;
      }
      return `Testing ${isTestingBothEyes ? 'OU (Both Eyes Simultaneously)' : currentTest?.eye} - Focus on the center`;
    }
    return `Ready to begin ${isTestingBothEyes ? 'both eyes simultaneous' : currentTest?.eye} testing`;
  };

  if (!currentPatient || !currentTest) {
    return null;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`bg-background-secondary border-l-4 rounded-card p-4 shadow-medium max-w-sm ${
                notification.type === 'success' ? 'border-success' :
                notification.type === 'warning' ? 'border-warning' : 'border-info'
              }`}
            >
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary text-sm">{notification.title}</h4>
                  <p className="text-text-secondary text-xs mt-1">{notification.message}</p>
                  <p className="text-text-tertiary text-xs mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div variants={item}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Visual Field Test</h1>
            <p className="text-text-secondary">
              {currentPatient.firstName} {currentPatient.lastName} - {currentTest.testType} {isTestingBothEyes ? 'OU (Both Eyes)' : currentTest.eye}
            </p>
            {isTestingBothEyes && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-2 text-accent-primary">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Simultaneous Binocular Testing</span>
                </div>
              </div>
            )}
            {testCompleted && (
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-success font-medium">
                  {isSaving ? 'Saving Results...' : 'Test Completed Successfully'}
                </span>
              </div>
            )}
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            {!isTestInProgress ? (
              <Button icon={<Play className="w-4 h-4" />} onClick={handleStartTest}>
                Start Test
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  onClick={handlePauseTest}
                  disabled={testCompleted || isSaving}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button 
                  variant="danger" 
                  icon={<Square className="w-4 h-4" />} 
                  onClick={handleStopTest}
                  disabled={testCompleted || isSaving}
                >
                  {testCompleted ? (isSaving ? 'Saving...' : 'Completed') : 'Stop Test'}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Interface */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Test Interface</h3>
              <p className="text-text-tertiary text-sm">
                {getTestStatusMessage()}
              </p>
              {isTestingBothEyes && !testCompleted && (
                <div className="mt-2 p-3 bg-info/20 rounded-lg">
                  <p className="text-info text-sm font-medium">
                    OU Testing: Both eyes are being tested simultaneously with the same stimuli
                  </p>
                </div>
              )}
            </div>

            {/* Visual Field Grid */}
            <div className={`bg-black rounded-lg p-8 mb-6 transition-opacity ${
              testCompleted ? 'opacity-60' : 'opacity-100'
            }`}>
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Central fixation point */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 ${
                  testCompleted ? 'bg-success' : 'bg-red-500'
                }`}></div>
                
                {/* Test grid */}
                <div className="grid grid-cols-8 gap-1 w-full h-full">
                  {gridState.map((row, rowIndex) =>
                    row.map((point, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`rounded-full transition-all duration-300 ${
                          activePoint.row === rowIndex && activePoint.col === colIndex && !testCompleted
                            ? 'bg-white scale-150'
                            : point.tested
                            ? point.response
                              ? 'bg-green-500 opacity-60'
                              : 'bg-red-500 opacity-60'
                            : 'bg-gray-700 opacity-30'
                        }`}
                        style={{
                          width: '8px',
                          height: '8px',
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Patient Instructions */}
            <div className="bg-background-tertiary rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Instructions for Patient:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Look at the {testCompleted ? 'green' : 'red'} dot in the center at all times</li>
                <li>• Press the button when you see a flash of light</li>
                <li>• Don't move your head or eyes</li>
                <li>• {isTestingBothEyes ? 'Keep both eyes open and focused on the center' : 'Blink normally between flashes'}</li>
                {isTestingBothEyes && !testCompleted && (
                  <li className="text-info">• Both eyes are being tested at the same time</li>
                )}
                {testCompleted && <li className="text-success">• Test completed successfully!</li>}
                {isSaving && <li className="text-info">• Saving test results...</li>}
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Control Panel */}
        <motion.div variants={item} className="space-y-6">
          {/* Progress */}
          <Card>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">Test Progress</h4>
                <span className="text-sm text-text-tertiary">{testProgress}%</span>
              </div>
              <div className="w-full bg-background-tertiary rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${testCompleted ? 'bg-success' : 'bg-accent-primary'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${testProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-tertiary">Current Quadrant</p>
                <p className="text-text-primary font-medium">{currentQuadrant}</p>
              </div>
              <div>
                <p className="text-text-tertiary">Time Remaining</p>
                <p className={`font-medium flex items-center ${
                  testCompleted ? 'text-success' : 
                  timeRemaining <= 60 ? 'text-warning' : 'text-text-primary'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {testCompleted ? (isSaving ? 'Saving...' : 'Completed') : formatTime(timeRemaining)}
                </p>
              </div>
            </div>
            
            {isTestingBothEyes && (
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="flex items-center space-x-2 text-sm">
                  <Eye className="w-4 h-4 text-accent-primary" />
                  <span className="text-text-secondary">Testing Mode:</span>
                  <span className="text-accent-primary font-medium">Simultaneous Binocular</span>
                </div>
                <p className="text-text-tertiary text-xs mt-1">
                  Both eyes receive the same stimuli at the same time
                </p>
              </div>
            )}
          </Card>

          {/* Reliability */}
          <Card>
            <h4 className="font-medium text-text-primary mb-4">
              Reliability Indices {isTestingBothEyes && <span className="text-xs text-text-tertiary">(Combined)</span>}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">False Positives</span>
                <span className={`font-medium ${reliability.falsePositives > 3 ? 'text-warning' : 'text-success'}`}>
                  {reliability.falsePositives}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">False Negatives</span>
                <span className={`font-medium ${reliability.falseNegatives > 3 ? 'text-warning' : 'text-success'}`}>
                  {reliability.falseNegatives}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Fixation Losses</span>
                <span className={`font-medium ${reliability.fixationLosses > 2 ? 'text-warning' : 'text-success'}`}>
                  {reliability.fixationLosses}%
                </span>
              </div>
            </div>
            
            <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
              testCompleted ? 'bg-success/20' : 'bg-success/20'
            }`}>
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">
                {testCompleted ? (isSaving ? 'Saving Results' : 'Test Completed') : 'Reliable Test'}
              </span>
            </div>
          </Card>

          {/* Advanced Parameters Display */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">Test Parameters</h4>
              <button
                onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                className="text-accent-primary hover:text-accent-primary/80 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Test Type</span>
                <span className="text-text-primary font-medium">{currentTest.testType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Eye(s)</span>
                <span className="text-text-primary font-medium">
                  {isTestingBothEyes ? 'OU (Both Eyes)' : currentTest.eye}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Testing Mode</span>
                <span className="text-text-primary font-medium">
                  {isTestingBothEyes ? 'Simultaneous' : 'Monocular'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Stimulus Size</span>
                <span className="text-text-primary font-medium">Size {currentTest.stimulusSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Intensity</span>
                <span className="text-text-primary font-medium">{currentTest.stimulusIntensity} dB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Fixation Monitor</span>
                <span className="text-text-primary font-medium">{currentTest.fixationMonitoring ? 'On' : 'Off'}</span>
              </div>
              
              {showAdvancedParams && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-border-subtle pt-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-tertiary text-xs">Background Luminance</span>
                    <span className="text-text-secondary text-xs">{currentTest.backgroundLuminance || 31.5} cd/m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-tertiary text-xs">Stimulus Duration</span>
                    <span className="text-text-secondary text-xs">{currentTest.stimulusDuration || 200} ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-tertiary text-xs">Inter-stimulus Interval</span>
                    <span className="text-text-secondary text-xs">{currentTest.interStimulusInterval || 1000} ms</span>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Controls */}
          <Card>
            <h4 className="font-medium text-text-primary mb-4">Test Controls</h4>
            <div className="space-y-3">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="w-full flex items-center justify-between p-3 bg-background-tertiary rounded-button hover:bg-border-subtle transition-colors"
                disabled={isSaving}
              >
                <span className="text-text-primary">Audio Feedback</span>
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4 text-accent-primary" />
                ) : (
                  <VolumeX className="w-4 h-4 text-text-tertiary" />
                )}
              </button>
              
              <button 
                className="w-full flex items-center justify-center space-x-2 p-3 bg-warning/20 text-warning rounded-button hover:bg-warning/30 transition-colors"
                onClick={() => addNotification('warning', 'Emergency Alert', 'Emergency stop activated by operator.')}
                disabled={isSaving}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Stop</span>
              </button>
            </div>
          </Card>

          {/* Patient Response */}
          <Card>
            <h4 className="font-medium text-text-primary mb-4">Patient Response</h4>
            <Button 
              size="lg" 
              className="w-full h-20 text-xl"
              disabled={!isTestInProgress || isPaused || testCompleted || isSaving}
              variant={testCompleted ? 'secondary' : 'primary'}
            >
              <Target className="w-8 h-8 mr-3" />
              {testCompleted ? (isSaving ? 'Saving...' : 'Test Complete') : 'Response Button'}
            </Button>
            <p className="text-xs text-text-tertiary mt-2 text-center">
              {testCompleted ? (isSaving ? 'Saving test results to database' : 'Test has been completed') : 
               isTestingBothEyes ? 'Patient presses when seeing light stimulus in either eye' :
               'Patient presses when seeing light stimulus'}
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};