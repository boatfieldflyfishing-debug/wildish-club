import { z } from 'zod'; import { supabaseServer } from '@/lib/supabase'; import { createHash } from 'crypto';
const schema = z.object({ eventId: z.string().uuid(), code: z.string().length(6) });
const hash = (s: string) => createHash('sha256').update(s).digest('hex');
export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser(); if (!user) return new Response('Unauthorized', { status: 401 });
  const { eventId, code } = schema.parse(await req.json());
  const { data: event } = await supabase.from('events').select('id, checkin_code_hash').eq('id', eventId).single();
  if (!event) return new Response('Not found', { status: 404 });
  if (event.checkin_code_hash !== hash(code)) return new Response('Invalid code', { status: 400 });
  const { error } = await supabase.from('attendance').upsert({ event_id: eventId, user_id: user.id, checked_in_at: new Date().toISOString() });
  if (error) return new Response(error.message, { status: 500 }); return new Response('OK');
}
