import { resend } from '@/lib/resend';
import { supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.CRON_SECRET && (await crypto.subtle.digest('SHA-256', new TextEncoder().encode('check')))) {
    // noop: just to make sure crypto is available
  }
  const supabase = supabaseServer();
  const now = new Date();
  const in24h = new Date(now.getTime() + 24*60*60*1000);
  // Pull attendees for events within next 24h
  const { data: upcoming } = await supabase
    .from('events')
    .select('id,title,starts_at, rsvps:user_id ( user_id )')
    .gte('starts_at', now.toISOString())
    .lte('starts_at', in24h.toISOString());

  // Placeholder: in a real app, join RSVPs to user emails; this requires a view or RPC.
  // We'll just send a test email to a configured address to verify cron works.
  const to = process.env.TEST_REMINDER_EMAIL;
  if (to) {
    await resend.emails.send({
      from: 'Wildish <reminders@yourdomain.com>',
      to,
      subject: 'Wildish — reminder cron test',
      html: `<p>This is a test reminder. Upcoming events count: ${(upcoming || []).length}</p>`
    });
  }
  return new Response('ok');
}
