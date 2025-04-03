-- Seed data for expert_profiles table
INSERT INTO expert_profiles (user_id, first_name, last_name, bio, specialization, years_experience, hourly_rate, avatar_url, is_verified, is_available)
VALUES
  -- Note: These user_ids are placeholders and would need to be replaced with actual user_ids from auth.users
  ('00000000-0000-0000-0000-000000000001', 'John', 'Smith', 'Experienced data scientist with a focus on financial markets', 'Financial Data Analysis', 12, 150.00, 'https://api.dicebear.com/7.x/avataaars/svg?seed=john', true, true),
  ('00000000-0000-0000-0000-000000000002', 'Sarah', 'Johnson', 'Market research specialist with expertise in consumer behavior', 'Consumer Market Research', 8, 120.00, 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', true, true),
  ('00000000-0000-0000-0000-000000000003', 'Michael', 'Chen', 'Technology analyst focusing on emerging tech trends', 'Technology Trend Analysis', 10, 135.00, 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', true, true),
  ('00000000-0000-0000-0000-000000000004', 'Emily', 'Rodriguez', 'Healthcare research specialist with background in medical data', 'Healthcare Research', 15, 175.00, 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily', true, true),
  ('00000000-0000-0000-0000-000000000005', 'David', 'Kim', 'Environmental impact researcher with focus on sustainability', 'Environmental Research', 7, 110.00, 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', true, true);
