'use client';
import { supabaseClient } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthPage() {
  const supabase = supabaseClient();
  return (
    <div>
      <h1>Sign in</h1>
      <p>Use your email to get a magic link.</p>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  );
}
