import { z } from 'zod'; import { supabaseServer } from '@/lib/supabase';
const schema = z.object({ id: z.string().uuid(), approved: z.boolean() });
export async function POST(req: Request) {
  const supabase = supabaseServer();
  const me = await supabase.auth.getUser(); const userId = me.data.user?.id;
  if (!userId) return new Response('Unauthorized', { status: 401 });
  const { data: roleRow } = await supabase.from('profiles').select('role').eq('id', userId).single();
  if (!roleRow || !['leader','admin'].includes(roleRow.role)) return new Response('Forbidden', { status: 403 });
  const { id, approved } = schema.parse(await req.json());
  const { error } = await supabase.from('places').update({ approved }).eq('id', id);
  if (error) return new Response(error.message, { status: 500 }); return new Response('OK');
}
