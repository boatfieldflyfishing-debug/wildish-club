export default function Page() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Wildish Club — Starter</h1>
      <p className="mt-2 text-slate-600">Add your UI and wire to the provided API routes and Supabase schema.</p>
      <ol className="list-decimal ml-6 mt-4 space-y-2">
        <li>Copy the SQL from <code>../supabase/schema.sql</code> into Supabase SQL Editor and run.</li>
        <li>Create a <code>.env.local</code> using the example file.</li>
        <li>Run <code>npm install</code> and <code>npm run dev</code>.</li>
      </ol>
    </main>
  );
}
