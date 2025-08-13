'use client';
import QRCode from 'qrcode';
import React, { useEffect, useRef, useState } from 'react';
export default function EventCheckin({ eventId, code }: { eventId: string; code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => { if (canvasRef.current) QRCode.toCanvas(canvasRef.current, JSON.stringify({ eventId, code }), { width: 180 }); }, [code, eventId]);
  async function checkIn() {
    const res = await fetch('/api/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId, code }) });
    setOk(res.ok);
  }
  return (<div className="grid grid-cols-3 gap-3">
    <canvas ref={canvasRef} className="col-span-2 rounded-lg bg-white p-2" />
    <div className="rounded-lg border p-3">
      <div className="text-xs text-slate-500">Event code</div>
      <div className="text-2xl font-mono tracking-widest">{code.replace(/(.{1})/g, '$1 ')}</div>
      <button onClick={checkIn} className="mt-3 w-full rounded-2xl border px-3 py-2 text-sm">Mark me present</button>
      {ok && <div className="mt-2 text-emerald-600 text-sm">Checked in ✓</div>}
    </div></div>);
}
