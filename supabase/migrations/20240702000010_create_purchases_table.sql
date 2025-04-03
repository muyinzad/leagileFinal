-- Create purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_id UUID REFERENCES reports(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (report_id IS NOT NULL OR subscription_id IS NOT NULL)
);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read their own purchases
CREATE POLICY "Users can read their own purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create their own purchases
CREATE POLICY "Users can create their own purchases"
  ON purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow admins to read all purchases
CREATE POLICY "Admins can read all purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Allow admins to update purchases
CREATE POLICY "Admins can update purchases"
  ON purchases FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Add purchases to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE purchases;
