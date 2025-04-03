-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Only allow admins to view admin_users
CREATE POLICY "Only admins can view admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  ));

-- Only super_admins can insert new admin_users
CREATE POLICY "Only super_admins can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));

-- Only super_admins can update admin_users
CREATE POLICY "Only super_admins can update admin_users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));

-- Only super_admins can delete admin_users
CREATE POLICY "Only super_admins can delete admin_users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));
