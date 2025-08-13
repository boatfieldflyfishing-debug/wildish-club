import { supabaseServer } from '@/lib/supabase';
import PlacesMap from '@/components/PlacesMap';

export default async function PlacesPage() {
  const supabase = supabaseServer();
  const { data: places } = await supabase.from('places').select('id, name, category, latitude, longitude, description').eq('approved', true).limit(200);
  return (
    <div>
      <h1>Wildish Places</h1>
      <p>Community-recommended coffee spots, walks, viewpoints, swims and more.</p>
      <PlacesMap places={places || []} />
      <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0, marginTop: 16 }}>
        {(places || []).map((p) => (
          <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <b>{p.name}</b> — <i>{p.category}</i>
            <div style={{ fontSize: 14, color: '#666' }}>{p.description}</div>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>To add a place: build a small form or use Supabase Table Editor for now. Moderation: toggle <code>approved</code> in the table.</p>
    </div>
  );
}
