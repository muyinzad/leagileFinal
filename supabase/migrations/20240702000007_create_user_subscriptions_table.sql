-- Create user_subscriptions table
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read their own subscriptions
CREATE POLICY "Users can read their own subscriptions"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to read all user subscriptions
CREATE POLICY "Admins can read all user subscriptions"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Allow authenticated users to create their own subscriptions
CREATE POLICY "Authenticated users can create their own subscriptions"
  ON user_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own subscriptions
CREATE POLICY "Users can update their own subscriptions"
  ON user_subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to update any subscription
CREATE POLICY "Admins can update any subscription"
  ON user_subscriptions FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Add user_subscriptions to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE user_subscriptions;
