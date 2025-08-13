'use client';
import { useState } from 'react';
export default function CoffeePage() {
  const [loading, setLoading] = useState(false);
  async function subscribe() {
    setLoading(true);
    const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }
  return (<div><h1>Wildish Club Coffee</h1>
    <p>Subscriptions help fund Wildish Club activities. Click below to subscribe (test mode).</p>
    <button onClick={subscribe} disabled={loading} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ddd' }}>
      {loading ? 'Redirecting…' : 'Subscribe (Stripe)'}
    </button>
    <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Set STRIPE_PRICE_ID & NEXT_PUBLIC_BASE_URL in your environment, and add a Stripe webhook.</p>
  </div>);
}
