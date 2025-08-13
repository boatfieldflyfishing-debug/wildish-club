import { supabaseServer } from '@/lib/supabase';
import EventCheckin from '@/components/EventCheckin';
export default async function EventsPage() {
  const supabase = supabaseServer();
  const { data: events } = await supabase.from('events').select('id,title,description,starts_at,location_name').order('starts_at', { ascending: true });
  return (<div><h1>Events</h1>
    {!events?.length && <p>No events yet.</p>}
    <ul style={{ display: 'grid', gap: 16, listStyle: 'none', padding: 0 }}>
      {events?.map((e) => (<li key={e.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0 }}>{e.title}</h3>
        <div style={{ fontSize: 14, color: '#666' }}>{new Date(e.starts_at).toLocaleString()}</div>
        <p>{e.description}</p>
        <details><summary>Check-in</summary>
          <p style={{ fontSize: 14, color: '#666' }}>Leaders: share the 6-digit code at the meetup. Members scan the QR or type the code.</p>
          <EventCheckin eventId={e.id} code={"000000"} />
        </details>
      </li>))}
    </ul>
    <p style={{ fontSize: 12, color: '#666' }}>The QR shows a placeholder until you set a code via SQL: <code>select set_checkin_code('EVENT_UUID','123456');</code></p>
  </div>);
}
