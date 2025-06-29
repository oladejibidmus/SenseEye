/*
  # Fix Patient RLS Policies for Insert Operations

  1. Security Updates
    - Update RLS policies for patients table to ensure proper insert permissions
    - Ensure authenticated users can insert patient records
    - Maintain data security while allowing necessary operations

  2. Policy Changes
    - Update insert policy to allow authenticated users to create patient records
    - Ensure select, update, and delete policies work correctly with authentication
*/

-- Drop existing policies to recreate them with proper permissions
DROP POLICY IF EXISTS "Authenticated users can insert patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can read all patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can update patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can delete patients" ON patients;

-- Create new policies with proper authentication checks
CREATE POLICY "Enable insert for authenticated users"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update for authenticated users"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON patients
  FOR DELETE
  TO authenticated
  USING (true);

-- Ensure RLS is enabled on the patients table
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;