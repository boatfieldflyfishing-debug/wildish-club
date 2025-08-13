'use client';
import { createClient } from '@supabase/supabase-js';

export function supabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,          // keep
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!      // <-- change to NEXT_PUBLIC_
  );
}
