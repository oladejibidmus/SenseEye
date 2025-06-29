/*
  # Visual Field Testing Platform Database Schema

  1. New Tables
    - `patients`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `date_of_birth` (date)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `medical_history` (text array)
      - `insurance_provider` (text)
      - `avatar` (text)
      - `last_visit` (date)
      - `next_appointment` (date, nullable)
      - `status` (text)
      - `total_tests` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `test_results`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key)
      - `test_type` (text)
      - `strategy` (text)
      - `eye` (text)
      - `date` (date)
      - `duration` (integer)
      - `reliability` (jsonb)
      - `indices` (jsonb)
      - `visual_field_data` (jsonb)
      - `notes` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key)
      - `date` (date)
      - `time` (time)
      - `type` (text)
      - `status` (text)
      - `notes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their organization's data
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  medical_history text[] DEFAULT '{}',
  insurance_provider text NOT NULL,
  avatar text DEFAULT '',
  last_visit date,
  next_appointment date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_tests integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  test_type text NOT NULL CHECK (test_type IN ('24-2', '30-2', '10-2', 'Custom')),
  strategy text NOT NULL CHECK (strategy IN ('SITA Standard', 'SITA Fast', 'Full Threshold')),
  eye text NOT NULL CHECK (eye IN ('OD', 'OS', 'OU')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  duration integer NOT NULL,
  reliability jsonb NOT NULL DEFAULT '{}',
  indices jsonb NOT NULL DEFAULT '{}',
  visual_field_data jsonb NOT NULL DEFAULT '[]',
  notes text DEFAULT '',
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for patients table
CREATE POLICY "Users can read all patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete patients"
  ON patients
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for test_results table
CREATE POLICY "Users can read all test results"
  ON test_results
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert test results"
  ON test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update test results"
  ON test_results
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete test results"
  ON test_results
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for appointments table
CREATE POLICY "Users can read all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete appointments"
  ON appointments
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_test_results_patient_id ON test_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_test_results_date ON test_results(date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_results_updated_at
  BEFORE UPDATE ON test_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();