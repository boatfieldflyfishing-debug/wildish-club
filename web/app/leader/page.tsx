import { supabaseServer } from '@/lib/supabase';

async function setCode(eventId: string, code: string) {
  'use server';
  const supabase = supabaseServer();
  await supabase.rpc('set_checkin_code', { e_id: eventId, code });
}

async function createEvent(formData: FormData) {
  'use server';
  const supabase = supabaseServer();
  const title = String(formData.get('title') || '');
  const starts_at = String(formData.get('starts_at') || '');
  const branch_slug = String(formData.get('branch_slug') || '');
  const { data: branch } = await supabase.from('branches').select('id').eq('slug', branch_slug).single();
  await supabase.from('events').insert({ title, starts_at, branch_id: branch?.id });
}

async function approvePlace(id: string, approved: boolean) {
  'use server';
  const supabase = supabaseServer();
  await supabase.from('places').update({ approved }).eq('id', id);
}

export default async function LeaderPage() {
  const supabase = supabaseServer();
  const [{ data: events }, { data: places }, { data: branches }] = await Promise.all([
    supabase.from('events').select('id,title,starts_at,checkin_code_hash').order('starts_at', { ascending: true }),
    supabase.from('places').select('id,name,approved,category').order('created_at', { ascending: false }),
    supabase.from('branches').select('name,slug').order('name'),
  ]);

  async function downloadAttendance() {
    'use server';
    // For simplicity, advise export from Supabase UI.
  }

  return (
    <div>
      <h1>Leader Dashboard</h1>

      <section style={{ marginTop: 24 }}>
        <h2>Create Event</h2>
        <form action={createEvent} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
          <input name="title" placeholder="Title" required />
          <input name="starts_at" placeholder="2025-08-17T10:00:00+01" required />
          <select name="branch_slug">
            {branches?.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
          <button>Create</button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Set/Rotate Check-in Codes</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {events?.map((e) => (
            <li key={e.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
              <b>{e.title}</b> — {new Date(e.starts_at).toLocaleString()}
              <form action={async (fd) => { await setCode(e.id, String(fd.get('code') || '')); }} style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <input name="code" placeholder="6 digits" maxLength={6} />
                <button>Set code</button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Moderate Places</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {places?.map((p) => (
            <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ width: 120 }}>{p.name}</span>
              <code>{p.category}</code>
              <form action={async () => { await approvePlace(p.id, !p.approved); }}>
                <button>{p.approved ? 'Unapprove' : 'Approve'}</button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Attendance</h2>
        <p>Export CSV from Supabase Table Editor → attendance (quickest for now). We can add a one-click export later.</p>
      </section>
    </div>
  );
}
