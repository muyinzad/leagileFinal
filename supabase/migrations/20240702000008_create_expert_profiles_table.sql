-- Create expert_profiles table
CREATE TABLE expert_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT NOT NULL,
  specialization TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE expert_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read verified expert profiles
CREATE POLICY "Anyone can read verified expert profiles"
  ON expert_profiles FOR SELECT
  USING (is_verified = true);

-- Allow experts to read and update their own profiles
CREATE POLICY "Experts can read and update their own profiles"
  ON expert_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Experts can update their own profiles"
  ON expert_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to manage expert profiles
CREATE POLICY "Admins can manage expert profiles"
  ON expert_profiles FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Add expert_profiles to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE expert_profiles;
