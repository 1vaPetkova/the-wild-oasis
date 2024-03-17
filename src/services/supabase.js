import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6ZHRlZWFxcnJzcmhoaXd0YWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwNjc0NDMsImV4cCI6MjAyMzY0MzQ0M30.3sjoYbQWGFXeoI8kNS1ZadRtLvTRWZIeKq_zh0FzXzo";

const supabase = createClient(
  "https://czdteeaqrrsrhhiwtaeo.supabase.co",
  SUPABASE_KEY
);

export default supabase;
