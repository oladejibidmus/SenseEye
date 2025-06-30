import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  User,
  Activity
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

export const ContentSection: React.FC = () => {
  const [isTestInProgress, setIsTestInProgress] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [testProgress, setTestProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [currentQuadrant, setCurrentQuadrant] = useState('Superior Nasal');
  const [reliability, setReliability] = useState({
    falsePositives: 2,
    falseNegatives: 1,
    fixationLosses: 0,
  });

  // Test grid for visualization
  const [gridState, setGridState] = useState(() => 
    Array(8).fill(null).map(() => 
      Array(8).fill(null).map(() => ({
        tested: Math.random() > 0.3,
        response: Math.random() > 0.2,
        active: false,
      }))
    )
  );
  const [activePoint, setActivePoint] = useState({ row: -1, col: -1 });

  // Demo timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTestInProgress && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = Math.max(0, prev - 1);
          const progress = Math.round(((300 - newTime) / 300) * 100);
          setTestProgress(Math.min(progress, 100));
          
          if (newTime <= 0) {
            setIsTestInProgress(false);
            return 0;
          }
          
          return newTime;
        });
        
        // Simulate test points
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
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTestInProgress, isPaused]);

  const handleStartTest = () => {
    setIsTestInProgress(true);
    setIsPaused(false);
    setTimeRemaining(300);
    setTestProgress(0);
  };

  const handlePauseTest = () => {
    setIsPaused(!isPaused);
  };

  const handleStopTest = () => {
    setIsTestInProgress(false);
    setTestProgress(0);
    setTimeRemaining(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const mockPatient = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    testType: '24-2',
    eye: 'OD'
  };

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
            Live Visual Field Testing Interface
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Experience our real-time testing interface with live monitoring, 
            reliability tracking, and instant feedback for clinical-grade results.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={item}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Visual Field Test Demo</h3>
                <p className="text-text-secondary">
                  {mockPatient.firstName} {mockPatient.lastName} - {mockPatient.testType} {mockPatient.eye}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-2 text-accent-primary">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Interactive Demo Mode</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-4 lg:mt-0">
                {!isTestInProgress ? (
                  <Button icon={<Play className="w-4 h-4" />} onClick={handleStartTest}>
                    Start Demo
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      onClick={handlePauseTest}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button 
                      variant="tertiary" 
                      icon={<Square className="w-4 h-4" />} 
                      onClick={handleStopTest}
                    >
                      Stop Demo
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
                  <h4 className="text-lg font-semibold text-text-primary mb-2">Test Interface</h4>
                  <p className="text-text-tertiary text-sm">
                    {isTestInProgress 
                      ? isPaused 
                        ? `Demo paused - ${mockPatient.eye} - Focus on center when resumed`
                        : `Testing ${mockPatient.eye} - Focus on the center`
                      : `Ready to begin ${mockPatient.eye} testing demo`
                    }
                  </p>
                </div>

                {/* Visual Field Grid */}
                <div className="bg-black rounded-lg p-8 mb-6">
                  <div className="relative w-full max-w-md mx-auto aspect-square">
                    {/* Central fixation point */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full z-10"></div>
                    
                    {/* Test grid */}
                    <div className="grid grid-cols-8 gap-1 w-full h-full">
                      {gridState.map((row, rowIndex) =>
                        row.map((point, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`rounded-full transition-all duration-300 ${
                              activePoint.row === rowIndex && activePoint.col === colIndex && isTestInProgress
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
                  <h5 className="font-medium text-text-primary mb-2">Instructions for Patient:</h5>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Look at the red dot in the center at all times</li>
                    <li>• Press the button when you see a flash of light</li>
                    <li>• Don't move your head or eyes</li>
                    <li>• Blink normally between flashes</li>
                    {isTestInProgress && <li className="text-accent-primary">• Demo is currently running</li>}
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
                    <h5 className="font-medium text-text-primary">Test Progress</h5>
                    <span className="text-sm text-text-tertiary">{testProgress}%</span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-accent-primary"
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
                      timeRemaining <= 60 ? 'text-warning' : 'text-text-primary'
                    }`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(timeRemaining)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Reliability */}
              <Card>
                <h5 className="font-medium text-text-primary mb-4">Reliability Indices</h5>
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
                
                <div className="mt-4 p-3 bg-success/20 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">Reliable Test</span>
                </div>
              </Card>

              {/* Test Parameters */}
              <Card>
                <h5 className="font-medium text-text-primary mb-4">Test Parameters</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Test Type</span>
                    <span className="text-text-primary font-medium">24-2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Strategy</span>
                    <span className="text-text-primary font-medium">SITA Standard</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Eye</span>
                    <span className="text-text-primary font-medium">OD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Stimulus Size</span>
                    <span className="text-text-primary font-medium">Size III</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Fixation Monitor</span>
                    <span className="text-text-primary font-medium">On</span>
                  </div>
                </div>
              </Card>

              {/* Controls */}
              <Card>
                <h5 className="font-medium text-text-primary mb-4">Test Controls</h5>
                <div className="space-y-3">
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="w-full flex items-center justify-between p-3 bg-background-tertiary rounded-button hover:bg-border-subtle transition-colors"
                  >
                    <span className="text-text-primary">Audio Feedback</span>
                    {audioEnabled ? (
                      <Volume2 className="w-4 h-4 text-accent-primary" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-text-tertiary" />
                    )}
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-warning/20 text-warning rounded-button hover:bg-warning/30 transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Emergency Stop</span>
                  </button>
                </div>
              </Card>

              {/* Patient Response */}
              <Card>
                <h5 className="font-medium text-text-primary mb-4">Patient Response</h5>
                <Button 
                  size="lg" 
                  className="w-full h-20 text-xl"
                  disabled={!isTestInProgress || isPaused}
                >
                  <Target className="w-8 h-8 mr-3" />
                  Response Button
                </Button>
                <p className="text-xs text-text-tertiary mt-2 text-center">
                  Patient presses when seeing light stimulus
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Feature Highlights */}
          <motion.div 
            variants={container}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-accent-primary" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Real-time Monitoring</h4>
              <p className="text-text-secondary text-sm">
                Live test progress tracking with instant reliability feedback and quality control metrics.
              </p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-accent-secondary" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Precise Calibration</h4>
              <p className="text-text-secondary text-sm">
                Advanced eye tracking and fixation monitoring for accurate stimulus presentation and response detection.
              </p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Clinical Validation</h4>
              <p className="text-text-secondary text-sm">
                Comprehensive reliability analysis and automated quality assessment for clinical-grade results.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};