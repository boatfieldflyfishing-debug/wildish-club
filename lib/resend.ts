// lib/resend.ts
import { Resend } from 'resend';

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null; // don't throw at build time
  return new Resend(key);
}
