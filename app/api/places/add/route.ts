import { z } from 'zod'; import { supabaseServer } from '@/lib/supabase';
const schema = z.object({ name: z.string().min(2), category: z.enum(['coffee','walk','nature','swim','market','shop','viewpoint','picnic','cycle','other']), description: z.string().max(600).optional(), branchId: z.string().uuid().nullable().optional(), latitude: z.number(), longitude: z.number() });
export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const body = await req.json(); const parsed = schema.safeParse(body);
  if (!parsed.success) return new Response('Invalid payload', { status: 400 });
  const { error } = await supabase.from('places').insert({ ...parsed.data, submitted_by: user.id, approved: false });
  if (error) return new Response(error.message, { status: 500 }); return new Response('OK');
}
