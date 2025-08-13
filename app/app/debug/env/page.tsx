export default function EnvDebug() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_ANON_KEY || '';

  const masked = (s: string) =>
    s ? s.slice(0, 8) + '…' + s.slice(-4) : '(empty)';

  return (
    <main style={{ padding: 24 }}>
      <h1>Env Debug</h1>
      <ul>
        <li>Has NEXT_PUBLIC_SUPABASE_URL: <b>{url ? 'yes' : 'no'}</b> {url && `(${masked(url)})`}</li>
        <li>Has SUPABASE_ANON_KEY: <b>{key ? 'yes' : 'no'}</b> {key && `(${masked(key)})`}</li>
      </ul>
      <p style={{color:'#666', marginTop:12}}>
        If either shows <i>(empty)</i>, set them in Vercel → Project → Environment Variables (Production) and redeploy.
      </p>
    </main>
  );
}
