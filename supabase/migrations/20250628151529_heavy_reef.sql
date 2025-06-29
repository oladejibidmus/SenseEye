/*
  # Add Advanced Test Parameters to Test Results

  1. Schema Updates
    - Add advanced_parameters column to test_results table
    - Store stimulus size, intensity, fixation monitoring, and other advanced settings
    - Maintain backward compatibility with existing data

  2. Structure
    - advanced_parameters (jsonb) - stores all advanced test configuration parameters
*/

-- Add advanced_parameters column to test_results table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'test_results' AND column_name = 'advanced_parameters'
  ) THEN
    ALTER TABLE test_results ADD COLUMN advanced_parameters jsonb DEFAULT '{}';
  END IF;
END $$;

-- Create index for advanced_parameters for better query performance
CREATE INDEX IF NOT EXISTS idx_test_results_advanced_parameters ON test_results USING gin(advanced_parameters);

-- Update existing records to have empty advanced_parameters if null
UPDATE test_results 
SET advanced_parameters = '{}'::jsonb 
WHERE advanced_parameters IS NULL;