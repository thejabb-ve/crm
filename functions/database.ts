import { createClient } from '@supabase/supabase-js';

export function connection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const connection = createClient(supabaseUrl, supabaseAnonKey);
  return connection;
}
