-- Seed data for subscriptions table
INSERT INTO subscriptions (name, description, price, duration_months, features, is_active)
VALUES
  ('Basic', 'Access to all basic research reports and limited consultations', 9.99, 1, '{"features": ["Access to basic reports", "1 expert consultation per month", "Download up to 5 reports", "Email support"]}', true),
  ('Premium', 'Full access to all research reports and unlimited consultations', 19.99, 1, '{"features": ["Access to all reports including premium", "Unlimited expert consultations", "Unlimited downloads", "Priority support", "Early access to new reports"]}', true),
  ('Annual Basic', 'Annual subscription with basic features at a discount', 99.99, 12, '{"features": ["Access to basic reports", "1 expert consultation per month", "Download up to 5 reports per month", "Email support", "2 months free compared to monthly plan"]}', true),
  ('Annual Premium', 'Annual subscription with premium features at a discount', 199.99, 12, '{"features": ["Access to all reports including premium", "Unlimited expert consultations", "Unlimited downloads", "Priority support", "Early access to new reports", "2 months free compared to monthly plan"]}', true);
