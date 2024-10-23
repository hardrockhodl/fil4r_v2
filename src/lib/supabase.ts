import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

if (!supabaseUrl || !supabaseKey || !BUCKET_NAME) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);