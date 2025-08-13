'use client';
import { supabaseClient } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthPage() {
  const supabase = supabaseClient();
  // Send users back to the homepage after clicking the email link
  const redirectTo =
    (typeof window !== 'undefined' ? window.location.origin : '') || '';

  return (
    <section className="grid gap-3 max-w-md">
      <div>
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-gray-600">Use your email to get a magic link.</p>
      </div>
      <div className="card p-5">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={redirectTo || undefined}
        />
      </div>
    </section>
  );
}
