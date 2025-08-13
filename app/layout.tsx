export const metadata = { title: 'Wildish Club' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>
    <header style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
      <a href="/" style={{ fontWeight: 700 }}>Wildish Club</a>
      <a href="/events">Events</a>
      <a href="/places">Places</a>
      <a href="/coffee">Coffee</a>
      <a href="/leader" style={{ marginLeft: 'auto' }}>Leader</a>
      <a href="/auth">Sign in</a>
    </header>
    <main style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>{children}</main>
  </body></html>);
}
