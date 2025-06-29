-- Add columns for OU (both eyes) testing data
DO $$
BEGIN
  -- Add right_eye_data column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'test_results' AND column_name = 'right_eye_data'
  ) THEN
    ALTER TABLE test_results ADD COLUMN right_eye_data jsonb DEFAULT NULL;
  END IF;

  -- Add left_eye_data column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'test_results' AND column_name = 'left_eye_data'
  ) THEN
    ALTER TABLE test_results ADD COLUMN left_eye_data jsonb DEFAULT NULL;
  END IF;
END $$;

-- Create indexes for the new columns for better query performance
CREATE INDEX IF NOT EXISTS idx_test_results_right_eye_data ON test_results USING gin(right_eye_data);
CREATE INDEX IF NOT EXISTS idx_test_results_left_eye_data ON test_results USING gin(left_eye_data);

-- Add a comment to document the OU functionality
COMMENT ON COLUMN test_results.right_eye_data IS 'Stores individual right eye test data for OU (both eyes) tests';
COMMENT ON COLUMN test_results.left_eye_data IS 'Stores individual left eye test data for OU (both eyes) tests';