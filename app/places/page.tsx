import { supabaseServer } from '@/lib/supabase';
import PlacesMap from '@/components/PlacesMap';
export default async function PlacesPage() {
  const supabase = supabaseServer();
  const { data: places } = await supabase.from('places').select('id,name,category,latitude,longitude,description').eq('approved', true).limit(500);
  return (<div><h1>Wildish Places</h1><p>Community map of coffee, walks, swims, viewpoints and more.</p>
    <PlacesMap places={places || []} />
    <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0, marginTop: 16 }}>
      {(places || []).map((p) => (<li key={p.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
        <b>{p.name}</b> — <i>{p.category}</i>
        <div style={{ fontSize: 14, color: '#666' }}>{p.description}</div>
      </li>))}
    </ul></div>);
}
