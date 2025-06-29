import { supabase } from '../lib/supabase';
import { Patient, TestResult, Appointment } from '../types';

// Patient services
export const patientService = {
  async getAll(): Promise<Patient[]> {
    console.log('Fetching patients from database...');
    
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }

    console.log('Raw patient data from database:', data);

    if (!data || data.length === 0) {
      console.log('No patients found in database');
      return [];
    }

    const patients = data.map(patient => ({
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

    console.log('Processed patients:', patients);
    return patients;
  },

  async create(patient: Omit<Patient, 'id' | 'totalTests'>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .insert({
        first_name: patient.firstName,
        last_name: patient.lastName,
        date_of_birth: patient.dateOfBirth,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        medical_history: patient.medicalHistory,
        insurance_provider: patient.insuranceProvider,
        avatar: patient.avatar,
        last_visit: patient.lastVisit,
        next_appointment: patient.nextAppointment,
        status: patient.status,
      })
      .select()
      .single();

    if (error) throw error;

    return {
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
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient> {
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

    if (error) throw error;

    return {
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
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Test Result services
export const testResultService = {
  async getAll(): Promise<TestResult[]> {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    if (!data) return [];

    return data.map(result => ({
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
    }));
  },

  async getByPatientId(patientId: string): Promise<TestResult[]> {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('patient_id', patientId)
      .order('date', { ascending: false });

    if (error) throw error;

    if (!data) return [];

    return data.map(result => ({
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
    }));
  },

  async create(testResult: Omit<TestResult, 'id'>): Promise<TestResult> {
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        patient_id: testResult.patientId,
        test_type: testResult.testType,
        strategy: testResult.strategy,
        eye: testResult.eye,
        date: testResult.date,
        duration: testResult.duration,
        reliability: testResult.reliability,
        indices: testResult.indices,
        visual_field_data: testResult.visualFieldData,
        notes: testResult.notes,
        status: testResult.status,
      })
      .select()
      .single();

    if (error) throw error;

    // Update patient's total tests count
    await supabase.rpc('increment_patient_tests', { patient_id: testResult.patientId });

    return {
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
    };
  },
};

// Appointment services
export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;

    if (!data) return [];

    return data.map(appointment => ({
      id: appointment.id,
      patientId: appointment.patient_id,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
      notes: appointment.notes,
    }));
  },

  async getByPatientId(patientId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('date', { ascending: true });

    if (error) throw error;

    if (!data) return [];

    return data.map(appointment => ({
      id: appointment.id,
      patientId: appointment.patient_id,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
      notes: appointment.notes,
    }));
  },

  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        patient_id: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      patientId: data.patient_id,
      date: data.date,
      time: data.time,
      type: data.type,
      status: data.status,
      notes: data.notes,
    };
  },
};