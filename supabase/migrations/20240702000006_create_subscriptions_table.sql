-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration_months INTEGER NOT NULL,
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read active subscriptions
CREATE POLICY "Anyone can read active subscriptions"
  ON subscriptions FOR SELECT
  USING (is_active = true);

-- Allow admins to manage subscriptions
CREATE POLICY "Admins can manage subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Add subscriptions to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE subscriptions;
