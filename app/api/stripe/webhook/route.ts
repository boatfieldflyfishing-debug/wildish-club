import { stripe } from '@/lib/stripe'; import { supabaseServer } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || ''; const secret = process.env.STRIPE_WEBHOOK_SECRET || ''; const body = await req.text();
  let event; try { event = stripe.webhooks.constructEvent(body, sig, secret); } catch (err: any) { return new Response(`Webhook Error: ${err.message}`, { status: 400 }); }
  if (event.type === 'checkout.session.completed') { /* TODO: map purchaser to profile and set memberships.active=true */ }
  return new Response('ok');
}
