import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('patients').select('count', { count: 'exact' });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

// Database types
export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          email: string;
          phone: string;
          address: string;
          medical_history: string[];
          insurance_provider: string;
          avatar: string;
          last_visit: string | null;
          next_appointment: string | null;
          status: 'active' | 'inactive';
          total_tests: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          email: string;
          phone: string;
          address: string;
          medical_history?: string[];
          insurance_provider: string;
          avatar?: string;
          last_visit?: string;
          next_appointment?: string;
          status?: 'active' | 'inactive';
          total_tests?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          date_of_birth?: string;
          email?: string;
          phone?: string;
          address?: string;
          medical_history?: string[];
          insurance_provider?: string;
          avatar?: string;
          last_visit?: string;
          next_appointment?: string;
          status?: 'active' | 'inactive';
          total_tests?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      test_results: {
        Row: {
          id: string;
          patient_id: string;
          test_type: '24-2' | '30-2' | '10-2' | 'Custom';
          strategy: 'SITA Standard' | 'SITA Fast' | 'Full Threshold';
          eye: 'OD' | 'OS' | 'OU';
          date: string;
          duration: number;
          reliability: any;
          indices: any;
          visual_field_data: any;
          notes: string;
          status: 'completed' | 'in-progress' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          test_type: '24-2' | '30-2' | '10-2' | 'Custom';
          strategy: 'SITA Standard' | 'SITA Fast' | 'Full Threshold';
          eye: 'OD' | 'OS' | 'OU';
          date?: string;
          duration: number;
          reliability?: any;
          indices?: any;
          visual_field_data?: any;
          notes?: string;
          status?: 'completed' | 'in-progress' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          test_type?: '24-2' | '30-2' | '10-2' | 'Custom';
          strategy?: 'SITA Standard' | 'SITA Fast' | 'Full Threshold';
          eye?: 'OD' | 'OS' | 'OU';
          date?: string;
          duration?: number;
          reliability?: any;
          indices?: any;
          visual_field_data?: any;
          notes?: string;
          status?: 'completed' | 'in-progress' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          date: string;
          time: string;
          type: string;
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          date: string;
          time: string;
          type: string;
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          date?: string;
          time?: string;
          type?: string;
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}