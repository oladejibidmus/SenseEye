import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { Patient, TestResult, Appointment, AdvancedTestParameters } from '../types';

export const useDatabase = () => {
  const { 
    setPatients, 
    setTestResults, 
    setAppointments, 
    setLoading, 
    setError,
    addPatient: addPatientToStore,
    patients,
    testResults,
    appointments,
    loading,
    error
  } = useStore();

  const loadData = async () => {
    try {
      console.log('Starting to load data from database...');
      setLoading(true);
      setError(null);

      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('patients')
        .select('id')
        .limit(1);

      if (testError) {
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      console.log('Database connection successful');

      // Load patients
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (patientsError) {
        throw new Error(`Failed to load patients: ${patientsError.message}`);
      }

      console.log('Raw patients data from database:', patientsData);

      // Transform patients data to match our interface
      const transformedPatients: Patient[] = (patientsData || []).map(patient => ({
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        dateOfBirth: patient.date_of_birth,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        medicalHistory: patient.medical_history || [],
        insuranceProvider: patient.insurance_provider,
        avatar: patient.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        lastVisit: patient.last_visit || new Date().toISOString().split('T')[0],
        nextAppointment: patient.next_appointment,
        status: patient.status as 'active' | 'inactive',
        totalTests: patient.total_tests || 0,
      }));

      console.log('Transformed patients:', transformedPatients);

      // Load test results
      const { data: testResultsData, error: testResultsError } = await supabase
        .from('test_results')
        .select('*')
        .order('date', { ascending: false });

      if (testResultsError) {
        throw new Error(`Failed to load test results: ${testResultsError.message}`);
      }

      // Transform test results data
      const transformedTestResults: TestResult[] = (testResultsData || []).map(result => ({
        id: result.id,
        patientId: result.patient_id,
        testType: result.test_type as '24-2' | '30-2' | '10-2' | 'Custom',
        strategy: result.strategy as 'SITA Standard' | 'SITA Fast' | 'Full Threshold',
        eye: result.eye as 'OD' | 'OS' | 'OU',
        date: result.date,
        duration: result.duration,
        reliability: result.reliability,
        indices: result.indices,
        visualFieldData: result.visual_field_data,
        notes: result.notes,
        status: result.status as 'completed' | 'in-progress' | 'cancelled',
        created_at: result.created_at, // Include the timestamp when test was performed
        advancedParameters: result.advanced_parameters || {}, // Include advanced parameters
        // OU-specific data
        rightEyeData: result.right_eye_data || null,
        leftEyeData: result.left_eye_data || null,
      }));

      // Load appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true });

      if (appointmentsError) {
        throw new Error(`Failed to load appointments: ${appointmentsError.message}`);
      }

      // Transform appointments data
      const transformedAppointments: Appointment[] = (appointmentsData || []).map(appointment => ({
        id: appointment.id,
        patientId: appointment.patient_id,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
        notes: appointment.notes,
      }));

      // Update store with transformed data
      setPatients(transformedPatients);
      setTestResults(transformedTestResults);
      setAppointments(transformedAppointments);

      console.log('Data loaded successfully:', {
        patients: transformedPatients.length,
        testResults: transformedTestResults.length,
        appointments: transformedAppointments.length
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error loading data:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patientData: Omit<Patient, 'id' | 'totalTests'>) => {
    try {
      console.log('Adding patient to database:', patientData);

      const insertData = {
        first_name: patientData.firstName,
        last_name: patientData.lastName,
        date_of_birth: patientData.dateOfBirth,
        email: patientData.email,
        phone: patientData.phone,
        address: patientData.address,
        medical_history: patientData.medicalHistory,
        insurance_provider: patientData.insuranceProvider,
        avatar: patientData.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        last_visit: patientData.lastVisit,
        next_appointment: patientData.nextAppointment,
        status: patientData.status,
      };

      const { data, error } = await supabase
        .from('patients')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to add patient: ${error.message}`);
      }

      console.log('Patient added to database:', data);

      // Transform the returned data to match our interface
      const newPatient: Patient = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: data.date_of_birth,
        email: data.email,
        phone: data.phone,
        address: data.address,
        medicalHistory: data.medical_history,
        insuranceProvider: data.insurance_provider,
        avatar: data.avatar,
        lastVisit: data.last_visit,
        nextAppointment: data.next_appointment,
        status: data.status,
        totalTests: data.total_tests,
      };

      // Add to store
      addPatientToStore(newPatient);
      
      console.log('Patient added to store:', newPatient);
      return newPatient;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add patient';
      console.error('Error adding patient:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updatePatient = async (id: string, updates: Partial<Patient>) => {
    try {
      const updateData: any = {};
      
      if (updates.firstName) updateData.first_name = updates.firstName;
      if (updates.lastName) updateData.last_name = updates.lastName;
      if (updates.dateOfBirth) updateData.date_of_birth = updates.dateOfBirth;
      if (updates.email) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.address) updateData.address = updates.address;
      if (updates.medicalHistory) updateData.medical_history = updates.medicalHistory;
      if (updates.insuranceProvider) updateData.insurance_provider = updates.insuranceProvider;
      if (updates.avatar) updateData.avatar = updates.avatar;
      if (updates.lastVisit) updateData.last_visit = updates.lastVisit;
      if (updates.nextAppointment) updateData.next_appointment = updates.nextAppointment;
      if (updates.status) updateData.status = updates.status;
      if (updates.totalTests !== undefined) updateData.total_tests = updates.totalTests;

      const { data, error } = await supabase
        .from('patients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update patient: ${error.message}`);
      }

      const updatedPatient: Patient = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: data.date_of_birth,
        email: data.email,
        phone: data.phone,
        address: data.address,
        medicalHistory: data.medical_history,
        insuranceProvider: data.insurance_provider,
        avatar: data.avatar,
        lastVisit: data.last_visit,
        nextAppointment: data.next_appointment,
        status: data.status,
        totalTests: data.total_tests,
      };

      // Update store
      useStore.getState().updatePatient(id, updatedPatient);
      
      return updatedPatient;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update patient';
      console.error('Error updating patient:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deletePatient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete patient: ${error.message}`);
      }

      // Remove from store
      const currentPatients = useStore.getState().patients;
      setPatients(currentPatients.filter(p => p.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete patient';
      console.error('Error deleting patient:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addTestResult = async (testData: Omit<TestResult, 'id'>) => {
    try {
      console.log('Adding test result with OU support and advanced parameters:', testData);

      const insertData = {
        patient_id: testData.patientId,
        test_type: testData.testType,
        strategy: testData.strategy,
        eye: testData.eye,
        date: testData.date,
        duration: testData.duration,
        reliability: testData.reliability,
        indices: testData.indices,
        visual_field_data: testData.visualFieldData,
        notes: testData.notes,
        status: testData.status,
        advanced_parameters: testData.advancedParameters || {}, // Save advanced parameters
        // OU-specific data
        right_eye_data: testData.rightEyeData || null,
        left_eye_data: testData.leftEyeData || null,
      };

      const { data, error } = await supabase
        .from('test_results')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to add test result: ${error.message}`);
      }

      const newTestResult: TestResult = {
        id: data.id,
        patientId: data.patient_id,
        testType: data.test_type,
        strategy: data.strategy,
        eye: data.eye,
        date: data.date,
        duration: data.duration,
        reliability: data.reliability,
        indices: data.indices,
        visualFieldData: data.visual_field_data,
        notes: data.notes,
        status: data.status,
        created_at: data.created_at, // Include the timestamp
        advancedParameters: data.advanced_parameters, // Include advanced parameters
        // OU-specific data
        rightEyeData: data.right_eye_data,
        leftEyeData: data.left_eye_data,
      };

      useStore.getState().addTestResult(newTestResult);
      
      console.log('Test result with OU support and advanced parameters saved successfully:', newTestResult);
      return newTestResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add test result';
      console.error('Error adding test result:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addAppointment = async (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          patient_id: appointmentData.patientId,
          date: appointmentData.date,
          time: appointmentData.time,
          type: appointmentData.type,
          status: appointmentData.status,
          notes: appointmentData.notes,
        }])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to add appointment: ${error.message}`);
      }

      const newAppointment: Appointment = {
        id: data.id,
        patientId: data.patient_id,
        date: data.date,
        time: data.time,
        type: data.type,
        status: data.status,
        notes: data.notes,
      };

      const currentAppointments = useStore.getState().appointments;
      setAppointments([...currentAppointments, newAppointment].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
      
      return newAppointment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add appointment';
      console.error('Error adding appointment:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    patients,
    testResults,
    appointments,
    loading,
    error,
    loadData,
    addPatient,
    updatePatient,
    deletePatient,
    addTestResult,
    addAppointment,
  };
};