# Wildish Club — Fresh Start

Upload **the contents of this folder** to your GitHub repo root, then deploy on Vercel.

## What’s inside
- Next.js (App Router) with pages: `/`, `/auth`, `/events`, `/places`, `/leader`, `/coffee`
- API routes: places add/approve, check-in, Stripe checkout/webhook, cron reminders
- Components: PlacesMap (Mapbox), EventCheckin (QR + code)
- Supabase integration baked in (server + client helpers)

## Deploy (5 steps)
1) Create a Supabase project → run the SQL from our earlier instructions to create tables/RLS/seeds.
2) Create a Mapbox account → copy your public token.
3) On GitHub, upload all files in this folder to the repo **root** (where `package.json` lives).
4) In Vercel → New Project → select the repo → add env vars:

   - NEXT_PUBLIC_SUPABASE_URL

   - SUPABASE_ANON_KEY

   - NEXT_PUBLIC_MAPBOX_TOKEN

   - (optional now) STRIPE_* and RESEND_API_KEY

5) Deploy. Visit `/auth`, `/events`, `/places`, `/leader`.


Generated 2025-08-13.
