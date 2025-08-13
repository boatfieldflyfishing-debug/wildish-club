'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Read the PUBLIC env vars (available in the browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          'Missing env vars. In Vercel (Production), set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
        );
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const redirectTo =
        (typeof window !== 'undefined' ? window.location.origin : '') || '';

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo }, // returns to your site
      });

      if (error) throw error;

      setStatus('sent');
      setMessage('Magic link sent! Check your email.');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage(err?.message || 'Something went wrong.');
    }
  }

  return (
    <section className="grid gap-3 max-w-md">
      <div>
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-gray-600">We’ll email you a magic link.</p>
      </div>

      <form onSubmit={onSubmit} className="card p-5 grid gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-xl border p-2"
        />
        <button disabled={status === 'sending'} className="btn btn-primary">
          {status === 'sending' ? 'Sending…' : 'Send magic link'}
        </button>

        {message && (
          <div className={status === 'error' ? 'text-red-600 text-sm' : 'text-gray-700 text-sm'}>
            {message}
          </div>
        )}
      </form>
    </section>
  );
}
