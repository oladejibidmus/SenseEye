/*
  # Fix RLS policies for patients table

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policies that properly allow authenticated users to perform CRUD operations
    - Ensure INSERT operations work for authenticated users
    - Maintain data security while allowing proper functionality

  2. Policy Changes
    - Allow authenticated users to insert new patients
    - Allow authenticated users to read all patients
    - Allow authenticated users to update patients
    - Allow authenticated users to delete patients
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can insert patients" ON patients;
DROP POLICY IF EXISTS "Users can read all patients" ON patients;
DROP POLICY IF EXISTS "Users can update patients" ON patients;
DROP POLICY IF EXISTS "Users can delete patients" ON patients;

-- Create new policies that properly allow authenticated users to perform operations
CREATE POLICY "Authenticated users can insert patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete patients"
  ON patients
  FOR DELETE
  TO authenticated
  USING (true);

-- Also ensure the table has RLS enabled (should already be enabled)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;