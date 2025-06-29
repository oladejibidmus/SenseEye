export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string[];
  insuranceProvider: string;
  avatar: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive';
  totalTests: number;
}

export interface TestResult {
  id: string;
  patientId: string;
  testType: '24-2' | '30-2' | '10-2' | 'Custom';
  strategy: 'SITA Standard' | 'SITA Fast' | 'Full Threshold';
  eye: 'OD' | 'OS' | 'OU';
  date: string;
  duration: number;
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
  notes: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  created_at?: string; // Timestamp when the test was actually performed
  advancedParameters?: AdvancedTestParameters; // Advanced test configuration parameters
  // OU-specific fields for both eyes testing
  rightEyeData?: {
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
  };
  leftEyeData?: {
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
  };
  calibrationData?: CalibrationData; // Calibration results
}

export interface AdvancedTestParameters {
  stimulusSize: number;
  stimulusIntensity: number;
  fixationMonitoring: boolean;
  backgroundLuminance?: number;
  stimulusDuration?: number;
  interStimulusInterval?: number;
  falsePositiveRate?: number;
  falseNegativeRate?: number;
  customSettings?: Record<string, any>;
}

export interface TestConfiguration {
  testType: string;
  strategy: string;
  eye: string;
  duration: number;
  stimulusSize: number;
  stimulusIntensity: number;
  fixationMonitoring: boolean;
  notes: string;
  // Additional advanced parameters
  backgroundLuminance?: number;
  stimulusDuration?: number;
  interStimulusInterval?: number;
  falsePositiveRate?: number;
  falseNegativeRate?: number;
  customSettings?: Record<string, any>;
  // Calibration settings
  requireCalibration?: boolean;
  calibrationTolerance?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

// Calibration interfaces
export interface CalibrationData {
  id: string;
  timestamp: string;
  pupilPosition: {
    x: number;
    y: number;
  };
  pupilSize: number;
  alignmentScore: number;
  isAligned: boolean;
  eyeDistance: number;
  headPosition: {
    x: number;
    y: number;
    z: number;
  };
  calibrationDuration: number;
  attempts: number;
  notes?: string;
}

export interface StreamingSession {
  id: string;
  patientId: string;
  deviceId: string;
  qrCode: string;
  status: 'pending' | 'connected' | 'calibrating' | 'testing' | 'completed' | 'disconnected';
  createdAt: string;
  connectedAt?: string;
  completedAt?: string;
  mobileUserAgent?: string;
  calibrationData?: CalibrationData;
}

export interface PupilDetectionResult {
  detected: boolean;
  position: { x: number; y: number };
  size: number;
  confidence: number;
  timestamp: number;
}

export interface CalibrationSettings {
  targetPupilSize: { min: number; max: number };
  alignmentTolerance: number;
  calibrationDuration: number;
  maxAttempts: number;
  requiredStability: number; // seconds of stable alignment required
}