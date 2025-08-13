export default function Page() {
  return (<main style={{ padding: 24 }}>
    <h1>Wildish Club</h1>
    <p>If you can see this, the app deployed correctly 🎉</p>
    <ul>
      <li><a href="/auth">Sign in</a></li>
      <li><a href="/events">Events & check-in</a></li>
      <li><a href="/places">Wildish Places map</a></li>
      <li><a href="/leader">Leader dashboard</a></li>
      <li><a href="/coffee">Coffee subscriptions</a></li>
    </ul>
  </main>);
}
