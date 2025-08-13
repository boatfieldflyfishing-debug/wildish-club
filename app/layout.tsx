export const metadata = { title: 'Wildish Club' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
          <a href="/" style={{ fontWeight: 700 }}>Wildish Club</a>
          <a href="/events">Events</a>
          <a href="/places">Places</a>
          <a href="/auth" style={{ marginLeft: 'auto' }}>Sign in</a>
        </header>
        <main style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>{children}</main>
      </body>
    </html>
  );
}
