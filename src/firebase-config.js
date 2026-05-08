/**
 * Supabase Configuration
 *
 * IMPORTANT: Replace these values with your Supabase project credentials from:
 * https://supabase.com → Your Project → Settings → API
 *
 * Steps to get your config:
 * 1. Go to Supabase Dashboard
 * 2. Create a new project
 * 3. Go to Settings → API
 * 4. Copy the Project URL and anon/public key
 * 5. Paste below
 */

import { createClient } from "@supabase/supabase-js";

// Supabase configuration should use environment variables when available.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://mkfeortgsgujudcyegqc.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZmVvcnRnc2d1anVkY3llZ3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjE1NjEsImV4cCI6MjA5Mzc5NzU2MX0.8efeo4UjSo9ZO9oW1GgLu7kXEzPNyi0Ef45xtxpceak";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
