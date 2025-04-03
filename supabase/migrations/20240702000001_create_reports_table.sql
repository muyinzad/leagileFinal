-- Create reports table with enhanced schema based on ERD
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0,
  thumbnail TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
  content TEXT,
  download_url TEXT,
  page_count INTEGER DEFAULT 0,
  publication_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read published reports
CREATE POLICY "Anyone can read published reports" 
  ON reports FOR SELECT 
  USING (status = 'published');

-- Allow authenticated users to create reports
CREATE POLICY "Authenticated users can create reports" 
  ON reports FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow users to update their own reports
CREATE POLICY "Users can update their own reports" 
  ON reports FOR UPDATE 
  TO authenticated 
  USING (auth.uid()::text = author);

-- Allow users to delete their own reports
CREATE POLICY "Users can delete their own reports" 
  ON reports FOR DELETE 
  TO authenticated 
  USING (auth.uid()::text = author);

-- Add reports to realtime subscription
ALTER PUBLICATION supabase_realtime ADD TABLE reports;
