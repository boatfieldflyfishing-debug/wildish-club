'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const key = process.env.SUPABASE_ANON_KEY || '';

      if (!url || !key) {
        throw new Error(
          'Missing Supabase env vars. Check Vercel Project Settings → Environment Variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY.'
        );
      }

      const supabase = createClient(url, key);
      const redirectTo =
        (typeof window !== 'undefined' ? window.location.origin : '') || '';

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo }
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
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-xl border p-2"
        />
        <button disabled={status==='sending'} className="btn btn-primary">
          {status==='sending' ? 'Sending…' : 'Send magic link'}
        </button>
        {message && (
          <div className={status==='error' ? 'text-red-600 text-sm' : 'text-gray-700 text-sm'}>
            {message}
          </div>
        )}
      </form>
    </section>
  );
}
