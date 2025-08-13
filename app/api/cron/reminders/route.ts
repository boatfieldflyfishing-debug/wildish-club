// app/api/cron/reminders/route.ts
import { getResend } from '@/lib/resend';
import { supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  // If no key is configured, exit gracefully (prevents build-time error)
  const resend = getResend();
  if (!resend) return new Response('ok'); 

  const supabase = supabaseServer();
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const { data: upcoming } = await supabase
    .from('events')
    .select('id,title,starts_at')
    .gte('starts_at', now.toISOString())
    .lte('starts_at', in24h.toISOString());

  const to = process.env.TEST_REMINDER_EMAIL;
  if (to) {
    await resend.emails.send({
      from: 'Wildish <reminders@yourdomain.com>',
      to,
      subject: 'Wildish — reminder cron test',
      html: `<p>Upcoming events in 24h: ${(upcoming || []).length}</p>`,
    });
  }

  return new Response('ok');
}
