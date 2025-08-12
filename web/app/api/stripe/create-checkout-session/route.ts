import { stripe } from '@/lib/stripe';

export async function POST() {
  if (!process.env.STRIPE_PRICE_ID || !process.env.NEXT_PUBLIC_BASE_URL) {
    return new Response('Missing STRIPE_PRICE_ID or NEXT_PUBLIC_BASE_URL', { status: 500 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: process.env.NEXT_PUBLIC_BASE_URL + '/coffee?success=1',
    cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/coffee?canceled=1',
  });
  return Response.json({ url: session.url });
}
