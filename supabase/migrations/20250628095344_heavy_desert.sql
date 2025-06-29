/*
  # Seed Sample Data for Visual Field Testing Platform

  1. Sample Data
    - Insert sample patients
    - Insert sample test results
    - Insert sample appointments

  2. Functions
    - Create function to increment patient test count
*/

-- Create function to increment patient test count
CREATE OR REPLACE FUNCTION increment_patient_tests(patient_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE patients 
  SET total_tests = total_tests + 1,
      last_visit = CURRENT_DATE
  WHERE id = patient_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample patients
INSERT INTO patients (
  id,
  first_name,
  last_name,
  date_of_birth,
  email,
  phone,
  address,
  medical_history,
  insurance_provider,
  avatar,
  last_visit,
  next_appointment,
  status,
  total_tests
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Sarah',
  'Johnson',
  '1965-03-15',
  'sarah.johnson@email.com',
  '(555) 123-4567',
  '123 Main St, Springfield, IL 62701',
  ARRAY['Glaucoma', 'Hypertension'],
  'Blue Cross Blue Shield',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  '2024-01-15',
  '2024-02-15',
  'active',
  8
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Michael',
  'Chen',
  '1972-08-22',
  'michael.chen@email.com',
  '(555) 234-5678',
  '456 Oak Ave, Springfield, IL 62702',
  ARRAY['Diabetic Retinopathy', 'Type 2 Diabetes'],
  'Aetna',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  '2024-01-20',
  '2024-02-20',
  'active',
  12
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Emma',
  'Rodriguez',
  '1958-11-03',
  'emma.rodriguez@email.com',
  '(555) 345-6789',
  '789 Pine St, Springfield, IL 62703',
  ARRAY['Age-related Macular Degeneration'],
  'Medicare',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  '2024-01-10',
  NULL,
  'active',
  15
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'David',
  'Williams',
  '1980-05-18',
  'david.williams@email.com',
  '(555) 456-7890',
  '321 Elm St, Springfield, IL 62704',
  ARRAY['Myopia', 'Family History of Glaucoma'],
  'Cigna',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  '2024-01-25',
  '2024-03-01',
  'active',
  3
);

-- Insert sample test results
INSERT INTO test_results (
  id,
  patient_id,
  test_type,
  strategy,
  eye,
  date,
  duration,
  reliability,
  indices,
  visual_field_data,
  notes,
  status
) VALUES 
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '24-2',
  'SITA Standard',
  'OD',
  '2024-01-15',
  285,
  '{"falsePositives": 2, "falseNegatives": 1, "fixationLosses": 0, "score": 98}',
  '{"md": -2.4, "psd": 3.2, "vfi": 94, "ght": "Within Normal Limits"}',
  '[[5, 3, 2, 1, 0, -1, -2, -3], [4, 2, 1, 0, -1, -2, -3, -4], [3, 1, 0, -1, -2, -3, -4, -5], [2, 0, -1, -2, -3, -4, -5, -6], [1, -1, -2, -3, -4, -5, -6, -7], [0, -2, -3, -4, -5, -6, -7, -8], [-1, -3, -4, -5, -6, -7, -8, -9], [-2, -4, -5, -6, -7, -8, -9, -10]]',
  'Patient cooperative, reliable test results.',
  'completed'
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  '30-2',
  'SITA Fast',
  'OS',
  '2024-01-20',
  195,
  '{"falsePositives": 1, "falseNegatives": 3, "fixationLosses": 2, "score": 95}',
  '{"md": -4.1, "psd": 5.8, "vfi": 88, "ght": "Borderline"}',
  '[[3, 1, 0, -1, -2, -3, -4, -5, -6, -7], [2, 0, -1, -2, -3, -4, -5, -6, -7, -8], [1, -1, -2, -3, -4, -5, -6, -7, -8, -9], [0, -2, -3, -4, -5, -6, -7, -8, -9, -10], [-1, -3, -4, -5, -6, -7, -8, -9, -10, -11], [-2, -4, -5, -6, -7, -8, -9, -10, -11, -12], [-3, -5, -6, -7, -8, -9, -10, -11, -12, -13], [-4, -6, -7, -8, -9, -10, -11, -12, -13, -14], [-5, -7, -8, -9, -10, -11, -12, -13, -14, -15], [-6, -8, -9, -10, -11, -12, -13, -14, -15, -16]]',
  'Some peripheral defects noted, recommend follow-up.',
  'completed'
);

-- Insert sample appointments
INSERT INTO appointments (
  id,
  patient_id,
  date,
  time,
  type,
  status
) VALUES 
(
  '770e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '2024-02-15',
  '09:00',
  'Visual Field Test',
  'scheduled'
),
(
  '770e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  '2024-02-15',
  '10:30',
  'Follow-up Exam',
  'scheduled'
),
(
  '770e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440004',
  '2024-02-15',
  '14:00',
  'Initial Consultation',
  'scheduled'
);