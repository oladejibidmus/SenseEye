import { create } from 'zustand';
import { Patient, TestResult, TestConfiguration, Appointment, CalibrationData, StreamingSession } from '../types';

interface AppState {
  // Data
  patients: Patient[];
  testResults: TestResult[];
  appointments: Appointment[];
  
  // UI State
  currentPatient: Patient | null;
  currentTest: TestConfiguration | null;
  isTestInProgress: boolean;
  testProgress: number;
  loading: boolean;
  error: string | null;
  
  // Dashboard Settings
  dashboardFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  
  // Calibration and Streaming
  calibrationData: CalibrationData | null;
  streamingSession: StreamingSession | null;
  
  // Actions
  setPatients: (patients: Patient[]) => void;
  setTestResults: (testResults: TestResult[]) => void;
  setAppointments: (appointments: Appointment[]) => void;
  setCurrentPatient: (patient: Patient | null) => void;
  setCurrentTest: (test: TestConfiguration | null) => void;
  startTest: () => void;
  stopTest: () => void;
  updateTestProgress: (progress: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addTestResult: (result: TestResult) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  refreshData: () => void;
  setDashboardFrequency: (frequency: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
  setCalibrationData: (data: CalibrationData | null) => void;
  setStreamingSession: (session: StreamingSession | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial data
  patients: [],
  testResults: [],
  appointments: [],
  
  // Initial UI state
  currentPatient: null,
  currentTest: null,
  isTestInProgress: false,
  testProgress: 0,
  loading: false,
  error: null,
  
  // Dashboard settings
  dashboardFrequency: 'weekly',
  
  // Calibration and streaming
  calibrationData: null,
  streamingSession: null,
  
  // Actions
  setPatients: (patients) => {
    console.log('Setting patients in store:', patients);
    set({ patients });
  },
  setTestResults: (testResults) => set({ testResults }),
  setAppointments: (appointments) => set({ appointments }),
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  setCurrentTest: (test) => set({ currentTest: test }),
  startTest: () => set({ isTestInProgress: true, testProgress: 0 }),
  stopTest: () => set({ isTestInProgress: false, testProgress: 0 }),
  updateTestProgress: (progress) => set({ testProgress: progress }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addTestResult: (result) => set((state) => ({
    testResults: [...state.testResults, result],
  })),
  
  addPatient: (patient) => {
    console.log('Adding patient to store:', patient);
    set((state) => ({
      patients: [patient, ...state.patients],
    }));
  },
  
  updatePatient: (id, updates) => set((state) => ({
    patients: state.patients.map(p => p.id === id ? { ...p, ...updates } : p),
  })),

  refreshData: () => {
    // This will trigger a re-fetch of data
    set({ loading: true, error: null });
  },
  
  setDashboardFrequency: (frequency) => {
    set({ dashboardFrequency: frequency });
    // Save to localStorage for persistence
    localStorage.setItem('dashboardFrequency', frequency);
  },
  
  setCalibrationData: (data) => set({ calibrationData: data }),
  setStreamingSession: (session) => set({ streamingSession: session }),
}));

// Initialize dashboard frequency from localStorage
const savedFrequency = localStorage.getItem('dashboardFrequency') as 'daily' | 'weekly' | 'monthly' | 'yearly';
if (savedFrequency && ['daily', 'weekly', 'monthly', 'yearly'].includes(savedFrequency)) {
  useStore.getState().setDashboardFrequency(savedFrequency);
}