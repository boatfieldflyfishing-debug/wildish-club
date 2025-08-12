import { stripe } from '@/lib/stripe';
import { supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || '';
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session: any = event.data.object;
    // session.client_reference_id could be user id if you set it
    // For simplicity, set membership by email
    const email = session.customer_details?.email;
    if (email) {
      const supabase = supabaseServer();
      const { data: profile } = await supabase.from('profiles').select('id').eq('email', email as any).single();
      // If profiles table doesn't have email, you can join via auth; leaving simple placeholder here
    }
  }
  return new Response('ok');
}
