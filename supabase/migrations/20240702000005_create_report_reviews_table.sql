-- Create report_reviews table
CREATE TABLE report_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(report_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE report_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read reviews
CREATE POLICY "Anyone can read reviews"
  ON report_reviews FOR SELECT
  USING (true);

-- Allow authenticated users to create reviews
CREATE POLICY "Authenticated users can create reviews"
  ON report_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON report_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON report_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add report_reviews to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE report_reviews;
