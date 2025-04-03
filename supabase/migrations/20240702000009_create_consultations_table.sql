-- Create consultations table
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('message', 'video_call')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  topic TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read their own consultations
CREATE POLICY "Users can read their own consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow experts to read consultations where they are the expert
CREATE POLICY "Experts can read consultations where they are the expert"
  ON consultations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM expert_profiles
    WHERE id = expert_id AND user_id = auth.uid()
  ));

-- Allow users to create consultations
CREATE POLICY "Users can create consultations"
  ON consultations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own consultations
CREATE POLICY "Users can update their own consultations"
  ON consultations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow experts to update consultations where they are the expert
CREATE POLICY "Experts can update consultations where they are the expert"
  ON consultations FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM expert_profiles
    WHERE id = expert_id AND user_id = auth.uid()
  ));

-- Add consultations to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE consultations;
